<template>
	<div id="bank_tem">
        <div class="content">
            <div v-for="(item,index) in result" :key="index" class="box">
                <p>{{item.bankname}}</p>
                <p>{{item.banksn}}</p>
                <p class="remove" @click="remove(item.bankname,item.banksn)">解除绑定</p>
            </div>
            <div class="add">
                 <router-link :to="{name:'container',query:{id:'51'}}">添加银行卡</router-link>
            </div>
        </div>
        <confirm v-model="confirmShow"
            title="操作提示"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            <p style="text-align:center;">确定解除吗</p>
        </confirm>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import top from "@/components/decorate/top_back_title.vue";
import {Confirm } from 'vux'
export default {
    name: 'bank_tem',
    data(){
        return{
            confirmShow:false,
            bankname:'',
            banksn:'',
        }
    },
    watch:{
        result(newV,oldV){
            console.log(newV);
        }
    },
    props:{
        result:{
            type:[Array,Object],
            default(){
                return [];
            }
        },
        getBankList:{
            type:Function,
            default(){return ''}
        }
    },
    methods:{
        onConfirm(){
            this.confirmShow = false;
            api.remove_bank({'bankname':this.bankname,'banksn':this.banksn}).then(res=>{
                // this.getBankList();
                this.$emit('update');
            }).catch(error=>{
                console.log(error);
            })
        },
        onCancel(){
            this.confirmShow=false;
        },
        remove(bankname,banksn){
            // if(window.confirm('确定解除吗？')){
            //     api.remove_bank({'bankname':bankname,'banksn':banksn}).then(res=>{
            //         this.getBankList();
            //     }).catch(error=>{
            //         console.log(error);
            //     })
            //     return true;
            //  }else{
            //     return false;
            //  }
            this.bankname=bankname;
            this.banksn=banksn;
            this.confirmShow=true;
        },
    },
    components:{
        Confirm,
    }
    // beforeRouteEnter(to,from,next){
    //     next(vm=>{
    //         vm.getBankList();
    //     })
    // },
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
