'use strict';

const gfc = require('gfc');
const path = require('path');
const util = require('util');
const assert = require('assert');
const rimraf = util.promisify(require('rimraf'));
const branch = require('..');
const fixtures = path.join(__dirname, 'fixtures');

const create = async() => await rimraf(fixtures).then(() => gfc(fixtures));

describe('git-branch', function() {
  beforeEach(() => create());
  afterEach(() => rimraf(fixtures));

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
});
