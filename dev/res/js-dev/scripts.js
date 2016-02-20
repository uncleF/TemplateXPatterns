/* jshint browser:true */

var $ = require('jquery');

(function() {

  var addEvent = require('./components/tx-event');
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

  hamburger.init(document.getElementById('navToggle'));

  overlay.init(document.getElementById('overlay'));
  addEvent.bind(document.getElementById('overlayTrigger'), 'click', overlay.toggle);

  placeholders.polyfill();

  rAF.polyfill();

  console.log(transition.which());

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

  loadFonts.load('RobotoCritical', 'roboto', ['Roboto', 'RobotoBold', 'RobotoItalic', 'RobotoBoldItalic'], document.documentElement);

  slides.after(swipe.dots(dotsSize, 'js-slidesNavigation', 'js-slidesNavigationPage'));
  swipe.init(slides, $('.js-slidesNavigationPage'), 'js-slidesNavigationPage', $(document));

})();
