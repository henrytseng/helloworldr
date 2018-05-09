'use strict';

const Action = require('./index');

class Noop extends Action {
  execute() {

  }
}

module.exports = Noop;
