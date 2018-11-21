<template>
    <div id="submitOrder">
        <footer class="order-footer no-select clear">
            <div class="fbottom">
                <div class="order-info">
                    <p class="pay-money">
                        金额：<span>￥</span><span id="tmp_pay2">{{price}}</span></p>
                </div>
                <span @click="add_order" class="order-submit-btn">提交订单</span>
            </div>
        </footer>
        <!-- <pay :show_pay_page="this.show_pay_page" @cancel="cancel" :order_sn="sn" :order_amount="this.price" jump_url="http://192.168.0.110:8080/#/customizedOrder" subject="4" v-if="this.price!=''"></pay> -->
        <pay :params=params></pay>
    </div>
</template>
<script>
    import api from "../../api/customized"
    import pay from "@/components/common/pay.vue"
    import detailItem from '@/components/customized/detailItem.vue'
    import { mapGetters } from "vuex";
    import Bus from '@/assets/bus.js'
    export default {
        name:'submitOrder',
        data(){
            return{
                pay_id:0,
                price:'',
                show_pay_page:false,
                sn:'',
            }
        },
        computed: {
            ...mapGetters(["getLastName","getAge","getCustomizedDetail","getPhoto","getLevel"]),
            params(){
                return {
                    show_pay_page:this.show_pay_page,
                    order_sn:this.sn,
                    order_amount:this.price,
                    jump_url:"http://192.168.0.110:8080/#/customizedOrder",
                    subject:"4",
                }
            }
        },
        methods:{
            pay_type(pay_id,event){
               this.pay_id = pay_id;
               console.log(this.pay_id)
            },
            // cancel(){
            //     this.show_pay_page=false;
            // },
            add_order(){
                let detail=this.getCustomizedDetail
                let lastName=this.$store.state.customized.lastName;
                let age=this.$store.state.customized.age
                let level=this.getLevel
                let photo=this.getPhoto
                let min=this.$store.state.customized.minPrice
                let max=this.$store.state.customized.maxPrice
                let postdata={
                    'lastname':lastName,
                    'age':age,
                    'level':sessionStorage.getItem('level'),
                    'money':sessionStorage.getItem('money'),
                    'adviser_id':sessionStorage.getItem('adviser_id'),
                    'detail':detail,
                    'cat':JSON.parse(sessionStorage.getItem('operation_category')),
                    'photo':JSON.parse(sessionStorage.getItem('photo')),
                    // 'order_sn':sn,
                    'minPrice':sessionStorage.getItem('minPrice'),
                    'maxPrice':sessionStorage.getItem('maxPrice'),
                    'pay_id':this.pay_id,
                    'order_amount':this.price,
                }
                console.log(postdata);
                api.saveCustomizedDemand(postdata).then(res=>{
                    console.log(res);
                    if(res.data.error_code==0){
                        console.log(res.data.data);
                        this.sn=res.data.data;
                        this.$store.dispatch('changeOrderSn',res.data.data);
                        this.show_pay_page=true;
                        Bus.$emit('showPay',true);
                        this.getPrice();
                    }else{
                        alert(res.data.msg);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            getPrice(){
                this.price=sessionStorage.getItem('price');
            },
            
        },
        beforeDestroy () {
            Bus.$off('showPay');
        },
        mounted(){
            this.getPrice();
            Bus.$on('hidePay',res=>{
                console.log(res);
                this.show_pay_page=res;
            })
        },
        components:{
            top,
            pay,
            detailItem
        }
    }
</script>
<style scoped>
    .content{
        height:2rem;
        font-size:.5rem;
        padding:.2rem;
        box-sizing: border-box;
    }
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