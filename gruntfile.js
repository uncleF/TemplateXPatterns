//Gruntfile for the TemplateXPatterns Project

var DEVELOPMENT_DIR  = 'dev';        // Project Development
var RESOURCES_DIR    = 'res';        // Resources (CSS, JavaScript)
var COMPONENTS_DIR   = 'components'; // Components
var TEMPLATES_DIR    = 'templates';  // Templates
var SASS_DIR         = 'sass-dev';   // Sass
var CSS_DEV_DIR      = 'css-dev';    // Generated CSS
var JS_DIR           = 'js';         // Production JavaScript
var JS_DEV_DIR       = 'js-dev';     // JavaScript
var JS_FILENAME      = 'scripts';    // Production JavaScript Filename

function fillAnArray(array, path) {
  var result = [];
  for (var element in array) {
    result.push(path + array[element]);
  }
  return result;
}

module.exports = function(grunt) {

  var project = {
    init: function() {
      this.dir = DEVELOPMENT_DIR + '/';
      var resourcesDirCompiled = this.dir + RESOURCES_DIR + '/';
      this.templates = {
        dir: this.dir + TEMPLATES_DIR + '/',
        comp: this.dir + TEMPLATES_DIR + '/' + COMPONENTS_DIR + '/'
      };
      this.res = {
        dir: resourcesDirCompiled,
        css: {
          devDir: resourcesDirCompiled + CSS_DEV_DIR + '/',
          sass: resourcesDirCompiled + SASS_DIR + '/',
          comp: resourcesDirCompiled + SASS_DIR + '/' + COMPONENTS_DIR + '/'
        },
        js: {
          dir: resourcesDirCompiled + JS_DIR + '/',
          devDir: resourcesDirCompiled + JS_DEV_DIR + '/',
          comp: resourcesDirCompiled + JS_DEV_DIR + '/' + COMPONENTS_DIR + '/',
          filename: JS_FILENAME
        }
      };
      return this;
    }
  }.init();

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    htmlhint: {
      options: {
        'htmlhintrc': '.htmlhintrc'
      },
      htmlHint: {
        cwd: project.dir,
        src: ['*.html'],
        expand: true
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      jscs: {
        cwd: project.res.js.devDir,
        src: ['*.js', '!*.min.js'],
        expand: true
      }
    },
    jshint: {
      options: {
        'jshintrc': '.jshintrc'
      },
      jsHint: {
        cwd: project.res.js.devDir,
        src: ['*.js', '!*.min.js'],
        expand: true
      }
    },
    jsinspect: {
      jsInspect: {
        cwd: project.res.js.devDir,
        src: ['*.js', '!*.min.js'],
        expand: true
      }
    },
    scsslint: {
      scssLint: {
        cwd: project.res.css.sass,
        src: ['**/*.scss'],
        expand: true
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      cssLint: {
        cwd: project.res.css.devDir,
        src: ['*.css', '!*-IE.css'],
        expand: true
      }
    },
    csscss: {
      options: {
        shorthand: false,
        verbose: true
      },
      csscssTest: {
        src: project.res.css.devDir + '*.css'
      }
    },
    arialinter: {
      options: {
        level: 'A'
      },
      ariaLinter: {
        cwd: project.dir,
        src: ['*.html'],
        expand: true
      }
    },

    analyzecss: {
      options: {
        outputMetrics: 'error',
        softFail: true,
        thresholds: grunt.file.readJSON('.analyzecssrc')
      },
      ananlyzeCSS: {
        cwd: project.res.css.devDir,
        src: [project.res.css.filename + '.min.css'],
        expand: true
      }
    },

    browserify: {
      bundle: {
        files: {
          bundleFiles: function() {
            var bundleFilesObject = {};
            bundleFilesObject[project.res.js.dir + project.res.js.filename + '.js'] = [project.res.js.devDir + project.res.js.filename + '.js'];
            return bundleFilesObject;
          }
        }.bundleFiles()
      }
    },

    sass: {
      options: {
        sourceMap: true,
        precision: 5
      },
      generateCSS: {
        cwd: project.res.css.sass,
        src: ['**/*.{scss,sass}', '!**/tx/*.{scss,sass}'],
        dest: project.res.css.devDir,
        ext: '.css',
        expand: true
      }
    },
    autoprefixer: {
      options: {
        map: true,
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer >= 7'],
        cascade: false
      },
      prefixCSS: {
        cwd: project.res.css.devDir,
        src: ['**/*.css', '!**/*-IE.css'],
        dest: project.res.css.devDir,
        expand: true
      }
    },

    csscomb: {
      options: {
        config: '.csscombrc'
      },
      cssSortDev: {
        cwd: project.res.css.devDir,
        src: ['*.css'],
        dest: project.res.css.devDir,
        expand: true
      }
    },

    processhtml: {
      options: {
        includeBase: project.templates.comp,
        commentMarker: '@tx-process',
        recursive: true
      },
      templates: {
        cwd: project.templates.dir,
        src: ['*.html', '!* copy.html'],
        dest: project.dir,
        ext: '.html',
        expand: true
      }
    },

    watch: {
      options: {
        spawn: false
      },
      javascript: {
        files: [project.res.js.devDir + '**/*.js'],
        tasks: ['browserify']
      },
      sass: {
        files: [project.res.css.sass + '**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      html: {
        files: [project.templates.dir + '**/*.html'],
        tasks: ['processhtml']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [project.dir + '*.html', project.res.css.devDir + '**/*.css', project.res.js.dir + '**/*.js']
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 4
      },
      projectWatch: ['watch:javascript', 'watch:sass', 'watch:html', 'watch:livereload']
    }

  });

  grunt.registerTask('quality', ['htmlhint', 'jscs', 'jshint', 'jsinspect', 'scsslint', 'csslint', 'csscss', 'arialinter']);

  grunt.registerTask('performance', ['analyzecss']);

  grunt.registerTask('generate-css', ['sass', 'autoprefixer']);

  grunt.registerTask('watch-project', ['concurrent']);

  grunt.registerTask('compile', ['browserify', 'generate-css', 'processhtml']);

  grunt.registerTask('build', ['compile']);

};
