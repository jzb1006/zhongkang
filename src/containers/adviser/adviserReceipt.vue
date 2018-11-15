<template>
  <div id="adviserReceipt">
        <top :params="params"></top>
        <receipt-order-item></receipt-order-item>
        <!-- <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div v-else class="content">
            
            <div>
                <order-item v-for="(value,index) in result" :key="index" :item=value class="item vux-1px-b" @click.native="detail(value.order_sn)"></order-item>
            </div>
        </div>
        <Loading v-show="loadinging"></Loading> -->
  </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
  import receiptOrderItem from "@/components/adviser/receipt_order_item.vue"
  export default {
    name: 'adviserReceipt',
    data(){
        return{
            params:{
                title:'顾问接单',
            }
        }
    },
    components:{
        top,
        receiptOrderItem
    }
  }
</script>
<style scoped>
    #adviserReceipt{
        background:#f0f0f0;
        min-height:100%;
        height:auto;
        font-size:.35rem;
    }
    /* .content{
        margin-bottom:1.2rem;
    }
    .item{
        margin-bottom:.15rem;
        background:#fff;
        font-size:.35rem;
    }
    .img{
        width:1rem;
        height:1rem;
    } */
</style>