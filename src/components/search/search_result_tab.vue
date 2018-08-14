<template>
    <div class="dianpian">
      <div id="SearchTab"> <!-- :class="{fixed: isFixed}" -->
        <div class="tablist">
          <!-- <router-link v-for="(item, index) in tablist" :key="index" v-if="item.path" :to="item.path">{{item.name}}</router-link> -->
            <a v-for="item in tablist" :key="item.name" href="javascript:void(0)" >
            <span :class="{actived: (tabIndex == item.index)}" @click="changeTab(item)" >{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: "searchTab",
    computed: {
        tabIndex(){
         return this.$store.state.search.tabIndex
        },
        bus(){
        return this.$store.state.search.bus
        },
    },
    data() {
        return {
        tablist: [
            // { name: "综合", index: 0},
            { name: "安心购", index: 1},
            { name: "机构", index: 2},
            { name: "医生", index: 3},
        ]
        };
    },
    methods:{
        changeTab(item){
           this.$store.dispatch('changeTabIndex',item.index)
           this.bus.$emit('changeIpTextOnTabChange',this.$store.state.search.keyWord);
           this.bus.$emit('search',item.index);
        }
    }
  }
</script>
<style>

#SearchTab {
  position: relative;
}
.fixed {
  position: fixed;
}
#SearchTab {
  background-color: #fff;
  margin-bottom: 0.04rem;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}
#SearchTab .tablist {
  height: 0.8rem;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}
#SearchTab .tablist a {
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  text-align: center;
}
#SearchTab .tablist a span {
  display: inline-block;
  color: #333;
  font-size: 0.28rem;
  line-height: 0.72rem;
}
#SearchTab .tablist a span.actived {
  color: #2CC7C5;
  border-bottom: 0.04rem solid;
}
</style>