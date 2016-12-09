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

(function () {

var Moment = Function('return this')()['Moment'];

/** Namespace for functions enabling Battery control.
  * @namespace
  * @name Moment.LED
  */
var Battery = {};

/** Check if the battery is currently charging
  *
  * @memberof Moment.Battery
  * @name Moment.Battery.isCharging
  * @method
  */
Battery['isCharging'] = function () {
    return Moment['_is_battery_charging']();
};

/** Check if the battery charger is connected.
  *
  * @memberof Moment.Battery
  * @name Moment.Battery.isConnected
  * @method
  */
Battery['isConnected'] = function () {
    return Moment['_is_charger_connected']();
};

/** Get the current charge level of the battery.
  *
  * @memberof Moment.Battery
  * @name Moment.Battery.getCharge
  * @method
  */
Battery['getCharge'] = function () {
    return Moment['_get_battery_charge']();
};

Moment['Battery'] = Battery;

})();
