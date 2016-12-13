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

function Timer(fn, timeout) {
    this.fn = fn;
    this.timeout = timeout;
}

var timeouts = [];
var intervals = [];

Moment['setTimeout'] = function (fn, timeout) {
    timeout += Moment.uptime();

    var t = new Timer(fn, timeout),
        i = 0,
        len = timeouts.length;

    while (i < len && timeouts[i].timeout <= t.timeout) {
        i += 1;
    }

    timeouts.splice(i, 0, t);

    return t;
};

Moment['setInterval'] = function (fn, timeout) {
    var t = new Timer(fn, timeout),
        i = 0,
        len = intervals.length;
    t.next = Moment.uptime() + timeout;

    while (i < len && intervals[i].next <= t.next) {
        i += 1;
    }

    intervals.splice(i, 0, t);

    return t;
};

Moment['clearTimeout'] = function (t) {
    var i = 0, len = timeouts.length;

    for (i = 0; i < len; i += 1) {
        if (timeouts[i] == t) {
            timeouts.splice(i, 1);
            break;
        }
    }
};

Moment['clearInterval'] = function (t) {
    var i = 0, len = intervals.length;

    for (i = 0; i < len; i += 1) {
        if (intervals[i] == t) {
            intervals.splice(i, 1);
            break;
        }
    }
};

Moment['_run_timers'] = function () {
    var i,
        k,
        len,
        m,
        t;

    m = Moment['uptime']();

    for (i = 0, len = timeouts.length; i < len; i += 1) {
        if (m > timeouts[i].timeout) {
            timeouts[i].fn();
        }
        else {
            break;
        }
    }

    timeouts.splice(0, i);

    for (i = 0, len = intervals.length; i < len; i += 1) {
        if (m > intervals[i].next) {
            t = intervals[i];
            t.fn();
            t.next = m + t.timeout;

            j = i;

            while (j < len && intervals[i].next <= t.next) {
                j += 1;
            }

            intervals.splice(i, 1);
            intervals.splice(j, 0, t);
        }
        else {
            break;
        }
    }
};

/** This function returns the number of milliseconds during which the device
  * has been turned on. It is the basis for most other timer features in the
  * Moment SDK.
  *
  * @function
  * @name Moment.uptime
  * @memberof Moment
  * @method
  * @static
  * @returns {Number} Milliseconds since device was turned on
  */

/** This event is fired every time the timer is incremented - typically, the
  * timer is incremented every 10ms, providing resolution to a hundredth of a
  * second, but all timer-related API's (including the `Moment.uptime()`
  * function) make use of millisecond values in the API calls. In a future
  * firmware update, the precision of the timer may be increased to 10ms.
  *
  * @event Moment.timertick
  * @memberof Moment
  */

})();
