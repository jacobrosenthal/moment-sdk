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
    color = require('../src/color'),
    led = require('../src/led');


describe('Moment LED', function () {

    describe('#Color.Transition()', function () {
        it('encapsulates a transition to a new LED color', function () {
            var newColor = new Moment.Color(12, 34, 56);
            var t = new Moment.LED.Transition(newColor, 9, 500);
            assert.equal(t.color, newColor);
            assert.equal(t.func, 9);
            assert.equal(t.duration, 500);
        });
    });

    describe('#setColor()', function () {
        it('set a new color for the LED', function () {
            Moment._set_led_color = function (r, g, b) {
                assert.equal(r, 12);
                assert.equal(g, 34);
                assert.equal(b, 56);
            };

            var newColor = new Moment.Color(12, 34, 56);

            Moment.LED.setColor(newColor);
        });
    });

    describe('#tweenColor()', function () {
        it('transitions to a new color on the LED', function () {
            Moment._tween_led_color = function (r, g, b, f, d) {
                assert.equal(r, 12);
                assert.equal(g, 34);
                assert.equal(b, 56);
                assert.equal(f, 9);
                assert.equal(d, 500);
            };

            var newColor = new Moment.Color(12, 34, 56);
            var t = new Moment.LED.Transition(newColor, 9, 500);

            Moment.LED.tweenColor(t);
        });
    });

    describe('#tweenColor()', function () {
        it('transitions to a looping effect on the LED', function () {
            Moment._tween_led_color = function (r, g, b, f, d) {
                assert.equal(r, 12);
                assert.equal(g, 34);
                assert.equal(b, 56);
                assert.equal(f, 9);
                assert.equal(d, 500);
            };

            Moment._loop_led_color = function (r, g, b, f, d) {
                assert.equal(r, 112);
                assert.equal(g, 134);
                assert.equal(b, 156);
                assert.equal(f, 19);
                assert.equal(d, 1500);
            };

            var newColor1 = new Moment.Color(12, 34, 56);
            var t1 = new Moment.LED.Transition(newColor1, 9, 500);

            var newColor2 = new Moment.Color(112, 134, 156);
            var t2 = new Moment.LED.Transition(newColor2, 19, 1500);

            Moment.LED.tweenColor(t1, t2);
        });
    });
});
