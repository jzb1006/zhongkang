<template>
    <div id="panel_order">
        <div style="padding:0.2rem 0.3rem">
            <div class="status vux-1px-b" v-show="datePanelShow">
                <div class="l">{{date|date}}</div>
                <div class="r">{{status}}</div>
            </div>
            <div class="body" :class="{'vux-1px-b':borderShow}">
                <div class="panel_img">
                    <img :src="img_path()+path" alt="">
                </div>
                <div class="info">
                    <div class="desc">
                        <div class="title">
                            <p>{{title}}</p>
                        </div>
                        <div class="price">
                            <p>￥{{price}}</p>
                            <p>x1</p>
                        </div>
                    </div>
                    <div class="total_price" v-show="totalPricePanelShow">
                        <span>共{{goodsNumber}}件商品</span>
                        <span>总金额 <i>￥{{totalPrice}}</i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from "../../api/order";
    export default {
        props: {
            date: {
                type: String,
                default: ''
            },
            status:{
                type:String,
                default:''
            },
            path:{
                type:String,
                default:''
            },
            title:{
                type:String,
                default:''
            },
            price:{
                 type:String,
                 default:'100'
            },
            goodsNumber:{
                type:String,
                 default:'100'
            },
            totalPrice:{
                type:String,
                 default:'100' 
            },
            datePanelShow:{
                type:Boolean,
                default:true
            },
            totalPricePanelShow:{
                 type:Boolean,
                default:true
            },
            borderShow:{
                 type:Boolean,
                default:true
            }
        },
        filters: {
            date(value) {
                if (!value) return '';
                var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y + M + D + h + m + s;
            }
        },
        methods:{
            img_path() {
                return api.imgUrl();
            },
        }
    }
</script>
<style>
#panel_order{
    background: #fff;
    margin-top: 0.1rem;
}
    .status .l,
    .r,
    .body .panel_img,
    .body .info,
    .body .info .title,
    .body .info .price,
    .body .info .total_price {
        display: inline;
    }
    .status {
        height: 0.5rem;
    }
    .status .l,
    .r {
        font-size: 0.25rem;
        font-weight: 100;
        color: rgb(153, 153, 153);
    }
    .status .l,
    .body .panel_img,
    .body .info .title {
        float: left;
    }
    .status .r,
    .body .info .price,
    .body .info .total_price {
        float: right;
    }
    .status .r {
        color: #ff5370;
    }
    .body {
        height: 1.45rem;
        padding: 0.3rem 0.3rem;
    }
    .body .panel_img {
        height: 1rem;
        width: 1rem;
        margin-right: 0.3rem;
    }
    .body .panel_img img {
        width: 100%;
        height: 100%;
    }
    .body .info {}
    .body .info .desc {
        height: 1rem;
    }
    .body .info .title {
        font-size: 0.3rem;
        font-weight: 100;
    }
    .body .info .price {
        font-size: 0.2rem;
        text-align: right;
    }
    .body .info .price p {
        line-height: 0.4rem;
        color: rgb(153, 153, 153);
    }
    .body .info .total_price {
        font-size: 0.3rem;
        font-weight: 100;
    }
    .body .info .total_price span i {
        color: rgb(255, 83, 112);
    }
    .border {
        border-bottom: 1px solid #999;
        box-shadow: 0 1px 1px #fff;
    }
</style>