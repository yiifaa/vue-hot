let path = require('path'),
    webpack = require('webpack'),
    configs = require('./index'),
    root = __dirname,
    context = path.resolve(root, '../client')

module.exports = {
    //context,
    
    entry : {
        main : ['./client/index.es6']
    },
    
    output : {
        path: configs.dist,
        publicPath: configs.web.public,
        filename : '[name].bundle.js',
        chunkFilename : '[id].bundle.js',
        //  umd包含了对amd、commonjs、var等多种规范的支持 
        libraryTarget : 'var'  
    },
    
    module: {
        loaders: [
            /* ES6编译 */
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                include: context,
                query : {
                    babelrc : true    
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                   test: /\.css$/,
                loader: "style-loader!css-loader"
            }, {
                test: /\.scss$/,
                loader: "style!css!sass"
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(html|tpl)$/,
                loader: "html"
            }            
        ]
    },
    
    /*
     * 需要从外部引入的库文件
     */
    externals: {
        'vue'    : 'Vue'
    },
    
     //  可以优化，添加到webpack.config.server.js中
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};