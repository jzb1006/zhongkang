<template>
    <div id="FProduct">
        <div class="row">
            <div class="img_wrapper" v-for="product in productlist" @click="sel_product(product,product.product_id)" :class="{'active':sel_num == product.product_id}">
                    <div class="img">
                        <img :src="getBasicUrl()+product.product_img">
                    </div>
                    <p class="p_name">{{product.product_name}}</p>
                    <p class="price">$<span>{{product.min_price}}</span>~$<span>{{product.max_price}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import arrive from '././../../../assets/logo.png'
import api from './../../../api/fang'
import Bus from './../../../assets/bus.js'
import Loading from './../../Fang/../../widget/loading'

export default {
    name: "FProduct",
    data(){
        return {
            arrive: arrive,
            brand_id: "",
            treat_id: "",
            r_area: "",
            productlist:{},
            sel_num:null,
        }
    },
    methods:{
        $_ajax_product:function(){
            var brand_id = this.brand_id;
            var treat_id = this.treat_id;
            var r_area =  this.r_area;
            var self = this;
            api.ajaxSearch("get_products",{tid:treat_id,bid:brand_id,r_area:r_area}).then(
                res=>{
                    self.productlist = res.data;
                    Loading.stop();
                    let check_ids = this.$store.state.fang.check_ids;
                    for(let index in check_ids){
                        if(check_ids[index].num == 5){
                            let id = check_ids[index].id;
                            for(let i in this.productlist){
                                if(this.productlist[i].product_id == id){
                                    this.$store.dispatch('Is_Sel',true);
                                    this.sel_num = id;
                                    this.addData(self.treat_id);
                                }
                            }
                        }
                    }
                }
            )
        },
        getBasicUrl(){
            return api.imgUrl();
        },
        sel_product:function(product,data){
            this.sel_num = data;

            let arr = {
                num:5,
                id:this.sel_num,
            }
            this.$store.dispatch('Check_Ids',arr);
            this.$store.dispatch('Is_Sel',true);

            let arr1 ={
                num:4,
                id:product.product_id,
                name:product.product_name,
                min_price:product.min_price,
                max_price:product.max_price
            }
            this.$store.dispatch('Price_Data',arr1);

            this.addData(this.treat_id);
        },
        addData:function(id){
            let arr = {
                tid:id,
            }
            this.$store.dispatch('Content_Data',arr);
        }
    },
    components:{
        // FOther
    },
    mounted(){
        Loading.run();
        this.$store.dispatch('Is_Sel',false);
        Bus.$emit('Content_Type','5');
        this.$store.dispatch('Content_Jump','FOther');
        this.brand_id = this.$route.query.bid;
        this.treat_id = this.$route.query.tid;
        this.r_area = this.$route.query.r_area;
        Bus.$emit("changeTitle","选择产品");
        this.$_ajax_product();
    }
}
</script>

<style scoped>
		#FProduct{
            margin: 2rem 0;
		}
		#FProduct .img_wrapper{
			margin: .3rem;
			border:1px solid #72dacf;
		}

		#FProduct .row .img_wrapper .img{
			float: left;
			width: 1.5rem;
			height: 1.5rem;
			margin: .25rem 0rem .25rem .25rem;
            overflow: hidden;
			background: #ddf;
		}
		#FProduct .row .img_wrapper .img img{
			width: 100%;
			min-height: 100%;
		}
		#FProduct .row .img_wrapper p.p_name{
            margin-left: 2rem;
            font-size: .4rem;
            height: 1.8rem;
            padding: .2rem .2rem 0 0;
            line-height: .35rem;
            overflow: hidden;
		}
		#FProduct .row .img_wrapper p.price{
			font-size: .3rem;
			text-align: right;
			padding-bottom: .2rem;
			overflow: hidden;
		}
</style>
