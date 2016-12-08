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

/** Ensure Moment object exists
  */
if (typeof Moment === 'undefined' ) {
    var Moment = {};
}

(function () {

/**
 * @constructor
 */
function Color(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
}

function minMax(number) {
    if (number > 255) {
        return 255;
    }
    else if (number < 0) {
        return 0;
    }
    return Math.round(number);
}

Color['prototype']['intensify'] = function (multiplier) {
    this.red = minMax(multiplier * this.red);
    this.green = minMax(multiplier * this.green);
    this.blue = minMax(multiplier * this.blue);
}

Color['prototype']['blend'] = function (color, multiplier) {
    var invMult = 1.0 - multiplier;

    this.red = minMax(multiplier * color.red + invMult * this.red);
    this.green = minMax(multiplier * color.green + invMult * this.green);
    this.blue = minMax(multiplier * color.blue + invMult * this.blue);
}

Color.ORANGE = new Color(0xfd, 0xaa, 0x00);
Color.RED = new Color(0xe6, 0x30, 0x14);
Color.PINK = new Color(0xb8, 0x00, 0x8f);
Color.GREEN = new Color(0xb9, 0xf1, 0x00);
Color.BLUE = new Color(0x00, 0x7e, 0xed);
Color.BLACK = new Color(0, 0, 0);
Color.GRAY = new Color(100, 100, 100);
Color.WHITE = new Color(255, 255, 255);

Moment['Color'] = Color;

})();
