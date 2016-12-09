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

/** Represents an effect that can be applied on an individual motor.
  *
  * @constructor
  * @param {number} start - The starting intensity of the motor (0-100)
  * @param {number} end - The ending intensity of the motor (0-100)
  * @param {number} func - The ID of the easing equation to use for the effect
  * @param {number} duration - The duration of effect in milliseconds
  * @param {number} position - The timeline starting point in milliseconds
  * @memberof Moment
  */
function Effect(start, end, func, duration, position) {
    this.start = start;
    this.end = end;
    this.func = func;
    this.duration = duration;
    this.position = position || 0;
}

/** Scales the duration of an Effect object and rounds to the nearest
  * millisecond.
  *
  * @memberof Moment.Effect
  * @name Moment.Effect#scale
  * @method
  * @param {number} multiplier - The multiplier for the duration of effect
  */
Effect['prototype']['scale'] = function (multiplier) {
    this.duration = Math.round(multiplier * this.duration);
    this.position = Math.round(multiplier * this.position);
}

Moment['Effect'] = Effect;

/** Represents a vibration on a specific motor for future execution on a
  * timeline of effects.
  *
  * @constructor
  * @param {number} pin - The pin ID of the motor to vibrate
  * @param {Effect} effect - The effect to apply to the motor
  * @param {number} delay - Milliseconds before starting the vibration
  * @memberof Moment
  */
function Vibration(pin, effect, delay) {
    this.pin = pin;
    this.effect = effect;
    this.delay = delay || 0;
}

/** Starts execution of a vibration command.
  *
  * @memberof Moment.Vibration
  * @name Moment.Vibration#start
  * @method
  */
Vibration['prototype']['start'] = function () {
    var e = this.effect;
    Moment['_add_transition'](
        this.pin,
        e.start,
        e.end,
        e.func,
        e.duration,
        e.position,
        this.delay
    );
};

Moment['Vibration'] = Vibration;

})();
