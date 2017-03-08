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

/** Represents a notification from a connected and paired iPhone or Android
  * device. Due to the way the Apple Notification Center Service is structured,
  * the `notification` event that is fired when a new notification appears on
  * the connected phone does not provide all of the attributes for the
  * notification. Instead, you will receive a category (e.g. Incoming Call),
  * an event (e.g. Added/Modified/Removed), and a unique identifier for the
  * notification that allows you to request the additional attributes if
  * needed. The additional attributes include the Title, Subtitle, and App
  * Identifier that produced the notification.
  *
  * Typically, you will not use the constructor for this class. The class
  * will be instantiated internally, and you will interact with `Notification`
  * objects in response to the relevant events that are triggered.
  *
  * @constructor
  * @memberof Moment
  * @name Moment.Notification
  *
  * @param {Number} uid - A unique integer identifier for the notification
  * @param {String} category - Notification category (e.g. Missed Call)
  * @param {String} event - The event (`added`, `modified`, or `removed`)
  */
function Notification(uid, category, event) {
    this.uid = uid;
    this.category = category;
    this.event = event;
}

/** Requests additional information about the notification from the phone,
  * including the title, subtitle, and app identifier for the notification.
  * This information is not automatically provided for all notifications to
  * reduce latency, and this function call results in additional BLE packets
  * sent and received each time it is called - use it sparingly.
  *
  * Since the function asynchronously executes the relevant BLE operations to
  * fetch the notification attributes from the phone, you can provide callback
  * functions that will execute when the operation completes successfully or
  * fails.
  */
Notification['prototype']['getAttrs'] = function (success, error) {
    Moment['_request_attrs'](this.uid, success.bind(this), error.bind(this));
};

/* Note that this file is intentionally very short - most of the notification
   implementation is handled in lower-level firmware code that implements
   the proprietary Apple Notification Center Service via Bluetooth Low Energy.
   */

Moment['Notification'] = Notification;

})();
