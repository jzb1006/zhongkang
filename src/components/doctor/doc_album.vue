<template>
    <div id="album">
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
      <div id="imgList" style="padding: 0 .2rem;" v-if="tab==1">
           <imgList></imgList>
        </div>
         <div id="licence" style="padding: 0 .2rem;" v-if="tab==0">
            <licence></licence>
        </div>
    </div>
</template>
<script>
    import imgList from '@/components/doctor/img_list.vue'
    import licence from '@/components/doctor/licence.vue'
    import {
        ButtonTab,
        ButtonTabItem,
    } from 'vux'
    export default {
        components: {
            ButtonTab,
            ButtonTabItem,
            imgList,
            licence

        },
        data() {
            return {
                doc_id: this.$route.query.doc_id,
                tab: parseInt(this.$route.query.tab),
            }
        },
         methods:{
            imgList(){
                this.tab==1
            //   this.$router.push({name:'InsImgList',params:{ins_id:this.ins_id,'tab':0}})
            },
             licence(){
                 this.tab==0
  
            //   this.$router.push({name:'InsLicence',params:{ins_id:this.ins_id,'tab':1}})
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