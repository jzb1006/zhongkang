<template>
    <!-- <comment></comment> -->
    <comment :info = info></comment>
</template>
<script>
import comment from './comment'; 
export default {
    data(){
        return{
            info:{}
        }
    },
    components:{
        comment
    },
    mounted(){
        this.info = this.$route.params;
    }

}
</script>
<style scoped>
    
</style>
