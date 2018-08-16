<template>
    <div id="product-item" >
        <div v-if="expert_item_list.length>0" :key="y" v-for="(i,y) in expert_item_list">
            <span :key="index" v-for="(item,index) in getItems" v-if="i[0]==item">{{i[1]}}&nbsp;</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                expert_item_list : [
                   ["10001","眼部整形"],
                   ["10003","鼻部整形"],
                   ["10006","面部轮廓"],
                   ["10007","唇部整形"],
                   ["10008","胸部整形"],
                   ["10009","美体塑形"],
                   ["10010","皮肤美容"],
                   ["10011","抗衰抗初老"],
                   ["10012","私密整形"],
                   ["10013","牙齿美容"],
                   ["10015","毛发种植"],
                   ["10017","耳部整形"],
                   ["10018","其他"],
                   ["10019","自体脂肪"],
                   ["10020","玻尿酸"],
                   ["10021","肉毒素"],
                   ["10022","激光脱毛"],
                   ["10023","半永久妆"],
                   ["10026","眼科"],
                   ["10027","妇产科"],
                   ["10028","健康管理"],
                   ["10029","SPA\/按摩"],
                   ["-1","微整形"],
                   ["-2","激光美肤"],
                   ["-3","抗衰老"],
                   ["-4","失败修复"]
                ],
              
            }
        },
        props: {
            items: {
                type: String,
                request: true
            }
        },
        computed:{
          getItems(){
              try{
                  return this.items.split(',')
              }
              catch(e){
                  return []
              }
             
          }
        },
    }
</script>
<style scoped>
 #product-item div{
     display: inline;
     font-size: 0.25rem;
 }
</style>