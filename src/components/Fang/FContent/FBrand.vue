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
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import Vue from "vue";
import avatar from "./../../../assets/logo.png";
import api from "./../../../api/fang";
import Bus from "./../../../assets/bus.js";
import Loading from "@/components/decorate/loading.vue";

export default {
    name: "FBrand",
    data() {
        return {
            avatar: avatar,
            imgUrl: "./../../../../static/logo.png",
            treat_id: "",
            r_area: "",
            bid: "",
            brandlist: {},
            checkbrand: null,
            loadinging: true
        };
    },
    methods: {
        $_ajax_brand: function() {
            var self = this;
            var treat_id = this.treat_id;
            var r_area = this.r_area;
            api
                .ajaxSearch("get_brands", { tid: treat_id, r_area: r_area })
                .then(res => {
                    self.brandlist = res.data;
                    self.loadinging = false;
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
                })
                .catch(error => {
                    self.loadinging = false;
                });
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
                tid: this.treat_id,
                r_area: this.r_area,
                bid: id
            };
            this.$store.dispatch("Content_Data", arr);
        }
    },
    components: {
        Loading
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "4");
        this.$store.dispatch("Content_Jump", "FProduct");
        this.treat_id = this.$route.query.tid;
        this.r_area = this.$route.query.r_area;
        Bus.$emit("changeTitle", "选择品牌");
        this.$_ajax_brand();
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
    /* margin: 0.25rem 0rem 0.25rem 0.25rem; */
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
