<template>
    <div id="product">
        <swiper :options="slidOptions" class="swiper-box">
            <swiper-slide v-for="(item, index) in slides" :key="index" class="swiper-item">
                <img :src="item['goods_img']" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    import Loading from '@/widget/loading'
    import api from "../../api/search"
    /* 轮播图 */
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css'
    export default {
        data() {
            return {
               
            }
        },
        components: {
            swiper,
            'swiper-slide': swiperSlide
        },
        props: {
            slidOptions: {
                type: Object,
                request: true,
            },
            slides: {
                type: [Object, Array],
                request: true
            }
        }
    }
</script>
<style>
.swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
.swiper-item {
	height: 5rem;
}
.swiper-item img{
	width:100%;
    height:100%;
}
.swiper-pagination-bullet {
    width: 0.1rem;
    height: 0.1rem;
    display: inline-block;
    border-radius: 100%;
    background: #000;
    opacity: 0.2;
}

.swiper-pagination-bullet-active {
    opacity: 1;
    
    background: #ff5370;
}

</style>