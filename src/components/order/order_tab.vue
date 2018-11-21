<template>
    <div>
        <tab>
            <tab-item selected @on-item-click="onItemClick(0)">
                <p class="route">全部订单</p>
            </tab-item>
            <tab-item  @on-item-click="onItemClick(1,'未付款')">
                <p class="route">未付款</p>
            </tab-item>
            <tab-item  @on-item-click="onItemClick(2,'已付款')">
                <p class="route">已付款</p>
            </tab-item>
        </tab>
    </div>
</template>

<script>
import { Tab, TabItem } from "vux";
export default {
    components:{
        Tab,
        TabItem
    },
    methods: {
        onItemClick(type, orderName = "") {
            let data = {
                type: type,
                orderName: orderName
            };
            this.$emit("changeItem", data);
        }
    }
};
</script>

<style>
</style>
