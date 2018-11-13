<template>
    <div id="pay" v-show="params1.show_pay_page">
        <div class="box">
            <div class="head vux-1px-b">
                <i class="zk-icon-guanbi iconfont cancel" @click="cancel"></i>
                <span>确认付款</span>
            </div>
            <div class="money">
                <div class="vertical">
                    <i class="zk-icon-renminbi1 iconfont"></i><span>{{params1.order_amount}}</span>
                </div>
            </div>
            <div class="item">
                <div class="left">订单金额</div>
                <div class="right"><i class="zk-icon-renminbi1 iconfont"></i><span>{{params1.order_amount}}</span></div>
            </div>
            <div class="item vux-1px-t">
                <div>付款方式 :</div>
            </div>
            <div class="vux-1px-tb">
                <div>
                    <ul class="pay_list pay_list_2">
                        <li :class="balance_class" @click="flag && pay_type(7,$event)" v-show="this.showBalance">
                            <div class="clear">
                                <span class="left">
                                    <i class="iconfont zk-icon-zhanghuyue" style="font-size: 0.35rem;color: #007aff;"></i>
                                </span>
                                <div class="right clear">
                                    <div class="l">
                                        <p :class="{p:!balance}" style="font-size: 0.35rem;">账户余额</p>
                                        <p :class="{p:!balance}" style="font-size: 0.25rem;" v-show="!balance">余额不足</p>
                                    </div>
                                    <span class="r">
                                        <i class="iconfont zk-icon-gou" v-show="7==pay_id" style="font-size: 0.35rem;color: #007aff;"></i>
                                    </span>
                                </div>   
                            </div>
                        </li>
                        <li class="first" @click="pay_type(3,$event)" >
                            <div class="clear">
                                <span class="left">
                                    <i class="iconfont zk-icon-zhifubao1" style="font-size: 0.35rem;color: #007aff;"></i>
                                </span>
                                <div class="right clear">
                                    <div class="vux-1px-t">
                                        <span class="l" style="font-size: 0.35rem;">支付宝</span>
                                        <span class="r">
                                            <i class="iconfont zk-icon-gou" v-show="3==pay_id" style="font-size: 0.35rem;color: #007aff;"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="first" @click="pay_type(4,$event)" >
                            <div class="clear">
                                <span class="left">
                                    <i class="iconfont zk-icon-wxopen" style="font-size: 0.35rem;color: #007aff;"></i>
                                </span>
                                <div class="right clear">
                                    <div class="vux-1px-t">
                                        <span class="l" style="font-size: 0.35rem;">微信</span>
                                        <span class="r">
                                            <i class="iconfont zk-icon-gou" v-show="4==pay_id" style="font-size: 0.35rem;color: #007aff;"></i>
                                        </span>
                                    </div>
                                </div>   
                            </div>
                        </li>
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
import api from "../../api/wallet"
import Pay from "../../api/pay"
import {mapState,mapGetters} from 'vuex'
import Bus from '@/assets/bus.js'
export default {
    data(){
        return{
            pay_id:'',
            balance:false,   
            showBalance:true,
            params1:{},
        }
    },
    watch:{
        params:function(newV,oldV){
            this.params1=newV;
            if(Number(this.getUserinfo.user_money)>Number(this.params1.order_amount)){
                this.pay_id="7";
                this.balance=true;
            }else{
                // console.log('b');
                this.pay_id="3";
                this.balance=false;
                // this.pay_method="支付宝";
            }
        }
    },
    props:{
        params:{
            type:[Object],
        },
        // show_pay_page:{
        //     type:[Boolean],
        //     default:false,
        // },
        // order_amount:{
        //     type:[String],
        //     default:'0',
        // },
        // order_sn:{
        //     type:[String]
        // },
        // jump_url:{
        //     type:[String]
        // },
        // subject:{
        //     type:[String]
        // }
    },
    computed:{
        balance_class(){
            return {
                first:true,
                disable:!this.balance,
            }
        },
        flag(){
            return this.balance;
        },
        ...mapGetters([
            'getUserinfo'
        ]),
    },
    methods:{
        cancel(){
            Bus.$emit('hidePay',false);
        },
        pay(){
            let postData={
                'pay_id':this.pay_id.toString(),
                'order_amount':this.params1.order_amount,
                'order_sn':this.params1.order_sn,
                'subject':this.params1.subject,
                'jump_url':this.params1.jump_url,
            }
            console.log(postData);
            Pay.pay(postData).then(res=>{
                console.log(res);
                if(res.data.error_code==3){
                    alert(res.data.msg);
                    this.$router.push('/login');
                }else if(res.data.error_code==1){
                    console.log(res);
                    alert(res.data.msg);
                    location.href=this.params1.jump_url;
                }else if(res.data.error_code==2){
                    console.log(res.data);
                    let url=res.data.data;
                    console.log(url);
                    location.href=url;
                }
                
            }).catch(err=>{
                console.log(err);
            })
        },
        pay_type(pay_id,event){
            this.pay_id = pay_id;
            console.log(this.pay_id);
        },
        init_balance(){
            if(this.subject=='8'){
                this.showBalance=false;
            }else{
                this.showBalance=true;
            }
            
        }
    },
    mounted(){
        this.init_balance();
    },
    beforeDestroy () {
        Bus.$off('hidePay');
    },
    components:{
        
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
.clear::after,.item::after{
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
    
}
.pay_list li:nth-child(1) {
    border-top: 0;
}


.pay_list li {
    line-height: 1rem;
    margin-bottom: 1px;
    font-size: 0.4rem;
    padding: 0 0 0 .2rem;
}

.payBtn, .pay_list li {
    border: 0;
}
.pay_list .first::after,.pay_list .text::after{
    content:'';
    display:block;
    clear:both;
}
.pay_list .first .left{
    float:left;
    width:10%;
}
.pay_list .first .right{
    float:left;
    width:90%;
}
.pay_list .first .l{
    float:left;
    width:80%;
}
.pay_list .first .l .p{
    height: .5rem;
    line-height: .5rem;
    margin-top:.05rem;
}
.pay_list .first .r{
    float:right;
    width:10%;
}
.disable{
    /* color:#ff5370; */
    opacity:.5;
}
</style>
