<template>
	<div id="phone">
		<top v-bind:title="title"></top>
		<div class="content_phone">
			<div v-if="getUserinfo.mobile_phone!=''" class="current">
				<p>{{getUserinfo.mobile_phone}}</p>
				<p>当前手机号</p>
			</div>
			<div v-else class="current">
				<p>您未绑定手机号，请绑定</p> 
			</div>
			<div class="div1">
			    <input type="text" class="phone" placeholder="新手机号码" v-model="newphone">
			</div>
			<div class="div1">
				<div class="code">
					<input type="text" class="input yan" placeholder="手机验证码" v-model="code">
					<input type="button" value="获取验证码" class="input get" @click="get_yanzhengma">
				</div>
			</div>
			<div class="div1">
			    <input type="button" value="修改" class="submit" @click="update_mobile">
			</div>
		</div>
	</div>
</template>

<script>
import api from "../../api/user";
import common from "../../widget/lib/user"
import top from '@/components/decorate/top_back_title.vue'
import {mapState,mapGetters} from 'vuex'
export default {
	name:'phone',
	data(){
		return {
			newphone:'',
			code:''
		}
	},
	methods:{
		//获取验证码(手机号码未存在才发送验证码）
        get_yanzhengma(){
            let mobileNum=this.newphone;
            if(!common.checkPhoneNum(mobileNum)){
                return false;
            }
            common.getVerificationCode(mobileNum);
        },
        update_mobile(){
        	let code=this.code;
        	let mobileNum=this.newphone;
        	if(!common.checkPhoneNum(mobileNum)){
                return false;
            }
        	if(!common.checkVerificationCode(code)){
                return false;
            }
        	api.ajaxSetupPost('updatemobile',{'new_mobile':mobileNum,'yanzheng':code}).then(res=>{
                if(res.data.error==3){
                	alert(res.data.message);
					this.$router.push({path:'/login'});
				}else if(res.data.error==0){
					this.getUserinfo.mobile_phone=mobileNum;
					this.$store.dispatch('changeUserinfo',this.getUserinfo);
                    this.$router.push({path:'/home/userSetup'});
				}else{
					alert(res.data.message);
				}
        	}).catch(error=>{
        		console.log(error);
        	})
        }
	},
	computed:{
		...mapGetters([
			'getUserinfo'
		]),
		title(){
			if(this.getUserinfo.mobile_phone!=''){
				return '修改手机号'
			}else{
				return '绑定手机号'
			}
		}
	},
	components:{
		top
	}
}
</script>

<style scoped>
	.content_phone{
		/*margin-top:1rem;*/
		font-size: 0.35rem;
		text-align: center;
	}
	.current{
		font-size: 0.4rem;
		background:#abcdef;
		height:2.5rem;
		padding-top:0.8rem;
	}
	.phone,.code,.submit{
		width:70%;
        margin:0 auto;
	}
	.phone{
		border:1px solid #ccc;
		padding:0.25rem 0.15rem;
		font-size: 0.3rem;
	}
	.input{
		border:1px solid #ccc;
		padding:0.25rem 0.15rem;
		font-size: 0.3rem;
	}
	.yan{
		width:62%;
		box-sizing: border-box;
	}
	.get{
		width:35%;
		box-sizing: border-box;
	}
	.div1{
		margin-top:0.3rem;
	}
	.submit{
		width:70%;
		padding:0.25rem 0.15rem;
		border:none;
		border-radius:0.2rem;
		font-size: 0.3rem;
		background: #ff5370;
        color:#fff;
	}
</style>