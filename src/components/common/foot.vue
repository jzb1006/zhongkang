<template>
       
        <div id="foot">
            <tabbar>
                <tabbar-item selected link="/HProductList">
                    <span slot="icon" class="zk-icon-shouye icon"></span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item link='/hospitalList'>
                    <span slot="icon" class="zk-icon-organization icon"></span>
                    <span slot="label">机构</span>
                </tabbar-item>
                <tabbar-item link='/doctorList'>
                    <span slot="icon" class="zk-icon-nanxingmale100 icon"></span>
                    <span slot="label">医生</span>
                </tabbar-item>
                <tabbar-item link="/HProductList">
                    <span slot="icon" class="zk-icon-project-o icon"></span>
                    <span slot="label">项目</span>
                </tabbar-item>
                <tabbar-item @click.native="toUser">
                    <span slot="icon" class="zk-icon-iconfonticon5 icon"></span>
                    <span slot="label">个人中心</span>
                </tabbar-item>
            </tabbar>
        </div>
</template>
<script>
    import {
        Tabbar,
        TabbarItem
    } from 'vux'
    import common from '../../widget/lib/user'
    export default {
        methods:{
            toUser(){
                common.checkLogin(this,'/home/user');
            }
        },
        components: {
            Tabbar,
            TabbarItem,
        }
    }
</script>
<style>
    #foot {
        position: fixed;
        width: 100%;
        bottom: 0;
    }
    .weui-tabbar__icon {
        width: 0.5rem!important;
        height: 0.5rem!important;
    }
    #foot .icon {
        font-size: 0.5rem;
    }
    .weui-tabbar__label {
        font-size: 0.3rem!important;
        line-height: 1.8!important;
    }
    .weui-bar__item_on {
        color: red!important;
    }
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon>i,
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
        color: #ff5370!important;
    }
</style>