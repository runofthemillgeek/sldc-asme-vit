var gulp = require('gulp'),
		bs = require('browser-sync').create(),
		uglify = require('gulp-uglify'),
		cssmin = require('gulp-cssmin'),
		rename = require('gulp-rename'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps');

var jsSrc = ['js/script.js'],
		cssSrc = ['css/styles.css'],
		sassSrc = ['sass/**/*.scss'];

gulp.task('css', function() {
	gulp.src(cssSrc)
			.pipe(cssmin())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('css'));
});

gulp.task('js', function() {
	gulp.src(jsSrc)
			.pipe(uglify())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('js'));
});

gulp.task('js-watch', ['js'], bs.reload);

gulp.task('sass', function() {
	gulp.src(sassSrc)
			.pipe(sourcemaps.init())
			.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('css'))
			.pipe(bs.stream());
});

gulp.task('serve', ['sass'], function() {

	bs.init({
        server: "./"
    });

	gulp.watch(jsSrc, ['js-watch']);
	gulp.watch(cssSrc, ['css']);
	gulp.watch(sassSrc, ['sass']);
	gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('default', ['serve']);
