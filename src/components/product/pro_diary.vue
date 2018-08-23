<template>
        <div id="proDiary">
            <p class="top">
                <top title="项目日记"></top>
            </p>
            
            <diary :cid=cid :query=true></diary>
        </div>
</template>
<script>
import diary from './../diary/diary_list'
import top from "@/components/decorate/top_back_title.vue";

export default {
    data(){
        return {
            cid:"",
        }
    },
    components:{
        top,
        diary,
    },
    created(){
        this.cid = this.$route.query.cid;
    }
}
</script>
<style scoped>

</style>
