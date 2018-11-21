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
        ></insInfo>
        <Loading v-show="loadinging"></Loading>
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
                loadinging: true
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
                    if (res.data == '') {
                        alert('你请求的商品不存啊@！')
                        this.$router.back(-1)
                    }
                    self.hospital = res.data.institution_info[0];
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