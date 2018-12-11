<template>
	<div id="modify_phone">
		<div class="content_phone">
			<div class="div">
			    <div class="vux-1px include_phone"><input type="text" class="phone" placeholder="新手机号码" v-model="newphone"></div>
			</div>
			<div class="div">
				<div class="code">
					<verificationCode :phoneNum="this.newphone" @inputCode="inputCode"></verificationCode>
				</div>
			</div>
			<div class="div">
			    <input type="button" value="修改" class="submit" @click="update_mobile">
			</div>
		</div>
		<Alert v-bind:Show.sync="alertShow" :alerttType="alerttType" :alertText="alertText"></Alert>
	</div>
</template>

<script>
import api from "../../api/setup";
import common from "../../widget/lib/user"
import top from '@/components/decorate/top.vue'
import verificationCode from '@/components/common/verification_code.vue'
import {mapState,mapGetters} from 'vuex'
import showPhone from '@/components/user/show_phone.vue'
import modifyPhone from '@/components/user/modify_phone.vue'
import Alert from "@/components/decorate/alert.vue";
import { setTimeout } from 'timers';
export default {
	name:'modify_phone',
	data(){
		return {
			newphone:'',
			code:'',
			alertShow:false,
			alerttType:'warn',
			alertText:'',
		}
	},
	methods:{
		inputCode(data){
            this.code=data;
		},
		// setTimeout(){
			
		// 	setTimeout(()=>{
		// 		console.log('aaa111');
		// 		this.alertShow=false;
		// 		console.log(this.alertShow);
		// 	},2000)
		// },
        update_mobile(){
        	let code=this.code;
			let mobileNum=this.newphone;
			var self=this;
        	if(!common.checkPhoneNum(self,mobileNum)){
                return false;
            }
        	if(!common.checkVerificationCode(self,code)){
                return false;
            }
        	api.updatemobile({'new_mobile':mobileNum,'yanzheng':code}).then(res=>{
                // if(res.data.error==3){
                // 	alert(res.data.message);
				// 	this.$router.push({name:'container',query:{id:'28'}});
				// }else 
				if(res.data.error==0){
					this.getUserinfo.mobile_phone=mobileNum;
					this.$store.dispatch('changeUserinfo',this.getUserinfo);
                    this.$router.push({name:'container',query:{id:'34'}});
				}else{
					this.alertShow=true;
					// setTimeout(()=>{this.alertShow=false;},2000)
                    this.alertText=res.data.message;
					// alert(res.data.message);
				}
				// this.setTimeout();
        	}).catch(error=>{
        		console.log(error);
        	})
		},
		// showToggle(data){
		// 	this.alertShow=data;
		// }
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
		},
		params(){
			return{title:this.title}
		},
	},
	components:{
		top,
		verificationCode,
		showPhone,
		modifyPhone,
		Alert,
	}
}
</script>

<style scoped>
	.content_phone{
		/*margin-top:1rem;*/
		font-size: 0.35rem;
		text-align: center;
	}
	.include_phone{
		width:70%;
        margin:0 auto;
		padding:.25rem .05rem;
		box-sizing: border-box;
	}
	.phone{
		position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
		box-sizing: border-box;
		/* margin:.1rem; */
		/* padding:0.15rem 0.1rem; */
		font-size: 0.3rem;
	}
	.code,.submit{
		width:70%;
        margin:0 auto;
	}
	.yan{
		box-sizing: border-box;
		position: relative;
        z-index:100;
        display:block;
        width:100%;
        margin:0 auto;
		padding:.15rem .15rem .15rem 0;
	}
	.div{
		margin-top:0.3rem;
	}
	.submit{
		padding:0.25rem 0.15rem;
		border:none;
		border-radius:0.2rem;
		font-size: 0.3rem;
		background: #ff5370;
        color:#fff;
	}
</style>