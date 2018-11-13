<template>
    <div class="loadmore">
        <div v-if="state===1" class="loadmore-load">
            <span class="loadmore-loadicon">loading</span>
            <!-- <p>下拉加载更多~</p> -->
        </div>
        <!-- <div v-else-if="state===0" class="loadmore-none"> -->
            <!-- <span>-没有更多了哦-</span> -->
        <!-- </div> -->
    </div>
</template>

<script>
export default {
  name: "load-more",
  props: {
    state: {
      type: Number,
      default: 1,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      var pageHeight = document.body.offsetHeight;
      var windowHeight = window.innerHeight;
      var scrollTop = window.pageYOffset;
    //   var diff = pageHeight - windowHeight - scrollTop;
      if (scrollTop == 0 && !this.isLoading && this.state === 1) {
        this.$emit("loadmore");
      }
    });
  }
};
</script>

<style scoped>
.loadmore{
  max-width: 15rem;
  overflow: hidden;
  font-size: 0.24rem;
  margin-top:.05rem;
}
.loadmore .loadmore-loadicon{
  margin-right: 5px;
  font-size: 0.5rem;
  text-indent: -9999em;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background: #2cc7c5;
  background: linear-gradient(to right, #2cc7c5 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: load3 0.5s infinite linear;
  animation: load3 0.5s infinite linear;
}
.loadmore .loadmore-loadicon::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  background: #2cc7c5;
  border-radius: 100% 0 0;
}
.loadmore .loadmore-loadicon::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  margin: auto;
  bottom: 0;
  right: 0;
}
.loadmore .loadmore-load{
  color: #2cc7c5;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  line-height: 1.5;
}
.loadmore .loadmore-load p{
  margin-left: 0.3rem;
}
.loadmore .loadmore-none{
  line-height: 1.5;
  text-align: center;
}
</style>