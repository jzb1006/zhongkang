<template>
   <div id="product_list">
      <div data-index="4" class="doctor-products" :class="{ 'listed': show}">
        <section :key="indexs" v-for="(items,indexs) in lists">
          <div class="doctor-product"><span class="icon-gougou">购</span> <span class="doctor-product-title">【{{items.beauty_tag}}】{{items.goods_name}}</span> <span class="doctor-product-price">￥{{items.pifa_price}}</span></div>
        </section>
        <div class="doctor-tip-more" @click="toggle()" v-if="lists.length>2">查看其它{{lists.length-2}}个相关商品<span class="iconfont icon-down"></span></div>
        <!---->
      </div>
   </div>
    
</template>
<script>
export default {
     data() {
      return {
        //  imgUrl = '',
        show: false
      }
    },
     methods: {
      toggle() {
        this.show = !this.show
      }
    },
    props: {
      lists: {
        type: [Array, Object,String],
        request: true,
        default:''
      }
    },
   
}
</script>
<style scoped>
    #product_list .doctor-products {
    background: #fff;
    border-top: 1px solid #F0F0F0;
  }
   #product_list  .doctor-products>section {
    display: none;
  }
  #product_list  .doctor-products>section:nth-child(1),
   #product_list  .doctor-products>section:nth-child(2) {
    display: block;
  }
   #product_list  .doctor-products.listed>section {
    display: block;
  }
   #product_list  .icon-gougou {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    line-height: 0.3rem;
    border-radius: 5px;
    text-align: center;
    font-size: 0.2rem;
    color: #fff;
    background-image: linear-gradient(to right, #fe9194, #ff64a4);
  }
  #product_list  .doctor-product {
    padding-left: 20%;
    padding-right: 0.3rem;
    height: 0.8rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #F0F0F0;
  }
   #product_list  .doctor-product-title {
    width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #555;
    font-size: 0.24rem;
  }
   #product_list  .doctor-product-price {
    margin-left: auto;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    color: #FF527F;
    font-size: 0.3rem;
  }
   #product_list  .doctor-tip-more {
    line-height: 0.8rem;
    color: #2cc7c5;
    font-size: 0.24rem;
    text-align: center;
  }
   #product_list  .doctor-tip-less {
    line-height: 0.8rem;
    color: #555;
    font-size: 0.24rem;
    text-align: center;
  }
</style>