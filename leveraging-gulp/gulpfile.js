var gulp = require('gulp')
	, concat = require('gulp-concat')
	, uglify = require('gulp-uglify')
	, at = require('gulp-asset-transform')
	, rev = require('gulp-rev')
	, minifyHtml = require('gulp-minify-html')
	, minifyCss = require('gulp-minify-css')
	, less = require('gulp-less')
	, ngAnnotate = require('gulp-ng-annotate')
	, install = require('gulp-install')
	, args   = require('yargs').argv
;

gulp.task('default', ['watch']);

gulp.task('build',['copy', 'install', 'usemin']);

gulp.task('copy', function(){
	gulp.src('./src/server/**/*.js')
		.pipe(gulp.dest('./build/server'));

	gulp.src('./src/.sequelizerc')
		.pipe(gulp.dest('./build'));
		
	gulp.src('./src/client/**/*.html')
		.pipe(gulp.dest('./build/client'));

	gulp.src('./src/server/**/*.json')
		.pipe(gulp.dest('./build/server/'));

})

gulp.task('install', function(){		
	return gulp.src('./package.json')
		.pipe(gulp.dest('./build/'))
		.pipe(install({production:true}));
})

gulp.task('usemin', function() {
	gulp.src('./src/client/index.html')
		.pipe(at({
			less: {
				tasks:[less(), minifyCss({processImport: false}), 'concat']
			},
			js: {
				tasks:[ngAnnotate(), uglify(), 'concat', rev()]
			}
		}))
		.pipe(gulp.dest('build/client'));
});

