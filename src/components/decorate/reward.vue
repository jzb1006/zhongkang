<template>
    <div id="reward">
        <!-- 打赏的按钮 -->
        <div class="pay_btn" @click="pay_btn" v-show="paytype == 'pay_btn'">
            <span>
                赏
            </span>
        </div>
        <div class="sel_money_wrapper" v-show="payalert">
            <div class="sel_money">
                <p class="close clearfix">
                    <span class="zk-icon-hebingxingzhuang" @click="pay_close"></span>
                </p>
                <p class="title">给作者送糖
                    <span class="zk-icon-tangguo"></span>
                </p>
                <div class="prices clearfix">
                    <div class="price" v-for="(price1,index) in prices" @click="sel_price(price1)" :class="{active:price1 == price}">
                        <span class="zk-icon-moneycredit" :class="{active_icon:price1 == price}"></span>
                        {{price1}}
                    </div>
                    <div class="price" @click="sel_price(0)">
                        <div class="input">
                            <span class="zk-icon-moneycredit" :class="{active_icon:custom_price}"></span>
                            <input v-model="custom_price" type="number" placeholder="自定义">
                        </div>
                    </div>
                </div>
                <p class="pay_price">
                    <span class="zk-icon-moneycredit"></span> {{price}}</p>
                <button @click="pay_loading">确定</button>
            </div>
        </div>

        <!-- 付费视频 -->
        <div class="media_wrapper" v-show="paytype == 'pay_player'">
            <span class="player_viptips" @click="pay_loading">{{price}}元购买</span>
            <p class="login">已购买请
                <span>登录</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        getprice: {
            default: "2"
        },
        paytype: {
            default: "pay_btn" //pay_player and  pay_btn
        }
    },
    data() {
        return {
            price: this.getprice,
            prices: ["2", "4", "6", "8", "10"],
            custom_price: "",
            payalert: false
        };
    },
    watch: {
        custom_price(val, oldval) {
            if (val) {
                this.price = val;
            }
        }
    },
    methods: {
        sel_price(index) {
            this.price = index;
            if (index != 0) {
                this.custom_price = "";
            }
        },
        pay_btn() {
            this.payalert = true;
        },
        pay_close() {
            this.payalert = false;
        },
        pay_loading() {
            alert("购买中。。。。。。");
        }
    }
};
</script>

<style scoped>
#reward {
    width: auto;
    height: auto;
    display: -webkit-box;
    position: relative;
}
#reward .sel_money_wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000080;
    z-index: 600;
}
#reward .sel_money_wrapper .sel_money {
    font-size: 0.35rem;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 6rem;
    height: 5rem;
    margin-left: -3rem;
    margin-top: -2.5rem;
    padding: 0.3rem 0;
    border-radius: 0.2rem;
    background-color: #fff;
    z-index: 1;
}
#reward .sel_money_wrapper .sel_money .close span {
    float: right;
    font-size: 0.5rem;
    color: #aaa;
    margin-right: 0.2rem;
}
#reward .sel_money_wrapper .sel_money .title {
    font-size: 0.35rem;
    margin: 0.3rem;
}
#reward .sel_money_wrapper .sel_money .title span {
    font-size: 0.4rem;
}
#reward .sel_money_wrapper .sel_money .pay_price {
    position: absolute;
    bottom: 0.1rem;
    font-size: 0.5rem;
    font-weight: 550;
    color: #ff7000;
    margin: 0.1rem 0.2rem;
}
#reward .sel_money_wrapper .sel_money .pay_price span {
    font-size: 0.5rem;
}
#reward .sel_money_wrapper .sel_money .prices {
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    -ms-flex-wrap: wrap;
    width: 97%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.2rem;
    color: #aaa;
}
#reward .sel_money_wrapper .sel_money .prices .price {
    padding: 0.2rem 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}
#reward .sel_money_wrapper .sel_money .prices .price span {
    color: #aaa;
}
#reward .sel_money_wrapper .sel_money .prices .price .input input {
    float: right;
    width: 80%;
    font-size: 0.35rem;
    color: #ff7000;
}
#reward .sel_money_wrapper .sel_money button {
    position: absolute;
    right: 0.1rem;
    bottom: 0.1rem;
    border: 0px;
    font-size: 0.3rem;
    padding: 0.1rem 0.3rem;
    border-radius: 0.5rem;
    background-color: #ff7000;
    color: #fff;
}
#reward .pay_btn {
    width: 100%;
    text-align: center;
    font-size: 0.3rem;
    /* padding: .2rem .4rem; */
    /* background-color: #ff7000; */
    /* border-radius:1rem; */
}
#reward .pay_btn span {
    display: inline-block;
    margin-bottom: 0.2rem;
    padding: 0.2rem 0.4rem;
    background-color: #ff7000;
    color: #fff;
    border-radius: 1rem;
}
#reward .media_wrapper {
    text-align: center;
    position: relative;
    width: 100%;
    min-height: 3rem;
    background: #00000050;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

#reward .media_wrapper p.login {
    position: absolute;
    top: 65%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.25rem;
    line-height: 0.45rem;
    color: #fff;
}
#reward .media_wrapper p.login span {
    font-size: 0.25rem;
    text-decoration: underline;
    color: #ff7000;
    margin: 0 0.1rem;
}

#reward .media_wrapper span.player_viptips {
    position: absolute;
    left: 0.3rem;
    right: 0.3rem;
    top: 50%;
    font-size: 0.25rem;
    width: 2rem;
    margin: 0 auto;
    margin-top: -0.5rem;
    padding: 0.3rem;
    color: #fff;
    border-radius: 0.5rem;
    background: #db4633;
    cursor: pointer;
}
#reward .sel_money_wrapper .sel_money .prices .active {
    color: #ff7000;
    border: 1px solid #ff7000;
}
.active_icon {
    color: #ff7000;
}
#reward .sel_money_wrapper .sel_money .prices .price .active_icon {
    color: #ff7000;
}
</style>
