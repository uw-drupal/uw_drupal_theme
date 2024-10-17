// TODO: update this to use the WP theme's final output as start. Need to
// review (including JS-related steps).
// Originally this was going to compile the scss from the uw-theme-static files.

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

// Establish paths object so we can reference them below in the compiling functions
const paths = {
  scss: {
    // this is our main entry point; within style.scss we're then referencing the uw-theme-static main
    // entry point
    src: './scss/style.scss',
    dest: './css',
    watch: ['./scss/**/*.scss', './scss/**/*.scss'],
  },
  js: {
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    bootstrapmap: './src/uw-theme-static-main/src/js/libs/bootstrap.min.js.map',
    popper: './node_modules/popper.js/dist/umd/popper.min.js',
    poppermap: './node_modules/popper.js/dist/umd/popper.min.js.map',
    helpers2014: './src/uw-theme-static-main/src/js/2014/*.js',
    helpers: './src/uw-theme-static-main/src/js/*.js',
    theme: './js/misc.js',
    wpJS: './src/wp-theme/js/*.js',
    dest2014: './js/2014',
    destRoot: './js',
    destLibs: './js/libs',
  },
  twig: {
    watch: './templates/**/*.html.twig',
  },
  assets: {
    src: './src/uw-theme-static-main/assets/*/**',
    dest: './assets/',
  },
  wpcss: {
    content: './src/uw-theme-static-main/src/scss/content.css',
    sidebar: './src/uw-theme-static-main/src/scss/sidebar.css',
    widgets: './src/uw-theme-static-main/src/scss/widgets.css',
    dest: './css',
  },
  cleanBuild: {
    css: './css/**.css',
    js: './js/**/*.js',
    jsSrcMaps: './js/**/*.js.map',
  },
};

const autoprefixerOptions = {
  browsers: [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12',
  ],
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
  return (
    gulp
      .src([paths.scss.src])
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          includePaths: [
            // './node_modules/bootstrap/scss',
          ],
        }).on('error', sass.logError)
      )
      .pipe(postcss([autoprefixer(autoprefixerOptions)]))
      .pipe(
        cleanCss({
          format: 'beautify', // formats output in a really nice way
        })
      )
      .pipe(sourcemaps.write('./'))
      // .pipe(cleanCss())
      .pipe(gulp.dest(paths.scss.dest))
  );
  // .pipe(browserSync.stream())
}

// Copy the javascript files into our js folder
function jsLibs() {
  return gulp
    .src([paths.js.bootstrap, paths.js.bootstrapmap, paths.js.popper])
    .pipe(gulp.dest(paths.js.destLibs))
    .pipe(browserSync.stream());
}
function js2014() {
  return gulp
    .src([paths.js.helpers2014])
    .pipe(gulp.dest(paths.js.dest2014))
    .pipe(browserSync.stream());
}
function jsHelpers() {
  return gulp
    .src([paths.js.helpers, paths.js.wpJS])
    .pipe(gulp.dest(paths.js.destRoot))
    .pipe(browserSync.stream());
}

// Clean up before a build
// TODO: assets folder as well; directory '2014' and 'libs' in js folder should be wiped...wasn't sure how to do
function clean() {
  return del([
    paths.cleanBuild.css,
    paths.cleanBuild.js,
    paths.cleanBuild.jsSrcMaps,
    '!./css/wp-fnl-output-bootstrap.css',
    '!./js/misc.js',
  ]);
}

// Static Server + watching scss/html files
function serve() {
  browserSync.init({
    // proxy: put-your-local-server-address-here,
  });

  gulp.watch(paths.scss.watch, styles).on('change', browserSync.reload);
  gulp.watch(paths.twig.watch).on('change', browserSync.reload);
}

// Copy the assets folder from UW Theme Static Main source
function assets() {
  return gulp.src([paths.assets.src]).pipe(gulp.dest(paths.assets.dest));
}

// Copy the assets folder from UW Theme Static Main source
function wpcss() {
  return gulp
    .src([paths.wpcss.content, paths.wpcss.sidebar, paths.wpcss.widgets])
    .pipe(gulp.dest(paths.wpcss.dest));
}

const build = gulp.series(
  clean,
  styles,
  assets,
  wpcss,
  gulp.parallel(jsLibs, js2014, jsHelpers, serve)
);

exports.styles = styles;
exports.js = gulp.series(jsLibs, js2014, jsHelpers);
exports.assets = assets;
exports.wpcss = wpcss;
exports.clean = clean;
exports.serve = serve;

exports.default = build;
