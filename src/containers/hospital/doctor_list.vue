<template>
    <div id="doc_list">
        <!-- 头部 -->
        <top :title="'医生列表'"></top>
         <doctor></doctor>
        
    </div>
</template>
<script>
 import top from "@/components/decorate/top_back_title.vue";
 import doctor from '@/components/hospital/doctor_list.vue'


export default {
    components:{
        top,
        doctor,
        
    }
}
</script>
<style>
</style>