<template>
	<div id="billItem">
		<!-- <router-link :to="{name:'billDetail',params:{order_sn:item.order_sn}}"> -->
		<div @click="toDetail(item.order_sn)">
			<div class="box">
				<div class="left">
					<p class="desc">{{item.changedesc}}</p>
					<p class="time">{{item.thismonth}}</p>
				</div>
				<div class="right">{{item.money}}</div>
			</div>
		<!-- </router-link> -->
		</div>
	</div>
</template>

<script>
	export default{
		name:'billItem',
		props:{
			item:{
				type:[Object,Array],
				required:true
			}
		},
		methods:{
			toDetail(sn){
				this.$store.dispatch('changeOrderSn',sn);
				this.$router.push('/billDetail');
			}
		}
	}
</script>

<style scoped>
	.box{
		border-bottom:1px solid #ccc;
		padding:0.2rem;
		background:#fff;
	}
	.box:after{
		content:'';
		display: block;
		clear:both;
	}
	.left{
		float:left;
		width:60%;
		text-align: left;
	}
	.right{
		float:right;
		width:40%;
		text-align: right;
	}
	.desc,.time{
		padding-bottom: .1rem;
	}
</style>