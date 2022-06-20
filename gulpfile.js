const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss')

function buildStyles() {
  return src('scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))                   /* compressed for production */
  /*   .pipe(purgecss({ content: ['views/*.ejs'] })) */     /* purge unused styles in destination files */
    .pipe(dest('public/stylesheets'))                                  /* destination for converted css files */
}

function watchTask() {
  watch(['scss/**/*.scss'], buildStyles)                  /* watches destination folder/files for any changes */
}

module.exports.default = series(buildStyles, watchTask)

/* add ("gulp" : "gulp") to scripts in package.json */
/* npm install gulp-purgecss gulp gulp-sass sass --save-dev */
/* npm run gulp */