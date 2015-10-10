var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src('src/app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/app/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/app/scripts/**/*.js', ['scripts']);
  gulp.watch('src/app/styles/**/*.scss', ['sass']);
  gulp.watch('src/index.html', ['html']);
});

gulp.task('scripts', function () {
  return gulp.src('src/app/scripts/**/*.js')
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app/js'));
});

gulp.task('default', ['html', 'scripts', 'sass']);
