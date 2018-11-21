<template>
  <div class="product-list">
    <div class="hot_item" :key="index" v-for="(item,index) in list" >
      <router-link :to="{name:route_link,query:{id:con_id,goods_id:item.goods_id,ins_id:item.institution_id}}" tag="a" class="link-info router-link-exact-active router-link-active">
        <img :src="getImgUrl()+item.goods_thumb" class="hot_pic lazy">
          <div class="hot_text">
            <h3>{{item.goods_name}}</h3>
            <h4>{{item.doctor_name}} {{item.ins_name}}</h4>
            <!-- <h4 >预约数: 745</h4> -->
            <div class="price">
              <div>
                <span>¥
                      <em >{{item.pifa_price}}</em>
                      </span>¥
                <i>{{item.market_price}}</i></div>
              <div class="font-box">
              </div>
            </div>
          </div>
       
        <div class="bar"></div>
      </router-link>
    </div>
  </div>
</template>
<script scoped>
  import nosearch from "@/components/nosearch/index.vue";
  import api from "../../api/search";
  export default {
    props: {
      list: {
        type: [Array, Object],
        request: true,
        default: []
      },
      route_link:{
        type:String,
        default:''
      },
      con_id:{
        type:String,
        default:''
      }
    },
    name: 'searchProduct',
    methods: {
      getImgUrl() {
        return api.imgUrl();
      },
    },
    components: {
      nosearch
    },
  }
</script>
<style>
  /**
      * 定义atom原子化样式
      * */
  /*flex 兼容布局 洪泉 17年8月24日*/
  /*横向换行*/
  /*垂直居中*/
  /*垂直 两端*/
  /*水平开始*/
  /*水平结束*/
  /*水平两端*/
  /*水平两端*/
  /*水平居中*/
  .hot_item {
    overflow: hidden;

  }
  .hot_item:last-child .bar {
    display: none;
  }
  .hot_item .link-info {
    position: relative;
    display: block;
    min-height: 2rem;
    margin: .3rem;
  }
  .hot_item .link-info .man-jian {
    position: absolute;
    top: 0;
    left: 0;
    width: .52rem;
  }
  .hot_item .link-info .hot_pic {
    width: 2rem;
    max-height: 2rem;
    float: left;
    border-radius: .1rem;
  }
  .hot_item .link-info .hot_text {
    margin-left: 2.2rem;
    height: .2rem;
  }
  .hot_item .link-info .hot_text h3,
  .hot_item .link-info .hot_text h4 {
    font-weight: normal;
  }
  .hot_item .link-info .hot_text h3 {
    max-height: .72rem;
    font-size: .28rem;
    line-height: .36rem;
    color: #333;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
  }
  .hot_item .link-info .hot_text h4 {
    color: #777777;
    font-size: 0.24rem;
    padding-top: 0.16rem;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 0.22rem;
  }
  .hot_item .link-info .hot_text .price {
    padding-top: 0.16rem;
    color: #b8b8b8;
    font-size: 0.24rem;
    position: relative;
  }
  .hot_item .link-info .hot_text .price .font-box {
    position: absolute;
    right: 0;
    top: 0.08rem;
  }
  .hot_item .link-info .hot_text .price .font-box .icon-baoxian {
    color: #2cc7c5;
  }
  .hot_item .link-info .hot_text .price .font-box .icon-gongli {
    color: #4990e2;
  }
  .hot_item .link-info .hot_text .price .font-box .iconfont {
    display: inline-block;
    font-size: .52rem;
  }
  .hot_item .link-info .hot_text i {
    font-style: normal;
    text-decoration: line-through;
  }
  .hot_item .link-info .hot_text span {
    color: #ff527f;
  }
  .hot_item .link-info .hot_text span em {
    font-size: 0.32rem;
    margin-right: .2rem;
    margin-left: .04rem;
    font-style: normal;
  }
  .hot_item .flag-link {
    display: block;
    font-size: .24rem;
    margin: 0 .3rem;
    padding: .05rem 0;
    border-top: 1px solid #f0f0f0;
  }
  .hot_item .flag-link .flag-item {
    padding: .15rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 0.24rem;
  }
  .hot_item .flag-link .flag-item .flag-icon {
    float: left;
    width: 25%;
  }
  .hot_item .flag-link .flag-item .flag-icon span {
    margin-left: .05rem;
  }
  .hot_item .flag-link .flag-item .flag-icon span.iconfont {
    color: #ff8eab;
    font-size: 100%;
  }
  .hot_item .flag-link .flag-item .flag-text {
    float: right;
    box-sizing: border-box;
    width: 75%;
    padding-left: .1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-left: 1px solid #f0f0f0;
  }
  .hot_item .flag-link .flag-item .flag-tuan {
    width: 100%;
  }
  .hot_item .flag-link .flag-item .flag-tuan img {
    position: relative;
    top: -0.075rem;
    width: 0.6rem;
    vertical-align: middle;
  }
  .hot_item .flag-link .flag-item .flag-tuan span {
    margin-left: 0.25rem;
  }
  .hot_item .flag-link .flag-item .flag-tuan span.iconfont {
    color: #ff8eab;
    font-size: 100%;
  }
  .hot_item .flag-link .flag-item .flag-tuan em {
    color: #EE003E;
  }
  .hot_item .flag-link .flag-item .paystages_notice span {
    color: #FF527F;
    margin-right: 0;
  }
  .bar {
    height: 0.02rem;
    background: #f3f7f7;
    margin-left: -0.15rem;
    margin-right: -0.15rem;
  }
  /*拼团增强条*/
  .pintuan-item,
  .pintuan-item2 {
    background-color: #FFF;
  }
  .pintuan-item .flag-icon,
  .pintuan-item2 .flag-icon {
    width: auto !important;
  }
  .pintuan-item .flag-icon img,
  .pintuan-item2 .flag-icon img {
    width: 0.7rem;
  }
  .pintuan-item .flag-icon span,
  .pintuan-item2 .flag-icon span {
    position: relative;
    top: 0.1rem;
    margin-left: 0.25rem;
    font-size: 0.5rem;
    line-height: 1.5rem;
    display: inline;
  }
  .pintuan-item .flag-icon span em,
  .pintuan-item2 .flag-icon span em {
    color: #EE003E;
  }
  .pintuan-item .flag-text .arrow2,
  .pintuan-item2 .flag-text .arrow2 {
    width: .35rem;
    float: right;
    margin-top: -0.9rem;
  }
  .pintuan-item2 {
    position: relative;
    padding: 0 !important;
    padding-bottom: 0.1rem !important;
    top: -0.04rem;
  }
  .pintuan-icon {
    width: 0.26rem;
    height: 0.26rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .custom-icon {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    max-width: .3rem;
  }
  .icon-fen {
    color: #ff8eab;
  }
  .icon-quan {
    color: #ff4d4d !important;
  }
  .icon-fan {
    color: #ffc667 !important;
  }
  .icon-xian {
    color: #ff6273 !important;
  }
  .icon-pin {
    color: #fc1b7d !important;
  }
  .icon-jian {
    color: #d3c1ff !important;
  }
  .marketing_language {
    display: inline-block;
    margin-left: 2.4rem;
    font-size: .24rem;
    font-family: PingFangSC-Regular;
    color: #2CC7C5;
    padding: .03rem .06rem;
    border: 1px solid #DCF2F3;
    border-radius: .03rem;
    background-color: #F5FFFF;
    margin-bottom: 0.05rem;
  }

</style>