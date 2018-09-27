<template>
    <div id="articleList">
        <!-- <qrcode value="http://192.168.0.122:8080/#/articleList" type="img"></qrcode> -->
        <div class="list">
            <router-link :to="{name:'articleDetail'}">
            <div class="article clearfix">
                <div class="img_wrapper">
                    <img src="http://b.hiphotos.baidu.com/image/h%3D300/sign=1be95096e450352aae6123086343fb1a/f11f3a292df5e0feb83fd620516034a85edf72ef.jpg" alt="">
                </div>
                <p class="content">
                    LOL韩服质量王者局 :uzi,北美第一亚索，faker,mlxg,jdsk fls dfs f
                </p>
                <div class="other">
                    <span class="icon zk-icon-icon-1"></span>
                    <span class="author">人民网</span>
                    <span class="comment">26评论</span>
                </div>
            </div>
            </router-link>
            <router-link :to="{name:'articleDetail'}">
            <div class="articleTwo">
                <p class="title">
                    父子间的搞笑聊天记录父子间的搞笑聊天聊间的搞笑聊天记录父子间的搞笑聊天记录
                </p>
                <div class="img_wrapper">
                    <div class="wrapper">
                        <img src="http://a.hiphotos.baidu.com/image/pic/item/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                    </div>
                    <div class="wrapper">
                        <img src="http://d.hiphotos.baidu.com/image/h%3D300/sign=45a15735f61f4134ff37037e151d95c1/c995d143ad4bd113904f7de451afa40f4afb0562.jpg" alt="">
                    </div>
                    <div class="wrapper">
                        <img src="http://h.hiphotos.baidu.com/image/h%3D300/sign=ce1c4063d154564efa65e23983de9cde/80cb39dbb6fd5266575e4064a718972bd407364c.jpg" alt="">
                    </div>
                </div>
                <div class="other">
                    <span class="icon zk-icon-icon-1"></span>
                    <span class="author">人民网</span>
                    <span class="comment">26评论</span>
                </div>
            </div>
             </router-link>
            <router-link :to="{name:'articleDetail'}">
            <div class="article clearfix">
                <div class="img_wrapper">
                    <img src="http://b.hiphotos.baidu.com/image/h%3D300/sign=1be95096e450352aae6123086343fb1a/f11f3a292df5e0feb83fd620516034a85edf72ef.jpg" alt="">
                </div>
                <p class="content">
                    LOL韩服质量王者局 :uzi,北美第一亚索，faker,mlxg,jdsk fls dfs f
                </p>
                <div class="other">
                    <span class="icon zk-icon-icon-1"></span>
                    <span class="author">人民网</span>
                    <span class="comment">26评论</span>
                </div>
            </div>
             </router-link>
            <router-link :to="{name:'articleDetail'}">
            <div class="articleTwo">
                <p class="title">
                    父子间的搞笑聊天记录父子间的搞笑聊天聊间的搞笑聊天记录父子间的搞笑聊天记录
                </p>
                <div class="img_wrapper">
                    <div class="wrapper">
                        <img src="http://a.hiphotos.baidu.com/image/pic/item/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                    </div>
                    <div class="wrapper">
                        <img src="http://d.hiphotos.baidu.com/image/h%3D300/sign=45a15735f61f4134ff37037e151d95c1/c995d143ad4bd113904f7de451afa40f4afb0562.jpg" alt="">
                    </div>
                    <div class="wrapper">
                        <img src="http://h.hiphotos.baidu.com/image/h%3D300/sign=ce1c4063d154564efa65e23983de9cde/80cb39dbb6fd5266575e4064a718972bd407364c.jpg" alt="">
                    </div>
                </div>
                <div class="other">
                    <span class="icon zk-icon-icon-1"></span>
                    <span class="author">人民网</span>
                    <span class="comment">26评论</span>
                </div>
            </div>
             </router-link>
        </div>
    </div>
</template>

<script>
    import { Qrcode } from 'vux'
export default {
    components:{
        Qrcode
    }
};
</script>

<style>
#articleList .list {
    margin: 0 0.3rem;
}
#articleList .list .article {
    margin: 0.3rem 0;
}
#articleList .list .article .img_wrapper {
    float: left;
    width: 2.7rem;
    height: 1.7rem;
    overflow: hidden;
}
#articleList .list .article .img_wrapper img {
    width: 100%;
    min-height: 1.7rem;
}

#articleList .list .article .content {
    margin: 0 0.3rem 0 3rem;
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#articleList .list .article .other {
    margin: 0.35rem 0.3rem 0 3rem;
    font-size: 0.25rem;
    line-height: 0.4rem;
    color: #ccc;
}
#articleList .list .article .other span {
    margin-right: 0.2rem;
}
#articleList .list .article .other span.icon {
    color: red;
}
.articleTwo {
    margin: 0.3rem 0;
}
.articleTwo p.title {
    font-size: 0.3rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.articleTwo .img_wrapper {
    display: flex;
    justify-content: space-around;
}
.articleTwo .img_wrapper .wrapper {
    width: 2.2rem;
    height: 2rem;
    overflow: hidden;
}
.articleTwo .img_wrapper .wrapper img{
    width: 100%;
    min-height:100%;
}
#articleList .list .articleTwo .other {
    margin: .1rem 0;
    font-size: 0.25rem;
    line-height: 0.4rem;
    color: #ccc;
}
#articleList .list .articleTwo .other span {
    margin-right: 0.2rem;
}
#articleList .list .articleTwo .other span.icon {
    color: red;
}
</style>
