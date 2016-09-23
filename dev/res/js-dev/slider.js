/* jshint browser:true */

(function() {

  var slider = require('./patterns/tx-slider');
  var eventTool = require('./patterns/tx-event');

  var gallery;
  var slides = document.getElementById('slider');
  var dotsSize = document.getElementsByClassName('slide').length;
  var next = document.getElementById('next');
  var prev = document.getElementById('prev');
  var navigation = slider.dots(dotsSize, 'js-sliderNavigation', 'js-sliderNavigationPage');

  slides.parentNode.insertBefore(navigation, slides.nextSibling);
  gallery = slider.init(slides, navigation, 'js-sliderNavigationPage');
  eventTool.bind(next, 'click', gallery.next);
  eventTool.bind(prev, 'click', gallery.prev);

})();
