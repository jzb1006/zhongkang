<template>
  <div id="user">
    
    <!-- <div class="meCenter">
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
    </div> -->
    <!-- <div v-for="(item,index) in model" :key="index"> -->
        <!-- <component v-if="item.type != 0" :is="item.name"></component> -->
        <!-- <user-head></user-head> -->
        <!-- <mytree :model="model"></mytree> -->
    <!-- </div> -->
    
    
    <userHead></userHead>
    <userOrder></userOrder>
    <userMoney></userMoney>
    <userCustomized></userCustomized>
    <userCusOrder></userCusOrder>
    <userAuthentication></userAuthentication>
    
    
    <userReceipt></userReceipt>
    <userViewOrder></userViewOrder>
    <userAdviserInfo></userAdviserInfo>
    

    <!-- <user-content></user-content> -->
    <!-- <user-row :params="params"></user-row>
    <user-row :params="params4"></user-row>
    <user-row :params="params5"></user-row>
    <user-row :params="params6"></user-row> -->
    <!-- <br> -->
    <!-- <user-row :params="params1"></user-row>
    <user-row :params="params2"></user-row>
    <user-row :params="params3"></user-row>
     -->
    
    <!-- <div class="usercontent"> -->
        <!-- <div class="item" @click="toOrder(0)">
           <span class="zk-icon-icon- icon single"></span>
           <span class="text">我的订单</span>
           <span class="zk-icon-fanhui1 icon next"></span>
        </div>
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
          </tabbar> -->
        <!-- <router-link to="/home/userWallet" tag="div" class="item top vux-1px-tb">
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
            <router-link to="/adviserAuthentication" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问资料</span>
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
                <span class="zk-icon-icon- icon single"></span>
                <span class="text">定制订单</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to="/adviserAuthenticationState" tag="div" class="item vux-1px-b">
                <span class="zk-icon-approve icon single"></span>
                <span class="text">顾问认证</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link> -->
            <!-- <router-link to="/adviserAuthentication" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问认证</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link> -->
        <!-- </div> -->
        
        
        
    <!-- </div> -->
    <div id="fill"></div>
  </div>
</template>

<script>
// import api from "../../api/user";

// import { Tabbar, TabbarItem } from 'vux'
// import mytree from "@/container/tree.vue"
export default {
    name: 'user',
    data(){
      	return {
      		  // headimgurl:'',
            // nickname:'',
            // userrank:'',
            // mobile_phone:'',
            // email:'',
            // loadinging:true,
            // levelName:'',
            // params:{
            //     link:"/home/userWallet",
            //     iconClass:"zk-icon-qianbao",
            //     text:'我的钱包',
            //     isShow:true,
            // },
            // params1:{
            //     link:"/adviserReceipt",
            //     iconClass:"zk-icon-dingzhijiaju",
            //     text:'顾问接单',
            //     isShow:this.isAdviser,
            // },
            // params2:{
            //     link:"/replyOrder",
            //     iconClass:"zk-icon-dingzhijiaju",
            //     text:'顾问查看已接订单',
            //     isShow:this.isAdviser,
            // },
            // params3:{
            //     link:"/adviserAuthentication",
            //     iconClass:"zk-icon-dingzhijiaju",
            //     text:'顾问资料',
            //     isShow:this.isAdviser,
            // },
            // params4:{
            //     link:"/requirement",
            //     iconClass:"zk-icon-dingzhijiaju",
            //     text:'私人定制',
            //     isShow:!this.isAdviser,
            // },
            // params5:{
            //     link:"/customizedOrder",
            //     iconClass:"zk-icon-icon-",
            //     text:'定制订单',
            //     isShow:!this.isAdviser,
            // },
            // params6:{
            //     link:"/adviserAuthenticationState",
            //     iconClass:"zk-icon-approve",
            //     text:'顾问认证',
            //     isShow:!this.isAdviser,
            // },
            // model:{
            //   child_component:[
            //     {type:1,name:'user-head'},
            //     {type:1,name:'user-order'},
            //     {type:0,name:'user-content',child_component:[
            //       {type:1,name:'user-row',params:this.params},
            //       {type:1,name:'user-row',params:this.params1},
            //       {type:1,name:'user-row',params:this.params2},
            //       {type:1,name:'user-row',params:this.params3},
            //     ]},
            //   ]
            // }
      	}
    },
    computed:{
      // isAdviser(){
      //   if(this.userrank=='41'||this.userrank=='42'||this.userrank=='43'){
      //     return true;
      //   }else{
      //     return false;
      //   }
      // },
      params(){
        return{
          link:"/home/userWallet",
          iconClass:"zk-icon-qianbao",
          text:'我的钱包',
          // isShow:true,
        }
      },
      params1(){
        return{
          link:"/adviserReceipt",
          iconClass:"zk-icon-dingzhijiaju",
          text:'顾问接单',
          // isShow:this.isAdviser,
        }
      },
      params2(){
        return{
          link:"/replyOrder",
          iconClass:"zk-icon-dingzhijiaju",
          text:'顾问查看已接订单',
          // isShow:this.isAdviser,
        }
      },
      params3(){
        return{
          link:"/adviserAuthentication",
          iconClass:"zk-icon-dingzhijiaju",
          text:'顾问资料',
          // isShow:this.isAdviser,
        }
      },
      params4(){
        return{
          link:"/customized",
          iconClass:"zk-icon-dingzhijiaju",
          text:'私人定制',
          // isShow:!this.isAdviser,
        }
      },
      params5(){
        return{
          link:"/customizedOrder",
          iconClass:"zk-icon-icon-",
          text:'定制订单',
          // isShow:!this.isAdviser,
        }
      },
      params6(){
        return{
          link:"/adviserAuthenticationState",
          iconClass:"zk-icon-approve",
          text:'顾问认证',
          // isShow:!this.isAdviser,
        }
      },
      // headImgUrl(){
      //   return api.imgUrl()+this.headimgurl;
      // },
      // model(){
      //   return{
      //           child_component:[
      //             {type:1,name:'user-head'},
      //             {type:1,name:'user-order'},
      //             {type:0,name:'user-content',child_component:[
      //               {type:1,name:'user-row',params:this.params},
      //               {type:1,name:'user-row',params:this.params1},
      //               {type:1,name:'user-row',params:this.params2},
      //               {type:1,name:'user-row',params:this.params3},
      //               {type:1,name:'user-row',params:this.params4},
      //               {type:1,name:'user-row',params:this.params5},
      //               {type:1,name:'user-row',params:this.params6},
      //             ]},
      //           ]
      //         }
      // }
      model(){
        return{
                child_component:[
                  {type:1,name:'user-head',rank:1},
                  {type:1,name:'user-order',rank:2},
                  {type:1,name:'user-row',params:this.params,rank:3},
                  {type:1,name:'user-row',params:this.params4,rank:4},
                  {type:1,name:'user-row',params:this.params5,rank:5},
                  {type:1,name:'user-row',params:this.params6,rank:6},
                ]
          }
      }
      //           ]
      //         }
      // }
    },
    // methods:{
    //     toOrder(type){
    //         this.$router.push({path:'/orderList',query:{index:type}})
    //     }
    // },
  	// mounted(){
    //     api.user_center().then(res=>{
    //        console.log(res);
    //        let data=res.data;
    //        this.$store.dispatch('changeUserinfo',data);
    //        this.nickname=data.nickname;
    //        this.headimgurl=data.headimgurl;
    //        this.userrank=data.user_rank;
    //        this.levelName=data.level_name;
    //        this.mobile_phone=data.mobile_phone;
    //        this.email=data.email;
    //        this.loadinging=false;
    //     }).catch(error=>{
    //        this.loadinging = false;
    //        console.log(error);
    //     })
    // },
    components:{
        // Tabbar,
        // TabbarItem,
        // Loading,
        // mytree
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