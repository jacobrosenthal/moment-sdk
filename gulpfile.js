var gulp = require('gulp'),
    closureCompiler = require('google-closure-compiler').gulp();

gulp.task('compile', function () {
  return closureCompiler([
        '--js', './src/_init.js',
        '--js', './src/events.js',
        '--js', './src/timeout.js',
        '--js', './src/easing.js',
        '--js', './src/plugins.js',
        '--module', 'init:5',
        '--js', './src/color.js',
        '--js', './src/led.js',
        '--module', 'led:2:init',
        '--js', './src/actuators.js',
        '--js', './src/haptics.js',
        '--js', './src/timeline.js',
        '--js', './src/plot.js',
        '--module', 'haptics:4:init',
        '--js', './src/battery.js',
        '--js', './src/imu.js',
        '--module', 'device:2:init',
        '--language_in', 'ECMASCRIPT6_STRICT',
        '--language_out', 'ECMASCRIPT5_STRICT',
        '--warning_level', 'VERBOSE',
        '--output_wrapper', '(function(){\n%output%\n}).call(this)',
        '--compilation_level', 'ADVANCED',
        '--js_output_file', 'environment.js'
      ])
      .src() // needed to force the plugin to run without gulp.src
      .pipe(gulp.dest('./dist'));
});
