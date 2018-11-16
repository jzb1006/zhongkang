<!--  -->
<template>
  <div>
      <detaileHead 
           :imgPath="ins_info['profile_photo']"
           :title="ins_info['name']"
           :star="evaluate['total_evaluate']"
           :commentInfo="[{text:'服务',value:evaluate['service']},{text:'医生',value:evaluate['doctor']},{text:'效果',value:evaluate['effect']}]"
           :boxOne='{
                    link:"docList",
                    params:{"ins_id":this.ins_id},
                    class:"zk-icon-yisheng",
                    text:this.doc_count+"医生"
                }'
            :boxTwe='{
                    link:"InsLicence",
                    params:{"ins_id":this.ins_id,"tab":0},
                    class:"zk-icon-yingyezhizhao",
                    text:"医疗执业许可"
            }'
           ></detaileHead>
  </div>
</template>

<script>
  import api from "../../api/hospital";
 import detaileHead from "@/components/common/detaile_head.vue";
export default {
  data () {
    return {
        ins_id: this.$route.params.ins_id,
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

  components: {
      detaileHead
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