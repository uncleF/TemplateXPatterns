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

var eventTool = require('./tx-event.js');
var togglable = require('./tx-togglable.js');

var EVENT = 'tabswitch';
var ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
var CONTENT_CLASS_NAME = 'tabContent';
var CONTENT_ACTIVE_CLASS_NAME = '' + CONTENT_CLASS_NAME + ACTIVE_CLASS_NAME_SUFFIX;

module.exports = function (element, holder) {
  var tab = void 0;
  var content = void 0;
  var catcher = void 0;
  var active = void 0;

  /* Utilities */

  function getId() {
    return tab.getAttribute('href').replace('#', '');
  }

  /* Actions */

  function activate() {
    if (!active) {
      eventTool.trigger(catcher, EVENT, false, 'UIEvent');
      active = true;
      content.classList.add(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function deactivate() {
    if (active) {
      active = false;
      content.classList.remove(CONTENT_ACTIVE_CLASS_NAME);
    }
  }

  function status() {
    return active;
  }

  /* Initialization */

  function init() {
    tab = togglable(element, activate);
    content = document.getElementById(getId());
    catcher = holder;
    active = false;
  }

  function destroy() {
    tab = null;
    content = null;
    catcher = null;
    active = null;
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

},{"./tx-event.js":1,"./tx-togglable.js":4}],3:[function(require,module,exports){
'use strict';

var tabPair = require('./tx-tabPair.js');
var eventTool = require('./tx-event.js');

module.exports = function (holderID, nodeSelector, defaultTab) {
  var holder = void 0;
  var pairs = void 0;

  /* Utilities */

  function addPair(tab) {
    pairs.push(tabPair(tab, holder));
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

  function makePairs() {
    var tabObjects = [].slice.call(typeof nodeSelector === 'string' ? document.getElementsByClassName(nodeSelector) : nodeSelector);
    tabObjects.forEach(addPair);
  }

  function destroyPairs() {
    pairs.forEach(destroyPair);
  }

  /* Actions */

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
    eventTool.bind(holder, 'tabswitch', onTabSwitch);
  }

  function removeEvents() {
    eventTool.unbind(holder, 'tabswitch', onTabSwitch);
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
    holder = document.getElementById(holderID);
    defaultValues();
    initEvents();
    makePairs();
    activateDefault();
  }

  function removeValues() {
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

var eventTool = require('./tx-event');

var ACTIVE_CLASS_NAME_SUFFIX = '-is-active';

module.exports = function (node, callback) {
  var trigger = void 0;
  var task = void 0;
  var activeClassName = void 0;
  var active = void 0;

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

  function toggle() {
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
    eventTool.bind(trigger, 'click', onClick);
  }

  function removeInteractions() {
    eventTool.unbind(trigger, 'click', onClick);
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

},{"./tx-event":1}],5:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var tabs = require('./patterns/tx-tabs.js');

  tabs('tabs', 'tab', 0);
})();

},{"./patterns/tx-tabs.js":3}]},{},[5]);
