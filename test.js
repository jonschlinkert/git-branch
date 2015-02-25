/*!
 * git-branch <https://github.com/jonschlinkert/git-branch>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var branch = require('./');

describe('git branch', function () {
  it('should return the current git branch:', function () {
    assert(branch() === 'master');
  });
});
