
<template>
  <div class="material">
    <div class="author_info">
      <authorInfo :user=user></authorInfo>
    </div>
    <atlasesDetailT :material=material></atlasesDetailT>
    <div class="commentInput">
      <commentInput :info=infos></commentInput>
    </div>
  </div>
</template>

<script>
import apiCom from "@/api/common";
import apiM from "@/api/material/index.js";
import atlasesDetailT from "@/templates/material/atlases_detail";
import preciew from "@/components/decorate/preciew";
import { mixin } from "@/assets/js/mixins.js";
export default {
  name: "atlases_detailt",
  mixins: [mixin],
  components: {
    preciew,
    atlasesDetailT
  },
  props: {
    info: {
      default: function() {
        return {};
      }
    },
    healthyTalkId: {
      default: ""
    }
  },
  data() {
    return {
      material: [],
      healthy_talk_id: this.healthyTalkId,
      user: {},
      infos: {
        comment_post_ID: "", //数据库文章id
        comment_parent: "", //父级id
        comment_form: "", //类型
        comment_form_id: "", //评论素材id
        parent_id: "" //被评论者id
      }
    };
  },
  methods: {
    getData() {
      var self = this;
      apiM
        .act_material("material_once", {
          healthy_talk_id: this.healthy_talk_id
        })
        .then(res => {
          self.material = res.data.material_once;
          let data = res.data.material_once[0];
          self.user = {
            user_id: data.user_id,
            headimg: data.headimgurl,
            name: data.author,
            view: data.view_count
          };
        });
    },
    add_view() {
      var self = this;
      apiCom.ajaxSubmit("common", "viewCount", {
        table: "hm_healthy_talk",
        id: self.healthyTalkId
      });
    },  
    initComment() {
      this.infos.comment_post_ID = this.params.comment_post_ID;
      this.infos.comment_form = this.params.comment_form;
      this.infos.comment_form_id = this.$route.query.healthy_talk_id;
      this.infos.parent_id = this.$route.query.uid;
      this.infos.comment_parent = 0;
    }
  },
  mounted() {
    if (this.$route.query.healthy_talk_id) {
      this.healthy_talk_id = this.$route.query.healthy_talk_id;
      this.getData();
      this.initComment();
    }

    // apiCom.ajaxSubmit("common", "viewCount", {
    //   table: "hm_healthy_talk",
    //   id: this.$route.query.healthy_talk_id
    // });
  }
};
</script>

<style scoped>
.material {
  background-color: #000000;
}
.material .commentInput {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000;
  z-index: 1501;
}
.material .author_info {
  position: fixed;
  top: 1rem;
  left: 0;
  right: 0;
  color: #fff;
  z-index: 1501;
}
.material .atlases_wrapper .atlases {
  position: relative;
  text-align: center;
  width: 100%;
  height: 3.5rem;
  overflow: hidden;
  background-color: #fff;
}
.material .atlases_wrapper .atlases_content {
  position: fixed;
  left: 0.2rem;
  right: 0.1rem;
  bottom: 0.1rem;
  height: 3rem;
  line-height: 0.35rem;
  overflow-y: scroll;
  color: #fff;
  font-size: 0.3rem;
  background-color: #00000080;
  z-index: 4010;
}
.material .atlases_wrapper .atlases img {
  width: 100%;
  min-height: 3.15rem;
}
.material .atlases_wrapper .atlases span {
  position: absolute;
  bottom: 0.2rem;
  right: 0.2rem;
  font-size: 0.25rem;
  padding: 0.1rem 0.2rem;
  color: #fff;
  border: 1px solid #000000bd;
  border-radius: 1rem;
  background-color: #000000bd;
}
.material .atlases_wrapper p.content {
  font-size: 0.3rem;
  /* height: 0.8rem; */
  line-height: 0.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0.1rem 0 0.2rem;
}
.material .atlases_wrapper p.author {
  font-size: 0.25rem;
  color: #7d7d7d;
  padding: 0.1rem 0;
  margin-right: 0.2rem;
  /* box-shadow: 1px 1px 0px #dbd6d6; */
}
.material .atlases_wrapper p.author span.comments {
  margin-left: 4px;
}
</style>
