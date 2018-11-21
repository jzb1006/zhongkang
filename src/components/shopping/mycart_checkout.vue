<template>
    <div id="mycard">
       
        <top :title="title"></top>
        <div class="order-box clear" v-if="result != ''" :key="index" v-for="(item,index) in result">
            <!-- 产品信息 -->
             
            <div class="order-product clear">
                <img class="pic" :src="img_path()+item['goods_thumb']" alt="">
                <div class="order-product-info clear">
                    <h1 class="title no-select" ref="keyword">【{{item['meta_keys']}}】【{{item['meta_desc']}}】{{item['sort_desc']}}</h1>
                    <div class="price no-select clear">
                        预约金：
                        <i>￥</i><em>{{item['deposit_price']}}</em>
                    </div>
                    <div class="order-number-box clear">
                        <button class="decrease no-select" @click="decrease(item['goods_id'])" :disabled="isDisable">-</button>
                        <input type="number" class="num ff" v-model="num" id="h5_number" name="order-number">
                        <button class="increase no-select" @click="increase(item['goods_id'])" :disabled="isDisable">+</button>
                    </div>
                </div>
            </div>
            <!-- 结算金额 -->
            <div class="order-money no-select">
                <ul>
                    <li id="h5_pay_red" class="h5_pay_red" data-redid="0">
                        <div class="left">
                            <span>预约金小计：</span>
                            <span>￥{{item['deposit_price']}}</span>
                        </div>
                        <div class="right">
                            <!-- <i style="color: red">0个红包可用</i> -->
                            <span class="zk-icon-jiantou arrow" style="font-size: 0.4rem;"></span>
                        </div>
                    </li>
                    <li id="h5_end_red" class="h5_end_red" data-redid="0">
                        <div class="left">
                            <span>尾款小计：</span>
                            <span>￥{{item['pifa_price']-item['deposit_price']}}</span>
                        </div>
                        <div class="right">
                            <!-- <i style="color: red">0个红包可用</i> -->
                            <span class="zk-icon-jiantou arrow" style="font-size: 0.4rem;"></span>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="pay_list pay_list_2">
                <li class="first" @click="pay_type(3,$event)" ><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:3==pay_id}"></i></span><span class="zk-icon-zhifubao " style="font-size: 0.5rem;color: #007aff;"></span></li>
                 <li class="first" @click="pay_type(4,$event)" ><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:4==pay_id}"></i></span><span class="zk-icon-weixinzhifu " style="font-size: 0.5rem;color: #007aff;"></span></li>
            </ul>
        </div>
        <div v-if="result==''" id="empty">
            <span class="zk-icon-Emptyshoppingcart icon"></span>
            <div class="text">
                <p>哦哦~~~购物车什么都没有~~</p>
            </div>
        </div>
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
    import top from "@/components/decorate/top_back_title.vue";
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
                title: '购物车',
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
            decrease(id) {
                if (this.num == 1) {
                    this.num = 1;
                    this.change_number(id)
                    return false;
                }
                this.num--;
                this.change_number(id)
            },
            increase(id) {
                this.num++;
                this.change_number(id)
            },
            change_number(id) {
                this.perevent_double()
                var self = this;
                api.change_money({
                    'id': id,
                    'number': this.num
                }).then(res => {
                    console.log(res.data);
                    var result = res.data;
                    self.tmp_play = result.deposit_price
                    self.lmh = result.prices
                }).catch(error => {
                    console.log(error)
                })
            },
            perevent_double() {
                this.isDisable = true;
                setTimeout(() => {
                    this.isDisable = false;
                }, 1500);
            },
            img_path() {
                return api.imgUrl();
            },
            pay_type(pay_id,event){
               this.pay_id = pay_id;          
               console.log(this.pay_id)
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
                this.behavior.behavior_data(this.keyword.keyword[0].innerHTML,1);
                
            }
        },
        mounted() {
            this.$_ajax_mtcard();
        },
        components: {
            top
        }
    }
</script>
<style scoped>
    
    #empty {
        position: absolute;
        top: 32%;
        text-align: center;
        width: 100%;
    }
    #empty .icon {
        font-size: 2rem;
        color: #ccc6c6;
    }
    #empty .text {
        font-size: 0.3rem;
        color: #ccc6c6;
        font-weight: bold;
    }
    .clear {
        overflow: hidden;
    }
    .order-box {
        margin-top: 0!important;
    }
    .order-box .order-product {
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .order-box .order-product,
    .order-box .order-usesinfo,
    .order-box .order-money {
        background-color: #FFF;
        margin-top: 15px;
        padding: 0 15px;
    }
    .order-box .order-product .pic {
        width: 2rem;
        height: 2.1rem;
        float: left;
        margin-right: 15px;
        border-radius: 3px;
    }
    .order-box .order-product .order-product-info {
        position: relative;
        height: 2.1rem;
    }
    .order-box .order-product .order-product-info .title {
        font-size: 0.3rem;
        color: #333;
        font-weight: 400;
    }
    .order-box .order-product .order-product-info .price {
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 0.3rem;
        color: #777;
    }
    .order-box .order-product .order-product-info .price i {
        font-size: 0.2rem;
        color: #FF527F;
    }
    .order-box .order-product .order-product-info .price em {
        color: #FF527F;
    }
    .order-box .order-product .order-product-info .order-number-box {
        border: 1px solid #b3b3b3;
        background-color: #FFF;
        border-radius: 4px;
        letter-spacing: 0;
        height: 0.6rem;
        overflow: hidden;
        width: 2rem;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .order-box .order-product .order-product-info .order-number-box .decrease {
        border: none;
        border-right: 1px solid #000000;
    }
    .order-box .order-product .order-product-info .order-number-box .increase {
        border: none;
        border-left: 1px solid #000000;
    }
    .order-box .order-product .order-product-info .order-number-box .decrease,
    .order-box .order-product .order-product-info .order-number-box .increase {
        font-size: 0.7rem;
        font-weight: 300;
        color: #FF527F;
        width: 0.64rem;
        height: 0.6rem;
        line-height: 0.6rem;
        float: left;
        background-color: #FFF;
        text-align: center;
    }
    .order-box .order-product .order-product-info .order-number-box .num {
        width: 0.7rem;
        height: 0.6rem;
        border: 0;
        border-radius: 0;
        font-weight: 700;
        color: #333;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: none;
        text-align: center;
        float: left;
        font-size: 0.3rem;
    }
    .ff {
        font-family: 'SYFZLTKHJW--GB1-0', 'Helvetica', 'arial', 'Microsoft YaHei';
    }
    .order-box .order-product,
    .order-box .order-usesinfo,
    .order-box .order-money {
        background-color: #FFF;
        margin-top: 15px;
        padding: 0 15px;
    }
    .order-box .order-money ul li {
        height: 55px;
        line-height: 55px;
        border-bottom: #F0F0F0 1px solid;
        font-size: 1.4rem;
        color: #555;
        position: relative;
    }
    .order-box .order-money ul li {
        font-size: 1.3rem;
    }
    .h5_pay_red,
    .h5_end_red {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
    .order-box .order-money ul li {
        height: 0.7rem;
        line-height: 0.7rem;
        border-bottom: #F0F0F0 1px solid;
        font-size: 1.4rem;
        color: #555;
        position: relative;
    }
    .order-box .order-money ul li {
        font-size: 0.3rem;
    }
    #h5_pay_red span,
    #h5_end_red span {
        position: static;
        color: #555;
    }
    .order-box .order-money ul li span {
        position: absolute;
        right: 0;
        color: #B8B8B8;
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