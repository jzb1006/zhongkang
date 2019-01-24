<template>
    <!--头部返回-->
    <div id="title_back">
        <div class="navbar">
            <span class="title">{{params.title}}</span>
            <span v-if="scene_name!=='' && scene_id!==''||scene_type!==''" class="zk-icon-gengduo1 right" @click="more()"></span>
            <span class="zk-icon-fanhui fanhui"  @click="back()"></span>
            <Actionsheet  v-model="is_show" :menus="menus" @on-click-menu-complain="complain(scene_name,scene_id,scene_type)">
            </Actionsheet>
        </div>
    </div>
</template>
<script>
    import {
        Actionsheet
    } from 'vux'
    export default {
        data() {
            return {
                is_show: false,
                menus: {
                    complain: '投诉'
                },
                scene_name:this.$route.query.scene_name || '',
                scene_id:this.$route.query.scene_id ||'',
                scene_type:this.$route.query.scene_type ||'',
            }
        },
        components: {
            Actionsheet
        },
        props: {
            params: {
                type: Object,
                default () {
                    return {}
                }
            },
        },
        methods: {
            back() {
                this.$router.back(-1);
            },
            more() {
                this.is_show = true
            },
            complain(scene_name,scene_id,scene_type){
                // console.log("投诉")
                this.$router.push({path:'/complaint',query:{scene_name:scene_name,scene_id:scene_id,scene_type}})
            }
        }
    }
</script>
<style scoped>
    .navbar {
        height: 1rem;
        line-height: 1rem;
        position: relative;
        text-align: center;
        background: #ff5370;
        letter-spacing: 0.028rem;
        font-size: 15px;
    }
    .navbar .title {
        font-size: 0.3rem;
        color: #fff;
    }
    .navbar .fanhui {
        color: #fff;
        padding: 0.111rem;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: 500;
        font-size: 0.4rem;
    }
    .right {
        color: #fff;
        padding: 0.111rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        z-index: 500;
        font-size: 0.4rem;
    }
</style>