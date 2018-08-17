<template>
  <div id="hello">
    <div class="meCenter">
        <div class="setup">
            <span @click="toSetup"><img src="../../assets/img/user/setup.png"></span>
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
    name: 'hello',
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
  .meCenter{
    position:relative;
    background:#ffeeaa; 
    height:3.2rem; 
    overflow:hidden;
    font-size:0.35rem;
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
    font-size:0.35rem;
  }
  .item{
    text-align: left;
    padding:0.25rem 0 0.25rem 0.15rem;
    border-bottom:3px solid #ccc;
    background-color: #eef;
  }
  .top{
    margin-top: 0.25rem;
  }
</style>
