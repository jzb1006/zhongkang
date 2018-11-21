<template>
    <div id="menuList">
        <div v-if="rows == 'multiple'">
            <ic-slider>
                <ic-slider-item v-for="(page,index) in Math.ceil(menuList.length/list)" :key="index">
                    <div class="multiple_menu">
                        <div class="menu" v-for="(menu,index) in menuList" :key="index" v-if="limitNum(page,index)" @click="sel(menu.container_id)">
                            <router-link :to="{name:menu.container_id}">
                            <span class="icon" :class="menu.icon_url" style="background:#ccc"></span>
                            <p class="name">{{menu.show_name}}</p>
                            </router-link>
                        </div>
                    </div>
                </ic-slider-item>
            </ic-slider>
        </div>
        <div v-else-if="rows == 'single'">
            <div class="single_menu">
                <div class="menu" v-for="(menu,index) in menuList" :key="index" @click="sel">
                    <router-link :to="{name:menu.link}">
                        <span class="icon" :class="menu.icon" :style="{'background':menu.color}"></span>
                        <p class="name">{{menu.name}}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiCommon from "@/api/common";
import { IcSlider, IcSliderItem } from "vue-better-slider";
export default {
    name:"menu_list",
    props: {
        rows: {
            default: "multiple" //single and multiple
        },
        list: {
            default: 20
        },
        menuList: {
            default: function() {
                return [
                    // {
                    //     icon_url: "zk-icon-tukuxiangce",
                    //     show_name: "轮播",
                    //     container_id: "carousel",
                    //     color: "#FF4040"
                    // },
                    // {
                    //     icon_url: "zk-icon-ys",
                    //     show_name: "医生",
                    //     container_id: "doctorList",
                    //     color: "#218868"
                    // },
                    // {
                    //     icon_url: "zk-icon-project-o",
                    //     show_name: "项目",
                    //     container_id: "HProductList",
                    //     color: "#4682B4"
                    // },
                    // {
                    //     icon_url: "zk-icon-yiyuan",
                    //     show_name: "机构",
                    //     container_id: "hospitalList",
                    //     color: "#EE7600"
                    // },
                    // {
                    //     icon_url: "zk-icon-material",
                    //     show_name: "素材",
                    //     container_id: "materialList",
                    //     color: "#4F94CD"
                    // },
                    // {
                    //     icon_url: "zk-icon-nanxingmale100",
                    //     show_name: "评论列表",
                    //     container_id: "commentList",
                    //     color: "#CD8500"
                    // },
                    // {
                    //     icon_url: "zk-icon-nanxingmale100",
                    //     show_name: "打赏",
                    //     container_id: "reward",
                    //     color: "#6B8E23"
                    // },
                    // {
                    //     icon_url: "zk-icon-qianbao",
                    //     show_name: "康复日志",
                    //     container_id: "diaryList",
                    //     color: "#CD8500"
                    // },
                    // {
                    //     icon_url: "zk-icon-jia",
                    //     show_name: "容器",
                    //     container_id: "container",
                    //     color: "#4F94CD"
                    // },
                    // {
                    //     icon_url: "zk-icon-nanxingmale100",
                    //     show_name: "写日记",
                    //     container_id: "diaryBackdropList",
                    //     color: "#6B8E23"
                    // },
                    // {
                    //     icon_url: "zk-icon-nanxingmale100",
                    //     show_name: "素材数字数据",
                    //     container_id: "meta",
                    //     color: "#6B8E23"
                    // },
                    // {
                    //     icon_url: "zk-icon-nanxingmale100",
                    //     show_name: "作者信息",
                    //     container_id: "authorInfo",
                    //     color: "#6B8E23"
                    // },
                    // {
                    //     icon_url: 'zk-icon-nanxingmale100',
                    //     show_name:'评论列表',
                    //     container_id:'commentList',
                    // },
                    // {
                    //     icon_url: 'zk-icon-nanxingmale100',
                    //     show_name:'医导',
                    //     container_id:'hospitalGuide',
                    // }
                ];
            }
        }
    },
    data() {
        return {
            page: 1
        };
    },
    watch: {
        page(val, oldVal) {
            this.page = val;
        }
    },
    components: {
        IcSlider,
        IcSliderItem
    },
    methods: {
        sel(id) {
            this.$router.push({ name: "container", query: { id: id } });
            this.$emit("closeMenu");
        },
        set_page(index) {
            this.page = index + 1;
        },
        limitNum(page, index) {
            if (
                parseInt((page - 1) * this.list) <= parseInt(index) &&
                parseInt(index) < parseInt(page * this.list)
            ) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style>
#menuList .single_menu {
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
}
#menuList .single_menu .menu {
    display: inline-block;
    font-size: 0.3rem;
    text-align: center;
}
#menuList .single_menu .icon {
    display: inline-block;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    padding: 0.3rem;
    border-radius: 1rem;
    color: #fff;
}
#menuList .single_menu .name {
    white-space: nowrap;
    overflow: hidden;
    width: 6em;
    text-overflow: ellipsis;
}
#menuList .multiple_menu {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 2.3rem;
    /* height: 12rem; */
    overflow: hidden;
}
#menuList .multiple_menu .menu {
    text-align: center;
    font-size: 0.3rem;
    /* background-color: brown; */
}
#menuList .multiple_menu .menu .icon {
    display: inline-block;
    font-size: 0.7rem;
    margin-bottom: 0.2rem;
    padding: 0.3rem;
    border-radius: 1rem;
    color: #fff;
}
#menuList .multiple_menu .menu .name {
    white-space: nowrap;
    overflow: hidden;
    width: 6em;
    text-overflow: ellipsis;
}
.ic-slider {
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.ic-slider .ic-slider-item {
    float: left;
    height: 100%;
}
.ic-slider .ic-slider-item img {
    width: 100%;
}
.ic-slider__indicators {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    -webkit-transform: translateZ(1px);
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
}
.ic-slider__indicators .ic-slider__indicator--active {
    width: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: #aaa;
}
.ic-slider__indicators > i {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #ccc;
}
</style>
