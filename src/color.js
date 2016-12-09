/** Copyright (c) 2016 Somatic Labs. All Rights Reserved.
  *
  * This program is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.
  *
  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.
  *
  * You should have received a copy of the GNU General Public License
  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
  *
  * The information contained herein is property of Somatic Technologies, Inc.
  *
  */

(function () {

var Moment = Function('return this')()['Moment'];

/** Represents a color using a combination of red, green, and blue values.
  *
  * @constructor
  * @param {number} red - The red component of the color.
  * @param {number} green - The green component of the color.
  * @param {number} blue - The blue component of the color.
  * @memberof Moment
  */
function Color(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
}

/** Ensures a color value is an integer between 0 and 255.
  */
function minMax(number) {
    if (number > 255) {
        return 255;
    }
    else if (number < 0) {
        return 0;
    }
    return Math.round(number);
}

/** Intensifies the color by a multiplying factor. After multiplying, the
  * individual components of the color (red, green, and blue) are rounded to
  * the nearest integer. If any of the values are greater than 255, they will
  * be set to 255 as the maximum. Likewise, if any of the values are less than
  * 0, they will be set to 0.
  *
  * @public
  * @memberof Moment.Color
  * @method
  * @name Moment.Color#intensify
  *
  * @param {number} multiplier - The multiplier for all of the color components.
  */
Color['prototype']['intensify'] = function (multiplier) {
    this.red = minMax(multiplier * this.red);
    this.green = minMax(multiplier * this.green);
    this.blue = minMax(multiplier * this.blue);
};

/** Blends a new color in using a multiplier value betwee 0.0 and 1.0 to
  * specify the ratio of the new color values to use relative to the base
  * color. After multiplying, the individual components of the color (red,
  * green, and blue) are rounded to the nearest integer. If any of the values
  * are greater than 255, they will be set to 255 as the maximum. Likewise, if
  * any of the values are less than 0, they will be set to 0.
  *
  * @public
  * @memberof Moment.Color
  * @method
  * @name Moment.Color#blend
  *
  * @param {Color} color - The new color to blend in.
  * @param {number} multiplier - The ratio of new color to use relative to the base color.
  */
Color['prototype']['blend'] = function (color, multiplier) {
    var invMult = 1.0 - multiplier;

    this.red = minMax(multiplier * color.red + invMult * this.red);
    this.green = minMax(multiplier * color.green + invMult * this.green);
    this.blue = minMax(multiplier * color.blue + invMult * this.blue);
};

/** The default orange color in the LED color palette: #fdaa00
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.ORANGE = new Color(0xfd, 0xaa, 0x00);

/** The default red color in the LED color palette: #e63014
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.RED = new Color(0xe6, 0x30, 0x14);

/** The default pink color in the LED color palette: #b8008f
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.PINK = new Color(0xb8, 0x00, 0x8f);

/** The default green color in the LED color palette: #b9f100
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.GREEN = new Color(0xb9, 0xf1, 0x00);

/** The default blue color in the LED color palette: #007eed
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.BLUE = new Color(0x00, 0x7e, 0xed);

/** The default black color in the LED color palette: #000000
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.BLACK = new Color(0, 0, 0);

/** The default gray color in the LED color palette: #646464
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.GRAY = new Color(100, 100, 100);

/** The default white color in the LED color palette: #ffffff
  *
  * @memberof Moment.Color
  * @public
  * @constant
  * @type {Color}
  */
Color.WHITE = new Color(255, 255, 255);

Moment['Color'] = Color;

})();
