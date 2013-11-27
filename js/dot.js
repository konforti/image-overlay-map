var overlaytiler = overlaytiler || {};

/**
 * A draggable Dot, rendered to the page.
 *https://dl.dropboxusercontent.com/s/xl6tah59yiqzuj7/tautphaus%20park%20zoo.gif
 * @constructor
 * @param {Node} parent  the element to add this dot to.
 * @param {number} x  initial x-axis position.
 * @param {number} y  initial y-axis position.
 */
overlaytiler.Dot = function(parent, x, y, id) {
  this.x = x;
  this.y = y;

  var canvas = this.canvas = document.createElement('div');
  canvas.className = 'dot';
  parent.appendChild(canvas);

  this.id = id;
  this.onMouseMove_ = this.onMouseMove_.bind(this);
  this.onMouseDown_ = this.onMouseDown_.bind(this);
  this.onMouseUp_ = this.onMouseUp_.bind(this);

  canvas.addEventListener('mousedown', this.onMouseDown, true);
  window.addEventListener('mouseup', this.onMouseUp, true);

  this.style = canvas.style;
  this.render();
};

/**
 * @return {Element} the canvas.
 */
overlaytiler.Dot.prototype.getCanvas = function() {

  return this.canvas;
};

/**
 * Renders this dot to the page, at its location.
 */
overlaytiler.Dot.prototype.render = function() {

  this.style.left = this.x + 'px';
  this.style.top = this.y + 'px';
  google.maps.event.trigger(this, 'change');
};

/**
 * Moves the dot to the current mouse position.
 * @private
 * @param {MouseEvent} e  the event containing coordinates of current mouse
 * position.
 */
overlaytiler.Dot.prototype.onMouseMove = function(e) {

  this.x += e.clientX - this.cx;
  this.y += e.clientY - this.cy;

  this.render();

  this.cx = e.clientX;
  this.cy = e.clientY;
};

/**
 * Enables editing of the dot's location.
 * @private
 * @param {MouseEvent} e  the event containing coordinates of current mouse
 * position.
 */
overlaytiler.Dot.prototype.onMouseDown = function(e) {

  this.cx = e.clientX;
  this.cy = e.clientY;
  this.mouseMoveListener = google.maps.event.addDomListener(window, 'mousemove', this.onMouseMove.bind(this));
  google.maps.event.trigger(this, 'dragstart');
};

/**
 * Disables editing of the dot's location.
 * @private
 */
overlaytiler.Dot.prototype.onMouseUp = function() {
  
  if (this.mouseMoveListener) {
    google.maps.event.removeListener(this.mouseMoveListener);
  }
  google.maps.event.trigger(this, 'dragend');
  
  this.fixDots_();
};

/**
 * @private
 */
overlaytiler.Dot.prototype.fixDots_ = function() {
    if (this.id == 'ne') {
    this.x = overlaytiler.TransformedImage.imgProp.NE_x;
    this.y = overlaytiler.TransformedImage.imgProp.NE_y;
  }
  else if (this.id == 'sw') {
    this.x = overlaytiler.TransformedImage.imgProp.SW_x;
    this.y = overlaytiler.TransformedImage.imgProp.SW_y;
  }
  this.render();
}
