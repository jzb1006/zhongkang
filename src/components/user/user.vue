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
                <p>会员等级：<span>{{userrank}}</span></p> 
            </div>
        </div> 
    </div>
    <div class="usercontent">
        <div class="item" @click="toOrder(0)">
           <span class="zk-icon-icon- icon single"></span>
           <span class="text">我的订单</span>
           <span class="zk-icon-fanhui1 icon next"></span>
        </div>
        <div class="cat">
          <tabbar>
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
        </div>
        <router-link to="/home/userWallet" tag="div" class="item top">
             <span class="zk-icon-qianbao icon single"></span>
             <span class="text">我的钱包</span>
             <span class="zk-icon-fanhui1 icon next"></span>
        </router-link>
        
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
            loadinging:true
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
        api.ajaxuserGet().then(res=>{
           console.log(res);
           let data=res.data.userinfo;
           this.$store.dispatch('changeUserinfo',data);
           this.nickname=this.getNickname(data);
           this.headimgurl=this.getHeadimgurl(data);
           this.userrank=res.data.userinfo.level_name;
           this.mobile_phone=res.data.userinfo.mobile_phone;
           this.email=res.data.userinfo.email;
           this.loadinging=false;
        }).catch(error=>{
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
  }
  .meCenter{
    position:relative;
    background: #ff5370;
    height:3.2rem; 
    overflow:hidden;
    font-size:0.32rem;
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
    top:0.1rem;
    right:0.1rem;
    width:0.7rem;
    height:0.7rem;
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
    padding:0.25rem;
  }
  .name{
    float:left;
    padding:0.25rem;
  }
  .name p{
    padding-top:0.28rem;
  }
  .headImg img{
    width:1.2rem;
    height:1.2rem;
    border-radius:0.6rem;
    margin-top:0.2rem;
  }
  .usercontent{
    position:relative;
    font-size:0.32rem;
  }
  .item{
    /* text-align: left; */
    padding:0.25rem 0 0.25rem 0.15rem;
    height:1rem;
    box-sizing: border-box;
    /* border-bottom:1px solid #ccc; */
    background: #f7f7fa;
    position: relative;
  }
  .item:before {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -2px;
      right: 0;
      width:100%;
      height: 2px;
      border-bottom: 2px solid #ccc;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      /* left: 15px; */
  }
  .top{
    position: relative;
    top:1rem;
    margin-top: .4rem;
  }
  .Setup_icon{
    display: block;
    position:absolute;
    top:.3rem;
    right:.3rem;
    font-size:.6rem;
  }
  .cat{
    position:relative;
    top:1rem;
    left:0;
    background:#fff;
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