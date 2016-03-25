/* jshint browser:true */

(function() {

  var eventTools = require('./components/tx-event');
  var togglable = require('./components/tx-togglable');

  var overlay = togglable(document.getElementById('overlay'));
  eventTools.bind(document.getElementById('overlayTrigger'), 'click', overlay.toggle);

})();
