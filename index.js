'use strict';

var fs = require('fs');
var path = require('path');

function branch(cwd, cb) {
  if (typeof cwd === 'function') {
    cb = cwd;
    cwd = process.cwd();
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected callback to be a function');
  }

  gitHeadpath(cwd, false, function(headFile) {
    fs.readFile(headFile, function(err, buf) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, parseBranches(buf));
    })
  });
}

branch.sync = function configSync(cwd) {
  return parseBranches(fs.readFileSync(gitHeadpath(cwd || process.cwd(), true)))
};

function gitHeadpath(cwd, isSync, cb) {
  var headFile = path.resolve(cwd, process.env.GIT_DIR || '.git', 'HEAD');

  if (isSync) {
    if (!fs.existsSync(headFile)) {
      return onNoHeadFound();
    }

    return headFile;
  }

  fs.exists(headFile, function (exists) {
    if (exists) {
      cb(headFile);
    } else {
      onNoHeadFound();
    }
  });

  function onNoHeadFound() {
    if (cwd === path.resolve(cwd, '..')) {
      throw new Error('.git/HEAD does not exist');
    }

    return gitHeadpath(path.resolve(cwd, '..'), isSync, cb);
  }
}

function parseBranches(str) {
  var match = /ref: refs\/heads\/([^\n]+)/.exec(String(str));
  return match && match[1];
}

/**
 * Expose `branch`
 */

module.exports = branch;
