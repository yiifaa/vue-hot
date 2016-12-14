<template>
    <main class="container">
        <H1 v-text="message"></H1>
        <hello></hello>
        <button class="btn btn-default" v-text="age"></button>
    </main>
</template>
<script>
    /** 神奇的地方，根节点不能动态修改JS **/
    import hello from './components/hello.vue'
    export default {
        
        data () {
            return {
                message : 'Hello,World!',
                age : 'Save User'
            }
        },
        
        components : {
            hello
        }
    }
</script>