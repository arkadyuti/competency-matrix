var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var jslint = require('gulp-jslint');
var minifyJS = require('gulp-minify');
var minifyCSS = require('gulp-minify-css');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var csslint = require('gulp-csslint'); 
var minifier = require('gulp-minifier');
 

gulp.task('sass',function(){
  gulp.src('./src/sass/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./dist/css'));
});

gulp.task('sasswatch', function() {
  gulp.run('sass');
  gulp.watch('./src/sass/**/*.scss', function() {
    gulp.run('sass');
  });
});

gulp.task('sprites', function () {
    gulp.src('./src/images/*.png')
      .pipe(spritesmith({
        imgName: 'sprites.png',
        cssName: 'sprites.css',
        preprocessor: 'scss'
      }))
      .pipe(gulp.dest('./src/images/sprite/'));
});

gulp.task('minify-js', function() {
  gulp.src('./src/scripts/**/*.js')
    .pipe(minifyJS({
        /*ext:{
            src:'-min.js',
            min:'.js'
        },*/
        exclude: ['./minified/'],
        ignoreFiles: ['.js']
    }))
    .pipe(gulp.dest('./dist/minified/scripts/'))
}); 
 
gulp.task('minify-css', function() {
  gulp.src('./dist/css/*.css')
    .pipe(minifyCSS({
        /*ext:{
            src:'-min.js',
            min:'.js'
        },*/
        exclude: ['./minified/'],
        ignoreFiles: ['.css']
    }))
    .pipe(gulp.dest('./dist/minified/css/'))
}); 

gulp.task('minify', function() {
  gulp.run('minify-js');
  gulp.run('minify-css');
});

gulp.task('handlebars', function () {
    var templateData = {},
    options = {
        ignorePartials: true, 
        partials : {},
        batch : ['./src/templates/partials/'],
        helpers : {}
        }
    
 
    return gulp.src('./src/templates/pages/*.hbs')
        .pipe(handlebars(templateData, options))
        .pipe(gulp.dest('./dist/html/'));
});

gulp.task('jslint', function () {
    return gulp.src('./src/scripts/*.js')
            .pipe(jslint())
            .pipe(jslint.reporter( 'default' ));
});

gulp.task('csslint', function() {
  gulp.src('./dist/css/*.css')
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('lint', function() {
  gulp.run('jslint');
  gulp.run('csslint');
});

 
