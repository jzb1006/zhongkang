<template>
	<div class="bill">
		<top title="账单"></top>
		<div class="content_bill">
		    <div class="head">
		        <div class="type">
		             <span class="span">交易类型:</span>
		             <select class="select" v-model="typeValue">
		                <option value="0">请选择</option>
		                <option value="1">账号余额提现</option>
		                <option value="2">支付宝支付</option>
		                <option value="3">微信支付</option>
		                <option value="4">充值</option>
		            </select>
		        </div>
		        <div class="btngroup">
		            <input type="button" class="button" value="近1周" @click="fn(0)">
		            <input type="button" class="button" value="近1月" @click="fn(1)">
		            <input type="button" class="button" value="近3月" @click="fn(2)">
		            <input type="button" class="button" value="近1年" @click="fn(3)">
		        </div>
		        <div class="div1">
		             <group>
					    <calendar title="起始日期:" v-model="timeStart" disable-future></calendar>
					 </group>
		        </div>
		        <div class="div1"> 
		             <group>
					    <calendar title="终止日期:" v-model="timeStop" disable-future></calendar>
					 </group>
		        </div>
		        <div class="query">
		             <input type="button" @click="select" value="查询" class="search" />
		    	</div>
		    </div>
		    <div class="billrecord">
		    	<div class="top" v-if="income!=0||cost!=0">
		    		<span>{{start}}至{{stop}}</span>
	                <span>总收入{{income}}</span>
	                <span>总支出{{cost}}</span>
		    	</div>
		    	<div v-else>
		    		<p>该时间段内没有账单记录</p>
		    	</div>
		    	<billitem v-for="r in result" v-bind:item="r" v-bind:key="r.order_sn"></billitem>
		    	<LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query"></LoadMore>
		    </div>
		</div>
  	</div>
</template> 

<script>
import api from "../../api/user"
import common from "../../widget/lib/user"
import top from "@/components/decorate/top_back_title.vue"
import billitem from '@/components/user_wallet/bill_item'
import LoadMore from '@/components/loadMore/index.vue'
import { Calendar } from 'vux'

export default {
    name: 'bill',
    data(){
    	return {
    		timeStart:'',
    		timeStop:'',
    		typeValue:'0',
    		result:[],
    		income:'',
    		cost:'',
    		count:0,
    		listnum:'10',
    		hasMore: 0,
            isBusy: false,
            isShow:false,
    	} 
	},
	computed:{
		start(){
			let timeStart=this.timeStart;
			var date = new Date(timeStart);
			return common.formatDate(date);
		},
		stop(){
			let timeStop=this.timeStop;
			var date=new Date(timeStop);
			return common.formatDate(date);
		}
	},
	methods:{
		fn(x){
			switch(x){
				case 0:
	              	this.timeStart=this.getdate(-6);
	              	this.select();
	                break;
	    		 case 1:
	    		    this.timeStart=this.getBeforeMonth(-1);
	    		    this.select();
	                break;
	    		 case 2:
	    		    this.timeStart=this.getBeforeMonth(-3);
	    		    this.select();
	    			break;
	    		case 3:
	    			this.timeStart=this.getBeforeYear(-1);
	    			this.select();
	    		    break;
			}
		},
		//获取日期,参数x为正值表示x天之后,为负值表示几天之前,为0表示当前日期,参数默认值为0
		getdate:function(x=0){
	    	let date = new Date();
	    	date.setDate(date.getDate()+x);
	        return common.formatDate(date);
	    },
        // 几个月之前
        getBeforeMonth(x){
        	let date = new Date();
        	date.setMonth(date.getMonth()+x);
	        return common.formatDate(date);
        },
        //几年之前
        getBeforeYear(x){
        	let date = new Date(); 
        	date.setFullYear(date.getFullYear()+x);
	        return common.formatDate(date);
        },
        query(){
        	this.count=this.count+1;
        	let count=this.count;
        	let listnum=this.listnum;
        	let postData={'typeValue':this.typeValue,'timeStart':this.timeStart,'timeStop':this.timeStop,'num':listnum,'page':count};
        	this.isBusy = true;
	        api.ajaxWalletPost('select_bill',postData).then(res=>{
	        	let data=res.data;
	        	this.result = this.result.concat(data);
	        	if(data[0].income){
	        		this.income=data[0].income;
	        	}
	        	if(data[0].cost){
	        		this.cost=data[0].cost;
	        	}
	        	this.hasMore = data[0].hasMore;
	        	this.isBusy=false;
	        }).catch(error=>{
	            console.log(error);
	        })
        },
        select(){
        	this.count=0;
        	this.result=[];
        	this.query();
        },
        dpr() {
			(function(e, l) {
			var c, k, d, f = e.document,
			g = f.documentElement,
			h = l.flexible || (l.flexible = {});
			(function() {
			var a, b = f.querySelector('meta[name="viewport"]');
			c = e.devicePixelRatio || 1;
			a = 1;
			g.setAttribute("data-dpr",0);
			a = "width=device-width, initial-scale=" + a + ", minimum-scale=" + a + ", maximum-scale=" + a + ", user-scalable=no";
			b ? b.setAttribute("content", a) : (b = f.createElement("meta"), b.setAttribute("name", "viewport"), b.setAttribute("content", a), (f.head || g.firstElementChild).appendChild(b))
			})();
			})(window, window.FT || (window.FT = {}));
		}
	},
	created(){
        this.timeStart=this.getdate(-6);
        this.timeStop=this.getdate();
        this.query();
	},
	mounted(){
		this.dpr();
	},
	components:{
		top,
		billitem,
		LoadMore,
		Calendar
	}
}
</script>

<style scoped>
	.content_bill{
		font-size: .33rem;
		text-align: center;
	}
	.head{
		padding-bottom:0.3rem;
	}
	.billrecord{
		margin-bottom:1.2rem;
	}
	.span{
		padding-top:0.2rem;
        padding-left:0.1rem;
		float:left;
		width:35%;
		box-sizing: border-box;
	}
	.btngroup{
		background: #fff;
		padding:0.1rem 0;
	}
	.button{
		background: #fff;
		border:2px solid red;
		color:red;
		padding:0.1rem;
		border-radius:0.1rem;
		margin-right:0.15rem;
	}
	.select{
		float:right;
		width:65%;
		padding:0.1rem 0 0.1rem 0.1rem;
		box-sizing: border-box;
		font-size:14px;
	}
	.type{
		margin-top:0.1rem;
		padding-right:0.5rem;
		padding-top:0.1rem;
		padding-bottom:0.1rem;
		background: #ccc;
	}
	.type:after{
		content:'';
		display: block;
		clear: both;
	}
	.div1{
		padding-top:0.1rem;
		background: #ccc;
		padding-bottom:0.1rem;
	}
	.top{
		padding-bottom:0.1rem;
		border-bottom: 2px solid #ccc;
	}
	.search{
		width:80%;
		background: red;
		color:#fff;
		margin:.1rem;
		padding:0.15rem 0;
		border-radius: 0.15rem;
	}
</style>
<!-- <style>
	.calendar-header{
		font-size: .8rem!important;
	}
	.week{
		font-size: .5rem!important;
		text-align: center!important;
	}
</style> -->

