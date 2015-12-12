
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('js', function() {
	return browserify('./src/js/main')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./src/js'));
});

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['js']);
});

