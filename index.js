'use strict';

var fs = require('fs');
var path = require('path');

/**
 * Expose `config`
 */

module.exports = branch;

function branch(cwd, cb) {
  if (typeof cwd === 'function') {
    cb = cwd; cwd = null;
  }

  if (typeof cb !== 'function') {
    throw new TypeError('git-branch expects a callback function.');
  }

  read(resolve(cwd), function (err, buffer) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, parse(buffer.toString()));
  });
}

branch.sync = function configSync(cwd) {
  var fp = resolve(cwd);
  if (!fs.existsSync(fp)) {
    throw new Error('.git/HEAD does not exist.');
  }
  return parse(fs.readFileSync(fp, 'utf8'));
};

function read(fp, cb) {
  try {
    fs.readFile(fp, function (err, config) {
      if (err) {
        return cb(err);
      }
      cb(null, config);
    });
  } catch (err) {
    cb(err);
  }
}

function resolve(cwd) {
  return path.join(cwd || process.cwd(), '.git/HEAD');
}

function parse(str) {
  var re = /ref: refs\/heads\/([^\n]+)/;
  var match = re.exec(str);
  if (match) return match[1];
  return null;
}
