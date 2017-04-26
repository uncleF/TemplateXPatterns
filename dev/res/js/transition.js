(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function (event, state) {
  var eventEnd = '' + event + state;
  var eventCap = capitalize(event);
  var eventEndCap = '' + capitalize(event) + capitalize(state);
  var transitionEvents = [eventEnd, 'o' + eventEndCap, 'MS' + eventEndCap, eventEnd, 'webkit' + eventEndCap];
  var transitions = [event, 'o' + eventCap, 'MS' + eventCap, 'Moz' + eventCap, 'Webkit' + eventCap];
  var element = document.createElement('element');
  var transitionEvent = void 0;
  transitions.some(function (transition, index) {
    var condition = element.style[transition] !== undefined;
    if (condition) {
      transitionEvent = transitionEvents[index];
    }
    return condition;
  });
  return transitionEvent;
};

},{}],2:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var whichTransition = require('./patterns/tx-transition');

  console.log(whichTransition());
})();

},{"./patterns/tx-transition":1}]},{},[2]);
