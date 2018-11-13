<template>
  <div id="userContent">
    
    <!-- <div class="usercontent"> -->
        <!-- <router-link to="/home/userWallet" tag="div" class="item top vux-1px-tb">
            <span class="zk-icon-qianbao icon single"></span>
            <span class="text">我的钱包</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link> -->
        <user-row :params="params"></user-row>
        <!-- <div v-if="isAdviser"> -->
            <!-- <router-link to="/adviserReceipt" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问接单</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link> -->
            <user-row :params="params1"></user-row>
            <user-row :params="params2"></user-row>
            <user-row :params="params3"></user-row>
            <!-- <router-link to="/replyOrder" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问查看已接订单</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to="/adviserAuthentication" tag="div" class="item vux-1px-b">
                <span class="zk-icon-dingzhijiaju icon single"></span>
                <span class="text">顾问资料</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link> -->
        <!-- </div> -->
        <!-- <div v-else> -->
            <user-row :params="params4"></user-row>
            <user-row :params="params5"></user-row>
            <user-row :params="params6"></user-row>
            <!-- <router-link to="/requirement" tag="div" class="item vux-1px-b">
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
  </div>
</template>

<script>
import api from "../../api/user";
import Loading from "@/components/decorate/loading.vue";
import { Tabbar, TabbarItem } from 'vux'
import userRow from "@/components/user/row/userRow.vue"
export default {
    name: 'userContent',
    data(){
      	return {
            userrank:'',
            loadinging:true,
            params:{
                link:"/home/userWallet",
                iconClass:"zk-icon-qianbao",
                text:'我的钱包',
                isShow:true,
            },
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
            //     isShow:!this.isAdver,
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
      params1(){
        return{
          link:"/adviserReceipt",
          iconClass:"zk-icon-dingzhijiaju",
          text:'顾问接单',
          isShow:this.isAdviser,
        }
      },
      params2(){
        return{
          link:"/replyOrder",
          iconClass:"zk-icon-dingzhijiaju",
          text:'顾问查看已接订单',
          isShow:this.isAdviser,
        }
      },
      params3(){
        return{
          link:"/adviserAuthentication",
          iconClass:"zk-icon-dingzhijiaju",
          text:'顾问资料',
          isShow:this.isAdviser,
        }
      },
      params4(){
        return{
          link:"/requirement",
          iconClass:"zk-icon-dingzhijiaju",
          text:'私人定制',
          isShow:!this.isAdver,
        }
      },
      params5(){
        return{
          link:"/customizedOrder",
          iconClass:"zk-icon-icon-",
          text:'定制订单',
          isShow:!this.isAdviser,
        }
      },
      params6(){
        return{
          link:"/adviserAuthenticationState",
          iconClass:"zk-icon-approve",
          text:'顾问认证',
          isShow:!this.isAdviser,
        }
      }
    },
    methods:{

    },
  	mounted(){
        console.log(this.isAdviser);
        api.user_center().then(res=>{
           this.userrank=res.data.user_rank;
        }).catch(error=>{
           this.loadinging = false;
           console.log(error);
        })
    },
    components:{
        Tabbar,
        TabbarItem,
        Loading,
        userRow
    }
}
</script>
<style scoped>
  #userContent{
    background:#f0f0f0;
    min-height:100%;
    height:auto;
    margin:.4rem 0;
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