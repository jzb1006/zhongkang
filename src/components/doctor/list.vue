<template>
    <div id="doc_list">
        <!-- 头部 -->
         <doctor :list="doctorList" :route_link="'container'" :con_id="params['doc_detail_con_id']"></doctor>
         <Loading v-show="loadinging"></Loading>
         <LoadMore :state='hasMore' :isLoading='isBusy'  @loadmore="$_ajax_docList"></LoadMore>
    </div>
</template>
<script>
 import doctor from '@/templates/doctor/list.vue'
 import LoadMore from '@/components/loadMore/index.vue'
 import Loading from "@/components/decorate/loading.vue"
   import { mixin } from "@/assets/js/mixins";

 import api from '@/api/home';
export default {
    components:{
        doctor,
        LoadMore,
        Loading
    },
    mixins: [mixin],

    data(){
        return{
            result:[],
            hasMore:0,
            isBusy:false,
            ins_info:[],
            page:1,
            num_list:this.params['number'],
            loadinging:true
        }
    },
    computed:{
        doctorList(){
            return this.result
        },
        ins_name(){
            return this.ins_info['name'];
        }
    },
    methods:{
       $_ajax_docList(){
            var self = this;
             this.isBusy = true
           api.get_doctor_list({
               id:this.ind_id,
               page:this.page++,
               num_list:this.num_list
           }).then(res=>{
               var result = res.data;
               var errcode = result.error_code;
               var msg = result.msg;
               self.hasMore = result.data.hasMore;
               var doc_team = result.data.doctor;
               if(errcode==0){
                   if(doc_team){
                      self.result = self.result.concat(doc_team);
                   }   
                   self.ins_info = result.data.institution_info
               }
               self.isBusy=false;
               self.loadinging=false
           }).catch(error=>{
                self.loadinging=false
               console.log(error)
           })
           
       }
    },
    mounted(){
        this. $_ajax_docList();
    }
}
</script>
<style>

</style>