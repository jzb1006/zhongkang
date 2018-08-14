<template>
    <div id="home">
        <router-view></router-view>
     <foot></foot>
    </div>
</template>
<script>
    import foot from "@/components/common/foot.vue";
    export default {
        components: {
            foot,
        },
    }
</script>
<style>
    @import "../../assets/css/Base.css";
</style>