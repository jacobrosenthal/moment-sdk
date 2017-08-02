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
for creating event callbacks and creating rich haptic effects.

### iPhone and Android
Our iPhone and Android SDK libraries allow you to quickly send code you've
written using the Moment SDK to your Moment device. We require iOS 9+ and
Android 4.3+ for our SDK. You may be able to adjust our libraries to work with
older versions, but we only support newer versions for simplicity and
maintainability.

We are working on improving our documentation. To get started building your
own iPhone or Android app to work with Moment, email developers@somaticlabs.io
and we'll help you begin development!

### Repository

The source code for the SDK is hosted on Github and can be found at [https://github.com/SomaticLabs/moment-sdk](https://github.com/SomaticLabs/moment-sdk)

### Documentation

You can browse the documentation at [https://somaticlabs.github.io/moment-sdk/](https://somaticlabs.github.io/moment-sdk/)

## Extending Moment (beginners)

If you just want to create plugins for Moment that extend the functionality
of the device, you don't need to modify the SDK
code at all. The Moment SDK is built into every Moment device. All you need
to do is create a JavaScript source file that makes use of the public API's
provided by the SDK.

### Step 1: Launch the Moment Simulator
To test your plugins, you can use our
[web-based simulator](https://somaticlabs.github.io/moment-sim) before
deploying to your Moment device. The simulator allows you to visualize haptic
effects and test event handlers you have created for the device.

### Step 2: Implement a Plugin

The `Moment.extend()` function allows you to create a plugin that integrates
with Moment and provides additional functionality to the device in a reusable
and modular fashion. Below, you can find an example of the implementation:

```js
// structure for implementing a meditation timer plugin
Moment.extend('meditate', {
    init: function () {
        this.interval = Moment.setInterval(5000, function () {
            // create haptic patterns every 5 seconds
        });
    },

    remove: function () {
        Moment.clearInterval(this.interval);
    },

    // events to attach to the Moment global
    events: {
        'accelerometer': function () {
            var data = Moment.Accelerometer;
            Moment._log(data.x + "," + data.y + "," + data.z);
            // implement some accelerometer logic here e.g. if values exceed threshold
        },
        'timertick': function () {
            var time = Moment.uptime();
            // implement something to change the haptic feedback based on the time
        }
    }
});
```

### Step 3: Create a Gist on Github

Visit [https://gist.github.com/](https://gist.github.com/) to create a Gist.
A Gist will provide you with a version-controlled pastebin for your Moment
plugin. Once you create a Gist, copy the URL and paste it into the Moment app
as a user script. This will allow you to enable and disable the plugin you've
created from the Moment app.

## Namespacing

All features of the SDK are contained within the [`Moment` namespace](https://somaticlabs.github.io/moment-sdk/Moment.html). This is a
global object that contains submodules of functionality in their own individual
namespaces. This is the only global variable exposed by the SDK, and is the
only global variable you must avoid reassigning. However, we recommend using
[a self-invoking function](https://stackoverflow.com/questions/592396/what-is-the-purpose-of-a-self-executing-function-in-javascript) for all of
your code to avoid polluting the global namespace.

## License
Copyright (c) 2016-2017 Somatic Labs. All Rights Reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

The information contained herein is property of Somatic Technologies, Inc.
