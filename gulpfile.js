'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var files = ['lib/*.js', 'models/*.js', 'routes/*.js', 'test/*test.js', './*.js'];

gulp.task('jshint', function() {
  gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  gulp.src(files)
  .pipe(mocha({reporter: 'nyan'}));
});


gulp.task('default', ['jshint', 'test']);
