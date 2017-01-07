const gulp = require('gulp');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const less = require('gulp-less');
const concat = require('gulp-concat');
const merge = require('merge-stream');

const conf = require('../conf/gulp.conf');

gulp.task('styles', styles);

function styles() {
  var lessStream = gulp.src(conf.path.src('styles/main.less'))
    .pipe(less())
    .pipe(concat('less-files.less'));

  var cssStream = gulp.src(conf.path.src('index.scss'))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'expanded' })).on('error', conf.errorHandler('Sass'))
    .pipe(postcss([autoprefixer()])).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(sourcemaps.write())
    .pipe(concat('css-files.css'));

  return merge(lessStream, cssStream)
    .pipe(concat('index.css'))
    .pipe(gulp.dest(conf.path.tmp()))
    .pipe(gulp.dest(conf.paths.dist))
    .pipe(browserSync.stream());
}
