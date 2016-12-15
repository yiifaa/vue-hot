<template>
    <div>
        <h1 v-text="age" style="border:1px solid red;"></h1>
        <app-header></app-header>
    </div>
</template>
<script>
    import './hello.less'
    import appHeader from './appHeader.es6'
    export default {
        
        data () {
            return {
                age : 1300
            }
        },
        
        components : {
            appHeader
        }
    }
</script>