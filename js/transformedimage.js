// Copyright 2011 Google

/**
 * @license
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @author Chris Broadfoot (cbro@google.com)
 */

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
  this.translateX_ = 0;
  this.translateY_ = 0;
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
  
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.drawImage(this.img_, 0, 0, w, h);
  
  overlaytiler.TransformedImage.imgProp = {};

  overlaytiler.TransformedImage.imgProp.NE_x = Math.abs(this.translateX_) + (w * ratio);
  overlaytiler.TransformedImage.imgProp.NE_y = Math.abs(this.translateY_);
  overlaytiler.TransformedImage.imgProp.SW_x = Math.abs(this.translateX_);
  overlaytiler.TransformedImage.imgProp.SW_y = Math.abs(this.translateY_) + (h * ratio);  
};

/**
 * Sets a translation transformation for rendering the image.
 * @param {number} x  the amount to translate by on the x-axis.
 * @param {number} y  the amount to translate by on the y-axis.
 */
overlaytiler.TransformedImage.prototype.setTranslate = function(x, y) {
  this.translateX_ = x;
  this.translateY_ = y;
};