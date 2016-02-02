(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

function bind(object, type, callback) {
  if (document.addEventListener) {
    object.addEventListener(type, callback);
  } else {
    object.attachEvent(type, callback);
  }
}

exports.bind = bind;

},{}],2:[function(require,module,exports){
/* jshint browser:true */

var addEvent = require('./tx-event');

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
    addEvent.bind(object, 'click', toggle);
  }
}

exports.init = init;

},{"./tx-event":1}],3:[function(require,module,exports){
/* jshint browser:true */
/* global Promise */

var FontFaceObserver = require('fontfaceobserver');

function load(fontCritical, fontClass, fonts, object) {
  var critical = new FontFaceObserver(fontCritical);
  critical.check().then(function () {
    var index = 0;
    var length = fonts.length;
    var restChecks = [];
    object.className += ' ' + fontClass + 'Critical-is-loaded';
    for (index; index < length; index += 1) {
      restChecks.push((new FontFaceObserver(fonts[index])).check());
    }
    Promise.all(restChecks).then(function () {
      object.className += ' ' + fontClass + 'Rest-is-loaded';
    });
  });
}

exports.bind = load;

},{"fontfaceobserver":11}],4:[function(require,module,exports){
/* jshint browser:true */

var addEvent = require('./tx-event');

var object;
var activeClassName;

function toggle(event) {
  var currentClassName = object.className;
  event.preventDefault();
  object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
}

function clicked(event) {
  var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
  if (target.className.indexOf(activeClassName) > -1) {
    toggle(event);
  }
}

function init(node) {
  if (node) {
    object = node;
    activeClassName = ' ' + object.className + '-is-active';
    addEvent.bind(object, 'click', clicked);
  }
}

exports.init = init;
exports.toggle = toggle;

},{"./tx-event":1}],5:[function(require,module,exports){
/* jshint browser:true */
/* global Modernizr */

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

exports.polyfill = polyfill;

},{"./tx-selector.js":7}],6:[function(require,module,exports){
/* jshint browser:true */

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

exports.polyfill = polyfill;

},{}],7:[function(require,module,exports){
/* jshint browser:true */

function polyfill() {
  document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function querySelectorAllPolyfill(r, c, i, j, a) {
    var d = document;
    var s = d.createStyleSheet();
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

exports.polyfill = polyfill;

},{}],8:[function(require,module,exports){
/* jshint browser:true */

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

exports.which = which;

},{}],9:[function(require,module,exports){
/* jshint browser:true */

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

exports.css = translateCSS;
exports.string = translateString;

},{}],10:[function(require,module,exports){
/* jshint browser:true */

(function() {

  var addEvent = require('./components/tx-event');
  var hamburger = require('./components/tx-hamburger.js');
  var loadFonts = require('./components/tx-loadFonts.js');
  var overlay = require('./components/tx-overlay.js');
  var placeholders = require('./components/tx-placeholders.js');
  var rAF = require('./components/tx-rAF.js');
  var transition = require('./components/tx-transition.js');
  var translate = require('./components/tx-translate.js');

  hamburger.init(document.getElementById('navToggle'));

  overlay.init(document.getElementById('overlay'));
  addEvent.bind(document.getElementById('overlayTrigger'), 'click', overlay.toggle);

  placeholders.polyfill();

  rAF.polyfill();

  console.log(transition.which());

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

  loadFonts.load('RobotoCritical', 'roboto', ['Roboto', 'RobotoBold', 'RobotoItalic', 'RobotoBoldItalic'], document.documentElement);

})();

},{"./components/tx-event":1,"./components/tx-hamburger.js":2,"./components/tx-loadFonts.js":3,"./components/tx-overlay.js":4,"./components/tx-placeholders.js":5,"./components/tx-rAF.js":6,"./components/tx-transition.js":8,"./components/tx-translate.js":9}],11:[function(require,module,exports){
(function(){'use strict';var h=!!document.addEventListener;function k(a,b){h?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function w(a){document.body?a():h?document.addEventListener("DOMContentLoaded",a):document.onreadystatechange=function(){"interactive"==document.readyState&&a()}};function x(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function y(a,b){a.a.style.cssText="min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=l;z(a)&&null!==a.a.parentNode&&b(a.g)}var l=a;k(a.b,c);k(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,H=!!window.FontFace;function I(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}D=""!==a.style.font}return D}function J(a,b){return[a.style,a.weight,I()?a.stretch:"","100px",b].join(" ")}
B.prototype.a=function(a,b){var c=this,l=a||"BESbswy",E=b||3E3,F=(new Date).getTime();return new Promise(function(a,b){if(H){var q=function(){(new Date).getTime()-F>=E?b(c):document.fonts.load(J(c,c.family),l).then(function(b){1<=b.length?a(c):setTimeout(q,25)},function(){b(c)})};q()}else w(function(){function r(){var b;if(b=-1!=e&&-1!=f||-1!=e&&-1!=g||-1!=f&&-1!=g)(b=e!=f&&e!=g&&f!=g)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],
10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(e==t&&f==t&&g==t||e==u&&f==u&&g==u||e==v&&f==v&&g==v)),b=!b;b&&(null!==d.parentNode&&d.parentNode.removeChild(d),clearTimeout(G),a(c))}function q(){if((new Date).getTime()-F>=E)null!==d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)e=m.a.offsetWidth,f=n.a.offsetWidth,g=p.a.offsetWidth,r();G=setTimeout(q,50)}}var m=new x(l),n=new x(l),p=new x(l),e=-1,f=-1,g=-1,t=-1,u=-1,v=-1,d=document.createElement("div"),
G=0;d.dir="ltr";y(m,J(c,"sans-serif"));y(n,J(c,"serif"));y(p,J(c,"monospace"));d.appendChild(m.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);t=m.a.offsetWidth;u=n.a.offsetWidth;v=p.a.offsetWidth;q();A(m,function(a){e=a;r()});y(m,J(c,'"'+c.family+'",sans-serif'));A(n,function(a){f=a;r()});y(n,J(c,'"'+c.family+'",serif'));A(p,function(a){g=a;r()});y(p,J(c,'"'+c.family+'",monospace'))})})};window.FontFaceObserver=B;window.FontFaceObserver.prototype.check=B.prototype.a;"undefined"!==typeof module&&(module.exports=window.FontFaceObserver);}());

},{}]},{},[10]);
