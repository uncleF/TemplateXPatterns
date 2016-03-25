//Gruntfile for the TemplateXPatterns Project

'use strict';

const DEVELOPMENT_DIR  = 'dev';        // Project Development

const RESOURCES_DIR    = 'res';        // Resources (CSS, JavaScript)
const COMPONENTS_DIR   = 'components'; // Components

const TEMPLATES_DIR    = 'templates';  // Templates

const SASS_DIR         = 'sass';       // Sass
const CSS_DIR          = 'css';        // Generated CSS

const JS_DEV_DIR       = 'js-dev';     // JavaScript
const JS_DIR           = 'js';         // Production JavaScript
const JS_BUNDLE        = 'scripts';    // Production JavaScript Filename

module.exports = function(grunt) {

  var project = {
    dir: `${DEVELOPMENT_DIR}/`,
    res: {
      dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}`,
      templates: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${TEMPLATES_DIR}/`,
        comp: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${TEMPLATES_DIR}/${COMPONENTS_DIR}/`
      },
      css: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${CSS_DIR}/`,
        sass: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${SASS_DIR}/`,
        comp: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${SASS_DIR}/${COMPONENTS_DIR}/`
      },
      js: {
        dir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${JS_DIR}/`,
        devDir: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${JS_DEV_DIR}/`,
        comp: `${DEVELOPMENT_DIR}/${RESOURCES_DIR}/${JS_DEV_DIR}/${COMPONENTS_DIR}/`,
        bundle: JS_BUNDLE
      }
    }
  };

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    htmlhint: {
      options: {
        'htmlhintrc': '.htmlhintrc'
      },
      test: {
        cwd: project.dir,
        src: ['*.html'],
        expand: true
      }
    },
    scsslint: {
      test: {
        cwd: project.res.css.sass,
        src: ['**/*.{scss,sass}'],
        expand: true
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      test: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.dir,
        expand: true
      }
    },
    csscss: {
      options: {
        shorthand: false,
        verbose: true
      },
      test: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        expand: true
      }
    },
    jscs: {
      options: {
        config: '.jscsrc'
      },
      test: {
        cwd: project.res.js.devDir,
        src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}**\*.js`],
        expand: true
      }
    },
    jshint: {
      options: {
        'jshintrc': '.jshintrc'
      },
      test: {
        cwd: project.res.js.devDir,
        src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}**\*.js`],
        expand: true
      }
    },
    jsinspect: {
      test: {
        cwd: project.res.js.devDir,
        src: ['*.js', `${project.res.js.comp.replace(project.dir, '')}**\*.js`],
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
        cwd: project.res.css.dir,
        src: ['*.css'],
        expand: true
      }
    },

    browserify: {
      bundle: {
        options: {
          transform: [['babelify', {'presets': ['es2015']}]]
        },
        cwd: project.res.js.devDir,
        src: ['*.js'],
        dest: project.res.js.dir,
        expand: true
      }
    },

    sass: {
      options: {
        sourceMap: true,
        precision: 5
      },
      generate: {
        cwd: project.res.css.sass,
        src: ['**/*.{scss,sass}'],
        dest: project.res.css.dir,
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
      prefix: {
        cwd: project.res.css.dir,
        src: ['*.css'],
        dest: project.res.css.dir,
        expand: true
      }
    },

    processhtml: {
      options: {
        includeBase: project.res.templates.comp,
        commentMarker: '@tx-process',
        recursive: true
      },
      templates: {
        cwd: project.res.templates.dir,
        src: ['*.html', '!* copy*.html', '!* - Copy*.html'],
        dest: project.dir,
        expand: true
      }
    },

    clean: {
      reports: [`*.css`],
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: [`${project.res.templates.dir}**/*.html`],
        tasks: ['processhtml']
      },
      sass: {
        files: [project.res.css.sass + '**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      },
      javascript: {
        files: [project.res.js.devDir + '**/*.js'],
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [`${project.dir}*.html`, `${project.res.css.dir}**/*.css`, `${project.res.js.dir}**/*.{js,json}`]
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true,
        limit: 4
      },
      projectWatch: ['watch:html', 'watch:sass', 'watch:javascript', 'watch:livereload']
    }

  });

  grunt.registerTask('quality', [
    'htmlhint',
    'scsslint',
    'csslint',
    'csscss',
    'jscs',
    'jshint',
    'jsinspect',
    'clean'
  ]);

  grunt.registerTask('performance', [
    'analyzecss'
  ]);

  grunt.registerTask('generate-css', [
    'sass',
    'autoprefixer'
  ]);

  grunt.registerTask('watch-project', [
    'concurrent'
  ]);

  grunt.registerTask('compile', [
    'processhtml',
    'generate-css',
    'browserify'
  ]);

  grunt.registerTask('build', [
    'compile',
    'quality',
    'performance'
  ]);

};
