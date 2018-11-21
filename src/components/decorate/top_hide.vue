<template>
    <!--头部返回-->
    <div>
      <div id="title_back">
          <div class="navbar">
            <span class="title">{{params.title}}</span>
            <span class="zk-icon-fanhui fanhui" @click="hide()"></span>
            <span class="next" @click="params.next" v-if="params.hasBtn">{{params.btnText}}</span>
          </div>
      </div>
      <div id="iso"></div>
    </div>
</template>
<script>
import Bus from '@/assets/bus.js'
export default {
    props:{
        params:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        hide(){
            Bus.$emit('hide');
        }
    }
}
</script>
<style scoped>  
    .navbar {
        height: 1rem;
        line-height: 1rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        color: #fff;
        text-align: center;
        background: #ff5370;
        letter-spacing: 0.028rem;
        font-size: 15px;
        z-index:1000;
    }
    .navbar .title {
        font-size: .3rem;
    }
    .navbar .fanhui {
        padding: 0.111rem;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: 1000;
        font-size: 0.4rem;
    }
    .navbar .next{
        position:absolute;
        top: 50%;
        right: .3rem;
        transform: translateY(-50%);
        font-size: .3rem;
        color:aquamarine;
    }
    
</style>