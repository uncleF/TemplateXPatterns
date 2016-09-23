(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var togglable = require('./patterns/tx-togglable');

  var trigger = document.getElementById('navToggle');

  togglable(trigger);
})();

},{"./patterns/tx-togglable":3}],2:[function(require,module,exports){
/* jshint browser:true */

'use strict';

/* Event Data */

function setData(event, data) {
  event.data = data;
  return event;
}

function getData(event) {
  return event.data;
}

/* Event Binding */

function bind(object, type, callback) {
  object.addEventListener(type, callback);
}

function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}

/* Event Trigger */

function triggerCreateEvent(object, eventName, propagate, type, data) {
  var eventType = type || 'MouseEvents';
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

function trigger(object, eventName, propagate, data) {
  propagate = propagate || false;
  if (document.createEvent) {
    triggerCreateEvent(object, eventName, propagate, data);
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
/* jshint browser:true */

'use strict';

var eventTools = require('./tx-event');

var ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

module.exports = function (node, callback) {

  var trigger;
  var task;
  var activeClassName;
  var active;

  /* Actions */

  function runTask() {
    if (typeof task === 'function') {
      task();
    }
  }

  function activate() {
    if (!active) {
      active = true;
      trigger.classList.add(activeClassName);
      runTask();
    }
  }

  function deactivate() {
    if (active) {
      active = false;
      trigger.classList.remove(activeClassName);
      runTask();
    }
  }

  function toggle(event) {
    if (active) {
      deactivate();
    } else {
      activate();
    }
  }

  /* Interactions */

  function onClick(event) {
    event.preventDefault();
    toggle();
  }

  function initInteractions() {
    eventTools.bind(trigger, 'click', onClick);
  }

  function removeInteractions() {
    eventTools.unbind(trigger, 'click', onClick);
  }

  /* Initialization */

  function initValues() {
    trigger = node;
    task = callback;
    activeClassName = '' + trigger.classList.item(0) + ACTIVE_CLASS_NAME_SUFFIX;
    active = false;
  }

  function init() {
    initValues();
    initInteractions();
  }

  function removeValues() {
    trigger = null;
    task = null;
    activeClassName = null;
    active = null;
  }

  function destroy() {
    removeInteractions();
    removeValues();
  }

  init();

  /* Interface */

  return {
    destroy: destroy,
    activate: activate,
    deactivate: deactivate,
    toggle: toggle
  };
};

},{"./tx-event":2}]},{},[1]);
