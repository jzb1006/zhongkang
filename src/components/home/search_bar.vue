<template>
    <div id="search">
         <div class="-widget-top-bar">
            <div class="page-title">
                {{title}}
            </div>
            <div class="curr-location">{{address}}</div>
            <router-link :to="{name:'Search'}" class="show-search" v-show="iconShow">
               <i class="icon iconfont zk-icon-sousuo"></i>
            </router-link>
            <!-- <a href="" class="show-user">
                <i class="icon iconfont zk-icon-iconfonticon5"></i>
            </a> -->
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import BMap from '@/api/BMap';
export default {
    data(){
      return {
        //   address:''
      }
    },
    computed:{
      ...mapState({
          address:state=>state.BMap.city
      })
    },
    props:{
        title:{
            default:''
        },
        iconShow:{
            default:false
        }
    },
    methods:{
      $_ajax_location(){
           BMap.addressDetail(this) 
      }
    },
    mounted(){
      this.$_ajax_location();
    }
    
}
</script>
<style scoped>
    .-widget-top-bar {
    height: 1rem;
}
.-widget-top-bar .page-title {
    position: fixed;
    width: 100%;
        height: 1rem;
    line-height: 1rem;
    color: #333;
    font-size: 0.3rem;
    text-align: center;
    background-color: #fff;
    z-index: 4000;
}
.-widget-top-bar .curr-location {
    padding: 0 15px;
    left: 0;
    color: #72dacf;
    font-size: .65rem;
    max-width: 4.5rem;
    font-size: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.-widget-top-bar .curr-location, .-widget-top-bar .show-search, .-widget-top-bar .show-user {
    top: 0;
    height: 44px;
    line-height: 44px;
    z-index: 4001;
    position: fixed;
    text-align: center;
}
.-widget-top-bar .show-search {
        right: 0.2rem;
    width: 44px;
}


.-widget-top-bar .curr-location, .-widget-top-bar .show-search, .-widget-top-bar .show-user {
    top: 0.35rem;
    height: 0.3rem;
    line-height: 0.3rem;
    z-index: 4001;
    position: fixed;
    text-align: center;
}

a, body, canvas, div, figcaption, figure, footer, header, html, img, li, nav, p, section, span, ul {
    -webkit-user-select: none;
}

a {
    margin: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: 0 0;
    color: #666;
}
.-widget-top-bar .icon {
   font-size: 0.4rem;
    color: #ee003e;
}
.-widget-top-bar .show-user {
    right: 0.3rem;
    width: 0.3rem;
}
</style>