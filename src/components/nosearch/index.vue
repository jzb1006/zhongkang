<template>
    <div  class="noresult">
    
        <div class="noresult-wrap"><img :src="nosearch" alt="" class="empty">
            <p>{{text}}</p>
        </div>
    
    </div>
</template>
<script>
 import nosearch from '@/assets/nosearch.png'
    export default {
      data(){
          return {
              nosearch,
          }
      },
      props:{
          text:{
              type:String,
              default:'null'
          }
      }
    
    
    }
</script>
<style scoped>
@import "../../assets/css/Base.css";
.noresult {
  padding-top: 3rem;
  background-color: #fff;
}
.noresult .noresult-wrap {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: column;
      -ms-flex-flow: column;
          flex-flow: column;
  text-align: center;
  line-height: 1.5;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
          font-size: 0.3rem;
          color: #aaa;
}
.noresult .empty {
  width: 2.26rem!important;
  height: 2.26rem!important;
  margin-bottom: 0.2rem!important;
}

</style>