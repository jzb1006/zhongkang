<template>
    <div id="user_head_tem">
        <Loading v-show="params.loadinging"></Loading>
        <div class="meCenter">
            <div class="setup">
                <router-link :to="{name:'container',query:{id:'34'}}" tag="i" class="zk-icon-Setup Setup_icon"></router-link>
            </div>
            <div class="mainInfo">
                <div class="headImg"><img v-bind:src="params.headImgUrl"></div>
                <div class="name">
                    <p>昵称: <span>{{params.nickname}}</span></p>
                    <p>会员等级：<span>{{params.levelName}}</span></p> 
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import Loading from "@/components/decorate/loading.vue";
export default {
    name: 'user_head_tem',
    props:{
        params:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    components:{
        Loading
    }
}
</script>
<style scoped>
  /* #user{
    background:#f0f0f0;
    min-height:100%;
    height:auto;
  } */
  /* .cat{
    position: relative;
    padding:.15rem 0;
    background: #fff;
  } */
  .meCenter{
    position:relative;
    background: #ff5370;
    height:3.2rem; 
    overflow:hidden;
    font-size:.32rem;
  }
  .setup {
    /* position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: right; */
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

  .Setup_icon{
    display: block;
    position:absolute;
    top:.3rem;
    right:.3rem;
    font-size:.6rem;
  }
  
  
</style>