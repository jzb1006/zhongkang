<template>
    <div id="carousel">
        <ic-slider v-if="images.length" :autoplay="autoplay">
            <ic-slider-item v-for="(items,index) in images" :key="index">
                <a :href="items.link">
                    <img :src="items.picUrl" />
                </a>
            </ic-slider-item>
        </ic-slider>
    </div>
</template>

<script>
import { IcSlider, IcSliderItem } from "vue-better-slider";
export default {
    name: "carousel",
    props: {
        carouselItems: {
            default: function() {
                return [];
            }
        },
        autoplay: {
            default: 5000
        }
    },
    data() {
        return {
            images: this.getImageList()
        };
    },
    components: {
        IcSlider,
        IcSliderItem
    },
    methods: {
        getImageList() {
            if (this.carouselItems) {
                return this.carouselItems;
            }
        }
    }
};
</script>

<style>
#carousel {
    width: auto;
    height: auto;
    position: static !important;
}
.ic-slider {
    overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.ic-slider .ic-slider-item {
    float: left;
    height: 100%;
}
.ic-slider .ic-slider-item img {
    width: 100%;
    max-height: 3.5rem;
}
.ic-slider__indicators {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    -webkit-transform: translateZ(1px);
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;
}
.ic-slider__indicators .ic-slider__indicator--active {
    width: 20px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    background: #fff;
}
.ic-slider__indicators > i {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #ccc;
}
</style>
