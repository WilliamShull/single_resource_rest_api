'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var Karma = require('karma').Server;

var files = ['lib/*.js', 'models/*.js', 'routes/*.js', 'test/**/*test.js', 'server.js', 'gulpfile.js'];

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('./test/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client'));
  });

gulp.task('staticfiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('karmatest', ['webpack:test'], function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js'
    }, done()).start();
  });

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', [ 'build:dev', 'jshint']);

//gulp.task('test', function() {
//return gulp.src(files)
//.pipe(mocha({reporter: 'nyan'}));
//});
