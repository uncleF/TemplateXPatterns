'use strict';

module.exports = (grunt, options) => {

  grunt.registerTask('process-html', [
    'processhtml'
  ]);

  grunt.registerTask('process-css', [
    'sass',
    'postcss',
    'cssc'
  ]);

  grunt.registerTask('process-js', [
    'browserify',
  ]);

};
