<template>
    <h1 v-text="age" style="border:1px solid blue;"></h1>
</template>
<script>
    import './hello.less'
    export default {
        
        data () {
            return {
                age : 300
            }
        }
    }
</script>