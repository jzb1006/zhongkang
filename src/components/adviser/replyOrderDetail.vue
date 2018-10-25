<template>
  <div id="replyOrderDetail">
        <top title="订单详情"></top>
        <detail-item :result="result"></detail-item>
        <div class="footer vux-1px-t">
            <!-- <span class="reply vux-1px" v-if="result['order_status']>=5" @click="answer(result.order_sn,result.user_id,result.adviser_id)">追答</span>
            <span class="reply vux-1px" v-if="result['order_status']==7" @click="reply(result.order_sn,result.order_status)">修改回复</span>
            <span class="reply vux-1px" v-if="result['order_status']==8" @click="reply(result.order_sn,result.order_status)">查看回复</span>
            <span class="reply vux-1px" v-if="result['order_status']==5" @click="huifu(result.order_sn)">回复</span> -->
            <div :key="indexs" v-for="(items,indexs) in order_btn['button_text']">
                <div v-if="items['type']==0">
                  <div class="reply vux-1px"  @click="change_action(items['name'],order_btn['order_sn'],order_btn['status'],items['text'])">{{items['text']}}</div>
                </div>
                <div v-else-if="items['type']==1">
                    <!-- <router-link v-if="items['route'] == 'applyRefund' " :to="{name:'customized_applyRefund',params:{tt:'tuikuan',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="reply vux-1px">{{items['text']}}</div>
                    </router-link> -->
                    <router-link v-if="items['route'] == 'appeal' " :to="{name:'appeal_confirm_consumption',params:{tt:'shensu',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="reply vux-1px">{{items['text']}}</div>
                    </router-link>
                    <!-- <span class="reply vux-1px" v-if="items['route']=='reply'" @click="huifu(result.order_sn)">{{items['text']}}</span> -->
                    <span class="reply vux-1px" v-if="items['route']=='editReply'" @click="reply(result.order_sn,1)">{{items['text']}}</span>
                    <span class="reply vux-1px" v-if="items['route']=='viewReply'" @click="reply(result.order_sn)">{{items['text']}}</span>
                    <span class="reply vux-1px" v-if="items['route']=='answer'" @click="answer(result.order_sn,result.user_id,result.adviser_id)">{{items['text']}}</span>
                    <!--<div class="reply vux-1px" v-if="items['route'] == 'pay' " @click="fastpay(order_btn['order_sn'])">{{items['text']}}</div>
                    <span class="reply vux-1px" v-if="items['route'] == 'ask' " @click="ask(result.order_sn,result.adviser_id)">{{items['text']}}</span>
                    <span class="reply vux-1px" v-if="items['route'] == 'reply' " @click="reply(result.order_sn)">{{items['text']}}</span> -->
                </div>
            </div>
        </div>
  </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from './../../api/customized'
  import detailItem from '@/components/customized/detailItem.vue'
  export default {
    name: 'replyOrderDetail',
    data(){
        return{
            order_sn:'',
            result:[],
            order_btn:[]
        }
    },
    methods:{
        $_ajax_order_detail(){
            api.receiptDetail({'order_sn':this.order_sn}).then(res=>{
                console.log(res);
                this.order_btn = res.data.order_action;
                this.result=res.data;
                sessionStorage.setItem('user_id',res.data.user_id);
                sessionStorage.setItem('adviser_id',res.data.adviser_id);
                sessionStorage.setItem('order_sn',res.data.order_sn);
            }).catch(err=>{
                console.log(err);
            })
        },
        huifu(order_sn){
            this.$router.push({path:'/customizedReply',query:{'order_sn':this.order_sn}})
        },
        reply(order_sn,bool=0){
            sessionStorage.setItem('isHasEdit',bool);
            // sessionStorage.setItem('order_status',order_status);
            this.$router.push({path:'/adviserViewReply',query:{'order_sn':order_sn}})
        },
        answer(order_sn,user_id,adviser_id){
            // this.$store.dispatch('changeOtherId',user_id);
            sessionStorage.setItem('direction',1);
            this.$router.push({name:'ask',params:{'order_sn':order_sn,'user_id':user_id,'adviser_id':adviser_id,'direction':1}})
        },
        change_action(action_name,order_sn, status, order_avtion) {
            var self = this;
            var action_name = action_name;
            var order_id = order_sn;
            var status = status;
            var order_avtion = order_avtion;

            api.refund({
                'id': order_id,
                'type': action_name,
                'status': status,
                'order_avtion': order_avtion
            }).then(res => {
                var msg = res.data.msg;
                var errcode = res.data.error;
                self.changeShow = true
                self.alertText = msg
                if (errcode == 0) {
                    self.alerttType = 'warn'
                }
                self.$_ajax_order_detail()
                console.log(res);
            }).catch(error => {
                console.log(error);
            })
        },
    },
    mounted(){
        this.order_sn=this.$route.query.order_sn;
        this.$_ajax_order_detail();
    },
    components:{
        top,
        detailItem
    }
  }
</script>
<style scoped>
    #replyOrderDetail{
        font-size:.35rem;
    }
    .content{
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
        padding: 0.2rem 0px;
        background: #fff;
    }
    .reply{
        height: 0.6rem;
        font-size: 0.25rem;
        float: right;
        color: #000000;
        line-height: 0.6rem;
        border-radius: 0.04rem;
        text-align: center;
        margin-left: 0.1rem;
        padding: 0.1rem;
        margin-right:0.15rem;
    }
</style>