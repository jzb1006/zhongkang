<template>
    <div id="customized_apply_refund">
         <!-- 头部 -->
        <!-- <top title="申请退款"></top> -->
        <!-- 单选框 -->
        <checklist title="选择退款申请原因" :options="commonList" v-model="radioValue" :max="1" ></checklist>
        <!-- 文本框 -->
        <group>
            <x-textarea :max="20" v-model="textarea" placeholder="输入你的退款理由"></x-textarea>
        </group>
        <!-- 提交按钮 -->
        <div style="padding: 1rem 0.1rem;">
            <x-button type="primary" @click.native="submit()">提交</x-button>
        </div>

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
// import top from "@/components/decorate/top_back_title.vue";
import Alert from "@/components/decorate/alert.vue";
import api from "../../api/customized";
    import {
        Checklist,
        XTextarea,
        Group,
        XButton,
        Confirm 
    } from 'vux'
import { setTimeout } from 'timers';
    export default {
        name:'customized_apply_refund',
        data() {
            return {
                commonList: ['宝贝拍错了，重新下单', '购买重复了', '商品质量问题', '其他原因'],
                radioValue: ['宝贝拍错了，重新下单'],
                tt:this.$route.query.tt,
                oid:this.$route.query.oid,
                status:this.$route.query.status,
                confirmShow:false,
                textarea:'',
                order_action:'向机构提交取消订单',
                 changeShow: false,
                alerttType: 'success',
                alertText: ''
            }
        },
        components: {
            Checklist,
            XTextarea,
            Group,
            // top,
            XButton,
            Confirm,
            Alert
        },
        methods: {
           onCancel(){
               console.log('clos')
               this.confirmShow = false;
           },
           onConfirm(){
               this.confirmShow = false;
               var self = this;
               api.apply_refund({
                  'status':this.status,
                  'oid':this.oid,
                  'tt':this.tt,
                  'orderdesc':this.radioValue.join(''),
                  'ordertxt':this.textarea,
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
           }
        }
    }
</script>
<style>
    .weui-cells__title{
        font-size: 0.3rem!important;
    }
    .weui-cell__bd {
    font-size: 0.3rem!important;
}
.weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before {
    color: #ff5370!important;
}
.weui-btn{
    font-size: 0.3rem!important;
}
.weui-btn_primary {
    background-color: #ff5370!important;
}
.weui-dialog__hd{
    padding:0rem 0rem 0rem 0rem!important;
}
.weui-dialog__title {
    font-weight: 300!important;
    font-size: 0.4rem!important;
        line-height: 1rem!important;
}
.weui-dialog__bd{
    font-size: 0.4rem!important;
}
.weui-dialog__ft {
    font-size: 0.3rem!important;
    padding: 0.3rem 0!important;
}
.weui-dialog{
    max-width:90%!important;
}
</style>









