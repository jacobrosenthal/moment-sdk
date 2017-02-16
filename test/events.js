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
    events = require('../src/events');


describe('Moment events', function () {
    describe('#on()', function () {
        it('should attach event handler to event map object', function () {
            var triggered = false;
            Moment.on('test', function () {
                triggered = true;
            });

            Moment.trigger('test');

            assert.equal(triggered, true);
        });

        it('attaches more than one handler to a single event', function () {
            var count = 0;

            Moment.on('testct', function () {
                count++;
            });

            Moment.on('testct', function () {
                count += 3;
            });

            Moment.trigger('testct');

            assert.equal(count, 4);

            for (var i = 0; i < 10; i++) {
                Moment.trigger('testct');
                assert.equal(count, (i + 2) * 4);
            }
        })
    });

    describe('#off()', function () {
        it('should detach event handler from event map object', function () {
            var triggered = false;
            function testfn() {
                triggered = true;
            }

            Moment.on('test', testfn);

            Moment.off('test', testfn)

            Moment.trigger('test');

            assert.equal(triggered, false);
        });
    });

    describe('#trigger()', function () {
        it('should trigger event handler to event map object', function () {
            var triggered = false;
            Moment.on('test-2', function () {
                triggered = true;
            });

            Moment.trigger('test');

            assert.equal(triggered, false);

            Moment.trigger('test-2');

            assert.equal(triggered, true);
        });
    });

    describe('#once()', function () {
        it('should attach event handler that only executes once', function () {
            var count = 0;

            Moment.once('test-3', function () {
                count++;
            });

            Moment.trigger('test-3');
            Moment.trigger('test-3');
            Moment.trigger('test-3');

            assert.equal(count, 1);
        });
    });
});
