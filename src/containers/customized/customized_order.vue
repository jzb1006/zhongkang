<template>
    <div id="customized_order">
        <top :params="params"></top>
        <customizedOrderBox :params="{'num':6}"></customizedOrderBox>
        
        <!-- <div id="fill"></div> -->
    </div>
</template>
<script>
    // import top from "@/components/decorate/top.vue"
    // import orderItem from '@/components/customized/orderItem'
    // import tab from '@/components/customized/tab'
    // import Bus from "@/assets/bus.js";
    export default {
        name:'customized_order',
        data(){
            return{
                params:{
                    title:'定制订单',
                }
            }
        },
        components:{
            // top,
            // orderItem,
            // tab,
        },
        // beforeDestroy(){
        //     Bus.$off('changeOrderIndex');
        // },
    }
</script>
<style scoped>
    /* #customizedOrder{
        background:#f0f0f0; 
        min-height:100%;
        height:auto;
    } */
</style>
