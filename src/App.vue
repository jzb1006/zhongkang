<template>
    <div id="app">
        <keep-alive include="requirement,customized,replyOrder,customizedOrder,materialList">
            <router-view></router-view>
        </keep-alive>
        <div class="fill" style="heght:1rem"></div>
    </div>
</template>

<script>
import foot from "@/components/common/foot.vue";
import { mapState } from "vuex";

export default {
    data() {
        return {
            transitionName: "slide-left"
        };
    },
    components: {
        foot
    },
    computed: {
        ...mapState({
            navbarShow: state => state.commont.navbarShow
        })
    },
    watch: {
        $route(to, from) {
            let routersArr =
                (sessionStorage.getItem("routers") &&
                    sessionStorage.getItem("routers").split(",")) ||
                [];
            if (routersArr.length == 0) {
                routersArr.push(from.path);
                routersArr.push(to.path);
            } else {
                if (routersArr.indexOf(to.path) != -1) {
                    this.transitionName = "slide-right";
                    routersArr.splice(routersArr.indexOf(to.path) + 1, 100);
                } else {
                    this.transitionName = "slide-left";
                    routersArr.push(to.path);
                }
            }
            sessionStorage.setItem("routers", routersArr.join(","));
        }
    }
};
</script>

<style>
#app {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    /* padding-bottom: 1rem; */
}
</style>
<style lang="less">
@import "~vux/src/styles/1px.less";
</style>