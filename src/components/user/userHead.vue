<template>
    <div id="userHead">
        <Loading v-show="loadinging"></Loading>
        <div class="meCenter">
            <div class="setup">
                <router-link to="/home/userSetup" tag="i" class="zk-icon-Setup Setup_icon"></router-link>
            </div>
            <div class="mainInfo">
                <div class="headImg"><img v-bind:src="headImgUrl"></div>
                <div class="name">
                    <p>昵称: <span>{{nickname}}</span></p>
                    <p>会员等级：<span>{{levelName}}</span></p> 
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import api from "../../api/user";
import Loading from "@/components/decorate/loading.vue";
export default {
    name: 'userHead',
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
      },
      headImgUrl(){
        return api.imgUrl()+this.headimgurl;
      }
    },
    methods:{
        
    },
  	mounted(){
        api.user_center().then(res=>{
           console.log(res);
           let data=res.data;
           this.$store.dispatch('changeUserinfo',data);
           this.nickname=data.nickname;
           this.headimgurl=data.headimgurl;
           this.userrank=data.user_rank;
           this.levelName=data.level_name;
           this.mobile_phone=data.mobile_phone;
           this.email=data.email;
           this.loadinging=false;
        }).catch(error=>{
           this.loadinging = false;
           console.log(error);
        })
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