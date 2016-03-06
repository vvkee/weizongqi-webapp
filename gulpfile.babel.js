'use strict';

import  gulp from 'gulp'
import babel from 'gulp-babel'

const server = process.cwd() + '/src/server'
const client = process.cwd() + '/src/client'
const assets = process.cwd() + '/assets'


gulp.task('server', () => {
    return gulp.src('${server}' + '/*.js')
               .pipe(babel())
               .pipe(gulp.dest(assets))
})

gulp.task('default', ['server'], () => {
    let app = require(assets + '/server/app.js');

    console.log('app', app);
})
