import root from './root.vue'
import Vue from 'vue'
import page from 'page'
import plugins from 'plugins/index.es6'

let Root = Vue.extend(root)

/**
 * 程序初始化函数
 * @function init
 * @param {Object} options - 程序启动的配置参数
 * @param {string} [options.el=#appRoot] - 根组件挂载位置，遵守CSS选择符规范
 * @param {string} [options.context=/] - 程序的根路径，用于识别视图
 * @param {string} [options.locale=zh_CN] - 国际化地区信息，用于国际化文件识别
 * @tutorial index
 */
let init = function ({locale='zh_CN'}) {
    page.base('/')
    page('/', () => {
        
    })
    //  用于错误处理
    page('*', (context, next) => {
        console.debug(context)
    })
    //  启动路由
    page()
    //  启用国际化插件
    Vue.use(plugins.MessagePlugin, {locale})
    //  启动国际化配置
    new Root({
        el : '#appRoot',
        data : {
            message : 'Child'
        }
    })
}
init({
    locale : 'zh_CN'
})
