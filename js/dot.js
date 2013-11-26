var overlaytiler = overlaytiler || {};

/**
 * A draggable Dot, rendered to the page.
 *
 * @constructor
 * @param {Node} parent  the element to add this dot to.
 * @param {number} x  initial x-axis position.
 * @param {number} y  initial y-axis position.
 */
overlaytiler.Dot = function(parent, x, y) {

  this.x = x;
  this.y = y;

  var canvas = this.canvas = document.createElement('div');
  canvas.className = 'dot';
  parent.appendChild(canvas);

  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseDown = this.onMouseDown.bind(this);
  this.onMouseUp = this.onMouseUp.bind(this);

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
};
