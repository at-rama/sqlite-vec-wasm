#!/usr/bin/env python3
"""Resolve official source identities and validate the repository source lock."""

import argparse
import csv
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import subprocess
import sys
import tarfile
import tempfile
from urllib.parse import urljoin
import zipfile

SQLITE_DOWNLOAD = 'https://sqlite.org/download.html'
VEC_API = 'https://api.github.com/repos/asg017/sqlite-vec/releases'
ROOT = Path(__file__).resolve().parent.parent


class InputError(ValueError):
    pass


def require(condition, message):
    if not condition:
        raise InputError(message)


def version(value, project):
    require(isinstance(value, str), f'{project}: version must be a string')
    if project == 'sqliteVec' and value.startswith('v'):
        value = value[1:]
    number = r'(0|[1-9][0-9]*)'
    pattern = (rf'3\.{number}\.{number}(?:\.{number})?' if project == 'sqlite'
               else rf'{number}\.{number}\.{number}(?:-(?:alpha|beta|rc)(?:\.{number})?)?')
    require(re.fullmatch(pattern, value), f'{project}: expected an exact release version, got {value!r}')
    return value


def sqlite_code(value):
    parts = [int(p) for p in value.split('.')]
    require(all(p < 100 for p in parts[1:]), 'SQLite version components exceed filename encoding')
    parts += [0] * (4 - len(parts))
    return f'{parts[0]}{parts[1]:02}{parts[2]:02}{parts[3]:02}'


def release_url(value):
    return 'https://sqlite.org/releaselog/' + value.replace('.', '_') + '.html'


def validate_lock(lock):
    require(isinstance(lock, dict) and set(lock) == {'schemaVersion', 'sqlite', 'sqliteVec'}, 'Invalid source-lock fields')
    require(type(lock['schemaVersion']) is int and lock['schemaVersion'] == 1, 'Unsupported source-lock schemaVersion')
    for project in ('sqlite', 'sqliteVec'):
        pin = lock[project]
        require(isinstance(pin, dict) and set(pin) == {'version', 'archiveUrl', 'digest', 'releaseUrl', 'digestUrl'}, f'{project}: invalid pin fields')
        v = version(pin['version'], project)
        require(v == pin['version'], f'{project}: lock versions must be normalized')
        require(all(isinstance(pin[k], str) for k in ('archiveUrl', 'releaseUrl', 'digestUrl')), f'{project}: URLs must be strings')
        digest = pin['digest']
        require(isinstance(digest, dict) and set(digest) == {'algorithm', 'value'}, f'{project}: invalid digest fields')
        algo = 'sha3-256' if project == 'sqlite' else 'sha256'
        require(digest['algorithm'] == algo and isinstance(digest['value'], str) and re.fullmatch(r'[0-9a-f]{64}', digest['value']), f'{project}: invalid {algo} digest')
        if project == 'sqlite':
            require(re.fullmatch(r'https://sqlite\.org/\d{4}/sqlite-src-' + sqlite_code(v) + r'\.zip', pin['archiveUrl']), 'SQLite archive/version mismatch or unofficial origin')
            require(pin['releaseUrl'] == release_url(v), 'SQLite release/version mismatch')
            require(pin['digestUrl'] == SQLITE_DOWNLOAD, 'SQLite digest must originate from official download metadata')
        else:
            require(pin['archiveUrl'] == f'https://github.com/asg017/sqlite-vec/releases/download/v{v}/sqlite-vec-{v}-amalgamation.tar.gz', 'sqlite-vec archive/version mismatch or unofficial origin')
            require(pin['releaseUrl'] == f'https://github.com/asg017/sqlite-vec/releases/tag/v{v}', 'sqlite-vec release/version mismatch')
            require(re.fullmatch(re.escape(VEC_API) + r'/\d+', pin['digestUrl']), 'sqlite-vec digest must originate from official release metadata')
    return lock


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, f'Duplicate JSON field: {key}')
        result[key] = value
    return result


def read_json(path):
    return json.loads(Path(path).read_text(), object_pairs_hook=unique_object)


def published_vec(release):
    require(isinstance(release, dict), 'Malformed sqlite-vec release record')
    require(type(release.get('draft')) is bool and type(release.get('prerelease')) is bool, 'Malformed sqlite-vec release classification')
    if release['draft'] or release.get('published_at') is None:
        return False
    try:
        v = version(release.get('tag_name'), 'sqliteVec')
    except InputError:
        return False
    published = release['published_at']
    require(isinstance(published, str) and re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z', published), 'Malformed sqlite-vec publication timestamp')
    require(release['prerelease'] == ('-' in v), 'Contradictory sqlite-vec release classification')
    return True


def stable_vec(release):
    return published_vec(release) and not release['prerelease']


def sqlite_rows(text):
    rows = []
    for line in text.splitlines():
        if not line.startswith('PRODUCT,'):
            continue
        row = next(csv.reader([line]))
        if len(row) < 3 or '/sqlite-src-' not in row[2]:
            continue
        require(len(row) >= 5 and re.fullmatch(r'\d{4}/sqlite-src-\d+\.zip', row[2]), 'Malformed official SQLite full-source metadata')
        v = version(row[1], 'sqlite')
        pin = {'version': v, 'archiveUrl': urljoin(SQLITE_DOWNLOAD, row[2]),
               'digest': {'algorithm': 'sha3-256', 'value': row[4]},
               'releaseUrl': release_url(v), 'digestUrl': SQLITE_DOWNLOAD}
        rows.append(pin)
    return rows


def preserve_pin(candidate, baseline):
    if baseline is None or baseline['version'] != candidate['version']:
        return candidate
    require(candidate['archiveUrl'] == baseline['archiveUrl'], 'Official archive identity changed for established pin')
    digest = candidate['digest']['value']
    require(not digest or digest == baseline['digest']['value'], 'Official digest changed for established pin')
    return baseline.copy()


def select_sqlite(text, explicit, baseline, fetch):
    rows = sqlite_rows(text)
    if explicit is None:
        require(rows, 'No official stable SQLite source release found')
        chosen = max(rows, key=lambda p: tuple(map(int, p['version'].split('.'))))['version']
    else:
        chosen = version(explicit, 'sqlite')
    matches = [p for p in rows if p['version'] == chosen]
    require(len(matches) <= 1, f'Ambiguous official SQLite source metadata for {chosen}')
    log = fetch(release_url(chosen))
    require(re.search(r'<title>SQLite Release ' + re.escape(chosen) + r' On \d{4}-\d{2}-\d{2}</title>', log), f'SQLite {chosen} is not an official published stable release')
    if matches:
        return preserve_pin(matches[0], baseline)
    require(baseline and baseline['version'] == chosen, f'No official archive digest available for SQLite {chosen}; provide an established baseline pin')
    return baseline.copy()


def select_vec(releases, explicit, baseline):
    require(isinstance(releases, list) and all(isinstance(r, dict) for r in releases), 'Invalid sqlite-vec release metadata')
    if explicit is None:
        stable = [r for r in releases if stable_vec(r)]
        require(stable, 'No official stable sqlite-vec release found')
        selected = max(stable, key=lambda r: tuple(map(int, version(r['tag_name'], 'sqliteVec').split('.'))))
        chosen = version(selected['tag_name'], 'sqliteVec')
        matches = [r for r in releases if r.get('tag_name') == 'v' + chosen]
    else:
        chosen = version(explicit, 'sqliteVec')
        matches = [r for r in releases if r.get('tag_name') == 'v' + chosen]
    require(len(matches) == 1 and published_vec(matches[0]), f'sqlite-vec {chosen} is missing, ambiguous or unpublished')
    selected = matches[0]
    require(isinstance(selected.get('assets'), list) and all(isinstance(a, dict) for a in selected['assets']), 'Malformed sqlite-vec asset metadata')
    name = f'sqlite-vec-{chosen}-amalgamation.tar.gz'
    assets = [a for a in selected.get('assets', []) if a.get('name') == name]
    require(len(assets) == 1 and assets[0].get('state') == 'uploaded', f'Missing or ambiguous official amalgamation for {chosen}')
    asset = assets[0]
    raw = asset.get('digest')
    require(raw is None or (isinstance(raw, str) and re.fullmatch(r'sha256:[0-9a-f]{64}', raw)), 'Malformed official sqlite-vec digest')
    candidate = {'version': chosen, 'archiveUrl': asset.get('browser_download_url'),
                 'digest': {'algorithm': 'sha256', 'value': raw[7:] if raw else ''},
                 'releaseUrl': selected.get('html_url'), 'digestUrl': selected.get('url')}
    candidate = preserve_pin(candidate, baseline)
    require(candidate['digest']['value'], f'No official published digest for sqlite-vec {chosen}')
    return candidate


def resolve_pair(sqlite_text, releases, sqlite_version=None, vec_version=None, baseline=None, fetch=None):
    if baseline is not None:
        validate_lock(baseline)
    result = {'schemaVersion': 1,
              'sqlite': select_sqlite(sqlite_text, sqlite_version, baseline['sqlite'] if baseline else None, fetch),
              'sqliteVec': select_vec(releases, vec_version, baseline['sqliteVec'] if baseline else None)}
    return validate_lock(result)


def write_lock(path, lock):
    validate_lock(lock)
    path = Path(path)
    require(path.parent.is_dir(), f'Output parent directory does not exist: {path.parent}')
    fd, temporary = tempfile.mkstemp(prefix='.' + path.name + '-', dir=path.parent)
    try:
        with os.fdopen(fd, 'w') as stream:
            json.dump(lock, stream, indent=2)
            stream.write('\n')
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def fetch_file(url, destination):
    subprocess.run(['bash', str(ROOT / 'tools/inputs.sh'), '_fetch', url, str(destination)], check=True)


class MetadataFetch:
    def __init__(self, directory):
        self.directory = directory
        self.records = []

    def __call__(self, url):
        path = self.directory / f'metadata-{len(self.records):03}.txt'
        fetch_file(url, path)
        text = path.read_text()
        self.records.append({'url': url, 'file': path.name,
                             'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
        (self.directory / 'origins.json').write_text(json.dumps(self.records, indent=2) + '\n')
        return text


def resolve_command(args):
    # Validate explicit inputs and baseline before network activity.
    if args.sqlite_version is not None:
        version(args.sqlite_version, 'sqlite')
    if args.sqlite_vec_version is not None:
        version(args.sqlite_vec_version, 'sqliteVec')
    baseline_path = args.baseline_lock
    if baseline_path is None and (ROOT / 'inputs/sources.lock.json').is_file():
        baseline_path = ROOT / 'inputs/sources.lock.json'
    baseline = validate_lock(read_json(baseline_path)) if baseline_path else None
    parent = ROOT / '.work/inputs'
    parent.mkdir(parents=True, exist_ok=True)
    evidence = Path(tempfile.mkdtemp(prefix='resolve-', dir=parent))
    fetch = MetadataFetch(evidence)
    sqlite_text = fetch(SQLITE_DOWNLOAD)
    if args.sqlite_vec_version is not None:
        v = version(args.sqlite_vec_version, 'sqliteVec')
        releases = [json.loads(fetch(VEC_API + '/tags/v' + v), object_pairs_hook=unique_object)]
    else:
        releases = []
        page = 1
        while True:
            batch = json.loads(fetch(VEC_API + f'?per_page=100&page={page}'), object_pairs_hook=unique_object)
            require(isinstance(batch, list), 'Invalid sqlite-vec releases response')
            releases.extend(batch)
            if len(batch) < 100:
                break
            page += 1
    result = resolve_pair(sqlite_text, releases, args.sqlite_version,
                          args.sqlite_vec_version, baseline, fetch)
    write_lock(args.output, result)
    (evidence / 'selection.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps({'lockPath': str(Path(args.output).resolve()), 'evidencePath': str(evidence)}))


def digest_file(path, algorithm):
    digest = hashlib.sha3_256() if algorithm == 'sha3-256' else hashlib.sha256()
    with Path(path).open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def archive_members(path, kind):
    members = []
    if kind == 'zip':
        with zipfile.ZipFile(path) as archive:
            for entry in archive.infolist():
                mode = entry.external_attr >> 16
                require(not stat.S_ISLNK(mode), 'Archive contains a symbolic link')
                require(stat.S_IFMT(mode) in (0, stat.S_IFREG, stat.S_IFDIR), 'Archive contains a special file')
                members.append((entry.filename, entry.is_dir(), mode & 0o777))
    else:
        with tarfile.open(path, 'r:gz') as archive:
            for entry in archive:
                require(entry.isfile() or entry.isdir(), 'Archive contains a link or special file')
                members.append((entry.name, entry.isdir(), entry.mode & 0o777))
    paths = {}
    for name, directory, mode in members:
        require(isinstance(name, str) and '\\' not in name and not name.startswith('/'), 'Archive has an unsafe path')
        parts = PurePosixPath(name).parts
        require('..' not in parts, 'Archive attempts to escape its workspace')
        if not parts:
            require(directory, 'Invalid empty archive file path')
            continue
        normalized = '/'.join(parts)
        require(normalized not in paths, f'Duplicate archive path: {normalized}')
        paths[normalized] = (directory, mode)
    for name in paths:
        for parent in PurePosixPath(name).parents:
            if str(parent) in paths:
                require(paths[str(parent)][0], 'Archive places a file inside another file')
    require(paths, 'Empty source archive')
    return paths


def extract_file(path, kind, destination, members):
    destination.mkdir()
    subprocess.run(['bash', str(ROOT / 'tools/inputs.sh'), '_extract', kind,
                    str(path), str(destination)], check=True)
    # ZIP executable bits are needed by upstream configure/build scripts.
    if kind == 'zip':
        for name, (directory, mode) in members.items():
            if mode:
                (destination / name).chmod(mode)
    require(not any(p.is_symlink() for p in destination.rglob('*')), 'Extracted tree contains a link')


def source_root(destination, project, pin):
    if project == 'sqlite':
        source = destination / ('sqlite-src-' + sqlite_code(pin['version']))
        for name in ('configure', 'Makefile.in', 'src/sqlite.h.in', 'ext/wasm/GNUmakefile'):
            require((source / name).is_file(), f'SQLite full-source archive missing {name}')
        require(os.access(source / 'configure', os.X_OK), 'SQLite configure lost its executable mode')
    else:
        candidates = [p.parent for p in destination.rglob('sqlite-vec.c') if (p.parent / 'sqlite-vec.h').is_file()]
        require(len(candidates) == 1, 'sqlite-vec archive must supply one amalgamation C/header pair')
        require(not any(p.name in ('sqlite3.c', 'sqlite3.h', '.git') for p in destination.rglob('*')), 'sqlite-vec archive includes a repository or vendored SQLite')
        source = candidates[0]
    return source


def acquire_lock(lock_bytes, parent, fetch=fetch_file, extract=extract_file):
    lock = validate_lock(json.loads(lock_bytes, object_pairs_hook=unique_object))
    parent = Path(parent)
    parent.mkdir(parents=True, exist_ok=True)
    workspace = Path(tempfile.mkdtemp(prefix='acquire-', dir=parent)).resolve()
    try:
        handoff = {'workspace': str(workspace),
                   'lockDigest': {'algorithm': 'sha256', 'value': hashlib.sha256(lock_bytes).hexdigest()}}
        for project, filename, kind in [('sqlite', 'sqlite.zip', 'zip'), ('sqliteVec', 'sqlite-vec.tar.gz', 'tar')]:
            pin = lock[project]
            archive = workspace / filename
            fetch(pin['archiveUrl'], archive)
            observed = digest_file(archive, pin['digest']['algorithm'])
            require(observed == pin['digest']['value'], f'{project}: downloaded archive digest mismatch (expected {pin["digest"]["value"]}, observed {observed})')
            members = archive_members(archive, kind)
            destination = workspace / project
            extract(archive, kind, destination, members)
            source = source_root(destination, project, pin)
            handoff[project] = {'version': pin['version'], 'sourcePath': str(source),
                                'archivePath': str(archive), 'digest': pin['digest'].copy()}
        (workspace / 'handoff.json').write_text(json.dumps(handoff, indent=2) + '\n')
        return handoff
    except BaseException:
        shutil.rmtree(workspace)
        raise


def recorded_lock(path):
    path = Path(path).resolve()
    require(path.is_relative_to(ROOT), 'Production source lock must be recorded inside this repository')
    raw = path.read_bytes()
    relative = path.relative_to(ROOT).as_posix()
    recorded = subprocess.run(['git', '-C', str(ROOT), 'show', ':' + relative],
                              stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=False)
    require(recorded.returncode == 0 and recorded.stdout == raw, 'Source lock must match the candidate Git index; stage reviewed pins before acquisition')
    validate_lock(json.loads(raw, object_pairs_hook=unique_object))
    return raw


def acquire_command(args):
    raw = recorded_lock(args.lock)
    handoff = acquire_lock(raw, ROOT / '.work/inputs')
    print(json.dumps(handoff))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    check = sub.add_parser('validate', help='Validate a source lock offline')
    check.add_argument('lock')
    resolve = sub.add_parser('resolve', help='Resolve independently latest stable or exact published releases, including sqlite-vec prereleases')
    resolve.add_argument('--sqlite-version')
    resolve.add_argument('--sqlite-vec-version')
    resolve.add_argument('--baseline-lock', help='Retain established pins and reject metadata drift')
    resolve.add_argument('--output', required=True, help='Explicit candidate lock path; parent must exist')
    acquire = sub.add_parser('acquire', help='Acquire fresh sources from recorded pins, verify, then emit a pair handoff')
    acquire.add_argument('--lock', default='inputs/sources.lock.json')
    args = parser.parse_args()
    try:
        if args.command == 'validate':
            validate_lock(read_json(args.lock))
        elif args.command == 'resolve':
            resolve_command(args)
        elif args.command == 'acquire':
            acquire_command(args)
    except (InputError, OSError, ValueError, subprocess.CalledProcessError, tarfile.TarError, zipfile.BadZipFile) as exc:
        print(f'inputs: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
