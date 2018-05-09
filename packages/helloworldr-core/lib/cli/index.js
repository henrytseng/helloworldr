'use strict';

/**
 * Module dependencies
 */
const path = require('path');
const Argr = require('argr');

module.exports = function(argv) {
  let argr;

  /**
   * Show help
   */
  function _displayHelp() {
    console.log('Usage: '+argr.command().split(path.sep).pop()+ ' {action} {options}');

    // Build options
    var maxLine = '';
    var i;
    var line;
    var instructions = [];
    argr.options().forEach(function(option) {
      var params = option.param.slice(0).map(function(p) {
        return (p.length === 1) ? '-'+p : '--'+p;
      });

      line = params.join(', ');
      if(line.length > maxLine.length) maxLine = line;
      instructions.push(line);
    });

    // Add descriptions
    argr.options().forEach(function(option, i) {
      var blanks = Array((maxLine.length + 3) - instructions[i].length).join(' ');
      line = ' ' + instructions[i] + blanks + option.description;
      instructions[i] = line;
    });
    console.log(instructions.join("\n"));
  }

  // Build an instance of Argr
  argr = Argr()
    .useStrict(true)
    .option(['c', 'config'], 'A configuration file (default: hello.config.json)', ['hello.config.json'], ['file'])
    .option(['q', 'quiet'], 'Quiet mode')
    .option(['h', 'help', '?'], 'Display help');

  // Check arguments
  try {
    argr.init(process.argv);
    if(argr.action()) {
      throw new Error("Action is required");
    }

  } catch(e) {
    console.error("Invalid argument\n");
    _displayHelp();
    process.exit(1);
  }

  // Display help
  if(argr.get('h')) {
    _displayHelp();
    process.exit();
  }

  return argr;
};
