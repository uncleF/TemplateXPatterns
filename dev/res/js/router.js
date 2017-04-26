(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var eventManager = require('./tx-event');
var task = void 0;

function go(url) {
  window.history.pushState(null, null, url);
  task();
}

function init(changeView) {
  task = changeView;
  eventManager.bind(window, 'popstate', task);
}

exports.init = init;
exports.go = go;

},{"./tx-event":1}],3:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var router = require('./patterns/tx-router');

  var NAV_LINK_CLASS = 'navLink';

  function changeView() {
    console.log('New View');
  }

  router.init(changeView);

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains(NAV_LINK_CLASS)) {
      event.preventDefault();
      router.go(target.href);
    }
  });
})();

},{"./patterns/tx-router":2}]},{},[3]);
