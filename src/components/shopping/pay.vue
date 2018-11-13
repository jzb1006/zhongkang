<template>
  <div id="pay">
    <Toast v-model="show"  :type="alerttType"  width="3rem" is-show-mask>
      <div class="alert_mag">
        {{text}}
      </div>
    </Toast>
    <div class="payBox order-box">
      <!-- 产品信息 -->
      <div class="order-box" v-if="result != ''" :key="index" v-for="(item,index) in result">
        <div class="order-product clear">
          <img class="pic" :src="img_path()+item['goods_thumb']" alt="">
          <div class="order-product-info clear">
            <h1 class="title no-select">【{{item['meta_keys']}}】【{{item['meta_desc']}}】{{item['sort_desc']}}</h1>
            <div class="price no-select clear">
              机构：<em>{{item['ins_name']}}</em>
            </div>
          </div>
        </div>
      </div>
      
      <div id="price_info">
        <div class="moneyBox">
          <span>实付款：</span>
          <span class="moneyIcon">￥</span>
          <span class="moneyNum">{{orderinfo['order_amount']}}</span>
        </div>
        <div class="pay_type">
          <span class="text">支付方式：</span>
          <span class="type" :key="index" v-if="orderinfo['pay_id'] == item['pay_id']" v-for="(item,index) in paymentlist">
              
              {{item['pay_name']}}
            </span>
        </div>
      </div>
      <!-- 微信外使用 -->
      <div class="notweixin" style="">
        <p class="payTip">订单已生成，请在半小时内完成支付</p>
        <div style="text-align: center;"> 
          <button class="payBtn" id="zhibao" @click="fastpay()">确认支付</button>
          <!-- <a href="http://192.168.0.110/m/mycart.php?type=fastpay2&oid=" target="_black">确认支付</a> -->
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "../../api/goods";
  import { Toast } from 'vux'
import { setInterval, setTimeout } from 'timers';
  export default {
    data() {
      return {
        oid: this.$route.params.oid,
        result: {},
        orderinfo: {},
        paymentlist: {},
        show:false,
        text:'',
        alerttType:'text'
      };
    },
    methods: {
      pay_page() {
        var self = this;
        api.pay({
            'oid': this.oid
          })
          .then(res => {
            self.result = res.data.data.goodslist;
            self.orderinfo = res.data.data.orderinfo;
            self.paymentlist = res.data.data.paymentlist;
          })
          .catch(error => {
            console.log(error);
          });
      },
      fastpay() {
        // window.location="http://192.168.0.110/m/mycart.php?type=fastpay2&oid="+this.oid;
        api.fastpay({
          'oid': this.oid,
        }).then(res => {
          var result = res.data;
          var code = result.error_code;
          var msg = result.msg;
          if (code == '0') {
            // alert(msg);
            this.alerttType = 'success';
             this.text = msg;
            this.show = true;
            setTimeout(()=>{
                this.$router.push({
                'name':'orderList'
              })
            },2000)
          } else {
            // alert(msg);
            this.alerttType = 'warn';
            this.text = msg;
            this.show = true;
            setTimeout(()=>{
                this.$router.push({
                'name':'Search'
              })
            },2000)
          }
          console.log(res);
        }).catch(error => {
          console.log(error);
        })
      },
      img_path() {
        return api.imgUrl();
      },
    },
    mounted() {
      this.pay_page();
    },
    components: {
     Toast
    }
  };
</script>
<style lang="less">
.weui-toast{
    min-height: 1.5rem!important;
  }
  
  .moneyBox {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.3rem;
    color: #333;
  }
  .moneyBox,
  .pay_list_title {
    background: #fff;
  }
  .moneyBox,
  .payBtn {
    box-sizing: border-box;
  }
  .moneyIcon {
    font-size: 0.4rem;
    color: #ff527f;
  }
  .moneyNum {
    font-size: 0.5rem;
    color: #ff527f;
  }
  .payTip {
    line-height: 1rem;
    padding-left: 0.5rem;
    color: #777;
  }
  .payBtn {
    background: #ff8ea3;
    color: #fff;
    width: 90%;
    margin: 21px auto;
    border-radius: .1rem;
    outline: 0;
  }
  .payBtn,
  .payTip {
    font-size: 0.3rem;
  }
  .payBtn,
  .pay_list li {
    border: 0;
    height: 1rem;
  }
  .moneyBox,
  .payBtn {
    box-sizing: border-box;
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
    bottom: 0;
    font-size: 0.3rem;
    color: #777;
    padding-top: 0.2rem;
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
  .pay_type {
    font-size: 0.3rem;
    padding: 0.5rem;
  }
  .pay_type .text {}
  .pay_type .type {
    color: #FF527F;
  }
  
  .alert_mag{
   font-size: 0.3rem;
  }
</style>