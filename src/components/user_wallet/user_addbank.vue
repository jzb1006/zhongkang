<template>
	<div class="addbank">
		<top title="添加银行卡"></top>
		<div class="content">
                <div class="box">
                      <span class="title">类型:</span>
                      <select class="pw select" v-model="banknames">
                             <option>支付宝</option>
                             <option>微信</option>
                      </select>
                </div>
                <div class="box">
                      <span class="title">真实姓名:</span>
                      <input type="text" v-model="unames"  class="pw">
                </div>
                <div class="box">
                      <span class="title">账号:</span>
                      <input type="text" v-model="banksn"  class="pw">
                </div>
                <div class="box">
                      <input class="num" type="text"  v-model="VerificationCode" placeholder="请输入验证码"><input type="button" class="btn" value="获取验证码" @click="getVerificationCode">
                </div>
                <div class="box confirm">
                      <input type="button" class="submit" @click="update_user_bank" value="确认提交">
                </div>
        </div>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import user from "../../api/user"
import top from "@/components/decorate/top_back_title.vue";
export default {
    name: 'addbank',
    data(){
        return{
            banknames:'支付宝',
            unames:'',
            banksn:'',
            VerificationCode:''
        }
    },
    methods:{
        getVerificationCode(){
            user.ajaxuserPost('yanzhengma').then(res=>{
                alert(`验证码为${res.data},仅作测试用`);
            }).catch(error=>{
                console.log(error);
            }) 
        },
        update_user_bank(){
            let banknames = this.banknames;
            let unames = this.unames;
            let banksns = this.banksn;
            let yanzhengma=this.VerificationCode;
            let reg_mobile=/^1[3458]\d{9}$/g;
            if(banknames==""){
                alert('请输入银行单位');
                return false;
            }
            if(unames==""){
                alert('请输入真实姓名');
                return false;
            }
            if(banksns==""){
                alert('请输入账号');
                return false;
            }
            if(yanzhengma==""){
                alert('请输入验证码');
                return false;
            }
            if(confirm('确认修改吗')){
                api.update_user_bank({'bankname':banknames,'uname':unames,'banksn':banksns,'yanzheng':yanzhengma}).then(res=>{
                      if(res.data.error==3){
                          alert(res.data.message);
                          this.$router.push('/login');
                      }
                      if(res.data.error==1){
                          this.$router.go(-1);
                      }else{
                          alert(res.data.message);
                          return false;
                      }
                })
            }
            return false;
        }
    },
    components:{
      top
    }
}
</script>

<style scoped>
   .content{
       margin-top:0.1rem;
       font-size: 0.3rem;
       text-align: center;
   }
   .box{
       margin-bottom:0.2rem;
   }
   .select{
       font-size: 0.1rem;
   }
   .select option{
       font-size: .15rem;
   }
   .title{
		display:inline-block;
		width:20%;
		text-align:right;
		padding-right:20px;
	}
   .pw{
       width:60%;
       border: 1px solid #ccc;
       font-size: 0.3rem;
       padding:0.2rem 0.2rem 0.2rem 0.1rem;
   }
   .submit{
       width:40%;
       padding:0.2rem 0.2rem 0.2rem 0.1rem;
       font-size: 0.3rem;
       background: #ff5370;
       color:#fff;
       border-radius:.2rem;
   }
   .num{
       border: 1px solid #ccc;
       font-size:.3rem;
       padding:0.2rem 0.2rem 0.2rem 0.1rem;
   }
   .btn{
       border: 1px solid #ccc;
       font-size:.3rem;
       padding:0.2rem 0.2rem 0.2rem 0.1rem;
   }
</style>
