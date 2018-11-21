<template>
  <div id="user_row" class="vux-1px-b">
      <!-- v-if="params.isShow" -->
        <!-- <router-link :to="{name:'container',}" tag="div" class="item vux-1px-b"> -->
            <span class="icon single" :class="params.iconClass"></span>
            <span class="text">{{params.text}}</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        <!-- </router-link> -->
  </div>
</template>

<script>
export default {
    name: 'user_row',
    props:{
        params:{
            type:[Object]
        }
    },
    // params:{
    //   link:'',
    //   iconClass:'',
    //   text:'',
    // }
    
}
</script>
<style scoped>
  #user_row{
    font-size:.32rem;
    background: #fff;
    padding:.3rem 0 .3rem .15rem;
    box-sizing: border-box;
  }
  .cat{
    position: relative;
    padding:.15rem 0;
    background: #fff;
  }
  .meCenter{
    position:relative;
    background: #ff5370;
    height:3.2rem; 
    overflow:hidden;
    font-size:.32rem;
  }
  .setup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: right;
  }
  .setup span img{
    display: block;
    float: right;
    position: absolute;
    top:.1rem;
    right:.1rem;
    width:.7rem;
    height:.7rem;
  }
  .mainInfo{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
  }
  .mainInfo:after{
    content:'';
    display:block;
    clear:both;
  }
  .headImg{
    float:left;
    padding:.25rem;
  }
  .name{
    float:left;
    padding:.25rem;
  }
  .name p{
    padding-top:.28rem;
  }
  .headImg img{
    width:1.2rem;
    height:1.2rem;
    border-radius:.6rem;
    margin-top:.2rem;
  }
  .usercontent{
    position:relative;
    font-size:.32rem;
  }
  .item{
    background: #fff;
    padding:.3rem 0 .3rem .15rem;
    box-sizing: border-box;
  }
  .top{
    /* position: relative;
    top:1rem; */
    margin-top: .4rem;
  }
  .Setup_icon{
    display: block;
    position:absolute;
    top:.3rem;
    right:.3rem;
    font-size:.6rem;
  }
  
  .single{
    display: inline-block;
    width:6%;
  }
  .text{
    display:inline-block;
    width:82%;
  }
  .next{
    display:inline-block;
  }
</style>