let path = require('path'),
    configs = require('./config/index')

module.exports = {
    
    entry: {
        main: [path.resolve(configs.src, './index.es6')]
    },
    
    output : {
        path: configs.dist,
        //  必须是绝对地址
        publicPath: 'http://127.0.0.1/static/',
        filename : '[name].bundle.js',
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
            }
        ]
     }
}