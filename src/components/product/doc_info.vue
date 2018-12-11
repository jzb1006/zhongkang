
<template>
    <div>
        <insInfo 
        :route_link="'container'" 
        :route_params="{id:params['doc_con_id'],doc_id:doctor_info.id,ins_id:ins_id}" 
        :doc_name="doctor_info.name" 
        :expert_project="doctor_info.expert_project_classify3_id"
        ></insInfo>
        <Loading v-show="loadinging"></Loading>
         <Alert :Show="isShow" :alerttType="'warn'" :alertText="alertText"></Alert>
    </div>
</template>

<script>
    import insInfo from '@/templates/product/doc_info.vue'
    import api from "../../api/search"
    import Loading from "@/components/decorate/loading.vue";
   import { mixin } from "@/assets/js/mixins";

    export default {
    mixins: [mixin],

        data() {
            return {
                id: this.$route.query.goods_id,
                ins_id: this.$route.query.ins_id,
                doctor_info: [],
                loadinging: true,
                 alertText: '',
                isShow:false
            }
        },
        components: {
            insInfo,
            Loading
        },
        methods: {
            $_ajax_product_detail() {
                var self = this;
                api.ajaxProduct({
                    id: this.id,
                    ins_id: this.ins_id
                }).then(res => {
                     var errorCode = res.data.error_code;
                    var msg = res.data.msg;
                    if(errorCode==1){
                       self.isShow=true;
                       self.alertText = msg;
                       self.$router.back(-1);
                       return;
                    }
                    if (res.data.data == '') {
                        self.isShow=true;
                        self.alertText = '你请求的商品不存';
                        this.$router.back(-1)
                         return;
                    }
                    if(res.data.data.doctor_info!=''){

                        self.doctor_info = res.data.data.doctor_info;
                    }
                    self.loadinging = false
                }).catch(error => {
                    self.loadinging = false
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$_ajax_product_detail();
        },
    }
</script>
<style scoped>

</style>