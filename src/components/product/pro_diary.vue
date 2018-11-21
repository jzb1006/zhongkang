<template>
        <div id="proDiary">
            <diary :cid=cid :query=true></diary>
        </div>
</template>
<script>
import diary from '@/components/diary/diary_list'

export default {
    data(){
        return {
            cid:"",
        }
    },
    components:{
        diary,
    },
    created(){
        this.cid = this.$route.query.cid;
    }
}
</script>
<style scoped>
#proDiary .head{
    height: 1rem;
}
</style>
