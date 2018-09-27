<template>
    <comment :info = info :commentlist = commentlist :user=user></comment>
</template>
<script>
import comment from './comment'; 
export default {
    data(){
        return{
            commentlist:[],
            user:[],
            info:{},
        }
    },
    components:{
        comment
    },
    mounted(){
        this.info = Object.assign({},this.info,this.$route.params.info);
        this.commentlist.push(this.$route.params.comment);
        this.user.push(this.$route.params.user);
    }

}
</script>
<style scoped>
    
</style>
