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
    haptics = require('../src/battery');

describe('Moment battery', function () {

    describe('#isCharging', function () {
        it('checks if the battery is currently charging', function () {
            var charging = true;

            // ensure that the underlying JS API controls the return value
            Moment._is_battery_charging = function () {
                return charging;
            };

            assert.equal(Moment.Battery.isCharging(), charging);

            charging = false;

            assert.equal(Moment.Battery.isCharging(), charging);
        });
    });

    describe('#isConnected', function () {
        it('checks if the charger is currently connected', function () {
            var connected = true;

            // ensure that the underlying JS API controls the return value
            Moment._is_charger_connected = function () {
                return connected;
            };

            assert.equal(Moment.Battery.isConnected(), connected);

            connected = false;

            assert.equal(Moment.Battery.isConnected(), connected);
        });
    });

    describe('#getCharge', function () {
        it('checks the current amount of battery charge', function () {
            var charge = 60;

            // ensure that the underlying JS API controls the return value
            Moment._get_battery_charge = function () {
                return charge;
            };

            assert.equal(Moment.Battery.getCharge(), charge);

            charging = 80;

            assert.equal(Moment.Battery.getCharge(), charge);
        });
    });
});
