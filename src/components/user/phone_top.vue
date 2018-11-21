<template>
	<div id="phone_top">
		<top :params="{
				title:this.title,
			}"></top>
	</div>
</template>

<script>
import top from '@/components/decorate/top.vue'
import {mapState,mapGetters} from 'vuex'
export default {
	name:'phone_top',
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
	},
	components:{
		top,
	}
}
</script>

<style scoped>

</style>