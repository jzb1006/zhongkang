<template>
	<div id="billDetail">
		<top title="账单详情"></top>
		<div class="content">
			<p class="p">
				<span class="span_left">订单金额:</span>
				<span class="span_right">{{money}}</span>
			</p>
			<p class="p">
				<span class="span_left">订单说明:</span>
				<span class="span_right">{{changedesc}}</span>
			</p>
			<p class="p">
				<span class="span_left">创建时间:</span>
				<span class="span_right">{{time}}</span>
			</p>
			<p class="p">
				<span class="span_left">订单号:</span>
				<span class="span_right">{{ordersn}}</span>
			</p>
			<p class="p">
				<span class="span_left">交易号:</span>
				<span class="span_right">{{tradeno}}</span>
			</p>
		</div>
	</div>
</template>

<script>
import api from "../../api/wallet"
import common from "../../widget/lib/user"
import top from "@/components/decorate/top_back_title.vue";
export default{
	name:'billDetail',
	data(){
		return{
			money:'',
			changedesc:'',
			time:'',
			tradeno:'',
			ordersn:''
		}
	},
	methods:{
		show(){
			let ordersn=this.ordersn;
			api.ajaxWalletGet('detail',{'order_sn':ordersn}).then(res=>{
	            this.money=res.data.money;
	            this.changedesc=res.data.changedesc;
	            this.time=common.timestampToTime(res.data.time);
	            this.ordersn=res.data.order_sn;
	            this.tradeno=res.data.trade_no;
			}).catch(error=>{
				console.log(error);
			})
		}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
	        vm.ordersn=to.query.order_sn;
	        vm.show();
	    });
	},
	components:{
		top
	}
}
</script>

<style scoped>
	.content{
		margin-top:0.15rem;
		font-size: 0.35rem;
	}
	.p{
		text-align: left;
		margin-bottom:0.2rem;
	}
	.span_left{
		display: inline-block;
		padding-left:0.15rem;
		margin-right:0.15rem;
	}
</style>