/* jshint browser:true */

(function() {

  var addEvent = require('./components/tx-event');
  var hamburger = require('./components/tx-hamburger.js');
  var loadFonts = require('./components/tx-loadFonts.js');
  var overlay = require('./components/tx-overlay.js');
  var placeholders = require('./components/tx-placeholders.js');
  var rAF = require('./components/tx-rAF.js');
  var transition = require('./components/tx-transition.js');
  var translate = require('./components/tx-translate.js');

  hamburger.init(document.getElementById('navToggle'));

  overlay.init(document.getElementById('overlay'));
  addEvent.bind(document.getElementById('overlayTrigger'), 'click', overlay.toggle);

  placeholders.polyfill();

  rAF.polyfill();

  console.log(transition.which());

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

  loadFonts.load('RobotoCritical', 'roboto', ['Roboto', 'RobotoBold', 'RobotoItalic', 'RobotoBoldItalic'], document.documentElement);

})();
