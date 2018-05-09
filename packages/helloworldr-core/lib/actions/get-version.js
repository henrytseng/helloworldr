'use strict';

const Action = require('./index');

class GetVersion extends Action {
  execute() {
    var packageConfig = require('../../package.json');
    process.stdout.write(packageConfig.version);
  }
}

// Execute action immediately
if(__filename.match(process.argv[1])) (new GetVersion).execute();

module.exports = GetVersion;
