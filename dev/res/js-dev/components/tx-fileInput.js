/* jshint browser:true */

'use strict';

var eventTool = require('./tx-event');

const WRAP_CLASS_NAME_SUFFIX = '-wrap';
const VALUE_CLASS_NAME_SUFFIX = '-value';
const BUTTON_CLASS_NAME_SUFFIX = '-button';
const WRAPED_CLASS_NAME_SUFFIX = '-is-wrapped';

function createWrap(className) {
  var element = document.createElement('div');
  element.className = `${className}${WRAP_CLASS_NAME_SUFFIX}`;
  return element;
}

function createValue(className) {
  var element = document.createElement('div');
  element.className = `${className}${VALUE_CLASS_NAME_SUFFIX}`;
  return element;
}

function createButton(className, text) {
  var element = document.createElement('a');
  element.href = '#';
  element.textContent = text;
  element.className = `${className}${BUTTON_CLASS_NAME_SUFFIX}`;
  return element;
}

function wrapInput(className, input, wrap, value, button) {
  var parent = input.parentNode;
  wrap.appendChild(value);
  wrap.appendChild(button);
  parent.insertBefore(wrap, input);
  wrap.appendChild(input);
  input.classList.add(`${className}${WRAPED_CLASS_NAME_SUFFIX}`);
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
  fields.forEach(field => fileInput(field, text));
}

function destroy(fields) {
  fields.forEach(field => field.destroy());
}

exports.init = init;
exports.destroy = destroy;
