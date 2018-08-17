<template>
	<div id="recharge">
		<top title="充值"></top>
		<div class="content">
			 <div class="div1">
			        <span class="span">充值金额:</span>
			 </div>
			 <div class="div1">
	               <span class="renminbi"><img src="../../assets/renminbi.png"></span>
	        	   <input type="number" v-model="amount" placeholder="输入充值金额" class="input">
			 </div>	
		</div>
		<div class="div2 meone">
		     <input type="button" value="下一步" @click="recharge" :class="classObject">
		</div>
  	</div>
</template> 

<script>
import api from "../../api/user"
import top from "@/components/decorate/top_back_title.vue";
export default {
    name: 'recharge',
    data(){
    	return{
    		amount:''
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
	    	var amount=parseFloat(value);	
	    	if(window.confirm('您充值的金额为'+amount+'元,确定吗？')){
	    		var order_sn=new Date().getTime();
	        	var subject="充值";
	            api.ajaxWalletPost('chongzhi',{'WIDout_trade_no':order_sn,'WIDsubject':subject,'WIDtotal_amount':amount}).then(res=>{
	            	if(res.data.error==3){
	            		alert(res.data.message);
	            		this.$router.push('/login');
	            	}else{
	            		this.$router.go(-1);
	            	}
	            	
	            }).catch(error=>{
	            	console.log(error);
	            })
	            return true;
	         }else{
	            return false;
	         }
    	}
    },
	components:{
		top
	}
}
</script>

<style scoped>
	.content{
		/*margin-top:240px;*/
		font-size: 0.3rem;
		border-top:2px solid #ccc;
		border-bottom:2px solid #ccc;
		text-align:left;
	}
	.renminbi img{
		width:45px;
		height:45px;
	}
	.div1,.input{
		padding:0.25rem 0.25rem 0.25rem 0.15rem;
		font-size: 0.35rem;
	}
	.input{
		border: 2px solid #ccc;
	}
	.div2{
		margin-top:0.4rem;
	}

	.next{
		font-size: 0.3rem;
		display:block;
        width:80%;
        border:2px solid #ccc;
        margin:0.3rem auto;
        padding:0.25rem 0;
		font-size: 0.35rem;
    }

	.toggleColor{
        background-color:#32CD32;
        color:#fff;
    }
</style>
