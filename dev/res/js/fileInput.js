(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
/* jshint browser:true */

'use strict';

var querySelectorPolyfill = require('./tx-querySelectorAll.js');
var textContentPolyfill = require('./tx-textContent.js');
var eventTools = require('./tx-event');

module.exports = function (selectors, text) {

  function fileInput(field, text) {

    var input;
    var className;
    var activeClassName;
    var wrapElement;
    var valueElement;
    var buttonElement;
    var buttonText;

    function fieldChange(event) {
      valueElement.textContent = input.value.split('\\')[2];
    }

    function fieldClick(event) {
      event.preventDefault();
      event.stopPropagation();
      eventTools.trigger(input, 'click', false);
    }

    function wrap() {
      var parent = input.parentNode;
      wrapElement = document.createElement('div');
      wrapElement.className = className + '-wrap';
      valueElement = document.createElement('div');
      valueElement.className = className + '-value';
      buttonElement = document.createElement('a');
      buttonElement.href = '#';
      buttonElement.textContent = buttonText;
      buttonElement.className = className + '-button';
      wrapElement.appendChild(valueElement);
      wrapElement.appendChild(buttonElement);
      parent.insertBefore(wrapElement, input);
      wrapElement.appendChild(input);
      input.classList.add(className + '-is-wrapped');
    }

    input = field;
    buttonText = text || 'Browse';
    className = input.classList.item(0);
    activeClassName = className + '-is-active';
    wrap(input);
    eventTools.bind(input, 'change', fieldChange);
    eventTools.bind(wrapElement, 'click', fieldClick);
    eventTools.bind(buttonElement, 'click', fieldClick);
  }

  function selectFields(selectors) {
    if (!document.querySelectorAll) {
      querySelectorPolyfill();
    }
    return document.querySelectorAll(selectors);
  }

  var fields = selectFields(selectors);
  textContentPolyfill();
  for (var index = 0, length = fields.length; index < length; index += 1) {
    var field = fields[index];
    fileInput(field, text);
  }
};

},{"./tx-event":1,"./tx-querySelectorAll.js":3,"./tx-textContent.js":4}],3:[function(require,module,exports){
'use strict';

/* jshint browser:true */

module.exports = function (_) {
  document.querySelectorAll = document.body.querySelectorAll = Object.querySelectorAll = function querySelectorAllPolyfill(r, c, i, j, a) {
    var d = document;
    var s = d.createStyleSheet();
    a = d.all;
    c = [];
    r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
    for (i = r.length; i--;) {
      s.addRule(r[i], 'k:v');
      for (j = a.length; j--;) {
        if (a[j].currentStyle.k) {
          c.push(a[j]);
        }
      }
      s.removeRule(0);
    }
    return c;
  };
};

},{}],4:[function(require,module,exports){
/* jshint browser:true */

'use strict';

module.exports = function (_) {
  if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, 'textContent') && !Object.getOwnPropertyDescriptor(Element.prototype, 'textContent').get) {
    (function () {
      var innerText = Object.getOwnPropertyDescriptor(Element.prototype, 'innerText');
      Object.defineProperty(Element.prototype, 'textContent', {
        get: function get() {
          return innerText.get.call(this);
        },
        set: function set(s) {
          return innerText.set.call(this, s);
        }
      });
    })();
  }
};

},{}],5:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var fileInput = require('./components/tx-fileInput');

  fileInput('#file');
})();

},{"./components/tx-fileInput":2}]},{},[5]);
