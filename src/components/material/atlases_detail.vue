
<template>
    <div id="atlases_detail">
        <div class="material">
            <div class="author_info" v-show="atlases_content_show">
                <authorInfo :user=user></authorInfo>
            </div>
            <div class="atlases_wrapper" v-for="(img,index) in imgs" :key=index v-if="index == '0'">
                <p class="content">{{info.title}}</p>
                <div class="atlases">
                    <preciew :list="imgs" @IndexChange="getIndex" @show="show" @close="close"></preciew>
                    <span>{{imgs.length}}图</span>
                </div>
                <div v-show="atlases_content_show">
                    <p class="atlases_content" v-for="(msg,index) in JSON.parse(info.material_content)" :key=index v-show="content_show == (index+1)" v-if="msg.alt">{{msg.alt}}</p>
                </div>
                <p class="author">{{info.author}}
                    <span class="comments">0评论</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import apiCom from "@/api/common";
import apiM from "@/api/material/index.js";
import preciew from "@/components/decorate/preciew";
export default {
    name: "atlases_detail",
    props: {
        info: {
            default: function() {
                return {};
            }
        },
        healthyTalkId: {
            default: ""
        }
    },
    data() {
        return {
            healthy_talk_id: this.healthyTalkId,
            video_show: true,
            atlases_show: true,
            article_show: true,
            atlases_content_show: false,
            content_show: 1,
            imgs: [],
            user: {}
        };
    },
    methods: {
        add_view() {
            var self = this;
            apiCom.ajaxSubmit("common", "viewCount", {
                table: "hm_healthy_talk",
                id: self.healthyTalkId
            });
        },
        imgUrl() {
            return apiM.fileUrl();
        },
        getIndex(index) {
            this.content_show = index;
        },
        show() {
            var t;
            var self = this;
            clearTimeout(t);
            t = setTimeout(function() {
                self.atlases_content_show = true;
            }, 300);
        },
        close() {
            this.atlases_content_show = false;
        },
        getData() {
            if (this.info.material_content) {
                let data = JSON.parse(this.info.material_content);
                for (let index in data) {
                    let data1 = {
                        w: 0,
                        h: 0,
                        msrc: this.imgUrl() + data[index].url,
                        src: this.imgUrl() + data[index].url
                    };
                    this.imgs.push(data1);
                }

                this.user = {
                    user_id: this.info.user_id,
                    headimg: this.info.headimgurl,
                    name: this.info.nickname,
                    view: this.info.view_count
                };
                this.add_view();
            }
        },
        toJson: function(str) {
            let _str = new Function("", "return " + str)();
            return _str;
        }
    },
    components: {
        preciew
    },
    mounted() {
        this.getData();
    }
};
</script>

<style scoped>
#atlases_detail .material .author_info {
    position: fixed;
    top: 1rem;
    left: 0;
    right: 0;
    color: #fff;
    z-index: 1501;
}
#atlases_detail .material .atlases_wrapper .atlases {
    position: relative;
    text-align: center;
    width: 100%;
    height: 3.5rem;
    overflow: hidden;
    background-color: #fff;
}
#atlases_detail .material .atlases_wrapper .atlases_content {
    position: fixed;
    left: 0.2rem;
    right: 0.1rem;
    bottom: 0.1rem;
    height: 3rem;
    line-height: 0.35rem;
    overflow-y: scroll;
    color: #fff;
    font-size: 0.3rem;
    background-color: #00000080;
    z-index: 4010;
}
#atlases_detail .material .atlases_wrapper .atlases img {
    width: 100%;
    min-height: 3.15rem;
}
#atlases_detail .material .atlases_wrapper .atlases span {
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
#atlases_detail .material .atlases_wrapper p.content {
    font-size: 0.3rem;
    /* height: 0.8rem; */
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0.1rem 0 0.2rem;
}
#atlases_detail .material .atlases_wrapper p.author {
    font-size: 0.25rem;
    color: #7d7d7d;
    padding: 0.1rem 0;
    margin-right: 0.2rem;
    /* box-shadow: 1px 1px 0px #dbd6d6; */
}
#atlases_detail .material .atlases_wrapper p.author span.comments {
    margin-left: 4px;
}
</style>
