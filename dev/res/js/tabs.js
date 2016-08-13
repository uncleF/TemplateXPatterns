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

var EVENT = 'tabswitch';
var ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
var TAB_CLASS_NAME = 'tab';
var TAB_ACTIVE_CLASS_NAME = '' + TAB_CLASS_NAME + ACTIVE_CLASS_NAME_SUFFIX;
var CONTENT_CLASS_NAME = 'tabContent';
var CONTENT_ACTIVE_CLASS_NAME = '' + CONTENT_CLASS_NAME + ACTIVE_CLASS_NAME_SUFFIX;

var eventTool = require('./tx-event.js');

module.exports = function (node) {

  var tab;
  var content;
  var active;

  /* Utilities */

  function getId() {
    return tab.getAttribute('href').replace('#', '');
  }

  /* Actions */

  function activate() {
    if (!active) {
      eventTool.trigger(document, EVENT);
      active = true;
      tab.classList.add(TAB_ACTIVE_CLASS_NAME);
      content.classList.add(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function deactivate() {
    if (active) {
      active = false;
      tab.classList.remove(TAB_ACTIVE_CLASS_NAME);
      content.classList.remove(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function status() {
    return active;
  }

  /* Interactions */

  function onClick(event) {
    event.preventDefault();
    activate();
  }

  function initInteractions() {
    eventTool.bind(tab, 'click', onClick);
  }

  function removeInteractions() {
    eventTool.unbind(tab, 'click', onClick);
  }

  /* Initialization */

  function defaultValues() {
    tab = node;
    content = document.getElementById(getId());
    active = false;
  }

  function init() {
    defaultValues();
    initInteractions();
  }

  function removeValues() {
    node = null;
    tab = null;
    content = null;
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
    status: status
  };
};

},{"./tx-event.js":1}],3:[function(require,module,exports){
/* jshint browser:true */

'use strict';

var tabPair = require('./tx-tabPair.js');
var eventTool = require('./tx-event.js');

module.exports = function (nodeSelector, defaultTab) {

  var pairs;

  /* Utilities */

  function addPair(tab) {
    pairs.push(tabPair(tab));
  }

  function destroyPair(pair) {
    pair.destroy();
  }

  function activeFilter(pair) {
    return pair.status();
  }

  function findActive() {
    return pairs.filter(activeFilter)[0];
  }

  /* Actions */

  function makePairs() {
    var tabObjects = typeof nodeSelector === 'string' ? document.getElementsByClassName(nodeSelector) : nodeSelector;
    [].forEach.call(tabObjects, addPair);
  }

  function destroyPairs() {
    pairs.forEach(destroyPair);
  }

  function deactivateActive() {
    var active = findActive();
    if (active) {
      active.deactivate();
    }
  }

  /* Events */

  function onTabSwitch() {
    deactivateActive();
  }

  function initEvents() {
    eventTool.bind(document, 'tabswitch', onTabSwitch);
  }

  function removeEvents() {
    eventTool.unbind(document, 'tabswitch', onTabSwitch);
  }

  /* Inititlization */

  function defaultValues() {
    pairs = [];
  }

  function activateDefault() {
    var active = defaultTab || 0;
    pairs[active].activate();
  }

  function init() {
    defaultValues();
    initEvents();
    makePairs();
    activateDefault();
  }

  function removeValues() {
    nodeSelector = null;
    defaultTab = null;
    pairs = null;
  }

  function destroy() {
    destroyPairs();
    removeEvents();
    removeValues();
  }

  init();

  /* Interface */

  return {
    destroy: destroy
  };
};

},{"./tx-event.js":1,"./tx-tabPair.js":2}],4:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var tabs = require('./components/tx-tabs.js');

  tabs('tab', 0);
})();

},{"./components/tx-tabs.js":3}]},{},[4]);
