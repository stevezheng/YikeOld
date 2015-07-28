'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var fs = require('fs');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;
var reactify  = require('reactify');

// Clean Output Directory
gulp.task('clean', del.bind(null, ['public/app', 'app/views.js'], {dot: true}));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(['app'],cb);
});

gulp.task('dna', function (cb) {
  exec('node_modules/.bin/ribosome.js dna/views.js.dna > app/views.js', function (err, stdout, stderr) {
    cb(err);
  });
});

// Build app.js
gulp.task('app', ['dna'], function() {
  gulp.src('app/main.jsx', {read: false})
    .pipe($.browserify({
      insertGlobals: true,
      exclude: 'localStorage',
      transform: [function(filename){
        return reactify(filename, {es6: true})
      }],
      extensions: ['.js', '.jsx']
    }))
    .pipe($.rename('app.js'))
    .pipe(gulp.dest('./public/app'));
});
