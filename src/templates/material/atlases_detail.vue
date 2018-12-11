<template>
  <div>
    <div v-transfer-dom>
      <previewer
        :list="list"
        ref="previewer"
        @on-close="close"
        @on-index-change="logIndexChange"
      >
      </previewer>
    </div>

    <div class="content">
        <p v-for="(info,index) in datas" :key="index" v-show="index == logIndex">{{info.alt}}</p>
    </div>
  </div>
</template>

<script>
import apiM from "@/api/material/index.js";
import { Previewer, TransferDom } from "vux";
export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  props: {
    material: {
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      list: [],
      datas:[],
      logIndex:0
    };
  },
  watch: {
    material(val, oldVal) {
      this.initData();
    },
    list(val, oldVal) {
      if (val.length == JSON.parse(this.material[0].material_content).length) {
        this.$refs.previewer.show(0);
      }
    }
  },
  methods: {
    imgUrl() {
      return apiM.fileUrl();
    },
    close() {
      this.$router.go(-1);
    },
    initData() {
      if (this.material[0].material_content) {
        this.datas = JSON.parse(this.material[0].material_content);
            for (let index in this.datas) {
          let data1 = {
            w: 0,
            h: 0,
            msrc: this.imgUrl() + this.datas[index].url,
            src: this.imgUrl() + this.datas[index].url
          };
          this.list.push(data1);
        }
      }
    },
    logIndexChange(arg) {
      this.logIndex = arg.currentIndex;
    }
  }
};
</script>

<style scoped>
    .content{
        position: fixed;
        bottom: 1rem;
        left: 0;
        right: 0;
        max-height: 5rem;
        background-color: #00000050;
        z-index: 1501;  
    }
    .content p{
        font-size: .35rem;
        color: #fff;
        line-height: .5rem;
    }
</style>
