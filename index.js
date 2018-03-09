'use strict';

const fs = require('fs');
const util = require('util');
const find = require('findup-sync');
const readFile = util.promisify(fs.readFile);

function branch(cwd, callback) {
  if (typeof cwd === 'function') {
    callback = cwd;
    cwd = null;
  }

  const promise = readFile(gitHeadPath(cwd)).then(buf => parseBranch(buf));

  if (typeof callback === 'function') {
    promise.then(res => callback(null, res)).catch(callback);
    return;
  }

  return promise;
}

branch.sync = function(cwd) {
  return parseBranch(fs.readFileSync(gitHeadPath(cwd)));
};

function parseBranch(buf) {
  const match = /ref: refs\/heads\/([^\n]+)/.exec(buf.toString());
  return match ? match[1] : null;
}

function gitHeadPath(cwd) {
  const filepath = find('.git/HEAD', { cwd: cwd || process.cwd() });
  if (!fs.existsSync(filepath)) {
    throw new Error('.git/HEAD does not exist');
  }
  return filepath;
}

/**
 * Expose `branch`
 */

module.exports = branch;
