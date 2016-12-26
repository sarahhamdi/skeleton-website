'use strict'

		const gulp = require('gulp');
    const sass = require('gulp-sass');
    const concat = require('gulp-concat');
    const browserSync = require('browser-sync').create();
    const reload = browserSync.reload;
    const jshint = require('gulp-jshint');
    const autoprefixer = require('gulp-autoprefixer');
    const imageMin = require('gulp-imagemin');
    const minifyCSS = require('gulp-clean-css');
    const notify = require('gulp-notify');
    const plumber = require('gulp-plumber');
    const sourcemaps = require('gulp-sourcemaps');
    const uglify = require('gulp-uglify');
    const babel = require('gulp-babel');
    

// task: browser-sync
gulp.task('browser-sync', () => {
  browserSync.init({
    server: './'  
  })
});

// task: styles
gulp.task('styles', function() {
  return gulp.src('dev/styles/**/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sourcemaps.write('.'))
    .pipe(reload({ stream: true }))
    .pipe(gulp.dest('public/styles'));
});

// task: jshint
gulp.task('scripts', function() {
    return gulp.src('dev/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        // .pipe(babel({
        //   	presets: ['es2015']
        // }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts'))
        .pipe(reload({stream:true}));
});

// task: assets
gulp.task('assets', function () {
	return gulp.src('dev/assets/**/*')
		.pipe(imageMin())
		.pipe(gulp.dest('public/assets'));
});

// task: watch
gulp.task('watch', () => {
  gulp.watch('dev/styles/**/*.scss', ['styles']); 
  gulp.watch('dev/scripts/**/*.js', ['scripts']);
  gulp.watch('*.html', reload);
});

// task: watch global 
gulp.task('default', ['browser-sync', 'watch', 'styles', 'scripts', 'assets']);