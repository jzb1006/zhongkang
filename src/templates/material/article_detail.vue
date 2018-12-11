<template>
    <div id="articleDetail" v-if="Object.keys(material).length">
        <div class="authorInfo">
            <authorInfo :user=user></authorInfo>
        </div>
        <div class="contents" v-for="(m,index) in material" :key=index>
            <p class="title">{{m.title}}</p>
            <p class="other">{{m.author}}
                <span class="time">{{m.update_time}}</span>
            </p>
            <div class="content" v-html="m.material_content">
            </div>
        </div>
        <reward paytype='pay_btn'></reward>
    </div>
</template>

<script>
import apiCom from "@/api/common";
import reward from "@/components/decorate/reward.vue";
import apiM from "@/api/material/index.js";
import top from "@/components/decorate/top_back_title.vue";
export default {
    name: "article_detail",
    props: {
        material: {
            default: function() {
                return [];
            }
        },
        user: {
            default: function() {
                return {};
            }
        }
    },
    components: {
        top,
        reward
    }
};
</script>

<style>
body {
    padding-bottom: 1rem;
}
#articleDetail .authorInfo {
    padding: 0.1rem 0;
}
#articleDetail div.contents {
    margin: 0.2rem;
    font-size: 0.3rem;
    overflow: hidden;
}
#articleDetail p.title {
    font-size: 0.4rem;
    line-height: .7rem; 
}
#articleDetail p.other {
    line-height: 0.5rem;
}
#articleDetail .content {
    margin: 0.2rem;
    line-height: 0.5rem;
}
</style>
