<template>
    <div id="insDiary">
        <div class="head">
            <p class="top">
                <top title="医院日记"></top>
            </p>
        </div>
        <diary :insId=ins_id :query=true></diary>
    </div>
</template>
<script>
import top from "@/components/decorate/top_back_title.vue";
import diary from "./../diary/diary_list";
export default {
    data(){
        return {
            ins_id:"",
        }
    },
    components:{
        top,
        diary,
    },
    created(){
        this.ins_id = this.$route.query.ins_id;
    }
}
</script>
<style scoped>
#insDiary .head{
    height: 1rem;
}
</style>
