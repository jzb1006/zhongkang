<!--  -->
<template>
  <div>
      <article class="detail-header">
            <section class="sec-info">
                <div class="w-top">
                    <div class="logo">
                        <defaultImg :imgPath="imgPath"></defaultImg>
                        <!-- 云诊所 -->
                        <!-- 认证 --><span class="v-icon v-icon-1"></span></div>
                    <p class="title">{{title}}</p>
                    <!-- 关注详情 -->
                    <!-- 评价 -->
                    <div class="comment-box">
                        <div class="star-bg">
                            <star :star="star"></star>
                        </div>
                    </div>
                    <div class="comment-info">
                        <div v-if="commentInfo!=''">

                        <commentInfo :list="commentInfo"></commentInfo>
                        </div>
                        <div v-else>
                            <p>{{serial_number}}</p>
                        </div>
                    </div>
                    <div class="ls-box">
                         <router-link :to="{name:boxOne['link'],params:boxOne['params']}">
                            <a class="child-ls" href="#"><span style="font-size: 0.5rem;display: block;" :class="boxOne['class']"></span><span>{{boxOne['text']}}</span></a>
                        </router-link>
                       <router-link :to="{name:boxTwe['link'],params:boxTwe['params']}">
                            <a class="child-ls" href="#"><span style="font-size: 0.5rem;display: block;" :class="boxTwe['class']"></span><span>{{boxTwe['text']}}</span></a>
                        </router-link>
                        
                    </div>
                </div>
                <!-- 虚线 -->
                <div class="ls-box-rows"></div>  
            </section>
        </article>
  </div>
</template>

<script>
import api from "../../api/hospital";
import defaultImg from "@/components/decorate/default_img.vue";
import star from "@/components/decorate/star.vue";
import commentInfo from "@/components/decorate/comment_info.vue";
import { StringDecoder } from 'string_decoder';
export default {
    props:{
       imgPath:{
           type:String,
           default(){
               return ""
           }
       },
       title:{
          type:String,
           default(){
               return ""
           } 
       },
       star:{
          type:String,
           default(){
               return ''
           } 
       },
       commentInfo:{
           type:Array,
           default(){
               return []
           } 
       },
       boxOne:{
           type:Object,
           default(){
               return {
                   
               }
           }
       },
        boxTwe:{
           type:Object,
           default(){
               return {
                  
               }
           }
       },
       serial_number:{
           type:String,
           default:''
       }
    },
  data () {
    return {
           
    };
  },

  components: {
      defaultImg,
      star,
      commentInfo
  },


  methods: {
       
  },

  mounted(){
     
  },
}

</script>
<style  scoped>
.detail-header {
    padding-top: 0.72rem;
    background-image: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/blue-bg-533e01b577.png);
    background-size: 100% auto;
    padding-bottom: 0.20rem;
}
.detail-header section {
    width: 7.10rem;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 0.08rem;
    text-align: center;
}
.detail-header section .w-top {
    position: relative;
    padding-top: 1.20rem;
    padding-bottom: 0.24rem;
    border-radius: 0.08rem 0.08rem 0 0;
}
.detail-header section .logo {
    position: absolute;
    top: -0.42rem;
    left: 50%;
    height: 1.20rem;
    width: 1.20rem;
    border: 0.08rem solid #fff;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    margin-left: -0.64rem;
    z-index: 3;
}
.detail-header section .logo .doctor-c,
.detail-header section .logo .v-icon {
    display: block;
    position: absolute;
    bottom: -0.14rem;
    left: 0.10rem;
}

.detail-header section .title {
    padding: 0 0.30rem 0 0.20rem;
    margin-bottom: 0.20rem;
    font-size: 0.36rem;
    line-height: 0.50rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-word;
}
.detail-header section .comment-box {
    color: #777;
    letter-spacing: 0;
    line-height: 0.24rem;
    margin-bottom: 0.20rem;
}
.detail-header section .comment-info {
    color: #777;
    font-size: 0.24rem;
    margin: 0 0 0.20rem auto;
}
.detail-header section .ls-box {
    text-align: center;
    overflow: hidden;
    font-size: 0.26rem;
    line-height: 0.26rem;
    color: #777;
    padding: 0 0.30rem;
    margin-top: 0.5rem;
}
.detail-header section .ls-box .child-ls {
    width: 50%;
    display: block;
    float: left;
}
.detail-header section .ls-box-rows {
    width: 100%;
    height: 0.24rem;
    background: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/hr-bg-3a83dd752f.png) no-repeat center;
    background-size: 100% auto;
}
.detail-header section .w-bot {
    padding-top: 0.10rem;
    padding-bottom: 0.24rem;
    border-radius: 0 0 0.08rem 0.08rem;
}
.detail-header section .w-bot,
.detail-header section .w-top {
    background: #fff;
}
.detail-header .bottom-ls {
    font-size: 0.24rem;
    text-align: center;
    overflow: hidden;
}
.detail-header .bottom-ls .child-ls {
    width: 33.3%;
    display: block;
    float: left;
    color: #333;
    line-height: 0.42rem;
}
.detail-header section .ls-box .child-ls span:first-child {
    padding-bottom: 0.10rem;
    line-height: 0.40rem;
    font-size: 0.40rem;
    color: #333;
    height: 0.40rem;
}
.fs3,
.detail-header section .ls-box .child-ls span {
    font-size: 0.24rem;
    color: #777;
}
.detail-header section .ls-box span {
    display: block;
    text-align: center;
}

.detail-header .star-bg,
 .detail-header .star-bg .star-red {
    display: inline-block;
    height: 0.26rem;
    background-repeat: no-repeat;
    background-size: 1.56rem auto;
}

</style>