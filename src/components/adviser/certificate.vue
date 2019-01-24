<template>
    <div id="certificate">
        <div class="content vux-1px margin-b">
            <div class="addPic">顾问资格证书</div>
            <div class="upFile">
                <mediaDisplay :limitnum1=1 @getFileList=getFileList :filelists="this.params.oldPhoto"></mediaDisplay>
            </div>
            <div class="addPic vux-1px-t">
                <group>
                    <calendar title="有效期:" v-model="time1" disable-future @on-change="getTime(time1)"></calendar>
                </group>
            </div>
        </div>
        <Alert v-bind:Show.sync="alertShow" :alerttType="alertType" :alertText="alertText"></Alert>
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
    export default{
        name:'certificate',
        data(){
            return{
                level:'41',
                chooseItem:[],
                selected:[],
                jianjie:'',
                price:'',
                time1:'',
                oldPhoto:[],
                photo:[],
                result:[],
                selectedname:[],
                show_item:false,
                alertShow:false,
                alertType:'warn',
                alertText:'',
                // params:{
                //     title:'顾问认证',
                //     hasBtn:true,
                //     btnText:'认证',
                //     next:this.next,
                // },
            }
        },
        watch:{
            params(newVal,oldVal){
                this.time1=newVal.time1;
            }
        },
        props:{
            params:{
                type:Object,
                default(){
                    return {}
                }
            }
            
        },
        // computed:{
        //     params1(){
        //         return{
        //             level:this.level,
        //         }
                
        //     }
        // },
        methods:{
            show_items() {
                this.show_item = true;
                Bus.$emit("changeSelItem", true);
            },
            hide_items() {
                this.show_item = false;
            },
            getTime(time){
                Bus.$emit('getTime',time)
            },
            next(){
                // console.log(typeof this.chooseItem);
                // console.log(this.level);
                // console.log(this.jianjie);
                // console.log(this.time1);
                // console.log(this.photo[0]);
                this.selected=[];
                this.chooseItem.forEach(element => {
                    this.selected.push(element.id);
                });
                if(this.selected==""){
                    this.alertShow=true;
                    this.alertType='warn';
                    this.alertText='请至少选择一个项目';
                    return false;
                }
                console.log('555:'+this.level);
                let postdata={
                    advantage:this.selected,
                    level:this.level,
                    brief_introduction:this.jianjie,
                    consultation_price:this.price,
                    certificates:this.photo[0],
                    certificates_validity_date:this.time1,
                }
                
                api.adviserAuthentication(postdata).then(res=>{
                    this.alertShow=true;
                    this.alertType='success';
                    this.alertText=res.data.msg;
                    this.$router.push('/home/user');
                }).catch(err=>{
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
                Bus.$emit('getPhoto',this.photo);
            },
            queryAdviserInfo(){
                api.queryAdviserInfo().then(res=>{
                    console.log('sss');
                    if(res.data!=''){
                        // this.chooseItem=res.data.advantage;
                        // this.price=res.data.consultation_price;
                        // this.jianjie=res.data.brief_introduction;
                        this.time1=res.data.certificates_validity_date;
                        Bus.$emit('getTime',this.time1)
                        console.log('what the fuckaaaaaaaaaaaaaaaaaaaaa');
                        // this.level=res.data.adviser_level;
                        this.photo.push(res.data.certificates);
                        Bus.$emit('getPhoto',this.photo);
                        this.oldPhoto.push({url:res.data.certificates,alt:''});
                        console.log('老照片:'+this.oldPhoto);
                        // Bus.$emit('getOldPhoto',this.oldPhoto);
                    }
                    
                }).catch(err=>{
                    console.log("error:"+err);
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
            // Bus.$on("toItem", res => {
            //     this.selectedname=[];
            //     this.chooseItem=res;
            //     this.hide_items();
            //     // this.chooseItem.forEach(element => {
            //     //     this.selectedname.push(element.name);
            //     // });
            // })
            // Bus.$on("getJianjie",res=>{
            //     this.jianjie=res;
            //     console.log(this.jianjie);
            // })
            // Bus.$on("getPrice",res=>{
            //     this.price=res;
            // })
            // Bus.$on("getLevel",res=>{
            //     this.level=res;
            //     console.log('what the fuck:'+this.level);
            // })
        },
        beforeDestroy(){
            Bus.$off("getJianjie");
            Bus.$off("getPrice");
            Bus.$off("getLevel");
            Bus.$off("getTime");
            Bus.$off("getPhoto");
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
        }
    }
</script>
<style>
/* @import url("./../../assets/css/calandar.css"); */
#certificate .weui-cells {
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