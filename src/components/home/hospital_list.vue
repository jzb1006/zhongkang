<template>
    <div id="doc_list">
        <!-- 头部 -->
        <searchBar :title="'机构'" :iconShow="true"></searchBar>
        <hospital :list="result"></hospital>
         <LoadMore :state='hasMore' :isLoading='isBusy'  @loadmore="$_ajax_docList"></LoadMore>
    </div>
</template>
<script>

 import hospital from '@/components/hospital/list.vue'
 import LoadMore from '@/components/loadMore/index.vue'
 import searchBar from '@/components/home/search_bar.vue'
 import api from '@/api/home';
export default {
    components:{
        hospital,
        LoadMore,
        searchBar
    },
    data(){
        return{
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
           api.institution_list({
               id:this.ind_id,
               page:this.page++,
               num_list:this.num_list
           }).then(res=>{
               console.log(res)
               var result = res.data;
               var errcode = result.error_code;
               var msg = result.msg;
               self.hasMore = result.data.hasMore;
               var doc_team = result.data.institution;
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
@import "../../assets/css/Base.css";
</style>