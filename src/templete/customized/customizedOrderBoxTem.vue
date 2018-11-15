<template>
    <div id="customizedOrderBoxTem">
        <tab>
            <tab-item :selected="params.selected === 0" @on-item-click="params.onItemClick(0)">
                <p class="route">全部订单</p>
            </tab-item>
            <tab-item :selected="params.selected === 1" @on-item-click="params.onItemClick(1)">
                <p class="route">未付款</p>
            </tab-item >
            <tab-item :selected="params.selected === 2" @on-item-click="params.onItemClick(2)">
                <p class="route">已付款</p>
            </tab-item>
        </tab>
        <div v-if="params.result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div v-else class="content">
            <!-- <order-item-tem v-for="(value,index) in result" :key="index" :item=value class="item" @click.native="detail(value.order_sn)"></order-item-tem> -->
            <div class="item" v-for="(item,index) in params.result" :key="index" @click="params.detail(item.order_sn)">
                <order-item-tem :item="item"></order-item-tem>
            </div>
            <LoadMore :state='params.hasMore' :isLoading='params.isBusy' @loadmore="params.query" class="bg"></LoadMore>
        </div>
        <div id="fill"></div>
    </div>

</template>
<script>
    import api from "../../api/customized"
    import orderItem from '@/components/customized/order_item'
    import nosearch from "@/components/nosearch/index.vue"
    import {Tab,TabItem} from 'vux'
    import LoadMore from '@/components/loadMore/index.vue'
    import orderItemTem from "@/components/commonTemplete/orderItemTem.vue"
    export default {
        name:'customizedOrderBoxTem',
        data(){
            return{
                // title:'定制订单',
                // result:[],
                // selected:0,
                // hasMore: 0,
                // isBusy: false,
                // page:1,
                // type:0,
            }
        },
        props:{
            params:{
                type:Object,
            }
        },
        // methods:{
        //     url(i){
        //         return api.imgUrl()+i;
        //     },
        //     detail(order_sn){
        //         this.$store.dispatch('changeOrderSn',order_sn);
        //         // this.$router.push({name:'customizedOrderDetail'});
        //         this.$router.push('/customizedOrderDetail');
        //     },
        //     queryCustomizedOrder(index){
        //         // console.log(index);
        //         this.isBusy = true;
                
        //         // this.num=5;
        //         // let Num=this.num;
        //         // console.log(this.num);
        //         api.queryCustomizedOrder({'type':index,'num':this.params.num,'page':this.page})
        //         .then(res=>{
        //             console.log(res);
        //             if(res.data!=''){
        //                 let data=res.data;
        //                 // this.result=res.data;
        //                 this.result = this.result.concat(data);
        //                 this.hasMore = data[0].hasMore;
        //                 this.isBusy=false;
        //             }else{
        //                 this.isBusy=true;
        //                 this.hasMore=0;
        //             }
        //         })
        //         .catch(err=>{
        //             console.log(err);
        //         })
                
        //     },
        //     onItemClick(index){
        //         this.result=[];
        //         this.type=index;
        //         this.page=1;
        //         this.queryCustomizedOrder(index);
        //     },
        //     query(){
        //         this.page=this.page+1;
        //         this.queryCustomizedOrder(this.type);
        //     },
        // },
        // mounted(){
        //     this.queryCustomizedOrder(0);
        // },
        components:{
            nosearch,
            orderItem,
            Tab,
            TabItem,
            LoadMore,
            orderItemTem
        }
    }
</script>
<style scoped>
    #customizedOrderBoxTem{
        background:#f0f0f0; 
        min-height:100%;
        height:auto;
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
