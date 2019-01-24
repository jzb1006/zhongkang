<template>
    <div id="pay_vip_material">
        <slot>
        </slot>
        <pay :params=pay_params></pay>
        <div class="wrapper" v-show="!is_pay">
            <div class="pay_vip_wrapper" v-show="user_type != 0" :style="{'background-image':'url('+cover+')' }">
                <span v-if="user_type == 1" class="pay_money_vip" @click="pay_money">{{price_vip}}元购买</span>
                <span v-else class="pay_money_vip" @click="pay_money">VIP{{price_vip}}可观看</span>
                <p class="login" v-show="is_login()">观看请
                    <span @click="to_login()">登录</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import pay from "@/components/common/pay"
import {mapGetters} from 'vuex';
export default {
    name:'pay_material',
    components:{
        pay
    },
    props:{
        user_type:{
            default:0
        },
        price_vip:{
            default:0
        },
        cover:{
            default:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1174708066,641327423&fm=26&gp=0.jpg'
        },
        is_pay:{
            default:false
        },
        user_id:{
            default:''
        }
    },
    data(){
        return{
            pay_params:{}
        }
    },
    methods:{
        pay_money(){
            if(this.user_type == 1){
                console.log("购买产品");
            }else{
                console.log('VIP充值');
            }

            this.pay_params = {
                show_pay_page:true,
                order_sn:11,
                order_amount:this.price_vip,
                jump_url:window.location.hash,
                subject:"4",
            };
        },
        to_login(){
            this.$router.push({name:'container',query:{id:28}});
        },
        is_login(){
            if(this.user_id){
                return false;
            }else{
                return true;
            }
        },
        hidePay(){

        }
    },
    mounted(){

    }
}
</script>
<style lang="less">
    #pay_vip_material{
        position: relative;
        .wrapper{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .pay_vip_wrapper{
                font-size: .35rem;
                width: 100%;
                height: 100%;
                display: block;
                background-position: center 0;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                background-color: #00000070;
                z-index: 250;
                .pay_money_vip{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    color: #fff;
                    text-align: center; 
                    width: 3rem;
                    margin-top: -.375rem;
                    margin-left: -1.8rem;
                    padding:.2rem .3rem;
                    border: 1px solid #fff;
                    border-radius: .3rem;
                    background-color: rgb(31, 74, 109);                
                }
                .login{
                    position: absolute;
                    top: 75%;
                    left: 50%;
                    font-size: .3rem;
                    color: #fff;
                    margin-top: -.375rem;
                    margin-left: -.85rem;
                    padding: .1rem;
                    border-radius: 0.1rem;
                    background: #abb0ae;
                    span{
                        color: rgb(173, 39, 39);
                        text-decoration-line:underline;
                    }
                }
            }
        }
    }
</style>