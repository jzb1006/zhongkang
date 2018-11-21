<!--  -->
<template>
    <div>
        <div class="hospital shrink">
            <router-link :to="{name:route_link,query:route_params}">
                <div class="hospital_icon">
                    <defaultImg :imgPath="img_url"></defaultImg>
                </div>
                <div class="hospital_text">
                    <p>
                        <span>{{ins_name}}</span>
                        <img src="//mstatic.soyoung.com/m/static/img/product/yimei.png" alt="">
                    </p>
                    <p>资质：{{institution_type==1?'公立':'民营'}}</p>
                    <p>地址：{{address}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
 import defaultImg from "@/components/decorate/default_img.vue";
    export default {
        props: {
            route_link: {
                type: String,
                default: ''
            },
            route_params: {
                type: Object,
                default () {
                    return {ins_id:0}
                }
            },
            img_url: {
                type: String,
                default: ''
            },
            ins_name: {
                type: String,
                default: ''
            },
            institution_type: {
                type: [Number,String],
                default: -0
            },
            address: {
                type: String,
                default: ''
            },
        },
        data() {
            return {};
        },
        components: {
            defaultImg
        },
        methods: {},
        mounted() {},
    }
</script>
<style scoped>
    .hospital {
        height: 2rem;
        padding-top: 0.5rem;
    }
    .hospital_icon {
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
        float: left;
        margin-right: .2rem;
    }
    .hospital_text {
        width: 5rem;
        float: left;
    }
    .hospital_text p {
        font-size: .25rem;
        color: #949494;
        line-height: 200%;
    }
    .hospital_text span {
        display: inline-block;
        width: 5rem;
        color: #333;
        font-size: 0.3rem;
    }
    .hospital_text img {
        float: right;
        width: 1rem;
    }
</style>