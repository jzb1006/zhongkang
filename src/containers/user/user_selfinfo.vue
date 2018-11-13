<template>
    <div id="user_selfinfo">
        <top :params="{title:'个人信息'}"></top>
        <selfinfo></selfinfo>
    </div>
</template>

<script>
// import top from "@/components/decorate/top.vue";
// import selfinfo from '@/components/user/selfinfo.vue'

export default {
    name: 'user_selfinfo',
    components:{
        // top,
        // selfinfo,
    }
}
</script>
<style>

</style>
<style scoped>
    #user_selfinfo{
        background:#f0f0f0;
    }
</style>
