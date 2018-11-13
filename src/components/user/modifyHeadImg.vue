<template>
    <div id="modifyHeadImg" class="item distance vux-1px-b">
        <div class="left"><img class="headimg" :src="nopre"></div>
        <Upload :file-type=1 sign="headimg" title="修改头像"><span class="text"></span></Upload> 
        <div class="clear"></div>
    </div>
</template>
<script>
    import Upload from '@/components/public/upload.vue'
    import api from "../../api/user";
    import Bus from "@/assets/bus.js"
    export default {
        data(){
            return {
                nopre:'',
                headimgurl:'',
            }
        },
        props:{
            params:{
                type:[Object],
            }
        },
        watch:{
            params:function(newV,oldV){
                this.nopre=newV.nopre;
            },
            headimgurl:function(newV,oldV){
                Bus.$emit('changeHeadImg',newV);
            }
        },
        mounted(){
            Bus.$on('changeUrls',params=>{
                if(params.length >= 1){
                    this.headimgurl=params[0];
                    this.nopre=api.imgUrl()+params[0];
                    params.splice(0,1);
                }
            })
        },
        beforeDestroy(){
            Bus.$off('changeUrls');
        },
        components:{
            Upload
        }
    }
</script>
<style scoped>

    .text{
        font-size:.3rem;
        display:inline-block;
        background: #ff5370;
        color:#fff;
        border-radius:2px;
        padding:0.15rem 0.15rem;
        border-radius: 0.15rem;
        margin-top:.1rem;
    }
    .item{
        padding:0.25rem 0 0.25rem 0.15rem;
        background: #fff;
    }
    .clear{
        content:'';
        display:block;
        clear:both;
    }
    .distance{
        margin-bottom:0.25rem;
    }
    .left{
        padding:0.1rem;
        float:left;
        width:35%;
        box-sizing:border-box;
    }
    

    .headimg{
        width:1rem;
        height:1rem;
        border-radius:0.5rem;
    }

</style>


