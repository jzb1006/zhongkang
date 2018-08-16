<template>
    <div id="album">
        <!-- 头部 -->
        <top title="医生相册"></top>
        <!-- tab -->
        <div id="tab">
            <button-tab v-model="tab">
                <button-tab-item @on-item-click="licence()">
                        职业证书
                </button-tab-item>
                <button-tab-item  @on-item-click="imgList()">
                    相册
               </button-tab-item>
            </button-tab>
        </div>
        <div id="view" style="padding: 0 .2rem;">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import top from "@/components/decorate/top_back_title.vue";
    import {
        ButtonTab,
        ButtonTabItem,
        Divider,
        Previewer, TransferDom
    } from 'vux'
    export default {
        components: {
            top,
            ButtonTab,
            ButtonTabItem,
            Divider,
            Previewer, TransferDom
        },
        data() {
            return {
                doc_id: this.$route.params.doc_id,
                tab: this.$route.params.tab,
            }
        },
        methods:{
            imgList(){
              this.$router.push({name:'DocImgList',params:{doc_id:this.doc_id,tab:1}})
            },
             licence(){
              this.$router.push({name:'DocLicence',params:{doc_id:this.doc_id,tab:0}})
            }
        }
    }
</script>
<style>
    #tab {
        margin: 0.1rem 0;
        padding: 0 0.5rem;
    }
    .vux-button-group>a {
        height: 0.7rem!important;
        font-size: 0.3rem!important;
        line-height: 0.7rem!important;
    }
    .vux-button-group>a.vux-button-tab-item-last {
        border-top-right-radius: 0.1rem!important;
        border-bottom-right-radius: 0.1rem!important;
    }
    .vux-button-group>a.vux-button-tab-item-first {
        border-top-left-radius: 0.1rem!important;
        border-bottom-left-radius: 0.1rem!important;
    }
    .vux-button-group > a.vux-button-tab-item-last:after{
        border-right: 1px solid #444!important;
    border-top: 1px solid #444!important;
    border-bottom: 1px solid #444!important;
    }
    .vux-button-group>a.vux-button-tab-item-first:after {
        border: 1px solid #444!important;
    }
    .vux-button-group>a.vux-button-group-current {
        background:#444!important
    }
</style>