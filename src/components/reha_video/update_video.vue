<template>
    <div id="addVideo">
        <div class="head">
            <top title="修改视频"></top>
            <span class="add_submit">完成</span>
        </div>
        
        <div class="add_content">
            <span>修改标题</span>
            <div class="content">
                <textarea placeholder="修改标题。。。"></textarea>
            </div>
            <Upload @changeUrls="getUrl" :video-max-num=1 :file-type=2 title="修改视频"></Upload>
        </div>
    </div>
</template>

<script>
import top from "@/components/decorate/top_back_title.vue";
import Upload from "@/components/public/upload";
export default {
components:{
    top,
    Upload
},
methods:{
    getUrl(data){
        console.log(data);
    }
}
}
</script>

<style>
    #addVideo .head{
        position: relative;
    }
    #addVideo .head span.add_submit{
        position: absolute;
        right: .2rem;
        top: .35rem;
        font-size: .3rem;
    }
    #addVideo .add_content span{
        margin: 0 .3rem;
        padding: .1rem .3rem;
        font-size: .3rem!important;
        font-weight: 550;
        border-bottom: 1px solid #ff5370;

    }
    #addVideo .add_content .content{
       text-align: center;
    }
    #addVideo .add_content textarea{
        width: 80%;
        height: .8rem;
        margin: .3rem 0;
        font-size: .3rem;
        line-height: .4rem;
    }
    #upload{
        /* text-align: left!important; */
    }
</style>
