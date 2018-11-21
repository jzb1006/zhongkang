<template>
	<div id="phone">
		<!-- <top :params="{
				title:this.title,
			}"></top> -->
		<phoneTop></phoneTop>
		<showPhone></showPhone>
		<modifyPhone></modifyPhone>
	</div>
</template>

<script>
import top from '@/components/decorate/top.vue'
import {mapState,mapGetters} from 'vuex'
import showPhone from '@/components/user/show_phone.vue'
import modifyPhone from '@/components/user/modify_phone.vue'
import phoneTop from '@/components/user/phone_top.vue'
export default {
	name:'phone',
	// computed:{
	// 	...mapGetters([
	// 		'getUserinfo'
	// 	]),
	// 	title(){
	// 		if(this.getUserinfo.mobile_phone!=''){
	// 			return '修改手机号'
	// 		}else{
	// 			return '绑定手机号'
	// 		}
	// 	},
	// },
	components:{
		phoneTop,
		showPhone,
		modifyPhone,
	}
}
</script>

<style scoped>

</style>