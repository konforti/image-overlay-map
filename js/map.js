var initialize = function() {
  var mapOptions = {
    center: new google.maps.LatLng(32, 34),
    zoom: 8,
    mapTypeId: 'roadmap'
  };
  var div = document.getElementById('map');
  var map = new google.maps.Map(div, mapOptions);

  var input = /** @type {HTMLInputElement} */(document.getElementById('target'));
  var searchBox = new google.maps.places.Autocomplete(input);
  searchBox.bindTo('bounds', map);

  google.maps.event.addListener(searchBox, 'place_changed', function() {
    var place = searchBox.getPlace();console.log(place);
    // If the place has a geometry, then present it on a map.
    if (typeof place.geometry !== 'undefined') {
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
    }
  });

  var img = new Image();
  var imgSrc = document.getElementById('img-src');
  google.maps.event.addDomListener(imgSrc, 'change', function() {
    img.src = imgSrc.value;
      img.onload = setupOverlay.bind(this, img, map);
  });

};

/**
 * Adds an editable overlay to the map.
 * @param {Image} img
 * @param {google.maps.Map} map
 */
function setupOverlay(img, map) {
  // sometimes the image hasn't actually loaded
  if (!img.height) {
    setTimeout(setupOverlay.bind(this, img, map), 50);
    return;
  }

  var overlay = new overlaytiler.AffineOverlay(img);
  overlay.setMap(map);

  var opacity = new overlaytiler.OpacityControl(overlay);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(opacity.getElement());

  var message = document.createElement('pre');
  message.id = 'message';
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(message);

  /**
   * Displays Image corners info.
   */
  google.maps.event.addListener(overlay, 'change', function () {
    var dots = overlay.getDotLatLngs();
    var virtualDot = this.getVirtualDot_();
    var proj = this.getProjection();
    fourth = proj.fromDivPixelToLatLng(virtualDot);
    var msg = ['Image Diractions'];
    msg.push('\n');
    msg.push('NW', dots[0].lat(), dots[0].lng(), '\n');
    msg.push('NE', dots[1].lat(), dots[1].lng(), '\n');
    msg.push('SW', dots[2].lat(), dots[2].lng(), '\n');
    msg.push('SE', fourth.lat(), fourth.lng(), '\n');
    message.innerText = msg.join(' ');
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
