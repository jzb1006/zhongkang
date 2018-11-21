<template>
     <div id="customized_order_box">
    <!--    <tab>
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
        <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div v-else class="content"> -->
            <!-- <order-item-tem v-for="(value,index) in result" :key="index" :item=value class="item" @click.native="detail(value.order_sn)"></order-item-tem> -->
            <!-- <div class="item" v-for="(item,index) in result" :key="index" @click="detail(item.order_sn)">
                <order-item-tem :item="item"></order-item-tem>
            </div>
            <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query" class="bg"></LoadMore>
        </div>
        <div id="fill"></div> -->
        <Loading v-show="Loading"></Loading>
        <customizedOrderBoxTem :result="result" @update="updateOrder"></customizedOrderBoxTem>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query"></LoadMore>
    </div>
    
</template>
<script>
    import api from "../../api/customized"
    import Loading from "@/components/decorate/loading.vue";
    import orderItem from '@/components/customized/order_item'
    import nosearch from "@/components/nosearch/index.vue"
    import {Tab,TabItem} from 'vux'
    import LoadMore from '@/components/loadMore/index.vue'
    import orderItemTem from "@/components/commonTemplete/order_item_tem.vue"
    import customizedOrderBoxTem from "@/templates/customized/customized_orderbox_tem.vue"
    export default {
        name:'customized_order_box',
        data(){
            return{
                title:'定制订单',
                result:[],
                selected:0,
                hasMore: 0,
                isBusy: false,
                page:1,
                type:0,
                Loading:true
            }
        },
        computed:{
            // params1(){
            //     return{
            //         result:this.result,
            //         selected:this.selected,
            //         hasMore: this.hasMore,
            //         isBusy: this.isBusy,
            //         page:this.page,
            //         type:this.type,
            //         onItemClick:this.onItemClick,
            //         query:this.query,
            //         detail:this.detail,
            //     }
            // }
            
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
                console.log(order_sn);
                this.$store.dispatch('changeOrderSn',order_sn);
                this.$router.push({name:'customizedOrderDetail',params:{sn:order_sn}});
                // this.$router.push('/customizedOrderDetail');
            },
            queryCustomizedOrder(index){
                // console.log(index);
                this.isBusy = true;
                
                // this.num=5;
                // let Num=this.num;
                // console.log(this.num);
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
                    this.Loading=false;
                })
                .catch(err=>{
                    console.log(err);
                })
                
            },
            // onItemClick(index){
            //     this.result=[];
            //     this.type=index;
            //     this.page=1;
            //     this.queryCustomizedOrder(index);
            // },
            query(){
                this.page=this.page+1;
                this.queryCustomizedOrder(this.type);
            },
            updateOrder(data){
                this.result=[];
                this.type=data;
                this.page=1;
                this.queryCustomizedOrder(data);
            }
        },
        mounted(){
            this.queryCustomizedOrder(0);
        },
        components:{
            nosearch,
            orderItem,
            Tab,
            TabItem,
            LoadMore,
            orderItemTem,
            customizedOrderBoxTem,
            Loading
        }
    }
</script>

