// Theme name you want to work with
var themename = 'm-zimmer';

// Prepare and optimize code
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify   = require('gulp-uglify');
const newer = require('gulp-newer');

// Name of working theme folder
var root = '../' + themename + '/',
    scss = root +'sass/',
    js = root + 'js/',
    srcjs = root + 'srcjs/',
    languages = root + 'languages/';


// CSS via Sass and Autoprefixer
gulp.task('css', function() {
    return gulp.src(scss + '{style.scss,rtl.scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
        indentType: 'tab',
        indentWidth: '1'
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer('last 2 versions', '> 5%')
    ]))
    .pipe(sourcemaps.write(scss + 'maps'))
    .pipe(gulp.dest(root));
});

// Compile Sass and Inject Into Browser
gulp.task('sass', function(){
    return gulp.src(scss + '{style.scss,rtl.scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
        indentType: 'tab',
        indentWidth: '1'
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer('last 2 versions', '> 5%')
    ]))
    .pipe(sourcemaps.write(scss + 'maps'))
    .pipe(gulp.dest(root));
});

// JavaScript
gulp.task('javascript', function() {
    return gulp.src([srcjs + '*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('theme.js'))
    .pipe(uglify())
    .pipe(gulp.dest(js));
});

// Move fonts folder to src
gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
})

// Move Font Awesome CSS to src/css
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
})

// Watch Sass & Server
gulp.task('watch', function() {
    browserSync.init({
        open: 'external',
        proxy: 'http://localhost/wordpress/',
        port: 8080
    });
    gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']);
    gulp.watch(srcjs + '**/*.js', ['javascript']);
    gulp.watch(root + '**/*').on('change', browserSync.reload);
});

//Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);