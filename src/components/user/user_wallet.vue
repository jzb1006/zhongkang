<template>
    <div id="wallet">
          <top title="钱包"></top>
  	      <div class="wallet_content">
              <span class="span" @click="toBalance">余额</span>
              <span class="span" @click="toBank">银行卡</span>
              <span class="span" @click="toBill">账单</span>
          </div>
    </div>
</template>

<script>
import common from "../../widget/lib/user"
import top from '@/components/decorate/top_back_title.vue'
export default {
    name: 'wallet',
    methods:{
        toBalance(){
            common.checkLogin(this,'/home/balance');
        },     
        toBank(){
            common.checkLogin(this,'/home/bank');
        },
        toBill(){
            common.checkLogin(this,'/bill');
        }
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .wallet_content{
        background-color: #ccf;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.3rem;
        text-align: center;
    }
    .span{
        display:inline-block;
        width:32%;
    }
</style>