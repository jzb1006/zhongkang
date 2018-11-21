<template>
	<div id="password">
		<top :params="params"></top>
		<modifyPassword></modifyPassword>
	</div>
</template>

<script>
import top from '@/components/decorate/top.vue'
import modifyPassword from '@/components/user/modify_password.vue'
export default {
	name:'password',
	data(){
		return {
			params:{
				title:'修改密码',
			}
		}
	},
	components:{
		top,
		modifyPassword,
	}
}
</script>

<style scoped>

</style>