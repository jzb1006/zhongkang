<template>
    <div id="pay" v-show="show_pay_page">
        <div class="box">
            <div class="head vux-1px-b">
                <i class="zk-icon-guanbi iconfont cancel" @click="cancel"></i>
                <span>确认付款</span>
            </div>
            <div class="money">
                <div class="vertical">
                    <i class="zk-icon-renminbi1 iconfont"></i><span>{{order_amount}}</span>
                </div>
            </div>
            <div class="item">
                <div class="left">订单金额</div>
                <div class="right"><i class="zk-icon-renminbi1 iconfont"></i><span>{{order_amount}}</span></div>
            </div>
            <div class="vux-1px-tb">
                <div class="item"  @click="show_pay_method_page">
                    <div class="left">付款方式</div>
                    <div class="right"><span>{{pay_method}}</span><i class="zk-icon-jiantou iconfont"></i></div>
                </div>
            </div>
            <div class="pay">
                <input type="button" class="btn" value="立即付款" @click="pay">
            </div>
        </div>
        <actionsheet v-model="show_pay_method" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-menu="choose_pay_method"></actionsheet>
    </div>
</template>

<script>
import { Actionsheet } from "vux";
import api from "../../api/wallet"
import Pay from "../../api/pay"
import {mapState,mapGetters} from 'vuex'
export default {
    data(){
        return{
            show_pay_method:false,
            pay_method:'',
            menus1:[
                // '微信支付',
                // '支付宝支付',
                '余额',
            ]
        }
    },
    props:{
        show_pay_page:{
            type:[Boolean],
            default:false,
        },
        order_amount:{
            type:[String],
            default:'0',
        }   
    },
    computed:{
        ...mapGetters([
            'getUserinfo'
        ]),
        amount(){
            return this.order_amount;
        }
    },
    methods:{
        cancel(){
            // this.show_pay_page=false;
            this.$emit('cancel');
        },
        show_pay_method_page(){
            this.show_pay_method=true;
        },
        choose_pay_method(menuKey, menuItem){
            this.pay_method=menuItem;
        },
        getBankList(){
            api.getBankList().then(res=>{
                console.log(res.data);
                // this.result=res.data;
                var self=this;
                let result=res.data;
                result.forEach(function(value){
                    self.menus1.push(value['bankname']);
                })
            }).catch(error=>{
                console.log(error);
            })
        },
        pay(){
            let sn='4'+(new Date()).getTime();
            // let pay_id=this.get_pay_id();
            // let amount=this.order_amount;
            console.log('pay');
            Pay.pay({
                'pay_id':this.get_pay_id(),
                'order_amount':this.order_amount,
                'order_sn':sn,
                'subject':'定制咨询',
            }).then(res=>{
                // console.log('success0');
                if(res.data.error_code==3){
                    // alert(res.data.msg);
                    this.$router.push('/login');
                }else if(res.data.error_code==1){
                    alert(res.data.msg);
                    this.$router.push('/customizedOrder');
                }else{
                    console.log(res.data);
                    let url=res.data;
                    console.log(url);
                    location.href=url;
                }
                
            }).catch(err=>{
                console.log(err);
            })
        },
        get_pay_id(){
            if(this.pay_method=='支付宝'){
                return '3';
            }
            if(this.pay_method=='微信'){
                return '4';
            }
            if(this.pay_method=='余额'){
                return '7';
            }
        }
    },
    mounted(){
        this.getBankList();
        console.log(typeof this.getUserinfo.user_money);
        console.log(typeof this.amount);
        console.log(Number(this.getUserinfo.user_money));
        console.log(Number(this.amount));
        if(Number(this.getUserinfo.user_money)>Number(this.amount)){
            console.log('a');
            this.pay_method="余额";
        }else{
            console.log('b');
            this.pay_method="支付宝";
        }
    },
    components:{
        Actionsheet
    }
}
</script>

<style scoped>
#pay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    background-color: #00000080;
}
.box{
    position:fixed;
    bottom:0;
    left:0;
    background:#fff;
    width:100%;
    font-size:.35rem;
}
.head{
    padding:.3rem .2rem;
    text-align:center;
}
.head .cancel{
    position:absolute;
    left:.2rem;
}
.money{
    text-align:center;
    height:1.3rem;
    font-size:.5rem;
}
.money .vertical{
    line-height:1.3rem;
}
.item{
    padding:.3rem .2rem;
}
.item::after{
    content:'';
    display:block;
    clear:both;
}
.item .left{
    float:left;
}
.item .right{
    float:right;
}
.pay{
    padding:.2rem .2rem .4rem .2rem;
    margin-top:1rem;
}
.pay .btn{
    background:#ff5370;
    color:#fff;
    display:block;
    width:100%;
    padding:.2rem 0;
    border-radius:.15rem;
}
</style>
