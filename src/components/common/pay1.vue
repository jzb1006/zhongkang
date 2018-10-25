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
            <!-- <div class="vux-1px-tb">
                <div class="item"  @click="show_pay_method_page" v-show="balance">
                    <div class="left">付款方式</div>
                    <div class="right"><span>{{pay_method}}</span><i class="zk-icon-jiantou iconfont"></i></div>
                </div>
            </div> -->
            <div class="vux-1px-tb">
                <div class="item"  @click="show_pay_method_page">
                    <!-- <div class="left">付款方式</div> -->
                    <!-- <div class="right"><span>{{pay_method}}</span><i class="zk-icon-jiantou iconfont"></i></div> -->
                    <!-- <div  -->
                        <ul class="pay_list pay_list_2">
                            <li class="first" @click="pay_type(7,$event)" v-show="balance"><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:7==pay_id}"></i></span><span style="font-size: 0.5rem;color: #007aff;">余额</span></li>
                            <li class="first" @click="pay_type(3,$event)" ><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:3==pay_id}"></i></span><span class="zk-icon-zhifubao " style="font-size: 0.5rem;color: #007aff;"></span></li>
                            <li class="first" @click="pay_type(4,$event)" ><span class="r"><i class="zk-icon-weixuanzhong" v-bind:class="{ pay_yes:4==pay_id}"></i></span><span class="zk-icon-weixinzhifu " style="font-size: 0.5rem;color: #007aff;"></span></li>
                        </ul>
                </div>
            </div>
            <div class="pay">
                <input type="button" class="btn" value="立即付款" @click="pay">
            </div>
        </div>
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
            pay_id:'',
            balance:false,
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
        },
        order_sn:{
            type:[String]
        },
        jump_url:{
            type:[String]
        },
        subject:{
            type:[String]
        }
    },
    // wacth:{
    //     subject(oldValue,newValue){
    //         if(newValue=='充值'){
    //             this.balance=false;
    //         }
    //     }
    // },
    computed:{
        ...mapGetters([
            'getUserinfo'
        ]),
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
            let postData={
                'pay_id':this.pay_id.toString(),
                'order_amount':this.order_amount,
                'order_sn':this.order_sn,
                'subject':this.subject,
                'jump_url':this.jump_url,
            }
            console.log(postData);
            Pay.pay(postData).then(res=>{
                console.log(res);
                if(res.data.error_code==3){
                    console.log('a');
                    alert(res.data.msg);
                    this.$router.push('/login');
                }else if(res.data.error_code==1){
                    console.log('b');
                    alert(res.data.msg);
                    location.href=this.jump_url;
                }else if(res.data.error_code==2){
                    console.log('c');
                    console.log(res.data);
                    let url=res.data.data;
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
        },
        pay_type(pay_id,event){
            this.pay_id = pay_id;
            console.log(this.pay_id)
        },
    },
    mounted(){
        this.getBankList();
        console.log(typeof this.getUserinfo.user_money);
        console.log(typeof this.order_amount);
        console.log(Number(this.getUserinfo.user_money));
        console.log(Number(this.order_amount));
        if(Number(this.getUserinfo.user_money)>Number(this.order_amount)){
            console.log('a');
            // this.pay_method="余额";
            this.pay_id="7";
            if(this.subject=='充值'){
                this.balance=false;
            }else{
                this.balance=true;
            }
        }else{
            console.log('b');
            // this.pay_method="支付宝";
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
.pay_yes{
    color:#007aff;
}
</style>
