<template>
    <div id="adviser_list">
        <div v-for="(item,index) in list" :key="index" class="item vux-1px-b" @click="selectAdviser(item.level_name,item.realname,item.user_id,item.consultation_price,index)">
            <p class="first">
                <span>{{item.realname}}</span>
                <span>{{item.level_name}}</span>
                <i class="zk-icon-weixuanzhong sel" :class="{isSelected:(index===count)}"></i>
            </p>
            <p>擅长:
                <span v-for="(res,index) in item.advantage" :key="index.id" class="advantage">{{res.name}}</span>
            </p>
            <p class="brief">简介:{{item.brief_introduction}}</p>
            <p>咨询价格:{{item.consultation_price}}</p>
            <p>被咨询次数:{{item.counseling_count}}</p>
        </div>
    </div>
</template>
<script>
  import api from './../../api/customized'
  import Bus from '@/assets/bus.js'
  export default {
    name: 'adviser_list',
    data(){
        return{
            list:[],
            adviser_id:'',
            adviser_name:'',
            count:'',
            price:'',
            level:'',
            level_name:'',
        }
    },
    watch:{
        params(){
            console.log('a');
            this.getData();
        }
    },
    props:{
        params:{
            type:Object,
        }
    },
    methods:{
        selectAdviser(level_name,name,id,price,index){
            if(id==this.adviser_id){
                this.$emit('selectAdviser',{adviser_id:id,level_name:level_name,adviser_name:name,price:price});
                Bus.$emit('selectAdviser',{adviser_id:id,level_name:level_name,adviser_name:name,price:price});
                this.adviser_id="";
                this.adviser_name="";
                this.level_name="";
                this.count=-1;
                this.price=price;

                // Bus.$emit('selectAdviser',{level_name:level,adviser_name:name,price:price});
                
            }else{
                this.$emit('selectAdviser',{adviser_id:id,level_name:level_name,adviser_name:name,price:price});
                Bus.$emit('selectAdviser',{adviser_id:id,level_name:level_name,adviser_name:name,price:price});
                this.adviser_id=id;
                this.adviser_name=name;
                this.level_name=level_name;
                this.count=index;
                this.price=price;
                sessionStorage.setItem('adviser_id',this.adviser_id);
                sessionStorage.setItem('adviser_name',this.adviser_name);
                sessionStorage.setItem('level_name',this.level);
                sessionStorage.setItem('price',this.price);

                // Bus.$emit('selectAdviser',{adviser_id:this.adviser_id,adviser_name:this.adviser_name,price:this.price});
                
            }
            
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
        },
        getData(){
            let data={
                // adviser_level:sessionStorage.getItem('level'),
                // operation_category:JSON.parse(sessionStorage.getItem('operation_category')),
                adviser_level:this.params.level,
                operation_category:this.params.selected,
            }
            // console.log(data.operation_category);
            api.getAdviserList(data).then(res=>{
                console.log(res);
                this.list=res.data;
                console.log(typeof this.list);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        // this.getData()
    },
    // beforeDestroy () {
    //     Bus.$off('selectAdviser')
    // },
    components:{
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