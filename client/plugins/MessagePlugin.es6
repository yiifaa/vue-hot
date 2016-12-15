import $ from 'jquery'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import locales from 'configs/I18nConfig.es6'

/**
 * 国际化信息处理插件
 * @namespace {Object} plugins.MessagePlugin
 * @name plugins.MessagePlugin
 */
export default {

    /**
     * 安装插件相关组件
     * @function
     * @memberof plugins.MessagePlugin
     */
    install (Vue, options) {
        let locale = options.locale
        if(!locale) {
            throw new Error('locale can\'t be null!')
        }
        //	启用插件
        Vue.use(VueI18n)
        Vue.config.lang = locale
        //	获取键值
        Object.keys(locales).forEach(lang => {
            Vue.locale(lang, locales[lang])
        })
        /**
         * 全局方法的国际化消息资源获取方法
         * @function message
         * @name Vue.method.message
         * @param key - 国际化消息主键
         * @param args - 国际化消息参数
         * @returns String - 当前时区的国际化信息
         */
        Vue.message = (key, args) => Vue.t(key, locale, args)
        
        /**
         * 获取资源信息，格式针对于　{'sti.buttons' : ['args']}
         * @function getMessage
         * @name Vue.method.getMessage
         * @param key - 国际化消息主键
         * @returns String - 当前时区的国际化信息
         */
        Vue.getMessage = function(key) {
            let args = null,
                k	= key
            if($.type(key) === 'object') {
                k = Object.keys(key)[0]
                args = key[k]
            }
            return Vue.message(k, args)
        }
        //
        this.installDirective(Vue, options)
        this.installComponent(Vue, options)
    },

    /**
     * 安装指令
     */
    installDirective (Vue, options) {

        /**
         * 添加message指令，根据参数自动添加上下文指令
         * @member {directive}
         * @memberof Vue.directive
         * @name message
         */
        Vue.directive('message', {

            bind (el, binding) {
                let value = binding.value,
                    message = Vue.getMessage(value)
                $(el).text(message)
            }

        })

        /**
         * 安装placeholder指令，用于输入框的placeholder提示信息
         * @member directive
         * @memberof Vue.directive
         * @name placeholder
         */
        Vue.directive('placeholder', {

            bind (el, binding) {
                let value = binding.value,
                    message = Vue.getMessage(value)
                $(el).attr('placeholder', message)
            }

        })
    },

    /**
     * 安装组件
     */
    installComponent (Vue, options) {
        let template = '<span v-html="message"></span>'
        /**
         * 输出国际化提示信息，外部标签为span
         * @member component
         * @memberof Vue.component
         * @name message
         * @prop {string} keys - 国际化文件中注册的组件，如sti.title
         * @tutorial component-message
         */
        Vue.component('message', {

            template,

            props : {
                
                keys : {
                    type : String,
                    required : true
                }
            },

            computed : {
                message () {
                    return Vue.getMessage(this.keys)
                }
            }
        })
    }

}