<!--  -->
<template>
    <div>
        <div class="main on shrink" style="margin-top: 0.5rem;">
            <tab :line-width="1" custom-bar-width="60px">
                <tab-item selected @on-item-click="onItemClick">详情</tab-item>
                <tab-item @on-item-click="onItemClick">评论</tab-item>
                <!-- <tab-item @on-item-click="onItemClick">日记</tab-item> -->
            </tab>
            <div id="detail" v-html="goods_desc" v-show="surrentTab==0">
                {{goods_desc}}
            </div>
            <div id="comment" v-show="surrentTab==1">
                <p>暂时没有评论哦</p>
            </div>
            <div id="diary" v-show="surrentTab==2">
                <!-- 商家日记 -->
                <section class="diary-box">
                    <div class="title border-bot">商家日记
                        <router-link :to="{name:route_link,query:route_params}" class="fr right">
                            查看更多日记
                            <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
                        </router-link>
                    </div>
                    <diary :cid=cid :number=number umber :query=true></diary>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import diary from '@/components/diary/diary_list'

 import {
        Tab,
        TabItem
    } from 'vux'
    export default {
        props: {
            goods_desc: {
                type: '',
                default: ''
            },
            route_link: {
                type: '',
                default: ''
            },
            cid: {
                type: [Number,String],
                default: -0
            },
            route_params: {
                type: Object,
                default: {
                    cid: 0
                }
            },
            number: {
                type: Number,
                default: -0
            }
        },
        data() {
            return {
                surrentTab: 0,
            };
        },
        components: {
             Tab,
        TabItem,
        diary
        },
        methods: {
             onItemClick(index) {
                this.surrentTab = index;
            },
        },
        mounted() {},
    }
</script>
<style>
    .vux-tab .vux-tab-item {
        font-size: 0.3rem!important;
    }
    .vux-tab-wrap {
        padding: 0.5rem 0!important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #ff5370!important;
    }
    .vux-tab-bar-inner {
        background-color: #ff5370!important;
    }
</style>
<style scoped>

 .shrink {
        padding: 0 0.2rem;
    }
 .main  {
        background: #fff;
        margin-bottom: 0.20rem;
        font-size: 0.36rem;
    }
    .main  .title {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.36rem;
        color: #333;
        padding: 0 0.30rem;
    }
    .main  .title .right {
        display: inline-block;
        float: right;
        font-size: 0.24rem;
        color: #777;
    }
     .fr {
        float: right;
    }
    
</style>