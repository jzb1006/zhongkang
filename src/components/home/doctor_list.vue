<template>
    <div id="doc_list">
        <!-- 头部 -->
         <searchBar :title="'医生'" :iconShow="true"></searchBar>
         <doctor></doctor>
         <div id="fill"></div>
    </div>
</template>
<script>
 import doctor from '@/components/doctor/list.vue'
 import searchBar from '@/components/common/search_bar.vue'
export default {
    components:{
        doctor,
        searchBar,   
    },
}
</script>
<style>

</style>