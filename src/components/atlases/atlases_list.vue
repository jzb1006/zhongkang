<template>
    <div id="atlasesList">
        <searchBar :title="'图一图'" :iconShow="true"></searchBar>
        <span v-show="show" class="close zk-icon-guanbi" @click="sendimgs()"></span>
        <atlasesHead v-show="show"></atlasesHead>
        <atlasesDetail v-show="show"></atlasesDetail>
        <div class="list">
            <div class="atlases_wrapper" v-for="(img,index) in imgs" @click="sendimgs()">
                <div class="atlases">
                    <img :src="img.url" :preview="index" preview-text="描述1111文字">
                    <img :src="img.url" :preview="index" preview-text="描述文字">
                    <span>6图</span>
                </div>
                <p class="content">{{img.content}}</p>
                <p class="author">{{img.author}}<span class="comments">{{img.comment}}评论</span></p>
            </div>
        </div>
    </div>
</template>
<script>
import searchBar from "@/components/home/search_bar.vue";
import atlasesDetail from "@/components/atlases/atlases_detail.vue";
import atlasesHead from "@/components/atlases/atlases_head.vue";
export default {
    data(){
        return{
            show:false,
            imgs: [
                {
                  url: 'http://covteam.u.qiniudn.com/ka2.jpg',
                  content: '10幅尤其的图片',
                  author:'小黄',
                  comment:'23'
                },
                {
                  url: 'http://covteam.u.qiniudn.com/poster.png',
                  content: '10幅尤其的图片',
                  author:'小黄',
                  comment:'23'
                },
                {
                  url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=145923204,1507853794&fm=173&app=25&f=JPEG?w=218&h=146&s=BE305E856C739E9E92391DA60300A010',
                  content: '10幅尤其的图片',
                  author:'小黄',
                  comment:'23'
                },
                {
                  url: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=145923204,1507853794&fm=173&app=25&f=JPEG?w=218&h=146&s=BE305E856C739E9E92391DA60300A010',
                  content: '10幅尤其的图片',
                  author:'小黄',
                  comment:'23'
                }
            ]
        }
    },
    components:{
        searchBar,
        atlasesDetail,
        atlasesHead
    },
    methods:{
        sendimgs(data){
            this.show = !this.show;
        },
    },
    watch:{
        show(val,oldVal){
            console.log(val+" "+oldVal);
        }
    }
}
</script>
<style>
    @import url("./../../assets/css/picview.css");
</style>

<style scoped>
    #atlasesList span.close{
        position: relative;
        color:#fff;
        z-index:5000;
    }
    #atlasesList .list .atlases_wrapper{
        box-shadow: 1px 1px 0px #dbd6d6;
        border-bottom: .1rem solid #eceaea;
    }
    #atlasesList .list .atlases_wrapper .atlases{
        position: relative;
        text-align: center;
        width: 100%;
        height: 4rem;
        overflow: hidden;
        background-color: #fff;
    }
    #atlasesList .list .atlases_wrapper .atlases img{
        width: 100%;
        height: auto;
    }
    #atlasesList .list .atlases_wrapper .atlases span{
        position: absolute;
        bottom: .2rem;
        right: .2rem;
        font-size: .25rem;
        padding: .1rem .2rem;
        color: #fff;
        border: 1px solid #000000bd;
        border-radius: 1rem;        
        background-color: #000000bd;
    }
    #atlasesList .list .atlases_wrapper p.content{
        font-size: .3rem;
        line-height: .5rem;
        padding: .2rem;
    }
    #atlasesList .list .atlases_wrapper p.author{
        font-size: .25rem;
        color: #aaa;
        padding:0 .2rem .4rem .2rem;
        box-shadow: 1px 1px 0px #dbd6d6;
    }
    #atlasesList .list .atlases_wrapper p.author span.comments{
        margin-left: .2rem;
    }
</style>

