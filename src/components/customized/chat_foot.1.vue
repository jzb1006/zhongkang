<template>
    <div id="chat_foot">
        <div class="shadow" @click="hide"></div>
        <div :class="{footer:true,hei:this.add_show}">
            <div :class="{chat:this.add_show}">
                <span :class="{'zk-icon-yuyin':true, icon:true, voice:true,huanyuan:!this.add_show}"></span>
                <input type="text" :class="{text:true,huanyuan:!this.add_show}" v-model="text" @keyup.enter="send" @focus="inputFocus">
                <span :class="{'zk-icon-biaoqing':true, icon:true, biaoqing:true,huanyuan:!this.add_show}" @click="add" id="no3"></span>
                <span :class="{'zk-icon-tianjia':true, icon:true, tianjia:true,huanyuan:!this.add_show}" v-if="!isSend" @click="add" id="no1"></span>
                <input type="button" :class="{btn:true,huanyuan:!this.add_show}" value="发送" v-if="isSend" @click="send">
            </div>
            <div class="add_box" v-show="this.add_show" id="no2">
                <!-- {{this.addShow}} -->
                <Upload @changeUrls="getUrl" img-max-num="1" :file-type=1 sign="headimg" title="相册"><span class="text"></span></Upload>
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api/customized";
import Upload from "@/components/public/upload.vue";
import Bus from "@/assets/bus.js"
export default {
  name: "chat_foot",
  data() {
    return {
      text: "",
      user_id: "",
      adviser_id: "",
      order_sn: "",
      add_show: false
    };
  },
  props: {
    direction: {
      type: [Number, String]
    }
  },
  computed: {
    isSend() {
      if (this.text.trim() != "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    hide(){
      this.add_show=false;
    },
    send() {
      if (this.text.trim() == "") {
        return false;
      }
      console.log(this.direction);
      let postdata = {
        user_id: sessionStorage.getItem("user_id"),
        adviser_id: sessionStorage.getItem("adviser_id"),
        message: this.text,
        add_time: new Date().getTime(),
        order_sn: sessionStorage.getItem("order_sn"),
        direction: this.direction
      };
      api.saveUserChat(postdata).then(res => {
          console.log(res);
          this.text = "";
          Bus.$emit("query");
      })
        .catch(err => {
          console.log(err);
        });
    },
    inputFocus() {
      this.add_show = false;
    },
    add() {
      this.add_show = true;
    },
    getUrl(data) {
      console.log(data);
      console.log(this.direction);
      let photo=data.join('');
      console.log(photo);
      let postdata = {
        user_id: sessionStorage.getItem("user_id"),
        adviser_id: sessionStorage.getItem("adviser_id"),
        chat_photo: photo,
        add_time: new Date().getTime(),
        order_sn: sessionStorage.getItem("order_sn"),
        direction: this.direction
      };
      api.saveUserChat(postdata).then(res => {
          console.log(res);
          this.text = "";
          Bus.$emit("query");
          data.splice(0);
      }).catch(err => {
          console.log(err);
      });
    }
  },
  mounted() {},
  components: {
    Upload
  }
};
</script>
<style scoped>
.shadow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000000;
  
}
.footer {
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  z-index: 10;
}
.hei {
  height: 5rem;
}
.footer .chat {
  position: relative;
  top: 5%;
}
.footer .add_box {
  position: relative;
  top: 20%;
}
.voice,
.biaoqing,
.tianjia {
  display: block;
  float: left;
  width: 15%;
  text-align: center;
  font-size: 0.7rem;
  position: absolute;
  top: 50%;
  /* transform:translateY(-50%); */
}
.biaoqing {
  left: 70%;
}
.tianjia {
  left: 85%;
}
.text {
  border-bottom: 1px solid #ccc;
  font-size: 0.25rem;
  padding: 0.2rem;
  display: block;
  float: left;
  width: 55%;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 15%;
  /* transform:translateY(-50%); */
}
.huanyuan {
  transform: translateY(-50%);
}
.btn {
  display: block;
  float: left;
  width: 13%;
  box-sizing: border-box;
  padding: 0.2rem;
  position: absolute;
  top: 50%;
  /* transform:translateY(-50%); */
  left: 85%;
  margin-right: 2%;
  background: #ff5370;
  color: #fff;
}
</style>


