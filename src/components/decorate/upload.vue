<template>
    <div id="upload">
        <span class="btn btn-sm btn-outline-info position-relative">
        <form id="form1" enctype="multipart/form-data">
            <input type="file" name="sf_upfile" @change="changeImage($event)" class="position-absolute upfile btn btn-sm btn-outline-info">添加图片或者视频
        </form>
        </span>
    </div>
</template>

<script>
import apiUp from '../../api/upload'
export default {
    data(){
        return{
            fileUrls:[],
        }
    },
    methods:{
        changeImage:function(e){
            var self = this;
            var formData = new FormData();
            formData.append("sf_upfile",e.target.files[0]);
            apiUp.ajaxUpload(formData).then(
                res=>{
                    self.fileUrls.push(res.data);
                    // console.log(self.fileUrls);
                    self.$emit('imgPath',self.fileUrls);
                }
            )
        },
        delFile(data){
            var self = this;
            apiUp.ajaxDelFile("del",{"files":data}).then(
                res=>{
                    for(let index in self.fileUrls){
                        if(self.fileUrls[index] == data){
                            self.fileUrls.splice(index,1);
                        }
                    }
                }
            )
        },
    }
}
</script>

<style scoped>
        input.upfile{
        width:8.1rem;
        height: 2rem;
        opacity:0;
        left:-.1rem;
        top:-.1rem;
    }
</style>


