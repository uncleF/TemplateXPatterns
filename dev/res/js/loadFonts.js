(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint browser:true */
/* global Promise */

'use strict';

var FontFaceObserver = require('fontfaceobserver');

module.exports = function (fontCritical, fontsRest, className, object) {
  var critical = new FontFaceObserver(fontCritical);
  critical.check().then(function (_) {
    var restChecks = [];
    object.className += ' ' + className + 'Critical-is-loaded';
    for (var index, length = fontsRest.length; index < length; index += 1) {
      restChecks.push(new FontFaceObserver(fontsRest[index]).check());
    }
    Promise.all(restChecks).then(function (_) {
      object.className += ' ' + className + 'Rest-is-loaded';
    });
  });
};

},{"fontfaceobserver":3}],2:[function(require,module,exports){
'use strict';

/* jshint browser:true */

(function () {

  var loadFonts = require('./components/tx-loadFonts');
  loadFonts('RobotoCritical', ['Roboto', 'RobotoBold', 'RobotoItalic', 'RobotoBoldItalic'], 'roboto', document.documentElement);
})();

},{"./components/tx-loadFonts":1}],3:[function(require,module,exports){
(function(){var h=!!document.addEventListener;function k(a,b){h?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function w(a){document.body?a():h?document.addEventListener("DOMContentLoaded",a):document.onreadystatechange=function(){"interactive"==document.readyState&&a()}};function x(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function y(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=l;z(a)&&null!==a.a.parentNode&&b(a.g)}var l=a;k(a.b,c);k(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,H=!!window.FontFace;function I(){if(null===D){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}D=""!==a.style.font}return D}function J(a,b){return[a.style,a.weight,I()?a.stretch:"","100px",b].join(" ")}
B.prototype.a=function(a,b){var c=this,l=a||"BESbswy",E=b||3E3,F=(new Date).getTime();return new Promise(function(a,b){if(H){var q=function(){(new Date).getTime()-F>=E?b(c):document.fonts.load(J(c,c.family),l).then(function(b){1<=b.length?a(c):setTimeout(q,25)},function(){b(c)})};q()}else w(function(){function r(){var b;if(b=-1!=e&&-1!=f||-1!=e&&-1!=g||-1!=f&&-1!=g)(b=e!=f&&e!=g&&f!=g)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],
10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(e==t&&f==t&&g==t||e==u&&f==u&&g==u||e==v&&f==v&&g==v)),b=!b;b&&(null!==d.parentNode&&d.parentNode.removeChild(d),clearTimeout(G),a(c))}function q(){if((new Date).getTime()-F>=E)null!==d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)e=m.a.offsetWidth,f=n.a.offsetWidth,g=p.a.offsetWidth,r();G=setTimeout(q,50)}}var m=new x(l),n=new x(l),p=new x(l),e=-1,f=-1,g=-1,t=-1,u=-1,v=-1,d=document.createElement("div"),
G=0;d.dir="ltr";y(m,J(c,"sans-serif"));y(n,J(c,"serif"));y(p,J(c,"monospace"));d.appendChild(m.a);d.appendChild(n.a);d.appendChild(p.a);document.body.appendChild(d);t=m.a.offsetWidth;u=n.a.offsetWidth;v=p.a.offsetWidth;q();A(m,function(a){e=a;r()});y(m,J(c,'"'+c.family+'",sans-serif'));A(n,function(a){f=a;r()});y(n,J(c,'"'+c.family+'",serif'));A(p,function(a){g=a;r()});y(p,J(c,'"'+c.family+'",monospace'))})})};window.FontFaceObserver=B;window.FontFaceObserver.prototype.check=B.prototype.a;"undefined"!==typeof module&&(module.exports=window.FontFaceObserver);}());

},{}]},{},[2]);
