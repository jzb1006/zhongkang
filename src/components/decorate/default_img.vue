<template>
    <div>
        <img alt="" :src="imgUrl(imgPath)" v-bind:style="styles" lazy="loaded">
    </div>
</template>
<script>
    import api from "../../api/search";
    import defaultUrl from '@/assets/img/default/doctor_default.png'
    export default {
        data(){
          return{
              defaultUrl:defaultUrl
          }
        },
        props: {
            imgPath: {
                // type: [String,Object],
                required: true
            },
            styles:{
                default:()=>{
                    return{
                    width: '100%',
                    height: '1rem',
                    borderRadius: '999px'
                }
              }
            }
        },
        methods: {
            getImgUrl() {
                return api.imgUrl();
            },
            imgUrl(imgPath){
                if(imgPath=='' || imgPath==null ||imgPath==undefined){
                   return imgPath = this.defaultUrl;
                }
                return this.getImgUrl()+imgPath;
            }
        },
    }
</script>
<style scoped>
   
</style>