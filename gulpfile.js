'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

// Clean Output Directory
gulp.task('clean', del.bind(null, ['public/app'], {dot: true}));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['app'],cb);
});

gulp.task('dna', function() {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: true, // default = false, true means stdout is written to file.contents
  };

  gulp.src('dna/views.js', {read: false})
    .pipe($.exec('node_modules/.bin/ribosome.js dna/views.js.dna', options))
    .pipe($.rename('views.js'))
    .pipe(gulp.dest('app'));
});

// Build app.js
gulp.task('app', function() {
  gulp.src('app/main.js', {read: false})
    .pipe($.browserify({insertGlobals: true, exclude: 'localStorage'}))
    .pipe($.rename('app.js'))
    .pipe(gulp.dest('./public/app'));
});
