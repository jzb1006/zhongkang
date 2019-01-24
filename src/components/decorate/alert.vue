<template>
    <div id="alert">
        <Toast v-model="Showing" :type="alerttType" :time="2000" width="3rem" isShowMask>
            <div class="alert_mag">
                {{alertText}}
            </div>
        </Toast>
    </div>
</template>
<script>
import { Toast } from "vux";
import { setTimeout } from "timers";
export default {
  props: {
    Show: {
      type: Boolean,
      default: false
    },
    alerttType: {
      type: String,
      default: "success"
    },
    alertText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      Showing: this.Show
    };
  },
  watch: {
    Show(val, oldVal) {
      this.Showing = val;
    },
    Showing(val, oldVal) {
      this.$emit("update:Show", val);
    },
    
  },
  components: {
    Toast
  }
};
</script>
<style>
#alert .weui-toast {
  min-height: auto!important;
  /* min-height: 1.5rem !important; */
  /* top: 50% !important; */
}
/* .alert_mag {
  font-size: 0.3rem;
} */
</style>