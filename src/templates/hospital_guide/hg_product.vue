<template>
    <div id="FProduct">
        <div class="row">
            <div class="img_wrapper" v-for="product in productlist" @click="sel_product(product,product.product_id)" :class="{'f_active':sel_num == product.product_id}">
                <div class="img_container">
                    <div class="img">
                        <img :src="getBasicUrl()+product.product_img">
                    </div>
                    <p class="p_name">{{product.product_name}}</p>
                </div>

                <p class="price">$
                    <span>{{product.min_price}}</span>~$
                    <span>{{product.max_price}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/fang";
import arrive from "@/assets/logo.png";
import Bus from "./../../assets/bus.js";

export default {
    name: "FProduct",
    props: {
        productlist: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            arrive: arrive,
            brand_id: "",
            treat_id: "",
            r_area: "",
            sel_num: null,
            loadinging: true
        };
    },
    watch: {
        productlist(val, oldVal) {
            this.$_ajax_product();
        }
    },
    methods: {
        $_ajax_product: function() {
            var brand_id = this.brand_id;
            var treat_id = this.treat_id;
            var r_area = this.r_area;
            var self = this;
            let check_ids = this.$store.state.fang.check_ids;
            for (let index in check_ids) {
                if (check_ids[index].num == 5) {
                    let id = check_ids[index].id;
                    for (let i in this.productlist) {
                        if (this.productlist[i].product_id == id) {
                            this.$store.dispatch("Is_Sel", true);
                            this.sel_num = id;
                            this.addData(self.treat_id);
                        }
                    }
                }
            }
        },
        getBasicUrl() {
            return api.imgUrl();
        },
        sel_product: function(product, data) {
            this.sel_num = data;

            let arr = {
                num: 5,
                id: this.sel_num
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);

            let arr1 = {
                num: 4,
                id: product.product_id,
                name: product.product_name,
                min_price: product.min_price,
                max_price: product.max_price
            };
            this.$store.dispatch("Price_Data", arr1);

            this.addData(this.treat_id);
        },
        addData: function(id) {
            let arr = {
                page: 5,
                tid: id
            };
            this.$store.dispatch("Content_Data", arr);
        }
    },

    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "5");

        this.$store.dispatch("Content_Jump", "FNursing");

        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "4") {
                this.treat_id = contentData[index].tid;
                this.brand_id = contentData[index].bid;
                this.r_area = contentData[index].r_area;
            }
        }

        Bus.$emit("changeTitle", "选择产品");
    }
};
</script>

<style scoped>
#FProduct {
    margin: 2rem 0;
}
#FProduct .img_wrapper {
    margin: 0.3rem;
    border: 1px solid #72dacf;
}
#FProduct .img_wrapper .img_container {
    /* border: 1px solid #72dacf; */
    border-radius: 0.1rem;
    display: grid;
    grid-template-columns: 1.5rem auto;
    grid-auto-rows: 1.5rem;
    padding: 0.2rem;
}

#FProduct .row .img_wrapper .img {
    width: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
    background: #ddf;
}
#FProduct .row .img_wrapper .img img {
    width: 100%;
    min-height: 100%;
}
#FProduct .row .img_wrapper p.p_name {
    font-size: 0.4rem;
    padding: 0.1rem;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1.2rem;
}
#FProduct .row .img_wrapper p.price {
    border-top: 1px solid #cccc;
    font-size: 0.3rem;
    text-align: right;
    padding: 0.1rem 0.2rem 0.2rem 0;
    overflow: hidden;
}
</style>
