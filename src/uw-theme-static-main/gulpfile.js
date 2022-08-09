const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const order = require('gulp-order');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const del = require('del');

const browserSync = require('browser-sync').create();

// file paths
const files = {
  scssSrcPath: './src/scss/**/*.scss',
  cssDestPath: './dist/css',
  jsLibSrcPath: './src/js/libs/*.js',
  js2014SrcPath: './src/js/2014/*.js',
  jsSrcPath: './src/js/*.js',
  jsDestPath: './dist/js',
};

function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'dist' ]);
}

// compile scss into css
function style() {
  // 1. where is my scss file
  return gulp.src(files.scssSrcPath)
    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest(files.cssDestPath))
    // 4. stream changes to
    .pipe(browserSync.stream());
}

function javascriptGeneral() {
  return gulp.src(files.jsSrcPath)
    // .pipe(concat('scripts.js'))
    .pipe(gulp.dest(files.jsDestPath));
    // .pipe(rename('scripts.min.js'))
    // .pipe(uglify())
    // .pipe(gulp.dest(jsDest));
}

function javascriptLibs() {
  return gulp.src(files.jsLibSrcPath)
    // .pipe(concat('scripts.js'))
    .pipe(gulp.dest(files.jsDestPath))
  // .pipe(rename('scripts.min.js'))
  // .pipe(uglify())
  // .pipe(gulp.dest(jsDest));
}

function javascript2014() {
  return gulp.src(files.js2014SrcPath)
    .pipe(order([
      '2014.js',
      'alert.js',
      'quicklinks.js',
      'quicklinks.js',
      'radio.js',
      'search.js',
      'searchtoggle.js',
      'select.js'
    ]))
    .pipe(concat('2014.js'))
    .pipe(rename('2014.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(files.jsDestPath));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
      open: false,
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
}

function assets() {
  // 1. the assets folder
  return gulp.src('./assets/**/*', {base:'.'})
    .pipe(gulp.dest('./dist'))
}

exports.style = style;
exports.watch = watch;
exports.assets = assets;
exports.clean = clean;
exports.javascript = gulp.series(javascriptLibs, javascript2014, javascriptGeneral);