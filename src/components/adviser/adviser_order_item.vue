<template>
    <div id="adviser_order_item">
        <!-- <router-link :to="{name:'customizedOrderDetail',params:{order_sn:item.order_sn}}"> -->
        <!-- <tab>
            <tab-item :selected="selected === 0" @on-item-click="onItemClick(0)">
                <p class="route">全部订单</p>
            </tab-item>
            <tab-item :selected="selected === 1" @on-item-click="onItemClick(1)">
                <p class="route">未回复</p>
            </tab-item >
            <tab-item :selected="selected === 2" @on-item-click="onItemClick(2)">
                <p class="route">已回复</p>
            </tab-item>
        </tab>
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div class="item" v-else v-for="(item,index) in result" :key="index" @click="detail(item.order_sn)">
            <orderItemTem :item="item"></orderItemTem> -->
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
        <!-- </div> -->
        <adviserOrderTem :result=result @update="updateOrder"></adviserOrderTem>
    </div>
</template>

<script>

    import api from "../../api/customized"
    import nosearch from "@/components/nosearch/index.vue"
    import orderItemTem from "@/components/customized/order_item_tem.vue"
    import {Tab,TabItem} from 'vux'
    export default {
        name:'adviser_order_item',
        data(){
            return{
                result:[],
                selected:0,
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
                this.$router.push({'name':'replyOrderDetail',params:{'sn':order_sn}});
            },
            queryReceiptOrder(index){
                api.queryReceiptOrder({'type':index})
                .then(res=>{
                    console.log(res.data);
                    this.result=res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            onItemClick(index){
                this.result=[];
                this.queryReceiptOrder(index);
            },
            updateOrder(data){
                this.result=[];
                this.queryReceiptOrder(data);
            }
        },
        mounted(){
            // api.queryCustomizedOrder()
            // .then(res=>{
            //     console.log(res.data);
            //     this.result=res.data;
            // })
            // .catch(err=>{
            //     console.log(err);
            // })
            this.queryReceiptOrder(0);
        },
        components:{
            nosearch,
            orderItemTem,
            Tab,
            TabItem,
        }
    }
</script>

<style scoped>
    #adviser_order_item{
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