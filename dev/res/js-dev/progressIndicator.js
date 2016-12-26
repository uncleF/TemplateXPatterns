/* jshint browser:true */

(function() {

  let indicator = require('./patterns/tx-progressIndicator');

  let indicatorInstance = indicator('progressHolder', 'progress');

  indicatorInstance.set(0.10);

})();
