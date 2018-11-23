<template>
	<div id="cash">
        <!-- <router-link to="/home/chooseBank" tag="div" class="metext content">{{way}}</router-link> -->
        <div class="metext content" @click="showChoose">{{way}}</div>
        <userChooseBank v-show="chooseBank" @chooseBank="choose"></userChooseBank>
        <div class="main">
                 <div class="div1 text">
                        <span class="span">提现金额:</span>
                 </div>
                 <div class="div1">
                        <span class="renminbi"><i class="zk-icon-renminbi1"></i></span>
                        <input type="number" v-model="amount" class="input">
                 </div> 
                 <div class="div1">
                        <verification-code :isHasPhone="false" @inputCode="inputCode"></verification-code>
                 </div>
                 <div class="div1">
                        <span>可用余额:</span><span v-text="this.result.user_money"></span>
                        <a href="javascript:;" @click="all" class="all">全部提现</a>
                 </div>
        </div>
        <div>
            <input type="button" :class="{confirm:true,toggleColor:isToggle}" value="确认提现" @click="confirm">
        </div>
        <Alert v-bind:Show.sync="alertShow" :alerttType="alerttType" :alertText="alertText"></Alert>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import user from "../../api/user"
import common from "../../widget/lib/user"
import verificationCode from '@/components/common/verification_code.vue'
import {mapState,mapGetters} from 'vuex'
export default {
    name: 'cash',
    data(){
        return{
            result:'',
            amount:'',
            verificationCode:'',
            cashway:'支付宝',
            chooseBank:false,
            alertShow:false,
			alerttType:'warn',
			alertText:'',
        }
    },
    computed:{
        ...mapState({
            bus:state=>state.user.bus
        }),
        ...mapGetters([
            'getBank'    
        ]),
        way(){
            return this.cashway+'提现';
        },
        isToggle(){
            if(this.amount!=''){
                return true;
            }else{
                return false;
            }
        },
    },
    methods:{
        showChoose(){
            this.chooseBank=true;
        },
        choose(data){
            this.cashway=data;
            this.chooseBank=false;
        },
        all(){
            this.amount=this.result.user_money;
        },
        confirm(){
            if(this.cashway=='支付宝'){
                let value=this.amount;
                if(!(this.check_acount(value))){
                     return false;
                }
                var yanzhengma=this.verificationCode;
                if(yanzhengma==""){
                    // alert('验证码不能为空');
                    this.alertShow=true;
                    this.alertText='验证码不能为空';
                    return false;
                }
                var amount=parseFloat(value);

                //判断是否已绑定该类型银行账号
                api.checkBank({'type':this.cashway}).then(res=>{
                    // if(res.data.error==3){
                    //     this.alertShow=true;
                    //     this.alertText=res.data.message;
                    //     this.$router.push('/login');
                    // }else 
                    if(res.data.error==1){
                        //去绑定银行账号
                        // alert('您未绑定该类型的账号,请前往绑定');
                        this.alertShow=true;
                        this.alertText='您未绑定该类型的账号,请前往绑定';
                        setTimeout(()=>{
                            this.$router.push('/home/addBank');
                        },2000)
                    }else if(res.data.error==0){
                        api.cash({'amount':amount,'yanzhengma':yanzhengma}).then(res=>{
                            if(res.data.error==0||res.data.error==2){
                                this.alertShow=true;
                                this.alertText=res.data.message;
                            }else if(res.data.error==1){
                                this.$router.go(-1);
                            }
                        })
                    }
                })
            }else{
                this.alertShow=true;
                this.alertText='暂不支持此种方式';
            }
        },
        check_acount(value){
            if(value==""){
                this.alertShow=true;
                this.alertText='请输入提现金额';
                return false;
            }else if(value==0){
                this.alertShow=true;
                this.alertText='提现金额不能为零';
                return false;
            }
            if(value.indexOf('.')>0){
                if(value.split('.')[1].length>2){
                    this.alertShow=true;
                    this.alertText='提现金额精确到分';
                    return false;
                }
            }
            return true;
        },
        inputCode(data){
            this.verificationCode=data;
        }
    },
    mounted(){
        api.ajaxWalletGet('tixian').then(res=>{
            this.result=res.data;
        }).catch(error=>{
            console.log(error);
        });
        // this.bus.$on('chooseBank',params=>{
        //     this.cashway=params;
        // })
        if(this.getBank){
            this.cashway=this.getBank;
        }
    },
    components:{
        verificationCode,
    }
}
</script>

<style scoped>
    .content{
        margin-top:0.2rem;
        font-size:0.3rem;
    }
    .metext{
        text-align:left;
        padding:0.2rem;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
    .main{
        font-size:0.3rem;
        margin-top:0.3rem;
        padding:0.3rem;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
    .text{
        text-align:left;
    }
    .div1{
        margin-bottom:0.25rem;
    }
    .confirm{
        font-size:0.3rem;
        display:block;
        width:70%;
        border:1px solid #ccc;
        margin:0.3rem auto;
        padding:0.15rem 0;
    }
    .toggleColor{
        background: #ff5370;
        color:#fff;
    }
    .input{
        border:1px solid #ccc;
        padding:0.2rem 0.2rem 0.2rem 0.1rem;
        font-size: 0.3rem;
    }
    .all{
        color:#fff;
        border:1px solid #ccc;
        background: #ff5370;
        padding:.1rem;
    }
</style>
