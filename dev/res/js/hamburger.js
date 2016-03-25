(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

'use strict';

function bind(object, type, callback) {
  if (document.addEventListener) {
    object.addEventListener(type, callback);
  } else {
    object.attachEvent('on' + type, callback);
  }
}

function unbind(object, type, callback) {
  if (document.removeEventListener) {
    object.removeEventListener(type, callback);
  } else {
    object.detachEvent('on' + type, callback);
  }
}

function trigger(object, event, propagate) {
  propagate = propagate || false;
  if (document.createEvent) {
    var eventObj = document.createEvent('MouseEvents');
    eventObj.initEvent(event, propagate, false);
    object.dispatchEvent(eventObj);
  } else {
    var _eventObj = document.createEventObject();
    object.fireEvent('on' + event, _eventObj);
  }
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;

},{}],2:[function(require,module,exports){
/* jshint browser:true */

'use strict';

var eventTools = require('./tx-event');

module.exports = function (element, callback) {

  var object;
  var task;
  var active;
  var activeClassName;

  function toggle(event) {
    if (event) {
      event.preventDefault();
    }
    if (active) {
      object.className = object.className.replace(activeClassName, '');
    } else {
      object.className += ' ' + activeClassName;
    }
    if (task) {
      task();
    }
    active = !active;
  }

  if (element) {
    object = element;
    task = callback;
    active = false;
    activeClassName = object.className.split(' ')[0] + '-is-active';
    eventTools.bind(object, 'click', toggle);
  } else {
    return false;
  }

  return {
    toggle: toggle
  };
};

},{"./tx-event":1}],3:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var togglable = require('./components/tx-togglable');
  togglable(document.getElementById('navToggle'));
})();

},{"./components/tx-togglable":2}]},{},[3]);
