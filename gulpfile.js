var gulp = require('gulp'),
    closureCompiler = require('google-closure-compiler').gulp();

gulp.task('compile', function () {
  return closureCompiler([
        '--js', './src/_init.js',
        '--js', './src/actuators.js',
        '--js', './src/battery.js',
        '--js', './src/color.js',
        '--js', './src/easing.js',
        '--js', './src/events.js',
        '--js', './src/haptics.js',
        '--js', './src/imu.js',
        '--js', './src/led.js',
        '--js', './src/timeline.js',
        '--js', './src/timeout.js',
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
