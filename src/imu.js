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

function ThreeAxis(type) {
    this.type = type;
    this.update = Moment["_update_" + type];
}

ThreeAxis['prototype']['x'] = 0;
ThreeAxis['prototype']['y'] = 0;
ThreeAxis['prototype']['z'] = 0;

// ACCELEROMETER

/** Interface for accessing accelerometer data.
  *
  * @memberof Moment
  * @public
  * @namespace
  * @name Moment.Accelerometer
  */
Moment['Accelerometer'] = new ThreeAxis("accelerometer");

/** Obtain the latest reading from the accelerometer for the x, y, and z axes.
  *
  * @function
  * @name Moment.Accelerometer.update
  * @returns {Object} An object containing the x, y, and z acceleration values
  */

/** The x-axis measurement from the accelerometer.
  *
  * @property
  * @name Moment.Accelerometer.x
  * @type {Number}
  * @memberof Moment.Accelerometer
  */

/** The y-axis measurement from the accelerometer.
  *
  * @property
  * @name Moment.Accelerometer.y
  * @type {Number}
  * @memberof Moment.Accelerometer
  */

/** The z-axis measurement from the accelerometer.
  *
  * @property
  * @name Moment.Accelerometer.z
  * @type {Number}
  * @memberof Moment.Accelerometer
  */

// GYROSCOPE

/** Interface for accessing gyroscope data.
  *
  * @memberof Moment
  * @public
  * @namespace
  * @name Moment.Gyroscope
  */
Moment['Gyroscope'] = new ThreeAxis("gyroscope");

/** The x-axis measurement from the gyroscope.
  *
  * @property
  * @name Moment.Gyroscope.x
  * @type {Number}
  * @memberof Moment.Gyroscope
  */

/** The y-axis measurement from the gyroscope.
  *
  * @property
  * @name Moment.Gyroscope.y
  * @type {Number}
  * @memberof Moment.Gyroscope
  */

/** The z-axis measurement from the gyroscope.
  *
  * @property
  * @name Moment.Gyroscope.z
  * @type {Number}
  * @memberof Moment.Gyroscope
  */

/** Interface for accessing magnetometer data.
  *
  * @memberof Moment
  * @public
  * @namespace
  * @name Moment.Magnetometer
  */
Moment['Magnetometer'] = new ThreeAxis("magnetometer");

/** The x-axis measurement from the magnetometer.
  *
  * @property
  * @name Moment.Magnetometer.x
  * @type {Number}
  * @memberof Moment.Magnetometer
  */

/** The y-axis measurement from the magnetometer.
  *
  * @property
  * @name Moment.Magnetometer.y
  * @type {Number}
  * @memberof Moment.Magnetometer
  */

/** The z-axis measurement from the magnetometer.
  *
  * @property
  * @name Moment.Magnetometer.z
  * @type {Number}
  * @memberof Moment.Magnetometer
  */

/** Interface for accessing processed AHRS position data.
  *
  * @memberof Moment
  * @public
  * @namespace
  * @name Moment.AHRS
  */
Moment['AHRS'] = new ThreeAxis("ahrs");

/** The x-axis measurement obtained from processed IMU data.
  *
  * @property
  * @name Moment.AHRS.x
  * @type {Number}
  * @memberof Moment.AHRS
  */

/** The y-axis measurement obtained from processed IMU data.
  *
  * @property
  * @name Moment.AHRS.y
  * @type {Number}
  * @memberof Moment.AHRS
  */

/** The z-axis measurement obtained from processed IMU data.
  *
  * @property
  * @name Moment.AHRS.z
  * @type {Number}
  * @memberof Moment.AHRS
  */

})();
