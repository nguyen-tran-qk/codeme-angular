const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const flatten = require('gulp-flatten');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('images', images);
gulp.task('fonts', fonts);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}

function images() {
  return gulp.src(conf.path.src('styles/images/**/*'))
    .pipe(gulp.dest(conf.paths.dist + '/images'))
    .pipe(gulp.dest(conf.paths.tmp + '/images'));
};

function fonts() {
  return gulp.src(require('main-bower-files')().concat(conf.path.src('styles/fonts/**/*'))
    .concat('bower_components/bootstrap/fonts/*'))
    .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('.tmp/fonts'));
};