'use strict';

const gulp = require('gulp');
const del = require('del');
const sourcemaps  = require('gulp-sourcemaps');
const uglify = require("gulp-uglify");
const browserify = require('browserify');
const vueify = require('vueify');
const babelify = require("babelify");
const source = require('vinyl-source-stream');
const buffer = require("vinyl-buffer");
const less = require('gulp-less');
const path = require('path');
const log = require('fancy-log');
const colors = require('ansi-colors');

gulp.task('clean', () => {
    log("Clean task.","Cleaning");
    return del('./js/dst/');
});

gulp.task('build', () => {
    return  browserify({
        entries: './js/src/vueComponents/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform(babelify)
    .transform(vueify, { _flags: { debug: true } })
    .bundle()
    .on('error', err => {
        log("Browserify Error", colors.red(err));
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    //.pipe(uglify())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js/dst'));
});


gulp.task('less', function () {
    return gulp.src('./js/src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./js/dst'));
});

gulp.task('default', gulp.series(['clean'], gulp.parallel(['build', 'less'])), () => {
    
});


const nodemon = require('gulp-nodemon');
gulp.task('server', function() {
    nodemon({
        script: 'webServer.js',
        ext: 'js',
        env: {
            NODE_ENV: 'dev',
            PORT: 9080
        },
        ignore: ['./node_modules/**']
    });
});