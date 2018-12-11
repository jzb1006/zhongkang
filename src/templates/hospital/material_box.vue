<!--  -->
<template>
    <div class="material-box">
        <div class="title border-bot">
            {{title}}
            <router-link :to="{name:links['router'],query:links['query']}" class="fr right">
                查看更多素材
                <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
            </router-link>
        </div>
        <div v-if="ins_id!=-0">
            <material :insId=ins_id :params="getParams()"></material>
        </div>
        <div v-else>
            <material :docId=doc_id :params="getParams()"></material>
        </div>
    </div>
</template>

<script>
import material from "@/components/material/material_list.vue";
export default {
    name: "material_box",
    props: {
        links: {
            type: Object,
            default() {
                return {
                    router: "",
                    query: {}
                };
            }
        },
        title: {
            type: String,
            default: ""
        },
        ins_id: {
            type: Number,
            default: -0
        },
        doc_id: {
            type: Number,
            default: -0
        },
        number: {
            type: Number,
            default: -0
        },
        isMore: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {};
    },
    components: {
        material
    },
    methods: {
        getParams() {
            return { number: "1", is_more: "0" };
        }
    }
};
</script>
<style scoped>
.fr {
    float: right;
}
.material-box .title {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #333;
    padding: 0 0.3rem;
}
.material-box {
    background: #fff;
    margin-bottom: 0.2rem;
    font-size: 0.36rem;
}
</style>