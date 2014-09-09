/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var gulp = require('gulp');

gulp.task('bundle', function() {

  var browserify = require('browserify');
  var source     = require('vinyl-source-stream');
  var reactify   = require('reactify');
  var zip        = require('gulp-zip');
  var streamify  = require('gulp-streamify');
  
  var b = browserify();

  b.add('./client/main.js');

  b.transform(reactify);

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build'))
    .pipe(streamify(zip('react.resource')))
    .pipe(gulp.dest('./src/staticresources'));
    
});
