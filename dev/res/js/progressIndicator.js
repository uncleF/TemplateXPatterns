(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

'use strict';

var SIZE = 200;

var TRACK_SUFFIX = 'Track';
var INDICATOR_SUFFIX = 'Indicator';
var PERCENTAGE_SUFFIX = 'Percentage';

module.exports = function (id, className) {

  var container = void 0;

  var svg = void 0;
  var track = void 0;
  var indicator = void 0;
  var percentage = void 0;

  var progress = void 0;
  var length = void 0;

  function createSVG(svgClassName) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    element.setAttribute('width', SIZE);
    element.setAttribute('height', SIZE);
    element.setAttribute('viewBox', '0 0 ' + SIZE + ' ' + SIZE);
    element.setAttribute('class', svgClassName);
    return element;
  }

  function createCircle(circleClassName) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    var half = SIZE / 2;
    circle.setAttribute('cx', half);
    circle.setAttribute('cy', half);
    circle.setAttribute('r', half - 2);
    circle.setAttribute('class', circleClassName);
    return circle;
  }

  function createPercentage(percentageClassName) {
    var element = document.createElement('div');
    element.className = percentageClassName;
    return element;
  }

  function createDOM() {
    svg.appendChild(track);
    svg.appendChild(indicator);
    container.appendChild(svg);
    container.appendChild(percentage);
  }

  function calculatePercentage() {
    return 100 * progress + '%';
  }

  function calculateDashArray() {
    var dashLength = length * progress;
    return dashLength + ' ' + (length - dashLength);
  }

  function setProgress(amount) {
    progress = amount;
    percentage.textContent = calculatePercentage();
    indicator.setAttribute('style', 'stroke-dasharray: ' + calculateDashArray());
  }

  function init() {
    container = document.getElementById(id);
    svg = createSVG(className);
    track = createCircle('' + className + TRACK_SUFFIX);
    indicator = createCircle('' + className + INDICATOR_SUFFIX);
    percentage = createPercentage('' + className + PERCENTAGE_SUFFIX);
    length = Math.PI * SIZE;
  }

  init();
  createDOM();

  return {
    set: setProgress
  };
};

},{}],2:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var indicator = require('./patterns/tx-progressIndicator');

  var indicatorInstance = indicator('progressHolder', 'progress');

  indicatorInstance.set(0.10);
})();

},{"./patterns/tx-progressIndicator":1}]},{},[2]);
