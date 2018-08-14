<template>
    <div id="alert">
        <Toast v-model="Show" :type="alerttType" :time="2000" width="3rem" isShowMask>
            <div class="alert_mag">
                {{alertText}}
            </div>
        </Toast>
    </div>
</template>
<script>
 import {
        Toast
    } from "vux";
    export default {
        data(){
          return{
              Showing:this.Show
          }
        },
        props:{
          Show:{
              type:Boolean,
              default:false
          },
          alerttType:{
              type:String,
              default:'success'
          },
         alertText:{
             type:String,
             default:''
         }
        },
        components:{
            Toast
        },
    }
</script>
<style>
    .weui-toast {
        min-height: 1.5rem!important;
        top: 50%!important;
    }
    .alert_mag {
        font-size: 0.3rem;
    }
</style>