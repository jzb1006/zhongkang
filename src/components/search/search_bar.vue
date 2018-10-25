<template>
  <div id="search">
    <div  id="SearchBar" class="">
        <div  id="searchbar-head">
            <div  class="searchbar-input">
                <span  class="iconfont icon-search"></span>
                <form  action="#" onsubmit="return false" class="search-wrapper">
                    <input  id="searchInput" type="search" @keypress.enter="enterHndler(this)" :placeholder="defaultKeywordRandom.prefix + defaultKeywordRandom.default_keyword" v-model="iptTxt">
                </form>
                <!---->
            </div>
            <span  class="searchbar-btn" @click="cancel">取消</span>
        </div>
        <div id="autoCompleteList" style="display: none;">
            <div  class="searchlist"></div>
        </div>
    </div>
    
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
  export default {
    name: 'Top',
    data(){
        return{
           iptTxt: '',
           searchList:[],
           isEnterSearch: false,
        }
    },
    methods:{
        enterHndler(event){
           this.isEnterSearch = true
            document.querySelector('#searchInput').blur();
            if (this.iptTxt === '' || !this.iptTxt) {
                this.iptTxt = this.defaultKeywordRandom.default_keyword
            }
            let keyword = this.iptTxt;
            this.$store.dispatch('changeKeyword',keyword);
            this.bus.$emit('search',-1);
            this.behavior.behavior_data(this.iptTxt,2);
        },
        cancel(){
          this.searchList=[];
          if(this.mainOrResult==='searchMain'){
            this.$store.dispatch("changeKeyword",'');
            this.$router.back(-1);
            return;
          };
           this.$store.dispatch("changeKeyword", '');
           this.bus.$emit("searchbar-cancle");
           
        }
    },
    computed:{
      ...mapState({
        bus: state=>state.search.bus,
        mainOrResult:state=>state.search.mainOrResult,
        defaultKeyword:state=>state.search.default_keyword,
      }),
      ...mapGetters([
        'defaultKeywordRandom'
      ])
    },
    mounted(){
      this.bus.$on('changeIpText',param=>{
        this.iptTxt = param
      }),
      this.bus.$on('changeIpTextOnTabChange',param=>{
        this.iptTxt = param
      }),
      this.bus.$emit('filterKeepAlive', true)
    }
  }
</script>
<style scoped>
 
 .search-wrapper {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}
#searchbar-head {
  background-color: #fff;
  height: 0.88rem;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  padding: 0 4%;
  border-bottom: 1px solid #ccc;
}
#searchbar-head .searchbar-input {
  padding-left: 0.4rem;
  padding-right: 0.3rem;
  background-color: #f5f5f5;
  line-height: 0.64rem;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  font-size: 0.28rem;
  color: #b8b8b8;
  border: 1px solid #ccc;
  border-radius: 999px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
#searchbar-head .searchbar-input input {
  font-size: 0.28rem;
  text-shadow: 0px 0px 0px #555;
  -webkit-text-fill-color: transparent;
  background-color: inherit;
  width: 100%;
  margin-left: 0.2rem;
}
#searchbar-head .searchbar-input input::-webkit-input-placeholder {
  color: #ccc;
  text-shadow: 0px 0px 0px #b8b8b8;
  -webkit-text-fill-color: initial;
}
#searchbar-head .searchbar-input input::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
#searchbar-head input[type=search]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
#searchbar-head .searchbar-btn {
  width: 0.8rem;
  margin-left: 0.3rem;
  color: #333;
  -webkit-flex: none;
      -ms-flex: none;
          flex: none;
}
#autoCompleteList {
  position: absolute;
  top: 0.88rem;
  left: 0;
  width: 100%;
  background-color: #fff;
  margin-bottom: 0.3rem;
  color: #333333;
}
#autoCompleteList .searchlist {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
      -ms-flex-flow: column;
          flex-flow: column;
  padding-bottom: 0.8rem;
}
#autoCompleteList .searchlist .item {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  width: 100%;
}
#autoCompleteList .searchlist .item .iconfont {
  font-size: 0.28rem;
  padding-right: 0.16rem;
}
#autoCompleteList .searchlist .item .name {
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  max-width: 6rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#autoCompleteList .searchlist .item .distance {
  font-size: 0.24rem;
  color: #B8B8B8;
  letter-spacing: 0;
}
#autoCompleteList .searchlist .item-wrapper {
  line-height: 0.8rem;
  padding: 0 0.3rem;
  border-bottom: 1px solid #ccc;
}
#autoCompleteList .searchlist .item-wrapper span:last-child {
  color: #333;
}
#autoCompleteList .searchlist .item-wrapper:last-child {
  border-bottom: 0;
}

</style>
