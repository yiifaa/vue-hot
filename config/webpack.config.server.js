var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    buildConfig = require('./webpack.config'),
    webpack = require('webpack')
    entries = Object.keys(buildConfig.entry);
//  添加热加载信息
entries.forEach((key) => {
    buildConfig.entry[key].push(hotMiddlewareScript);
});
//  添加热加载插件
/**
buildConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin(),
                 new webpack.HotModuleReplacementPlugin(),
                 new webpack.NoErrorsPlugin());
                 **/
//  导出热加载配置
module.exports = buildConfig