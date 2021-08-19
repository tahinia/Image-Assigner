var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("default", function () {
  return gulp.src("js/src/*.js")
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(gulp.dest("js/dist"));
});


gulp.task('watch', function() {
    gulp.watch('./js/src/*.js', gulp.series('default'));
});