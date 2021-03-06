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

var assert = require('assert'),
    init = require('../src/_init'),
    easing = require('../src/easing');

describe('Moment easing equations', function () {

    function testEqn(name) {
        assert.ok(Moment.Easing.hasOwnProperty(name));

        var eqn = Moment.Easing[name];
        assert.ok(eqn);
        assert.ok(eqn.hasOwnProperty("in"));
        assert.ok(eqn.hasOwnProperty("out"));
        assert.ok(eqn.hasOwnProperty("combined"));
    }

    describe('#Easing', function () {
        it('all easing equations present', function () {
            testEqn("Step");
            testEqn("Linear");
            testEqn("Quadratic");
            testEqn("Cubic");
            testEqn("Quartic");
            testEqn("Quintic");
            testEqn("Sine");
            testEqn("Circle");
            testEqn("Exponential");
            testEqn("Elastic");
            testEqn("Back");
            testEqn("Bounce");
        });
    });

});
