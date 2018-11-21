<template>
    <div id="articleDetail" v-if="Object.keys(material).length">
        <top title=""></top>
        <div class="authorInfo">
            <authorInfo :user=user></authorInfo>
        </div>
        <div class="contents" v-for="m in material">
            <p class="title">{{m.title}}</p>
            <p class="other">{{m.author}}
                <span class="time">{{m.time}}</span>
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
    // data() {
    // return {
    // material: [],
    // healthy_talk_id: this.healthyTalkId,
    // user: {}
    // };
    // },
    components: {
        top,
        reward
    }
    // methods: {
    //     getData() {
    //         var self = this;
    //         apiM
    //             .act_material("material_once", {
    //                 healthy_talk_id: this.healthy_talk_id
    //             })
    //             .then(res => {
    //                 self.material = res.data.material_once;
    //                 let data = res.data.material_once[0];
    //                 self.user = {
    //                     user_id: data.user_id,
    //                     headimg: data.headimgurl,
    //                     name: data.nickname,
    //                     view: data.view_count
    //                 };
    //             });
    //     }
    // },
    // mounted() {
    //     if (this.$route.query.healthy_talk_id) {
    //         this.healthy_talk_id = this.$route.query.healthy_talk_id;
    //         this.getData();
    //     }
    //     apiCom.ajaxSubmit("common", "viewCount", {
    //         table: "hm_healthy_talk",
    //         id: this.$route.query.healthy_talk_id
    //     });
    // }
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
    font-size: 0.45rem;
    line-height: 1rem;
}
#articleDetail p.other {
    line-height: 0.5rem;
}
#articleDetail .content {
    margin: 0.2rem;
    line-height: 0.5rem;
}
</style>
