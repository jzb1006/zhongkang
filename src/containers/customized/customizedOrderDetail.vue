<template>
  <div id="customizedOrderDetail">
        <top :params="{title:'订单详情'}"></top>
        <order-detail-item></order-detail-item>
        <customized-order-operation></customized-order-operation>
        <!-- <div class="juli"></div>
        <div class="footer vux-1px-t">
            <div :key="indexs" v-for="(items,indexs) in order_btn['button_text']">
                <div v-if="items['type']==0">
                  <div class="reply vux-1px"  @click="change_action(items['name'],order_btn['order_sn'],order_btn['status'],items['text'])">{{items['text']}}</div>
                </div>
                <div v-else-if="items['type']==1">
                    <router-link v-if="items['route'] == 'applyRefund'" :to="{name:'customized_applyRefund',params:{tt:'tuikuan',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="reply vux-1px">{{items['text']}}</div>
                    </router-link>
                    <router-link v-if="items['route'] == 'appeal' " :to="{name:'customized_appeal',params:{tt:'shensu',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="reply vux-1px">{{items['text']}}</div>
                    </router-link>
                    <div class="reply vux-1px" v-if="items['route'] == 'pay' " @click="fastpay1(order_btn['order_sn'])">{{items['text']}}</div>
                    <span class="reply vux-1px" v-if="items['route'] == 'ask' " @click="ask(result.order_sn,result.adviser_id,result.user_id)">{{items['text']}}</span>
                    <span class="reply vux-1px" v-if="items['route'] == 'viewReply' " @click="reply(result.order_sn)">{{items['text']}}</span>
                </div>
            </div>
        </div> -->
        <!-- <pay :params="params"></pay> -->
  </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
//   import api from './../../api/customized'
//   import Bus from '@/assets/bus.js'
//   import apiOrder from "../../api/order";
  import orderDetailItem from '@/components/customized/orderDetailItem.vue'
  import customizedOrderOperation from '@/components/customized/customizedOrderOperation.vue'
//   import pay from "@/components/common/pay.vue"
//   import {mapGetters} from 'vuex'
  export default {
    name: 'customizedOrderDetail',
    data(){
        return{
            // order_sn:'',
            // result:[],
            // order_btn:[],
            // show_pay_page:false,
            // params1:{
            //     title:'订单详情',
            // },
        }
    },
    computed:{
        // ...mapGetters([
        //     'getOrderSn',
        // ]),
        // params(){
        //     return {
        //         show_pay_page:this.show_pay_page,
        //         order_sn:this.result.order_sn,
        //         order_amount:this.result.order_amount,
        //         jump_url:"http://192.168.0.110:8080/#/customizedOrder",
        //         subject:"4",
        //     }
        // }
    },
    methods:{
        // $_ajax_order_detail(){
        //     api.customizedOrderDetail({'order_sn':this.order_sn}).then(res=>{
        //         console.log(res);
        //         this.result=res.data;
        //         sessionStorage.setItem('user_id',res.data.user_id);
        //         sessionStorage.setItem('adviser_id',res.data.adviser_id);
        //         sessionStorage.setItem('order_sn',res.data.order_sn);
        //         this.order_btn = res.data.order_action;
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        // },
        // reply(order_sn){
        //     this.$router.push({name:'viewReply',params:{'order_sn':order_sn}})
        // },
        // ask(order_sn,adviser_id,user_id){
        //     // console.log(adviser_id);
        //     // this.$store.dispatch('changeOtherId',adviser_id);
        //     sessionStorage.setItem('direction',0);
        //     this.$router.push({name:'ask',params:{'order_sn':order_sn,'adviser_id':adviser_id,'user_id':user_id,'direction':0}})
        // },
        // fastpay(order_sn) {
        //     api.cuspay({'order_sn':order_sn}).then(res=>{
        //         console.log(res);
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        //     this.$router.push("/customizedOrder");
        // },
        // fastpay1(){
        //     this.show_pay_page=true;
        // },
        // cancel(){
        //     this.show_pay_page=false;
        // },
        // change_action(action_name,order_sn, status, order_avtion) {
        //     var self = this;
        //     var action_name = action_name;
        //     var order_id = order_sn;
        //     var status = status;
        //     var order_avtion = order_avtion;

        //     api.refund({
        //         'id': order_id,
        //         'type': action_name,
        //         'status': status,
        //         'order_avtion': order_avtion
        //     }).then(res => {
        //         var msg = res.data.msg;
        //         var errcode = res.data.error;
        //         self.changeShow = true
        //         self.alertText = msg
        //         if (errcode == 0) {
        //             self.alerttType = 'warn'
        //         }
        //         self.$_ajax_order_detail()
        //         console.log(res);
        //     }).catch(error => {
        //         console.log(error);
        //     })
        // },
    },
    mounted(){
        // this.order_sn=this.getOrderSn;
        // this.$_ajax_order_detail();
        // Bus.$on('showPay',res=>{
        //     console.log(res);
        //     this.show_pay_page=res;
        // })
    },
    beforeDestroy () {
        // Bus.$off('showPay');
        // Bus.$off('hidePay');
    },
    components:{
        top,
        // pay,
        orderDetailItem,
        customizedOrderOperation
    }
  }
</script>
<style scoped>
    #customizedOrderDetail{
        font-size:.35rem;
    }
    /* .content{
        margin-bottom:1.5rem;
    }
    .img{
        width:1rem;
        height:1rem;
    }
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height:.8rem;
        padding: 0.2rem 0px;
        background: #fff;
    }
    .reply{
        height: 0.6rem;
        font-size: 0.22rem;
        float: right;
        color: #000000;
        line-height: 0.6rem;
        border-radius: 0.04rem;
        text-align: center;
        margin-left: 0.1rem;
        padding: 0.1rem;
        margin-right:0.15rem;
    } */
</style>