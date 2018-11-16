<!--  -->
<template>
    <div>
        <div class="doctor_box">
            <div class="title">医师团队
                <router-link :to="{name:'docList',params:{ins_id:ins_id}}" class="fr right">
                    共{{doc_count}}个医师
                    <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
                </router-link>
            </div>
            <ul class="box-ls teacher ">
                <!-- 美容师不进入医师主页 -->
                <li class="part" :key="index" v-for="(item,index) in doc_team_list">
                    <router-link :to="{name:'doctorDetail',params:{doc_id:item['id'],ins_id:ins_id}}" class="img-box">
                        <defaultImg :imgPath="item['avatar']"></defaultImg>
                        <div class="right">
                            <span class="tit">
                                       {{item['name']}}
                                    </span>
                            <span>
                                        医师
                                    </span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import defaultImg from "@/components/decorate/default_img.vue";
    export default {
        name: 'doctor_box',
        props: {
            doc_count: {
                type: Number,
                default: 0
            },
            doc_team_list: {
                type: Array,
                default () {
                    return []
                }
            },
            ins_id: {
                type: Number,
                default: 0
            }
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
    .doctor_box .title {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.36rem;
        color: #333;
        padding: 0 0.30rem;
    }
    /* .doctor_box ul{
        float: left;
    } */
    .doctor_box ul.teacher {
        -webkit-overflow-scrolling: touch;
        padding: 0.70rem 0.30rem 0.30rem 0;
    }
    .doctor_box ul.teacher li {
        display: inline-block;
        width: 2.50rem;
        height: 1.40rem;
        background: #f3f7f7;
        border-radius: 0.10rem;
        position: relative;
        padding-top: 1.00rem;
        vertical-align: top;
    }
    .doctor_box ul.teacher li .img-box {
        width: 1.20rem;
        height: 1.20rem;
        position: absolute;
        top: -0.50rem;
        left: 50%;
        margin-left: -0.60rem;
        display: block;
    }
    .doctor_box ul.teacher li .tit {
        text-align: center;
        font-size: 0.30rem;
        color: #333;
        line-height: 0.32rem;
    }
    .doctor_box ul.teacher li span {
        display: block;
        font-size: 0.24rem;
        color: #333;
        text-align: center;
        line-height: 0.52rem;
    }
    .doctor_box ul.teacher li span {
        display: block;
        font-size: 0.24rem;
        color: #333;
        text-align: center;
        line-height: 0.52rem;
    }
    .doctor_box ul.teacher {
        width: 100%;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .doctor_box ul.teacher {
        width: 100%;
        white-space: nowrap;
        box-sizing: border-box;
    }
    .doctor_box .fr {
        float: right;
    }
</style>