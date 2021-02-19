'use strict';

const fs = require('fs');
const util = require('util');
const find = require('find-git-root');
const path = require('path');
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
  cwd = cwd || process.cwd()
  const filepath = path.join(find(cwd), 'HEAD');
  if (!fs.existsSync(filepath)) {
    throw new Error(`${path.relative(cwd, filepath)} does not exist`);
  }
  return filepath;
}

/**
 * Expose `branch`
 */

module.exports = branch;
