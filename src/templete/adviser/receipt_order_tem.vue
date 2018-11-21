<template>
    <div id="receipt_order_tem">
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div class="item" v-else v-for="(item,index) in result" :key="index" @click="detail(item.order_sn)">
            <!-- <orderItemTem :item="item"></orderItemTem> -->
            <div class="order_item_tem">
                <div class="time">
                    <span class="l">{{item.update_time}}</span>
                    <span class="status">{{item.status}}</span>
                </div>
                <div class="container vux-1px-tb">
                    <div class="images">
                        <img :src="url(item.photo[0])" class="img">
                    </div>
                    <div class="desc">
                        <p>
                            <span v-for="(i,index) in item.category" :key="index.id" class="span">{{i.name}}</span>
                        </p>
                        <p>{{item.lastname}}女士</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import api from "../../api/customized"
    import nosearch from "@/components/nosearch/index.vue"
    import Loading from "@/components/decorate/loading.vue"
    import orderItemTem from "@/components/commonTemplete/order_item_tem.vue"
    export default {
        name:'receipt_order_tem',
        data(){
            return{
                
            }
        },
        props:{
            result:{
                type:[Object,Array],
                default(){
                    return [];
                }
            }
        },
        methods:{
            url(i){
                return api.imgUrl()+i;
            },
            detail(order_sn){
                this.$store.dispatch('changeOrderSn',order_sn);
                // this.$router.push({'path':'/replyOrderDetail',query:{'order_sn':order_sn}});
                this.$router.push({name:'container',query:{id:'54','order_sn':order_sn}});
            },
            // queryAdviserOrder(){
            //     api.queryAdviserOrder().then(res=>{
            //         console.log(res);
            //         this.result=res.data;
            //         this.loadinging=false;
            //     }).catch(err=>{
            //         console.log(err);
            //     })
            // },
        },
        mounted(){
            // this.queryAdviserOrder();
        },
        components:{
            nosearch,
            orderItemTem,
            Loading
        }
    }
</script>

<style scoped>
    #receipt_order_tem{
        background:#f0f0f0;
        min-height:100%;
        height:auto;
        font-size:.35rem;
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
    .order_item_tem{
        padding:.2rem .3rem;
    }
    .time{
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
        /* vertical-align: top; */
    }
    
    .span{
        vertical-align: top;
        display:inline-block;
        margin:0 .1rem .1rem 0;
    }
</style>