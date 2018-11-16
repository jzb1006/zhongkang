<template>
    <div id="map">
        <!-- 头部 -->
        <top title="医院地图"></top>
        <BMap></BMap>
    </div>
</template>
<script>
    import top from "@/components/decorate/top_back_title.vue";
    import BMap from "@/components/map/index.vue";
    export default {
        
        components: {
            top,
            BMap
        },
        methods: {
           
        },
        mounted() {
           
        }
    }
</script>
<style>

</style>