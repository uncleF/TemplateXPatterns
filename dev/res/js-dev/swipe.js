/* jshint browser:true */

(function() {

  var $ = require('jquery');
  var swipe = require('./components/tx-swipe');
  var eventTool = require('./components/tx-event');

  var gallery;
  var slides = $('.slides');
  var dotsSize = $('.slide').length;
  var next = document.getElementById('next');
  var prev = document.getElementById('prev');

  slides.after(swipe.dots(dotsSize, 'js-slidesNavigation', 'js-slidesNavigationPage'));
  gallery = swipe.init(slides, $('.js-slidesNavigationPage'), 'js-slidesNavigationPage', $(document));
  eventTool.bind(next, 'click', gallery.next);
  eventTool.bind(prev, 'click', gallery.prev);
  console.log(gallery.size());

})();
