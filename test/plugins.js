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
    events = require('../src/plugins');


describe('Moment plugins', function () {
    describe('#extend()', function () {
        it('should add a plugin to the Moment namespace', function () {
            var init = false,
                remove = false,
                event = false;

            Moment.extend('test', {
                init: function () { init = true; },
                remove: function () {remove = true; },
                events: {
                  'testevt': function() { event = true; }
                }
            });

            assert.ok(init);
            assert.ok(!remove);
            assert.ok(!event);

            Moment.trigger('testevt');

            assert.ok(event);

            Moment.remove('test');
            assert.ok(remove);
        });
    });
});
