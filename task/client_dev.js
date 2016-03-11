export default (_opt) => {
    let gulp = _opt.gulp

    let         del = _opt.pluging.del,
              gutil = _opt.pluging.gutil,
            webpack = _opt.pluging.webpack,
             rename = _opt.pluging.rename,
        runSequence = _opt.pluging.runSequence

    let webpackConfig = _opt.config.webpackConfig

    const server = _opt.path.server
    const client = _opt.path.client
    const assets = _opt.path.assets

    gulp.task('client_dev', (cb) => {
        runSequence('client_del', ['copy_html', 'webpack_dev'], 'client_watch', cb)
    });

    /**
     * webpack任务
     * @param  {[type]} 'webpack_dev' [description]
     * @param  {[type]} (             [description]
     * @return {[type]}               [description]
     */
    gulp.task('webpack_dev', () => {
        webpack(webpackConfig, (err, status) => {
            if(err) throw new gutil.PlugingError('webpack', err)

            gutil.log('webpack', status.toString({ color: true}))

        })

    })

    /**
     * 清空静态文件
     * @param  {[type]} 'client_dev' [description]
     * @param  {[type]} (            [description]
     * @return {[type]}              [description]
     */
    gulp.task('client_del', () => {
        del([assets + '/public/**/*'])
        del([assets + '/views/pages/**/*'])
    })

    // html任务
    gulp.task('copy_html', () => {
        return gulp.src(client + '/**/pages/**/*.html')
                   .pipe(rename((file_path) => {
                       file_path.dirname = file_path.dirname.replace(/\/pages/, '');
                   }))
                   .pipe(gulp.dest(assets + '/views/pages'))
    })


    gulp.task('client_watch', () => {
        gulp.watch(client + '/**/pages/**/*.html', ['copy_html'])
        gulp.watch(client + '/**/static/**/*', ['webpack_dev'])
        gulp.watch(client + '/**/widget/**/*', ['webpack_dev'])
        gulp.watch(client + '/**/module/**/*', ['webpack_dev'])
    })
}
