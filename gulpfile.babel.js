'use strict';
import        gulp from 'gulp'
import         del from 'del'
import       gutil from 'gulp-util'
import      jshint from 'gulp-jshint'
import     nodemon from 'gulp-nodemon'
import runSequence from 'gulp-sequence'

const server = process.cwd() + '/src/server'
const client = process.cwd() + '/src/client'
const assets = process.cwd() + '/assets'

gulp.task('default', (cb) => {
    runSequence('server_clean', 'server_copy', 'server', 'server_watch', cb)
})

/**
 * server删除
 * @param  {[type]} 'server_clean' [description]
 * @param  {[type]} (              [description]
 * @return {[type]}                [description]
 */
gulp.task('server_clean', () => {
    del([assets + '/server/**/*'])
})

/**
 * server复制
 * @param  {[type]} 'server_copy' [description]
 * @param  {[type]} (             [description]
 * @return {[type]}               [description]
 */
gulp.task('server_copy', () => {
    return gulp.src(server + '/*.js')
               .pipe(jshint())
               .pipe(gulp.dest(assets + '/server'))
})

/**
 * 启动服务器
 * @param  {[type]} 'server' [description]
 * @param  {[type]} (        [description]
 * @return {[type]}          [description]
 */
gulp.task('server', () => {
    return nodemon({
        script: assets + '/server/app.js',
        ignore: ['src/**', './*'],
           env: {'NODE_ENV': 'development'}
    })
})

gulp.task('server_reload', (cb) => {
    runSequence('server_copy', 'server', cb)
})

/**
 * 监听server
 * @param  {[type]} 'server_watch' [description]
 * @param  {[type]} (              [description]
 * @return {[type]}                [description]
 */
gulp.task('server_watch', () => {
    gulp.watch(server + '/**/*', ['server_copy'])
})
