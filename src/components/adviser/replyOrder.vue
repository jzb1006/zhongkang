<template>
    <div id="replyOrder">
        <top :title="title"></top>
        <div class="content">
            <order-item v-for="(value,index) in result" :key="index" :item=value class="vux-1px-b item" @click.native="detail(value.order_sn)"></order-item>
        </div>
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
    </div>

</template>
<script>
    import api from "../../api/customized"
    import top from "@/components/decorate/top_back_title.vue"
    import orderItem from '@/components/customized/orderItem'
    import nosearch from "@/components/nosearch/index.vue"
    export default {
        name:'replyOrder',
        data(){
            return{
                title:'已接订单',
                result:[]
            }
        },
        methods:{
            url(i){
                return api.imgUrl()+i;
            },
            detail(order_sn){
                sessionStorage.setItem('order_sn',order_sn);
                this.$router.push({'path':'/replyOrderDetail',query:{'order_sn':order_sn}});
            }
        },
        mounted(){
            api.queryReceiptOrder()
            .then(res=>{
                console.log(res.data);
                this.result=res.data;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        components:{
            top,
            nosearch,
            orderItem
        }
    }
</script>
<style scoped>
    #customizedOrder{
        background:#f0f0f0;
        min-height:100%;
        height:auto;
    }
    .content{
        margin-bottom:1.2rem;
        font-size:.35rem;
    }
    .item{
        background:#fff;
        margin-bottom:.2rem;
    }
    .img{
        width:1rem;
        height:1rem;
    }
</style>