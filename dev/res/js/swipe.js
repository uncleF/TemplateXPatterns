(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */

'use strict';

module.exports = function (html) {
  var element = document.createElement('div');
  element.innerHTML = html;
  return element.firstChild;
};

},{}],2:[function(require,module,exports){
/* jshint browser:true */

'use strict';

function setData(event, data) {
  event.data = data;
  return event;
}

function getData(event) {
  return event.data;
}

function bind(object, type, callback) {
  if (document.addEventListener) {
    object.addEventListener(type, callback);
  } else {
    object.attachEvent('on' + type, callback);
  }
}

function unbind(object, type, callback) {
  if (document.removeEventListener) {
    object.removeEventListener(type, callback);
  } else {
    object.detachEvent('on' + type, callback);
  }
}

function trigger(object, eventName, propagate, data) {
  propagate = propagate || false;
  if (document.createEvent) {
    var event = document.createEvent('UIEvents');
    if (data) {
      setData(event, data);
    }
    event.initEvent(eventName, propagate, false);
    object.dispatchEvent(event);
  } else {
    var _event = document.createEventObject();
    if (data) {
      setData(_event, data);
    }
    object.fireEvent('on' + eventName, _event);
  }
}

function target(event) {
  return event.target || event.srcElement;
}

exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;
exports.getData = getData;
exports.setData = setData;

},{}],3:[function(require,module,exports){
/* jshint browser:true */

'use strict';

var SLIDE_THRESHOLD = 15;
var NEXT_SHIFT = 50;

var SLIDER_CLASS_NAME = 'slider';
var SLIDER_FIXING_CLASS_NAME = SLIDER_CLASS_NAME + '-is-fixing';
var SLIDER_CHANGING_CLASS_NAME = SLIDER_CLASS_NAME + '-is-changing';
var SLIDER_EVENT = 'swipe';
var SLIDE_ACTIVE_CLASS_NAME_SUFFIX = '-is-active';
var DOT_NAVIGATION_CLASS_NAME = 'js-dotsNavigation';
var DOT_CLASS_NAME = 'js-dotsPage';
var DOT_ACTIVE_CLASS_NAME = '' + DOT_CLASS_NAME + SLIDE_ACTIVE_CLASS_NAME_SUFFIX;

var eventTool = require('./tx-event');
var createNode = require('./tx-createNode');
var transition = require('./tx-transition')();
var translateGallery = require('./tx-translate').css;

function generateNavigationDots(size, pageClassName) {
  var navigationDots = '';
  for (var index = 0; index < size; index += 1) {
    navigationDots += index === 0 ? '<li class="' + pageClassName + ' ' + pageClassName + SLIDE_ACTIVE_CLASS_NAME_SUFFIX + ' ' + DOT_ACTIVE_CLASS_NAME + ' ' + DOT_CLASS_NAME + '"></li>' : '<li class="' + pageClassName + ' ' + DOT_CLASS_NAME + '"></li>';
  }
  return navigationDots;
}

function dots(size, listClassName, pageClassName) {
  var navigation = '<ol class="' + listClassName + ' ' + DOT_NAVIGATION_CLASS_NAME + '">' + generateNavigationDots(size, pageClassName) + '</ol>';
  return createNode(navigation);
}

function init(object, navigationObject, pageClassName) {

  var slider;
  var sliderDots;
  var sliderDotClassName;
  var sliderDotActiveClassName;

  var sliderMax;
  var activeSlideIndex;
  var activeSlideDot;

  var pointStartX;
  var pointShift;
  var pointDiffX;
  var positionStart;

  var animationFrame;

  /* Get */

  function getSlider() {
    return slider;
  }

  function getSliderDots() {
    return sliderDots;
  }

  function getSliderDot(index) {
    return getSliderDots()[index];
  }

  function getSliderDotClassName() {
    return sliderDotClassName;
  }

  function getSliderDotActiveClassName() {
    return sliderDotActiveClassName;
  }

  function getSliderMax() {
    return sliderMax;
  }

  function getActiveSlideIndex() {
    return activeSlideIndex;
  }

  function getActiveSlideDot() {
    return activeSlideDot;
  }

  function getPointStartX() {
    return pointStartX;
  }

  function getPointShift() {
    return pointShift;
  }

  function getPointDiffX() {
    return pointDiffX;
  }

  function getPositionStart() {
    return positionStart;
  }

  function getAnimationFrame(frame) {
    return animationFrame;
  }

  /* Set */

  function setSlider() {
    slider = object;
  }

  function setSliderDots() {
    sliderDots = navigationObject.getElementsByClassName(getSliderDotClassName());
  }

  function setSliderDotClassName() {
    sliderDotClassName = pageClassName;
    sliderDotActiveClassName = '' + pageClassName + SLIDE_ACTIVE_CLASS_NAME_SUFFIX;
  }

  function setSliderMax() {
    sliderMax = sliderDots.length - 1;
  }

  function setActiveSlideIndex(index) {
    activeSlideIndex = index;
  }

  function setActiveSlideDot() {
    activeSlideDot = getSliderDot(getActiveSlideIndex());
  }

  function setPointStartX(start) {
    pointStartX = start;
  }

  function setPointShift(shift) {
    pointShift = shift;
  }

  function setPointDiffX(diff) {
    pointDiffX = diff;
  }

  function setPositionStart(position) {
    positionStart = position;
  }

  function setAnimationFrame(frame) {
    animationFrame = frame;
  }

  /* Utilities */

  function updateDots() {
    getActiveSlideDot().classList.remove(getSliderDotActiveClassName(), DOT_ACTIVE_CLASS_NAME);
    setActiveSlideDot();
    getActiveSlideDot().classList.add(getSliderDotActiveClassName(), DOT_ACTIVE_CLASS_NAME);
  }

  function calculatePositions() {
    if (getActiveSlideIndex() === 0 && getPointDiffX() > 0) {
      setPointShift(4);
    } else if (getActiveSlideIndex() === getSliderMax() && getPointDiffX() < 0) {
      setPointShift(4);
    }
  }

  function calculateCompleteDistance() {
    return -100 * getActiveSlideIndex() + '%';
  }

  function calculateSlideDistance() {
    var correction = getPointDiffX() < 0 ? SLIDE_THRESHOLD : -SLIDE_THRESHOLD;
    return getPositionStart() + (getPointDiffX() + correction) / getPointShift() + 'px';
  }

  function translateSlider(distance) {
    getSlider().style.transform = translateGallery('x', distance).transform;
  }

  function shiftSlider() {
    calculatePositions();
    translateSlider(calculateSlideDistance());
  }

  function finalizeSlide() {
    getSlider().classList.remove(SLIDER_FIXING_CLASS_NAME, SLIDER_CHANGING_CLASS_NAME);
    eventTool.unbind(slider, transition, finalizeSlide);
  }

  function updateInteractionParameters(event) {
    var startPoint = event ? event.touches[0].pageX : 0;
    setPointStartX(startPoint);
    setPointShift(1);
    setPointDiffX(0);
    setPositionStart(getSlider().getBoundingClientRect().left);
  }

  function preventClick(event) {
    if (event) {
      event.preventDefault();
    }
  }

  function increaseActiveSlideIndex() {
    setActiveSlideIndex(getActiveSlideIndex() + 1);
  }

  function deincreaseActiveSlideIndex() {
    setActiveSlideIndex(getActiveSlideIndex() - 1);
  }

  function slidingForward() {
    return getPointDiffX() < -NEXT_SHIFT && getActiveSlideIndex() !== getSliderMax();
  }

  function slidingBack() {
    return getPointDiffX() > NEXT_SHIFT && getActiveSlideIndex() !== 0;
  }

  function updateIndex() {
    if (slidingForward()) {
      increaseActiveSlideIndex();
    } else if (slidingBack()) {
      deincreaseActiveSlideIndex();
    }
  }

  /* Actions */

  function slide(index) {
    setActiveSlideIndex(index);
    updateDots();
    translateSlider(calculateCompleteDistance());
  }

  function fakeSwipe(fakeShift) {
    updateInteractionParameters();
    setPointDiffX(fakeShift);
    getSlider().classList.add(SLIDER_CHANGING_CLASS_NAME);
    fixSlider();
  }

  function prevItem(event) {
    preventClick(event);
    if (getActiveSlideIndex() !== 0) {
      fakeSwipe(NEXT_SHIFT + 1);
    }
  }

  function nextItem(event) {
    preventClick(event);
    if (getActiveSlideIndex() !== getSliderMax()) {
      fakeSwipe(-NEXT_SHIFT - 1);
    }
  }

  function positionSlider() {
    eventTool.trigger(slider, SLIDER_EVENT);
    eventTool.bind(slider, transition, finalizeSlide);
    getSlider().classList.add(SLIDER_FIXING_CLASS_NAME);
    translateSlider(calculateCompleteDistance());
  }

  function fixSlider() {
    if (Math.abs(pointDiffX) > SLIDE_THRESHOLD) {
      updateIndex();
      updateDots();
      positionSlider();
    }
  }

  /* Interactions */

  function touchStart(event) {
    if (!getSlider().classList.contains(SLIDER_FIXING_CLASS_NAME) || !getSlider().classList.contains(SLIDER_CHANGING_CLASS_NAME)) {
      updateInteractionParameters(event);
      eventTool.bind(document, 'touchmove', touchMove);
      eventTool.bind(document, 'touchend', touchEnd);
    }
  }

  function touchMove(event) {
    setPointDiffX(event.touches[0].pageX - getPointStartX());
    if (Math.abs(getPointDiffX()) > SLIDE_THRESHOLD) {
      event.preventDefault();
      setAnimationFrame(requestAnimationFrame(shiftSlider));
    }
  }

  function touchEnd() {
    eventTool.unbind(document, 'touchmove', touchMove);
    eventTool.unbind(document, 'touchend', touchEnd);
    cancelAnimationFrame(getAnimationFrame());
    requestAnimationFrame(fixSlider);
  }

  function interactions() {
    eventTool.bind(getSlider(), 'touchstart', touchStart);
  }

  /* Inititalization */

  function setDefaultValues() {
    setSlider();
    setSliderDotClassName();
    setSliderDots();
    setSliderMax();
    setActiveSlideIndex(0);
    setActiveSlideDot();
  }

  setDefaultValues();
  interactions();

  /* Interface */

  return {
    prev: prevItem,
    next: nextItem,
    set: slide
  };
}

exports.dots = dots;
exports.init = init;

},{"./tx-createNode":1,"./tx-event":2,"./tx-transition":4,"./tx-translate":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
/* jshint browser:true */

'use strict';

function properties(axis, distance) {
  var property = 'translate' + axis.toUpperCase() + '(' + distance + ')';
  return {
    property: property,
    propertyLayer: property + ' translateZ(0)'
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
  return '-webkit-transform:' + css.propertyLayer + ';-moz-transform:' + css.propertyLayer + ';-ms-transform:' + css.property + ';-o-transform:' + css.property + ';transform:' + css.propertyLayer + ';';
}

exports.css = translateCSS;
exports.string = translateString;

},{}],6:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var swipe = require('./components/tx-swipe');
  var eventTool = require('./components/tx-event');

  var gallery;
  var slides = document.getElementById('slider');
  var dotsSize = document.getElementsByClassName('slide').length;
  var next = document.getElementById('next');
  var prev = document.getElementById('prev');
  var navigation = swipe.dots(dotsSize, 'js-slidesNavigation', 'js-slidesNavigationPage');

  slides.parentNode.insertBefore(navigation, slides.nextSibling);
  gallery = swipe.init(slides, navigation, 'js-slidesNavigationPage');
  eventTool.bind(next, 'click', gallery.next);
  eventTool.bind(prev, 'click', gallery.prev);
})();

},{"./components/tx-event":2,"./components/tx-swipe":3}]},{},[6]);
