(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var fileInput = require('./patterns/tx-fileInput');

  fileInput.init('#file', 'Browse');
})();

},{"./patterns/tx-fileInput":3}],2:[function(require,module,exports){
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

var eventTool = require('./tx-event');

var WRAP_CLASS_NAME_SUFFIX = '-wrap';
var VALUE_CLASS_NAME_SUFFIX = '-value';
var BUTTON_CLASS_NAME_SUFFIX = '-button';
var WRAPED_CLASS_NAME_SUFFIX = '-is-wrapped';

/* HTML */

function createWrap(className) {
  var element = document.createElement('div');
  element.className = '' + className + WRAP_CLASS_NAME_SUFFIX;
  return element;
}

function createValue(className) {
  var element = document.createElement('div');
  element.className = '' + className + VALUE_CLASS_NAME_SUFFIX;
  return element;
}

function createButton(className, text) {
  var element = document.createElement('a');
  element.href = '#';
  element.textContent = text;
  element.className = '' + className + BUTTON_CLASS_NAME_SUFFIX;
  return element;
}

function wrapInput(className, input, wrap, value, button) {
  var parent = input.parentNode;
  wrap.appendChild(value);
  wrap.appendChild(button);
  parent.insertBefore(wrap, input);
  input.classList.add('' + className + WRAPED_CLASS_NAME_SUFFIX);
  wrap.appendChild(input);
}

/* Field Constructor */

function fileInput(field, text) {

  var input;
  var className;
  var wrap;
  var value;
  var button;

  /* Field Interactions */

  function onChange(event) {
    value.textContent = input.value.split('\\')[2];
  }

  function onWrapClick(event) {
    eventTool.trigger(input, 'click');
  }

  function onButtonClick(event) {
    event.preventDefault();
  }

  function initInteractions() {
    eventTool.bind(input, 'change', onChange);
    eventTool.bind(wrap, 'click', onWrapClick);
    eventTool.bind(button, 'click', onButtonClick);
  }

  function removeInteractions() {
    eventTool.unbind(input, 'change', onChange);
    eventTool.unbind(wrap, 'click', onWrapClick);
    eventTool.unbind(button, 'click', onButtonClick);
  }

  /* Field Initialization */

  function initValues() {
    input = field;
    className = input.classList.item(0);
    wrap = createWrap(className);
    value = createValue(className);
    button = createButton(className, text);
  }

  function initField() {
    initValues();
    wrapInput(className, input, wrap, value, button);
    initInteractions();
  }

  function removeValues() {
    input = null;
    className = null;
    wrap = null;
    value = null;
    button = null;
  }

  function destroyField() {
    removeInteractions();
    removeValues();
  }

  initField();

  /* Field Interface */

  return {
    destroy: destroyField
  };
}

/* Initialization */

function init(selector, text) {
  var fields = [].slice.call(document.querySelectorAll(selector));
  fields.forEach(function (field) {
    return fileInput(field, text);
  });
}

function destroy(fields) {
  fields.forEach(function (field) {
    return field.destroy();
  });
}

/* Interface */

exports.init = init;
exports.destroy = destroy;

},{"./tx-event":2}]},{},[1]);
