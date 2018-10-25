<template>
    <div id="articleDetail">
        <top title="文章"></top>
        <div class="contents" v-for="m in material">
            <p class="title">{{m.title}}</p>
            <p class="other">{{m.author}}
                <span class="time">{{m.time}}</span>
            </p>
            <div class="content" v-html="m.material_content">
            </div>
        </div>
        <div style="width:1rem;height:1rem;border:1px solid #000;overflow:hidden">
            <reward paytype='pay_btn'></reward>
        </div>

    </div>
</template>

<script>
import reward from "@/components/decorate/reward.vue";
import apiM from "@/api/material/index.js";
import top from "@/components/decorate/top_back_title.vue";
export default {
    data() {
        return {
            material: [],
            healthy_talk_id: ""
        };
    },
    components: {
        top,
        reward
    },
    methods: {
        getData() {
            var self = this;
            apiM
                .act_material("material_once", {
                    healthy_talk_id: this.healthy_talk_id
                })
                .then(res => {
                    self.material = res.data.material_once;
                    console.log(res);
                });
        }
    },
    mounted() {
        this.healthy_talk_id = this.$route.query.healthy_talk_id;
        this.getData();
    }
};
</script>

<style>
#articleDetail div.contents {
    margin: 0.2rem;
    font-size: 0.3rem;
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
