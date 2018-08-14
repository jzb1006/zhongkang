<template>
    <div id="licence">
       <preciew :list="licence"></preciew>
       <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>
<script>
import preciew from "@/components/decorate/preciew.vue";
import Alert from "@/components/decorate/alert.vue";
import api from "../../api/hospital";
    export default {
       components:{
         preciew,
         Alert
       },
       data(){
           return{
               ins_id:this.$route.params.ins_id,
               ins_info:[],
               alertShow:false,
               alerttType:'wran',
               alertText:'',
               licence:[]
           }
       },
       computed:{
           isShow(){
               return this.alertShow;
           }
       },
       methods:{
           $_ajax_licence(){
               var self = this;
               api.get_licence({
                   id:this.ins_id
               }).then(res=>{
                   var result = res.data.data;
                   var errcode = res.data.error_code;
                   var msg = res.data.msg;
                   if(errcode==0){
                      self.ins_info = result;
                      self.licence = [
                               {
                                msrc: api.imgPrifix()+self.ins_info['business_licence'],
                                src: api.imgPrifix()+self.ins_info['business_licence'],
                                w: 800,
                                h: 600
                            },
                      ]
                   }else{
                        self.alertShow=true
                        self.alertText=msg
                   }
                   console.log(res)
               }).catch(error=>{
                    console.log(error)
               })
           }
       },
       mounted(){
           this.$_ajax_licence();
       }
    }
</script>
<style>
  
</style>