// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');

// var changed = require('gulp-changed');

// Concat & minify
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
 
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./source/timbre_keyboard.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// include plug-ins
 
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./source/jquery.js','./source/timbre.js','./source/socket.io.js','./source/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['jshint', 'scripts'], function() {
  gulp.watch('./source/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
});