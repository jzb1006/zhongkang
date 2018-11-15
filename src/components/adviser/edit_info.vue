<template>
    <div id="edit_info">
        <div class="content vux-1px">
            <div class="item vux-1px-b" @click="show_items">
                <div class="span">请选择项目:</div>
                <span class="select">
                    <i v-for="item in chooseItem" :key="item.id" class="category vux-1px-l">{{item.name}}</i>
                </span>
                <span class="badge_r"><i class="zk-icon-fanhui1"></i></span>
            </div>
            <div class="item vux-1px-b">
                <div class="span">咨询价格:</div>
                <div class="include vux-1px"><input type="text" class="input" v-model="price" @input="getPrice(price)"></div>
            </div>
            <div class="item vux-1px-b">
                <div class="span">顾问级别:</div>
                <!-- <div class="include vux-1px"><input type="text" class="input" v-model="level"></div> -->
                <!-- <select class="select vux-1px" v-model="level" @change="getLevel(level)">
                    <option value="41">初级顾问</option>
                    <option value="42">中级顾问</option>
                    <option value="43">高级顾问</option>
                </select> -->
                <select-adviser-level :params="{'level':this.level}"></select-adviser-level>
            </div>
            <div class="item1">
                <div class="span">简介:</div>
                <textarea v-model="jianjie" @input="getJianjie(jianjie)"></textarea>
            </div>
        </div>
        <popup v-model="show_item" position="bottom" max-height="50%">
            <diarySelItem></diarySelItem>
        </popup>
    </div>    
</template>

<script>
    import customized from './../../api/customized'
    import Upload from "@/components/public/upload"
    import top from '@/components/decorate/top.vue'
    import api from "../../api/customized"
    import Bus from "@/assets/bus.js";
    import diarySelItem from "@/components/common/diary_sel_item.vue";
    import { Calendar,Group,Popup } from 'vux'
    import mediaDisplay from "@/components/upload/media_display";
    import editInfo from "@/components/adviser/edit_info.vue"
    import selectAdviserLevel from '@/components/customized/select_adviser_level' 
    export default{
        name:'edit_info',
        data(){
            return{
                level:'41',
                chooseItem:[],
                selected:[],
                jianjie:'',
                price:'',
                time1:'',
                result:[],
                selectedname:[],
                show_item:false,
                
            }
        },
        watch:{
            params(newV,oldV){
                console.log(this.params);
                this.level=newV.level;
                this.jianjie=newV.jianjie;
                this.chooseItem=newV.chooseItem;
                this.price=newV.price;
            }
        },
        props:{
            params:{
                type:[Object],
                default(){
                    return {}
                }
            }
        },
        methods:{
            getJianjie(data){
                Bus.$emit("getJianjie",data);
            },
            getPrice(data){
                Bus.$emit("getPrice",data);
            },
            getLevel(data){
                Bus.$emit("getLevel",data);
            },
            show_items() {
                this.show_item = true;
                Bus.$emit("changeSelItem", true);
            },
            hide_items() {
                this.show_item = false;
            },
            next(){
                this.selected=[];
                this.chooseItem.forEach(element => {
                    this.selected.push(element.id);
                });
                if(this.selected==""){
                    alert('请至少选择一个项目');
                    return false;
                }
                // if(this.chooseItem==""){
                //     alert('请至少选择一个项目');
                //     return false;
                // }
                api.adviserAuthentication({
                    advantage:this.selected,
                    level:this.level,
                    brief_introduction:this.jianjie,
                    consultation_price:this.price,
                    certificates:this.photo[0],
                    certificates_validity_date:this.time1,
                })
                .then(res=>{
                    alert(res.data.msg);
                    this.$router.push('/home/user');
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            getPhotoUrl(data){
                this.photo=data;
            },
            getFileList(data) {
                this.photo=[];
                data.forEach(ele=>{
                    this.photo.push(ele.url);
                })
            },
            queryAdviserInfo(){
                api.queryAdviserInfo().then(res=>{
                    if(res.data!=''){
                        this.chooseItem=res.data.advantage;
                        Bus.$emit('toItem',this.chooseItem);
                        this.price=res.data.consultation_price;
                        Bus.$emit('getPrice',this.price);
                        this.jianjie=res.data.brief_introduction;
                        Bus.$emit('getJianjie',this.jianjie);
                        this.time1=res.data.certificates_validity_date;
                        this.level=res.data.adviser_level;
                        console.log('a:'+this.level);
                        Bus.$emit('getLevel',this.level);
                        // this.photo.push(res.data.certificates);
                        // this.oldPhoto.push({url:res.data.certificates,alt:''});
                    }
                    
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        mounted(){
            // api.getinfo().then(res=>{
            //     console.log(res);
            //     this.lastname=res.data.lastname;
            //     this.age=res.data.age;
            // }).catch(err=>{
            //     console.log(err);
            // })
            // this.queryAdviserInfo();
            Bus.$on("toItem", res => {
                this.selectedname=[];
                this.chooseItem=res;
                this.hide_items();
                // this.chooseItem.forEach(element => {
                //     this.selectedname.push(element.name);
                // });
            })
        },
        beforeDestroy(){
            Bus.$off("getJianjie");
            Bus.$off("getPrice");
            Bus.$off("getLevel");
        },
        components:{
            top,
            Upload,
            diarySelItem,
            Calendar,
            Group,
            mediaDisplay,
            Popup,
            editInfo,
            selectAdviserLevel
        }
    }
</script>
<style>
@import url("./../../assets/css/calandar.css");
.weui-cells {
    padding: .4rem .2rem!important;
}
</style>
<style scoped>
    .upFile {
        min-height: 4rem;
        padding: 0 0.3rem;
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
        padding:.2rem;
    }
    .upload{
        text-align:left!important;
    }
    .margin-b{
        margin-bottom:1.5rem;
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