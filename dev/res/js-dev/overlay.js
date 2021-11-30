import * as eventManager from 'patterns/tx-eventManager';
import togglable from 'patterns/tx-togglable';

const trigger = document.getElementById('overlayTrigger');
const overlay = togglable(document.getElementById('overlay'));

function onClick(event) {
  event.preventDefault();
  overlay.toggle();
}

eventManager.bind(trigger, 'click', onClick);
