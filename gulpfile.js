var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function () {
    return gulp.src('source/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('pug', function() {
  return gulp.src("source//*.pug")
      .pipe(pug({pretty:true,}))
      .pipe(gulp.dest("app/"))

      .pipe(browserSync.stream());
});

gulp.task('js',function(){
  gulp.src('source/js/scripts.js')
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css','pug', 'js', 'browser-sync'], function () {
    gulp.watch("source/scss/**/*.scss", ['css']);
    gulp.watch("source/**/*.pug", ['pug']);
    gulp.watch("source/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
});
