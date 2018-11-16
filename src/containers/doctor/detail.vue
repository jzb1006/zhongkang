<template>
    <div id="doctor_info">
        <!-- 头部 -->
        <top title="医生详情"></top>
        <!-- 医生详情头部 -->
        <detaileHead></detaileHead>
        <!-- 内容 -->
        <!-- 所在医院 -->
        <mapBox></mapBox>
        <!-- 商品列表 -->
        <recommend></recommend>
        <!-- 医生日记 -->
        <diary></diary>
        <div id="fill"></div>
    </div>
</template>
<script>
    import detaileHead from "@/components/doctor/header.vue";
    import defaultImg from "@/components/decorate/default_img.vue";
    import recommend from '@/components/doctor/recommend_box.vue';
    import diary from '@/components/doctor/diary_box.vue'
    import mapBox from '@/components/doctor/map_box.vue'
    import top from "@/components/decorate/top_back_title.vue";
    export default {
        components: {
            top,
            diary,
            detaileHead,
            recommend,
            mapBox
        }
    }
</script>
<style>
</style>