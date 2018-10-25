<template>
    <div id="customizedReply">
        <top title="定制回复">
            <span slot="next" class="next" @click="next">确定</span>
        </top>
        <div class="add_programme">
            <span class="btn" @click="add_programme">添加方案</span>
            <span class="btn" @click="add_programme1" v-show="one">方案一</span>
        </div>
        <div v-show="showEdit1">
            <div class="container vux-1px">
                <div class="item vux-1px-b">
                    <span class="span">手术方案：</span>
                    <textarea class="text" v-model="text"></textarea>
                </div>
                <div class="item">
                    <span class="span">手术价格：</span>
                    <div class="include vux-1px"><input type="text" class="price" v-model="price"></div>
                </div>
            </div>
            <div class="content vux-1px">
                <div class="addPic">
                    <Upload @changeUrls="getPhotoUrl" :file-type=1 title="添加n张手术案例图"></Upload>
                </div>
            </div>
        </div>
        <div id="fill"></div>
    </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from './../../api/customized'
  import Upload from "@/components/public/upload";
  export default {
    name: 'customizedReply',
    data(){
        return{
            text:'',
            order_sn:'',
            price:'',
            photo:[],
            showEdit1:false,
            showEdit2:false
        }
    },
    methods:{
        next(){
            console.log(this.photo);
            let postdata={
                'order_sn':this.order_sn,
                'programme':this.text,
                'operation_price':this.price,
                'photo':this.photo
            }
            api.saveCustomizedReply(postdata).then(res=>{
                console.log(res);
                // alert(res.data.msg);
                this.$router.push('/replyOrder');
            }).catch(err=>{
                console.log(err);
            })
        },
        getPhotoUrl(data){
            this.photo=data;
        },
        add_programme(){
            this.showEdit1=!this.showEdit1;
        },
        add_programme1(){
            this.showEdit1=!this.showEdit1;
        },
        add_programme2(){
            this.showEdit2=!this.showEdit2;
        }
    },
    mounted(){
        this.order_sn=this.$route.query.order_sn;
        // api.viewReply({'order_sn':this.order_sn}).then(res=>{
        //     console.log(res);
        //     this.result=res.data;
        //     this.text=res.data.programme;
        //     this.price=res.data.operation_price;
        //     this.photo=res.data.photo;
        // }).catch(err=>{
        //     console.log(err);
        // })
    },
    components:{
        top,
        Upload
    }
  }
</script>
<style scoped>
    .add_programme,.container,.content{
        width:90%;
        margin:.2rem auto;
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
    }
    .item:after{
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
        /* float:left; */
        padding:.1rem;
        box-sizing: border-box;
        position:absolute;
        left:26%;
        top:50%;
        transform: translateY(-50%);
	}
     .text{
        width:66%;
        display:left;
        padding:.1rem;
        /* box-sizing: border-box; */
        /* position:absolute; */
        /* left:20%; */
        /* top:50%;
        transform: translateY(-50%); */
        height:3rem;
        /* margin-left:20%; */
        /* border:none; */
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
</style>