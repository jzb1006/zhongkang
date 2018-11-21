<template>
    <div id="chooseAdviser">
        <top :params="params"></top>
        <div class="title vux-1px-b">
            <span class="text">请选择顾问:</span>
        </div>
        <adviserList></adviserList>
        <div id="fill"></div>
    </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
  import api from './../../api/customized'
  import adviserList from '@/components/adviser/adviser_list.vue'
  import Bus from '@/assets/bus.js'
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
            params:{
                title:'定制',
                hasBtn:true,
                btnText:'下一步',
                next:this.next,
            }
        }
    },
    methods:{
        // selectAdviser(data){
        //     if(data!=''){
        //         this.adviser_id=data;
        //     }
        // },
        next(){
            if(this.adviser_id==''){
                alert('请选择顾问');
                return false;
            }
            this.$router.push('/confirmOrder');
        }
    },
    mounted(){
        Bus.$on('selectAdviser',res=>{
            console.log(res);
            this.adviser_id=res;
        })
    },
    beforeDestroy () {
        Bus.$off('selectAdviser')
    },
    components:{
        top,
        adviserList,
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
        line-height:.4rem;
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
    .brief{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
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