<template>
    <div id="author_info">
        <div class="author_wrapper">
            <div class="img_wrapper">
                <img v-if="author.headimg" :src="getFileUrl()+author.headimg" alt="">
                <img v-else/>
            </div>
            <div class="info">
                <p class="name">{{author.name?author.name:''}}</p>
                <p class="view">{{transform_num(author.view)}}浏览</p>
            </div>
            <span v-if="follow_status" class="follow">已关注</span>
            <span v-else class="follow zk-icon-guanzhu">+ </span>
        </div>
    </div>
</template>

<script>
import apiCom from "@/api/common";
export default {
    props: {
        user: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            author: this.user,
            follow_status: false
        };
    },
    watch: {
        user(val, oldVal) {
            this.author = val;
        }
    },
    methods: {
        transform_num(index) {
            if (!index) {
                return 0;
            }
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000 ? Math.floor(num / 10000) + "万" : num;
        },
        getFileUrl() {
            return apiCom.imgUrl();
        }
    }
};
</script>

<style scoped>
#author_info {
    width: 100%;
}
#author_info .author_wrapper {
    padding: 0 0.2rem;
    overflow: hidden;
    /* background-color: #ffffff50; */
}
#author_info .author_wrapper .follow {
    float: right;
    color: #fff;
    margin: 0.1rem 0 0 0.1rem;
    padding: 0.15rem 0.5rem;
    border-radius: 0.8rem;
    background-color: #20b2aa;
    font-size: 0.3rem;
}
#author_info .author_wrapper .info {
    float: left;
    position: relative;
    font-size: 0.3rem;
    margin-left: 0.2rem;
    width: 3.5rem;
    height: 0.8rem;
}
#author_info .author_wrapper .info p {
    font-size: 0.3rem;
    line-height: 0.4rem;
}
#author_info .author_wrapper .info .name {
    font-size: 0.35rem;
    position: absolute;
    width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    top: 0;
}
#author_info .author_wrapper .info .view {
    font-size: 0.28rem;
    position: absolute;
    bottom: 0;
    color: rgb(125, 125, 126);
}
#author_info .author_wrapper .img_wrapper {
    float: left;
    display: inline-flex;
    align-items: center;
    width: 0.8rem;
    height: 0.8rem;
    overflow: hidden;
    border-radius: 1rem;
    background: #ddf;
}
#author_info .author_wrapper .img_wrapper img {
    width: 100%;
}
</style>
