<template>
  <div id="comment_info">
      <span :key="index" v-for="(item,index) in list">{{item['text']}}:{{item['value']}}</span>
      <!-- <span>效果：4.9</span><span>环境：4.9</span><span>专业：4.9</span><span>服务：4.9</span> -->
  </div>
</template>
<script>
export default {
    props:{
        list:{
            default:[
                {
                    text:'效果',
                    value:'4.9'
                }
            ]
        }
    }
}
</script>
<style>
    #comment_info span{
       padding:0 0.2rem;
    }
</style>