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

var querySelectorPolyfill = require('./tx-querySelectorAll.js');
var eventTools = require('./tx-event');

module.exports = function (_) {

  var fields;

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
      field.className = field.className + ' js-input-is-showingPlaceholder';
      field.value = field.getAttribute('placeholder');
    }
  }

  function removePlaceholder(field) {
    if (field.value === field.getAttribute('placeholder')) {
      field.className = field.className.replace(' js-input-is-showingPlaceholder', '');
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
