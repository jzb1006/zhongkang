<template>
    <div id="Cvideo_detail">
        <videoDetailc :material=material :user=user></videoDetailc>
    </div>
</template>

<script>
import apiCom from "@/api/common";
import apiM from "@/api/material/index.js";
import materialTab from "./material_tab";
import videoDetailc from "@/templates/material/video_detail";
import { mixin } from "@/assets/js/mixins.js";
export default {
    props: {
        healthyTalkId: {
            default: ""
        }
    },
    data() {
        return {
            material: [],
            healthy_talk_id: this.healthyTalkId,
            user: {}
        };
    },
    components: {
        videoDetailc
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
                    let data = res.data.material_once[0];
                    self.user = {
                        user_id: data.user_id,
                        headimg: data.headimgurl,
                        name: data.author,
                        view: data.view_count
                    };
                });
        }
    },
    mounted() {
        if (this.$route.query.healthy_talk_id) {
            this.healthy_talk_id = this.$route.query.healthy_talk_id;
            this.getData();
        }
        // apiCom.ajaxSubmit("common", "viewCount", {
        //     table: "hm_healthy_talk",
        //     id: this.$route.query.healthy_talk_id
        // });
    }
};
</script>

<style>
</style>
