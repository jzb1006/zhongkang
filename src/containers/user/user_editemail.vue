<template>
	<div id="email">
		<email-top></email-top>
		<modify-email></modify-email>
	</div>
</template>

<script>
// import top from '@/components/decorate/top.vue'
import emailTop from '@/components/user/emailTop'
import modifyEmail from '@/components/user/modifyEmail'
// import {mapState,mapGetters} from 'vuex'
export default {
	name:'email',
	data(){
		return{
			email:'',
			// params:{
			// 	title:this.title
			// }
		}
	},
	computed:{
		// ...mapGetters([
		// 	'getUserinfo'
		// ]),
		// title(){
		// 	if(this.getUserinfo.email!=''){
		// 		return '修改邮箱';
		// 	}else{
		// 		return '绑定邮箱';
		// 	}
		// },
		// params(){
		// 	return{
		// 		title:this.title,
		// 	}
		// }
	},
	components:{
		// top,
		emailTop,
		modifyEmail,
	}
}
</script>

<style scoped>

</style>