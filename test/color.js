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

var assert = require('assert'),
    init = require('../src/_init'),
    color = require('../src/color');


describe('Moment colors', function () {
    describe('#Color()', function () {
        it('create objects using constructor function', function () {
            var newColor = new Moment.Color(12, 34, 56);
            assert.equal(newColor.red, 12);
            assert.equal(newColor.green, 34);
            assert.equal(newColor.blue, 56);
        });

        it('properly applies min/max rules', function () {
            var newColor = new Moment.Color(-5, 280, 100);
            assert.equal(newColor.red, 0);
            assert.equal(newColor.green, 255);
            assert.equal(newColor.blue, 100);
        });
    });

    describe('#intensify()', function () {
        it('intensifies the color by a multiplying factor', function () {
            var newColor = new Moment.Color(100, 120, 140);
            newColor.intensify(0.5);

            assert.equal(newColor.red, 50);
            assert.equal(newColor.green, 60);
            assert.equal(newColor.blue, 70);
        });
    });

    describe('#clone()', function () {
        it('clones a color object', function () {
            var redder = Moment.Color.RED.clone().intensify(1.2);
            assert.ok(redder != Moment.Color.RED);
        });
    });

    describe('#blend()', function () {
        it('blends two colors together', function () {
            var newColor = new Moment.Color(100, 120, 140);

            var newColor2 = new Moment.Color(20, 30, 40);
            newColor.blend(newColor2, 0.5);

            assert.equal(newColor.red, 60);
            assert.equal(newColor.green, 75);
            assert.equal(newColor.blue, 90);
        });
    });

    describe('color presets', function() {
        it('must contain valid color values', function () {
            // checks that the color values are within range
            function checkColor(c) {
                assert.ok(c.red <= 255);
                assert.ok(c.red >= 0);
                assert.ok(c.green <= 255);
                assert.ok(c.green >= 0);
                assert.ok(c.blue <= 255);
                assert.ok(c.blue >= 0);
            }

            // check that all the preset colors exist
            checkColor(Moment.Color.ORANGE);
            checkColor(Moment.Color.RED);
            checkColor(Moment.Color.PINK);
            checkColor(Moment.Color.GREEN);
            checkColor(Moment.Color.BLUE);
            checkColor(Moment.Color.BLACK);
            checkColor(Moment.Color.GRAY);
            checkColor(Moment.Color.WHITE);
        });
    });
});
