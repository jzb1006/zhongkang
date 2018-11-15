<template>
    <div id="customizedReply">
        <top :params="params"></top>
        <!-- <div class="add_programme">
            <span class="btn" @click="add_programme">添加方案</span>
        </div> -->
        <!-- <div class="container"> -->
        <new-programme></new-programme>
        <reply-item></reply-item>
            <!-- <div class="item" v-for="(item,index) in programme" :key="index">
                <div class="item vux-1px-b" @click="showList(index)">
                    方案{{index+1}}
                </div>
                <div v-show="index==sign">
                    <div class="row vux-1px">
                        <span class="span">手术方案：</span>
                        <div class="programme">
                            <p class="wenben">{{item.programme[0]}}</p>
                            <p class="imgbox" v-for="(i,index) in item.programme.slice(1,item.programme.height)" :key="index">
                                <img :src="url(i)" class="img">
                            </p>
                        </div>
                    </div>
                    <div class="row vux-1px">
                        <span class="span">手术价格：</span>
                        <span class="text">{{item.operation_price}}</span>
                    </div>
                    <div class="row vux-1px">
                        <p>案例图:</p> 
                        <p class="imgbox" v-for="(i,index) in item.photo" :key="index">
                            <img :src="url(i)" class="img">
                        </p>
                    </div>
                </div>
            </div> -->
        <!-- </div> -->
        <!-- <add-programme v-show="addNewProgramme" @passProgramme="getProgramme"></add-programme> -->
        <div id="fill"></div>
    </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
  import api from './../../api/customized'
  import Bus from '@/assets/bus.js'
  import Upload from '@/components/public/upload'
  import addProgramme from '@/components/adviser/add_programme.vue'
  import replyItem from '@/components/customized/reply_item.vue'
  import newProgramme from '@/components/adviser/new_programme.vue'
  export default {
    name: 'customizedReply',
    data(){
        return{
            text:'',
            order_sn:'',
            price:'',
            photo:[],
            addNewProgramme:false,
            programme:[],
            sign:'',
            params:{
                title:'定制回复',
                hasBtn:true,
                btnText:'确定',
                next:this.next,
            }
        }
    },
    methods:{
        next(){

            let postdata=this.programme;
            console.log(postdata);
            api.saveCustomizedReply(postdata).then(res=>{
                console.log(res);
                this.$router.push('/replyOrder');
            }).catch(err=>{
                console.log(err);
            })
        },
        getPhotoUrl(data){
            this.photo=data;
        },
        url(i){
            return api.imgUrl()+i;
        },
        add_programme(){
            console.log(this.order_sn);
            // this.$router.push({path:'/programme',query:{order_sn:this.order_sn}});
            this.addNewProgramme=true;
        },
        showList(index){
            if(this.sign==index){
                this.sign=-1;
            }else{
                this.sign=index;
            }
        },
        // getProgramme(data){
        //     this.programme.push(data);
        //     this.addNewProgramme=false;
        // }
    },
    mounted(){
        Bus.$on('passProgramme',res=>{
            this.programme.push(res);
        })
    },
    beforeDestroy(){
        Bus.$off('passProgramme');
    },
    beforeRouteEnter(to, from, next){
        next( vm => {
            // 通过 `vm` 访问组件实例
            if(vm.$route.query.order_sn){
                vm.order_sn=vm.$route.query.order_sn;
            }
            console.log(vm.order_sn);
            console.log(vm.$route.params.data);
            if(vm.$route.params.data){
                vm.programme.push(vm.$route.params.data);
            }
            

        })
    },
    components:{
        top,
        Upload,
        addProgramme,
        replyItem,
        newProgramme
    }
  }
</script>
<style scoped>
    .add_programme,.container,.content{
        width:90%;
        margin:.5rem auto;
        font-size:.3rem;
        box-sizing: border-box;
    }
    .add_programme .btn{
        padding:.2rem;
        background:#ff5370;
        color:#fff;
    }
    .item{
        padding:.2rem;
        position:relative;
        min-height:.8rem;
        border:1px solid #ccc;
    }
    .item:after{
        content:" ";
        display: block;
        clear:both;
    }
    .row:after{
        content:" ";
        display: block;
        clear:both;
    }
    .span{
        width:24%;
        float:left;
        box-sizing: border-box;
        line-height: .8rem;
    }
    .include{
        width:66%;
        padding:.1rem;
        box-sizing: border-box;
        position:absolute;
        left:26%;
        top:50%;
        transform: translateY(-50%);
	}
    .programme{
        width:66%;
        float:left;
        padding:.1rem;
    }
    .programme .wenben{
        width: 100%;
        height: auto;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
    }
    .text{
        width:66%;
        float:left;
        padding:.1rem;
    }
    .price{
        padding:.1rem;
        position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
		box-sizing: border-box;
        font-size: .3rem;
    }
    .addPic{
        padding:.2rem 0;
    }
    .margin-b{
        margin-bottom:1rem;
    }
    .img{
        width:2rem;
        height:2rem;
    }
</style>