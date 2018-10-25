<template>
    <div id="preciew">
        <img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" @click="show(index)" :key="index">
        <div v-if="list.length>0">
            <previewer :list="list" @on-close="close" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>
        <div v-else>
            <nosearch v-show="isRequesting" text="😕相册为空哦!"></nosearch>
        </div>
        <LoadMore :state='hasMore' v-if="list.length>0" :isLoading='isBusy' @loadmore="loadAlbum"></LoadMore>
    </div>
</template>
<script>
import { mapState } from "vuex";
import nosearch from "@/components/nosearch/index.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { Previewer, TransferDom } from "vux";
export default {
    components: {
        Previewer,
        TransferDom,
        nosearch,
        LoadMore
    },
    props: {
        list: {
            default: ""
        },
        isRequesting: {
            default: false
        },
        hasMore: {
            default: 0
        },
        isBusy: {
            default: false
        }
    },
    data() {
        return {
            options: {
                getThumbBoundsFn(index) {
                    // find thumbnail element
                    let thumbnail = document.querySelectorAll(
                        ".previewer-demo-img"
                    )[index];
                    // get window scroll Y
                    let pageYScroll =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                    // optionally get horizontal scroll
                    // get position of element relative to viewport
                    let rect = thumbnail.getBoundingClientRect();
                    // w = width
                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                    // Good guide on how to get element coordinates:
                    // http://javascript.info/tutorial/coordinates
                }
            },
        };
    },
    methods: {
        logIndexChange(arg) {
            this.$emit('IndexChange',arg.currentIndex+1);
        },
        show(index) {
            this.$refs.previewer.show(index);
            this.$emit('show');
        },
        loadAlbum() {
            this.bus.$emit("LoadMore");
        },
        close(){
             this.$emit('close');
        }
    },
    computed: {
        ...mapState({
            bus: state => state.search.bus
        })
    }
};
</script>
<style>
#preciew img {
    width: 100%;
}
</style>