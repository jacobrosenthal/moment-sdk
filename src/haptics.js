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

/** Represents an effect that can be applied on an individual motor.
  *
  * @constructor
  * @param {number} start - The starting intensity of the motor (0-100)
  * @param {number} end - The ending intensity of the motor (0-100)
  * @param {number} func - The ID of the easing equation to use for the effect
  * @param {number} duration - The duration of effect in milliseconds
  * @param {number=} position - Starting position in milliseconds (optional)
  * @memberof Moment
  *
  * @example
  * var quickPulse = new Moment.Effect(
  *     0, // start at zero intensity (actuator off)
  *     75, // end at 75% intensity
  *     Moment.Easing.Exponential.in, // ease in with exponential curve
  *     500 // exponential transition lasts 500ms
  * );
  *
  * @example
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * @example
  * var quickIn = new Moment.Effect(
  *     25, // start at 25% intensity
  *     75, // end at 75% intensity
  *     Moment.Easing.Quadratic.in, // ease in with quadratic curve
  *     400, // quadratic transition lasts 400ms
  *     100 // begin 100ms into the quadratic transition (only 300ms of easing)
  * );
  */
function Effect(start, end, func, duration, position) {
    this.start = start;
    this.end = end;
    this.func = func;
    this.duration = duration;
    this.position = position || 0;
}

/** The default effect for turning off an individual motor.
  *
  * @memberof Moment.Effect
  * @name Moment.Effect.OFF
  * @public
  * @constant
  * @type {Effect}
  *
  * @example
  * // turn off the top left motor
  * var tlOff = new Vibration(
  *     Moment.Actuators.topLeft,
  *     Moment.Effect.OFF
  * );
  */
Effect['OFF'] = new Effect(0, 0, Moment['Easing']['Step']['out'], 10);

/** Scales the duration of an Effect object and rounds to the nearest
  * millisecond.
  *
  * @memberof Moment.Effect
  * @name Moment.Effect#scale
  * @method
  * @param {number} multiplier - The multiplier for the duration of effect
  * @returns {Effect} `this`, chainable return value
  *
  * @example
  * var quickPulse = new Moment.Effect(
  *     0, // start at zero intensity (actuator off)
  *     75, // end at 75% intensity
  *     Moment.Easing.Exponential.in, // ease in with exponential curve
  *     500 // exponential transition lasts 500ms
  * );
  * quickPulse.scale(1.2); // duration is now 600ms
  */
Effect['prototype']['scale'] = function (multiplier) {
    this.duration = Math.round(multiplier * this.duration);
    this.position = Math.round(multiplier * this.position);
    return this;
};

/** Returns a new instance of `Effect` with the exact same parameters, allowing
  * direct manipulation of a copy of the effect (e.g. changing the easing or
  * duration) without modifying all of the references to the old object.
  *
  * @memberof Moment.Effect
  * @name Moment.Effect#clone
  * @method
  * @returns {Effect}
  *
  * @example
  * var quickPulse = new Moment.Effect(
  *     0, // start at zero intensity (actuator off)
  *     75, // end at 75% intensity
  *     Moment.Easing.Exponential.in, // ease in with exponential curve
  *     500 // exponential transition lasts 500ms
  * );
  *
  * var scaled = quickPulse.scale(1.2); // duration is now 600ms
  * scaled == quickPulse // true
  *
  * scaled = quickPulse.clone().scale(1.5); // duration is now 900ms
  * scaled == quickPulse //false
  */
Effect['prototype']['clone'] = function () {
    return new Effect(
        this.start,
        this.end,
        this.func,
        this.duration,
        this.position
    );
};

/** Swaps the start and end values of the effect.
  *
  * @memberof Moment.Effect
  * @name Moment.Effect#invert
  * @method
  * @returns {Effect}
  *
  * @example
  * var quickPulse = new Moment.Effect(
  *     0, // start at zero intensity (actuator off)
  *     75, // end at 75% intensity
  *     Moment.Easing.Exponential.in, // ease in with exponential curve
  *     500 // exponential transition lasts 500ms
  * );
  *
  * quickPulse.invert(); // effect now starts at 75% and ends at zero
  */
Effect['prototype']['invert'] = function () {
    var temp = this.start;
    this.start = this.end;
    this.end = this.temp;
    return this;
};

Moment['Effect'] = Effect;

/** Represents a vibration on a specific motor for future execution on a
  * timeline of effects.
  *
  * @constructor
  * @param {Number|Object} pin - The pin ID of the motor to vibrate
  * @param {Effect} effect - The effect to apply to the motor
  * @param {number=} delay - Milliseconds before starting the vibration (optional)
  * @memberof Moment
  *
  * @example
  * var quickPulse = new Moment.Effect(
  *     0, // start at zero intensity (actuator off)
  *     75, // end at 75% intensity
  *     Moment.Easing.Exponential.in, // ease in with exponential curve
  *     500 // exponential transition lasts 500ms
  * );
  *
  * var tlPulse = new Vibration(
  *     Moment.Actuators.topLeft, // select top left actuator
  *     quickPulse, // use the 500ms exponential ease in effect
  *     0 // begin immediately after tlPulse.start() is called
  * );
  *
  * @example
  * var quickIn = new Moment.Effect(
  *     25, // start at 25% intensity
  *     75, // end at 75% intensity
  *     Moment.Easing.Quadratic.in, // ease in with quadratic curve
  *     400, // quadratic transition lasts 400ms
  *     100 // begin 100ms into the quadratic transition (only 300ms of easing)
  * );
  *
  * var blIn = new Vibration(
  *     Moment.Actuators.bottomLeft, // select bottom left actuator
  *     quickIn, // use the 400ms quadratic ease in effect
  *     200 // begin effect 200ms after blIn.start() is called
  * );
  *
  * @example
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * var trFade = new Vibration(
  *     Moment.Actuators.topRight, // select top right actuator
  *     fadeOut, // use the 750ms exponential fade out effect
  *     100 // begin effect after 100ms
  * );
  */
function Vibration(pin, effect, delay) {
    if (pin.hasOwnProperty('pin')) {
        pin = pin.pin;
    }
    this.pin = pin;
    this.effect = effect;
    this.delay = delay || 0;
}

/** Starts execution of a vibration command.
  *
  * @memberof Moment.Vibration
  * @name Moment.Vibration#start
  * @method
  * @returns {Vibration} `this`, chainable return value
  *
  * @example
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * var trFade = new Vibration(
  *     Moment.Actuators.topRight, // select top right actuator
  *     fadeOut, // use the 750ms exponential fade out effect
  *     100 // begin effect after 100ms
  * );
  *
  * trFade.start();
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
    return this;
};

/** Returns a new instance of `Moment.Vibration` with the exact same
  * parameters, allowing direct manipulation of a copy of without modifying
  * all of the references to the old object.
  *
  * @memberof Moment.Vibration
  * @name Moment.Vibration#clone
  * @method
  * @returns {Vibration}
  *
  * @example
  * var scaled = trFade.scale(1.33333); // duration is now 1000ms
  * scaled == trFade // true
  *
  * scaled = trFade.clone().scale(0.5); // duration is now 500ms
  * scaled == trFade //false
  */
Vibration['prototype']['clone'] = function () {
    return new Vibration(
        this.pin,
        this.effect,
        this.delay
    );
};

/** Scales the duration of the effect by a multiplier value.
  *
  * @memberof Moment.Vibration
  * @name Moment.Vibration#scale
  * @method
  * @returns {Vibration} `this`, chainable return value
  *
  * @example
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * var trFade = new Vibration(
  *     Moment.Actuators.topRight, // select top right actuator
  *     fadeOut, // use the 750ms exponential fade out effect
  *     100 // begin effect after 100ms
  * );
  *
  * trFade.scale(2.0); // effect now lasts 1500ms
  */
Vibration['prototype']['scale'] = function (multiplier) {
    this.effect = this.effect.clone().scale(multiplier);
    return this;
};

/** Swaps the starting and ending intensity of the vibration.
  *
  * @memberof Moment.Vibration
  * @name Moment.Vibration#invert
  * @method
  * @returns {Vibration} `this`, chainable return value
  *
  * @example
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * var trFade = new Vibration(
  *     Moment.Actuators.topRight, // select top right actuator
  *     fadeOut, // use the 750ms exponential fade out effect
  *     100 // begin effect after 100ms
  * );
  *
  * trFade.invert(); // vibration now fades in (25%->75%)
  */
Vibration['prototype']['invert'] = function () {
    this.effect = this.effect.clone().invert();
    return this;
};

/** Get the total amount of time required to execute the vibration, including
  * the delay before the start of the effect as well as the effect duration.
  *
  * @memberof Moment.Vibration
  * @name Moment.Vibration#totalTime
  * @method
  * @returns {Number}
  *
  * @example
  * var fadeOut = new Moment.Effect(
  *     75, // start at 75% intensity
  *     25, // end at 25% intensity
  *     Moment.Easing.Linear.out, // ease out with linear curve
  *     750 // linear transition lasts 750ms
  * );
  *
  * var trFade = new Vibration(
  *     Moment.Actuators.topRight, // select top right actuator
  *     fadeOut, // use the 750ms exponential fade out effect
  *     100 // begin effect after 100ms
  * );
  *
  * trFade.totalTime() == 850 // duration + delay = 850ms
  */
Vibration['prototype']['totalTime'] = function () {
    return this.delay - this.effect.position + this.effect.duration;
};

Moment['Vibration'] = Vibration;

})();
