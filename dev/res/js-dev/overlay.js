/* jshint browser:true */

(function() {

  var eventTool = require('./patterns/tx-event');
  var togglable = require('./patterns/tx-togglable');

  var trigger = document.getElementById('overlayTrigger');
  var overlay = togglable(document.getElementById('overlay'));

  function onClick(event) {
    event.preventDefault();
    overlay.toggle();
  }

  eventTool.bind(trigger, 'click', onClick);

})();
