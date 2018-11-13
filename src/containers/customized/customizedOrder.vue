<template>
    <div id="customizedOrder">
        <top :params="params"></top>
        <tab></tab>
        <order-item :params="{'num':6}"></order-item>
        <div id="fill"></div>
    </div>
</template>
<script>
    import top from "@/components/decorate/top.vue"
    import orderItem from '@/components/customized/orderItem'
    import tab from '@/components/customized/tab'
    // import Bus from "@/assets/bus.js";
    export default {
        name:'customizedOrder',
        data(){
            return{
                params:{
                    title:'定制订单',
                }
            }
        },
        components:{
            top,
            orderItem,
            tab,
        },
        // beforeDestroy(){
        //     Bus.$off('changeOrderIndex');
        // },
    }
</script>
<style scoped>
    #customizedOrder{
        background:#f0f0f0; 
        min-height:100%;
        height:auto;
    }
</style>
