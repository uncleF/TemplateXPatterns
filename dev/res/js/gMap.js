(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var map = require('./patterns/tx-gMap');

  var center = {
    lat: 45.0861852,
    lon: 39.0168742
  };

  var markers = [{
    lat: 45.0861852,
    lon: 39.0168742
  }];

  map('map', center, markers);
})();

},{"./patterns/tx-gMap":2}],2:[function(require,module,exports){
/* jshint browser:true */
/* global google */

'use strict';

var markers = require('./tx-gMarkers');

module.exports = function (mapID, centerCoords, markersCoords, markerImage) {

  var center = new google.maps.LatLng(centerCoords.lat, centerCoords.lon);
  var options = {
    center: center,
    zoom: 16
  };

  var dom = document.getElementById(mapID);
  var map = new google.maps.Map(dom, options);

  return {
    map: map,
    markers: markers(map, markersCoords, markerImage)
  };
};

},{"./tx-gMarkers":3}],3:[function(require,module,exports){
"use strict";

/* jshint browser:true */
/* global google */

module.exports = function (map, markers, icon) {
  return markers.map(function (marker) {
    return new google.maps.Marker({
      position: new google.maps.LatLng(marker.lat, marker.lon),
      map: map,
      icon: icon
    });
  });
};

},{}]},{},[1]);
