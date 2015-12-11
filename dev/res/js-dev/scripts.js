/* jshint browser:true */

var hamburger = require('./components/tx-hamburger.js');
var overlay = require('./components/tx-overlay.js');
var placeholders = require('./components/tx-placeholders.js');
var rAF = require('./components/tx-rAF.js');
var transition = require('./components/tx-transition.js');
var translate = require('./components/tx-translate.js');

hamburger.init(document.getElementById('navToggle'));

overlay.init(document.getElementById('overlay'));
if (document.addEventListener) {
  document.getElementById('overlayTrigger').addEventListener('click', overlay.toggle);
} else {
  document.getElementById('overlayTrigger').attachEvent('onclick', overlay.toggle);
}

placeholders.polyfill();

rAF.polyfill();

console.log(transition.which());

document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));
