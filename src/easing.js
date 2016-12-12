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

function Equation(ineq, out, combined) {
    this['in'] = ineq;
    this['out'] = out;
    this['combined'] = combined;
}

/** Namespace for constants that define the different easing equations that
  * can be used to transition actuator vibrations.
  *
  * @namespace
  * @name Moment.Easing
  */
var Easing = {
    /** Use a step function to transition to the next value - instantly
      * change the actuator intensity without any easing.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Step':        new Equation(1, 0, 0),

    /** Use a linear equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Linear':      new Equation(2, 2, 2),

    /** Use a quadratic equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Quadratic':   new Equation(3, 4, 5),

    /** Use a cubic equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Cubic':       new Equation(6, 7, 8),

    /** Use a quartic equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Quartic':     new Equation(9, 10, 11),

    /** Use a quintic equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Quintic':     new Equation(12, 13, 14),

    /** Use a sinosudial equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Sine':        new Equation(15, 16, 17),

    /** Use a circular equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Circle':      new Equation(18, 19, 20),

    /** Use an exponential equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Exponential': new Equation(21, 22, 23),

    /** Use an elastic equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Elastic':     new Equation(24, 25, 26),

    /** Use a backing equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Back':        new Equation(27, 28, 29),

    /** Use a bouncing equation to transition to the next value over time.
      *
      * @memberof Moment.Easing
      * @public
      * @constant
      * @type {Equation}
      */
    'Bounce':      new Equation(30, 31, 32)
};

Moment['Easing'] = Easing;

})();
