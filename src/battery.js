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

// local variable reference to global `Moment` object
var Moment = Function('return this')()['Moment'];

/** Namespace for functions enabling Battery control.
  * @namespace
  * @name Moment.Battery
  */
var Battery = {};

/** Check if the battery is currently charging
  *
  * @memberof Moment.Battery
  * @name Moment.Battery.isCharging
  * @method
  * @returns {Boolean} Whether or not the battery is charging
  *
  * @example
  * var charging = Moment.Battery.isCharging();
  * if (charging) {
  *     // red LED color if battery is charging
  *     Moment.LED.setColor(Moment.Color.RED);
  * }
  * else {
  *     // otherwise green LED color
  *     Moment.LED.setColor(Moment.Color.GREEN);
  * }
  */
Battery['isCharging'] = function () {
    return Moment['_is_battery_charging']();
};

/** Check if the battery charger is connected.
  *
  * @memberof Moment.Battery
  * @name Moment.Battery.isConnected
  * @method
  * @returns {Boolean} Whether or not the charger is connected
  *
  * @example
  * var connected = Moment.Battery.isConnected();
  * if (connected) {
  *     // orange LED color if charger is connected
  *     Moment.LED.setColor(Moment.Color.ORANGE);
  * }
  * else {
  *     // otherwise blue LED color
  *     Moment.LED.setColor(Moment.Color.BLUE);
  * }
  */
Battery['isConnected'] = function () {
    return Moment['_is_charger_connected']();
};

/** Get the current charge level of the battery.
  *
  * @memberof Moment.Battery
  * @name Moment.Battery.getCharge
  * @method
  * @returns {Number} The remaining battery charge in percent (0-100)
  *
  * @example
  * var charge = Moment.Battery.getCharge();
  * if (charge < 25) {
  *     // set red LED color when battery charge drops below 25%
  *     Moment.LED.setColor(Moment.Color.RED);
  * }
  */
Battery['getCharge'] = function () {
    return Moment['_get_battery_charge']();
};

Moment['Battery'] = Battery;

})();
