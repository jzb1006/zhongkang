<template>
  <div id="SearchHospital">
    <div data-hospitalid="24402" class="hospital" :key="index" v-for="(item,index) in list">
      <router-link :to="{name:'hospitalDetail',params:{ins_id:item['id']}}">
        <div class="hospital-info">
          <div class="hospital-avatar">
            <defaultImg :imgPath="item.profile_photo"></defaultImg>
          </div>
          <div class="hospital-main">
            <div class="hospital-part">
              <span class="hospital-name">{{item.name}}</span>
              <span class="hospital-title"></span>
              <span class="hospital-icon renzheng zk-icon-iconfontzhizuobiaozhun023114"></span>
            </div>
            <!---->
            <div class="hospital-part">
              <span class="hospital-type">{{item.institution_type_id==1?'公立':'民营'}}</span>
            </div>
            <div class="hospital-part">
              <span class="hospital-address">{{item.address}}</span>
            </div>
            <div class="hospital-part">
              <!-- <div class="hospital-star"><span  :style="{'width':item.total_evaluate*20+'%'}">&nbsp;</span></div> -->
              <star :star="item.total_evaluate"></star>
            </div>
            <div class="hospital-part margin">
              <productItem :items="item.expert_project_classify3_id"></productItem>
            </div>
          </div>

        </div>
      </router-link>
      <productList :lists="item.product"></productList>
    </div>

  </div>
</template>
<script>
import api from "../../api/search";

import productItem from "@/components/decorate/product_item.vue";
import productList from "@/components/decorate/product_list.vue";
import defaultImg from "@/components/decorate/default_img.vue";
import star from "@/components/decorate/star.vue";
export default {
    name: "searchHospitl",
    data() {
        return {
            show: false
        };
    },
    props: {
        list: {
            type: [Array, Object],
            request: true
        }
    },
    methods: {
        getImgUrl() {
            return api.imgUrl();
        },
        toggle() {
            this.show = !this.show;
        }
    },
    mounted() {
        // console.log(list.lengte);
    },
    components: {
        productItem,
        productList,
        defaultImg,
        star
    }
};
</script>
<style scoped>
#SearchHospital .margin {
    margin-top: -0.5rem;
}
.award {
    background: #fdf4ce;
    color: #d68f13;
    margin-top: 0.2rem;
    margin-bottom: 0.1rem;
    border-radius: 0.1rem;
    display: inline-block;
    width: 100%;
    padding: 0.04rem 0.1rem;
}
.award img {
    width: 0.32rem;
    vertical-align: middle;
}
.award span {
    display: inline-block;
    font-size: 0.24rem;
    line-height: 0.24rem;
    vertical-align: middle;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hospital {
    background: #fff;
    padding-top: 0.3rem;
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
}
.hospital .hospital-info {
    margin: 0 0.3rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.hospital .hospital-avatar {
    display: inline-block;
    min-width: 1rem;
    min-height: 1rem;
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    overflow: hidden;
}
.hospital .hospital-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
}
.hospital .hospital-main {
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
.hospital .hospital-part {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.hospital .hospital-name {
    color: #333;
    font-size: 0.34rem;
}
.hospital .hospital-title {
    color: #555;
    font-size: 0.24rem;
    -webkit-align-self: flex-end;
    -ms-flex-item-align: end;
    align-self: flex-end;
    margin-left: 0.1rem;
}
.hospital .hospital-icon {
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    margin-left: auto;
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
}

.hospital .renzheng {
    width: 0.82rem;
    height: 0.32rem;
    color: #ff5370;
}
.hospital .hospital-type,
.hospital .hospital-address {
    color: #555;
    font-size: 0.24rem;
    margin-top: 0.12rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hospital .hospital-address {
    margin-bottom: 0.12rem;
}
.hospital .hospital-record {
    color: #555;
    font-size: 0.24rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
.hospital .hospital-record span {
    margin-left: 0.2rem;
}
.hospital .hospital-item {
    margin-top: 0.2rem;
    margin-left: 1.5rem;
}
.hospital .hospital-item span {
    display: inline-block;
    background-color: #f5f5f5;
    color: #333;
    font-size: 0.24rem;
    padding: 0.08rem 0.16rem;
    border-radius: 999px;
    margin-right: 0.2rem;
    margin-bottom: 0.1rem;
}

.hospital .hospital-product {
    padding-left: 20%;
    padding-right: 0.3rem;
    height: 0.8rem;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
}
.hospital .hospital-product-title {
    width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #555;
    font-size: 0.24rem;
}
.hospital .hospital-product-price {
    margin-left: auto;
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    color: #ff527f;
    font-size: 0.3rem;
}
.hospital .hospital-tip-more {
    line-height: 0.8rem;
    color: #2cc7c5;
    font-size: 0.24rem;
    text-align: center;
}
.hospital .hospital-tip-less {
    line-height: 0.8rem;
    color: #555;
    font-size: 0.24rem;
    text-align: center;
}
</style>
