/* jshint browser:true */

(function() {

  var translate = require('patterns/tx-translate');

  document.getElementById('transformThis').setAttribute('style', translate.string('X', '100px'));

})();
