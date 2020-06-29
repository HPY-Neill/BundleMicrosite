const gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  source = "./styles/scss/",
  dest = "./styles/";

sass.compiler = require("node-sass");

function html() {
  return gulp.src(dest + "../main.html");
}

function js() {
  return gulp.src(dest + "../js/scripts.js");
}

function styles() {
  return gulp
    .src(source + "style.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        sourcemap: true,
        style: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer({
    	cascade: false
    }))
    .pipe(rename("microsite-style.css"))
    .pipe(gulp.dest(dest + "css"));
}

function watch() {
  gulp.watch(dest + "../js/scripts.js", js).on("change", browserSync.reload);
  gulp.watch(source + "**/*", styles).on("change", browserSync.reload);
  gulp.watch(dest + "../main.html", html).on("change", browserSync.reload);
}

function server() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./",
      index: "main.html"
    }
  });

  gulp
    .watch(source + "**/*.scss", styles)
    .on("change", browserSync.reload);
  gulp.watch(dest + "../js/scripts.js", js).on("change", browserSync.reload);
  gulp.watch(dest + "../main.html", html).on("change", browserSync.reload);
}

var build = gulp.series(gulp.parallel(js, styles, html), server, watch);

gulp.task("default", build);