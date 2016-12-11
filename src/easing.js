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

function EquationId(in, out, combined) {
    this['in'] = in;
    this['out'] = out;
    this['combined'] = combined;
}

Moment['Easing'] = {
    'Step':        EquationId(1, 0, 0),
    'Linear':      EquationId(2, 2, 2),
    'Quadratic':   EquationId(3, 4, 5),
    'Cubic':       EquationId(6, 7, 8),
    'Quartic':     EquationId(9, 10, 11),
    'Quintic':     EquationId(12, 13, 14),
    'Sine':        EquationId(15, 16, 17),
    'Circle':      EquationId(18, 19, 20),
    'Exponential': EquationId(21, 22, 23),
    'Elastic':     EquationId(24, 25, 26),
    'Back':        EquationId(27, 28, 29),
    'Bounce':      EquationId(30, 31, 32)
};

})();
