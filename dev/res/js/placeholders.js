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

var eventTool = require('./tx-event');

var ACTIVE_CLASS_NAME = 'js-field-is-showingPlaceholder';

/* Placeholder Constructor */

function fieldPlaceholder(node) {
  var field = void 0;

  /* Field Actions */

  function addPlaceholder() {
    if (field.value === '') {
      field.classList.add(ACTIVE_CLASS_NAME);
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder() {
    if (field.value === field.getAttribute('placeholder')) {
      field.classList.remove(ACTIVE_CLASS_NAME);
      field.value = '';
    }
  }

  /* Field Interactions */

  function onFocus(event) {
    removePlaceholder(eventTool.target(event));
  }

  function onBlur(event) {
    addPlaceholder(eventTool.target(event));
  }

  function initInteractions() {
    eventTool.bind(field, 'focus', onFocus);
    eventTool.bind(field, 'blur', onBlur);
  }

  function removeInteractions() {
    eventTool.unbind(field, 'focus', onFocus);
    eventTool.unbind(field, 'blur', onBlur);
  }

  /* Field Initialization */

  function initValues() {
    field = node;
  }

  function initPlaceholder() {
    initValues();
    initInteractions();
    addPlaceholder(field);
  }

  function removeValues() {
    field = null;
  }

  function destroyPlaceholder() {
    removeInteractions();
    removeValues();
  }

  initPlaceholder();

  /* Filed Interface */

  return {
    destroy: destroyPlaceholder
  };
}

/* Inititalization */

function init() {
  var fields = [].slice.call(document.querySelectorAll('input, textarea'));
  fields.forEach(fieldPlaceholder);
}

function destroy(fields) {
  fields.forEach(function (field) {
    return field.destroy();
  });
}

/* Interface */

exports.init = init;
exports.destroy = destroy;

},{"./tx-event":1}],3:[function(require,module,exports){
'use strict';

/* jshint browser:true */
/* global Modernizr */

(function () {

  var placeholders = require('./patterns/tx-placeholder');

  if (!Modernizr.input.placeholder) {
    placeholders.init();
  }
})();

},{"./patterns/tx-placeholder":2}]},{},[3]);
