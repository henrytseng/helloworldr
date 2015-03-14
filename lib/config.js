'use strict';

/**
 * Module dependencies
 */
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

// Default settings
var _defaults = {
  timeout: 60
};

var _config;

/**
 * Config
 */
module.exports = (function() {
  // Initialize
  if(!_config) {
    _config = _.clone(_defaults);

    /**
     * Set values and override settings, merging new settings to current
     * 
     * @param  {Object} data A data object
     * @return {Config}      Iteself, chainable
     */
    var _set = function(data) {
      // Acceptable config values
      var acceptable = [
        'timeout',
        'watch'
      ];

      // Set available
      Object.keys(data).forEach(function(name) {
        if(acceptable.indexOf(name) !== -1) {
          _config[name] = data[name];
        }
      });

      return _config;
    };
    Object.defineProperty(_config, 'set', {
      enumerable: false,
      value: _set
    });

    /**
     * Load external configuration
     * 
     * @param  {String}   file     A file to load
     * @param  {Function} callback A callback, function(err)
     * @return {Config}            Iteself, chainable
     */
    Object.defineProperty(_config, 'load', {
      enumerable: false,
      value: function(file, callback) {
        fs.readFile(file, function(err, data) {
          if(err) {
            return callback(err);
            
          } else if(!data) {
            return callback(new Error('Unable to find configuration JSON'));
          }

          try {
            callback(null, _set(JSON.parse(data)));

          } catch(err) {
            return callback(new Error('Unable  to parse configuration JSON'));
          }
        });

        return _config;
      }
    });

    /**
     * Reset
     * 
     * @return {Config}            Iteself, chainable
     */
    Object.defineProperty(_config, 'reset', {
      enumerable: false,
      value: function(file, callback) {
        return _config = _.clone(_defaults);
      }
    });

  }

  return _config;
})();