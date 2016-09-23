/* jshint browser:true */
/* global Modernizr */

(function() {

  var placeholders = require('./patterns/tx-placeholder');

  if (!Modernizr.input.placeholder) {
    placeholders.init();
  }

})();
