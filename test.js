/*!
 * git-branch <https://github.com/jonschlinkert/git-branch>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var branch = require('./');

describe('async', function () {
  it('should return the current git branch:', function () {
    branch(function (err, res) {
      assert(res === 'master');
    });
  });
});

describe('sync', function () {
  it('should return the current git branch:', function () {
    assert(branch.sync() === 'master');
  });
});
