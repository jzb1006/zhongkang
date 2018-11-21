<template>
  <div id="receipt_detail">
        <!-- <top :params="{title:'接单详情'}"></top> -->
        <detailItem :result="result"></detailItem>
        <!-- <div class="jiedan" @click="reply(result.order_sn)">接单</div> -->
        <div class="footer vux-1px-t">
            <!-- v-if="result.order_status=='2'" -->
            <span class="reply vux-1px" @click="receipt(result.order_sn)">接单</span>
            <div :key="indexs" v-for="(items,indexs) in order_btn['button_text']">
                <div v-if="items['type']==0">
                  <div class="reply vux-1px"  @click="change_action(items['name'],order_btn['order_sn'],order_btn['status'],items['text'])">{{items['text']}}</div>
                </div>
                <div v-else-if="items['type']==1">
                    <!-- <router-link v-if="items['route'] == 'applyRefund' " :to="{name:'customized_applyRefund',params:{tt:'tuikuan',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="reply vux-1px">{{items['text']}}</div>
                    </router-link>
                    <router-link v-if="items['route'] == 'appeal' " :to="{name:'appeal',params:{tt:'shensu',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="reply vux-1px">{{items['text']}}</div>
                    </router-link>
                    <div class="reply vux-1px" v-if="items['route'] == 'pay' " @click="fastpay(order_btn['order_sn'])">{{items['text']}}</div>
                    <span class="reply vux-1px" v-if="items['route'] == 'ask' " @click="ask(result.order_sn,result.adviser_id)">{{items['text']}}</span>
                    <span class="reply vux-1px" v-if="items['route'] == 'reply' " @click="reply(result.order_sn)">{{items['text']}}</span> -->
                </div>
            </div>
        </div>
  </div>
</template>
<script>
//   import top from '@/components/decorate/top_back_title.vue'
  import api from './../../api/customized'
  import detailItem from '@/components/customized/receipt_detail_item.vue'
  export default {
    name: 'receipt_detail',
    data(){
        return{
            order_sn:'',
            result:[],
            order_btn:[]
        }
    },
    methods:{
        $_ajax_order_detail(){
            console.log(this.order_sn);
            api.receiptDetail({'order_sn':this.order_sn}).then(res=>{
                console.log(res);
                this.result=res.data;
                this.order_btn = res.data.order_action;
            }).catch(err=>{
                console.log(err);
            })
        },
        receipt(order_sn){
            api.receipt({'order_sn':order_sn}).then(res=>{
                if(res.data.error==1){
                    this.$router.push({name:'container',query:{id:'58','order_sn':this.order_sn}})
                }
            }).catch(err=>{
                console.log(err);
            })
            // this.$router.push({path:'/customizedReply',query:{'order_sn':this.order_sn}})
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
        // top,
        detailItem
    }
  }
</script>
<style scoped>
    #receipt_detail{
        font-size:.35rem;
    }
    .content{
        margin-bottom:1.5rem;
    }
    .img{
        width:1rem;
        height:1rem;
    }
    /* .jiedan{
        width:30%;
        background: #ff5370;
        color:#fff;
        margin-top:1rem;
        padding:.2rem;
        text-align:center;
    } */
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0.2rem 0;
        background: #fff;
        z-indeX:502;
    }
    .reply{
        width:18%;
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
    }
</style>