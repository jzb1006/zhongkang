<template>
	<div id="cash">
		<top title="提现"></top>
        <router-link to="/home/chooseBank" tag="div" class="metext content">{{way}}</router-link>
        <div class="main">
                 <div class="div1 text">
                        <span class="span">提现金额:</span>
                 </div>
                 <div class="div1">
                        <span class="renminbi"><i class="zk-icon-renminbi1"></i></span>
                        <input type="number" v-model="amount" class="input">
                 </div> 
                 <div class="div1">
                        <input type="text" placeholder="请输入验证码" v-model="verificationCode" class="input">
                        <input type="button" value="获取验证码"  @click="getVerificationCode" class="input">
                 </div>
                 <div class="div1">
                        <span>可用余额:</span><span v-text="this.result.user_money"></span>
                        <a href="javascript:;" @click="all" class="all">全部提现</a>
                 </div>
        </div>
        <div>
            <input type="button" :class="{confirm:true,toggleColor:isToggle}" value="确认提现" @click="confirm">
        </div>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import user from "../../api/user"
import common from "../../widget/lib/user"
import top from "@/components/decorate/top_back_title.vue";
import {mapState,mapGetters} from 'vuex'
export default {
    name: 'cash',
    data(){
        return{
            result:'',
            amount:'',
            verificationCode:'',
            cashway:'支付宝',
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
        }
    },
    methods:{
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
                    alert('验证码不能为空');
                    return false;
                }
                var amount=parseFloat(value);

                //判断是否已绑定该类型银行账号
                api.checkBank({'type':this.cashway}).then(res=>{
                    if(res.data.error==3){
                        alert(res.data.message);
                        this.$router.push('/login');
                    }else if(res.data.error==1){
                        //去绑定银行账号
                        alert('您未绑定该类型的账号,请前往绑定');
                        this.$router.push('/home/addBank');
                    }else if(res.data.error==0){
                        api.cash({'amount':amount,'yanzhengma':yanzhengma}).then(res=>{
                            if(res.data.error==0){
                                alert(res.data.message);
                            }else if(res.data.error==1){
                                this.$router.go(-1);
                            }
                        })
                    }
                })
            }else{
                alert('暂不支持此种方式');
            }
        },
        check_acount(value){
            if(value==""){
                alert("请输入提现金额");
                return false;
            }else if(value==0){
                alert("提现金额不能为零");
                return false;
            }
            if(value.indexOf('.')>0){
                if(value.split('.')[1].length>2){
                    alert('提现金额精确到分');
                    return false;
                }
            }
            return true;
        },
        getVerificationCode(){
            let value=this.amount;
            if(!(this.check_acount(value))){
                 return false;
            }
            user.ajaxuserPost('yanzhengma').then(res=>{
                alert(`验证码为${res.data},仅作测试用`);
            }).catch(error=>{
                console.log(error);
            }) 
        }
    },
    mounted(){
        console.log('dddd');
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
        top
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
