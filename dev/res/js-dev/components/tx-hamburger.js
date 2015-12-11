/* jshint browser:true */

var HAMBURGER = (function() {

  var object;
  var activeClassName;

  function toggle(event) {
    var currentClassName = object.className;
    event.preventDefault();
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
  }

  function init(node) {
    object = node;
    activeClassName = ' ' + object.className + '-is-active';
    object.addEventListener('click', toggle);
  }

  return {
    init: init
  };

})();

module.exports = HAMBURGER;
