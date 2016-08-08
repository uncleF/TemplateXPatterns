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

function trigger(object, eventName, propagate, data) {
  propagate = propagate || false;
  if (document.createEvent) {
    var event = document.createEvent('UIEvents');
    if (data) {
      setData(event, data);
    }
    event.initEvent(eventName, propagate, false);
    object.dispatchEvent(event);
  } else {
    var _event = document.createEventObject();
    if (data) {
      setData(_event, data);
    }
    object.fireEvent('on' + eventName, _event);
  }
}

function target(event) {
  return event.target || event.srcElement;
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;
exports.getData = getData;
exports.setData = setData;

},{}],2:[function(require,module,exports){
/* jshint browser:true */

'use strict';

module.exports = function (_) {

  var querySelectorPolyfill = require('./tx-querySelectorAll.js');
  var eventTools = require('./tx-event');

  var fields;

  var ACTIVE_CLASS = 'js-input-is-showingPlaceholder';

  function selectFields() {
    var fields;
    var fieldsPlaceholders = [];
    if (!document.querySelectorAll) {
      querySelectorPolyfill();
    }
    fields = document.querySelectorAll('input, textarea');
    for (var index = 0, length = fields.length; index < length; index += 1) {
      if (fields[index].getAttribute('placeholder') !== null) {
        fieldsPlaceholders.push(fields[index]);
      }
    }
    return fieldsPlaceholders;
  }

  function getTarget(event) {
    return event.currentTarget || event.srcElement;
  }

  function addPlaceholder(field) {
    if (field.value === '') {
      field.classList.add(ACTIVE_CLASS);
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder(field) {
    if (field.value === field.getAttribute('placeholder')) {
      field.classList.remove(ACTIVE_CLASS);
      field.value = '';
    }
  }

  function fieldFocus(event) {
    removePlaceholder(getTarget(event));
  }

  function fieldBlur(event) {
    addPlaceholder(getTarget(event));
  }

  fields = selectFields();
  for (var index = 0, length = fields.length; index < length; index += 1) {
    var field = fields[index];
    addPlaceholder(field);
    eventTools.bind(field, 'focus', fieldFocus);
    eventTools.bind(field, 'blur', fieldBlur);
  }
};

},{"./tx-event":1,"./tx-querySelectorAll.js":3}],3:[function(require,module,exports){
'use strict';

/* jshint browser:true */

module.exports = function (_) {
  document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function querySelectorAllPolyfill(r, c, i, j, a) {
    var d = document;
    var s = d.createStyleSheet();
    a = d.all;
    c = [];
    r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
    for (i = r.length; i--;) {
      s.addRule(r[i], 'k:v');
      for (j = a.length; j--;) {
        if (a[j].currentStyle.k) {
          c.push(a[j]);
        }
      }
      s.removeRule(0);
    }
    return c;
  };
};

},{}],4:[function(require,module,exports){
'use strict';

/* jshint browser:true */
/* global Modernizr */

(function () {

  var placeholders = require('./components/tx-placeholder');

  if (!Modernizr.input.placeholder) {
    placeholders.polyfill();
  }
})();

},{"./components/tx-placeholder":2}]},{},[4]);
