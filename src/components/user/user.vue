<template>
  <div id="user">
    <Loading v-show="loadinging"></Loading>
    <div class="meCenter">
        <div class="setup">
            <router-link to="/home/userSetup" tag="i" class="zk-icon-Setup Setup_icon"></router-link>
        </div>
        <div class="mainInfo">
            <div class="headImg"><img v-bind:src="headimgurl"></div>
            <div class="name">
                <p>昵称: <span>{{nickname}}</span></p>
                <p>会员等级：<span>{{levelName}}</span></p> 
            </div>
        </div> 
    </div>
    <div class="usercontent">
        <div class="item" @click="toOrder(0)">
           <span class="zk-icon-icon- icon single"></span>
           <span class="text">我的订单</span>
           <span class="zk-icon-fanhui1 icon next"></span>
        </div>
        <!-- <div class="cat"> -->
          <tabbar class="cat">
            <tabbar-item selected @on-item-click="toOrder(0)">
              <span slot="icon" class="zk-icon-icon- icon"></span>
              <span slot="label">全部订单</span>
            </tabbar-item>
            <tabbar-item @on-item-click="toOrder(1)">
              <span slot="icon" class="zk-icon-Group icon"></span>
              <span slot="label">未付款</span>
            </tabbar-item>
            <tabbar-item @on-item-click="toOrder(2)">
              <span slot="icon" class="zk-icon-yifukuan icon"></span>
              <span slot="label">已付款</span>
            </tabbar-item>
          </tabbar>
        <!-- </div> -->
        <router-link to="/home/userWallet" tag="div" class="item top vux-1px-tb">
            <span class="zk-icon-qianbao icon single"></span>
            <span class="text">我的钱包</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link>
        <div v-if="isAdviser">
            <router-link to="/adviserReceipt" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问接单</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to="/replyOrder" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问查看已接订单</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
        </div>
        <div v-else>
            <router-link to="/requirement" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">私人定制</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to="/customizedOrder" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">定制订单</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to="/adviserAuthentication" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问认证</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
        </div>
        
        
        
    </div>
  </div>
</template>

<script>
import api from "../../api/user";
import Loading from "@/components/decorate/loading.vue";
import { Tabbar, TabbarItem } from 'vux'
export default {
    name: 'user',
    data(){
      	return {
      		  headimgurl:'',
            nickname:'',
            userrank:'',
            mobile_phone:'',
            email:'',
            loadinging:true,
            levelName:''
      	}
    },
    computed:{
      isAdviser(){
        if(this.userrank=='41'||this.userrank=='42'||this.userrank=='43'){
          return true;
        }else{
          return false;
        }
      }
    },
    methods:{
        getNickname(argument){
            if(argument.nickname==""){
                return argument.user_name;
            }else{
                return argument.nickname;
            }
        },
        getHeadimgurl(argument){
            let headimgurl=((argument.headimgurl!=null)&&(argument.headimgurl!=""))?api.imgUrl()+argument.headimgurl:argument.defaultImg;
            return headimgurl;
        },
        toOrder(type){
            this.$router.push({path:'/orderList',query:{index:type}})
        }
    },
  	mounted(){
        api.user_center().then(res=>{
           console.log(res);
           let data=res.data.userinfo;
           this.$store.dispatch('changeUserinfo',data);
           this.nickname=this.getNickname(data);
           this.headimgurl=this.getHeadimgurl(data);
           this.userrank=data.user_rank;
           this.levelName=data.level_name;
           this.mobile_phone=data.mobile_phone;
           this.email=data.email;
           this.loadinging=false;
        }).catch(error=>{
           this.loadinging = false;
           console.log('fail');
           console.log(error);
        })    
    },
    components:{
        Tabbar,
        TabbarItem,
        Loading
    }
}
</script>
<style scoped>
  #user{
    background:#f0f0f0;
    min-height:100%;
    height:auto;
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