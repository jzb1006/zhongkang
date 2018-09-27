<template>
    <div id="RehaDetail">
        <div class="top1">
            <p class="top">
                <top title="Reha_Video"></top>
            </p>
        </div>

        <div class="reha_wrapper vux-1px-b">
            <div>
                <video controls controlsList="nodownload" :src="url"></video>
            </div>
            <div class="other">
                <div class="headimg">
                    <img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=75708ef69425bc31345d07986edf8de7/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                </div>
                <p>
                    <span class="name">就发快递速度快</span>
                    <span class="follow zk-icon-guanzhu">关注</span>
                </p>
            </div>
        </div>
        <commentList></commentList>
    </div>
</template>
<script>
import top from "@/components/decorate/top_back_title.vue";
import commentList from "@/components/comment/comment_list";
export default {
    data() {
        return {
            url: null
        };
    },
    components: {
        commentList,
        top
    },
    created() {
        this.url = this.$route.params.urls;
    }
};
</script>
 <style scoped>
#RehaDetail{
    width: 100%;
}
#RehaDetail .top1 {
    height: 1rem;
}
#RehaDetail .top1 .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
#RehaDetail .reha_wrapper {
    position: fixed;
    top: 1rem;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #00000080;
}
#RehaDetail .reha_wrapper div:first-child {
    height: 4.16rem;
}
#RehaDetail .reha_wrapper video {
    width: 100%;
    height: 100%;
}
#RehaDetail .reha_wrapper .other{
    top: 2rem;
    padding: .2rem;
    background-color: #fff;
}
#RehaDetail .reha_wrapper .other .headimg {
    float: left;
    width: .8rem;
    height: .8rem;
    border-radius: 1rem;
    overflow: hidden;
}
#RehaDetail .reha_wrapper .other .headimg img{
    width: 100%;
    min-height: 100%;
}
#RehaDetail .reha_wrapper .other p {
    display: flex;
    justify-content: space-between;
    font-size: .3rem;
    margin-left: 1rem;
}
#RehaDetail .reha_wrapper .other p>span.name{
    margin: .27rem 0;
}
#RehaDetail .reha_wrapper .other p span.follow{
    display: inline-block;
    margin: .16rem .2rem  .16rem 0;
    padding: .1rem .3rem;
    border: 1px solid #ccc;
}
#commentList{
    margin: 5.6rem 0 1.5rem;
}
</style>

