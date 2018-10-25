<template>
    <div id="editProgramme">
        <top title="添加方案">
            <span slot="next" class="next" @click="add">确定</span>
        </top>
        <div>
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
  import Upload from "@/components/public/upload"
  export default {
    name: 'editProgramme',
    data(){
        return{
            text:'',
            order_sn:'',
            price:'',
            photo:[],
            oldProgramme:''
        }
    },
    methods:{
        add(){
            // console.log(this.photo);
            // console.log(this.order_sn);
            console.log(this.oldProgramme);
            console.log(this.text);
            let postdata={
                'order_sn':this.order_sn,
                'oldProgramme':this.oldProgramme,
                'programme':this.text,
                'operation_price':this.price,
                'photo':this.photo
            }
            console.log(postdata);
            api.updateSingleReply(postdata).then(res=>{
                this.$router.push({path:'/adviserViewReply',query:{order_sn:this.order_sn}});
            }).catch(err=>{
                console.log(err);
            })
            // this.$router.push({name:'customizedReply',params:{data:postdata}})
            // this.$emit('passProgramme',postdata);
            // this.text='';
            // this.price='';
        },
        getPhotoUrl(data){
            this.photo=data;
        },
    },
    mounted(){
        this.order_sn=this.$route.query.order_sn;
        let programme=this.$route.query.programme;
        this.oldProgramme=programme;
        console.log(this.order_sn);
        console.log(this.oldProgramme);
        api.querySingleReply({'order_sn':this.order_sn,'programme':this.oldProgramme}).then(res=>{
            // let data=res.data;
            console.log(res);
            this.text=res.data.programme;
            this.price=res.data.operation_price;
            this.photo=res.data.photo;
        }).catch(err=>{
            console.log(err);
        })
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
    #programme{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:1000;
        background:#fff;
    }
    .container,.content{
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