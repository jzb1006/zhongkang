<template>
    <div id="searchContainer">
       <router-view></router-view>
      <div id="search">
         <searchBar></searchBar>
         <keep-alive>
            <component v-bind:is="mainOrResult"></component>
         </keep-alive>
         
      </div>
    </div>
  
</template>

<script>
import searchBar from '@/components/search/search_bar.vue'
import searchMain from '@/components/search/search_main.vue'
import searchResult from '@/components/search/search_result.vue'
export default {
  name: 'searchContainer',
  computed:{
    mainOrResult(){
      return this.$store.state.search.mainOrResult;
    },
    bus(){
      return this.$store.state.search.bus;
    }
  },
  mounted(){
    this.bus.$on('search',params=>{
      this.$store.dispatch('changeMainOrResult','searchResult')

    }),
    this.bus.$on('searchbar-cancle',params=>{
       this.$store.dispatch('changeMainOrResult','searchMain')
       
    })
  },
  components:{
    searchBar,
    searchMain,
    searchResult
  }
}
</script>

<style>

</style>
