<template>
    <div id="adviser_authentication">
        <!-- <top :params=params></top>
        <editInfo :params=params1></editInfo>
        <certificate :params=params2></certificate> -->
        <adviserAuthenticationTem :result="result"></adviserAuthenticationTem>
        <!-- <div class="content vux-1px">
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
        <div class="content vux-1px margin-b">
            <div class="addPic">顾问资格证书</div>
            <div class="addPic">
                <Upload :img-max-num=1 class="upload" @changeUrls="getPhotoUrl" :file-type=1 title="上传资格证书" :oldPhoto="this.photo"></Upload>
            </div>
            
            <div class="upFile">
                <mediaDisplay :limitnum1=1 @getFileList=getFileList :filelists="oldPhoto"></mediaDisplay>
            </div>
            <div class="addPic vux-1px-t">
                <group>
                    <calendar title="有效期:" v-model="time1" disable-future></calendar>
                </group>
            </div>
        </div>
        <popup v-model="show_item" position="bottom" max-height="50%">
            <diarySelItem></diarySelItem>
        </popup> -->
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
    // import editInfo from "@/components/adviser/edit_info.vue"
    // import certificate from "@/components/adviser/certificate"
    export default{
        name:'adviser_authentication',
        data(){
            return{
                level:'',
                chooseItem:[],
                selected:[],
                jianjie:'',
                price:'',
                time1:'',
                oldPhoto:[],
                photo:[],
                // result:[],
                selectedname:[],
                show_item:false,
                params:{
                    title:'顾问认证',
                    hasBtn:true,
                    btnText:'认证',
                    next:this.next,
                },
            }
        },
        computed:{
            result(){
                return{
                    level:this.level,
                    chooseItem:this.chooseItem,
                    price:this.price,
                    jianjie:this.jianjie,
                    time1:this.time1,
                    oldPhoto:this.oldPhoto,
                }
            },
            // params1(){
            //     return{
            //         level:this.level,
            //         chooseItem:this.chooseItem,
            //         price:this.price,
            //         jianjie:this.jianjie,
            //     }
                
            // },
            // params2(){
            //     return{
            //         time1:this.time1,
            //         oldPhoto:this.oldPhoto,
            //     }
            // }
        },
        methods:{
            // show_items() {
            //     this.show_item = true;
            //     Bus.$emit("changeSelItem", true);
            // },
            // hide_items() {
            //     this.show_item = false;
            // },
            // next(){
            //     // console.log(typeof this.chooseItem);
            //     // console.log(this.level);
            //     // console.log(this.jianjie);
            //     // console.log(this.time1);
            //     // console.log(this.photo[0]);
            //     this.selected=[];
            //     this.chooseItem.forEach(element => {
            //         this.selected.push(element.id);
            //     });
            //     if(this.selected==""){
            //         alert('请至少选择一个项目');
            //         return false;
            //     }
            //     console.log('555:'+this.level);
            //     // this.level=this.$store.state.customized.level;
            //     let postdata={
            //         advantage:this.selected,
            //         level:this.level,
            //         brief_introduction:this.jianjie,
            //         consultation_price:this.price,
            //         certificates:this.photo[0],
            //         certificates_validity_date:this.time1,
            //     }
                
            //     api.adviserAuthentication(postdata).then(res=>{
            //         if(res.data.error_code==1){
            //             alert(res.data.msg);
            //             this.$router.push('/home/user');
            //         }else{
            //             alert(res.data.msg);
            //         }
            //     }).catch(err=>{
            //         console.log(err);
            //     })
            // },
            // getPhotoUrl(data){
            //     this.photo=data;
            // },
            // getFileList(data) {
            //     this.photo=[];
            //     data.forEach(ele=>{
            //         this.photo.push(ele.url);
            //     })
            // },
            queryAdviserInfo(){
                api.queryAdviserInfo().then(res=>{
                    if(res.data!=''){
                        this.chooseItem=res.data.advantage;
                        this.price=res.data.consultation_price;
                        this.jianjie=res.data.brief_introduction;
                        this.time1=res.data.certificates_validity_date;
                        this.level=res.data.adviser_level;
                        this.photo.push(res.data.certificates);
                        this.oldPhoto.push({url:res.data.certificates,alt:''});
                        console.log(this.oldPhoto);
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
            this.queryAdviserInfo();
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
            // Bus.$on("getTime",res=>{
            //     this.time1=res;
            // })
            // Bus.$on("getPhoto",res=>{
            //     this.photo=res;
            //     console.log('didiisodfidfsdf');
            //     console.log(this.photo);
            // })
            // Bus.$on("getOldPhoto",res=>{
            //     this.oldPhoto=res;
            // })
        },
        beforeDestroy(){
            // Bus.$off("getJianjie");
            // Bus.$off("getPrice");
            // Bus.$off("getLevel");
            // Bus.$off("getTime");
            // Bus.$off("getPhoto");
        },
        components:{
            top,
            Upload,
            diarySelItem,
            Calendar,
            Group,
            mediaDisplay,
            Popup,
            // editInfo,
            // certificate,
        }
    }
</script>

