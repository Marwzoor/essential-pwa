var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
	gulp.src('./node_modules/material-design-icons-iconfont/dist/fonts/**/*.{ttf,woff,eof,svg,woff2}')
		.pipe(gulp.dest('./public/assets/fonts/material-design-icons'));

	gulp.src('./resources/assets/sass/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({suffix: '.min'}))
		.pipe(autoprefixer({
			browsers: ["> 0%"],
			cascade: false
		}))
		.pipe(gulp.dest('./public/assets/css/'))
		.pipe(notify('Sass compiled!'));
});

gulp.task('js', function () {
	gulp.src(
		['./resources/assets/javascript/app.js', './node_modules/material-design-lite/material.min.js'])
		.pipe(concat('app.js'))
		.pipe(uglify({mangle: true}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/assets/js/'))
		.pipe(notify('Javascript compiled!'));

	gulp.src(
		['./resources/assets/javascript/sw.js'])
		.pipe(uglify({mangle: true}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./public/assets/js/'))
		.pipe(notify('Javascript compiled!'));
});

gulp.task('watch', function () {
	gulp.watch('./resources/assets/sass/**/*.scss', ['sass']);

	gulp.watch('./resources/assets/javascript/**/*.js', ['js']);
});

gulp.task('watch:sass', function () {
	gulp.watch('./resources/assets/sass/**/*.scss', ['sass']);
});

gulp.task('watch:js', function () {
	gulp.watch('./resources/assets/javascript/**/*.js', ['js']);
});