(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (html) {
  var element = document.createElement('div');
  element.innerHTML = html;
  return element.firstChild;
};

},{}],2:[function(require,module,exports){
'use strict';

/* Event Data */

function setData(event, data) {
  var newEvent = event;
  newEvent.data = data;
  return newEvent;
}

function getData(event) {
  return event.data;
}

/* Event Binding */

function bind(object, type, callback) {
  object.addEventListener(type, callback, true);
}

function unbind(object, type, callback) {
  object.removeEventListener(type, callback);
}

/* Event Trigger */

function triggerCreateEvent(object, eventName, propagate, eventType, data) {
  var event = document.createEvent(eventType);
  if (data) {
    setData(event, data);
  }
  event.initEvent(eventName, propagate, false);
  object.dispatchEvent(event);
}

function triggerCreateEventObject(object, eventName, propagate, data) {
  var event = document.createEventObject();
  if (data) {
    setData(event, data);
  }
  object.fireEvent('on' + eventName, event);
}

function trigger(object, eventName) {
  var propagate = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var eventType = arguments.length <= 3 || arguments[3] === undefined ? 'MouseEvents' : arguments[3];
  var data = arguments[4];

  if (document.createEvent) {
    triggerCreateEvent(object, eventName, propagate, eventType, data);
  } else {
    triggerCreateEventObject(object, eventName, propagate, data);
  }
}

/* Event Target */

function target(event) {
  return event.target;
}

/* Interface */

exports.getData = getData;
exports.bind = bind;
exports.unbind = unbind;
exports.trigger = trigger;
exports.target = target;

},{}],3:[function(require,module,exports){
'use strict';

var eventTool = require('./tx-event');
var createNode = require('./tx-createNode');
var transition = require('./tx-transition')();
var translateGallery = require('./tx-translate').css;

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

/* Dots */

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

/* Slider Constructor */

function init(object, navigationObject, pageClassName) {
  var slider = void 0;
  var sliderDots = void 0;
  var sliderDotClassName = void 0;
  var sliderDotActiveClassName = void 0;
  var sliderFixing = void 0;
  var sliderChanging = void 0;
  var sliderMax = void 0;
  var activeSlideIndex = void 0;
  var activeSlideDot = void 0;
  var pointStartX = void 0;
  var pointShift = void 0;
  var pointDiffX = void 0;
  var positionStart = void 0;
  var animationFrame = void 0;

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

  function getAnimationFrame() {
    return animationFrame;
  }

  function getStatus() {
    return {
      fixing: sliderFixing,
      changing: sliderChanging
    };
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

  function setStatus(fixing, changing) {
    sliderFixing = fixing;
    sliderChanging = changing;
  }

  /* Slider Utilities */

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
    setStatus(false, false);
    getSlider().classList.remove(SLIDER_FIXING_CLASS_NAME, SLIDER_CHANGING_CLASS_NAME);
    getSlider().removeEventListener(transition, finalizeSlide);
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

  /* Slider Actions */

  function slide(index) {
    setActiveSlideIndex(index);
    updateDots();
    translateSlider(calculateCompleteDistance());
  }

  function positionSlider() {
    eventTool.trigger(getSlider(), SLIDER_EVENT, false, 'UIEvents');
    getSlider().addEventListener(transition, finalizeSlide);
    setStatus(true, true);
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

  function fakeSwipe(fakeShift) {
    updateInteractionParameters();
    setPointDiffX(fakeShift);
    setStatus(true, true);
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

  /* Slider Interactions */

  function touchMove(event) {
    setPointDiffX(event.touches[0].pageX - getPointStartX());
    console.log(Math.abs(getPointDiffX()) > SLIDE_THRESHOLD);
    if (Math.abs(getPointDiffX()) > SLIDE_THRESHOLD) {
      event.preventDefault();
      setAnimationFrame(requestAnimationFrame(shiftSlider));
    }
  }

  function touchEnd() {
    document.removeEventListener('touchmove', touchMove, true);
    document.removeEventListener('touchend', touchEnd);
    cancelAnimationFrame(getAnimationFrame());
    requestAnimationFrame(fixSlider);
  }

  function touchStart(event) {
    event.preventDefault();
    var status = getStatus();
    if (!status.fixing || !status.changing) {
      updateInteractionParameters(event);
      document.addEventListener('touchmove', touchMove, true);
      document.addEventListener('touchend', touchEnd);
    }
  }

  function subscribe() {
    getSlider().parentElement.addEventListener('touchstart', touchStart);
  }

  /* Slider Inititalization */

  function setDefaultValues() {
    setSlider();
    setSliderDotClassName();
    setSliderDots();
    setSliderMax();
    setActiveSlideIndex(0);
    setActiveSlideDot();
  }

  function initSlider() {
    setDefaultValues();
    subscribe();
  }

  initSlider();

  /* Slider Interface */

  return {
    prev: prevItem,
    next: nextItem,
    set: slide
  };
}

/* Interface */

exports.dots = dots;
exports.init = init;

},{"./tx-createNode":1,"./tx-event":2,"./tx-transition":4,"./tx-translate":5}],4:[function(require,module,exports){
'use strict';

module.exports = function () {
  var transitionEvents = ['transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'transitionend', 'webkitTransitionEnd'];
  var transitions = ['transition', 'oTransition', 'MSTransition', 'MozTransition', 'WebkitTransition'];
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

},{}],5:[function(require,module,exports){
'use strict';

/* Utilities */

function properties(axis, distance) {
  var property = 'translate' + axis.toUpperCase() + '(' + distance + ')';
  var propertyLayer = property + ' translateZ(0)';
  return {
    property: property,
    propertyLayer: propertyLayer
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
    transform: css.propertyLayer
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

},{}],6:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

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

},{"./patterns/tx-event":2,"./patterns/tx-slider":3}]},{},[6]);
