<template>
    <!-- <comment></comment> -->
    <comment :limitnum = '3' :info = info></comment>
</template>
<script>
import comment from './comment'; 
export default {
    data(){
        return{
            info:{
                pid:'12',
                p_name:'小黄',
                comment_type:'diary'
            }
        }
    },
    components:{
        comment
    }
}
</script>
<style scoped>
    
</style>
