
/**
 * An image, tranformed by the anchor of three points.
 *
 * @constructor
 * @param {!HTMLImageElement} img  the image to transform.
 * @param {overlaytiler.Dot} a  the top-left control point.
 * @param {overlaytiler.Dot} b  the top-right control point.
 * @param {overlaytiler.Dot} c  the bottom-right control point.
 */
overlaytiler.TransformedImage = function(img, a, b) {
  this.img_ = img;
  this.a_ = a;
  this.b_ = b;

};

/**
 * Draws the image to a 2d canvas.
 * @param {CanvasRenderingContext2D} ctx  the canvas2d context to draw to.
 */
overlaytiler.TransformedImage.prototype.draw = function(ctx) {
  var x1 = this.a_.x;
  var x2 = this.b_.x;


  var y1 = this.a_.y;
  var y2 = this.b_.y;


  var h = this.img_.height;
  var w = this.img_.width;


  var ratioX = (x1 - x2) / w;
  var ratioY = (y2 - y1) / h;
  var ratio = ratioX <= ratioY ? ratioX : ratioY;

  var tc = x1 + this.translateX_;
  var tf = y1 + this.translateY_;
  var ta = ratio;
  var te = ratio;

  ctx.setTransform(ta, 0, 0, te, tc, tf);
  ctx.drawImage(this.img_, 0, 0, w, h);

};
