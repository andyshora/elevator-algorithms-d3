var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src('src/app/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/app/css'));
});

gulp.task('bundle', function () {
  browserify([
      'src/app/scripts/main.js',
      'src/app/scripts/lib/Simulation.js',
      'src/app/scripts/lib/Building.js',
      'src/app/scripts/lib/Person.js',
      'src/app/scripts/lib/Elevator.js'
    ], { debug: true, standalone: true })

    .transform(babelify)
    .bundle()
    .on('error', function (err) {
      console.log('Error : ' + err.message);
    })
    .pipe(fs.createWriteStream('dist/app/scripts/bundle.js'));
});

gulp.task('watch', function () {
  gulp.watch('src/app/scripts/**/*.js', ['scripts']);
  gulp.watch('src/app/styles/**/*.scss', ['sass']);
  gulp.watch('src/index.html', ['html']);
});

gulp.task('test', ['bundle'], function () {
  return gulp.src([
      'test/bundle.js',
      'test/Simulation.spec.js'
    ])
    .pipe(babel())
    .pipe(jasmine({
      verbose: true
    }));
});

gulp.task('scripts', function () {
  return gulp.src('src/app/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))

    .pipe(gulp.dest('dist/app/scripts'));
});

gulp.task('default', ['html', 'scripts', 'sass']);
