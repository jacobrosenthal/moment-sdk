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

var Easing = {};

Easing['Step'] = {
    'in': 1,
    'out': 0,
    'combined': 0
}

Easing['Linear'] = {
    'in': 2,
    'out': 2,
    'combined': 2
};

Easing['Quadratic'] = {
    'in': 3,
    'out': 4,
    'combined': 5
};

Easing['Cubic'] = {
    'in': 6,
    'out': 7,
    'combined': 8
};

Easing['Quartic'] = {
    'in': 9,
    'out': 10,
    'combined': 11
};

Easing['Quintic'] = {
    'in': 12,
    'out': 13,
    'combined': 14
};

Easing['Sine'] = {
    'in': 15,
    'out': 16,
    'combined': 17
};

Easing['Circle'] = {
    'in': 18,
    'out': 19,
    'combined': 20
};

Easing['Exponential'] = {
    'in': 21,
    'out': 22,
    'combined': 23
};

Easing['Elastic'] = {
    'in': 24,
    'out': 25,
    'combined': 26
};

Easing['Back'] = {
    'in': 27,
    'out': 28,
    'combined': 29
};

Easing['Bounce'] = {
    'in': 30,
    'out': 31,
    'combined': 32
};

Moment['Easing'] = Easing;

})();
