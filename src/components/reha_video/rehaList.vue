<template>
    <div id="RehaList">
        <searchBar :title="'图一图'" :iconShow="true"></searchBar>
        <div class="list">
            <div class="RehaList_wrapper">
                <p class="title">
                    川流不息的人流原来是这样拍的
                    <span class="play">251万次播放</span>
                </p>

                <div class="reha">
                    <video controls src="http://www.runoob.com/try/demo_source/mov_bbb.mp4"></video>
                    <span class="time">04:21</span>
                </div>
                <div class="other">
                    <div class="headimg">
                        <img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=75708ef69425bc31345d07986edf8de7/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                    </div>
                    <p>
                        <span class="name">友情老司机</span>
                        <span class="favor">· · ·</span>
                        <span class="comments">507</span>
                        <span class="follow">关注</span>
                    </p>
                </div>
            </div>
            <div class="RehaList_wrapper">
                <p class="title">
                    川流不息的人流原来是这样拍的
                    <span class="play">251万次播放</span>
                </p>

                <div class="reha">
                    <video controls src="https://static.yximgs.com/s1/videos/home-2.mp4"></video>
                    <span class="time">04:21</span>
                </div>
                <div class="other">
                    <div class="headimg">
                        <img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=75708ef69425bc31345d07986edf8de7/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                    </div>
                    <p>
                        <span class="name">友情老司机</span>
                        <span class="favor">· · ·</span>
                        <span class="comments">507</span>
                        <span class="follow">关注</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import searchBar from "@/components/home/search_bar.vue";
export default {
    components: {
        searchBar
    }
};
</script>
<style scoped>
#RehaList {
}
#RehaList .list .RehaList_wrapper {
    position: relative;
}
#RehaList .list .RehaList_wrapper p.title {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    right: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: #fff;
    z-index: 1;
}
#RehaList .list .RehaList_wrapper span.play {
    display: block;
    font-size: 0.2rem;
    line-height: 0.4rem;
    color: #fff;
}
#RehaList .list .RehaList_wrapper .reha {
    position: relative;
    width: 100%;
    height: 4.15rem;
    background-color: #00000080;
}
#RehaList .list .RehaList_wrapper .reha video{
    width: 100%;
    height: 100%; 
}
#RehaList .list .RehaList_wrapper .reha span.time {
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.2rem;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    background-color: #00000085;
}
#RehaList .list .RehaList_wrapper div.other {
    position: relative;
}
#RehaList .list .RehaList_wrapper div.other .headimg {
    float: left;
    width: 0.8rem;
    height: 0.8rem;
    border: 2px solid #fff;
    border-radius: 1rem;
    overflow: hidden;
}
#RehaList .list .RehaList_wrapper div.other .headimg img {
    max-width: 100%;
    min-height: 100%;
}
#RehaList .list .RehaList_wrapper div.other p {
    font-size: 0.3rem;
    margin:.1rem 0 .3rem .8rem;
    padding: 0.3rem;
}
#RehaList .list .RehaList_wrapper div.other p span.follow,
span.comments,
span.favor {
    margin: 0 .3rem;
    float: right;
}
</style>
