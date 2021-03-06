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
    actuators = require('../src/actuators');

describe('Moment actuators', function () {

    describe('#Actuators', function () {
        it('four actuators present', function () {
            // top left actuator exists in object
            assert.ok(Moment.Actuators.hasOwnProperty("topLeft"));

            // top right actuator exists in object
            assert.ok(Moment.Actuators.hasOwnProperty("topRight"));

            // bottom left actuator exists in object
            assert.ok(Moment.Actuators.hasOwnProperty("bottomLeft"));

            // bottom right actuator exists in object
            assert.ok(Moment.Actuators.hasOwnProperty("bottomRight"));
        });
    });

});
