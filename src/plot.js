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

// local variable reference to global `Moment` object
var Moment = Function('return this')()['Moment'];

function computeComponent(x, y, z) {
    return ((0.25 * x + 0.25) + (0.25 * y + 0.25)) * (z * 100.0);
}

function Plot(x, y, z, effect) {
    this.x = x;
    this.y = y;
    this.z = z;

    var topLeft, topRight, bottomLeft, bottomRight;

    topLeft = computeComponent(-x, y, z);
    topRight = computeComponent(x, y, z);
    bottomLeft = computeComponent(-x, -y, z);
    bottomRight = computeComponent(x, -y, z);
}

Moment['Plot'] = Plot;

})();
