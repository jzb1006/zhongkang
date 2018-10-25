<template>
	<div id="recharge">
		<top title="充值"></top>
		<div class="content vux-1px-b">
			 <div class="text">
			        <span class="span">充值金额:</span>
			 </div>
			 <div class="div1">
	               <span class="renminbi"><i class="zk-icon-renminbi1"></i></span>
	        	   <div class="vux-1px include"><input type="number" v-model="amount" placeholder="输入充值金额" class="input"></div>
				   <div class="clear"></div>
			 </div>	
		</div>
		<div class="div2 meone">
		     <input type="button" value="下一步" @click="recharge" :class="classObject">
		</div>
		<pay :show_pay_page="this.show_pay_page" @cancel="cancel" :order_sn="order_sn" :order_amount="this.amount" jump_url="http://192.168.0.110:8080/#/home/balance" subject="8" v-if="this.amount!=''"></pay>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import top from "@/components/decorate/top_back_title.vue"
import Alert from "@/components/decorate/alert.vue";
import pay from "@/components/common/pay.vue"
export default {
    name: 'recharge',
    data(){
    	return{
			amount:'',
			show:false,
			confirmTitle:'',
			alertShow:false,
			alerttType:'warn',
			alertText:'',
			show_pay_page:false,
			order_sn:'8'+new Date().getTime(),
    	}
    },
    computed:{
    	classObject(){
    		return{
    			next:true,
    			toggleColor:this.amount!=''
    		}	
		}
    },
    methods:{
    	recharge(){
    		var value=this.amount;
	    	if(value==""||value==0){
				alert("充值金额不能为空且不能为零");
	        	return false;
	    	}
	    	if(value.indexOf('.')==-1){
	    		if(parseInt(value)>100000){
	    			alert('您输入的金额超过最高额度100000元');
	    			return false;
	        	}
	    	}else{
	        	if(parseInt(value.split('.')[0])>100000){
	        		alert('您输入的金额超过最高额度100000元');
	    			return false;
	        	}else if(value.split('.')[1].length>2){
	        		alert('充值金额精确到分');
	    			return false;
	        	}
			}
			this.show_pay_page=true;
	    	
		},
		cancel(){
			this.show_pay_page=false;
		},

	},
	mounted(){

	},
	components:{
		top,
		pay,
	}
}
</script>

<style scoped>
	.content{
		font-size: .3rem;
		text-align:left;
	}
	.renminbi{
		float:left;
		width:10%;
		box-sizing: border-box;
		line-height: .6rem;
	}
	.include{
		width:80%;
		float:left;
		padding:.2rem;
		box-sizing: border-box;
		font-size: .3rem;
	}
	.clear{
		content:"";
		display:block;
		clear:both;
	}
	.input{
		font-size: .3rem;
		position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
	}
	.text{
		padding:.25rem .25rem .25rem .15rem;
		font-size: .3rem;
	}
	.div1{
		padding:.25rem .25rem .6rem .15rem;
		font-size: .3rem;
		position: relative;
		height:.6rem;
	}
	.div2{
		margin-top:.4rem;
	}
	.next{
		font-size: .3rem;
		display:block;
        width:60%;
        margin:.3rem auto;
        padding:.2rem 0;
		font-size: .3rem;
    }
	.toggleColor{
        background: #ff5370;
        color:#fff;
    }
</style>
