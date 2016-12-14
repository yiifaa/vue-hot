var path = require('path'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    context = path.resolve(__dirname, '../'),
    buildFile = path.resolve(__dirname, './build.yml'),
    libPath = path.resolve(context, 'dist/node_modules/'),
    devPath = path.resolve(context, 'node_modules/'),
    configs;

//  载入配置信息
try {
    configs = yaml.safeLoad(fs.readFileSync(buildFile), 'utf-8');
} catch (e) {
    console.error('解析配置文件出错，请仔细检查build.yml');
}

var dist = path.resolve(context, configs.build.dist),
    src = path.resolve(context, configs.build.src),
    dev = configs.dev,
    web= configs.web;

//  输出结果
module.exports = {
    dist,
    src,
    context,
    libPath,
    devPath,
    dev,
    web
};