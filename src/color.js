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

var Moment = window['Moment'] = window['Moment'] || {};

var Color = function (red, green, blue) {
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

Moment['Color'] = Color;
