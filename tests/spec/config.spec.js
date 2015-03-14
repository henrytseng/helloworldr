'use strict';

var assert = require("assert");

describe('config', function(){

  describe('#set()', function(){
    it('Should override default configuration', function(done){
      var config = require(process.cwd()+'/lib/config');

      assert.ok(config);
      assert.equal(config.timeout, 60);

      config.set(({
        timeout: 20
      }));

      assert.equal(config.timeout, 20);
      done();
    });
  });

  describe('#load()', function(){
    it('Should load external configuration file', function(done){
      var config = require(process.cwd()+'/lib/config');

      assert.ok(config);

      config.load(process.cwd()+'/tests/data/config.json', function(err, configLoaded) {
        assert.ok(!err);
        assert.ok(configLoaded);
        assert.equal(configLoaded.timeout, 300);

        done();
      });
    });
  });

  describe('#reset()', function(){
    it('Should load external configuration file', function(done){
      var config = require(process.cwd()+'/lib/config');

      assert.ok(config);
      assert.equal(config.reset().timeout, 60);

      done();
    });
  });
});
