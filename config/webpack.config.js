let path = require('path'),
    webpack = require('webpack'),
    configs = require('./index'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
console.log(path.resolve(configs.src, './index.es6'))
module.exports = {
    //context,
    
    entry : {
        main : [path.resolve(configs.src, './index.es6')]
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
                include: configs.src,
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
    
    //
    resolve : {
        //  必须是绝对地址
        alias : {
            'apps' : path.resolve(configs.src, './apps'),
            'i18n' : path.resolve(configs.src, './i18n'),
            'configs' : path.resolve(configs.src, './configs'),
            'plugins' : path.resolve(configs.src, './plugins'),
            'utils' : path.resolve(configs.src, './utils'),
            'services' : path.resolve(configs.src, './services')
        }
    },
    
     //  可以优化，添加到webpack.config.server.js中
    plugins: [
        new HtmlWebpackPlugin({
            title : 'Webpack Hot Reload Template',
            filename : 'index.html',
            inject : 'body',
            template: 'template.ejs',
            links: [{
                href : 'dist/node_modules/bootstrap/dist/css/bootstrap.css',
                rel : 'stylesheet'
            }],
            scripts: [
                'dist/node_modules/vue/dist/vue.js'
            ]
        }),
    ]
};