<template>
    <div id="item">
        <div>
            <div v-for="(item,index) in list" :key="index">
                <router-link :to="{ name: route_link, query: {id:container_id, orderSn: item['order_sn'] }}" tag="div">
                    <panelOrder :date="item['add_time']" :status="item['status']" :path="item['goods'][0]['goods_thumb']" :title="item['goods'][0]['goods_name']" :price="item['total_fee']" :goodsNumber="item['goods_number']" :totalPrice="item['order_amount']">
                    </panelOrder>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import panelOrder from "@/components/order/panel_order.vue";
    export default {
        data() {
            return {
            };
        },
        props: {
            list: {
                type: [Object, Array]
            },
            route_link:{
                type:'',
                default:''
            },
            container_id:{
                 type:'',
                default:''
            }
        },
        methods: {
        },
        components: {
            panelOrder,
        },
    };
</script>
<style>
    #item {
        background: #e5e5e5;
    }
</style>