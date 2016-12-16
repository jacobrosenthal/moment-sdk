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
    timeout = require('../src/timeout');


describe('Moment timeout', function () {
    describe('#setTimeout', function () {
        it('should attach a callback for future execution', function () {
            Moment.uptime = function () { return 0; };
            assert.ok(Moment.setTimeout);
            var val = false;
            Moment.setTimeout(function () { val = true; }, 1000);
            Moment.uptime = function () { return 1500; };
            Moment._run_timers();
            assert.ok(val);
        });
    });

    describe('#setInterval', function () {
        it('should attach a callback for interval execution', function () {
            Moment.uptime = function () { return 0; };
            assert.ok(Moment.setInterval);
            var val = false;
            Moment.setInterval(function () { val = true; }, 500);
            Moment.uptime = function () { return 501; };
            Moment._run_timers();
            assert.ok(val);
            val = false;
            Moment.uptime = function () { return 1501; };
            Moment._run_timers();
            assert.ok(val);
        });
    });

    describe('#clearTimeout', function () {
        it('should clear a callback from future execution', function () {
            Moment.uptime = function () { return 0; };
            assert.ok(Moment.setTimeout);
            var val = true;
            var t = Moment.setTimeout(function () { val = false; }, 1000);
            Moment.uptime = function () { return 1500; };
            Moment.clearTimeout(t);
            Moment._run_timers();
            assert.ok(val);
        });
    });

    describe('#clearInterval', function () {
        it('should clear a callback from interval execution', function () {
            Moment.uptime = function () { return 0; };
            assert.ok(Moment.setInterval);
            var val = true;
            var t = Moment.setInterval(function () { val = false; }, 500);
            Moment.uptime = function () { return 501; };
            Moment.clearInterval(t);
            Moment._run_timers();
            assert.ok(val);
        });
    });
});
