'use strict';

var git = require('parse-git-config');

module.exports = function(cwd) {
  var config = git.sync(cwd);
  var branch = null;

  for (var key in config) {
    if (config.hasOwnProperty(key)) {
      if (key.indexOf('branch') !== -1) {
        var segs = key.split(' ');
        if (segs && segs[1]) {
          return JSON.parse(segs[1]);
        }
      }
    }
  }
  return branch;
}
