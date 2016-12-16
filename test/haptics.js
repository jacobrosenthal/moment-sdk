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
    haptics = require('../src/haptics');

describe('Moment haptics', function () {

    describe('#Effect()', function () {
        it('encapsulates an effect for any motor', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            assert.equal(newEffect.start, 25);
            assert.equal(newEffect.end, 75);
            assert.equal(newEffect.func, 8);
            assert.equal(newEffect.duration, 400);
            assert.equal(newEffect.position, 200);
        });
    });

    describe('#scale()', function () {
        it('scales the duration of an effect', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            newEffect.scale(1.5);
            assert.equal(newEffect.start, 25);
            assert.equal(newEffect.end, 75);
            assert.equal(newEffect.func, 8);
            assert.equal(newEffect.duration, 600);
            assert.equal(newEffect.position, 300);
        });
    });

    describe('#clone()', function () {
        it('clones the effect object', function () {
            var quickPulse = new Moment.Effect(
                0, // start at zero intensity (actuator off)
                75, // end at 75% intensity
                Moment.Easing.Exponential.in, // ease in with exponential curve
                500 // exponential transition lasts 500ms
            );

            var scaled = quickPulse.scale(1.2); // duration is now 600ms
            assert.ok(scaled == quickPulse);

            scaled = quickPulse.clone().scale(1.5); // duration is now 900ms
            assert.ok(scaled != quickPulse);
        });
    });

    describe('#Vibration()', function () {
        it('encapsulates a vibration on a motor', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            var newVibration = new Moment.Vibration(2, newEffect, 100);
            assert.equal(newEffect, newVibration.effect);
            assert.equal(newVibration.pin, 2);
            assert.equal(newVibration.delay, 100);
        });
    });

    describe('#start()', function () {
        it('starts a vibration on a motor', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            var newVibration = new Moment.Vibration(2, newEffect, 100);
            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.equal(pin, 2);
                  assert.equal(start, 25);
                  assert.equal(end, 75);
                  assert.equal(func, 8);
                  assert.equal(duration, 400);
                  assert.equal(position, 200);
                  assert.equal(delay, 100);
            }
        });
    });

    describe('#clone()', function () {
        it('clones a vibration object for a motor', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            var newVibration = new Moment.Vibration(2, newEffect, 100);
            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.equal(pin, 2);
                  assert.equal(start, 25);
                  assert.equal(end, 75);
                  assert.equal(func, 8);
                  assert.equal(duration, 400);
                  assert.equal(position, 200);
                  assert.equal(delay, 100);
            }

            var scaled = newVibration.scale(1.333333);
            assert.ok(scaled == newVibration);
            scaled = newVibration.clone().scale(0.5);
            assert.ok(scaled != newVibration);
        });
    });

    describe('#scale()', function () {
        it('scales a vibration object with multiplier', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            var newVibration = new Moment.Vibration(2, newEffect, 100);
            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.equal(pin, 2);
                  assert.equal(start, 25);
                  assert.equal(end, 75);
                  assert.equal(func, 8);
                  assert.equal(duration, 400);
                  assert.equal(position, 200);
                  assert.equal(delay, 100);
            }

            var scaled = newVibration.scale(0.5);
            assert.ok(scaled.effect.duration == 200);
        });
    });


    describe('#totalTime()', function () {
        it('gets the total execution time for vibration', function () {
            var newEffect = new Moment.Effect(25, 75, 8, 400, 200);
            var newVibration = new Moment.Vibration(2, newEffect, 100);
            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.equal(pin, 2);
                  assert.equal(start, 25);
                  assert.equal(end, 75);
                  assert.equal(func, 8);
                  assert.equal(duration, 400);
                  assert.equal(position, 200);
                  assert.equal(delay, 100);
            }

            assert.ok(newVibration.totalTime() == 300);
        });
    });

});
