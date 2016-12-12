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

function Actuator(pin) {
    this.pin = pin;
}

/** Namespace for constants and functions related to direct control of the
  * actuators on Moment.
  *
  * @namespace
  * @name Moment.Actuators
  * @memberof Moment
  */
var Actuators = {
    /** The top-left actuator on Moment (automatically changes based on
      * whether the user wears Moment on their left or right hand).
      *
      * @memberof Moment.Actuators
      * @name Moment.Actuators.topLeft
      * @public
      * @constant
      * @type {Actuator}
      *
      * @example
      * var fadeOut = new Moment.Effect(
      *     75, // start at 75% intensity
      *     25, // end at 25% intensity
      *     Moment.Easing.Linear.out, // ease out with linear curve
      *     750 // linear transition lasts 750ms
      * );
      *
      * var tlFade = new Vibration(
      *     Moment.Actuators.topLeft, // select top left actuator
      *     fadeOut, // use the 750ms exponential fade out effect
      *     100 // begin effect after 100ms
      * );
      *
      * tlFade.start();
      */
    'topLeft': new Actuator(21),

    /** The top-right actuator on Moment (automatically changes based on
      * whether the user wears Moment on their left or right hand).
      *
      * @memberof Moment.Actuators
      * @name Moment.Actuators.topRight
      * @public
      * @constant
      * @type {Actuator}
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
    'topRight': new Actuator(22),

    /** The bottom-right actuator on Moment (automatically changes based on
      * whether the user wears Moment on their left or right hand).
      *
      * @memberof Moment.Actuators
      * @name Moment.Actuators.bottomRight
      * @public
      * @constant
      * @type {Actuator}
      *
      * @example
      * var fadeOut = new Moment.Effect(
      *     75, // start at 75% intensity
      *     25, // end at 25% intensity
      *     Moment.Easing.Linear.out, // ease out with linear curve
      *     750 // linear transition lasts 750ms
      * );
      *
      * var brFade = new Vibration(
      *     Moment.Actuators.bottomRight, // select bottom right actuator
      *     fadeOut, // use the 750ms exponential fade out effect
      *     100 // begin effect after 100ms
      * );
      *
      * brFade.start();
      */
    'bottomRight': new Actuator(23),

    /** The bottom-left actuator on Moment (automatically changes based on
      * whether the user wears Moment on their left or right hand).
      *
      * @memberof Moment.Actuators
      * @name Moment.Actuators.bottomLeft
      * @public
      * @constant
      * @type {Actuator}
      *
      * @example
      * var fadeOut = new Moment.Effect(
      *     75, // start at 75% intensity
      *     25, // end at 25% intensity
      *     Moment.Easing.Linear.out, // ease out with linear curve
      *     750 // linear transition lasts 750ms
      * );
      *
      * var blFade = new Vibration(
      *     Moment.Actuators.topLeft, // select bottom left actuator
      *     fadeOut, // use the 750ms exponential fade out effect
      *     100 // begin effect after 100ms
      * );
      *
      * blFade.start();
      */
    'bottomLeft': new Actuator(24)
};

Moment['Actuators'] = Actuators;

})();
