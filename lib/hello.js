'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var async = require('async');
var minimatch = require('minimatch');
var gaze = require('gaze');

var Argr = require('argr');
var config = require('./config');

// Args
var args = Argr()
  .useStrict(true)
  .option(['c', 'config'], 'A configuration file (default: .helloworldr)', ['.helloworldr'], ['file'])
  .option(['q', 'quiet'], 'Quiet mode')
  .option(['h', 'help', '?'], 'Display help');

/**
 * Show help
 */
function _displayHelp() {
  console.log('Usage: '+args.command().split(path.sep).pop());

  // Build options
  var maxLine = '';
  var i;
  var line;
  var instructions = [];
  args.options().forEach(function(option) {
    var params = option.param.slice(0).map(function(p) {
      return (p.length === 1) ? '-'+p : '--'+p;
    });

    line = params.join(', ');
    if(line.length > maxLine.length) maxLine = line;
    instructions.push(line);
  });

  // Add descriptions
  args.options().forEach(function(option, i) {
    var blanks = Array((maxLine.length + 3) - instructions[i].length).join(' ');
    line = ' ' + instructions[i] + blanks + option.description;
    instructions[i] = line;
  });
  console.log(instructions.join("\n"));
}

/**
 * Track iterations
 */
var i = 1;
function _iteration() {
  return i++;
}

// Check arguments
try {
  args.init(process.argv);

} catch(e) {
  console.error("Syntax error\n");
  _displayHelp();
  process.exit(1);
}

// Display help
if(args.get('h')) {
  _displayHelp();
  process.exit();
}

async.series([

  // Load config
  function(next) {
    if(args.get('config')) {
      config.load(args.get('config').file, next);

    } else {
      next();
    }
  }

], function(err) {
  if(err) {
    console.error(err.stack || err);
    process.exit(1);
  }

  // Each entry
  var actionItems = config.watch || {};
  if(!args.get('quiet')) console.log('\x1b[34mWatching.\x1b[0m');

  // Get command according to file
  function _getCmd(fileRef) {
    for(var p in actionItems) {
      if(minimatch(fileRef, p)) return actionItems[p];
    }
    return null;
  }

  // Execute associated command
  function _exec(fileRef) {
    var cmd = _getCmd(fileRef);
    if(!cmd) return;

    var activity = cmd.replace(/%[0-9]/, fileRef);

    if(!args.get('quiet')) console.log('\x1b[34mRunning ['+_iteration()+']:', activity.replace(process.cwd()+path.sep, ''), '\x1b[0m');
    var child = exec(activity);

    // Timeout
    var timerInterval = setTimeout(function() {
      child.kill('SIGHUP');
    }, config.timeout * 1000);

    child.stdout.on('data', function(data) {
      process.stdout.write(data);
    });
    child.stderr.on('data', function(data) {
      process.stderr.write(data);
    });

    // Complete
    child.on('close', function() {
      clearTimeout(timerInterval);
      if(!args.get('quiet')) console.log('\x1b[34mComplete.\x1b[0m');
    });
  }

  /**
   * Watch file pattern
   */
  gaze([], function(err, watcher) {
    if(err) {
      console.error(err.stack || err);
      process.exit(1);
    }

    // Add watchers individually
    for(var p in actionItems) {
      this.add(p, function(err, watcher) {
        if(err) {
          console.error(err.stack || err);
          process.exit(1);
        }
      });
    }

    // Added event
    this.on('added', function(filePath) {
      var fileRef = path.relative(process.cwd(), filePath);
      _exec(fileRef);
    });

    // Changed event
    this.on('changed', function(filePath) {
      var fileRef = path.relative(process.cwd(), filePath);
      _exec(fileRef);
    });

  });

});