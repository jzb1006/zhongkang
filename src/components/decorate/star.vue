<template>
  <div id="star">
     <div class="hospital-star">
        <span :star="stars()" :style="{'width':stars()*20+'%'}">&nbsp;</span>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
            star: {
                type: [Number,Array, Object,String],
                request: true
            }
        },
        methods:{
            stars(){
                return this.star==''?100:this.star;
            }
        }
    }
</script>
<style scoped>
   #star .hospital-star {
    position: relative;
    width: 1.54rem;
    height: 0.26rem;
  }
  #star .hospital-star::before {
    content: "123";
    color: rgba(0, 0, 0, 0);
    display: block;
    width: 100%;
    height: 100%;
    background: url("//mstatic.soyoung.com/m/static/img/search/star-grey.png") left center no-repeat;
    background-size: 1.54rem 0.26rem;
  }
  #star .hospital-star span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("//mstatic.soyoung.com/m/static/img/search/star-red.png") left center no-repeat;
    background-size: 1.54rem 0.26rem;
  }
  #star.doctor-star-box {
    width: 1.54rem;
    min-height: 0.26rem;
    float: left;
    position: relative;
  }
  #star .doctor-star-box i.star-yes,
  #star .doctor-star-box i.star-no {
    display: block;
    width: 100%;
    height: 0.26rem;
    position: absolute;
    left: 0;
    top: 0;
  }
  #star .doctor-star-box i.star-yes {
    background: url("//mstatic.soyoung.com/m/static/fe_m/view/wiki/img/star-red@2x-9447701883.png") no-repeat left;
    background-size: 1.54rem 0.26rem;
    width: 80%;
    z-index: 10;
  }
  #star .doctor-star-box i.star-no {
    background: url("//mstatic.soyoung.com/m/static/img/doctor/star-no@2x.png") no-repeat left;
    background-size: 1.54rem 0.26rem;
  }
</style>