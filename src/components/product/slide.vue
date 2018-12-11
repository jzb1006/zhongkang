<!--  -->
<template>
    <div>
        <swiper :slidOptions="swiperOption" :slides="slides"></swiper>
        <Loading v-show="loadinging"></Loading>
         <Alert :Show="isShow" :alerttType="'warn'" :alertText="alertText"></Alert>
    </div>
</template>

<script>
    import swiper from '@/components/slide/index.vue'
    import api from "../../api/search"
    import Loading from "@/components/decorate/loading.vue";
    export default {
        data() {
            return {
                id: this.$route.query.goods_id,
                ins_id: this.$route.query.ins_id,
                slides: [],
                //轮播config
                swiperOption: {
                    pagination: '.swiper-pagination',
                    direction: 'horizontal',
                    autoplay: 3000,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                },
                loadinging: true,
                 alertText: '',
                isShow:false
            }
        },
        components: {
            swiper,
            Loading
        },
        methods: {
            $_ajax_product_detail() {
                var self = this;
                api.ajaxProduct({
                    id: this.id,
                    ins_id: this.ins_id
                }).then(res => {
                     var errorCode = res.data.error_code;
                    var msg = res.data.msg;
                    if(errorCode==1){
                       self.isShow=true;
                       self.alertText = msg;
                       self.$router.back(-1);
                       return;
                    }
                    if (res.data.data == '') {
                        self.isShow=true;
                        self.alertText = '你请求的商品不存';
                        this.$router.back(-1)
                         return;
                    }
                    if(res.data.data.gallery!=''){
                        self.slides = res.data.data.gallery;
                    }
                     self.loadinging=false
                }).catch(error => {
                     self.loadinging=false
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$_ajax_product_detail();
        },
    }
</script>
<style scoped>

</style>