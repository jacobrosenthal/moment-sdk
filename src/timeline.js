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
  *
  * @param {Array} vibrations - The sequence of vibrations to place in timeline
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
Timeline['prototype']['includes'] = function () {
    return Array['prototype']['includes'].apply(this.vibrations, arguments);
};

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
    return this.slice();
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
        l,
        len = this.vibrations.length;

    l = v.length;

    for (i = 0; i < len; i += 1) {
        v[i].start();
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

})();
