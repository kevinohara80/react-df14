var gulp = require('gulp');

gulp.task('resource', function() {

  var streamify = require('gulp-streamify');
  var zip       = require('gulp-zip');

  return gulp.src('./build/**/*')
    .pipe(streamify(zip('react.resource')))
    .pipe(gulp.dest('./src/staticresources'));
})