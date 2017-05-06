let http = require('http'),
    express = require('express'),
    webpack = require('webpack'),
    configs = require('./config'),
    app = express()

//  准备webpack配置信息
let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=10000&reload=true',
    wpConfig = require('./webpack.config'),
    //  准备修改配置信息
    entries = Object.keys(wpConfig.entry)

//  添加热加载信息
entries.forEach((key) => {
    wpConfig.entry[key].push(hotMiddlewareScript);
})
//  添加插件信息
if(wpConfig.plugins === undefined) {
    wpConfig.plugins = []
}
//  添加热加载插件
wpConfig.plugins.push(
     new webpack.optimize.OccurrenceOrderPlugin(),
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoEmitOnErrorsPlugin())

//  获取编译器
let compiler = webpack(wpConfig)

app.use(require('morgan')('short'))
//  启动中间件
//  激活开发中间件
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,    
    //  必不可少
    publicPath: '/static/'
}));

app.use(require("webpack-hot-middleware")(compiler, {
    log: console.error,
    //path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

//  单页面应用
app.get("/", function(req, res) {
  res.sendFile(configs.context + '/index.html');
});

//  启动服务器
let server = http.createServer(app);
server.listen(80, function() {
    console.log("Listening on %j", server.address())
});



