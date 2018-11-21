<template>
    <div id="mycard">
        <ul class="pay_list pay_list_2">
                <li class="first" @click="pay_type(3,$event)" ><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:3==pay_id}"></i></span><span class="zk-icon-zhifubao " style="font-size: 0.5rem;color: #007aff;"></span></li>
                 <li class="first" @click="pay_type(4,$event)" ><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:4==pay_id}"></i></span><span class="zk-icon-weixinzhifu " style="font-size: 0.5rem;color: #007aff;"></span></li>
            </ul>
        <!--底部-->
        <footer class="order-footer no-select clear" v-if="result != ''">
            <div class="fbottom">
                <div class="order-info">
                    <p class="pay-money">
                        预约金：<span>￥</span><span id="tmp_pay2">{{tmp_play}}</span></p>
                    <p class="later-money"><span class="lmh">到院再付：¥{{lmh}}</span> <span class="youhui"></span></p>
                </div>
                <span @click="add_order()" class="order-submit-btn">提交订单</span>
            </div>
        </footer>
    </div>
</template>
<script>
    import api from "../../api/goods"
   import { mixin } from "@/assets/js/mixins";

    export default {
    mixins: [mixin],

        data() {
            return {
                result: {},
                goods_id: 0,
                num: 1,
                tmp_play: 0,
                lmh: 0,
                isDisable: false,
                pay_id:0,
                keyword:this.$refs,
                pay_link:"container",
                pay_con_id:this.params['pay_con_id']
            }
        },
        methods: {
            $_ajax_mtcard() {
                var self = this;
                api.mycard().then(res => {
                    if (res.data != null) {
                        self.result = res.data;
                        for (let item in res.data) {
                            self.tmp_play += parseInt(res.data[item]['deposit_price']);
                            self.lmh += parseInt(res.data[item]['pifa_price'] - res.data[item]['deposit_price']);
                        }
                    } else {
                        self.$router.back(-1);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            add_order(){
                var pay_id=this.pay_id;
                if(pay_id==0){
                    alert("请选择支付方式！");
                    return false;
                }
                api.add_order({
                    'pay_id':this.pay_id
                }).then(res=>{
                   if(res.data!=''){
                       var result = res.data;
                       var code = result.error_code;
                       var msg = result.msg;
                       var oid = result.data;
                       if(code==1){
                          this.$router.push({
                              name:this.pay_link,
                              query:{
                                  id:this.pay_con_id,
                                  oid:oid
                              }
                          })
                       }else{
                           alert(msg)
                       }
                   }else{
                       alert("出现意外情况")
                   }
                }).catch(error=>{
                    console.log(error);
                })
                // this.behavior.behavior_data(this.keyword.keyword[0].innerHTML,1);
                
            },
             pay_type(pay_id,event){
               this.pay_id = pay_id;          
               console.log(this.pay_id)
            },
        },
        mounted() {
            this.$_ajax_mtcard();
        },
    }
</script>
<style scoped>
    .clear {
        overflow: hidden;
    }
    .order-footer {
        background-color: #FFF;
        border-top: 1px solid #ececec;
        width: 100%;
        height: 1.05rem;
        text-align: center;
        position: fixed;
        left: 0;
        z-index: 9999;
        bottom: 0;
    }
    .order-footer .order-info {
        float: left;
        padding-left: 15px;
        text-align: left;
        height: 44px;
    }
    .order-footer .order-info .pay-money {
        padding-top: 6px;
        font-size: 0.3rem;
        color: #FF527F;
    }
    .order-footer .order-info .pay-money,
    .order-footer .order-info .later-money {
        line-height: 0.45rem;
    }
    .order-footer .order-info .later-money {
        font-size: 0.3rem;
        color: #979797;
    }
    .order-footer .order-submit-btn {
        display: block;
        float: right;
        width: 3rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #ff527f;
        color: #FFF;
        text-decoration: none;
        font-size: 0.3rem;
    }
    
 .pay_list {
    margin: 1px 0;
}

.pay_list_2 {
    margin-bottom: 60px;
}
.pay_list {
    border-radius: 6px;
    overflow: hidden;
    padding: 0 0.2rem;
}
.pay_list li:nth-child(1) {
    border-top: 0;
}


.pay_list li {
    line-height: 1rem;
    margin-bottom: 1px;
    font-size: 0.4rem;
}

.payBtn, .pay_list li {
    border: 0;
}
.pay_list .r {
    float: right;
    color: #545454;
}
.pay_list_2 img {
    margin-right: 15px;
}

.pay_list_2 img {
    display: inline-block;
    vertical-align: middle;
}
.pay_yes{
    color:#007aff;
}
</style>