"""Exercise the repository gateway against disposable tracked working snapshots."""

import hashlib
import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SOURCE = Path(__file__).resolve().parents[3]


class RepositoryGateway(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.repo = Path(self.temp.name)
        self.env = dict(os.environ, GIT_CONFIG_NOSYSTEM='1',
                        GIT_CONFIG_GLOBAL=os.devnull, PYTHONDONTWRITEBYTECODE='1')
        self.git('init', '-q')
        self.git('config', 'user.name', 'Repository test')
        self.git('config', 'user.email', 'repository-test@example.invalid')
        files = ['README.md', 'AGENTS.md', '.gitignore',
                 '.42p/standards/software.md', '.42p/standards/openspec.md',
                 '.42p/openspec/config.yaml', 'tools/check-repository.sh',
                 'tools/inputs.py', 'inputs/sources.lock.json']
        files += [str(p.relative_to(SOURCE)) for p in
                  (SOURCE / '.42p/engineering').glob('*_capture_edit-*.md')]
        files += [str(p.relative_to(SOURCE)) for p in
                  (SOURCE / '.42p/engineering').glob('*_allocation_edit-*.md')]
        for name in files:
            self.write(name, (SOURCE / name).read_text())
        self.git('add', '-A')
        self.git('commit', '-qm', 'Valid fixture')
        self.allocation = next(self.repo.glob('.42p/engineering/*_allocation_edit-*.md'))
        self.captures = sorted(self.repo.glob('.42p/engineering/*_capture_edit-*.md'))

    def git(self, *args):
        return subprocess.check_output(['git', *args], cwd=self.repo,
                                       env=self.env, stderr=subprocess.PIPE, text=True).strip()

    def write(self, name, text):
        path = self.repo / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text)

    def check(self, passed=True, message=None):
        result = subprocess.run(['sh', 'tools/check-repository.sh'], cwd=self.repo,
                                env=self.env, capture_output=True, text=True)
        if passed:
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        else:
            self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        if message:
            self.assertIn(message, result.stdout + result.stderr)

    def test_current_captures_pass_without_spec(self):
        self.assertFalse((self.repo / 'SPEC.md').exists())
        self.check(message='Repository checks passed')

    def test_additional_capture_requires_no_fixed_count(self):
        name = '2026-10-08_extra_capture_edit-0.1.md'
        text = '# Extra Capture\n\nAn explicitly supplied extra scope.\n'
        self.write('.42p/engineering/' + name, text)
        digest = hashlib.sha256(text.encode()).hexdigest()
        allocation = self.allocation.read_text().replace(
            '## Allocation units',
            f'- [Extra Capture]({name}), snapshot SHA-256 `{digest}`.\n\n## Allocation units')
        self.allocation.write_text(allocation)
        self.git('add', '-A')
        self.check()

    def test_retired_root_spec_tracked_case_variants_fail(self):
        for name in ('SPEC.md', 'spec.md', 'Spec.md'):
            with self.subTest(name=name):
                self.write(name, '# Retired\n')
                self.git('add', name)
                self.check(False, 'Root SPEC.md is retired')
                self.git('rm', '-f', name)

    def test_untracked_root_spec_and_symlink_fail(self):
        self.write('spec.md', '# Retired\n')
        self.check(False, 'including untracked/case variants')
        (self.repo / 'spec.md').unlink()
        (self.repo / 'SPEC.md').symlink_to('missing')
        self.check(False, 'including untracked/case variants')

    def test_entry_points_must_exist_and_be_tracked(self):
        for name in ('README.md', 'AGENTS.md', '.42p/standards/software.md',
                     '.42p/standards/openspec.md', '.42p/openspec/config.yaml', '.gitignore'):
            with self.subTest(name=name):
                text = (self.repo / name).read_text()
                self.git('rm', '-f', name)
                self.check(False, 'Missing repository authority or integrity')
                self.write(name, text)
                self.check(False, 'Missing repository authority or integrity')
                self.git('add', name)
        self.check()

    def test_symlink_entry_point_fails(self):
        (self.repo / 'README.md').unlink()
        (self.repo / 'README.md').symlink_to('AGENTS.md')
        self.git('add', 'README.md')
        self.check(False, 'Missing repository authority or integrity')

    def test_root_openspec_directory_and_symlink_fail(self):
        path = self.repo / 'openspec'
        path.mkdir()
        self.check(False, 'root-level openspec is forbidden')
        path.rmdir()
        path.symlink_to('missing')
        self.check(False, 'root-level openspec is forbidden')

    def test_authority_drift_fails_in_both_entry_points(self):
        for name in ('AGENTS.md', '.42p/openspec/config.yaml'):
            with self.subTest(name=name):
                path = self.repo / name
                text = path.read_text()
                path.write_text(text.replace('Instituted decisions and sources ground the design.',
                                            'Capture institutes its own authority.'))
                self.check(False, 'must preserve instituted decision/source authority')
                path.write_text(text)

    def test_missing_capture_or_allocation_fails(self):
        for path in [*self.captures, self.allocation]:
            with self.subTest(path=path.name):
                text = path.read_text()
                path.unlink()
                self.check(False, 'Design input must be a tracked regular file')
                path.write_text(text)

    def test_no_capture_and_duplicate_allocation_fail(self):
        for path in self.captures:
            self.git('rm', '-f', str(path.relative_to(self.repo)))
        self.check(False, 'Expected tracked Captures and one global Allocation')
        self.git('reset', '--hard', 'HEAD')
        name = '.42p/engineering/2026-10-08_duplicate_allocation_edit-0.1.md'
        self.write(name, self.allocation.read_text())
        self.git('add', name)
        self.check(False, 'Expected tracked Captures and one global Allocation')

    def test_capture_symlink_or_empty_file_fails(self):
        path = self.captures[0]
        path.unlink()
        path.symlink_to(self.captures[1].name)
        self.git('add', str(path.relative_to(self.repo)))
        self.check(False, 'Design input must be a tracked regular file')
        path.unlink()
        path.write_text('')
        self.git('add', str(path.relative_to(self.repo)))
        self.check(False, 'Empty design input')

    def test_stale_capture_hash_fails_in_working_snapshot(self):
        path = self.captures[0]
        path.write_text(path.read_text() + '\nA changed input.\n')
        self.check(False, 'Stale Allocation Capture snapshot')

    def test_missing_duplicate_and_untracked_input_fail(self):
        original = self.allocation.read_text()
        line = next(x for x in original.splitlines() if x.startswith('- [Distribution Capture]'))
        variants = [original.replace(line + '\n', ''),
                    original.replace(line, line + '\n' + line),
                    original.replace(self.captures[0].name, 'untracked_capture_edit-0.1.md')]
        for text in variants:
            with self.subTest(text=text[:80]):
                self.allocation.write_text(text)
                self.check(False, 'must name every tracked Capture exactly once')

    def test_tracked_ignored_output_fails_even_when_force_added(self):
        name = '.work/generated.txt'
        self.write(name, 'Generated output\n')
        self.git('add', '-f', name)
        self.check(False, 'Tracked files violate repository ignore rules')

    def test_external_ignore_configuration_does_not_reject_authored_file(self):
        ignore = Path(self.temp.name + '-ignore')
        self.addCleanup(lambda: ignore.unlink(missing_ok=True))
        ignore.write_text('authored.txt\n')
        self.git('config', 'core.excludesFile', str(ignore))
        self.write('authored.txt', 'Repository input\n')
        self.git('add', '-f', 'authored.txt')
        self.check()

    def test_whitespace_in_unchanged_commit_still_fails(self):
        self.write('bad.txt', 'Trailing space \n')
        self.git('add', 'bad.txt')
        self.git('commit', '-qm', 'Bad tracked whitespace')
        self.check(False, 'trailing whitespace')

    def test_invalid_source_lock_still_fails(self):
        self.write('inputs/sources.lock.json', '{}\n')
        self.check(False)


if __name__ == '__main__':
    unittest.main()
