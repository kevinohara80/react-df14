var gulp = require('gulp');
//var clean = require('gulp-clean');
var rimraf = require('rimraf');

gulp.task('clean', function (cb) {
  rimraf.sync('build/');
  cb();
});