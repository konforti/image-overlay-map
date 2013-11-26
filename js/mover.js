var overlaytiler = overlaytiler || {};

/**
 * Creates a mover (big dot) that moves a bunch of other dots.
 *
 * @constructor
 * @param {Node} parent  the element to attach this dot to.
 * @param {Array.<overlaytiler.Dot>} dots  the dots that should be moved with
 *    this dot.
 * @extends overlaytiler.Dot
 */
overlaytiler.Mover = function(parent, dots) {

  // hide the dot until its position is calculated.
  var dot = new overlaytiler.Dot(parent, -1e5, -1e5);
  dot.controlDots = dots;
  dot.getCanvas().className += ' mover';
  dot.onMouseMove = this.onMouseMove.bind(dot);

  google.maps.event.addListener(dots[0], 'change', this.onDotChange.bind(dot));

  this.onDotChange.call(dot);

  return dot;
};

/**
 * Repositions the mover to be between the first and third control points.
 * @this overlaytiler.Dot
 * @private
 */
overlaytiler.Mover.prototype.onDotChange = function() {

  var dots = this.controlDots;
  this.x = (dots[0].x + dots[1].x) / 2;
  this.y = (dots[0].y + dots[1].y) / 2;
  this.render();
};

/**
 * Translates a dot.
 * @this overlaytiler.Dot
 * @private
 * @param {overlaytiler.Dot} dot  the dot to move.
 * @param {number} deltax  the amount to move on the x-axis.
 * @param {number} deltay  the amount to move on the y-axis.
 */
overlaytiler.Mover.prototype.translateDot = function(dot, deltax, deltay) {

  dot.x += deltax;
  dot.y += deltay;
  dot.render();
};

/**
 * @this overlaytiler.Dot
 * @private
 * @param {MouseEvent} e  the event containing coordinates of current mouse
 * position.
 */
overlaytiler.Mover.prototype.onMouseMove = function(e) {
  
  var deltax = e.clientX - this.cx,
      deltay = e.clientY - this.cy;

  this.x += deltax;
  this.y += deltay;

  for (var i = 0, var dot; dot = this.controlDots[i]; ++i) {
    overlaytiler.Mover.prototype.translateDot(dot, deltax, deltay);
  }
  this.render();

  this.cx = e.clientX;
  this.cy = e.clientY;
};
