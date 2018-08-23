<template>
  <div id="SearchDoctor">
    <div data-doctorid="" v-if="list!==''" :key="index" class="doctor" v-for="(item,index) in list">
    <router-link :to="{name:'doctorDetail',params:{doc_id:item['id'],ins_id:item['from_institution_id']}}">
      <div class="doctor-info">
        <!-- <div class="doctor-avatar"><img alt="" :src="getImgUrl()+item.avatar" lazy="loaded"></div> -->
        <div class="doctor-avatar">
          <defaultImg :imgPath="item.avatar"></defaultImg>
        </div>
        <div class="doctor-main">
          <div class="doctor-part1"><span class="doctor-name">{{item.name}}</span> <span class="doctor-title">主治医师</span> <span class="doctor-icon renzheng zk-icon-iconfontzhizuobiaozhun023114"></span></div>
          <!---->
          <div class="doctor-part2"><span class="doctor-hospital">{{item.ins_name}}</span></div>
          <div class="doctor-part3">
            <star :star="Math.random()*10"></star>
          </div>
        </div>
      </div>
      <div  class="doctor-item margin">
         <productItem :items="item.expert_project_classify3_id"></productItem>
      </div>
     
      <productList :lists="item.product"></productList>
    </router-link>
    </div>
    <div v-else-if="list==''">
             <nosearch></nosearch>
      </div>
  
  </div>
</template>
<script>
  import api from "../../api/search";
  import nosearch from "@/components/nosearch/index.vue";
  import productItem from "@/components/decorate/product_item.vue";
  import defaultImg from "@/components/decorate/default_img.vue";
  import productList from "@/components/decorate/product_list.vue";
  import star from "@/components/decorate/star.vue";
  export default {
    name: 'searchDoctor',
    data() {
      return {
        //  imgUrl = '',
        show: false
      }
    },
    props: {
      list: {
        type: [Array, Object],
        request: true
      }
    },
    methods: {
     
      toggle() {
        this.show = !this.show
      }
    },
    components: {
      nosearch,
      productItem,
      defaultImg,
      productList,
      star
    },
    mounted() {
      // console.log(list.lengte);
    }
  }
</script>
<style scoped>
 #SearchDoctor .margin{
        margin-top: -0.5rem;
  }
  .award {
    margin-bottom: 7px;
  }
  .award img {
    width: 15%;
    vertical-align: middle;
  }
  .award span {
    width: 80%;
    display: inline-block !important;
    vertical-align: middle;
    padding: 0!important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .doctor {
    background: #fff;
    padding-top: 0.3rem;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .doctor .doctor-info {
    margin: 0 0.3rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .doctor .doctor-avatar {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    overflow: hidden;
  }
  .doctor .doctor-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
  }
  .doctor .doctor-main {
    width: 80%;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .doctor .doctor-part1,
  .doctor .doctor-part2,
  .doctor .doctor-part3 {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .doctor .doctor-name {
    color: #333;
    font-size: 0.34rem;
  }
  .doctor .doctor-title {
    color: #555;
    font-size: 0.24rem;
    -webkit-align-self: flex-end;
    -ms-flex-item-align: end;
    align-self: flex-end;
    margin-left: 0.1rem;
  }
  .doctor .doctor-icon {
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    margin-left: auto;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .doctor .renzheng {
    width: 0.82rem;
    height: 0.32rem;
    color: #ff5370;
  }
  .doctor .doctor-hospital {
    color: #555;
    font-size: 0.24rem;
    min-height: 0.24rem;
    line-height: 2.5;
  }
  .doctor .doctor-record {
    color: #555;
    font-size: 0.24rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .doctor .doctor-record span {
    margin-left: 0.2rem;
  }
  .doctor .doctor-item {
    margin-top: 0.2rem;
    margin-left: 1.5rem;
  }
  .doctor .doctor-item span {
    display: inline-block;
    background-color: #F5F5F5;
    color: #333;
    font-size: 0.24rem;
    padding: 0.08rem 0.16rem;
    border-radius: 999px;
    margin-right: 0.2rem;
    margin-bottom: 0.1rem;
  }
  .doctor .icon-gougou {
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
  .doctor .doctor-product {
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
  .doctor .doctor-product-title {
    width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #555;
    font-size: 0.24rem;
  }
  .doctor .doctor-product-price {
    margin-left: auto;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    color: #FF527F;
    font-size: 0.3rem;
  }
  .doctor .doctor-tip-more {
    line-height: 0.8rem;
    color: #2cc7c5;
    font-size: 0.24rem;
    text-align: center;
  }
  .doctor .doctor-tip-less {
    line-height: 0.8rem;
    color: #555;
    font-size: 0.24rem;
    text-align: center;
  }

</style>