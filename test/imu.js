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
    imu = require('../src/imu');


describe('Moment IMU', function () {
    describe('#Accelerometer', function () {
        it('should exist with 3-axis measurements', function () {
            assert.ok(Moment.Accelerometer);
            assert.equal(Moment.Accelerometer.x, 0);
            assert.equal(Moment.Accelerometer.y, 0);
            assert.equal(Moment.Accelerometer.z, 0);
        });
    });
    describe('#Gyroscope', function () {
        it('should exist with 3-axis measurements', function () {
            assert.ok(Moment.Gyroscope);
            assert.equal(Moment.Gyroscope.x, 0);
            assert.equal(Moment.Gyroscope.y, 0);
            assert.equal(Moment.Gyroscope.z, 0);
        });
    });
    describe('#Magnetometer', function () {
        it('should exist with 3-axis measurements', function () {
            assert.ok(Moment.Magnetometer);
            assert.equal(Moment.Magnetometer.x, 0);
            assert.equal(Moment.Magnetometer.y, 0);
            assert.equal(Moment.Magnetometer.z, 0);
        });
    });
    describe('#AHRS', function () {
        it('should exist with 3-axis measurements', function () {
            assert.ok(Moment.AHRS);
            assert.equal(Moment.AHRS.x, 0);
            assert.equal(Moment.AHRS.y, 0);
            assert.equal(Moment.AHRS.z, 0);
        });
    });
});
