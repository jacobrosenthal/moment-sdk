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

var Moment = window['Moment'] = window['Moment'] || {};

Moment._eventHandlers = {};

Moment['on'] = function (event, fn) {
	var handlers = Moment._eventHandlers;

	if (handlers.hasOwnProperty(event)) {
		handlers[event].push(fn);
	}
	else {
		handlers[event] = [fn];
	}
}

Moment['off'] = function (event, fn) {
	var handlers = Moment._eventHandlers,
		e,
		i;

	if (handlers.hasOwnProperty(event)) {
		e = handlers[event];
		i = e.indexOf(fn);
		if (i >= 0) {
			e.splice(i, 1);
		}
	}
}

Moment['once'] = function (event, fn) {
	function newFunc() {
		fn();
		Moment['off'](event, newFunc);
	}

	Moment['on'](event, newFunc);
}

Moment['trigger'] = function (event) {
	var handlers = Moment._eventHandlers,
		e,
		i,
		len;

	if (handlers.hasOwnProperty(event)) {
		e = handlers[event];
		len = e.length;

		for (i = 0; i < len; i += 1) {
			e[i]();
		}
	}
}
