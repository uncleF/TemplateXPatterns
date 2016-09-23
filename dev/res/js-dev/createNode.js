/* jshint browser:true */

(function() {

  var createNode = require('./patterns/tx-createNode');

  var html = '<div id="child" class="child">Child</div>';
  var parent = document.getElementById('parent');
  parent.appendChild(createNode(html));

})();
