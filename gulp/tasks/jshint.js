var gulp = require('gulp');

gulp.task('jshint', function(){

  var jshint  = require('gulp-jshint');
  var stylish = require('jshint-stylish');

  return gulp.src('client/js/**/*.{js,jsx}')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));

});