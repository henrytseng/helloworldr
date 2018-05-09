'use strict';

/**
 * Module dependencies
 */

class Hello {

  bootstrap() {

    // TODO list build targets
    // TODO show help
    // TODO build specific target
    // TODO build cache

  }

  configure() {

  }

  build() {

  }

  bundle() {

  }

}

// Execute immediately
if(__filename.match(process.argv[1])) (new Hello()).bootstrap();

module.exports = Hello;





const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const async = require('async');
const minimatch = require('minimatch');
const gaze = require('gaze');

// Get config
const config = require('./config');

// Bootstrap CLI
const argr = require('./cli')(process.argv);



/**
 * Track iterations
 */
var i = 1;
function _iteration() {
  return i++;
}

async.series([

  // Load config
  function(next) {
    if(argr.get('config')) {
      config.load(argr.get('config').file, next);

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
  if(!argr.get('quiet')) console.log('\x1b[34mWatching.\x1b[0m');

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

    if(!argr.get('quiet')) console.log('\x1b[34mRunning ['+_iteration()+']:', activity.replace(process.cwd()+path.sep, ''), '\x1b[0m');
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
      if(!argr.get('quiet')) console.log('\x1b[34mComplete.\x1b[0m');
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
