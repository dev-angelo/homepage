var gulp = require('gulp');
var less = require('gulp-less');
//var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var htmlmin = require('gulp-htmlmin');
var cachebust = require('gulp-cache-bust');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var clean = require('gulp-clean');
const { watch } = require('browser-sync');
const { doesNotMatch } = require('assert');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

const PATH = {
  LESS : [
    "less/common.less",
    "less/index.less",
    "less/application.less",
    "less/schedule.less",
    "less/level.less",
    "less/sharedcto.less",
    "less/code-together/code-together.less",
    "less/program_unit.less",
    "less/code-together/code-together-item.less",
    "less/masters/master.less",
    "less/masters/program_unit_masters_common.less",
    "less/registration-common.less",
  ],
  HTML : [
    "html_src/*.html",
    'html_src/common/*.html',
    'html_src/common/masters/*.html',
    'html_src/reg/*.html',
    'html_src/masters/*.html',
    'html_src/code-together/*.html'
  ]
};

// // Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src(['less/common.less', 'less/index.less', 
                    'less/application.less', 'less/schedule.less', 'less/level.less',
                    'less/sharedcto.less',
                    'less/code-together/code-together.less', 'less/program_unit.less', 'less/code-together/code-together-item.less',
                    'less/masters/master.less','less/masters/program_unit_masters_common.less',
                    'less/registration-common.less'])
                    .pipe(less())
                    .pipe(concat('merged.css'))
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', gulp.series('less'), function() {
    return gulp.src('css/agency.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// // Minify JS
gulp.task('minify-js', function() {
    return gulp.src(['js_src/*.js'])
        //.pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// // HTML Process

gulp.task('clean-html', function(){
    //return gulp.src(['page/*.html', 'page/**/*.html','html_src/html_merged/*.html','html_src/html_merged/**/*.html'], {iallowEmpty:true})
    return gulp.src(['page/*.html', 'page/**/*.html','html_src/html_merged/*.html','html_src/html_merged/**/*.html'], {iallowEmpty:true})
    .pipe(clean());
});

//gulp.task('htmlinclude-reg', gulp.series('clean-html'), function() {
gulp.task('htmlinclude-reg', function() {
    return gulp.src(['html_src/reg/*.html'])
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('html_src/html_merged/reg/'));
});

gulp.task('htmlinclude-masters', function() {
  return gulp.src([
      'html_src/masters/fe.html', 'html_src/masters/be.html','html_src/masters/ios.html','html_src/masters/android.html',
      'html_src/masters/curriculum.html' ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('html_src/html_merged/masters/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('htmlinclude-root', function() {
  return gulp.src(['html_src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('html_src/html_merged/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('htmlinclude-code-together', function() {
  return gulp.src(['html_src/code-together/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('html_src/html_merged/code-together'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('mv-masters', function() {
  return gulp.src('html_src/html_merged/masters/*.html')
  .pipe(cachebust({
    type: 'timestamp'
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('page/masters/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('mv-code-together', function() {
  return gulp.src('html_src/html_merged/code-together/*.html')
  .pipe(cachebust({
    type: 'timestamp'
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('page/code-together/'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('mv-reg', function() {
  return gulp.src(['html_src/html_merged/reg/*.html'])
  .pipe(cachebust({
    type: 'timestamp'
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('page/reg'))
  .pipe(browserSync.reload({stream: true}))
})

gulp.task('mv-mainpages', function() {
  return gulp.src(['html_src/html_merged/*.html'])
  .pipe(cachebust({
    type: 'timestamp'
  }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('page'))
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('mv-index', function() {
  return gulp.src('page/index.html')
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({ stream: true }))
}) 

gulp.task('mv-to-pages', gulp.series(gulp.parallel(
  'htmlinclude-root', 'htmlinclude-code-together', 'htmlinclude-masters', 'htmlinclude-reg'
), 'mv-masters', 'mv-code-together', 'mv-reg', 'mv-mainpages', 'mv-index'), function() {
  //browserSync.reload({stream: true})
})


gulp.task('watch-files', ()=> {

  gulp.watch( PATH.HTML, gulp.series('mv-to-pages'));
  gulp.watch( PATH.LESS, gulp.series('minify-css'));

  gulp.watch( [ 
    "js_src/*.js"
  ], gulp.series('minify-js'));

})

//BrowserSync
gulp.task('browserSync', function() {
  browserSync.init({
      server: {
          baseDir: './'
      },
  })
})

gulp.task('browserSyncReload', function() {
  browsersync.reload();
})


gulp.task('dev', gulp.series( 'clean-html', gulp.parallel(['minify-css', 'minify-js', 'mv-to-pages', 'watch-files', 'browserSync'])), ()=>{
  browserSync.reload({ stream: true })
});

// // Run everything
gulp.task('default', gulp.series("clean-html", gulp.parallel(['minify-css', 'minify-js', 'mv-to-pages'])));



// // Copy libs libraries from /node_modules into /libs
gulp.task('copy-libs', function() {
    // gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    //     .pipe(gulp.dest('libs/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('libs/jquery'))

    // gulp.src([
    //         'node_modules/font-awesome/**',
    //         '!node_modules/font-awesome/**/*.map',
    //         '!node_modules/font-awesome/.npmignore',
    //         '!node_modules/font-awesome/*.txt',
    //         '!node_modules/font-awesome/*.md',
    //         '!node_modules/font-awesome/*.json'
    //     ])
    //     .pipe(gulp.dest('libs/font-awesome'))
 })
