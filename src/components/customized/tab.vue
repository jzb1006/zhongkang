<template>
    <div id="ordertab">
        <!-- <router-link :to="{name:'customizedOrderDetail',params:{order_sn:item.order_sn}}"> -->
        <tab>
            <tab-item :selected="selected === 0" @on-item-click="onItemClick(0)">
                <p class="route">全部订单</p>
            </tab-item>
            <tab-item :selected="selected === 1" @on-item-click="onItemClick(1)">
                <p class="route">未付款</p>
            </tab-item >
            <tab-item :selected="selected === 2" @on-item-click="onItemClick(2)">
                <p class="route">已付款</p>
            </tab-item>
        </tab>
        
    </div>
</template>

<script>
    import {Tab,TabItem} from 'vux'
    import Bus from "@/assets/bus.js";
    export default {
        name:'ordertab',
        data(){
            return{
                selected:0,
            }
        },
        methods:{
            onItemClick(index){
                Bus.$emit("changeOrderIndex", index);
            }
        },
        beforeDestroy(){
            Bus.$off('changeOrderIndex');
        },
        components:{
            Tab,
            TabItem,
        }
    }
</script>

<style scoped>

</style>
<style>

    .vux-tab .vux-tab-item {
        font-size: 0.3rem!important;
    }
    .vux-tab-container,
    .vux-tab,
    .vux-tab-wrap {
        height: 1rem!important;
    }
    .vux-tab-wrap {
        padding-top: 0.2rem!important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #ff5370!important;
    }
    .vux-tab-ink-bar {
        background-color: #ff5370!important;
    }
    .route {
        height: 1rem;
        line-height: 1rem;
    }
</style>