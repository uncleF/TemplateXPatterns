/* jshint browser:true */

var $ = require('jquery');

(function() {

  var swipe = require('./components/tx-swipe');

  var slides = $('.slides');
  var dotsSize = $('.slide').size();
  slides.after(swipe.dots(dotsSize, 'js-slidesNavigation', 'js-slidesNavigationPage'));
  swipe.init(slides, $('.js-slidesNavigationPage'), 'js-slidesNavigationPage', $(document));

})();
