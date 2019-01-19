<!--  -->
<template>
    <div>
        <insInfo 
        :route_link="'container'"
        :img_url="hospital.profile_photo"
        :ins_name="hospital.name"
        :institution_type="hospital.institution_type_id"
        :address="hospital.address"
        :route_params="{id:params['ins_con_id'],ins_id:ins_id}"
        :is_check="hospital.is_check"
        ></insInfo>
        <Loading v-show="loadinging"></Loading>
         <Alert :Show="isShow" :alerttType="'warn'" :alertText="alertText"></Alert>
    </div>
</template>

<script>
    import insInfo from '@/templates/product/ins_info.vue'
    import api from "../../api/search"
    import Loading from "@/components/decorate/loading.vue";
   import { mixin } from "@/assets/js/mixins";
    
    export default {
    mixins: [mixin],

        data() {
            return {
                id: this.$route.query.goods_id,
                ins_id: this.$route.query.ins_id,
                hospital: [],
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
                    if(res.data.data.institution_info){
                        self.hospital = res.data.data.institution_info[0];
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