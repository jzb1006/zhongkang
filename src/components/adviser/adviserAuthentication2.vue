<template>
  <div id="adviserAuthentication">
        <top title="顾问认证"></top>
        <div class="title">请选择你擅长的手术类别(至多选三种):</div>
        <operation-list @passSelected="getSelected"></operation-list>
        <div>
            <span class="jianjie">简介:</span><textarea v-model="jianjie" class="text"></textarea>
        </div>
        <div>
            <span class="jianjie">级别:</span>
            <select v-model="level">
                <option value="41">初级顾问</option>
                <option value="42">中级顾问</option>
                <option value="43">高级顾问</option>
            </select>
        </div>
        <div>
            <span class="jianjie">咨询价格:</span>
            <input type="text" class="price" v-model="price">
        </div>
        <div @click="next" class="next">认证</div>
  </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import operationList from '@/components/customized/operationList' 
  import api from './../../api/customized'
  export default {
    name: 'adviserAuthentication',
    data(){
        return{
            selected:[],
            level:"41",
            jianjie:"",
            price:""
        }
    },
    methods:{
        getSelected(data){
            this.selected=data;
        },
        next(){
            console.log(this.selected);
            console.log(this.level);
            console.log(this.jianjie);
            
            api.adviserAuthentication({
                advantage:this.selected,
                level:this.level,
                brief_introduction:this.jianjie,
                consultation_price:this.price
            })
            .then(res=>{
                alert(res.data.msg);
                this.$router.push('/home/user');
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    components:{
        top,
        operationList
    }
  }
</script>
<style scoped>
    .title{
        font-size:.35rem;
        margin:.3rem;
    }
    .jianjie{
        display:inline-block;
        width:18%;
        font-size:.3rem;
        top:0;
    }
    .text{
        width:80%;
        height:3rem;
    }
    .price{
        border:1px solid #ccc;
    }
    .next{
        width:50%;
        margin:.3rem auto;
        height:.8rem;
        line-height:.8rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
    }
</style>