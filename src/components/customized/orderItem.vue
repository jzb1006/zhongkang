<template>
    <div id="orderItem">
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div v-else>
            <div class="item" v-for="(item,index) in result" :key="index" @click="detail(item.order_sn)">
            <order-item-tem :item="item"></order-item-tem>
            <!-- <div class="time">
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
            <order-item v-for="(value,index) in result" :key="index" :item=value class="item" @click.native="detail(value.order_sn)"></order-item> -->
        <!-- </router-link> -->
            </div>
            <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query" class="bg"></LoadMore>

        </div>
        
    </div>
</template>

<script>

    import api from "../../api/customized"
    import nosearch from "@/components/nosearch/index.vue"
    import orderItemTem from "@/components/commonTemplete/orderItemTem.vue"
    import {Tab,TabItem} from 'vux'
    import LoadMore from '@/components/loadMore/index.vue'
    import Bus from "@/assets/bus.js";
    export default {
        name:'orderItem',
        data(){
            return{
                result:[],
                selected:0,
                hasMore: 0,
                isBusy: false,
                page:1,
                index:0,
            }
        },
        props:{
            params:{
                type:Object,
            }
        },
        methods:{
            url(i){
                return api.imgUrl()+i;
            },
            detail(order_sn){
                this.$store.dispatch('changeOrderSn',order_sn);
                // this.$router.push({name:'customizedOrderDetail'});
                this.$router.push('/customizedOrderDetail');
            },
            queryCustomizedOrder(index){
                this.isBusy = true;
                api.queryCustomizedOrder({'type':index,'num':this.params.num,'page':this.page})
                .then(res=>{
                    console.log(res);
                    if(res.data!=''){
                        let data=res.data;
                        // this.result=res.data;
                        this.result = this.result.concat(data);
                        this.hasMore = data[0].hasMore;
                        this.isBusy=false;
                    }else{
                        this.isBusy=true;
                        this.hasMore=0;
                    }
                    
                })
                .catch(err=>{
                    this.isBusy=false;
                    console.log(err);
                })
            },
            query(){
                this.page=this.page+1;
                this.queryCustomizedOrder(this.index);
            },
        },
        mounted(){
            Bus.$on('changeOrderIndex',res=>{
                console.log(res);
                this.index=res;
                this.result=[];
                this.page=1;
                this.queryCustomizedOrder(this.index);
            })
            this.result=[];
            this.page=1;
            this.queryCustomizedOrder(0);
        },
        beforeDestroy(){
            Bus.$off('changeOrderIndex');
        },
        components:{
            nosearch,
            orderItemTem,
            LoadMore,
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