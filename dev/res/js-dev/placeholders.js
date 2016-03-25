/* jshint browser:true */
/* global Modernizr */

(function() {

  var placeholders = require('./components/tx-placeholder');

  if (!Modernizr.input.placeholder) {
    placeholders.polyfill();
  }

})();
