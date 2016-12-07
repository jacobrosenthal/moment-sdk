var gulp = require('gulp'),
    closureCompiler = require('google-closure-compiler').gulp();

gulp.task('compile', function () {
    return gulp.src('./src/**/*.js', {base: './'})
        .pipe(closureCompiler({
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'environment.js'
        }))
        .pipe(gulp.dest('./dist'));
});
