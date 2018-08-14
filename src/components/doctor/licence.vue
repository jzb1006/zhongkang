<template>
    <div id="licence">
       <preciew :list="licence"></preciew>
       <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>
<script>
import preciew from "@/components/decorate/preciew.vue";
import Alert from "@/components/decorate/alert.vue";
import api from "../../api/doctor";
    export default {
       components:{
         preciew,
         Alert
       },
       data(){
           return{
               doc_id:this.$route.params.doc_id,
               doc_info:[],
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
               api.doc_home({
                   id:this.doc_id
               }).then(res=>{
                   var result = res.data.data;
                   console.log(result.doc_info);
                   var errcode = res.data.error_code;
                   var msg = res.data.msg;
                   if(errcode==0){
                      self.doc_info = result.doc_info;
                      self.licence = [
                               {
                                msrc: api.imgPrifix()+self.doc_info['business_licenses'],
                                src: api.imgPrifix()+self.doc_info['business_licenses'],
                                w: 800,
                                h: 600
                            },
                            {
                                msrc: api.imgPrifix()+self.doc_info['medical_licenses'],
                                src: api.imgPrifix()+self.doc_info['medical_licenses'],
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