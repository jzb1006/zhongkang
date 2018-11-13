<template>
	<div id="billDetail">
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
			<!-- <div class="refund" @click="refund">申请退款</div>
			<div class="refund" @click="refundQuery">退款查询</div> -->
		</div>
	</div>
</template>

<script>
import api from "../../api/wallet"
import common from "../../widget/lib/user"
import {mapGetters} from 'vuex'
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
    computed:{
        // ordersn(){
        //     return this.getOrderSn
        // }
        ...mapGetters([
            'getOrderSn'
        ])
    },
	methods:{
		show(){
			// let ordersn=this.ordersn;
			api.ajaxWalletGet('detail',{'order_sn':this.getOrderSn}).then(res=>{
	            this.money=res.data.money;
	            this.changedesc=res.data.changedesc;
	            this.time=common.timestampToTime(res.data.time);
	            this.ordersn=res.data.order_sn;
	            this.tradeno=res.data.trade_no;
			}).catch(error=>{
				console.log(error);
			})
		},
		refund(){
			console.log(typeof this.money);
			window.location.href="http://192.168.0.110/m/pay.php?action=refund&order_sn="+this.ordersn+"&refund_reason=退款&refund_amount="+this.money+"&trade_no="+this.tradeno;
		},
		refundQuery(){
			window.location.href="http://192.168.0.110/m/pay.php?action=refundQuery&order_sn="+this.ordersn;
		}
	},
	// beforeRouteEnter (to, from, next) {
	// 	next(vm => {
	//         vm.ordersn=to.params.order_sn;
	//         vm.show();
	//     });
    // },
	components:{

	},
	mounted(){
		this.show();
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
	.refund{
		background: #ff5370;
       	color:#fff;
		padding:.25rem;
		width:20%;
		text-align: center;
		margin-top:.1rem;
	}
</style>