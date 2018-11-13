<template>
	<div id="modifyPassword">
		<div class="content_password">
			<div class="div1">
		        <div class="span">原密码:</div><div class="vux-1px include"><input type="password" placeholder="原密码" v-model="oldPassword" class="input"></div>
			</div>
			<div class="div1">
		        <div class="span">新密码:</div><div class="vux-1px include"><input type="password" placeholder="新密码" v-model="newPassword"  class="input"></div>
			</div>
			<div class="div1">
		        <div class="span">确认密码:</div><div class="vux-1px include"><input type="password" placeholder="确认密码" v-model="confirmPassword" class="input"></div>
			</div>
			<div class="div1">
		        <input type="button" value="修改" @click="update_pass" class="submit">
			</div>		
		</div>
	</div>
</template>

<script>
import api from "../../api/setup";
import common from "../../widget/lib/user"
export default {
	name:'modifyPassword',
	data(){
		return {
			oldPassword:'',
			newPassword:'',
			confirmPassword:''
		}
	},
	methods:{
		update_pass(){
			let oldPassword=this.oldPassword;
			let newPassword=this.newPassword;
			let confirmPassword=this.confirmPassword;
            if(oldPassword==''){
				alert('原密码不能为空');
				return false;
			}
			if(!common.checkPassword(newPassword)){
				return false;
			}
		    if(newPassword==oldPassword){
			   alert('新旧密码不能相同');
				return false;
		    }
		    if(confirmPassword==''){
				alert('请确认密码');
				return false;
			}
		    if(confirmPassword!=newPassword){
			    alert('新密码与确认密码不相同');
				return false;
		    }
			api.update_pass({'oldpass':oldPassword,'newpass':newPassword,'rp_pass':confirmPassword}).then(res=>{
		    	if(res.data.error==3){
		    		alert("请先登录！");
					this.$router.push({path:'/login'});
				}else if(res.data.error==0){
					alert("密码修改成功,请重新登录");
					this.$router.push('/login');
					this.$store.dispatch('changeIsBackToPrevious',false);
				}else{
					alert(res.data.message);
				}
		    }).catch(error=>{
		    	console.log(error);
			})
		}
	},
	components:{
		top,
	}
}
</script>

<style scoped>
	.content_password{
		margin-top:2rem;
		font-size: 0.3rem;
		text-align: center;
	}
	.div1{
		width:80%;
		margin:.3rem auto;
		height: 1rem;
		vertical-align: middle;
		position: relative;
	}
	.div1::after{
		content:'';
        display:block;
        clear:both;
	}
	.span{
		width:25%;
		float:left;
		text-align:right;
		margin-right:.2rem;
		line-height: 1rem;
	}
	.include{
		width:60%;
		float:left;
		padding:0.2rem;
		font-size: 0.3rem;
		position:absolute;
		top:50%;
		right:0;
		transform: translateY(-50%);
	}
	.input{
		font-size: 0.3rem;
		position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
	}
	.submit{
		width:60%;
		padding:0.25rem 0.25rem 0.25rem 0.15rem;
		font-size: 0.3rem;
		background: #ff5370;
		color:#fff;
		border-radius:.2rem;
	}
</style>