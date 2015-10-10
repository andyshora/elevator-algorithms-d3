var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('html', function () {
  gulp.src('src/app/**/*.html')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('sass', function () {
  gulp.src('src/app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/app/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/app/scripts/**/*.js', ['scripts']);
  gulp.watch('src/app/styles/**/*.scss', ['sass']);
  gulp.watch('src/app/**/*.html', ['html']);
});

gulp.task('scripts', function () {
  return gulp.src('src/app/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app/js'));
});

gulp.task('default', ['html', 'scripts', 'sass']);
