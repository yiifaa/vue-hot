import root from './root.vue'
import Vue from 'vue'

let Root = Vue.extend(root)
new Root({
    el : '#appRoot',
    data : {
        message : 'Child'
    }
})
