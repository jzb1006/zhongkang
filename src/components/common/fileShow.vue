<template>
    <div id="fileShow">
        <div class="media_list">
            <div class="wrapper" v-for="url in fileUrl" v-if="checkImgType(url)">
                <span class="del" @click="delFile(url)">x</span>
                <img :src="getFileUrl()+url">
            </div>
            <div class="wrapper" v-else>
                <span class="del" @click="delFile(url)">x</span>
                <video :src="getFileUrl()+url" controls="controls"></video>
            </div>
        </div>
    </div>
</template>
<script>
import apiUp from '@/api/upload'
// import Loading from '@/widget/loading'

export default {
    props:['file-url'],
    data(){
        return {
            mediaList:[],            
        }
    },
    methods:{
        checkImgType:function (fileURL){
            var right_type=new Array(".jpg",".jpeg",".mp4",".gif");
            var right_typeLen=right_type.length;
            var imgUrl=fileURL.toLowerCase();
            var postfixLen=imgUrl.length;
            var len4=imgUrl.substring(postfixLen-4,postfixLen);
            var len5=imgUrl.substring(postfixLen-5,postfixLen);
            for (let i=0;i<right_typeLen;i++){
                if((len4==right_type[i])||(len5==right_type[i])){
                    if(len4 == '.mp4'){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        },
        getFileUrl(){
            return apiUp.imgUrl();
        },
        delFile(data){
            var self = this;
            apiUp.ajaxDelFile("del",{"files":data}).then(
                res=>{
                    for(let index in self.fileUrl){
                        if(self.fileUrl[index] == data){
                            self.fileUrl.splice(index,1);
                        }
                    }
                }
            )
        },
        mounted(){
        }
    }
}
</script>
<style scoped>
    .media_list video,img{
			width: 100%;
            height: 100%;
            margin:.5rem 0;
    }
    .media_list .wrapper{
        position: relative;
    }
    .media_list .wrapper span.del{
        position:absolute;
        top: .5rem;
        right: .5rem;
        padding:.3rem;
        color: #fff;
        border-radius: 1rem;
        z-index: 9999;
        background-color: rgba(0, 0, 0, .5)
    }
</style>
