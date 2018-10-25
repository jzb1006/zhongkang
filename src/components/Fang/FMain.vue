<template>
  <div id="Fmain">
    <FHeader></FHeader>
    <router-view> </router-view>
    <FFooter></FFooter>
  </div>
</template>

<script>
import FHeader from '@/components/Fang/FHeader'
import FFooter from '@/components/Fang/FFooter'
import FMain from '@/components/Fang/FMain'
import FItem from '@/components/Fang/FContent/FItem'

export default {
  name: 'FMain',
  components: {
    'FHeader':FHeader,
    'FFooter':FFooter,
    FItem
  },
  computed:{
    content:function(){
      return 'FItem';
    }
  }
}
</script>
<style>
      .f_active{
          color: #000;
          border:1px solid rgb(255, 83, 112,.7)!important;
      }

</style>
