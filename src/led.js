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

/** Namespace for functions enabling LED control.
  * @namespace
  * @name Moment.LED
  */
var LED = Moment['LED'] = {};

/** Holds the parameters required for an LED color transition using an easing
  * equation and custom duration.
  *
  * @constructor
  * @memberof Moment.LED
  * @name Moment.LED.Transition
  * @param {Object} color - The Color instance to transition to.
  * @param {number} func - The integer ID of the easing equation to use.
  * @param {number} duration - The duration of the transition in milliseconds.
  *
  * @example
  * // a 500ms quadratic transition to an orange color
  * var orangeTransition = new Moment.LED.Transition(
  *     new Moment.Color(0xff, 0x99, 0x33),
  *     Moment.Easing.Quadratic.in,
  *     500
  * );
  * @example
  * // a 100ms inverse exponential transition to a green color
  * var greenTransition = new Moment.LED.Transition(
  *     new Moment.Color(0x00, 0x88, 0x11),
  *     Moment.Easing.Exponential.out,
  *     100
  * );
  * @example
  * // a 200ms combined sinosudial transition to a white color
  * var whiteTransition = new Moment.LED.Transition(
  *     new Moment.Color(0xff, 0xff, 0xff),
  *     Moment.Easing.Sine.combined,
  *     200
  * );
  */
function Transition (color, func, duration) {
    this.color = color;
    this.func = func;
    this.duration = duration;
}

LED['Transition'] = Transition;

/** Sets the current color of the LED to a specific value.
  *
  * @memberof Moment.LED
  * @param {Object} color - The Color value to set
  * @name Moment.LED.setColor
  * @method
  *
  * @example
  * // set the current LED color to orange
  * Moment.LED.setColor(Moment.Color.ORANGE);
  *
  * @example
  * // set the current LED color to red
  * Moment.LED.setColor(Moment.Color.RED);
  *
  * @example
  * // set the current LED color to #007eeb
  * Moment.LED.setColor(new Moment.Color(0x00, 0x7e, 0xeb));
  */
LED['setColor'] = function (color) {
    Moment['_set_led_color'](color.red, color.green, color.blue);
};

/** Tweens the current color of the LED using a transition object
  *
  * @memberof Moment.LED
  * @param {Transition} transition - The Transition value to set
  * @name Moment.LED.tweenColor
  * @method
  *
  * @example
  * // a 500ms quadratic transition to an orange color
  * var orangeTransition = new Moment.LED.Transition(
  *     new Moment.Color(0xff, 0x99, 0x33),
  *     Moment.Easing.Quadratic.in,
  *     500
  * );
  * Moment.LED.tweenColor(orangeTransition);
  *
  * @example
  * // a 100ms inverse exponential transition to a green color
  * var greenTransition = new Moment.LED.Transition(
  *     new Moment.Color(0x00, 0x88, 0x11),
  *     Moment.Easing.Exponential.out,
  *     100
  * );
  * Moment.LED.tweenColor(greenTransition);
  *
  * @example
  * // a 200ms combined sinosudial transition to a white color
  * var whiteTransition = new Moment.LED.Transition(
  *     new Moment.Color(0xff, 0xff, 0xff),
  *     Moment.Easing.Sine.combined,
  *     200
  * );
  * Moment.LED.tweenColor(whiteTransition);
  */
LED['tweenColor'] = function (transition) {
    var color = transition.color;
    Moment['_tween_led_color'](
        color.red,
        color.green,
        color.blue,
        transition.func,
        transition.duration
    );
};

/** Loops between two LED transitions, executing one after the other until
  * a new color transition is set.
  *
  * @memberof Moment.LED
  * @param {Transition} transitionIn - The first Transition value to set
  * @param {Transition} transitionOut - The second Transition value to set
  * @name Moment.LED.loopColor
  * @method
  *
  * @example
  * // loop between a 500ms quadratic transition to an orange color
  * // and a 100ms inverse exponential transition to a green color
  * var orangeTransition = new Moment.LED.Transition(
  *     new Moment.Color(0xff, 0x99, 0x33),
  *     Moment.Easing.Quadratic.in,
  *     500
  * );
  *
  * var greenTransition = new Moment.LED.Transition(
  *     new Moment.Color(0x00, 0x88, 0x11),
  *     Moment.Easing.Exponential.out,
  *     100
  * );
  *
  * Moment.LED.loopColor(orangeTransition, greenTransition);
  */
LED['loopColor'] = function (transitionIn, transitionOut) {
    var color = transitionIn.color;
    Moment['_tween_led_color'](
        color.red,
        color.green,
        color.blue,
        transitionIn.func,
        transitionIn.duration
    );

    color = transitionOut.color;
    Moment['_loop_led_color'](
        color.red,
        color.green,
        color.blue,
        transitionOut.func,
        transitionOut.duration
    );
}

})();
