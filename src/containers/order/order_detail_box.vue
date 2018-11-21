<template>
    <div id="order_list_box">
        <top title="订单详情"></top>
        <orderDetail></orderDetail>
    </div>
</template>
<script>
import orderDetail from '@/components/order/order_detail.vue'
import top from "@/components/decorate/top_back_title.vue";
export default {
    components:{
        top,
        orderDetail
    }
}
</script>
<style scoped>

</style>