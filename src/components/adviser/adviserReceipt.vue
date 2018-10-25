<template>
  <div id="adviserReceipt">
        <top title="顾问接单"></top>
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div v-else class="content">
            <Loading v-show="loadinging"></Loading>
            <div>
                <order-item v-for="(value,index) in result" :key="index" :item=value class="item vux-1px-b" @click.native="detail(value.order_sn)"></order-item>
            </div>
        </div>
  </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import orderItem from '@/components/customized/orderItem'
  import api from './../../api/customized'
  import nosearch from "@/components/nosearch/index.vue"
  import Loading from "@/components/decorate/loading.vue"
  export default {
    name: 'adviserReceipt',
    data(){
        return{
            result:[],
            loadinging:true,
        }
    },
    methods:{
        detail(order_sn){
            this.$router.push({path:'/receiptDetail',query:{'order_sn':order_sn}});
        }
    },
    mounted(){
       api.queryAdviserOrder().then(res=>{
           console.log(res);
           this.result=res.data;
           this.loadinging=false;
       }).catch(err=>{
           console.log(err);
       })
    },
    components:{
        top,
        orderItem,
        nosearch,
        Loading
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
    .content{
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
    }
</style>