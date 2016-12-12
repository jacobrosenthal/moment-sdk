# Moment Software Development Kit

[![AUR](https://img.shields.io/aur/license/yaourt.svg)](https://github.com/SomaticLabs/moment-sdk/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/SomaticLabs/moment-sdk.svg?branch=master)](https://travis-ci.org/SomaticLabs/moment-sdk)

## Introduction

This repository contains the Software Development Kit (SDK) for Moment, the
wearable device that communicates entirely through your sense of touch.

For more information about Moment, visit [https://wearmoment.com/](https://wearmoment.com/)

This SDK contains the code that is executed on the Moment devices inside of
a custom JavaScript runtime environment. To simplify the process of creating
custom embedded software for Moment, we provide several ready-to-use functions
for creating event callbacks, transitioning the LED color, and creating rich
haptic effects.

### Repository

The repository for the SDK can be found at [https://github.com/SomaticLabs/moment-sdk](https://github.com/SomaticLabs/moment-sdk)

### Documentation

You can browse the documentation at [https://somaticlabs.github.io/moment-sdk/](https://somaticlabs.github.io/moment-sdk/)

## Installing Dependencies

To develop on the Moment SDK, you will need to install some dependencies first.
The following instructions assume you have some familiarity with your terminal.

### Step 0: Clone Repository

Clone the repository:

    git clone git@github.com:SomaticLabs/moment-sdk.git

Change the working directory:

    cd moment-sdk

### Step 1: Install NPM

Follow the instructions on [https://www.npmjs.com/](https://www.npmjs.com/) to install NPM for your
operating system.

### Step 2: Install Gulp

Our build system uses the Gulp package to manage JavaScript compilation and
documentation generation. You will need a global installation of gulp, which
you can obtain by entering the following command into your terminal:

    npm install -g gulp

### Step 4: Ensure Java is Available

Make sure you have the Java runtime (JRE) installed. We use the `java` command
as part of the build process.

### Step 5: Install NPM Dependencies

For the rest of our build system, you can install all the necessary software by
entering the following command into your terminal:

    npm install

## Namespacing

All features of the SDK are contained within the [`Moment` namespace](https://somaticlabs.github.io/moment-sdk/Moment.html). This is a
global object that contains submodules of functionality in their own individual
namespaces. This is the only global variable exposed by the SDK, and is the
only global variable you must avoid reassigning. However, we recommend using
[a self-invoking function](https://stackoverflow.com/questions/592396/what-is-the-purpose-of-a-self-executing-function-in-javascript) for all of
your code to avoid polluting the global namespace.

## Typical Development Workflow

### Creating and Running Tests

Unit tests are run using [Mocha](https://www.npmjs.com/package/mocha), and
all test files are in the `test/` folder. Running tests is easy:

    npm test

To create new tests, you will do one of the following:

1. Create a new test module in a separate file
2. Add a unit test to an existing module

If your changes involve several new classes and functions, you may want to
create a new file; however, we prefer adding unit tests to existing test files
under most circumstances.

### Generating Documentation

Documentation is generated using [JSDoc](http://usejsdoc.org/), and all
additions to the Moment SDK must be documented using inline comments.
To generate documentation for your code, simply run the following command:

    npm run generate-docs

### Compiling with Closure Compiler

The last step before the SDK code can be used onboard Moment is compilation
using the
[Google Closure Compiler](https://github.com/google/closure-compiler/).
The Closure Compiler is configured to use all of itsadvanced optimizations,
and will also enforce several code style rules to allow for aggressive size
reduction and optimization. To compile the JavaScript source for the SDK, run the following command:

    npm run compile

### Pull Requests and Issues

We invite anyone to open an issue for feature requests, bugs, and questions.
Likewise, you are welcome to fork the code as long as you respect the GNU General Public License. If you wish to create a pull request on the main repository, we may require you to sign a contributor's agreement - your code will still be made available under the GPL, but Somatic Labs requires all direct contributions to be licensed back to our company (it makes our lawyers happy).

## License
Copyright (c) 2016 Somatic Labs. All Rights Reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

The information contained herein is property of Somatic Technologies, Inc.
