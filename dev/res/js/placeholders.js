(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

'use strict';

function setData(event, data) {
  event.data = data;
  return event;
}

function getData(event) {
  return event.data;
}

function bind(object, type, callback) {
  object.addEventListener(type, callback);
}

function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}

function triggerCreateEvent(object, eventName, propagate, data) {
  var event = document.createEvent('UIEvents');
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

function target(event) {
  return event.target;
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;
exports.getData = getData;

},{}],2:[function(require,module,exports){
/* jshint browser:true */

'use strict';

var eventTool = require('./tx-event');

var ACTIVE_CLASS_NAME = 'js-field-is-showingPlaceholder';

function fieldPlaceholder(node) {

  var field;

  /* Actions */

  function addPlaceholder(field) {
    if (field.value === '') {
      field.classList.add(ACTIVE_CLASS_NAME);
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder(field) {
    if (field.value === field.getAttribute('placeholder')) {
      field.classList.remove(ACTIVE_CLASS_NAME);
      field.value = '';
    }
  }

  /* Interactions */

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

  /* Initialization */

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

  function destroy() {
    removeInteractions();
    removeValues();
  }

  initPlaceholder();

  /* Interface */

  return {
    destroy: destroy
  };
}

function init() {
  var fields = document.querySelectorAll('input, textarea');
  fields.forEach(fieldPlaceholder);
}

function destroy(fields) {
  fields.forEach(function (field) {
    return field.destroy();
  });
}

exports.init = init;
exports.destroy = destroy;

},{"./tx-event":1}],3:[function(require,module,exports){
'use strict';

/* jshint browser:true */
/* global Modernizr */

(function () {

  var placeholders = require('./components/tx-placeholder');

  if (!Modernizr.input.placeholder) {
    placeholders.init();
  }
})();

},{"./components/tx-placeholder":2}]},{},[3]);
