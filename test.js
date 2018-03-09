/*!
 * git-branch <https://github.com/jonschlinkert/git-branch>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var branch = require('./');
var path = require('path')

describe('git-branch', function() {
  describe('async', function() {
    it('should return the current git branch', function(cb) {
      branch(function(err, res) {
        if (err) return cb(err);
        assert.equal(res, 'master');
        cb();
      });
    });
  });

  describe('sync', function() {
    it('should return the current git branch', function() {
      assert.equal(branch.sync(), 'master');
    });
  });

  describe('subdir', function() {
    it('should return the current git branch from a subdir', function(cb) {
      branch(path.resolve(__dirname, 'node_modules'), function(err, res) {
        if (err) return cb(err);
        assert.equal(res, 'master');
        cb();
      });
    });
  });
});
