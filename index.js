const shell = require('shelljs');

/**
 * Get the current branch for a local git repository
 */

module.exports = shell.exec('git rev-parse --abbrev-ref HEAD', {
  silent: true
}).output;

console.log(module.exports)