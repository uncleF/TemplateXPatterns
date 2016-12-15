var CONFIG = {

  DEVELOPMENT_DIR: 'dev',            // Development

  TESTS_DIR: 'tests',                // Tests
  MOCHA_DIR: 'mocha',                // Mocha

  RESOURCES_DIR: 'res',              // Resources
  COMPONENTS_DIR: 'components',      // Components

  TEMPLATES_DIR: 'templates',        // Templates

  SASS_DIR: 'sass',                 // Sass
  CSS_DIR: 'css',                   // CSS
  CSS_FILENAME: 'styles',           // CSS Filename

  JS_DEV_DIR: 'js-dev',             // Development JavaScript
  JS_DIR: 'js',                     // JavaScript
  JS_BUNDLE: 'scripts',             // JavaScript Filename

}

module.exports = function(grunt) {

  var loadConfig = require('load-grunt-config');
  var configPath = `${process.cwd()}/grunt/tasks/`
  var staticMappings = require('./grunt/tx/tx-mapping');
  var data = require('./grunt/tx/tx-config')(CONFIG);

  loadConfig(grunt, {configPath: configPath, jitGrunt: {staticMappings: staticMappings}, data: data});
  loadConfig(grunt, {jitGrunt: true, init: false, data: data });

};
