var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('scripts', function(){
  return gulp.src('./scripts/components/index.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./build'));
});

gulp.task('html', function(){
  return gulp.src('./scripts/**/**.html')
  .pipe(gulp.dest('./build'))
  ;
});

gulp.task('css', function(){
  return gulp.src('./scripts/**/**.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['scripts', 'html', 'css'], function(){
  gulp.watch('./src/app/**/**.js', ['scripts']);
  gulp.watch('./src/**/**.html', ['html']);
  gulp.watch('./src/**/**.css', ['css']);
});
