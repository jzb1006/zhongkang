<template>
    <div id="hospital_detail">
        <!-- 头部 -->
        <top title="医院详情"></top>
        <!-- 医院详情头部 -->
            <detaileHead></detaileHead>
        <!-- 内容 -->
       
            <!-- 定位 -->
            <mapBox> </mapBox>
            <!-- 商品列表 -->
           
            <recommend></recommend>
            
            <!-- 医生列表 -->
           
            <docBox></docBox>
           
            
            <!-- 商家相册 -->
           
            <business ></business>
                <!-- <div class="business-info"><span>营业时间：{{ins_info['office_hours']}}</span></div> -->
           
            <!-- 商家日记 -->
           
               <diary></diary>
       
 <div id="fill"></div>
       
    </div> 
</template>
<script>

    import detaileHead from "@/components/hospital/header.vue";
    import top from "@/components/decorate/top_back_title.vue";
    import docBox from '@/components/hospital/doctor_box.vue'
    import diary from '@/components/hospital/diary_box.vue'
    import business from '@/components/hospital/business_box.vue'
    import mapBox from '@/components/hospital/map_box.vue'
    import recommend from '@/components/hospital/recommend_box.vue';
    export default {
        components: {
            top,
            diary,
            docBox,
            recommend,
            business,
            mapBox,
            detaileHead
        }
    }
</script>
<style>

.main {
    background: #f3f7f7;
    overflow-x: hidden;
}
</style>