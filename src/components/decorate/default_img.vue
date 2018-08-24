<template>
    <div id="default_img">
        <img alt="" :src="imgUrl(imgPath)" lazy="loaded">
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
        }
    }
</script>
<style scoped>
    #default_img img {
        width: 100%;
        min-height: 100%;
        border-radius: 999px;
    }
</style>