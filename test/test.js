'use strict';

const cp = require('child_process');
const gfc = require('gfc');
const path = require('path');
const util = require('util');
const assert = require('assert');
const rimraf = util.promisify(require('rimraf'));
const branch = require('..');
const fixturesBase = path.join(__dirname, 'fixtures');
const fixtures = path.join(fixturesBase, 'git');
const worktreeFixtures = path.join(fixturesBase, 'worktree');

const exec = util.promisify(cp.exec);
const createWorktree = async(gitDir) => exec(['git', 'worktree', 'add', '-b', 'some-branch', worktreeFixtures].join(' '), { cwd: gitDir });

const create = async() => {
  await rimraf(fixturesBase);
  await gfc(fixtures);
  await createWorktree(fixtures);
};



describe('git-branch', function() {
  beforeEach(() => create());
  afterEach(() => rimraf(fixturesBase));

  it('should get branch (sync)', () => assert.equal(branch.sync(fixtures), 'master'));
  it('should get branch (promise)', function() {
    return branch(fixtures).then(res => assert.equal(res, 'master'));
  });
  it('should get branch (async)', function(cb) {
    branch(fixtures, function(err, res) {
      if (err) return cb(err);
      assert.equal(res, 'master');
      cb();
    });
  });
  it('should work with a git worktree', () => assert.strictEqual(branch.sync(worktreeFixtures), 'some-branch'));
});
