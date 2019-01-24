<template>
    <div id="appeal">
         <!-- 头部 -->
        <top title="向平台申诉"></top>
        <!-- 单选框 -->
         <upload @changeUrls="getImg" :title="'点击添加图片'"></upload>
        <!-- 文本框 -->
        <group>
            <x-textarea :max="20" v-model="textarea" placeholder="输入你的退款理由"></x-textarea>
        </group>
        <!-- 提交按钮 -->
        <div style="padding: 1rem 0.1rem;">
            <x-button type="primary" @click.native="submit()">提交</x-button>
        </div>
       <div id="fill"></div>
        <!-- 弹窗 -->
        <div >
        <confirm v-model="confirmShow"
            title="操作提示"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            <p style="text-align:center;">确定吗</p>
        </confirm>
        </div>
         <!-- 订单操作 -->
        <Alert :Show="changeShow" :alerttType="alerttType" :alertText="alertText"></Alert>
        <!-- 弹出框 -->
    </div>
</template>
<script>
import top from "@/components/decorate/top_back_title.vue";
import upload from "@/components/public/upload.vue";
import Alert from "@/components/decorate/alert.vue";
 import api from "../../api/order";
    import {

        XTextarea,
        Group,
        XButton,
        Confirm 
    } from 'vux'
    export default {
        data() {
            return {
                tt:this.$route.params.tt,
                oid:this.$route.params.oid,
                status:this.$route.params.status,
                confirmShow:false,
                textarea:'',
                order_action:'向机构提交取消订单',
                changeShow: false,
                alerttType: 'success',
                alertText: '',
                imgPath:'',
            }
        },
        components: {
            XTextarea,
            Group,
            top,
            XButton,
            Confirm,
            Alert,
            upload
        },
        methods: {
           onCancel(){
               console.log('clos')
               this.confirmShow = false;
           },
           onConfirm(){
               this.confirmShow = false;
               var self = this;
               api.appeal({
                  'status':this.status,
                  'oid':this.oid,
                  'tt':this.tt,
                  'evidence_img':this.imgPath,
                  'reason':this.textarea,
               }).then(res=>{
                   var msg = res.data.msg;
                   var errcode = res.data.error_code;
                    self.changeShow = true
                    self.alertText = msg
                    if (errcode == 1) {
                        self.alerttType = 'warn'
                    }
                    setTimeout(()=>{
                       this.$router.back(-1);
                   },2000)
                //    console.log(res)
               }).catch(error=>{
                   console.log(error);
               })
           },
           submit(){
             this.confirmShow = true;
           },
           getImg(path){
              var img_path = path.join(',');
              this.imgPath = img_path;
           }
        }
    }
</script>
<style>
#appeal .weui-cells__title{
    font-size: 0.3rem!important;
}
#appeal .weui-cell__bd {
font-size: 0.3rem!important;
}
#appeal .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
    color: #ff5370!important;
}
#appeal .weui-btn{
    font-size: 0.3rem!important;
}
#appeal .weui-btn_primary {
    background-color: #ff5370!important;
}
#appeal .weui-dialog__hd{
    padding:0rem 0rem 0rem 0rem!important;
}
#appeal .weui-dialog__title {
    font-weight: 300!important;
    font-size: 0.4rem!important;
        line-height: 1rem!important;
}
#appeal .weui-dialog__bd{
    font-size: 0.4rem!important;
}
#appeal .weui-dialog__ft {
    font-size: 0.3rem!important;
    padding: 0.3rem 0!important;
}
#appeal .weui-dialog{
    max-width:90%!important;
}
</style>









