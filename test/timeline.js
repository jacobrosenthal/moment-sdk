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
    haptics = require('../src/haptics'),
    haptics = require('../src/timeline'),
    haptics = require('../src/actuators');

describe('Moment timeline system', function () {

    function setUp1() {
      var newEffect1 = new Moment.Effect(25, 75, 8, 400, 200);
      var newVibration1 = new Moment.Vibration(2, newEffect1, 100);
      var newEffect2 = new Moment.Effect(50, 100, 9, 800, 100);
      var newVibration2 = new Moment.Vibration(3, newEffect2, 400);

      var timeline = new Moment.Timeline([newVibration1, newVibration2]);
      return timeline;
    }

    describe('#Timeline', function () {
        it('stores an array of vibrations', function () {
            var timeline = setUp1();

            for (var i = 0, len = timeline.vibrations.length; i < len; i++) {
                var v = timeline.vibrations[i];

                if (v.pin == 2) {
                    assert.equal(v.effect.start, 25);
                    assert.equal(v.effect.end, 75);
                    assert.equal(v.effect.func, 8);
                    assert.equal(v.effect.duration, 400);
                    assert.equal(v.effect.position, 200);
                    assert.equal(v.delay, 100);
                }
                else {
                    assert.equal(v.effect.start, 50);
                    assert.equal(v.effect.end, 100);
                    assert.equal(v.effect.func, 9);
                    assert.equal(v.effect.duration, 800);
                    assert.equal(v.effect.position, 100);
                    assert.equal(v.delay, 400);
                }
            }
        });
    });

    describe('#Timeline.start()', function () {
        it('starts a timeline of vibrations', function () {
            var timeline = setUp1();

            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.ok(pin == 2 || pin == 3);

                  if (pin == 2) {
                      assert.equal(start, 25);
                      assert.equal(end, 75);
                      assert.equal(func, 8);
                      assert.equal(duration, 400);
                      assert.equal(position, 200);
                      assert.equal(delay, 100);
                  }
                  else {
                      assert.equal(start, 50);
                      assert.equal(end, 100);
                      assert.equal(func, 9);
                      assert.equal(duration, 800);
                      assert.equal(position, 100);
                      assert.equal(delay, 400);
                  }
            }

            timeline.start();
        });
    });

    describe('#Timeline.push()', function () {
        it('starts a timeline of vibrations', function () {
            var timeline = setUp1();
            var newEffect1 = new Moment.Effect(0, 25, 5, 600, 50);
            var newVibration1 = new Moment.Vibration(4, newEffect1, 1000);

            timeline.push(newVibration1);

            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.ok(pin == 2 || pin == 3 || pin == 4);

                  if (pin == 2) {
                      assert.equal(start, 25);
                      assert.equal(end, 75);
                      assert.equal(func, 8);
                      assert.equal(duration, 400);
                      assert.equal(position, 200);
                      assert.equal(delay, 100);
                  }
                  else if (pin == 4) {
                      assert.equal(start, 0);
                      assert.equal(end, 25);
                      assert.equal(func, 5);
                      assert.equal(duration, 600);
                      assert.equal(position, 50);
                      assert.equal(delay, 1000);
                  }
                  else {
                      assert.equal(start, 50);
                      assert.equal(end, 100);
                      assert.equal(func, 9);
                      assert.equal(duration, 800);
                      assert.equal(position, 100);
                      assert.equal(delay, 400);
                  }
            }

            assert.ok(timeline.includes(newVibration1));

            timeline.start();
        });
    });

    describe('#Timeline.splice', function () {
        it('starts a timeline of vibrations', function () {
            var timeline = setUp1();
            var newEffect1 = new Moment.Effect(0, 25, 5, 600, 50);
            var newVibration1 = new Moment.Vibration(4, newEffect1, 1000);

            timeline.splice(1, 1, newVibration1);

            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.ok(pin == 2 || pin == 4);

                  if (pin == 2) {
                      assert.equal(start, 25);
                      assert.equal(end, 75);
                      assert.equal(func, 8);
                      assert.equal(duration, 400);
                      assert.equal(position, 200);
                      assert.equal(delay, 100);
                  }
                  else if (pin == 4) {
                      assert.equal(start, 0);
                      assert.equal(end, 25);
                      assert.equal(func, 5);
                      assert.equal(duration, 600);
                      assert.equal(position, 50);
                      assert.equal(delay, 1000);
                  }
            }

            assert.ok(timeline.includes(newVibration1));

            timeline.start();
        });
    });

    describe('#Timeline.clone()', function () {
        it('clones a timeline of vibrations', function () {
            var timeline = setUp1();
            var t2 = timeline.clone();

            assert.equal(timeline.vibrations.length, t2.vibrations.length);

            for (var i = 0, len = t2.vibrations.length; i < len; i++) {
                assert.equal(t2.vibrations[i], timeline.vibrations[i]);
            }
        });
    });

    describe('#Timeline.addDelay()', function () {
        it('adds a delay to a timeline of vibrations', function () {
            var timeline = setUp1();

            Moment._add_transition = function (
                pin,
                start,
                end,
                func,
                duration,
                position,
                delay
              ) {
                  assert.ok(pin == 2 || pin == 3);

                  if (pin == 2) {
                      assert.equal(start, 25);
                      assert.equal(end, 75);
                      assert.equal(func, 8);
                      assert.equal(duration, 400);
                      assert.equal(position, 200);
                      assert.equal(delay, 600);
                  }
                  else {
                      assert.equal(start, 50);
                      assert.equal(end, 100);
                      assert.equal(func, 9);
                      assert.equal(duration, 800);
                      assert.equal(position, 100);
                      assert.equal(delay, 900);
                  }
            }

            timeline.addDelay(500);

            timeline.start();
        });
    });

});
