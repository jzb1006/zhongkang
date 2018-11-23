<template>
    <div id="product">
        <!--头部-->
        <top :title="title"></top>
      
        <slide></slide>
        <!--商品名-->
       <price></price>
        <!--医院-->
        <insInfo></insInfo>
        <!--医生-->
       <docInfo></docInfo>
        <!--详情-->
      
       <productContent></productContent>
        <!--底部-->
        
        <addFoot></addFoot>
    </div>
</template>
<script>

    import slide from '@/components/product/slide.vue'
    import price from '@/components/product/price.vue'
    import insInfo from '@/components/product/ins_info.vue'
    import docInfo from '@/components/product/doc_info.vue'
    import productContent from '@/components/product/product_content.vue'
    import addFoot from '@/components/product/add_foot.vue'
    import productItem from "@/components/decorate/product_item.vue";
    import top from "@/components/common/top_bar.vue";
    export default {
        data() {
            return {
                id: this.$route.params.id,
                ins_id: this.$route.params.ins_id,
                result: [],
                slides: [],
                hospital: [],
                doctor_info: [],
                //轮播config
                swiperOption: {
                    pagination: '.swiper-pagination',
                    direction: 'horizontal',
                    autoplay: 3000,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                },
                title: '商品详情',
                surrentTab: 0,
                cid:"",
                keyword:''
            }
        },
        methods: {
            
           
           
        },
        
       
        components: {
            slide,
            price,
            insInfo,
            docInfo,
            productContent,
            addFoot,
            top,
        }
    }
</script>
<style>
 
    
</style>