<template>
  <div id="inquiries">
        <top title="追问"></top>
        <div class="content">
            <p>有问必答</p>
            <textarea class="text" placeholder="请填写您要咨询的问题(至少10个字))"></textarea>
            <div @click="next" class="next" >下一步</div>
        </div>
  </div>
</template>

<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from '@/api/customized'
  export default {
    name: 'inquiries',
    data(){
        return{
            order_sn:''
        }
    },
    methods:{
        next(){
            console.log('abc');
        }
    },
    mounted(){
        this.order_sn=this.$route.query.order_sn;
    },
    components:{
        top
    }
  }
</script>

<style scoped>
    .content{
        padding:.2rem;
    }
    p{
        font-size:1rem;
        margin-bottom:.2rem;
    }
    p{
        font-size:.35rem;
    }
    .text{
        width:100%;/*自动适应父布局宽度*/
        height:4rem;
        overflow:auto;
        box-sizing: border-box;
    }
    .next{
        position:relative;
        width:50%;
        margin:.3rem auto;
        height:.8rem;
        line-height:.8rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
        z-index:111;
    }
</style>