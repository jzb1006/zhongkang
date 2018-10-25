<template>
    <div id="adviserAuthentication">
        <!-- <p class="top"> -->
            <top title="顾问认证">
                <span slot="next" class="next" @click="next">认证</span>
            </top>
            
        <!-- </p> -->
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
                <div class="include vux-1px"><input type="text" class="input" v-model="price"></div>
            </div>
            <div class="item vux-1px-b">
                <div class="span">顾问级别:</div>
                <!-- <div class="include vux-1px"><input type="text" class="input" v-model="level"></div> -->
                <select class="select vux-1px" v-model="level">
                    <option value="41">初级顾问</option>
                    <option value="42">中级顾问</option>
                    <option value="43">高级顾问</option>
                </select>
            </div>
            <div class="item1">
                <div class="span">简介:</div>
                <textarea v-model="jianjie"></textarea>
            </div>
        </div>
        <!-- <div class="content vux-1px margin-b">
            <div class="addPic">
                <Upload @changeUrls="getPhotoUrl" :file-type=1 title="上传资格证书"></Upload>
            </div>
        </div> -->
        <diarySelItem></diarySelItem>
    </div>    
</template>

<script>
    import customized from './../../api/customized'
    import Upload from "@/components/public/upload"
    import top from '@/components/decorate/top_back_title.vue'
    import api from "../../api/customized"
    import Bus from "@/assets/bus.js";
    import diarySelItem from "@/components/common/diary_sel_item.vue";
    export default{
        name:'adviserAuthentication',
        data(){
            return{
                level:41,
                chooseItem:[],
                selected:[],
                jianjie:'',
                price:''
            }
        },
        methods:{
            show_items() {
                Bus.$emit("changeSelItem", true);
            },
            next(){
                console.log(this.selected);
                console.log(this.level);
                console.log(this.jianjie);
                this.selected=[];
                this.chooseItem.forEach(element => {
                    this.selected.push(element.id);
                });
                if(this.selected==""){
                    alert('请至少选择一个项目');
                    return false;
                }
                api.adviserAuthentication({
                    advantage:this.selected,
                    level:this.level,
                    brief_introduction:this.jianjie,
                    consultation_price:this.price
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
            }
        },
        mounted(){
            api.getinfo().then(res=>{
                console.log(res);
                this.lastname=res.data.lastname;
                this.age=res.data.age;
            }).catch(err=>{
                console.log(err);
            })
            Bus.$on("toItem", res => {
                this.chooseItem=res;
            })
        },
        components:{
            top,
            Upload,
            diarySelItem
        }
    }
</script>

<style scoped>
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