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

/** Represents a sequence of vibrations arranged in a timeline that can be
  * evaluated by the firmware.
  *
  * @constructor
  * @name Moment.Timeline
  * @memberof Moment
  *
  * @param {Array} vibrations - The sequence of vibrations to place in timeline
  */
function Timeline(vibrations) {
    this.vibrations = vibrations;
}

var inheritsChain = [
    'push',
    'splice'
];

var inheritsNew = {
    'slice',
    'concat'
}

var inheritsResult = [
    'includes'
];

inheritsChain.forEach(function (name) {
    Timeline['prototype'][name] = function () {
        Array['prototype'][name].apply(this.vibrations, arguments);
        return this;
    };
});

inheritsNew.forEach(function (name) {
    Timeline['prototype'][name] = function () {
        var n = Array['prototype'][name].apply(this.vibrations, arguments);
        return new Timeline(n);
    };
});

inheritsResult.forEach(function (name) {
    Timeline['prototype'][name] = function () {
        return Array['prototype'][name].apply(this.vibrations, arguments);
    };
});

Timeline['prototype']['clone'] = function () {
    return this.slice();
};

Timeline['prototype']['start'] = function () {
    var i = 0,
        v = this.vibrations,
        l;

    l = v.length;

    for (i = 0; i < len; i += 1) {
        v[i].start();
    }
};

Moment['Timeline'] = Timeline;

})();
