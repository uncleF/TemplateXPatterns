/* jshint browser:true */

(function() {

  var eventTool = require('./components/tx-event');
  var togglable = require('./components/tx-togglable');
  var trigger = document.getElementById('overlayTrigger');

  var overlay = togglable(document.getElementById('overlay'));
  eventTool.bind(trigger, 'click', overlay.toggle);

})();
