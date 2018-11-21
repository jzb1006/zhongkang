<!--  -->
<template>
  <div>
        <div class="order border-1px">
            <div class="order-table">
                <div class="p1">
                    <p style="padding-bottom: 0.1rem;"> 预约金:<span style="visibility: hidden">金</span><span class="order-price">￥ {{deposit_price}}</span> </p>
                    <p>到院再付:<span style="color: #333">￥ {{to_hospital_price}}</span></p>
                </div>
                <p class="p4">
                    <a @click="$_ajax_add_card()">提交订单</a>
                </p>
            </div>
        </div>
  </div>
</template>

<script>
    import goods_api from "../../api/goods"
export default {
    props:{
       deposit_price:{
           type:[String,Number],
           default:''
       },
       to_hospital_price:{
           type:[String,Number],
           default:''
       },
       result:{
           type:[Object,Array],
           default(){
               return {}
           }
       },
       login_con_id:{
           type:[Number,String],
           default:0
       },
       card_con_id:{
           type:[Number,String],
           default:0
       }
       
    },
  data () {
    return {
    };
  },

  components: {},


  methods: {
      $_ajax_add_card() {
                var self = this;
                var goods = Object();
                goods.goods_id = this.result.goods_id;
                goods.price = this.result.pifa_price;
                goods.deposit_price = this.result.deposit_price;
                goods.market_price = this.result.market_price;
                goods.merchant_id = this.result.merchant_id;
                goods_api.addCard({
                    goods: goods
                }).then(res => {
                    var result = res.data;
                    var code = result.error + '';
                    var msg = result.message
                    switch (code) {
                        case '2':
                            alert(msg)
                            break;
                        case '44':
                            alert(msg)
                            break;
                        case '3':
                            alert(msg)
                            break;
                        case '0':
                            self.$router.push({
                                name: 'container',
                                query:{id:this.card_con_id}
                            })
                            break;
                        case '88':
                            self.$router.push({
                                name: 'container',
                                query:{id:this.login_con_id}
                            })
                            break;
                    }
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            },
  },

  mounted(){},
}

</script>
<style  scoped>
    .border-1px {
        position: relative;
    }
    .order {
        background: #fff;
        position: fixed;
        bottom: 0;
        z-index: 1000;
    }
    .order,
    .order .order-table {
        width: 100%;
        height: 1.04rem;
    }
    .order .order-table .p1 {
        position: relative;
        text-align: left;
        width: 40%;
        line-height: .3rem;
        font-size: .3rem;
        color: #777;
        border-right: 1px solid #f0f0f0;
        min-width: 0.5rem;
        float: left;
        padding: 0.2rem 0.2rem;
    }
    .order .order-table .p1 .order-price {
        color: #ff527f;
        font-size: .3rem;
    }
    .order .order-table .p1 .tos_btn {
        font-size: .4rem;
        color: #fe8da3;
        vertical-align: baseline;
        position: relative;
        top: -1px;
    }
   
    .order .order-table td {
        text-align: center;
        vertical-align: middle;
    }
    .order .order-table .p2 {
        width: 15%;
        font-size: 10px;
        color: #777;
        min-width: 44px;
    }
    .zixun-wrapper {
        border-right: 1px solid #f0f0f0;
    }
    .order .order-table .p2 {
        width: 12%;
        font-size: 10px;
        color: #777;
        min-width: 44px;
    }
    .order .order-table .p4 {
        width: 3rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #fc5d7b;
        font-size: 0.3rem;
        float: right;
        text-align: center;
    }
    .order .order-table .p3 a,
    .order .order-table .p4 a {
        color: #fff;
        margin: 0;
        font-size: 100%;
        vertical-align: baseline;
        text-decoration: none;
    }
    
</style>