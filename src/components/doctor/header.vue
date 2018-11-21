<!--  -->
<template>
    <div>
        <detaileHead :imgPath="doc_info['avatar']" :title="doc_info['name']" :star="evaluate['total_evaluate']" :serial_number="'执业资格证编号:'+doc_info['serial_number']" :boxOne='{
                        link:"container",
                        params:{"id":params["album_con_id"],"doc_id":this.doc_info["id"],"tab":params["tabOne"]},
                        class:"zk-icon-tukuxiangce",
                        text:"医生相册"
                    }' :boxTwe='{
                        link:"container",
                        params:{"id":params["album_con_id"],"doc_id":this.doc_info["id"],"tab":params["tabTwe"]},
                        class:"zk-icon-yingyezhizhao",
                        text:"职业证书"
                }'></detaileHead>
    </div>
</template>

<script>
    import api from "../../api/doctor";
    import detaileHead from "@/components/common/detaile_head.vue";
   import { mixin } from "@/assets/js/mixins";

    export default {
    mixins: [mixin],

        data() {
            return {
                doc_id: this.$route.query.doc_id,
                ins_id: this.$route.query.ins_id,
                ins_info: [],
                doc_info: [],
                goods: [],
                goods_total: 0,
                pic: [],
                alertShow: false,
                alerttType: 'wran',
                alertText: '',
                evaluate: [],
                page: 0,
                num_lits: 5
            };
        },
        components: {
            detaileHead
        },
        methods: {
            $_ajax_ins_info() {
                var self = this;
                api.doc_home({
                    id: this.doc_id,
                    ins_id: this.ins_id,
                    page: this.page++,
                    num_list: this.num_lits
                }).then(res => {
                    var result = res.data.data;
                    var errcode = res.data.error_code;
                    var msg = res.data.msg;
                    if (errcode == 0) {
                        self.ins_info = result.institution_info
                        self.doc_info = result.doc_info
                        self.pic = result.pic
                        self.goods_total = result.goods_total
                        // self.goods = result.goods
                        if (result.goods) {
                            self.goods = self.goods.concat(result.goods);
                        }
                    } else {
                        self.alertText = msg;
                        self.alertShow = true;
                         self.$router.go(-1)
                    }
                }).catch(error => {
                    console.log(error)
                     self.$router.go(-1)
                })
            },
        },
        mounted() {
            this.$_ajax_ins_info();
        },
    }
</script>
<style scoped>

</style>