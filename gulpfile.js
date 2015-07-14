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

// Build app.js
gulp.task('app', function() {
  gulp.src('app/main.js', {read: false})
    .pipe($.browserify({insertGlobals: true, exclude: 'localStorage'}))
    .pipe($.rename('app.js'))
    .pipe(gulp.dest('./public/app'));
});
