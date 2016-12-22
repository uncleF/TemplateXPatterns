/* jshint browser:true */

(function() {

  let gestures = require('./patterns/tx-gestures');

  let catcher;
  let demo;

  function onSingleSwipe(event) {
    demo.textContent = `Single swipe: ${event.data.delta.x}, ${event.data.delta.y}`;
  }

  function onDoubleSwipe(event) {
    demo.textContent = `Double swipe: ${event.data.delta.x}, ${event.data.delta.y}`;
  }

  function onPinch(event) {
    demo.textContent = `Pinch: ${event.data.delta}`;
  }

  catcher = document.body;
  demo = document.getElementById('gesture');

  gestures(catcher);
  catcher.addEventListener('singleswipe', onSingleSwipe);
  catcher.addEventListener('doubleswipe', onDoubleSwipe);
  catcher.addEventListener('pinch', onPinch);

})();
