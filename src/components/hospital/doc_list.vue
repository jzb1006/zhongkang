<template>
    <div id="doc_list">
        <!-- 头部 -->
        <top :title="ins_name+'医生列表'"></top>
         <doctor :list="doctorList" :ins_id="ind_id"></doctor>
         <LoadMore :state='hasMore' :isLoading='isBusy'  @loadmore="$_ajax_docList"></LoadMore>
    </div>
</template>
<script>
 import top from "@/components/decorate/top_back_title.vue";
 import doctor from '@/components/doctor/list.vue'
 import LoadMore from '@/components/loadMore/index.vue'
 import api from '@/api/doctor';
export default {
    components:{
        top,
        doctor,
        LoadMore
    },
    data(){
        return{
            ind_id:this.$route.params.ins_id,
            result:[],
            hasMore:0,
            isBusy:false,
            ins_info:[],
            page:1,
            num_list:5
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
               var doc_team = result.data.doc_team;
               if(errcode==0){
                   if(doc_team){
                      self.result = self.result.concat(doc_team);
                   }   
                   self.ins_info = result.data.institution_info
               }
               self.isBusy=false;
               console.log(res);
           }).catch(error=>{
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