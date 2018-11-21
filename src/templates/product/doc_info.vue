<!--  -->
<template>
    <div>
        <div class="shrink">
            <router-link :to="{name:route_link,query:route_params}" class="little-hospital-title border-1px">
                <span class="title">
                                        <span>医生 :{{doc_name}} </span>
                <span style="font-size:0.2rem; color: #999">
                    擅长：<productItem :items="expert_project" class="product_item"></productItem>
                </span>
                </span>
                <span class="zk-icon-jiantou arrow"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import productItem from "@/components/decorate/product_item.vue";
    export default {
        props: {
            route_link: {
                type: String,
                default: ''
            },
            route_params: {
                type: Object,
                default () {
                    return {
                        doc_id: 1,
                        ins_id: 2
                    }
                }
            },
            doc_name: {
                type: String,
                default: ''
            },
            expert_project: {
                type: String,
                default: ''
            }
        },
        data() {
            return {};
        },
        components: {
            productItem
        },
        methods: {},
        mounted() {},
    }
</script>
<style scoped>
    .shrink {
        padding: 0 0.2rem;
    }
    .little-hospital-title {
        display: block;
        line-height: 40px;
        padding: 0 .2rem;
        font-size: 0.25rem;
        color: #777;
    }
    .border-1px {
        position: relative;
    }
    .little-hospital-title .arrow {
        margin-top: 0;
    }
     .arrow {
        font-size: .4rem;
        float: right;
        margin-top: .5rem;
        color: #B8B8B8;
    }
    .product_item {
        font-size: 0.2rem;
        color: rgb(153, 153, 153);
        display: inline;
    }
</style>