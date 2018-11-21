<template>
    <div id="FBrand">
        <div class="row">
            <div class="img_wrapper" v-for="(brand,$index) in brandlist" @click="selectStyle(brand,brand.brand_id)" :class="{'f_active':checkbrand == brand.brand_id}">
                <div class="img">
                    <img v-bind:src='getImgUrl()+brand.brand_img'>
                </div>
                <p class="brand_name">{{ brand.brand_name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import avatar from "@/assets/logo.png";
import api from "@/api/fang";
import Bus from "@/assets/bus.js";
export default {
    name: "FBrand",
    props: {
        brandlist: {
            default: function() {}
        }
    },
    data() {
        return {
            avatar: avatar,
            imgUrl: "./../../../../static/logo.png",
            treat_id: "",
            r_area: "",
            bid: "",
            checkbrand: null,
            loadinging: true
        };
    },
    watch: {
        brandlist(val, oldVal) {
            this.$_ajax_brand();
        }
    },
    methods: {
        $_ajax_brand: function() {
            var self = this;
            var treat_id = this.treat_id;
            var r_area = this.r_area;
            let check_ids = this.$store.state.fang.check_ids;
            for (let index in check_ids) {
                if (check_ids[index].num == 4) {
                    let id = check_ids[index].id;
                    for (let i in this.brandlist) {
                        if (this.brandlist[i].brand_id == id) {
                            this.$store.dispatch("Is_Sel", true);
                            this.checkbrand = id;
                            this.addData(id);
                        }
                    }
                }
            }
        },
        getImgUrl() {
            return api.imgUrl();
        },
        selectStyle: function(brand, index) {
            this.checkbrand = index;
            this.bid = index;
            let arr = {
                num: 4,
                id: this.bid
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);

            this.addData(index);
        },
        addData: function(id) {
            let arr = {
                page: 4,
                tid: this.treat_id,
                r_area: this.r_area,
                bid: id
            };
            this.$store.dispatch("Content_Data", arr);
        }
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "4");
        this.$store.dispatch("Content_Jump", "FProduct");

        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "3") {
                this.treat_id = contentData[index].tid;
                this.r_area = contentData[index].r_area;
            }
        }
        Bus.$emit("changeTitle", "选择品牌");
    }
};
</script>

<style scoped>
#FBrand {
    margin: 2rem 0;
}
#FBrand .row .img_wrapper {
    margin: 0.3rem;
    border: 1px solid #72dacf;
    border-radius: 0.1rem;
    display: grid;
    grid-template-columns: 1.5rem auto;
    padding: 0.2rem;
}
#FBrand .row .img_wrapper .img {
    width: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
    background: #ddf;
}
#FBrand .row .img_wrapper .img img {
    width: 100%;
    min-height: 100%;
}
#FBrand .row .img_wrapper p.brand_name {
    font-size: 0.4rem;
    padding: 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1.2rem;
}
</style>
