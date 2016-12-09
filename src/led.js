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

/** Loops between two LED transitions.
  *
  * @memberof Moment.LED
  * @param {Transition} transitionIn - The first Transition value to set
  * @param {Transition} transitionOut - The second Transition value to set
  * @name Moment.LED.loopColor
  * @method
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
