<template>
    <div id="atlasesAdd">
        <div class="head">
            <top title="修改图集"></top>
            <span class="add_submit" @click="addSubmit">完成</span>
        </div>
        <div class="contents">
            <span>修改标题</span>
            <div class="content">
                <textarea placeholder="修改标题。。。"></textarea>
            </div>
            <Upload @changeUrls="getUrl" :img-max-num=9 :file-type=1 title="修改图片文章"></Upload>
        </div>
        <div class="show_atlases">
            <div class="atlases vux-1px-b">
                <div class="show_img">
                    <img src="./../../assets/logo.png" alt="">
                </div>
                <textarea ref="val1" placeholder="修改图片简介..."></textarea>
            </div>
            <div class="atlases vux-1px-b">
                <div class="show_img">
                    <img src="./../../assets/logo.png" alt="">
                </div>
                <textarea ref="val2" placeholder="修改图片简介..."></textarea>
            </div>
            <div class="atlases vux-1px-b">
                <div class="show_img">
                    <img src="./../../assets/logo.png" alt="">
                </div>
                <textarea ref="val2" placeholder="修改图片简介..."></textarea>
            </div>
            <div class="atlases vux-1px-b">
                <div class="show_img">
                    <img src="./../../assets/logo.png" alt="">
                </div>
                <textarea ref="val2" placeholder="修改图片简介..."></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import top from "@/components/decorate/top_back_title.vue";
import Upload from "@/components/public/upload";
export default {
    components: {
        top,
        Upload
    },
    data() {
        return {
            text_val: []
        };
    },
    methods: {
        getUrl(data) {
            console.log(data);
        },
        addSubmit() {
            for (let index in this.$refs) {
                console.log(this.$refs[index].value);
            }
        }
    }
};
</script>

<style>
#atlasesAdd{
}
#atlasesAdd .head {
    position: fixed;
    margin-bottom: 0.3rem;
    right: 0;
    left: 0;
    top: 0;
}
#atlasesAdd .head span.add_submit {
    position: absolute;
    right: 0.2rem;
    top: 0.35rem;
    font-size: 0.3rem;
}
#atlasesAdd .show_atlases{
    margin-bottom: 1.1rem;
}
#atlasesAdd .show_atlases .atlases {
    display: flex;
    justify-content: space-around;
    height: 3rem;
    padding: 0.2rem 0;
}
#atlasesAdd .show_atlases .atlases .show_img {
    width: 48%;
    height: 100%;
    overflow: hidden;
}
#atlasesAdd .show_atlases .atlases .show_img img {
    width: 100%;
    min-height: 100%;
}
#atlasesAdd .show_atlases .atlases textarea {
    width: 40%;
    height: 2rem;
    margin-top: 1rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
}
#atlasesAdd .contents{
    margin-top: 1rem;
}
#atlasesAdd .contents span {
    margin: 0 0.3rem;
    padding: 0.1rem 0.3rem;
    font-size: 0.3rem !important;
    font-weight: 550;
    border-bottom: 1px solid #ff5370;
}
#atlasesAdd .contents .content {
    text-align: center;
}
#atlasesAdd .contents textarea {
    width: 80%;
    height: 0.8rem;
    margin: 0.3rem 0;
    font-size: 0.3rem;
    line-height: 0.4rem;
}
</style>
