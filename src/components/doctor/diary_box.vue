<!--  -->
<template>
    <div>
        <diary 
        :doc_id="parseInt(doc_id)" 
        :title="'医生日志'" :number="params['number']" 
        :links="{'router':'container','query':{id:params['diary_con_id'],doc_id:doc_id}}"></diary>
        <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>

<script>
import Alert from "@/components/decorate/alert.vue";
import api from "../../api/doctor";
import diary from "@/templates/hospital/diary_box.vue";
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
            alerttType: "wran",
            alertText: "",
            evaluate: [],
            page: 0,
            num_lits: 5
        };
    },
    computed: {
        isShow() {
            return this.alertShow;
        }
    },
    components: {
        diary,
        Alert
    },
    methods: {
        $_ajax_ins_info() {
            var self = this;
            api
                .doc_home({
                    id: this.doc_id,
                    ins_id: this.ins_id,
                    page: this.page++,
                    num_list: this.num_lits
                })
                .then(res => {
                    var result = res.data.data;
                    var errcode = res.data.error_code;
                    var msg = res.data.msg;
                    if (errcode == 0) {
                        self.ins_info = result.institution_info;
                        self.doc_info = result.doc_info;
                        self.pic = result.pic;
                        self.goods_total = result.goods_total;
                        // self.goods = result.goods
                        if (result.goods) {
                            self.goods = self.goods.concat(result.goods);
                        }
                    } else {
                        self.alertText = msg;
                        self.alertShow = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.$_ajax_ins_info();
    }
};
</script>
<style scoped>
</style>