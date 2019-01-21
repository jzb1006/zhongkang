<!--  -->
<template>
    <div>
        <x-header :left-options="{backText: ''}" style="background-color:#ff5370;">投诉</x-header>
        <div class="options">
            <checklist :title="'选择要投诉的条目'" :options="complain_option" v-model="radioValue" :max="1" @on-change="change"></checklist>
            <div class="comment">
                <group :title="'在这里输入一些的投诉意见(可不填)'">
                    <x-textarea :max="200" name="detail" v-model="comment" :placeholder="'最多输入200个字符'" :show-counter="true"></x-textarea>
                </group>
            </div>
            <div class="upload">
                <p class="uploadTitle">在这里添加图片证据(可不填)</p>
                <div class="upFile">
                  <mediaDisplay @getFileList=getFileList :filelists=diaryFileList></mediaDisplay>
                </div>
            </div>
            <div class="send">
                  <x-button type="primary" :disabled="disable" @click.native="send" action-type="button">提交</x-button>
            </div>
            <div>
                <popup v-model="show1" height="100%" @on-hide="back()">
                    <div class="popup1">
                       <msg :title="'提交成功！'" :description="'我们会尽快核实。感谢你的支持。'"  :icon="icon"></msg>
                        <x-button type="primary" @click.native="show1=false" action-type="button">关闭页面</x-button>
                    </div>
                </popup>
                
            </div>
             <Alert :Show="isAlert" :alerttType="alerttType" :alertText="alertText"></Alert>
        </div>
    </div>
</template>

<script>
import api from "../../api/complaint";
 import Alert from "@/components/decorate/alert.vue";
    import {
        XTextarea,
        Group,
        XHeader,
        Checklist,
        XButton ,
        Msg,
        Popup 
    } from 'vux'
    import mediaDisplay from "@/components/upload/media_display";
import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                radioValue: [],
                diaryFileList: [], //媒体文件地址
                disable:true,
                comment:'',
                icon: '',
                show1:false,
                complain_option: [],
                isAlert:false,
                alerttType: 'warn',
                alertText: '',
                scene_name:this.$route.query.scene_name||'',
                scene_id:this.$route.query.scene_id||'',
                scene_type:this.$route.query.scene_type ||'',
            };
        },
        components: {
            XHeader,
            Group,
            XTextarea,
            Checklist,
            mediaDisplay,
            XButton ,
            Msg,
            Popup,
            Alert 
        },
        methods: {
            change(value, label) {
                this.radioValue = value;
                if(this.radioValue.length==0){
                    this.disable = true;
                }else{
                    this.disable = false;
                }
                console.log(this.radioValue)
            },
            getFileList(data) {
                 this.diaryFileList = data;
            },
            getComplaintOptions(){
               api.get_complaint_options({
                   scene:this.scene_type
               }).then((res)=>{
                   if(res.data.error_code==0){
                       this.complain_option = res.data.data.map((item)=>{
                           return {
                               "key": item.type_id,
                                "value": item.type_name,
                                "inlineDesc": item.describe
                           }
                       })
                   }else{
                       this.isAlert = true;
                       this.alertText = "获取投诉失败！"
                      setTimeout(()=>{
                          this.$router.back(-1);
                      },2000)
                   }
               }).catch((error)=>{
                   console.log(error);
               });
            },
            send(){
                api.add_complaint({
                    act:'add_complain',
                    complain_type_id:this.radioValue[0],
                    comment:this.comment,
                    comment_photo:this.diaryFileList.map((item)=>{
                         return item.url;
                    }),
                    scene_name:this.scene_name,
                    scene_id:this.scene_id
                }).then((res)=>{
                    if(res.data.error_code==0){
                        this.show1=true;
                   }else{
                       this.isAlert = true;
                       this.alertText = "提交失败"
                    //    this.$router.back(-1);
                    setTimeout(()=>{
                          this.$router.back(-1);
                      },2000)
                   }
                }).catch((error)=>{
                    console.log(error);
                })
                
               
            },
            back(){
                this.$router.back(-1);
            }
        },
        mounted() {
            this.getComplaintOptions();
        },
    }
</script>
<style scoped>
    .options {
        font-size: 0.2rem;
        padding: 0.2rem;
    }
    .comment {
        margin-top: 0.2rem;
    }
   .upload .upFile{
        padding: 10px 15px;
    position: relative;
    }
    .upload .uploadTitle{
           margin-top: 0.77em;
    margin-bottom: 0.3em;
    padding-left: 15px;
    padding-right: 15px;
    color: #999999;
    font-size: 14px;
    }
  .send{
      margin: 0.5rem 0;
  }
</style>