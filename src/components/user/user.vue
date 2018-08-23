<template>
  <div id="user">
    <div class="meCenter">
        <div class="setup">
            <i class="zk-icon-Setup Setup_icon"  @click="toSetup"></i>
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
        <div class="item top" @click="toWallet">我的钱包</div>
        <div class="item" @click="toOrder">我的订单</div>
    </div>
  </div>
</template>

<script>
import api from "../../api/user";
import common from "../../widget/lib/user"
export default {
    name: 'user',
    data(){
      	return {
      		  headimgurl:'',
            nickname:'',
            userrank:'',
            mobile_phone:'',
            email:''
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
        toSetup(){
            common.checkLogin(this,'/home/userSetup');
        },
        toWallet(){
            common.checkLogin(this,'/home/userWallet');
        },
        toOrder(){
            common.checkLogin(this,'/orderList');
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
        }).catch(error=>{
           console.log(error);
        })    
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
    background: #fff;
    font-size:0.32rem;
  }
  .item{
    /* text-align: left; */
    padding:0.25rem 0 0.25rem 0.15rem;
    /* border-bottom:1px solid #ccc; */
    /* background-color: #eef; */
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
    margin-top: 0.25rem;
  }
  .Setup_icon{
    display: block;
    position:absolute;
    top:.2rem;
    right:.2rem;
    font-size:.6rem;
  }
</style>
