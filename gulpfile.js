'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var files = ['lib/*.js', 'models/*.js', 'routes/*.js', './test/*', 'server.js', 'gulpfile.js'];

gulp.task('jshint', function() {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('./test/*')
  .pipe(mocha({reporter: 'nyan'}));
});


gulp.task('default', [ 'jshint', 'test']);
