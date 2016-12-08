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

var global = Function('return this')();
global.Moment = global.Moment || {};
var Moment = global.Moment;

function ColorTransition (color, func, duration) {
    this.color = color;
    this.func = func;
    this.duration = duration;
}

Moment['Color']['Transition'] = ColorTransition;

Moment['setColor'] = function (color) {
    Moment._set_led_color(color.red, color.green, color.blue);
};

Moment['tweenColor'] = function (transition) {
    var color = transition.color;
    Moment._tween_led_color(
        color.red,
        color.green,
        color.blue,
        transition.func,
        transition.duration
    );
};

Moment['loopColor'] = function (transitionIn, transitionOut) {
    var color = transitionIn.color;
    Moment._tween_led_color(
        color.red,
        color.green,
        color.blue,
        transitionIn.func,
        transitionIn.duration
    );

    color = transitionOut.color;
    Moment._loop_led_color(
        color.red,
        color.green,
        color.blue,
        transitionOut.func,
        transitionOut.duration
    );
}

})();
