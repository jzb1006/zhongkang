<template>
    <div id="docDiary">
        <div class="head">
            <p class="top">
                <top title="医生日记"></top>
            </p>
        </div>
        <diary :docId=doc_id :query=true></diary>
    </div>
</template>
<script>
import diary from './../diary/diary_list'
import top from "@/components/decorate/top_back_title.vue";

export default {
    data(){
        return {
            doc_id:"",
        }
    },
    components:{
        top,
        diary,
    },
    created(){
        console.log(this.$route.query.doc_id);
        this.doc_id = this.$route.query.doc_id;
    }
}
</script>
<style scoped>
#docDiary .head{
    height: 1rem;
}
#docDiary > p.top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 0.35rem;
    text-align: center;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #ccc;
    background-color: rgb(255, 83, 112);
    z-index: 999;
}
</style>
