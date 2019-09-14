'use strict';

const gulp = require('gulp');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const del = require('del');
const runSequence = require('run-sequence');
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// gulp.task('clean', () => del(['app/css', 'app/img']));
gulp.task('clean', () => del(['app/css', 'app/js']));

gulp.task('styles', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(csso())
    //.pipe(rev());
    .pipe(gulp.dest('./app/css'));
    //.pipe(rev.manifest('styles.manifest'))
    //.pipe(gulp.dest('./app/'));
});

gulp.task('scripts', function () {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError())
    //.pipe(rev())
    .pipe(gulp.dest('./app/js'));
    //.pipe(rev.manifest('scripts.manifest'))
    //.pipe(gulp.dest('./app/'));
});

/* gulp.task('scripts', function () {
  return gulp.src('./src/js/*.js')
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      .pipe(rev())
      .pipe(gulp.dest('./app/js'))
      .pipe(rev.manifest('scripts.manifest'))
      .pipe(gulp.dest('./app/'));

      // folder only, filename is specified in webpack config
    .pipe(gulp.dest("./app/js/assets/js/"))
      .pipe(browsersync.stream())
  ); */

/* gulp.task('images', function () {
   return gulp.src('./src/img/*')
     .pipe(rev())
     .pipe(gulp.dest('./app/img'))
     .pipe(rev.manifest('images.manifest'))
     .pipe(gulp.dest('./app/'));
 }); */

//gulp.task('update-assets-links', function () {
//  return gulp.src(['./app/**/*.manifest', './app/**/*.pug'])
//    .pipe(revCollector({}))
//    .pipe(gulp.dest('./app') );
//});

gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'scripts',
    // 'images',
    // 'update-assets-links'
  );
});
