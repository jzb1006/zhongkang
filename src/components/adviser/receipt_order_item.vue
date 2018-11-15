<template>
    <div id="receipt_order_item">
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div class="item" v-else v-for="(item,index) in result" :key="index" @click="detail(item.order_sn)">
            <order-item-tem :item="item"></order-item-tem>
        </div>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>

    import api from "../../api/customized"
    import nosearch from "@/components/nosearch/index.vue"
    import Loading from "@/components/decorate/loading.vue"
    import orderItemTem from "@/components/commonTemplete/orderItemTem.vue"
    export default {
        name:'receipt_order_item',
        data(){
            return{
                result:[],
                loadinging:true,
            }
        },
        // props:{
        //     item:{
        //         type:[Object,Array]
        //     }
        // },
        methods:{
            url(i){
                return api.imgUrl()+i;
            },
            detail(order_sn){
                this.$store.dispatch('changeOrderSn',order_sn);
                this.$router.push({'path':'/replyOrderDetail',query:{'order_sn':order_sn}});
            },
            queryAdviserOrder(){
                api.queryAdviserOrder().then(res=>{
                    console.log(res);
                    this.result=res.data;
                    this.loadinging=false;
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        mounted(){
            this.queryAdviserOrder();
        },
        components:{
            nosearch,
            orderItemTem,
            Loading
        }
    }
</script>

<style scoped>
    #orderItem{
        background:#f0f0f0; 
        min-height:100%;
        height:auto;
        /* padding:.2rem .3rem; */
    }
    .item{
        margin-bottom:.15rem;
        background:#fff;
        font-size:.35rem;
        padding:.2rem .3rem;
    } 
    /* .time{
        padding-bottom:.2rem;
        font-size:.25rem;
    }
    .time::after{
        content:'';
        display:block;
        clear:both;
    }
    .time .l{
        float:left;
    }
    .status{
        float:right;
        color: #ff5370;
    }
    .container{
        padding:.2rem 0;
        height:1.2rem;
    }
    .container::after{
        content:'';
        display:block;
        clear:both;
    }
    .images{
        float:left;
        width:1.2rem;
    }
    .desc{
        float:left;
        width:60%;
    }
     .img{
        width:1rem;
        height:1rem;
    }
    
    .span{
        vertical-align: top;
        display:inline-block;
        margin:0 .1rem .1rem 0;
    } */
</style>