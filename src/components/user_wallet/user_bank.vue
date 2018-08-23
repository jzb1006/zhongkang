<template>
	<div id="bank">
        <div class="content">
            <div v-for="item in result"  class="box">
                <p>{{item.bankname}}</p>
                <p>{{item.banksn}}</p>
                <p class="remove" @click="remove(item.bankname,item.banksn)">解除绑定</p>
            </div>
            <div class="add">
                 <a href="javascript:;" @click="addBank">添加银行卡</a>
            </div>
        </div>
  	</div>
</template> 

<script>
import api from "../../api/user"
import common from "../../widget/lib/user"
import top from "@/components/decorate/top_back_title.vue";
export default {
    name: 'bank',
    data(){
    	return{
    		result:''
    	}
    },
    methods:{
        remove(bankname,banksn){
            if(window.confirm('确定解除吗？')){
                api.ajaxWalletPost('remove_bank',{'bankname':bankname,'banksn':banksn}).then(res=>{
                    this.getBankList();
                }).catch(error=>{
                    console.log(error);
                })
                return true;
             }else{
                return false;
             }
        },
        getBankList(){
            api.ajaxWalletGet('bank').then(res=>{
                this.result=res.data;
            }).catch(error=>{
                console.log(error);
            })
        },
        addBank(){
            common.checkLogin(this,'/home/addBank');
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.getBankList();
        })
    },
}
</script>

<style scoped>
    .content{
        margin-top:0.1rem;
        font-size: 0.3rem;
    }
    .box{
        position: relative;
        width:94%;
        margin:0 auto 0.25rem;
        text-align: left;
        background: #fff;
        padding:0.2rem;
    }
    .box p{
        padding-bottom:.1rem;
    }
    .remove{
        position: absolute;
        right:.2rem;
        top:.2rem;
        background: #ff5370;
        color:#fff;
        padding:0.2rem;
        /* border: 1px solid #000; */
    }
    .add a{
        display: block;
        width:30%;
        padding:0.2rem;
        margin-left:.2rem;
        background: #ff5370;
        color:#fff;
        text-decoration: none;
    }
</style>
