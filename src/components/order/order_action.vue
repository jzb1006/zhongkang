<template>
    <div id="order_action">
          <Divider>订单操作记录</Divider>
        <group> 
            <cell-form-preview :list="orderAction"></cell-form-preview>
        </group>

          <Divider>有图有真相</Divider>
        <div style="text-align: center;">
            <img class="previewer-demo-img" :key="index" v-for="(item, index) in imgList" :src="item.src" width="100" @click="show(index)">
            <div v-transfer-dom>
                <previewer :list="imgList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        CellFormPreview,
        Group,
        Cell,
        Previewer,
        TransferDom,
        Divider 
    } from 'vux'
    export default {
        components: {
            CellFormPreview,
            Group,
            Cell,
            Previewer,
            Divider
        },
        props: {
            orderAction: {
                type: [Object, Array]
            },
            imgList: {
                type: [String,Object, Array]
            }
        },
        directives: {
            TransferDom
        },
        data() {
            return {
                options: {
                    getThumbBoundsFn(index) {

                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]

                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop

                        let rect = thumbnail.getBoundingClientRect()

                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        }

                    }
                }
            }
        },
        methods: {
            logIndexChange(arg) {
                console.log(arg)
            },
            show(index) {
                this.$refs.previewer.show(index)
            }
        },
    }
</script>
<style>
#order_action .vux-divider{
 font-size: 0.3rem!important;
}
</style>