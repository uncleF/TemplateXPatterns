import gestures from 'patterns/tx-gestures';

const catcher = document.body;
const demo = document.getElementById('gesture');

function onSingleSwipe(event) {
  demo.textContent = `Single swipe: ${event.data.delta.x}, ${event.data.delta.y}`;
}

function onDoubleSwipe(event) {
  demo.textContent = `Double swipe: ${event.data.delta.x}, ${event.data.delta.y}`;
}

function onPinch(event) {
  demo.textContent = `Pinch: ${event.data.delta}`;
}

gestures(catcher);
catcher.addEventListener('gesture:singleswipe', onSingleSwipe);
catcher.addEventListener('gesture:doubleswipe', onDoubleSwipe);
catcher.addEventListener('gesture:pinch', onPinch);
