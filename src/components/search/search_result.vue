<template>
  <div id="searchResult">
     <searchTab></searchTab>
     <keep-alive>
          <!-- <searchAll v-if="tabIndex==0"></searchAll> -->
          <searchProduct v-if="tabIndex==1"></searchProduct>
          <searchHospital v-else-if="tabIndex==2"></searchHospital>
          <searchDoctor v-else-if="tabIndex==3"></searchDoctor>
     </keep-alive>
  </div>    
</template>
<script>
import searchTab from '@/components/search/search_result_tab.vue'
import searchAll from '@/components/search/search_result_all.vue'
import searchProduct from '@/components/search/search_result_Product.vue'
import searchDoctor from '@/components/search/search_result_Doctor.vue'
import searchHospital from '@/components/search/search_result_Hospital.vue'
export default {
    name:'searchResult',
    data(){
        return {
            result:'我是内容'
        }
    },
    computed:{
      tabIndex(){
          return this.$store.state.search.tabIndex
      }
    },
    components:{
        searchTab,
        searchAll,
        searchProduct,
        searchHospital,
        searchDoctor
    }
}
</script>
<style>

</style>
