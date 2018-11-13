<template>
    <div id="programme">
            <div class="container vux-1px">
                <div class="item">
                    <span class="span">手术方案：</span>
                    <div class="programme">
                        <textarea class="text" v-model="text"></textarea>
                        <div class="addPic vux-1px">
                            <Upload @changeUrls="getProgrammePhoto" :file-type=1 title="添加图片" :oldPhoto="this.programmePhoto"></Upload>
                        </div>
                    </div>
                </div>
                <div class="item vux-1px-t">
                    <span class="span">手术价格：</span>
                    <div class="include vux-1px"><input type="text" class="price" v-model="price"></div>
                </div>
            </div>
            <div class="content vux-1px">
                <div class="addPic">
                    <Upload @changeUrls="getPhotoUrl" :file-type=1 title="添加n张手术案例图" :oldPhoto="this.photo"></Upload>
                </div>
            </div>
    </div>
</template>
<script>
  import api from './../../api/customized'
  import Upload from "@/components/public/upload"
  export default {
    name: 'programme',
    data(){
        return{
            text:'',
            order_sn:'',
            price:'',
            photo:[],
            programmePhoto:[],
            programme:[],
        }
    },
    methods:{
        getPhotoUrl(data){
            this.photo=data;
        },
        getProgrammePhoto(data){
            this.programmePhoto=data;
        }
    },
    components:{
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
        display: block;
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
    .programme{
        width:66%;
        float:left;
        /* height:3rem; */
    }
     .text{
        width:100%;
        height:2.8rem;
        padding:.2rem;
        box-sizing: border-box;
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
        border:1px solid #ccc;
    }
    .margin-b{
        margin-bottom:1rem;
    }
</style>