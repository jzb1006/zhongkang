<template>
    <div  class="noresult">
    
        <div class="noresult-wrap"><img :src="emptyOrder" alt="" class="empty">
    
            <p>(●ˇ∀ˇ●)目前没有{{orderType}}订单哦~</p>
    
        </div>
    
    </div>
</template>
<script>
 import emptyOrder from '@/assets/empty_order.png';
    export default {
      data(){
          return {
              emptyOrder,
          }
      },
      props:{
          orderType:{
              type:String
          }
      }
    
    
    }
</script>
<style scoped>
@import "../../assets/css/Base.css";
.noresult {
  padding-top: 3rem;
  background-color: #fff;
  font-size: 0.25rem;
  color:rgb(153, 153, 153);
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
}
.noresult .empty {
  width: 2.26rem;
  height: 2.26rem;
  margin-bottom: 0.2rem;
}

</style>