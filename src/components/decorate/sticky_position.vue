<template>
    <div :style="{height:height}">
        <div id="sticky" :class="{fixed:fixed_status}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            default: 0
        }
    },
    data() {
        return {
            fixed_status: false
        };
    },
    methods: {
        handleScroll() {
            if (document.getElementById("sticky")) {
                var self = this;
                var navH = document.getElementById("sticky").offsetTop;
                var scroH =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                if (scroH > navH) {
                    self.fixed_status = true;
                } else {
                    self.fixed_status = false;
                }
            }
        }
    },
    mounted() {
        var self = this;
        document.onscroll = function() {
            self.handleScroll();
        };
    }
};
</script>

<style scoped>
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 500;
}
</style>
