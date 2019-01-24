<template>
	<div id="bill_query_tem">
		<!-- <Loading v-show="loadinging"></Loading> -->
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
				<group>
					<calendar title="起始日期:" v-model="startTime" disable-future></calendar>
				</group>
				<group>
					<calendar title="终止日期:" v-model="stopTime" disable-future></calendar>
				</group>
		        
		        <div class="query">
		             <input type="button" @click="select" value="查询" class="search" />
		    	</div>
		    </div>
		</div>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import common from "../../widget/lib/user"
import billitem from '@/components/wallet/bill_item.vue'
import LoadMore from '@/components/loadMore/index.vue'
import Loading from "@/components/decorate/loading.vue";
import nosearch from "@/components/nosearch/index.vue";
import { Calendar,Group } from 'vux'

export default {
    name: 'bill_query_tem',
    data(){
    	return {
            // timeStart:'',
            startTime:'',
            stopTime:'',
    		// timeStop:'',
    		typeValue:'0',
    		result:[],
    		income:'',
    		cost:'',
    		count:0,
    		listnum:'10',
    		hasMore: 0,
            isBusy: false,
			isShow:false,
			loadinging:true
    	} 
    },
    watch:{
        timeStart(newV,oldV){
            console.log(newV);
            this.startTime=newV;
        },
        timeStop(newV,oldV){
            console.log(newV);
            this.stopTime=newV;
        }
    },
    props:{
        timeStart:{
            type:String,
            default:'',
        },
        timeStop:{
            type:String,
            default:'',
        }
    },
	computed:{
		// start(){
		// 	let timeStart=this.timeStart;
		// 	var date = new Date(timeStart);
		// 	return common.formatDate(date);
		// },
		// stop(){
		// 	let timeStop=this.timeStop;
		// 	var date=new Date(timeStop);
		// 	return common.formatDate(date);
		// }
	},
	methods:{
		fn(x){
			switch(x){
				case 0:
                    this.startTime=this.getdate(-6);
	                break;
	    		 case 1:
	    		    this.startTime=this.getBeforeMonth(-1);
	                break;
	    		 case 2:
	    		    this.startTime=this.getBeforeMonth(-3);
	    			break;
	    		case 3:
	    			this.startTime=this.getBeforeYear(-1);
	    		    break;
            }
            this.stopTime=this.getdate();
	        this.select();
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
        // query(){
        // 	this.count=this.count+1;
        // 	let count=this.count;
        // 	let listnum=this.listnum;
        // 	let postData={'typeValue':this.typeValue,'timeStart':this.startTime,'timeStop':this.stopTime,'num':listnum,'page':count};
        // 	this.isBusy = true;
	    //     api.select_bill(postData).then(res=>{
		// 		console.log(res);
	    //     	let data=res.data;
	    //     	this.result = this.result.concat(data);
	    //     	if(data[0].income){
	    //     		this.income=data[0].income;
	    //     	}
	    //     	if(data[0].cost){
	    //     		this.cost=data[0].cost;
	    //     	}
	    //     	this.hasMore = data[0].hasMore;
		// 		this.isBusy=false;
		// 		this.loadinging=false;
	    //     }).catch(error=>{
	    //         console.log(error);
	    //     })
        // },
        select(){
        	// this.count=0;
        	// this.result=[];
            // this.query();
            this.$emit('query',{'typeValue':this.typeValue,'timeStart':this.startTime,'timeStop':this.stopTime,})
        }
	},
	created(){
        // this.timeStart=this.getdate(-6);
        // this.timeStop=this.getdate();
        // this.query();
	},
	components:{
		top,
		billitem,
		LoadMore,
		Calendar,
		Group,
		Loading,
		nosearch
	}
}
</script>
<style>
/* @import url("./../../assets/css/calandar.css"); */
#bill_query_tem .weui-cells {
    padding: .4rem .2rem!important;
}
</style>
<style scoped>
	#bill{
		background:#f0f0f0;
	}
	.content_bill{
		font-size: .33rem;
		text-align: center;
	}
	.head{
		padding-bottom:0.3rem;
	}
	.span{
		padding-top:0.2rem;
        padding-left:0.1rem;
		float:left;
		font-size:.3rem;
		width:35%;
		box-sizing: border-box;
	}
	.btngroup{
		margin:.2rem 0;
	}
	.button{
		border:1px solid red;
		background: #fff;
		color:#ff5370;;
		padding:.1rem .2rem;
		font-size:.3rem;
		border-radius:.1rem;
		margin-right:.15rem;
	}
	.select{
		float:right;
		width:65%;
		padding:0.1rem 0 0.1rem 0.1rem;
		box-sizing: border-box;
		font-size:.25rem;
	}
	.select option{
		font-size:.15rem;
	}
	.type{
		margin-top:0.1rem;
		padding-right:0.5rem;
		padding-top:0.1rem;
		padding-bottom:0.1rem;
		background:#fff;
	}
	.type:after{
		content:'';
		display: block;
		clear: both;
	}
	.div1{
		padding-top:.05rem;
		padding-bottom:0.1rem;
	}
	.top{
		padding-top:.4rem;
		padding-bottom:.4rem;
		background:#fff;
		/* border-bottom: 1px solid #ccc; */
	}
	.search{
		width:80%;
		margin:.1rem;
		padding:.15rem 0;
		font-size:0.3rem;
		border-radius: 0.15rem;
		background: #ff5370;
        color:#fff;
	}
	.bg{
		background:#fff;
	}
	.nosearch{
		position: relative;
		top:-50%;
	}
</style>

