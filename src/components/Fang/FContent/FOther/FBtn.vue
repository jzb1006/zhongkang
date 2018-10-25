<template>
    <div id="FBtn">
        <span v-on:click="changeShow">查看账单</span>
        <transition name="slide-fade">
            <FAcound v-show="fshow"></FAcound>
        </transition>
    </div>
</template>
<script>
import FAcound from "./FAcound";
import Bus from "./../../../../assets/bus.js";
export default {
    name: "acound",
    data() {
        return {
            fshow: false,
            price_data: []
        };
    },
    methods: {
        changeShow: function() {
            this.fshow = !this.fshow;
            this.price_data = this.$store.state.fang.Price_Data;
            Bus.$emit("toAcount", this.price_data);
            Bus.$emit("Content_Type", "9");
        }
    },
    components: {
        FAcound
    },
    mounted() {
        Bus.$on("close", res => {
            this.fshow = res;
        });
    }
};
</script>

<style scoped>
#FBtn {
    position: fixed;
    bottom: 0.5rem;
    right: 0.2rem;
    z-index: 503;
}
#FBtn span {
    display: inline-block;
    margin-bottom: 2rem;
    padding: 0.1rem;
    font-size: 0.25rem;
    border-radius: 0.1rem;
    border: 1px solid rgb(255, 83, 112, 0.7);
}
</style>


