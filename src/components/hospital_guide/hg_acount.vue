<template>
    <div id="FAcount" v-show="acount" @click="close()">
        <div class="acount_wrapper">
            <button type="button" class="close" aria-label="Close" @click="close()">
                <i class="zk-icon-guanbi"></i>
            </button>
            <p class="title">
                <span>模拟账单</span>
            </p>
            <ul class="list_acount">
                <li class="li_acount" v-for="(acount1,index) in aountlist" :key="index">
                    <p class="name">{{acount1.name}}</p>
                    <p class="price">￥
                        <span>{{acount1.min_price}}</span>~￥
                        <span>{{acount1.max_price}}</span>
                    </p>
                </li>
            </ul>
            <div class="bottom">
                <p class="total_title">总费用：</p>

                <p class="total_price text-danger">￥
                    <span>{{totalMinAcount}}</span>~￥
                    <span>{{totalMaxAcount}}</span>
                </p>
            </div>
            <p class="tip">(*当前价格仅供参考，实际价格以各医院为准！)</p>
        </div>
    </div>
</template>

<script>
import Bus from "./../../assets/bus.js";
export default {
    name: "ffooter",
    data() {
        return {
            acount: false,
            aountlist: [],
            totalMinAcount: 0,
            totalMaxAcount: 0
        };
    },
    methods: {
        close() {
            Bus.$emit("close", false);
            Bus.$emit("Content_Type", 8);
        }
    },
    mounted() {
        Bus.$on("toAcount", res => {
            this.aountlist = res;

            for (let index in res) {
                this.totalMinAcount += parseInt(res[index].min_price);
                this.totalMaxAcount += parseInt(res[index].max_price);
            }
        });
    }
};
</script>
<style scoped>
#FAcount {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #060404d9;
    z-index: 500;
}
#FAcount .acount_wrapper {
    position: fixed;
    left: 0.1rem;
    right: 0.1rem;
    top: 50%;
    height: 10rem;
    margin-top: -5rem;
    font-size: 0.35rem;
    background-color: #fffdd5;
    padding: 0.2rem;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    z-index: 501;
}
#FAcount button {
    float: right;
    border-radius: 0.1rem;
    background: transparent;
    border: 1px solid #000;
}
#FAcount p.title {
    text-align: center;
    font-size: 0.35rem;
    margin-bottom: 0.3rem;
}
#FAcount .list_acount {
    height: 7rem;
    overflow-x: hidden;
}
#FAcount .list_acount .li_acount {
    margin-bottom: 0.3rem;
    padding: 0.2rem;
    border-radius: 0.1rem;
    border: 1px solid #000;
    background-color: #fff;
}
#FAcount .list_acount .li_acount p.name {
    font-size: 0.35rem;
}
#FAcount .list_acount .li_acount p.price {
    font-size: 0.3rem;
    text-align: right;
}
#FAcount .bottom {
    padding: 0.2rem 0;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
}
#FAcount .bottom .total_title {
    font-size: 0.35rem;
}
#FAcount .bottom .total_price {
    font-size: 0.3rem;
    text-align: right;
}
#FAcount .tip {
    margin-top: 0.2rem;
    color: red;
    font-size: 0.3rem;
    line-height: 0.4rem;
}
</style>




