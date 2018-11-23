<template>
    <div id="foot">
        <tabbar>
            <tabbar-item v-for="(menu,index) in menu_footer" :key="index" selected @on-item-click="open($event,menu)" :link="{name:'container',query:{'name':menu.url}}">
                <span slot="icon" class="icon" :class="menu.icon"></span>
                <span slot="label">{{menu.name}}</span>
            </tabbar-item>
        </tabbar>
        <div v-if="menu_show" class="menu">
            <div class="menulist">
                <menuList @closeMenu=close></menuList>
            </div>
            <p class="close" @click="close()">
                <span class="zk-icon-guanbi1"></span>
            </p>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";
import menuList from "@/components/decorate/menu_list";
import common from "../../widget/lib/user";
export default {
    name: "foot",
    data() {
        return {
            menu_show: false,
            menu_footer: [
                {
                    id: "1",
                    name: "首页",
                    icon: "zk-icon-shouye",
                    url: "home_page"
                },
                {
                    id: "2",
                    name: "more",
                    icon: "zk-icon-gengduo",
                    url: ""
                },
                {
                    id: "3",
                    name: "个人中心",
                    icon: "zk-icon-iconfonticon5",
                    url: "person_container"
                }
            ]
        };
    },
    components: {
        Tabbar,
        TabbarItem,
        menuList
    },
    methods: {
        close() {
            this.menu_show = false;
        },
        open(index,menu) {
            if (index == 1) {
                this.menu_show = true;
            }
        }
    }
};
</script>
<style>
#foot {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 500;
}
#foot .fill {
    width: 100%;
    height: 1rem;
}
#foot > .menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 501;
}
#foot > .menu .menulist {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1rem;
}
#foot .menu p.close {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    /* background-color: #cccc; */
    border-top: 1px solid #ccc;
    z-index: 502;
    /* font-size: 1.4rem; */
    display: flex;
    justify-content: center;
    align-items: center;
}

#foot .menu p.close span {
    font-size: 0.4rem;
    padding: 0.2rem;
}
.weui-tabbar__icon {
    width: 0.5rem !important;
    height: 0.5rem !important;
}
#foot .icon {
    font-size: 0.5rem;
}
.weui-tabbar__label {
    font-size: 0.3rem !important;
    line-height: 1.8 !important;
}
.weui-bar__item_on {
    color: red !important;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: #ff5370 !important;
}
.menu .weui-tabbar__icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    width: 0.9rem !important;
    height: 0.9rem !important;
}
.menu .weui-tabbar__icon .icon {
    /* font-size: 0.6rem !important; */
    padding: 0.1rem 0.1rem 0.08rem 0.1rem;
    border: 1px solid #ff5370;
    border-radius: 0.2rem;
}
</style>