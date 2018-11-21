<!--  -->
<template>
    <div class="business-box">
        <div class="title border-bot">商家相册</div>
        <!-- 医院相册 -->
        <ul class="part imgs border-bot swipe-group">
            <li :key="index" v-for="(item,index) in photos">
                <img :src="imgPrifix()+item['url']">
            </li>
            <li>
                <router-link :to="{name:link_name,query:router_params}" class="chinese">
                    <span>查看更多</span>
                    <span class="english">View More</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'business_box',
        props: {
            photos: {
                type: Array,
                default () {
                    return []
                }
            },
            router_params: {
                type: Object,
                default () {
                    return {}
                }
            },
            link_name:{
                type:String,
                default:''
            }
        },
        data() {
            return {};
        },
        components: {},
        methods: {},
        mounted() {},
    }
</script>
<style scoped>
    .business-box .title {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.36rem;
        color: #333;
        padding: 0 0.30rem;
    }
    .business-box ul.imgs {
        padding: 0.28rem 0 0.28rem 0.30rem;
    }
    .business-box ul.imgs,
    .teacher-box ul.teacher {
        width: 100%;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .business-box ul.imgs li,
    .business-box ul.imgs li img {
        width: 1.92rem;
        height: 1.92rem;
        border-radius: 0.10rem;
    }
    .business-box ul.imgs li:last-child {
        position: relative;
    }
    .business-box ul.imgs li:last-child .chinese {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.92rem;
        height: 1.92rem;
        display: block;
        font-size: 0.24rem;
        color: #333;
        text-align: center;
    }
    .business-box ul.imgs li {
        display: inline-block;
        overflow: hidden;
        margin-right: 0.10rem;
    }
    .business-box ul.imgs li,
    .business-box ul.imgs li img {
        width: 1.92rem;
        height: 1.92rem;
        border-radius: 0.10rem;
    }
    .swipe-item,
    img {
        cursor: pointer;
    }
    .business-box .business-info {
        font-size: 0.30rem;
        color: #777;
        letter-spacing: 0;
        line-height: 0.30rem;
        padding: 0.20rem 0.30rem 0.30rem;
    }
    .business-box ul.imgs li:last-child .chinese span {
        display: block;
        padding-top: 0.70rem;
    }
    .business-box ul.imgs li:last-child .chinese .english {
        padding-top: 0;
        font-size: 0.16rem;
        color: #949494;
    }
    .business-box ul.imgs li:last-child .chinese span {
        display: block;
        padding-top: 0.70rem;
    }
</style>