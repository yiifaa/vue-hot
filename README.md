Webpack Hot Reload
-----------------------
Webpack热加载模板，实现编辑即所见效果。
1. [DEMO访问地址](https://yiifaa.github.io/webpack-hotload/index.html)。
2. [API文档地址](https://yiifaa.github.io/webpack-hotload/docs/api/webpack-hot/1.0.0/index.html)。



## 1. 原因
> 现有的模板都不满足要求，不是缺少模块，就是限制太多，无论管理、维护、拓展与学习都非常麻烦。

## 2. 特性
1. 支持第三方的库的AMD加载；
2. 支持多入口webpack编译；
3. 支持Vue等端对端的解决方案；
4. 支持yaml配置文件；
5. 支持生成API文档与Tutorial文档；

## 3. 运行方式
```bash
#   启动调试模式
npm run dev
#   启动生产模式
#   支持github网站发布
npm run build
#   生成JSDOC
#   支持ES6、JS文件，暂不支持vue文件
npm run jsdoc
```

## 4. 架包引入方式
本版本的架包输出方式为var(全局)，引入方式也为全局，需要在自定义代码之前引入，方式如下：
```xml
<!--依赖的架包-->
<script src="dist/node_modules/jquery/dist/jquery.min.js"></script>
<!--项目输出的架包-->
<script src="dist/main.js"></script>
```

## 5. 代码示例
### 6.1 引入LESS的方式
```javascript
#   直接引入即可，需要加前缀，地址为相对地址
#   CSS、LESS类似
import './index.less'
```
### 6.2 引入HTML模板的方式
```javascript
#   支持文件名自动识别，无需添加任何前缀
import template from './index.html'
```

### 6.3 引入vue模板的方式
```javascript
#   请按照Vue模板的规范编写
import hello from './components/Hello.vue'
#   返回的对象是{ Object }格式，不能直接初始化，只能作为子组件
#   必须先引入才能使用，如下：
components : {
    hello
}
#   更多写法请参考例子es6/index.es6
```

## 6. 问题说明
将libraryTarget改为“amd”后，发现动态加载main.js错误，生成的动态代码与编译构建后的代码相差非常巨大（相差大约1200多行代码），得到的对象完全不是源码导出的对象，而是具有subscrib等属性的新对象，具体代码如下：
```javascript
module.exports = {
    subscribeAll: function subscribeAll(handler) {
      subscribeAllHandler = handler;
    },
    subscribe: function subscribe(handler) {
      customHandler = handler;
    },
    useCustomOverlay: function useCustomOverlay(customOverlay) {
      if (reporter) reporter.useCustomOverlay(customOverlay);
    }
};
```
所以，从目前来看，“webpack-hot-middleware”暂不支持amd方式的热加载，估计与以下原因有关，正在继续研究。
```
As of version 2.0.0, all client functionality has been rolled into this module. This means that you should remove any reference to webpack/hot/dev-server or webpack/hot/only-dev-server from your webpack config. Instead, use the reload config option to control this behaviour.

This was done to allow full control over the client receiving updates, which is now able to output full module names in the console when applying changes.
```
