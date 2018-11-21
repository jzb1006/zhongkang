<!--  -->
<template>
  <div>
     <TDiary  :ins_id="parseInt(ins_id)"
               :title="'商家日志'"
               :links="{'router':'container','query':{id:params['diary_con_id'],ins_id:ins_id}}"
               :number="params['number']"
               ></TDiary>
     <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>

  </div>
</template>

<script>
 import Alert from "@/components/decorate/alert.vue";
  import api from "../../api/hospital";
 import TDiary from "@/templates/hospital/diary_box.vue";
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
    mixins: [mixin],

computed: {
            isShow() {
                return this.alertShow;
            }
        },
  components: {
      TDiary,
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