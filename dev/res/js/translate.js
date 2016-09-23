(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

'use strict';

/* Utilities */

function properties(axis, distance) {
  var property = 'translate' + axis.toUpperCase() + '(' + distance + ')';
  return {
    property: property,
    propertyLayer: property + ' translateZ(0)'
  };
}

/* CSS Object */

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

/* CSS String */

function translateString(axis, distance) {
  var css = properties(axis, distance);
  return '-webkit-transform:' + css.propertyLayer + ';-moz-transform:' + css.propertyLayer + ';-ms-transform:' + css.property + ';-o-transform:' + css.property + ';transform:' + css.propertyLayer + ';';
}

/* Interface */

exports.css = translateCSS;
exports.string = translateString;

},{}],2:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var translate = require('./patterns/tx-translate');

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));
})();

},{"./patterns/tx-translate":1}]},{},[2]);
