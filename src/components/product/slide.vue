<!--  -->
<template>
    <div>
        <swiper :slidOptions="swiperOption" :slides="slides"></swiper>
        <Loading v-show="loadinging"></Loading>
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
                loadinging: true
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
                    if (res.data == '') {
                        alert('你请求的商品不存啊@！')
                        this.$router.back(-1)
                    }
                    self.slides = res.data.gallery;
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