var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var minifyCss = require('gulp-minify-css');

 
gulp.task('scripts', function() {
  //concat
  gulp.src([
      // angular libs
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/moment/moment.js',
      'node_modules/angular-moment/angular-moment.js',
      'node_modules/angular-moment/node_modules/moment/locale/fr.js',

      //libs
      'node_modules/angular-bootstrap/ui-bootstrap.js',
      'node_modules/angular-bootstrap/ui-bootstrap-tpls.js', 
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.js',
      'node_modules/underscore/underscore.js',
      'bower_components/angular-underscore-module/angular-underscore-module.js',
      'bower_components/angular-file-model/angular-file-model.js',
      'bower_components/angular-ui-bootstrap-datetimepicker/datetimepicker.js',

    ])
    .pipe(concat('beMyApp.js'))
    .pipe(gulp.dest('./app/assets/dist/js/'))
    .pipe(rename('beMyApp.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/dist/js/'));

});
 
var sass = require('gulp-sass');
 
gulp.task('sass', function() {
  gulp.src([
    // './app/assets/libs/bootstrap.min.css',
    './app/assets/libs/bootstrap.css',
    './app/assets/libs/bootstrap-theme.css',
    './app/assets/scss/beMyApp.scss',
    // './app/assets/fdr-icon/style.css',
    // './bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css',
    // './app/assets/fonts/glegoo.css'
    
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('beMyApp.css'))
    .pipe(gulp.dest('./app/assets/dist/css/'))
    .pipe(rename('beMyApp.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./app/assets/dist/css/'));
});
 
// gulp.task('watch', function() {

//   //Watch SCSS & CSS
//   gulp.watch([
//     './assets/libs/**/*.css',
//     './assets/fdr-icon/**/*.css',
//     './assets/fonts/**/*.css',
//     './assets/scss/**/*.scss',
//   ], ['sass']);

//   //watch JS
//   gulp.watch([
//     './app.module.js',
//     './components/**/*.js',
//     './shared/**/*.js'
//   ], ['scripts']);

// });

gulp.task('default', ['scripts', 'sass']);
