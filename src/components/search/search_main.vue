<template>
    <div id="searchMain">
       <Hot></Hot>
       <History></History>
    </div>
</template>
<script>
import Hot from '@/components/search/search_main_hot.vue'
import History from '@/components/search/search_history.vue'
export default {
    name:'Main',
    components:{
        Hot,
        History
    }
}
</script>
<style scope>
      @import "../../assets/css/Base.css";
</style>

