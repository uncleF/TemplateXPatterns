/* jshint browser:true */

(function() {

  let map = require('./patterns/tx-gMap');

  const center = {
    lat: 45.0861852,
    lon: 39.0168742
  };

  const markers = [{
    lat: 45.0861852,
    lon: 39.0168742
  }];

  map('map', center, markers);

})();
