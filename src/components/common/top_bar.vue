<template>
    <!--头部返回-->
      <div id="title_back">
          <div class="navbar">
            <span class="title"></span>
            <span class="zk-icon-fanhui2 fanhui" @click="back()"></span>
            <span class="zk-icon-home home" @click="home()"></span>
          </div>
      </div>
</template>
<script>
export default {
    props:{
        
    },
    methods:{
        back(){
            this.$router.back(-1);
        },
        home(){
            this.$router.push({name:'diaryList'});
        }
    }
}
</script>
<style>
    .navbar {
        height: 1rem;
        line-height: 1rem;
        position: fixed;
        text-align: center;
        /* background: #ff5370; */
        letter-spacing: 0.028rem;
        font-size: 0;
        width: 100%;
        z-index: 100;
    }
    .navbar .title {
        font-size: 0.3rem;
        color: #fff;
    }
    .navbar .fanhui{    
        left: 0.1rem;
    }
    .navbar .home{
        right: 0.1rem;
    }
    .navbar .fanhui ,.navbar .home{
        top: 50%;
        color: #c0bfc4;
        position: absolute;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        z-index: 1000;
        font-size: 0.6rem;
    }
</style>