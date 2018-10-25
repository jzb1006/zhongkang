<template>
    <div id="chooseAdviser">
        <top title="顾问">
            <span slot="next" class="next" @click="next">下一步</span>
        </top>
        <div class="title vux-1px-b">
            <span class="text">请选择顾问:</span>
            <!-- <span class="skip" @click="skip">可跳过</span> -->
        </div>
        <div v-for="(item,index) in list" :key="index" class="item vux-1px-b" @click="selectAdviser(item.level_name,item.realname,item.user_id,item.consultation_price,index)">
            <p class="first">
                <span>{{item.realname}}</span>
                <span>{{item.level_name}}</span>
                <i class="zk-icon-weixuanzhong sel" :class="{isSelected:(index===count)}"></i>
            </p>
            <p>擅长:
                <span v-for="(res,index) in item.advantage" :key="index" class="advantage">{{res}}</span>
            </p>
            <p>简介:{{item.brief_introduction}}</p>
            <p>咨询价格:{{item.consultation_price}}</p>
            <p>被咨询次数:{{item.counseling_count}}</p>
            
        </div>
        <div id="fill"></div>
    </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from './../../api/customized'
  export default {
    name: 'chooseAdviser',
    data(){
        return{
            list:[],
            adviser_id:'',
            adviser_name:'',
            count:'',
            price:'',
            level:'',
        }
    },
    methods:{
        selectAdviser(level,name,id,price,index){
            if(id==this.adviser_id){
                this.adviser_id="";
                this.adviser_name="";
                this.level="";
                this.count=-1;
            }else{
                this.adviser_id=id;
                this.adviser_name=name;
                this.level=level;
                this.count=index;
            }
            this.price=price;
        },
        skip(){
            this.$router.push('/confirmOrder');
        },
        next(){
            if(this.adviser_id==''){
                alert('请选择顾问');
                return false;
            }
            sessionStorage.setItem('adviser_id',this.adviser_id);
            sessionStorage.setItem('adviser_name',this.adviser_name);
            sessionStorage.setItem('level_name',this.level);
            sessionStorage.setItem('price',this.price);
            this.$router.push('/confirmOrder');
        }
    },
    mounted(){
        let data={
            adviser_level:sessionStorage.getItem('level'),
            operation_category:JSON.parse(sessionStorage.getItem('operation_category')),
        }
        console.log(data);
        api.getAdviserList(data).then(res=>{
            console.log(res);
            this.list=res.data;
            console.log(typeof this.list);
        }).catch(err=>{
            console.log(err);
        })
    },
    components:{
        top,
    }
  }
</script>
<style scoped>
    .title{
        font-size:.35rem;
        /* margin:.2rem; */
        padding:.2rem;
    }
    .text{
        display: inline-block;
        width:78%;
    }
    .skip{
        color:tomato;
        display: inline-block;
        width:20%;
    }
    /* .item{
        margin-bottom:.5rem;
    } */
    .item{
        padding:.2rem;
        font-size:.35rem;
    }
    .item p{
        margin-bottom:.2rem;
    }
    .item p.first{
        position: relative;
    }
    .sel{
        position:absolute;
        right:.2rem;
    }
    .advantage{
        margin-right:.15rem;
    }
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        height:1rem;
        width:100%;
        /* margin:.3rem auto 0; */
        margin:0 auto;
        z-index:999;
        background:#fff;
    }
    /* .amount{
        margin-right:40%;
        font-size:.3rem;
        padding:.2rem;
    }
    .next{
        width:40%;
        position: absolute;
        right:0;
        bottom:0;
        line-height:1rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
    } */
    /* .next{
        position:relative;
        width:50%;
        margin:.3rem auto 1.3rem;
        height:.8rem;
        line-height:.8rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
        z-index:111;
    } */
    .isSelected{
        /* background:#ff5370; */
        color:#ff5370;
    }
</style>