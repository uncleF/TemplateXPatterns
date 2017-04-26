(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var gestures = require('./patterns/tx-gestures');

  var catcher = void 0;
  var demo = void 0;

  function onSingleSwipe(event) {
    demo.textContent = 'Single swipe: ' + event.data.delta.x + ', ' + event.data.delta.y;
  }

  function onDoubleSwipe(event) {
    demo.textContent = 'Double swipe: ' + event.data.delta.x + ', ' + event.data.delta.y;
  }

  function onPinch(event) {
    demo.textContent = 'Pinch: ' + event.data.delta;
  }

  catcher = document.body;
  demo = document.getElementById('gesture');

  gestures(catcher);
  catcher.addEventListener('singleswipe', onSingleSwipe);
  catcher.addEventListener('doubleswipe', onDoubleSwipe);
  catcher.addEventListener('pinch', onPinch);
})();

},{"./patterns/tx-gestures":3}],2:[function(require,module,exports){
'use strict';

/* Event Data */

function setData(event, data) {
  var newEvent = event;
  newEvent.data = data;
  return newEvent;
}

function getData(event) {
  return event.data;
}

/* Event Binding */

function bind(object, type, callback) {
  object.addEventListener(type, callback, true);
}

function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}

/* Event Trigger */

function triggerCreateEvent(object, eventName, propagate, eventType, data) {
  var event = document.createEvent(eventType);
  if (data) {
    setData(event, data);
  }
  event.initEvent(eventName, propagate, false);
  object.dispatchEvent(event);
}

function triggerCreateEventObject(object, eventName, propagate, data) {
  var event = document.createEventObject();
  if (data) {
    setData(event, data);
  }
  object.fireEvent('on' + eventName, event);
}

function trigger(object, eventName) {
  var propagate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var eventType = arguments.length <= 3 || arguments[3] === undefined ? 'MouseEvents' : arguments[3];
  var data = arguments[4];

  if (document.createEvent) {
    triggerCreateEvent(object, eventName, propagate, eventType, data);
  } else {
    triggerCreateEventObject(object, eventName, propagate, data);
  }
}

/* Event Target */

function target(event) {
  return event.target;
}

/* Interface */

exports.getData = getData;
exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;

},{}],3:[function(require,module,exports){
'use strict';

var eventManager = require('./tx-event');

var SINGLE_SWIPE = 'singleswipe';
var DOUBLE_EVENT = 'doubleswipe';
var PINCH_EVENT = 'pinch';
var PINCH_THRESHOLD = 100;

module.exports = function (catcher) {
  var downTouches = void 0;
  var downDistance = void 0;

  function calculateDistance(touches) {
    var sqrDiffX = Math.pow(touches[1].clientX - touches[0].clientX, 2);
    var sqrDiffY = Math.pow(touches[1].clientY - touches[0].clientY, 2);
    return Math.sqrt(sqrDiffX + sqrDiffY);
  }

  function claculateDelta(touch) {
    return {
      x: touch.clientX - downTouches[0].clientX,
      y: touch.clientY - downTouches[0].clientY
    };
  }

  function onSingleToucheMove(event) {
    requestAnimationFrame(function () {
      var delta = claculateDelta(event.touches[0]);
      eventManager.trigger(catcher, SINGLE_SWIPE, false, 'UIEvent', { delta: delta });
    });
  }

  function onDoubleToucheMove(event) {
    requestAnimationFrame(function () {
      var delta = claculateDelta(event.touches[0]);
      eventManager.trigger(catcher, DOUBLE_EVENT, false, 'UIEvent', { delta: delta });
    });
  }

  function onPinch(event) {
    requestAnimationFrame(function () {
      var delta = calculateDistance(event.touches) - downDistance;
      eventManager.trigger(catcher, PINCH_EVENT, false, 'UIEvent', { delta: delta });
    });
  }

  function onTouchEnd(event) {
    event.preventDefault();
    event.stopPropagation();
    eventManager.unbind(document, 'touchmove', onDoubleToucheMove);
    eventManager.unbind(document, 'touchmove', onPinch);
    eventManager.unbind(document, 'touchend', onTouchEnd);
  }

  function onTouchStart(event) {
    event.preventDefault();
    event.stopPropagation();
    downTouches = event.touches;
    if (downTouches.length === 1) {
      eventManager.bind(document, 'touchmove', onSingleToucheMove);
    } else {
      downDistance = calculateDistance(event.touches);
      eventManager.unbind(document, 'touchmove', onSingleToucheMove);
      if (downDistance <= PINCH_THRESHOLD) {
        eventManager.bind(document, 'touchmove', onDoubleToucheMove);
      } else {
        eventManager.bind(document, 'touchmove', onPinch);
      }
    }
    eventManager.bind(document, 'touchend', onTouchEnd);
  }

  eventManager.bind(catcher, 'touchstart', onTouchStart, false);
};

},{"./tx-event":2}]},{},[1]);
