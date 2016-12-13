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

/** Schedule a callback function to be executed after a certain number of
  * milliseconds. `Moment.setTimeout` will execute the callback a single time,
  * similar to the `window.setTimeout` function available in many JavaScript
  * runtime environments. Although the value for the timeout is set in
  * milliseconds, millisecond-level precision is not always guaranteed. Under
  * most circumstances, the timeout will execute within 10ms of the specified
  * time - software should be designed with the assumption of 10ms precision
  * for timers.
  *
  * @memberof Moment
  * @name Moment.setTimeout
  * @method
  * @static
  *
  * @param {Function} fn - The callback function to execute
  * @param {Number} timeout - The number of milliseconds before execution
  *
  * @example
  * function setOrange() {
  *     // set the LED color to orange
  *     Moment.LED.setColor(Moment.Color.ORANGE);
  * };
  *
  * // turn LED orange after 10 seconds
  * Moment.setTimeout(setOrange, 10000);
  */
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

/** Schedule a callback function to be executed after every elapsed interval of
  * milliseconds. `Moment.setInterval` will execute the callback indefinitely,
  * similar to the `window.setInterval` function available in many JavaScript
  * runtime environments. Although the value for the interval is set in
  * milliseconds, millisecond-level precision is not always guaranteed. Under
  * most circumstances, the interval will execute within 10ms of the specified
  * time - software should be designed with the assumption of 10ms precision
  * for timers.
  *
  * @memberof Moment
  * @name Moment.setInterval
  * @method
  * @static
  *
  * @param {Function} fn - The callback function to execute
  * @param {Number} timeout - The number of milliseconds between executions
  *
  * @example
  * function setOrange() {
  *     // set the LED color to orange
  *     Moment.LED.setColor(Moment.Color.ORANGE);
  * };
  *
  * function turnOff() {
  *     // turn off LED
  *     Moment.LED.setColor(Moment.Color.BLACK);
  * };
  *
  * var on = false;
  * function blink() {
  *     if (on) {
  *         turnOff();
  *     }
  *     else {
  *         setOrange();
  *     }
  * }
  *
  * // blink LED (1 second on, 1 second off)
  * Moment.setInterval(blink, 10000);
  */
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

/** Removes a callback function from the queue of timeouts to be executed
  * `Moment.clearTimeout` will delete the timeout and prevent it from running
  * similar to the `window.clearTimeout` function available in many JavaScript
  * runtime environments.
  *
  * @memberof Moment
  * @name Moment.clearTimeout
  * @method
  * @static
  *
  * @param {Timer} t - The timeout to clear
  *
  * @example
  * // setOrange is from the `Moment.setTimeout` example
  * // turn LED orange after 10 seconds
  * var t = Moment.setTimeout(setOrange, 10000);
  * // prevent timeout from executing
  * Moment.clearTimeout(t);
  */
Moment['clearTimeout'] = function (t) {
    var i = 0, len = timeouts.length;

    for (i = 0; i < len; i += 1) {
        if (timeouts[i] == t) {
            timeouts.splice(i, 1);
            break;
        }
    }
};

/** Removes an interval function from the queue of intervals to be executed
  * `Moment.clearInterval` will delete the interval and prevent it from running
  * similar to the `window.clearInterval` function available in many JavaScript
  * runtime environments.
  *
  * @memberof Moment
  * @name Moment.clearInterval
  * @method
  * @static
  *
  * @param {Timer} t - The interval to clear
  *
  * @example
  * // blink is from the `Moment.setInterval` example
  * // blink LED orange for 1 second on/off intervals
  * var t = Moment.setInterval(blink, 10000);
  * // prevent interval from executing
  * Moment.clearInterval(t);
  */
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
  *
  * @example
  * var ms = Moment.uptime(); // get milliseconds of uptime
  * if (ms > 60000) {
  *     // set LED color to orange after the device is on for a minute
  *     Moment.LED.setColor(Moment.Color.ORANGE);
  * }
  */

/** This event is fired every time the timer is incremented - typically, the
  * timer is incremented every 10ms, providing resolution to a hundredth of a
  * second, but all timer-related API's (including the `Moment.uptime()`
  * function) make use of millisecond values in the API calls. In a future
  * firmware update, the precision of the timer may be increased to 10ms.
  *
  * @event Moment.timertick
  * @memberof Moment
  *
  * @example
  * Moment.on("timertick", function () {
  *     var ms = Moment.uptime();
  *     // do something time-related here
  * });
  */

})();
