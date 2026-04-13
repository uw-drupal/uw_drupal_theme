// TODO: update this to use the WP theme's final JS. Need to
// review the JS-related steps.

// This will compile all scss into a styles.css file.
let gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  sourcemaps = require('gulp-sourcemaps'),
  inject = require('gulp-inject-string'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  tap = require('gulp-tap'),
  $ = require('gulp-load-plugins')(),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  // browserSync = require('browser-sync').create(),
  del = require('del');

// Establish paths object to reference them below in the compiling functions.
const paths = {
  scss: {
    /* This is our main entry point; within style.scss we're then referencing the
     * uw_wp_theme's style.css, which is manually copied into ./scss/_style.css,
     * and bootstrap.scss which lives in ./src/wp-theme/css.
    */
    src: './scss/style.scss',
    dest: './css',
    minified: './css/style.min.css',
    watch: ['./scss/**/*.scss', './scss/**/*.scss'],
  },
  js: {
    // The sources are unique based on the method in use for copying from uw_wp_theme
    // and any customization/overrides needed. The customizations/overrides are in ./src/staging/js.
    src: {
      theme: './js/global.js',
      wp2014: './src/wp-theme/js/2014/2014.js',
      wp2014alert: './src/wp-theme/js/2014/alert.js',
      wp2014quicklinks: './src/wp-theme/js/2014/quicklinks.js',
      wp2014search: './src/staging/js/search.js',
      wp2014searchtoggle: './src/wp-theme/js/2014/searchtoggle.js',
      searchtoggleonly: './src/staging/js/searchtoggleonly.js',
      wp2014select: './src/wp-theme/js/2014/select.js',
      wpShortcodesAccordion: './src/wp-theme/js/shortcodes/accordion.js',
      wpShortcodesCustomLink: './src/wp-theme/js/shortcodes/custom-link.js',
      wpShortcodesGallery: './src/wp-theme/js/shortcodes/gallery.js',
      wpShortcodesModal: './src/wp-theme/js/shortcodes/modal.js',
      wpShortcodesTabTours: './src/wp-theme/js/shortcodes/tabs-tours.js',
      classicMenu: './src/wp-theme/js/classic-menu.js',
      keyboardButton: './src/wp-theme/js/keyboard-button.js',
      keyboardNavmenu: './src/wp-theme/js/keyboard-navmenu.js',
      megamenu: './src/wp-theme/js/megamenu.js',
      // TODO: research sidebar-nav.js and determine if functionality is provided via menu templating in Drupal
      // sidebarnav: './src/wp-theme/js/sidebarnav.js',
      skipLinkFocusFix: './src/wp-theme/js/skip-link-focus-fix.js',
      topLinksToDropdowns: './src/staging/top-links-to-dropdowns.js'
    },
    dest: {
      wp2014: './js/2014',
      jsRoot: './js',
      wpShortcodes: './js/components'
    }
  },
  cleanBuild: {
    css: './css/**.css',
    js: './js/**/*.js',
    jsSrcMaps: './js/**/*.js.map',
  },
};

// Compile sass into CSS & auto-inject into browsers
function styles() {
  return gulp
    .src([paths.scss.src])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(
      cleanCss({
        format: 'beautify', // formats output in a really nice way
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scss.dest));
}

function minifyCSS() {
  return gulp
    .src([paths.scss.dest] + '/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.scss.minified));
}
// Copy the javascript files into our js folder.
// TODO: This hasn't been worked on since early days. Consider ways to
// copy .js files from src/wp-theme/js were we to seed them there from
// uw_wp_theme releases.
function jsLibs() {
  return gulp
    .src([paths.js.bootstrap, paths.js.bootstrapmap, paths.js.popper])
    .pipe(gulp.dest(paths.js.wp2014));
}
function js2014() {
  return gulp
    .src([
      paths.js.src.wp2014,
      paths.js.src.wp2014alert,
      paths.js.src.wp2014quicklinks,
      paths.js.src.wp2014searchtoggle,
      paths.js.src.wp2014select,
    ])
    .pipe(tap((file)=> {
      file.contents = Buffer.from(_wrapForDrupal(file.contents.toString(), ', Backbone'));
    }))
    .pipe(concat('2014bundle.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest.wp2014));
}

async function jsShortcodes() {
  const shortcodesFiles = [
    { file: paths.js.src.wpShortcodesAccordion, wrap: true },
    { file: paths.js.src.wpShortcodesCustomLink, wrap: false },
    { file: paths.js.src.wpShortcodesGallery, wrap: false },
    { file: paths.js.src.wpShortcodesModal, wrap: true },
    { file: paths.js.src.wpShortcodesTabTours, wrap: true }
  ];
  shortcodesFiles.forEach(
    (shortcodeFile) => {
      return gulp
        .src(shortcodeFile.file)
        .pipe(
            tap((file) => {
              if (shortcodeFile.wrap) {
                file.contents = Buffer.from(_wrapForDrupal(file.contents.toString(), ', drupalSettings'));
              }
            })
        )
          // tap( (file) => {
          // file.contents = Buffer.from(_wrapForDrupal(file.contents.toString(), ', drupalSettings'));
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest.wpShortcodes))
    }
  );
}

function jsSearch() {
  return gulp
    .src(paths.js.src.wp2014search)
    .pipe(tap((file)=> {
      file.contents = Buffer.from(_wrapForDrupal(file.contents.toString(), ', drupalSettings'));
    }))
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest.wp2014))
}

function jsSearchToggleOnly() {
  return gulp
    .src(paths.js.src.searchtoggleonly)
    .pipe(tap((file)=> {
      file.contents = Buffer.from(_wrapForDrupal(file.contents.toString(), ''));
    }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest.wp2014))
}
function jsHelpers() {
  return gulp
    .src([paths.js.helpers, paths.js.wpJS])
    .pipe(gulp.dest(paths.js.destRoot));
}

const build = gulp.series(
  styles,
  gulp.parallel(js2014, jsSearch, jsSearchToggleOnly)
);

function _wrapForDrupal(incoming, optionsAsString) {
  const prependString = Buffer.from('(function (Drupal, $' + optionsAsString + ') {', 'utf8');
  const appendString = Buffer.from('})(Drupal, jQuery' + optionsAsString + ');', 'utf8');
  const wrappedFile = prependString + incoming + appendString;
  return wrappedFile;
}

exports.styles = styles;
exports.js = gulp.series(js2014, jsSearch, jsSearchToggleOnly, jsShortcodes);
exports.jsShortcodes = jsShortcodes;
exports.js2014 = js2014;
exports.jsSearch = jsSearch;
exports.jsSearchToggle = jsSearchToggleOnly;

exports.default = build;
