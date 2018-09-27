<template>
    <div id="atlases_browsse">
        <div class="material">
            <div class="atlases_wrapper" v-for="(img,index) in imgs" v-if="index == '1'">
                <div class="atlases">
                    <preciew :list="imgs" @IndexChange="getIndex" @show="show" @close="close"></preciew>
                    <span>{{imgs.length}}图</span>
                </div>
                <div v-show="atlases_content_show">
                    <p class="atlases_content" v-for="msg in info[0].material_content" v-show="content_show == (index+1)">{{img.alt}}</p>
                </div>
                <p class="content">{{info.title}}</p>
                <p class="author">{{info.author}}
                    <span class="comments">0评论</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import apiM from '@/api/material/index.js'
import preciew from "@/components/decorate/preciew";
export default {
    props: {
        info: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            video_show: true,
            atlases_show: true,
            article_show: true,
            atlases_content_show: false,
            content_show: 1,
            imgs: [],
            atlases_content_show: false
        };
    },
    methods: {
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
            for (let index in this.info) {
                let data = JSON.parse(this.info.material_content);
                for (let idex in data) {
                    let data1 = {
                        src: this.imgUrl() + data[idex].url,
                    };
                    this.imgs.push(data1);
                }
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
#atlases_browsse .material {
    box-shadow: 1px 1px 0px #dbd6d6;
    border-bottom: 0.1rem solid #eceaea;
}
#atlases_browsse .material .atlases_wrapper .atlases {
    position: relative;
    text-align: center;
    width: 100%;
    height: 4rem;
    overflow: hidden;
    background-color: #fff;
}
#atlases_browsse .material .atlases_wrapper .atlases_content {
    position: absolute;
    bottom: 63px;
    /* top: 650px; */
    height: 100px;
    line-height: 20px;
    color: #fff;
    font-size: 0.3rem;
    z-index: 4010;
}
#atlases_browsse .material .atlases_wrapper .atlases img {
    width: 100%;
    min-height: 3.15rem;
}
#atlases_browsse .material .atlases_wrapper .atlases span {
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
#atlases_browsse .material .atlases_wrapper p.content {
    font-size: 14px;
    line-height: 16px;
    padding: 4px;
}
#atlases_browsse .material .atlases_wrapper p.author {
    font-size: 0.3rem;
    color: #aaa;
    padding: 0 4px 4px 4px;
    box-shadow: 1px 1px 0px #dbd6d6;
}
#atlases_browsse .material .atlases_wrapper p.author span.comments {
    margin-left: 4px;
}
</style>
