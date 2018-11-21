<!--  -->
<template>
    <div class="diary-box">
        <div class="title border-bot">
            {{title}}
            <router-link :to="{name:links['router'],query:links['query']}" class="fr right">
                查看更多日记
                <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
            </router-link>
        </div>
        <div v-if="ins_id!=-0">
            <diary :insId=ins_id :number="number" :query=true></diary>
        </div>
        <div v-else>
            <diary :docId=doc_id :number="number" :query=true></diary>
        </div>
    </div>
</template>

<script>
    import diary from '@/components/diary/diary_list.vue';
    export default {
        name: "diary_box",
        props: {
            links: {
                type: Object,
                default () {
                    return {
                        'router': '',
                        'query': {},
                    }
                }
            },
            title: {
                type: String,
                default: ''
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
        },
        data() {
            return {};
        },
        components: {
            diary
        },
        methods: {},
        mounted() {},
    }
</script>
<style scoped>
    .fr {
        float: right;
    }
    .diary-box .title {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.36rem;
        color: #333;
        padding: 0 0.30rem;
    }
    .diary-box {
        background: #fff;
        margin-bottom: 0.20rem;
        font-size: 0.36rem;
    }
</style>