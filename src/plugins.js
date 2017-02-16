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

// global map of all installed plugins
var plugins = {};

/** Provides an constructor to encapsulate plugins within the SDK.
  *
  * @constructor
  * @name Plugin
  * @param {Object} plugin - The methods for the plugin
  */
function Plugin(plugin) {
    for (var key in plugin) {
        if (plugin.hasOwnProperty(key)) {
            this[key] = plugin[key];
        }
    }

    this._init();
}

/** Extends the global Moment namespace with additional functionality that can
  * be easily enabled, disabled, or removed later.
  *
  * @method
  * @memberof Moment
  * @name Moment.extend
  * @static
  *
  * @param {String} name - The name of the plugin
  * @param {Object} plugin - The methods for the plugin
  *
  * @example
  * // structure for implementing a meditation timer plugin
  * Moment.extend('meditate', {
  *     init: function () {
  *         this.interval = Moment.setInterval(5000, function () {
  *             // create haptic patterns every 5 seconds
  *         });
  *     },
  *
  *     remove: function () {
  *         Moment.clearInterval(this.interval);
  *     },
  *
  *     // events to attach to the Moment global
  *     events: {
  *         'accelerometer': function () {
  *             var data = Moment.Accelerometer;
  *             Moment._log(data.x + "," + data.y + "," + data.z);
  *             // implement some accelerometer logic here e.g. if values exceed threshold
  *         },
  *         'timertick': function () {
  *             var time = Moment.uptime();
  *             // implement something to change the haptic feedback based on the time
  *         }
  *     }
  * });
  */
Moment['extend'] = function(name, plugin) {
    plugins[name] = new Plugin(plugin);
};

/** Removes a plugin that was previously installed using `Moment.extend()`.
  * This function permanently removes the plugin, and the plugin must be fully
  * re-initialized using `Moment.extend()` to be reinstalled.
  *
  * @method
  * @memberof Moment
  * @name Moment.remove
  * @static
  *
  * @param {String} name - The name of the plugin to remove
  *
  * @example
  * // remove the "meditate" plugin
  * Moment.remove('meditate');
  */
Moment['remove'] = function(name) {
    plugins[name]._remove();
    delete plugins[name];
}


Plugin['prototype']['init'] = function () {};
Plugin['prototype']['remove'] = function () {};
Plugin['prototype']['events'] = {};

Plugin['prototype']._init = function () {
    this['init']();
    var events = this['events'];

    for (var key in events) {
        Moment['on'](key, events[key]);
    }
}

Plugin['prototype']._remove = function () {
    this['remove']();
    var events = this['events'];

    for (var key in events) {
        Moment['off'](key, events[key]);
    }
}

})();
