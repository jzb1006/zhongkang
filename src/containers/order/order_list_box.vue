<template>
    <div id="order_list_box">
        <top title="订单列表"></top>
        <orderList></orderList>
    </div>
</template>
<script>
import orderList from '@/components/order/order_list.vue'
import top from "@/components/decorate/top_back_title.vue";
export default {
    components:{
        top
    }
}
</script>
<style scoped>

</style>


