/* jshint browser:true */

(function() {

  var togglable = require('./patterns/tx-togglable');

  var trigger = document.getElementById('navToggle');

  togglable(trigger);

})();
