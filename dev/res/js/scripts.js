(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

var TX_HAMBURGER = (function() {

  var object;
  var activeClassName;

  function toggle(event) {
    var currentClassName = object.className;
    event.preventDefault();
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
  }

  function init(node) {
    if (node) {
      object = node;
      activeClassName = ' ' + object.className + '-is-active';
      if (document.addEventListener) {
        object.addEventListener('click', toggle);
      } else {
        object.attachEvent('onclick', toggle);
      }
    }
  }

  return {
    init: init
  };

})();

module.exports = TX_HAMBURGER;

},{}],2:[function(require,module,exports){
/* jshint browser:true */

var TX_OVERLAY = (function() {

  var object;
  var activeClassName;

  function toggle() {
    var currentClassName = object.className;
    event.preventDefault();
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
  }

  function clickHandler() {
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    if (target.className.indexOf(activeClassName) > -1) {
      toggle();
    }
  }

  function init(node) {
    if (node) {
      object = node;
      activeClassName = ' ' + object.className + '-is-active';
      if (document.addEventListener) {
        object.addEventListener('click', clickHandler);
      } else {
        object.attachEvent('onclick', clickHandler);
      }
    }
  }

  return {
    init: init,
    toggle: toggle
  };

})();

module.exports = TX_OVERLAY;

},{}],3:[function(require,module,exports){
/* jshint browser:true */
/* global Modernizr */

var TX_PLACEHOLDERS = (function() {

  var querySelectorPolyfill = require('./tx-selector.js');

  function selectFields() {
    var fields;
    var fieldsPlaceholders = [];
    var index = 0;
    var length;
    if (!document.querySelectorAll) {
      querySelectorPolyfill.polyfill();
    }
    fields = document.querySelectorAll('input, textarea');
    length = fields.length;
    for (index; index < length; index += 1) {
      if (fields[index].getAttribute('placeholder') !== null) {
        fieldsPlaceholders.push(fields[index]);
      }
    }
    return fieldsPlaceholders;
  }

  function appPlaceholder(field) {
    var value = field.value;
    var placeholder = field.getAttribute('placeholder');
    if (value === '') {
      field.className = field.className + ' js-input-is-showingPlaceholder';
      field.value = placeholder;
    }
  }

  function removePlaceholder(field) {
    var value = field.value;
    var placeholder = field.getAttribute('placeholder');
    if (value === placeholder) {
      field.className = field.className.replace(' js-input-is-showingPlaceholder', '');
      field.value = '';
    }
  }

  function focusHandler() {
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    removePlaceholder(target);
  }

  function blurHandler() {
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    appPlaceholder(target);
  }

  function polyfill() {
    if (!Modernizr.input.placeholder) {
      var fields = selectFields();
      var field;
      var index = 0;
      var length = fields.length;
      for (index; index < length; index += 1) {
        field = fields[index];
        appPlaceholder(field);
        if (document.addEventListener) {
          field.addEventListener('focus', focusHandler);
          field.addEventListener('blur', blurHandler);
        } else {
          field.attachEvent('onfocusin', focusHandler);
          field.attachEvent('onfocusout', blurHandler);
        }
      }
    }
  }

  return {
    polyfill: polyfill
  };

})();

module.exports = TX_PLACEHOLDERS;

},{"./tx-selector.js":5}],4:[function(require,module,exports){
/* jshint browser:true */

var TX_REQUEST_ANIMATION_FRAME = (function() {

  function polyfill() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }

  return {
    polyfill: polyfill
  };

})();

module.exports = TX_REQUEST_ANIMATION_FRAME;

},{}],5:[function(require,module,exports){
/* jshint browser:true */

var TX_QUERY_SELECTOR_ALL = (function() {

  function polyfill() {
    document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function querySelectorAllPolyfill(r, c, i, j, a) {
      var d = document;
      var s = d.createStyleSheet();
      var l;
      a = d.all;
      c = [];
      r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
      for (i = r.length; i--;) {
        s.addRule(r[i], 'k:v');
        for (j = a.length; j--;) {
          a[j].currentStyle.k && c.push(a[j]);
        }
        s.removeRule(0);
      }
      return c;
    };
  }

  return {
    polyfill: polyfill
  };

})();

module.exports = TX_QUERY_SELECTOR_ALL;

},{}],6:[function(require,module,exports){
/* jshint browser:true */

var TX_TRANSITION = (function() {

  function which() {
    var transition;
    var element = document.createElement('element');
    var transitions = {
      'transition': 'transitionend',
      'oTransition': 'oTransitionEnd',
      'MSTransition': 'MSTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };
    for (transition in transitions) {
      if (element.style[transition] !== undefined) {
        return transitions[transition];
      }
    }
  }

  return {
    which: which
  };

})();

module.exports = TX_TRANSITION;

},{}],7:[function(require,module,exports){
/* jshint browser:true */

var TX_TRANSLATE = (function() {

  function properties(axis, distance) {
    var property;
    var propertyLayer;
    axis = axis.toUpperCase();
    property = 'translate' + axis + '(' + distance + ')';
    propertyLayer = property + ' translateZ(0)';
    return {
      property: property,
      propertyLayer: propertyLayer
    };
  }

  function translateCSS(axis, distance) {
    var css = properties(axis, distance);
    return {
      '-webkit-transform': css.propertyLayer,
      '-moz-transform': css.propertyLayer,
      '-ms-transform': css.property,
      '-o-transform': css.property,
      'transform': css.propertyLayer
    };
  }

  function translateString(axis, distance) {
    var css = properties(axis, distance);
    return '-webkit-transform:' + css.propertyLayer + '; -moz-transform:' + css.propertyLayer + '; -ms-transform:' + css.property + '; -o-transform' + css.property + '; transform:' + css.propertyLayer + ';';
  }

  return {
    css: translateCSS,
    string: translateString
  };

})();

module.exports = TX_TRANSLATE;

},{}],8:[function(require,module,exports){
/* jshint browser:true */

var hamburger = require('./components/tx-hamburger.js');
var overlay = require('./components/tx-overlay.js');
var placeholders = require('./components/tx-placeholders.js');
var rAF = require('./components/tx-rAF.js');
var transition = require('./components/tx-transition.js');
var translate = require('./components/tx-translate.js');

hamburger.init(document.getElementById('navToggle'));

overlay.init(document.getElementById('overlay'));
if (document.addEventListener) {
  document.getElementById('overlayTrigger').addEventListener('click', overlay.toggle);
} else {
  document.getElementById('overlayTrigger').attachEvent('onclick', overlay.toggle);
}

placeholders.polyfill();

rAF.polyfill();

console.log(transition.which());

document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

},{"./components/tx-hamburger.js":1,"./components/tx-overlay.js":2,"./components/tx-placeholders.js":3,"./components/tx-rAF.js":4,"./components/tx-transition.js":6,"./components/tx-translate.js":7}]},{},[8]);
