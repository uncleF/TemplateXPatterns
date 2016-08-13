/* jshint browser:true */

(function() {

  var togglable = require('./components/tx-togglable');
  var trigger = document.getElementById('navToggle');

  togglable(trigger);

})();
