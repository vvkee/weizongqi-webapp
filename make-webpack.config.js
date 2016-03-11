'use strict';
let path = require('path'),
      fs = require('fs');

let webpack = require('webpack'),
          _ = require('lodash'),
       glob = require('glob')

let ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

let     UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

let      srcDir = path.resolve(process.cwd(), 'src/client'),
    nodeModPath = path.resolve(__dirname, './node_modules'),
         assets = 'assets/'
        // pathMap = require('./src/pathmap.json')

let entries = (() => {
    let jsDir = path.resolve(srcDir, '')
    let entryFiles = glob.sync(jsDir + '/**/widget/**/*.{js,jsx}')
    let map = {}

    entryFiles.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })


    return map;
})()

console.log('entries', entries);
let chunks = Object.keys(entries)

module.exports = (options) => {
    options = options || {}

    let      debug = options.debug !== undefined ? options.debug : true,
        publicPath = '',
        cssLoader,scssLoader

    // generate entry html files
    // 自动生成入口文件，入口js名必须和入口文件名相同
    // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
    let plugins = (() => {
        let entryHtml = glob.sync(srcDir + '/**/widget/**/*.html')
        let r = []

        entryHtml.forEach((filePath) => {
            let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
            let file_path = filePath.substring(filePath.lastIndexOf('\/widget') + 1, filePath.lastIndexOf('.'))
            let conf = {
                template: filePath,
                filename: '../views/' + file_path + '.html'
            }

            if(filename in entries) {
                conf.chunks = ['vender', filename]
            }

            r.push(new HtmlWebpackPlugin(conf))
        })

        return r
    })()

    if(debug) {
        // 开发阶段，css直接内嵌
        cssLoader = 'style!css'
        scssLoader = 'style!css!sass'
    } else {
        // 编译阶段，css分离出来单独引入
        cssLoader = ExtractTextPlugin.extract('style', 'css?minimize') // enable minimize
        scssLoader = ExtractTextPlugin.extract('style', 'css?minimize', 'sass')

        plugins.push(
            new ExtractTextPlugin('css/[contenthash:8].[name].min.css', {
                // 当allChunks指定为false时，css loader必须指定怎么处理
                // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
                // 第一个参数`notExtractLoader`，一般是使用style-loader
                // @see https://github.com/webpack/extract-text-webpack-plugin
                allChunks: false
            })
        )

        plugins.push(new UglifyJsPlugin())
    }

    console.log('assign', Object.assign(entries, {
        'vender': ['react', 'react-dom']
    }))
    let config = {
        entry: Object.assign(entries, {
            'vender': ['react', 'react-dom']
        }),
        devtool: 'source-map',
        output: {
            path: path.resolve(assets + 'public'),
            filename: debug ? '[name].js' : 'js/[chunkhash:8].[name].min.js',
            chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
            hotUpdateChunkFilename: debug ? '[id].js' : 'js/[id].[chunkhash:8].min.js',
            publicPath: publicPath
        },
        resolve: {
            root: [srcDir, './node_modules'],
            extensions: ['', '.js','.jsx', '.css', '.scss', '.tpl', '.png', '.jpg']
        },
        resolveLoader: {
            root: path.join(__dirname, 'node_modules')
        },
        module: {
            loaders: [
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    loaders: [
                        'image?{bypassOnDebug: true, progressive:true, \
                            optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
                        // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        'url?limit=10000&name=img/[hash:8].[name].[ext]',
                    ]
                },
                { test: /\.(woff|eot|ttf)$/i, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]' },
                { test: /\.(tpl|ejs)$/, loader: 'ejs'},
                { test: /\.css$/, loader: cssLoader},
                { test: /\.scss$/, loader: scssLoader},
                { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9].[0-9].[0-9])?$/,   loader: "file"},
                { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-3'}
            ]
        },
        plugins: [
            new CommonsChunkPlugin({
                name: 'vender',
                chunks: chunks
            })
        ].concat(plugins),
        devServer: {
            hot: true,
            noInfo: false,
            inline: true,
            publicPath: publicPath,
            stats: {
                cached: false,
                colors: true
            }
        }
    }

    return config

}
