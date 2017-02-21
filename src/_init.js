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

(function (global) {

/**
  * Moment namespace for SDK functions. Avoid modifying the global `Moment`
  * object directly. Instead, opt to use `Moment.extend()` to create plugins
  * that extend the functionality of the device through custom events and
  * methods that can be quickly enabled and disabled. All SDK functions are
  * part of the `Moment` global object to avoid polluting the global namespace
  * and reduce the possibility of an unintentional conflict in variable names.
  *
  * @global
  * @name Moment
  * @namespace
  */
global['Moment'] = global['Moment'] || {};

})(Function('return this')());
