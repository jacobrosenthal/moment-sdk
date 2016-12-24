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

var inheritsChain = [
    /** Appends a vibration to the timeline object.
      *
      * @method
      * @memberof Moment.Timeline
      * @name Moment.Timeline#push
      * @param {Vibration} vibration - The `Vibration` object to append
      * @returns {Timeline} - `this`, a chainable return value
      */
    'push',

    /** Similar to `Array.prototype.splice()`, this allows insertion and
      * deletion of items at a specific index in the timeline.
      *
      * @method
      * @memberof Moment.Timeline
      * @name Moment.Timeline#splice
      * @returns {Timeline} - `this`, a chainable return value
      */
    'splice'
];

var inheritsNew = [
    /** Returns a new `Timeline` instance with a subset of the vibrations
      * in the original timeline.
      *
      * @method
      * @memberof Moment.Timeline
      * @name Moment.Timeline#slice
      * @returns {Timeline} - a new timeline of vibrations (subset of original)
      */
    'slice',
];

var inheritsResult = [
    /** Checks if a timeline includes a specific instance of `Vibration`.
      *
      * @method
      * @memberof Moment.Timeline
      * @name Moment.Timeline#includes
      * @param {Vibration} vibration - The `Vibration` object to search for
      * @returns {Boolean} whether or not the `Vibration` exists in timeline
      */
    'includes'
];

inheritsChain.forEach(function (name) {
    Timeline['prototype'][name] = function () {
        Array['prototype'][name].apply(this.vibrations, arguments);
        return this;
    };
});

inheritsNew.forEach(function (name) {
    Timeline['prototype'][name] = function () {
        var n = Array['prototype'][name].apply(this.vibrations, arguments);
        return new Timeline(n);
    };
});

inheritsResult.forEach(function (name) {
    Timeline['prototype'][name] = function () {
        return Array['prototype'][name].apply(this.vibrations, arguments);
    };
});

/** Returns a clone of the timeline object with the same vibration sequence,
  * allowing direct manipulation of the timeline without modifying the original
  * object.
  *
  * @method
  * @memberof Moment.Timeline
  * @name Moment.Timeline#clone
  * @returns {Timeline} a new `Timeline` clone of the original object
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
  */
Timeline['prototype']['start'] = function () {
    var i = 0,
        v = this.vibrations,
        l;

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

Moment['Timeline'] = Timeline;

})();
