/* jshint browser:true */

(function() {

  var translate = require('./components/tx-translate');

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

})();
