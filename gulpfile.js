// TODO: update this to use the WP theme's final JS. Need to
// review the JS-related steps.

// This will compile all scss into a styles.css file.
let gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  sourcemaps = require('gulp-sourcemaps'),
  $ = require('gulp-load-plugins')(),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create(),
  del = require('del');

// Establish paths object to reference them below in the compiling functions.
const paths = {
  scss: {
    // This is our main entry point; within style.scss we're then referencing the
    // uw_wp_theme's final bootstrap.css and style.css files.
    src: './scss/style.scss',
    dest: './css',
    watch: ['./scss/**/*.scss', './scss/**/*.scss'],
  },
  js: {
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    bootstrapmap: './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
    popper: './node_modules/popper.js/dist/popper.min.js',
    poppermap: './node_modules/popper.js/dist/popper.min.js.map',
    theme: './js/misc.js',
    wpJS: './src/wp-theme/js/*.js',
    dest2014: './js/2014',
    destRoot: './js',
    destLibs: './js/libs',
  },
  cleanBuild: {
    css: './css/**.css',
    js: './js/**/*.js',
    jsSrcMaps: './js/**/*.js.map',
  },
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
  return (
    gulp
      .src([paths.scss.src])
      .pipe(sourcemaps.init())
      .pipe(
        sass().on('error', sass.logError)
      )
      .pipe(postcss([autoprefixer()]))
      .pipe(
        cleanCss({
          format: 'beautify', // formats output in a really nice way
        })
      )
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.scss.dest))
  );
}

// Copy the javascript files into our js folder.
// TODO: This hasn't been worked on since early days. Consider ways to
// copy .js files from src/wp-theme/js were we to seed them there from
// uw_wp_theme releases.
function jsLibs() {
  return gulp
    .src([paths.js.bootstrap, paths.js.bootstrapmap, paths.js.popper])
    .pipe(gulp.dest(paths.js.destLibs))
}
function js2014() {
  return gulp
    .src([paths.js.helpers2014])
    .pipe(gulp.dest(paths.js.dest2014))
}
function jsHelpers() {
  return gulp
    .src([paths.js.helpers, paths.js.wpJS])
    .pipe(gulp.dest(paths.js.destRoot))
}

// Clean up before a build
// TODO: assets folder as well; directory '2014' and 'libs' in js folder should be wiped...wasn't sure how to do
// function clean() {
//   return del([
//     paths.cleanBuild.css,
//     paths.cleanBuild.js,
//     paths.cleanBuild.jsSrcMaps,
//     '!./css/wp-fnl-output-bootstrap.css',
//     '!./js/misc.js',
//   ]);
// }

const build = gulp.series(
  styles,
  // gulp.parallel(jsLibs, js2014, jsHelpers, serve)
);

exports.styles = styles;
exports.js = gulp.series(jsLibs, js2014, jsHelpers);

exports.default = build;
