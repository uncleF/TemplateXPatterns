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

var WRAP_CLASS_NAME_SUFFIX = '-wrap';
var VALUE_CLASS_NAME_SUFFIX = '-value';
var BUTTON_CLASS_NAME_SUFFIX = '-button';
var WRAPED_CLASS_NAME_SUFFIX = '-is-wrapped';

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
  wrap.appendChild(input);
  input.classList.add('' + className + WRAPED_CLASS_NAME_SUFFIX);
}

function fileInput(field, text) {

  var input;
  var className;
  var wrap;
  var value;
  var button;

  /* Interactions */

  function onChange(event) {
    value.textContent = input.value.split('\\')[2];
  }

  function onClick(event) {
    event.preventDefault();
    event.stopPropagation();
    eventTool.trigger(input, 'click', false);
  }

  function initInteractions() {
    eventTool.bind(input, 'change', onChange);
    eventTool.bind(wrap, 'click', onClick);
    eventTool.bind(button, 'click', onClick);
  }

  function removeInteractions() {
    eventTool.unbind(input, 'change', onChange);
    eventTool.unbind(wrap, 'click', onClick);
    eventTool.unbind(button, 'click', onClick);
  }

  /* Initialization */

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

  /* Interface */

  return {
    destroy: destroyField
  };
}

function init(selector, text) {
  var fields = document.querySelectorAll(selector);
  fields.forEach(function (field) {
    return fileInput(field, text);
  });
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

(function () {

  var fileInput = require('./components/tx-fileInput');

  fileInput.init('#file', 'Browse');
})();

},{"./components/tx-fileInput":2}]},{},[3]);
