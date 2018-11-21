<template>
    <div id="edit_programme">
        <editProgrammeTem :result="result"></editProgrammeTem>
        
    </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
  import api from './../../api/customized'
  import Upload from "@/components/public/upload"
  import Bus from "./../../assets/bus.js";
  import {mapGetters} from 'vuex'

  import { XTextarea, Popup, PopupRadio } from "vux";
 import mediaDisplay from "@/components/upload/media_display";
  export default {
    name: 'edit_programme',
    data(){
        return{
            text:'',
            order_sn:'',
            price:'',
            photo:[],
            programmePhoto:[],
            programme:[],
            oldProgrammePhoto:[],
            oldPhoto:[],
        }
    },
    computed:{
        ...mapGetters(['getOrderSn']),
        result(){
            return{
                price:this.price,
                photo:this.photo,
                programmePhoto:this.programmePhoto,
                programme:this.programme,
                oldProgrammePhoto:this.oldProgrammePhoto,
                oldPhoto:this.oldPhoto,
                text:this.text,
            }
        }
    },
    methods:{
        // add(){
        //     console.log(this.programmePhoto);
        //     console.log(this.photo);
        //     // console.log(this.order_sn);
        //     this.programme.push(this.text);
        //     this.programme=this.programme.concat(this.programmePhoto);
        //     // console.log(this.programme);
        //     // console.log(this.text);
        //     let postdata={
        //         'order_sn':this.getOrderSn,
        //         'oldProgramme':this.oldProgramme,
        //         'programme':this.programme,
        //         'operation_price':this.price,
        //         'photo':this.photo,
        //     }
        //     // console.log(postdata);
        //     api.updateSingleReply(postdata).then(res=>{
        //         // console.log(res);
        //         this.$router.push({path:'/adviserViewReply',query:{order_sn:this.getOrderSn}});
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        //     // this.$router.push({name:'customizedReply',params:{data:postdata}})
        //     // this.$emit('passProgramme',postdata);
        //     // this.text='';
        //     // this.price='';
        // },
        // getPhotoUrl(data){
        //     this.photo=data;
        // },
        // getProgrammePhoto(data){
        //     this.programmePhoto=data;
        // },
        // getFileList(data) {
        //     console.log(data);
        //     this.programmePhoto=[];
        //     data.forEach(ele=>{
        //         this.programmePhoto.push(ele.url);
        //     })
        //     console.log(this.programmePhoto);
        // },
        // getFileList1(data){
        //     console.log(data);
        //     this.photo=[];
        //     data.forEach(ele=>{
        //         this.photo.push(ele.url);
        //     })
        //     console.log(this.photo);
        // }
    },
    mounted(){
        // this.order_sn=this.$route.query.order_sn;
        // console.log(this.order_sn);
        let programme=this.$route.query.programme;
        // console.log(this.programme);
        this.oldProgramme=programme;
        api.querySingleReply({'order_sn':this.getOrderSn,'programme':this.oldProgramme}).then(res=>{
            this.text=res.data.programme[0];
            this.programmePhoto=res.data.programme.slice(1,res.data.programme.length);
            let arr=res.data.programme.slice(1,res.data.programme.length);
            console.log(arr);
            arr.forEach(ele=>{
                this.oldProgrammePhoto.push({url: ele,alt:""});
            })
            // console.log(this.oldProgrammePhoto);
            // Bus.$emit('initImg',this.oldProgrammePhoto);
            this.price=res.data.operation_price;
            this.photo=res.data.photo;
            let arrphoto=res.data.photo;
            arrphoto.forEach(ele=>{
                this.oldPhoto.push({url:ele,alt:""});
            })
        }).catch(err=>{
            console.log(err);
        })
        // api.viewReply({'order_sn':this.order_sn}).then(res=>{
        //     console.log(res);
        //     this.result=res.data;
        //     this.text=res.data.programme;
        //     this.price=res.data.operation_price;
        //     this.photo=res.data.photo;
        // }).catch(err=>{
        //     console.log(err);
        // })
    },
    components:{
        top,
        Upload,

        XTextarea,
        Popup,
        PopupRadio,
        mediaDisplay,
    }
  }
</script>
<style scoped>
.upFile {
    min-height: 4rem;
    padding: 0 0.3rem;
}
.upFile span{
    font-size:.3rem;
}
.textarea {
    margin: 0 0.3rem 0;
    font-size: 0.3rem;
    line-height: 0.4rem;
    /* font-weight: 550; */
}
    #programme{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:1000;
        background:#fff;
    }
    .container,.content{
        width:90%;
        margin:.2rem auto;
        font-size:.3rem;
        box-sizing: border-box;
    }
    .add_programme .btn{
        padding:.2rem;
        background:#ff5370;
        color:#fff;
    }
    .item{
        padding:.2rem;
        position:relative;
        min-height:.8rem;
    }
    .item:after{
        content:" ";
        display: block;
        clear:both;
    }
    .span{
        display: block;
        width:24%;
        float:left;
        box-sizing: border-box;
        line-height: .8rem;
        font-size:.3rem;
    }
    .include{
        width:66%;
        /* float:left; */
        padding:.1rem;
        box-sizing: border-box;
        position:absolute;
        left:26%;
        top:50%;
        transform: translateY(-50%);
	}
    .programme{
        width:66%;
        float:left;
        /* height:3rem; */
    }
     .text{
        width:100%;
        height:2.8rem;
        padding:.2rem;
        box-sizing: border-box;
    }
    .price{
        padding:.1rem;
        position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
		box-sizing: border-box;
        font-size: .3rem;
    }
    .addPic{
        padding:.2rem 0;
        border:1px solid #ccc;
    }
    .margin-b{
        margin-bottom:1rem;
    }
</style>