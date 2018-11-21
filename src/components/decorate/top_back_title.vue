<template>
    <!--头部返回-->
      <div id="title_back">
          <div class="navbar">
            <span class="title">{{params.title}}</span>
            <span class="zk-icon-fanhui fanhui" @click="back()"></span>
          </div>
      </div>
</template>
<script>
export default {
    props:{
        title:{
            // type:String,
            required:true
        }
    },
    methods:{
        back(){
            this.$router.back(-1);
        }
    }
}
</script>
<style scoped>
    .navbar {
        height: 1rem;
        line-height: 1rem;
        position: relative;
        text-align: center;
        background: #ff5370;
        letter-spacing: 0.028rem;
        font-size: 15px;
    }
    .navbar .title {
        font-size: 0.3rem;
        color: #fff;
    }
    .navbar .fanhui {
        color: #fff;
        padding: 0.111rem;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: 1000;
        font-size: 0.4rem;
    }
</style>