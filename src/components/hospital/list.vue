<template>
    <div id="doc_list">
        <hospital :list="result" :container_id="params.container_id"></hospital>
        <Loading v-show="loadinging"></Loading>
        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_docList"></LoadMore>
    </div>
</template>
<script>
import hospital from "@/templates/hospital/list.vue";
import LoadMore from "@/components/loadMore/index.vue";
import Loading from "@/components/decorate/loading.vue";
import api from "@/api/home";
   import { mixin } from "@/assets/js/mixins";
export default {
    components: {
        hospital,
        LoadMore,
        Loading
    },
    mixins: [mixin],
    data() {
        return {
            result: [],
            hasMore: 0,
            isBusy: false,
            ins_info: [],
            page: 1,
            num_list: this.params.number,
            // is_more
            is_more:this.params['is_more']||1,
            loadinging: true
        };
    },
    computed: {
        doctorList() {
            return this.result;
        },
        ins_name() {
            return this.ins_info["name"];
        }
    },
    props:{
     
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
               self.loadinging=false
           }).catch(error=>{
                self.loadinging=false
               console.log(error)
           })
       }
    },
    mounted() {
      console.log(this.params)
        this.$_ajax_docList();
    }
};
</script>
<style>

</style>
