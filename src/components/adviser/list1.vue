<template>
  <div id="chooseAdviser">
      <top title="顾问">
          <span slot="next" class="next" @click="next">下一步</span>
      </top>
      <div class="title">
            <span class="text">请选择顾问:</span>
      </div>
      <swiper :show-dots="true" :loop="true" class="swiper" @on-index-change="getAdviserId">
          <swiper-item class="black" v-for="(item,index) in list" :key="index"  :class="{item:true,isSelected:(index===count)}" @click="selectAdviser(item.user_id,index)">
                <p class="row">
                    <img :src="getheadimg(item.headimgurl)" class="img">
                    <span class="span">{{item.realname}}</span>
                    <span class="span">{{item.level_name}}</span>
                </p>
                <p class="row">擅长:
                    <span v-for="(res,index) in item.advantage" :key="index" class="advantage">{{res}}</span>
                </p>
                <p class="row">{{item.brief_introduction}}</p>
                <p class="row">被咨询次数:{{item.counseling_count}}</p>
            </swiper-item>
      </swiper>
      <!-- <div class="footer vux-1px-t">
            <div class="amount">
                <span>金额：</span>
                <span>1</span>
            </div>
            <div @click="next" class="next" >下一步</div>
       </div> -->
       <!-- <div @click="next" class="next" >下一步</div> -->
  </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from './../../api/customized'
  import util from '@/widget/lib/Utils.js'
  import { Swiper,SwiperItem, } from 'vux'
  export default {
    name: 'chooseAdviser',
    data(){
        return{
            list:[],
            adviser_id:'',
            count:'',
            index:'',
            consultation_price:''
        }
    },
    methods:{
        selectAdviser(id,index){
            if(id==this.adviser_id){
                this.adviser_id="";
                this.count=-1;
            }else{
                this.adviser_id=id;
                this.count=index;
            }
            
        },
        getAdviserId(data){
            console.log(data);
            this.index=data;
            this.adviser_id=this.list[this.index]['user_id'];
            this.consultation_price=this.list[this.index]['consultation_price'];
        },
        getheadimg(headimgurl){
            return api.imgUrl()+headimgurl;
        },
        next(){
            if(this.adviser_id==''){
                alert('请选择顾问');
                return false;
            }
            sessionStorage.setItem('adviser_id',this.adviser_id);
            sessionStorage.setItem('consultation_price',this.consultation_price);
            this.$router.push('/confirmOrder');
        }
    },
    mounted(){
        let data={
            adviser_level:sessionStorage.getItem('level'),
            operation_category:JSON.parse(sessionStorage.getItem('operation_category')),
        }
        console.log(data);
        api.getAdviserList(data).then(res=>{
            console.log(res);
            this.list=res.data;
            console.log(typeof this.list);
        }).catch(err=>{
            console.log(err);
        })
        util.dpr();
    },
    components:{
        top,
        Swiper,
        SwiperItem,
    }
  }
</script>

<style>
    /* .vux-slider > .vux-swiper{
        height:auto!important;
    } */
    .vux-slider>.vux-swiper{
        width:100%;
        min-height:4rem;
        height:auto!important;
        /* height:auto!important; */
    }
</style>
<style scoped>
    #chooseAdviser{
        background:#f0f0f0;
        min-height:100%;
        height:auto;
    }
    .title{
        font-size:.35rem;
        margin:.2rem;
    }
    .text{
        display: inline-block;
        width:78%;
    }
    .skip{
        color:tomato;
        display: inline-block;
        width:20%;
    }
    .content{
        margin-bottom:.5rem;
    }
    .content p{
        margin-bottom:.2rem;
    }
    .item{
        font-size:.35rem;
    }
    .advantage{
        margin-right:.15rem;
    }
    .swiper{
        background:#fff;
        width:90%;
        height:auto;
        margin:0 auto;
        margin-top:20%;
        padding:.2rem;
        box-sizing: border-box;
    }
    .row{
        margin-bottom:.3rem;
    }
    .img{
        width:1rem;
        height:1rem;
        border-radius:.5rem;
        vertical-align: middle;
        margin-right:.3rem;
    }
    .span{
        display:inline-block;
        vertical-align: middle;
        margin-right:.3rem;
    }
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        height:1rem;
        width:100%;
        /* margin:.3rem auto 0; */
        margin:0 auto;
        z-index:999;
        background:#fff;
    }
    /* .amount{
        margin-right:40%;
        font-size:.3rem;
        padding:.2rem;
    }
    .next{
        width:40%;
        position: absolute;
        right:0;
        bottom:0;
        line-height:1rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
    } */
    /* .next{
        position:relative;
        width:50%;
        margin:.3rem auto 1.3rem;
        height:.8rem;
        line-height:.8rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
        z-index:111;
    } */
    .isSelected{
        background:#ff5370;
        color:#ffffff;
    }
</style>