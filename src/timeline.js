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

/** Represents a sequence of vibrations arranged in a timeline that can be
  * evaluated by Moment's internal haptic drivers.
  *
  * @constructor
  * @memberof Moment
  * @name Moment.Timeline
  *
  * @param {Array} vibrations - The sequence of vibrations to place in timeline
  *
  * @example
  * // creates a timeline for vibrations
  * var timeline = new Moment.Timeline([vibration1, vibration2, vibration3]);
  * timeline.start(); // starts the sequence of vibrations
  */
function Timeline(vibrations) {
    this.vibrations = vibrations || [];
}

/** Appends a vibration to the timeline object.
  *
  * @method
  * @memberof Moment.Timeline
  * @name Moment.Timeline#push
  * @param {Vibration} vibration - The `Vibration` object to append
  * @returns {Timeline} - `this`, a chainable return value
  *
  * @example
  * var t = new Moment.Timeline([v1, v2]); // timeline with v1 and v2
  * t.push(v3); // t now contains v1, v2, and v3
  */
Timeline['prototype']['push'] = function () {
    Array['prototype']['push'].apply(this.vibrations, arguments);
    return this;
};

/** Similar to `Array.prototype.splice()`, this allows insertion and
  * deletion of items at a specific index in the timeline.
  *
  * @method
  * @memberof Moment.Timeline
  * @name Moment.Timeline#splice
  * @returns {Timeline} - `this`, a chainable return value
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3]);
  * t.splice(1, 1, v4, v5); // t now contains [v1, v4, v5, v3]
  */
Timeline['prototype']['splice'] = function () {
    Array['prototype']['splice'].apply(this.vibrations, arguments);
    return this;
};

/** Returns a new `Timeline` instance with a subset of the vibrations
  * in the original timeline.
  *
  * @method
  * @memberof Moment.Timeline
  * @name Moment.Timeline#slice
  * @returns {Timeline} - a new timeline of vibrations (subset of original)
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3, v4, v5]);
  * var n = t.slice(1, 3); // n contains [v2, v3, v4]
  */
Timeline['prototype']['slice'] = function () {
    var n = Array['prototype']['slice'].apply(this.vibrations, arguments);
    return new Timeline(n);
};

/** Checks if a timeline includes a specific instance of `Vibration`.
  *
  * @method
  * @memberof Moment.Timeline
  * @name Moment.Timeline#includes
  * @param {Vibration} vibration - The `Vibration` object to search for
  * @returns {Boolean} whether or not the `Vibration` exists in timeline
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3, v4, v5]);
  * t.includes(v2); // true
  * t.includes(v6); // false
  */
if ('includes' in Array['prototype']) {
    Timeline['prototype']['includes'] = function () {
        return Array['prototype']['includes'].apply(this.vibrations, arguments);
    };
}
else {
    Timeline['prototype']['includes'] = function () {
        return Array['prototype']['indexOf'].apply(this.vibrations, arguments) > -1;
    };
}

/** Returns a clone of the timeline object with the same vibration sequence,
  * allowing direct manipulation of the timeline without modifying the original
  * object.
  *
  * @method
  * @memberof Moment.Timeline
  * @name Moment.Timeline#clone
  * @returns {Timeline} a new `Timeline` clone of the original object
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3]);
  * var n = t.clone().push(v4); // contains v1...v4
  * t.includes(v4); // false
  */
Timeline['prototype']['clone'] = function () {
    return this['slice']();
};


/** Starts execution of a timeline sequence of vibrations.
  *
  * @memberof Moment.Timeline
  * @name Moment.Timeline#start
  * @method
  * @returns {Timeline} `this`, chainable return value
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3, v4, v5]);
  * t.start(); // starts the vibrations v1...v5
  */
Timeline['prototype']['start'] = function () {
    var i = 0,
        v = this.vibrations,
        l;

    l = v.length;

    for (i = 0; i < l; i += 1) {
        v[i]['start']();
    }

    return this;
};

/** Adds a delay to all vibrations in the timeline. A negative number will
  * reduce the delay.
  *
  * @memberof Moment.Timeline
  * @name Moment.Timeline#addDelay
  * @method
  * @param {Number} delay - The number of milliseconds to add to the delay
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3, v4, v5]);
  * t.addDelay(500); // adds 500ms delay to all vibrations
  * t.start(); // starts the vibrations v1...v5
  */
Timeline['prototype']['addDelay'] = function (delay) {
    var i, len, vibrations;
    i = 0;
    vibrations = this.vibrations;
    len = vibrations.length;

    for (i = 0; i < len; i += 1) {
        vibrations[i].delay += delay;
    }
};

function reduceTime(time, v) {
    var t = v.totalTime();
    if (time > t) {
        return time;
    }
    else {
        return t;
    }
}

/** Compute the total time required to execute the timeline of vibrations.
  *
  * @memberof Moment.Timeline
  * @name Moment.Timeline#totalTime
  * @method
  * @returns {Number} the total time required to execute the timeline
  *
  * @example
  * var t = new Moment.Timeline([v1, v2, v3]);
  * t.totalTime(); // 1500ms
  * t.addDelay(500); // adds 500ms delay to all vibrations
  * t.totalTime(); // 2000ms
  */
Timeline['prototype']['totalTime'] = function () {
    return this.vibrations.reduce(reduceTime, 0);
};

Moment['Timeline'] = Timeline;

function computeComponent(x1, y1, x2, y2, z) {
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt( a*a + b*b );
    if (c > 2.0) c = 2.0;
    return 50.0 * z * (2.0 - c);
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
  * @param {Number} [z=1.0] - the intensity of the vibration at the point
  *
  * @example
  * // top left actuator at 75% intensity
  * var topLeft = new Moment.Point(-1, 1, 0.75);
  *
  * @example
  * // top right actuator at 50% intensity
  * var topRight = new Moment.Point(1, 1, 0.5);
  *
  * @example
  * // bottom right actuator at 25% intensity
  * var bottomRight = new Moment.Point(1, -1, 0.25);
  *
  * @example
  * // center of device at 100% intensity (default intensity)
  * var center = new Moment.Point(0, 0);
  *
  * @example
  * // slightly top-left of the center of device at 75% intensity
  * var slightTopLeft = new Moment.Point(-0.25, 0.4, 0.75);
  */
function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z || 1.0;

    this.topLeft = computeComponent(-1, 1, x, y, z);
    this.topRight = computeComponent(1, 1, x, y, z);
    this.bottomLeft = computeComponent(-1, -1, x, y, z);
    this.bottomRight = computeComponent(1, -1, x, y, z);
}

/** Create a timeline of vibrations using the effects passed as arguments.
  *
  * @method
  * @memberof Moment.Point
  * @name Moment.Point#makeTimeline
  *
  * @param {...Effect} effect - Sequence of effects to use in the generated timeline
  * @returns {Timeline} The timeline of vibrations at the point
  *
  * @example
  * // slightly top-left of the center of device at 75% intensity
  * var slightTopLeft = new Moment.Point(-0.25, 0.4, 0.75);
  *
  * var quickPulse = new Moment.Effect(
  *     0, // start at zero intensity (actuator off)
  *     75, // end at 75% intensity
  *     Moment.Easing.Exponential.in, // ease in with exponential curve
  *     500 // exponential transition lasts 500ms
  * );
  *
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * var timeline = slightTopLeft.makeTimeline(quickPulse, fadeOut);
  *
  * // pulse and fade out the slight top left point
  * timeline.start();
  */
Point['prototype']['makeTimeline'] = function () {
    var vibrations = [], temp, i, len, effect, delay = 0;

    for (i = 0, len = arguments.length; i < len; i += 1) {
        effect = arguments[i];
        temp = effect.clone();
        temp.start *= this.topLeft / 100.0;
        temp.end *= this.topLeft / 100.0;
        vibrations.push(
          new Moment['Vibration'](
            Moment['Actuators']['topLeft'],
            temp,
            delay
          )
        );

        temp = effect.clone();
        temp.start *= this.topRight / 100.0;
        temp.end *= this.topRight / 100.0;
        vibrations.push(
          new Moment['Vibration'](
            Moment['Actuators']['topRight'],
            temp,
            delay
          )
        );

        temp = effect.clone();
        temp.start *= this.bottomLeft / 100.0;
        temp.end *= this.bottomLeft / 100.0;
        vibrations.push(
          new Moment['Vibration'](
            Moment['Actuators']['bottomLeft'],
            temp,
            delay
          )
        );

        temp = effect.clone();
        temp.start *= this.bottomRight / 100.0;
        temp.end *= this.bottomRight / 100.0;
        vibrations.push(
          new Moment['Vibration'](
            Moment['Actuators']['bottomRight'],
            temp,
            delay
          )
        );

        delay += effect.duration;
    }

    return new Moment['Timeline'](vibrations);
};

Moment['Point'] = Point;

/** Represents a transition between two points of vibration - a straight line
  * is drawn between the two points using a pre-defined effect for transition.
  *
  * @constructor
  * @memberof Moment
  * @extends Timeline
  *
  * @param {Point} p1 - the first point
  * @param {Point} p2 - the second point
  * @param {Effect} effect - the effect to use for transitioning
  *
  * @example
  * // slightly top-left of the center of device at 75% intensity
  * var slightTopLeft = new Moment.Point(-0.25, 0.4, 0.75);
  *
  * // top left actuator at 25% intensity
  * var topLeft = new Moment.Point(-1, 1, 0.25);
  *
  * // move from the first point to the second point
  * var timeline = new Moment.Line(slightTopLeft, topLeft, quickPulse);
  * timeline.start(); // start vibration sequence
  */
function Line(p1, p2, effect) {
    var vibrations = [], temp;

    temp = effect.clone();
    temp.start *= p1.topLeft / 100.0;
    temp.end *= p2.topLeft / 100.0;
    vibrations.push(
      new Moment['Vibration'](
        Moment['Actuators']['topLeft'],
        temp
      )
    );

    temp = effect.clone();
    temp.start *= p1.topRight / 100.0;
    temp.end *= p2.topRight / 100.0;
    vibrations.push(
      new Moment['Vibration'](
        Moment['Actuators']['topRight'],
        temp
      )
    );

    temp = effect.clone();
    temp.start *= p1.bottomLeft / 100.0;
    temp.end *= p2.bottomLeft / 100.0;
    vibrations.push(
      new Moment['Vibration'](
        Moment['Actuators']['bottomLeft'],
        temp
      )
    );

    temp = effect.clone();
    temp.start *= p1.bottomRight / 100.0;
    temp.end *= p2.bottomRight / 100.0;
    vibrations.push(
      new Moment['Vibration'](
        Moment['Actuators']['bottomRight'],
        temp
      )
    );

    Moment['Timeline'].call(this, vibrations);
}

Line['prototype'] = Object.create(Moment['Timeline']['prototype']);

Moment['Line'] = Line;

})();
