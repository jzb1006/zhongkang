<!--  -->
<template>
  <div>
     <TDocBox
                :doc_count="parseInt(doc_count)"
                :doc_team_list="doc_team"
                :ins_id="parseInt(ins_id)"
                :con_id="params['doc_detail_con_id']"
                :docListRouter="{'name':'container',params:{'id':params['doc_list_con_id'],'ins_id':ins_id}}"
                ></TDocBox>
     <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>

  </div>
</template>

<script>
 import Alert from "@/components/decorate/alert.vue";
  import api from "../../api/hospital";
 import TDocBox from "@/templates/hospital/doctor_box.vue";
   import { mixin } from "@/assets/js/mixins";

export default {
  data () {
    return {
        ins_id: this.$route.query.ins_id,
        ins_info: [],
        doc_count: 0,
        doc_team: [],
        goods: [],
        goods_total: 0,
        pic: [],
        alertShow: false,
        alerttType: 'wran',
        alertText: '',
        evaluate: [],
    };
  },
computed: {
            isShow() {
                return this.alertShow;
            }
        },
    mixins: [mixin],

  components: {
      TDocBox,
      Alert
  },


  methods: {
       $_ajax_ins_info() {
        var self = this;
        api.detail({
            id: this.ins_id
        }).then(res => {
            var result = res.data.data;
            var errcode = res.data.error_code;
            var msg = res.data.msg;
            if (errcode == 0) {
                self.ins_info = result.institution_info
                self.doc_count = result.doc_count[0]['count']
                self.doc_team = result.doc_team
                self.goods = result.goods
                self.pic = result.pic
                self.goods_total = result.goods_total
                if(result.evaluate!=null){
                        self.evaluate = result.evaluate
                }
                
            } else {
                self.alertText = msg;
                self.alertShow = true;
            }
        }).catch(error => {
            console.log(error)
        })
    },
  },

  mounted(){
       this.$_ajax_ins_info();
  },
}

</script>
<style  scoped>
</style>