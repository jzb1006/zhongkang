<template>
    <div id="insDiary">
        <diary :insId=ins_id :docId=doc_id :query=true></diary>
    </div>
</template>
<script>
import top from "@/components/decorate/top_back_title.vue";
import diary from "./../diary/diary_list";
export default {
    data(){
        return {
            ins_id:"",
            doc_id:"",
        }
    },
    components:{
        top,
        diary,
    },
    created(){
        this.ins_id = this.$route.query.ins_id;
        this.doc_id = this.$route.query.doc_id;
    }
}
</script>
<style scoped>
#insDiary .head{
    height: 1rem;
}
</style>
