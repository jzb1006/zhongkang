<template>
	<div id="balance">
		<div class="content">
			<div class="balance">
				<div class="text">余额(元)</div>
				<div class="num">{{money}}</div>
			</div>
            <div class="recharge" @click="toRecharge">充值</div>
            <div class="cash" @click="toCash">提现</div>            
		</div>
  	</div>
</template> 

<script>
import api from "../../api/user"
import common from "../../widget/lib/user"
export default {
    name: 'balance',
    data(){
    	return{
    		money:'',
            title:'余额'
    	}
    },
    methods:{
        getBalance(){
            api.ajaxWalletGet('balance').then(res=>{
                this.money=res.data.user_money;
            }).catch(error=>{
                console.log(error);
            })
        },
        toRecharge(){
            common.checkLogin(this,'/home/recharge');
        },
        toCash(){
            common.checkLogin(this,'/home/cash');
        }

    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.getBalance();
        })
    },

}
</script>

<style scoped>
    .content{
        font-size: 0.3rem;
        width: 100%;
    }
    .balance{
        margin: 0 0.25rem 0.25rem;
        background:#fff;
        height: 2.5rem;
        padding: 0.4rem 0.5rem;
        box-sizing: border-box;
        border-radius:.2rem;
    }
    .num{
        margin-top:.4rem;
        font-size:.8rem;
    }
    .recharge,.cash{
        border: 1px solid #ccc;
        margin: 0 0.25rem 0.25rem;
        padding: 0.25rem 0.15rem;
    }
    .recharge{
        background: #ff5370;
        color:#fff;
    }
</style>
