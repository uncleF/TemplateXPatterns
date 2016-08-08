(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

'use strict';

module.exports = function (_) {
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
};

},{}],2:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var whichTransition = require('./components/tx-transition');

  console.log(whichTransition());
})();

},{"./components/tx-transition":1}]},{},[2]);
