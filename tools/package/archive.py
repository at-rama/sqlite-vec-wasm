#!/usr/bin/env python3
"""Inspect exact npm tarball contents before extracting regular files."""
import hashlib
import json
from pathlib import Path, PurePosixPath
import sys
import tarfile


def inspect(request):
    records = request['files']
    expected = {r['name']: r for r in records}
    if len(expected) != len(records) or not expected:
        raise ValueError('Duplicate or empty expected inventory')
    for name in expected:
        if '\\' in name or str(PurePosixPath(name)) != name or name.startswith('/') or '..' in PurePosixPath(name).parts:
            raise ValueError('Unsafe expected path')
    directories = {'package'}
    for name in expected:
        directories.update('package/' + str(p) for p in PurePosixPath(name).parents if str(p) != '.')
    contents = {}
    seen = set()
    with tarfile.open(request['archive'], 'r:gz') as archive:
        for member in archive:
            name = member.name.rstrip('/') if member.isdir() else member.name
            if name in seen or '\\' in name or '..' in PurePosixPath(name).parts or str(PurePosixPath(name)) != name:
                raise ValueError('Duplicate or unsafe archive entry')
            seen.add(name)
            if member.isdir():
                if name not in directories:
                    raise ValueError('Unexpected archive directory')
                continue
            if not member.isfile() or not name.startswith('package/'):
                raise ValueError('Nonregular or misplaced archive file')
            relative = name[len('package/'):]
            if relative not in expected:
                raise ValueError('Unexpected archive file: ' + relative)
            record = expected[relative]
            if member.size != record['size']:
                raise ValueError('Archive size mismatch: ' + relative)
            data = archive.extractfile(member).read()
            if hashlib.sha256(data).hexdigest() != record['sha256']:
                raise ValueError('Archive hash mismatch: ' + relative)
            contents[relative] = data
    if set(contents) != set(expected):
        raise ValueError('Missing archive files')
    destination = Path(request['destination'])
    destination.mkdir(parents=True, exist_ok=False)
    for name, data in contents.items():
        path = destination / name
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open('xb') as stream:
            stream.write(data)
    return {'directory': str(destination), 'files': len(contents)}


if __name__ == '__main__':
    try:
        print(json.dumps(inspect(json.load(sys.stdin))))
    except (ValueError, KeyError, TypeError, OSError, tarfile.TarError) as error:
        print('Archive: ' + str(error), file=sys.stderr)
        sys.exit(1)
