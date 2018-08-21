<template>
    <div id="upload">
        <span class="btn btn-sm btn-outline-info position-relative span">
        <form id="form1" enctype="multipart/form-data">
            <input type="file" name="sf_upfile" @change="changeFile($event)" class="position-absolute upfile btn btn-sm btn-outline-info"><slot></slot>
        </form>
        </span>
        <fileShow :file-url="fileUrls" v-if="sign!='headimg'"></fileShow>
    </div>
</template>

<script>
import apiUp from '@/api/upload'
// import Bus from './../../assets/bus.js';
import {mapState,mapGetters} from 'vuex'
import fileShow from '@/components/common/fileShow.vue'
export default {
    props:['img-max-num','video-max-num','file-type','sign'],
    data(){
        return{
            fileUrls:[],
            // imgMaxNum:3,
            // videoMaxNum:1,
            // fileType:2,// 1：只是图片 2：只是视频 3：图片，视频混合
            fileTypeTip:['文件类型只支持 jpg jpeg gif 图片','文件类型只支持 MP4 视频','文件类型支持 jpg jpeg gif MP4']
        }
    },
    components:{
        fileShow,
    },
    methods:{
        //文件上传
        changeFile:function(e){
            var self = this;
            console.log(e.target.files[0]);
            if(e.target.files[0].size>3145728){
                alert("图片大小不能超过3mb");
                return false;
            }

            if(self.sign=='headimg'){
                console.log('qingkong');
                self.fileUrls=[];
            }
            if(this.limit(e.target.files[0].type)){
                if(this.examinationFormat(e.target.files[0].type)){
                    var formData = new FormData();
                    formData.append("sf_upfile",e.target.files[0]);
                    apiUp.ajaxUpload(formData).then(
                        res=>{
                            self.fileUrls.push(res.data);
                            this.toParent();
                        }
                    )
                }else{
                    alert(this.fileTypeTip[this.fileType-1]);
                }
            }    
        },
        //删除文件
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
        toParent(){
            this.bus.$emit("changeUrls",this.fileUrls);
            console.log(this.fileUrls);
        },
        //文件支持上传的格式
        examinationFormat(fileURL){
            let right_type = this.changeFileType();

            let right_typeLen=right_type.length;
            let imgUrl=fileURL.toLowerCase();
            let postfixLen=imgUrl.length;
            let len3=imgUrl.substring(postfixLen-3,postfixLen);
            let len4=imgUrl.substring(postfixLen-4,postfixLen);

            for (let i=0;i<right_typeLen;i++){
                if((len3==right_type[i])||(len4==right_type[i])){
                    return true;
                }
            }
            return false;
        },
        //限制文件的数目
        limit(data){
            var imgUrl = [];
            var videoUrl = [];

            for(let index in this.fileUrls){
                if(this.checkImgType(this.fileUrls[index])){
                    imgUrl.push(this.fileUrls[index]);
                }else{
                    videoUrl.push(this.fileUrls[index]);
                }
            }
            if(this.checkFileType(data)){
                if(imgUrl.length >= this.imgMaxNum){
                    alert("最多上传"+this.imgMaxNum+"张图片！！");
                    return false;
                }
            }else{
                if(videoUrl.length >= this.videoMaxNum){
                    alert("最多上传"+this.videoMaxNum+"个视频！！");
                    return false;
                }
            }
            return true;
        },
        //文件上传的格式(fileURL 文件的路径)
        checkImgType:function (fileURL){
            let right_type=new Array(".jpg",".jpeg",".mp4",".gif");
            let right_typeLen=right_type.length;
            let imgUrl=fileURL.toLowerCase();
            let postfixLen=imgUrl.length;
            let len4=imgUrl.substring(postfixLen-4,postfixLen);
            let len5=imgUrl.substring(postfixLen-5,postfixLen);
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
        //文件上传的格式(fileURL 文件的类型)
        checkFileType:function (fileURL){
            let right_type=new Array("jpg","jpeg","mp4","gif");
            let right_typeLen=right_type.length;
            let imgUrl=fileURL.toLowerCase();
            let postfixLen=imgUrl.length;
            let len3=imgUrl.substring(postfixLen-3,postfixLen);
            let len4=imgUrl.substring(postfixLen-4,postfixLen);
            for (let i=0;i<right_typeLen;i++){
                if((len3==right_type[i])||(len4==right_type[i])){
                    if(len3 == 'mp4'){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        },
        //改变选择的范围
        changeFileType(){
            // 1：只是图片 2：只是视频 3：图片，视频混合
            let fanwei = [];
            if(this.fileType == 1){
                return new Array("jpg","jpeg","gif");
            }else if(this.fileType == 2){
                return fanwei = new Array("mp4");
            }else{
                return fanwei = new Array("jpg","jpeg","mp4","gif");
            }
        }
    },
    computed:{
        ...mapState({
          bus:state=>state.user.bus
        })
    },
    mounted(){
    }
}
</script>

<style scoped>
    /*#upload{
        display: inline;
    }*/
/*    .position-relative{
        display:inline;
        padding: 4px 10px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #999;
        text-decoration: none;
        color: #666;
        width:3.1rem;
        font-size: .35rem;
        float:right;
    }*/
    /*#form1{
        /*position: relative;*/
        /*display: inline;
        border: 1px solid #ccc;
        padding:20px;}*/
    #upload {
    position: relative;
    font-size: .4rem;
    text-align: center;
    }
    #upload .tishi{
    display: inline-block;
    padding: .1rem .2rem;
    border: 1px solid rgb(255, 83, 112);
    }
    input.upfile {
    position: absolute;
    height: .6rem;
    width: 3.5rem;
    opacity: 0;
    left: 2rem;
    top: 0;
    }
    /* .upfile{
        position: absolute;
        width:3.1rem;
        height: 2rem;
        opacity:0;
        left:-.1rem;
        top:-.1rem;
    } */
</style>


