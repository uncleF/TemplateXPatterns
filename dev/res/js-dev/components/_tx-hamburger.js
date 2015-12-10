/* jshint browser:true, jquery:true */

'use strict';

$(document).ready(function() {

  var NAV_TOGGLE = $('.navToggle');

  NAV_TOGGLE.on('click touch', function(event) {
    event.preventDefault();
    NAV_TOGGLE.toggleClass('navToggle-is-active');
  });

});
