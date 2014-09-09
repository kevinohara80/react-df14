var gulp = require('gulp');

gulp.task('default', function(cb) {
  
  var seq = require('run-sequence');
  
  seq('clean', 'bundle', cb);

});