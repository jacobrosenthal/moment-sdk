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

function computeComponent(x1, y1, x2, y2, z) {
    var a = x1 - x2;
    var b = y1 - y2;
    var d = Math.sqrt( a*a + b*b );
    if (d > 2.0) d = 2.0;
    return 100.0 * z * (2.0 - d);
}

/** Represents a point of vibrations with cartesian coordinates on 3 dimensions
  * `x`, `y`, and `z`. The x-axis corresponds to the horizontal location of
  * the vibration relative to the user's wrist, and the y-axis corresponds to
  * the vertical location. The z-axis corresponds to the intensity of the
  * vibration at that point.
  *
  * @constructor
  * @memberof Moment
  *
  * @param {Number} x - the horizontal location of the vibration
  * @param {Number} y - the vertical location of the vibration
  * @param {Number} z - the intensity of the vibration
  */
function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.topLeft = computeComponent(-1, 1, x, y, z);
    this.topRight = computeComponent(1, 1, x, y, z);
    this.bottomLeft = computeComponent(-1, -1, x, y, z);
    this.bottomRight = computeComponent(1, -1, x, y, z);
}

/** Create a timeline of vibrations from effects passed as arguments.
  *
  * @method
  * @memberof Moment.Point
  * @name Moment.Point#vibration
  *
  * @param {...Effect} effect - The effects to use in the generated timeline
  * @returns {Timeline} The timeline of vibrations at the point
  */
Point['prototype']['vibration'] = function () {
    var vibrations = [], temp, i, len, effect, delay = 0;

    for (i = 0, len = arguments.length; i < len; i += 1) {
        effect = arguments[i];
        temp = effect.clone();
        temp.start *= this.topLeft / 100.0;
        temp.end *= this.topLeft / 100.0;
        vibrations.push(
          new Moment.Vibration(
            Moment.Actuators.topLeft,
            temp,
            delay
          )
        );

        temp = effect.clone();
        temp.start *= this.topRight / 100.0;
        temp.end *= this.topRight / 100.0;
        vibrations.push(
          new Moment.Vibration(
            Moment.Actuators.topRight,
            temp,
            delay
          )
        );

        temp = effect.clone();
        temp.start *= this.bottomLeft / 100.0;
        temp.end *= this.bottomLeft / 100.0;
        vibrations.push(
          new Moment.Vibration(
            Moment.Actuators.bottomLeft,
            temp,
            delay
          )
        );

        temp = effect.clone();
        temp.start *= this.bottomRight / 100.0;
        temp.end *= this.bottomRight / 100.0;
        vibrations.push(
          new Moment.Vibration(
            Moment.Actuators.bottomRight,
            temp,
            delay
          )
        );

        delay += effect.duration;
    }

    return new Moment.Timeline(vibrations);
};

Moment['Point'] = Point;

/** Represents a transition between two points of vibration - a straight line
  * is drawn between the two points using a pre-defined effect for transition.
  *
  * @constructor
  * @memberof Moment
  *
  * @param {Point} p1 - the first point
  * @param {Point} p2 - the second point
  * @param {Effect} effect - the effect to use for transitioning
  */
function Line(p1, p2, effect) {
    var vibrations = [], temp;

    temp = effect.clone();
    temp.start *= p1.topLeft / 100.0;
    temp.end *= p2.topLeft / 100.0;
    vibrations.push(
      new Moment.Vibration(
        Moment.Actuators.topLeft,
        temp
      )
    );

    temp = effect.clone();
    temp.start *= p1.topRight / 100.0;
    temp.end *= p2.topRight / 100.0;
    vibrations.push(
      new Moment.Vibration(
        Moment.Actuators.topRight,
        temp
      )
    );

    temp = effect.clone();
    temp.start *= p1.bottomLeft / 100.0;
    temp.end *= p2.bottomLeft / 100.0;
    vibrations.push(
      new Moment.Vibration(
        Moment.Actuators.bottomLeft,
        temp
      )
    );

    temp = effect.clone();
    temp.start *= p1.bottomRight / 100.0;
    temp.end *= p2.bottomRight / 100.0;
    vibrations.push(
      new Moment.Vibration(
        Moment.Actuators.bottomRight,
        temp
      )
    );

    /** The timeline object representing the transition between two points.
      *
      * @public
      * @name Moment.Line#timeline
      * @type {Timeline}
      * @memberof Moment.Line
      */
    this['timeline'] = new Moment.Timeline(vibrations);
}

Moment['Line'] = Line;

})();
