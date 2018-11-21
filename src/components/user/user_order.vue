<template>
    <div id="user_order">
        <div class="usercontent">
            <div class="item" @click="toOrder(0)">
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
            </tabbar>
        </div>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
    name: 'user_order',
    methods:{
        toOrder(type){
            this.$router.push({path:'/orderList',query:{index:type}})
        }
    },
    components:{
        Tabbar,
        TabbarItem,
    }
}
</script>
<style scoped>
  #user_order{
    /* background:#f0f0f0; */
    /* min-height:100%;
    height:auto; */
    /* margin-bottom:.4rem; */
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