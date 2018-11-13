<template>
    <div id="requirement_content">
        <!-- <backdropInfo v-show="backdrop_show" @changeShowBackdrop=changeShowBackdrop ref="backdrop" :showbackdrop1=show_backdrop1 :info=info></backdropInfo> -->
        <!-- <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert> -->
        <div class="content vux-1px">
            <div class="item vux-1px-b" @click="show_items">
                <div class="span">请选择项目:</div>
                <span class="select">
                    <i v-for="item in chooseItem" :key="item.id" class="category vux-1px-l">{{item.name}}</i>
                </span>
                <span class="badge_r"><i class="zk-icon-fanhui1"></i></span>
            </div>
            <div class="item vux-1px-b">
                <div class="span">姓氏:</div>
                <div class="include vux-1px"><input type="text" class="input" v-model="lastname" @input="getName(lastname)"></div>
            </div>
            <div class="item vux-1px-b">
                <div class="span">年龄:</div>
                <div class="include vux-1px"><input type="text" class="input" v-model="age" @input="getAge(age)"></div>
            </div>
            <div class="item vux-1px-b">
                <div class="span">顾问级别:</div>
                <!-- <select class="select vux-1px" v-model="level" @change="getLevel(level)">
                    <option value="41">初级顾问</option>
                    <option value="42">中级顾问</option>
                    <option value="43">高级顾问</option>
                </select> -->
                <select-adviser-level :params="params" class="select_adviser"></select-adviser-level>
            </div>
            <div class="item">
                <div class="span">预算区间:</div>
                <price-range class="price" @getMin="getMin" @getMax="getMax"></price-range>
            </div>
        </div>
        <popup v-model="show_item" position="bottom" max-height="50%">
            <diarySelItem ref="items" :itemList1=chooseItem></diarySelItem>
        </popup>
    </div>
</template>

<script>
import api from "@/api/diary";
import Bus from "@/assets/bus.js";
import { Group, Calendar, Popup } from "vux";
import diarySelItem from "@/components/common/diary_sel_item";
// import Alert from "@/components/decorate/alert.vue";
import { mapGetters } from "vuex";
import priceRange from '@/components/common/price_range.vue'
import selectAdviserLevel from '@/components/customized/selectAdviserLevel'

export default {
    data() {
        return {
            lastname:'',
            age:'',
            level:41,
            money:'0',
            photo:[],
            chooseItem:[],
            selected:[],
            // selected_name:[],
            detail:'',
            min:'',
            max:'',
            show_item:false,
            params:{
                level:41,
            }
        };
    },
    components: {
        top,
        Popup,
        diarySelItem,
        priceRange,
        selectAdviserLevel
        // Alert
    },
    computed: {
        ...mapGetters(["getAestheticStatus", "getDiaryOperate"])
    },
    watch: {
        getAestheticStatus(val, oldVal) {}
    },
    methods: {
        getName(data){
            // Bus.$emit('getName',data);
            this.$store.dispatch('changeLastName',data);
        },
        getAge(data){
            // Bus.$emit('getAge',data)
            this.$store.dispatch('changeAge',data);
        },
        getLevel(data){
            this.$store.dispatch('changeLevel',data);
        },
        
        next(){
            this.selected=[];
            // this.selected_name=[];
            this.chooseItem.forEach(element => {
                this.selected.push(element.id);
                // this.selected_name.push(element.name);
            });
            if(this.selected==""){
                alert('请至少选择一个项目');
                return false;
            }
            if(this.lastname==""){
                alert('姓氏不能为空');
                return false;
            }
            if(this.age===""){
                alert('年龄不能为空');
                return false;
            }
            if(this.min===''||this.max===''){
                alert('请填写预算区间');
                return false;
            }
            if(this.min>this.max){
                alert('预算最小值不能大于最大值');
                return false;
            }
            if(this.detail==""){
                alert('请输入详细的定制需求');
                return false;
            }
            if(!this.checkLength(this.detail)){
                alert('详情字数超过限制');
                return false;
            }
            if(this.photo==""){
                alert('请至少上传一张照片');
                return false;
            }
            
            
            
            sessionStorage.setItem('lastname',this.lastname);
            sessionStorage.setItem('age',this.age);
            sessionStorage.setItem('level',this.level);
            sessionStorage.setItem('money',this.money);
            sessionStorage.setItem('detail',this.detail);
            sessionStorage.setItem('minPrice',this.min);
            sessionStorage.setItem('maxPrice',this.max);
            sessionStorage.setItem('photo',JSON.stringify(this.photo));
            sessionStorage.setItem('operation_category',JSON.stringify(this.selected));
            sessionStorage.setItem('operation_category_name',JSON.stringify(this.chooseItem));
            this.$router.push('/adviser');
        },
        getMin(data){
                console.log(data);
                this.min=data;
            this.$store.dispatch('changeMin',data);
        },
        getMax(data){
            console.log(data);
            this.max=data;
            this.$store.dispatch('changeMax',data);
        },
        checkLength(value){
            // var num = 0;  //总个数累加判断
            // for (var i = 0; i < value.length; i++) {
            //     //根据charCodeAt来判断输入的是中文还是字母，符号
            //     var charCode = value.charCodeAt(i);
            //     if (charCode >= 0 && charCode <= 128){
            //         //字符就+1
            //         num += 1;
            //     }else{
            //         //汉字就+2
            //         num += 2;
            //     }
            // };
            // if(num>512){
            //     // alert('字数超过限制');
            //     return false;
            // }
            // return true;
            if(value.length>200){
                return false;
            }else{
                return true;
            }
        },
        show_items() {
            this.show_item = true;
            Bus.$emit("changeSelItem", true);
        },
        hide_items() {
            this.show_item = false;
        },
            
    },
    mounted() {
        if (this.$route.query.bid) {
            this.bid = this.$route.query.bid;
        }

        if (this.$route.query.did) {
            this.did = this.$route.query.did;
        }


        if (this.getDiaryOperate == "ub") {
            this.getBackdropData();
        }
        Bus.$on("toItem", res => {
            this.chooseItem = res;
            this.hide_items();
        });
    }
};
</script>

<style scoped>
#diary_operate p.top {
    margin-bottom: 0.1rem;
}
#diary_operate p.top span.submit {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.35rem;
    z-index: 556;
}
.content{
        width:90%;
        margin:.2rem auto;
        font-size:.3rem;
        box-sizing: border-box;
    }
    .margin{
        margin-top:1.2rem;
    }
    .item:after{
        content:" ";
        display: block;
        clear:both;
    }
    .item{
        height:.8rem;
        padding:.1rem .3rem .1rem .3rem;
        position:relative;
    }
    .item1{
        height:3rem;
        padding:.1rem .3rem .1rem .3rem;
        position:relative;
    }
    .item1 textarea{
        width:62%;
        padding:.1rem;
        box-sizing: border-box;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        height:2.6rem;
    }
    .span{
        width:30%;
        float:left;
        box-sizing: border-box;
        line-height: .8rem;
    }
    .price{
        width:62%;
        padding:.1rem;
        box-sizing: border-box;
        position: absolute;
        top:50%;
        left:30%;
        transform: translateY(-50%);
    }
    .include{
        width:70%;
        float:left;
        padding:.1rem;
        box-sizing: border-box;
        top:50%;
        transform: translateY(-50%);
	}
	.input{
		position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
		box-sizing: border-box;
        font-size: .3rem;
    }
    .select{
        width:62%;
        padding:.1rem;
        box-sizing: border-box;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
    .badge_r{
        width:6%;
        padding:.1rem;
        box-sizing: border-box;
        position: absolute;
        top:50%;
        left:90%;
        transform: translateY(-50%);
    }
    .category{
        margin-right:.2rem;
        padding-left:.2rem;
        overflow: hidden;
    }
    .addPic{
        padding:.2rem 0;
    }
    .margin-b{
        margin-bottom:1rem;
    }
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        height:1rem;
        width:100%;
        /* margin:.3rem auto 0; */
        margin:0 auto;
        z-index:999;
        background:#fff;
    }
    /* .amount{
        margin-right:40%;
        font-size:.3rem;
        padding:.2rem;
    } */
    /* .next{
        float:right;
        width:40%;
        position: absolute;
        right:0;
        bottom:0;
        line-height:1rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
        
    } */

</style>
