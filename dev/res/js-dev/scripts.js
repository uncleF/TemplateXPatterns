/* jshint browser:true */
/* global Modernizr */

var $ = require('jquery');

(function() {

  var addEvent = require('./components/tx-event');
  var file = require('./components/tx-fileInput');
  var hamburger = require('./components/tx-hamburger');
  var loadFonts = require('./components/tx-loadFonts');
  var overlay = require('./components/tx-overlay');
  var placeholders = require('./components/tx-placeholders');
  var rAF = require('./components/tx-rAF');
  var transition = require('./components/tx-transition');
  var translate = require('./components/tx-translate');
  var swipe = require('./components/tx-swipeGallery');

  var slides = $('.slides');
  var dotsSize = $('.slide').size();

  file.init('#file');

  hamburger.init(document.getElementById('navToggle'));

  loadFonts.load('RobotoCritical', 'roboto', ['Roboto', 'RobotoBold', 'RobotoItalic', 'RobotoBoldItalic'], document.documentElement);

  var popupOverlay = overlay.init(document.getElementById('overlay'));
  addEvent.bind(document.getElementById('overlayTrigger'), 'click', popupOverlay.toggle);

  if (!Modernizr.input.placeholder) {
    placeholders.polyfill();
  }

  rAF.polyfill();

  console.log(transition.which());

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

  slides.after(swipe.dots(dotsSize, 'js-slidesNavigation', 'js-slidesNavigationPage'));
  swipe.init(slides, $('.js-slidesNavigationPage'), 'js-slidesNavigationPage', $(document));

})();
