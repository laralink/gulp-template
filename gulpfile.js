"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const ncp = require('ncp').ncp;
const htmlbeautify = require('gulp-html-beautify');
const config = require('./gulpfig').default;
ncp.limit = 16;


function copy(src, dst) {
    var msg = "Copying " + src + ' to ' + dst + ' ';
    ncp(src, dst, function(err) {
        if (err) {
            return console.error(msg + err);
        }
        console.info(msg + ' - Successful');
    })
}

// Load package.json for banner
const pkg = require('./package.json');


// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./dist/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function gulpVendor() {
  var vendorJS = gulp.src(config.VENDOR_JS)
      .pipe(concat('vendor.js'))
      .pipe(gulp.dest('./dist/assets/js'))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('./dist/assets/js'))
      .pipe(browsersync.stream());


  var vendorSass = gulp.src(config.VENDOR_SCSS)
      .pipe(concat('vendor.css'))
      .pipe(plumber())
      .pipe(sass({
        outputStyle: "expanded",
        includePaths: "./node_modules",
      }))
      .on("error", sass.logError)
      .pipe(autoprefixer({
        cascade: false
      }))
      .pipe(gulp.dest('./dist/assets/css'))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest("./dist/assets/css"))
      .pipe(browsersync.stream());

  return merge(vendorJS, vendorSass);
}


// CSS task
function css() {
  return gulp
    .src(config.SCSS)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header( '/*\n' + config.BANNER + '*/\n', {
      pkg: pkg
    }))
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/assets/css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src(config.JS)
    .pipe(header( '/*\n' + config.BANNER + '*/\n' , {
      pkg: pkg
    }))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browsersync.stream());
}

function assets()
{
    config.COPY.forEach(function (item) {
        copy(item.source, item.destination)
    })
    return Promise.resolve('Assets');
}

function pages() {
    var beautifyoptions = [
        {
            indentSize: 2
        }
    ];
   return  gulp.src('./src/pages/*.html')
       .pipe(htmlbeautify(beautifyoptions))
        .pipe(header('<!--\n' + config.BANNER + '-->\n', {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist/'))
}

// Watch files
function watchFiles() {
  gulp.watch("./src/assets/sass/**/*", css);
  gulp.watch("./src/assets/js/**/*", js);
  gulp.watch("./src/pages/*.html", pages);
}

// Define complex tasks
const vendor = gulp.series(clean, gulpVendor);
const build = gulp.series(vendor, gulp.parallel(pages, css, js), assets);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
