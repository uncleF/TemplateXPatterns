/* jshint browser:true */

(function() {

  const router = require('./patterns/tx-router');

  const NAV_LINK_CLASS = 'navLink';

  function changeView() {
    console.log('New View');
  }

  router.init(changeView);

  document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains(NAV_LINK_CLASS)) {
      event.preventDefault();
      router.go(target.href);
    }
  });

})();
