|<template>
    <div>
        <!-- <top :params=params></top> -->
        
        <div>
            <div id="title_back">
                <div class="navbar">
                    <span class="title">定制</span>
                    <span class="zk-icon-fanhui fanhui" @click="back()"></span>
                    <span class="next" @click="next" v-if="hasNext">下一步</span>
                </div>
            </div>
            <div id="iso"></div>
        </div>
        
        <div v-show="0==index">
            <diaryInfo @getFileList=getFileList @detail=getCustomizedDetail></diaryInfo>
            <!-- <requirement></requirement>
            <chooseAdviser></chooseAdviser> -->
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
                    <div class="include vux-1px"><input type="text" class="input" v-model="lastname"></div>
                </div>
                <div class="item vux-1px-b">
                    <div class="span">年龄:</div>
                    <div class="include vux-1px"><input type="text" class="input" v-model="age"></div>
                </div>
                <div class="item vux-1px-b">
                    <div class="span">顾问级别:</div>
                    <!-- <select class="select vux-1px" v-model="level" @change="getLevel(level)">
                        <option value="41">初级顾问</option>
                        <option value="42">中级顾问</option>
                        <option value="43">高级顾问</option>
                    </select> -->
                    <select-adviser-level class="select_adviser" @getLevel="getLevel"></select-adviser-level>
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

        <div v-show="1==index">
            <!-- <top :params="params1"></top> -->
            <div class="title vux-1px-b">
                <span class="text">请选择顾问:</span>
            </div>
            <adviser-list :params="params2" @selectAdviser=selectAdviser></adviser-list>
            
        </div>

        <div v-show="2==index">
            <detail-item-tem :result="params"></detail-item-tem>
            <submit-order :params="params"></submit-order>

        </div>
    </div>
</template>
<script>
import api from '@/api/customized'
import Bus from "@/assets/bus.js"
import top from "@/components/decorate/top.vue"
import diaryInfo from "@/components/common/diary_diary_info"
import requirementContent from '@/components/customized/requirement_content.vue'
import { mapGetters } from "vuex"
import { Group, Calendar, Popup } from "vux";
import diarySelItem from "@/components/common/diary_sel_item";
// import Alert from "@/components/decorate/alert.vue";
import priceRange from '@/components/common/price_range.vue'
import selectAdviserLevel from '@/components/customized/select_adviser_level'
import adviserList from '@/components/adviser/adviser_list.vue'
import detailItem from '@/components/customized/detail_Item.vue'
import detailItemTem from '@/components/commonTemplete/detailItemTem.vue';
// import Bus from '@/assets/bus.js'
import submitOrder from '@/components/customized/submit_order.vue'
export default {
    data(){
        return {
            index:'',
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
            // params:{
            //     title:'定制',
            //     hasBtn:true,
            //     btnText:'下一步',
            //     next:this.next,
            // },
            list:[],
            adviser_id:'',
            level_name:'',
            adviser_name:'',
            count:'',
            price:'',
            // level:'',
            showAdviser:false,
            showConfirm:false,
            // hasNext:true,
            // params2:{
            //     level:this.level,
            //     selected:this.selected,
            // }
        }
    },
    computed:{
        params2(){
            return {
                level:this.level,
                selected:this.selected,
            }
        },
        hasNext(){
            if(this.index==2){
                return false;
            }else{
                return true;
            }
        },
        params(){
            return{
                'lastname':this.lastname,
                'age':this.age,
                'level_name':this.level_name,
                'level':this.level,
                'adviser_id':this.adviser_id,
                // 'money':sessionStorage.getItem('money'),
                'realname':this.adviser_name,
                'detail':this.detail,
                'category':this.chooseItem,
                'selected':this.selected,
                'photo':this.photo,
                // 'order_sn':'',
                'min_price':this.min,
                'max_price':this.max,
                // 'pay_id':this.pay_id,
                'order_amount':this.money,
            }
        }
    },
    methods:{
        getFileList(data){
            console.log(data);
            this.photo=[];
            data.forEach(ele=>{
                this.photo.push(ele.url);
            })
            this.$store.dispatch('changePhoto',this.photo);
        },
        getCustomizedDetail(data){
            console.log(data);
            this.detail=data;
        },
        selectAdviser(data){
            this.adviser_id=data.adviser_id;
            this.level_name=data.level_name;
            console.log('diei:'+this.level_name)
            this.adviser_name=data.adviser_name;
            this.money=data.price;
            console.log('wocao:'+this.money);
        },
        back(){
            // this.showAdviser=false;
            if(this.index>0){
                this.index--;
            }else{
                this.$router.go(-1);
            }
            
        },
        getLevel(data){
            this.level=data;
        },
        next(){
            // console.log('detail:'+this.getCustomizedDetail);
            // console.log('lastName:'+this.$store.state.customized.lastName);
            // console.log('age:'+this.$store.state.customized.age);
            // console.log('level:'+this.$store.state.customized.level);
            // console.log('photo:'+this.getPhoto);
            // console.log('min:'+this.$store.state.customized.minPrice);
            // console.log('max:'+this.$store.state.customized.maxPrice);
            // let detail=this.getCustomizedDetail
            // let lastName=this.$store.state.customized.lastName;
            // let age=this.$store.state.customized.age
            // let level=this.getLevel
            // let photo=this.getPhoto
            // let min=this.$store.state.customized.minPrice
            // let max=this.$store.state.customized.maxPrice


            if(this.index==0){
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


                if(this.lastName==""){
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
                if(this.detail==""||this.detail==null){
                    alert('请输入详细的定制需求');
                    return false;
                }
                if(!this.checkLength(this.detail)){
                    alert('详情字数超过限制');
                    return false;
                }
                if(this.photo==""||this.photo==null){
                    alert('请至少上传一张照片');
                    return false;
                }
            }
            // console.log('项目:'+this.selected)
            // 
            if(this.index==1){
                if(this.adviser_id==''){
                    alert('请选择顾问');
                    return false;
                }
            }
            
            
            // sessionStorage.setItem('lastname',this.lastname);
            // sessionStorage.setItem('age',this.age);
            // sessionStorage.setItem('level',this.level);
            // sessionStorage.setItem('money',this.money);
            // sessionStorage.setItem('detail',this.detail);
            // sessionStorage.setItem('minPrice',this.min);
            // sessionStorage.setItem('maxPrice',this.max);
            // sessionStorage.setItem('photo',JSON.stringify(this.photo));
            sessionStorage.setItem('operation_category',JSON.stringify(this.selected));
            sessionStorage.setItem('operation_category_name',JSON.stringify(this.chooseItem));
            // this.$router.push('/adviser');
            this.showAdviser=true;
            if(this.index<2){
                this.index++;
            }
            // if(this.index)
            // this.showConfirm=true;
        },
        show_items() {
            this.show_item = true;
            Bus.$emit("changeSelItem", true);
        },
        hide_items() {
            this.show_item = false;
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
            if(value.length>200){
                return false;
            }else{
                return true;
            }
        },
        getData(){
            let data={
                adviser_level:this.level,
                operation_category:this.selected,
            }
            console.log(data.operation_category);
            api.getAdviserList(data).then(res=>{
                console.log(res);
                this.list=res.data;
                console.log(typeof this.list);
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        Bus.$on("toItem", res => {
            this.chooseItem = res;
            this.hide_items();
        });
        this.getData()
    },
    components:{
        diaryInfo,
        Popup,
        diarySelItem,
        priceRange,
        selectAdviserLevel,
        adviserList
    }
}
</script>
<style scoped>
.navbar {
        height: 1rem;
        line-height: 1rem;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        color: #fff;
        text-align: center;
        background: #ff5370;
        letter-spacing: 0.028rem;
        font-size: 15px;
        z-index:1000;
    }
    .navbar .title {
        font-size: .3rem;
    }
    .navbar .fanhui {
        padding: 0.111rem;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: 1000;
        font-size: 0.4rem;
    }
    .navbar .next{
        position:absolute;
        top: 50%;
        right: .3rem;
        transform: translateY(-50%);
        font-size: .3rem;
        color:aquamarine;
    }
.selectAdviser{
    position: absolute;
    right: 0;
    left: 0;
    top: 1rem;
    z-index: 110;
    /* height: 8rem; */
    overflow: scroll;
    background-color: #fff;
}
.title{
        font-size:.35rem;
        /* margin:.2rem; */
        padding:.2rem;
    }
    .text{
        display: inline-block;
        width:78%;
    }
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

