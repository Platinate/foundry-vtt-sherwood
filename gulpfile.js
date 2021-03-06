// Sass configuration
var gulp = require("gulp");
var sass = require("gulp-sass");

gulp.task("sass", function (cb) {
  gulp.src("scss/sherwood.scss").pipe(sass()).pipe(gulp.dest("./"));
  cb();
});

gulp.task(
  "default",
  gulp.series("sass", (cb) => {
    gulp.watch("scss/*.scss", gulp.series("sass"));
    cb();
  })
);
