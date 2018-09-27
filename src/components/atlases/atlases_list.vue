<template>
    <div id="atlasesList">
        <searchBar :title="'图一图'" :iconShow="true"></searchBar>
        <p style="font-size:.3rem;padding:.2rem">
            <router-link :to="{name:'atlasesAdd'}">
                <span>添加图集</span>
            </router-link>
            <router-link :to="{name:'atlasesUpdate'}">
                <span>修改图集</span>
            </router-link>
        </p>
        <atlasesHead v-show="atlases_content_show"></atlasesHead>
        <atlasesDetail v-show="atlases_content_show"></atlasesDetail>
        <div class="list">
            <div class="atlases_wrapper" v-for="(img,index) in imgs" v-if="index == '1'">
                <div class="atlases">
                    <preciew :list="imgs" @IndexChange="getIndex" @show="show" @close="close"></preciew>
                    <span>6图</span>
                </div>
                <div v-show="atlases_content_show">
                    <p class="atlases_content" v-show="content_show == '1'">我可以跟在你身后，款到发书想影子跟着光梦游</p>
                    <p class="atlases_content" v-show="content_show == '2'">我可以跟在放大看是否你身后，款到发书想影子跟着光梦游</p>
                    <p class="atlases_content" v-show="content_show == '3'">我可以跟在你身后，款是否是到发书想影子跟着光梦游</p>
                    <p class="atlases_content" v-show="content_show == '4'">我可以跟在你身后，款到发书三大；反馈个地方想影子跟着光梦游</p>
                </div>
                
                <p class="content">我可以跟在你身后，想影子跟着光梦游</p>
                <p class="author">提笔随风
                    <span class="comments">12评论</span>
                </p>
            </div>
            <div class="atlases_wrapper" v-for="(img,index) in imgs" v-if="index == '1'">
                <div class="atlases">
                    <preciew :list="imgs" @IndexChange="getIndex" @show="show" @close="close"></preciew>
                    <span>6图</span>
                </div>
                <div v-show="atlases_content_show">
                    <p class="atlases_content" v-show="content_show == '1'">我可以跟着光梦游</p>
                    <p class="atlases_content" v-show="content_show == '2'">我可以跟在放大看是着光梦游</p>
                    <p class="atlases_content" v-show="content_show == '3'">我可以跟在你身后，子跟着光梦游</p>
                    <p class="atlases_content" v-show="content_show == '4'">我可以跟在你身后，款到地方想影子跟着光梦游</p>
                </div>
                
                <p class="content">我可以跟在你身后，想影子跟着光梦游</p>
                <p class="author">提笔随风
                    <span class="comments">12评论</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import searchBar from "@/components/home/search_bar.vue";
import atlasesDetail from "@/components/atlases/atlases_detail.vue";
import atlasesHead from "@/components/atlases/atlases_head.vue";
import preciew from "@/components/decorate/preciew.vue";
export default {
    data() {
        return {
            atlases_content_show:false,
            content_show:1,
            imgs: [
                {
                    w: 600,
                    h: 400,
                    src: "http://covteam.u.qiniudn.com/ka2.jpg"
                },
                {
                    w: 600,
                    h: 400,
                    src: "http://covteam.u.qiniudn.com/poster.png"
                },
                {
                    w: 600,
                    h: 400,
                    src:
                        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=145923204,1507853794&fm=173&app=25&f=JPEG?w=218&h=146&s=BE305E856C739E9E92391DA60300A010"
                },
                {
                    w: 600,
                    h: 400,
                    src:
                        "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=145923204,1507853794&fm=173&app=25&f=JPEG?w=218&h=146&s=BE305E856C739E9E92391DA60300A010"
                }
            ]
        };
    },
    components: {
        searchBar,
        atlasesDetail,
        atlasesHead,
        preciew
    },
    methods: {
        getIndex(index){
            this.content_show = index;
        },
        show(){
            var t;
            var self = this;
            clearTimeout(t)
            t = setTimeout(function (){
                self.atlases_content_show = true;
            }, 300);
        },
        close(){
            this.atlases_content_show = false;
        }
    },
    watch: {
        show(val, oldVal) {
            // console.log(val+" "+oldVal);
        }
    },
    mounted(){
        // this.bus.$on('IndexChange', () => {
        //     console.log("dfg");
        // })
    }
};
</script>
<style>
@import url("./../../assets/css/picview.css");
</style>

<style scoped>
#atlasesList span.close {
    position: relative;
    color: #fff;
    z-index: 5000;
}
#atlasesList .list .atlases_wrapper {
    box-shadow: 1px 1px 0px #dbd6d6;
    border-bottom: 0.1rem solid #eceaea;
}
#atlasesList .list .atlases_wrapper .atlases {
    position: relative;
    text-align: center;
    width: 100%;
    height: 4rem;
    overflow: hidden;
    background-color: #fff;
}
#atlasesList .list .atlases_wrapper .atlases_content{
    position: absolute;
    bottom: 63px;
    /* top: 650px; */
    height: 100px;
    line-height:20px;
    color: #fff;
    font-size: .3rem;
    z-index: 4010;
}
#atlasesList .list .atlases_wrapper .atlases img {
    width: 100%;
    min-height: 4rem;
}
#atlasesList .list .atlases_wrapper .atlases span {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    font-size: 0.25rem;
    padding: 0.1rem 0.2rem;
    color: #fff;
    border: 1px solid #000000bd;
    border-radius: 1rem;
    background-color: #000000bd;
}
#atlasesList .list .atlases_wrapper p.content {
    font-size: 0.3rem;
    line-height: 0.5rem;
    padding: 0.2rem;
}
#atlasesList .list .atlases_wrapper p.author {
    font-size: 0.25rem;
    color: #aaa;
    padding: 0 0.2rem 0.4rem 0.2rem;
    box-shadow: 1px 1px 0px #dbd6d6;
}
#atlasesList .list .atlases_wrapper p.author span.comments {
    margin-left: 0.2rem;
}
</style>

