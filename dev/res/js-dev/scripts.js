/* jshint browser:true */
/* global Modernizr */

var $ = require('jquery');

(function() {

  var addEvent = require('./components/tx-event');
  var customFileInputs = require('./components/tx-fileInput');
  var loadFonts = require('./components/tx-loadFonts');
  var placeholders = require('./components/tx-placeholders');
  var rAF = require('./components/tx-rAF');
  var togglable = require('./components/tx-togglable');
  var translate = require('./components/tx-translate');
  var swipe = require('./components/tx-swipeGallery');
  var whichTransition = require('./components/tx-transition');

  var slides = $('.slides');
  var dotsSize = $('.slide').size();

  customFileInputs('#file');

  loadFonts('RobotoCritical', ['Roboto', 'RobotoBold', 'RobotoItalic', 'RobotoBoldItalic'], 'roboto', document.documentElement);

  if (!Modernizr.input.placeholder) {
    placeholders.polyfill();
  }

  rAF.polyfill();

  togglable(document.getElementById('navToggle'));

  var overlay = togglable(document.getElementById('overlay'));
  addEvent.bind(document.getElementById('overlayTrigger'), 'click', overlay.toggle);

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

  slides.after(swipe.dots(dotsSize, 'js-slidesNavigation', 'js-slidesNavigationPage'));
  swipe.init(slides, $('.js-slidesNavigationPage'), 'js-slidesNavigationPage', $(document));

  console.log(whichTransition());

})();
