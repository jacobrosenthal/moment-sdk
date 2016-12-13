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

/** Provides the prototype for a 3-axis measurement object.
  *
  * @constructor
  */
function ThreeAxis(type) {
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
Moment['Accelerometer'] = new ThreeAxis();

/** This event is fired every time a reading from the accelerometer is obtained.
  * The appropriate x, y, and z axis values are provided to the event handler.
  *
  * @event Moment.Accelerometer.accelerometer
  * @memberof Moment.Accelerometer
  * @type {Object}
  * @property {Number} x - The x-axis reading value
  * @property {Number} y - The y-axis reading value
  * @property {Number} z - The z-axis reading value
  *
  * @example
  * Moment.on("accelerometer", function () {
  *     // replace doSomething with your own code
  *     doSomething(Moment.Accelerometer.x); // x-axis value
  *     doSomething(Moment.Accelerometer.y); // y-axis value
  *     doSomething(Moment.Accelerometer.z); // z-axis value
  * });
 */

/** The x-axis measurement from the accelerometer.
  *
  * @name Moment.Accelerometer.x
  * @type {Number}
  * @memberof Moment.Accelerometer
  */

/** The y-axis measurement from the accelerometer.
  *
  * @name Moment.Accelerometer.y
  * @type {Number}
  * @memberof Moment.Accelerometer
  */

/** The z-axis measurement from the accelerometer.
  *
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
Moment['Gyroscope'] = new ThreeAxis();

/** This event is fired every time a reading from the gyroscope is obtained.
  * The appropriate x, y, and z axis values are provided to the event handler.
  *
  * @event Moment.Gyroscope.gyroscope
  * @memberof Moment.Gyroscope
  * @type {Object}
  * @property {Number} x - The x-axis reading value
  * @property {Number} y - The y-axis reading value
  * @property {Number} z - The z-axis reading value
  *
  * @example
  * Moment.on("gyroscope", function () {
  *     // replace doSomething with your own code
  *     doSomething(Moment.Gyroscope.x); // x-axis value
  *     doSomething(Moment.Gyroscope.y); // y-axis value
  *     doSomething(Moment.Gyroscope.z); // z-axis value
  * });
 */

/** The x-axis measurement from the gyroscope.
  *
  * @name Moment.Gyroscope.x
  * @type {Number}
  * @memberof Moment.Gyroscope
  */

/** The y-axis measurement from the gyroscope.
  *
  * @name Moment.Gyroscope.y
  * @type {Number}
  * @memberof Moment.Gyroscope
  */

/** The z-axis measurement from the gyroscope.
  *
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
Moment['Magnetometer'] = new ThreeAxis();

/** This event is fired every time a reading from the magnetometer is obtained.
  * The appropriate x, y, and z axis values are provided to the event handler.
  *
  * @event Moment.Magnetometer.magnetometer
  * @memberof Moment.Magnetometer
  * @type {Object}
  * @property {Number} x - The x-axis reading value
  * @property {Number} y - The y-axis reading value
  * @property {Number} z - The z-axis reading value
  *
  * @example
  * Moment.on("magnetometer", function () {
  *     // replace doSomething with your own code
  *     doSomething(Moment.Magnetometer.x); // x-axis value
  *     doSomething(Moment.Magnetometer.y); // y-axis value
  *     doSomething(Moment.Magnetometer.z); // z-axis value
  * });
 */

/** The x-axis measurement from the magnetometer.
  *
  * @name Moment.Magnetometer.x
  * @type {Number}
  * @memberof Moment.Magnetometer
  */

/** The y-axis measurement from the magnetometer.
  *
  * @name Moment.Magnetometer.y
  * @type {Number}
  * @memberof Moment.Magnetometer
  */

/** The z-axis measurement from the magnetometer.
  *
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
Moment['AHRS'] = new ThreeAxis();

/** This event is fired every time a reading from the inertial measurement unit
  * is processed using an AHRS algorithm to provide a more accurate orientation
  * measurement. The processed orientation measurement is provided to the event
  * handler as an object.
  *
  * @event Moment.AHRS.ahrs
  * @memberof Moment.AHRS
  * @type {Object}
  * @property {Number} x - The x-axis reading value
  * @property {Number} y - The y-axis reading value
  * @property {Number} z - The z-axis reading value
  *
  * @example
  * Moment.on("ahrs", function () {
  *     // replace doSomething with your own code
  *     doSomething(Moment.AHRS.x); // x-axis value
  *     doSomething(Moment.AHRS.y); // y-axis value
  *     doSomething(Moment.AHRS.z); // z-axis value
  * });
 */

/** The x-axis measurement obtained from processed IMU data.
  *
  * @name Moment.AHRS.x
  * @type {Number}
  * @memberof Moment.AHRS
  */

/** The y-axis measurement obtained from processed IMU data.
  *
  * @name Moment.AHRS.y
  * @type {Number}
  * @memberof Moment.AHRS
  */

/** The z-axis measurement obtained from processed IMU data.
  *
  * @name Moment.AHRS.z
  * @type {Number}
  * @memberof Moment.AHRS
  */

})();
