/* jshint browser:true */
/* exported initHamburger */

function initHamburger(object) {

  var activeClassName = ' ' + object.className + '-is-active';

  function toggle(event) {
    var currentClassName = object.className;
    event.preventDefault();
    object.className = currentClassName.indexOf(activeClassName) > -1 ? currentClassName.replace(activeClassName, '') : currentClassName + activeClassName;
  }

  object.addEventListener('click', toggle);

}
