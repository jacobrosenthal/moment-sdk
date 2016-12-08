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

/** Moment global object initialization.
  */
if (global) {
	global.window = global;
}

(function () {

var Moment = window['Moment'] = window['Moment'] || {};

/** A map of event ID's to arrays of event handlers.
  */
var handlers = {};

/** Attach an event handler to a specific event ID to execute when the event
  * is triggered.
  */
Moment['on'] = function (event, fn) {
	if (handlers.hasOwnProperty(event)) { // if event handlers exist for ID
		handlers[event].push(fn); // append to array of event handlers
	}
	else {
		handlers[event] = [fn]; // initialize an array to store event handlers
	}
}

/** Remove an event handler from a specific event ID to avoid execution when
  * the event is triggered.
  */
Moment['off'] = function (event, fn) {
	var funcs, // stores the array of attached event handlers
		index; // stores the index of the function to remove

	if (handlers.hasOwnProperty(event)) { // if event handlers exist for ID
		funcs = handlers[event];
		index = funcs.indexOf(fn);

		if (index >= 0) {
			funcs.splice(index, 1); // remove the event handler
		}
	}
}

/** Attach an event handler to a specific event ID to only be executed once -
  * the next trigger of the event - and subsequently removed before it can
  * be executed again.
  */
Moment['once'] = function (event, fn) {
	// create a function that removes the attached event after trigger
	function newFunc() {
		fn();
		Moment['off'](event, newFunc);
	}

	Moment['on'](event, newFunc);
}

/** Trigger the event with a particular ID - begin execution of all attached
  * handlers for the event.
  */
Moment['trigger'] = function (event) {
	var funcs,
		index,
		len;

	if (handlers.hasOwnProperty(event)) {
		funcs = handlers[event];
		len = funcs.length;

		for (index = 0; index < len; index += 1) {
			funcs[index]();
		}
	}
}

})();
