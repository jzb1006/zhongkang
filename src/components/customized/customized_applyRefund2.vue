<template>
    <div id="customized_appli_tk">
         <!-- 头部 -->
        <top title="申请退款"></top>
        <applyRefund :params="params"></applyRefund>
        <!-- 单选框 -->
        <!-- <checklist title="选择退款申请原因" :options="commonList" v-model="radioValue" :max="1" ></checklist>
  
        <group>
            <x-textarea :max="20" v-model="textarea" placeholder="输入你的退款理由"></x-textarea>
        </group>
        <div style="padding: 1rem 0.1rem;">
            <x-button type="primary" @click.native="submit()">提交</x-button>
        </div>

        <div >
        <confirm v-model="confirmShow"
            title="操作提示"
            @on-cancel="onCancel"
            @on-confirm="onConfirm">
            <p style="text-align:center;">确定吗</p>
        </confirm>
        </div>
        <Alert :Show="changeShow" :alerttType="alerttType" :alertText="alertText"></Alert> -->
     
    </div>
</template>
<script>
import top from "@/components/decorate/top_back_title.vue";
import api from "../../api/customized";
import applyRefund from '@/components/statement/apply_refund.vue'
    export default {
        data() {
            return {
                // commonList: ['宝贝拍错了，重新下单', '购买重复了', '商品质量问题', '其他原因'],
                radioValue: ['宝贝拍错了，重新下单'],
                // tt:this.$route.params.tt,
                // oid:this.$route.params.oid,
                // status:this.$route.params.status,
                // confirmShow:false,
                // textarea:'',
                // order_action:'向机构提交取消订单',
                //  changeShow: false,
                // alerttType: 'success',
                // alertText: ''
            }
        },
        components: {
            top,
            applyRefund
        },
        computed:{
            params(){
                return{
                    onConfirm:this.onConfirm,
                }
            }
        },
        methods: {
           onConfirm(){
               console.log('f');
               console.log(this.radioValue);
               console.log(this.oid);
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
        }
    }
</script>
<style>
    /* .weui-cells__title{
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
} */
</style>









