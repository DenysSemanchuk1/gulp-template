const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const ts = require("gulp-typescript");
//styles
const scss = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
gulp.task("scss", function () {
  return gulp
    .src("src/scss/main.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(autoprefixer("last 8 versions"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  });
});

gulp.task("ts", function () {
  return gulp
    .src("./src/ts/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
      })
    )
    .pipe(gulp.dest("./dist/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("watch", function () {
  gulp.watch("src/scss/*.scss", gulp.parallel("scss"));
  gulp.watch("src/*.html", gulp.parallel("html"));
  gulp.watch('src/ts/**/*.ts', gulp.parallel('ts'))
});

gulp.task(
  "default",
  gulp.parallel("ts", "scss", "watch", "browser-sync", "html")
);
