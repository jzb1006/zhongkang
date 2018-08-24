<template>
    <div id="upload">
        <span class="tishi">
            <form id="form1" enctype="multipart/form-data">
                <input type="file" name="sf_upfile" @change="changeFile($event)" class="position-absolute upfile btn btn-sm btn-outline-info">{{title}}
            </form>
        </span>
        <fileShow :file-url="fileUrls" :init-files="initFiles"></fileShow>
    </div>
</template>

<script>
import apiUp from "@/api/upload";
import Bus from "./../../assets/bus.js";
import fileShow from "@/components/public/fileShow.vue";
import Loading from "@/widget/loading";
export default {
    props: ["img-max-num", "video-max-num", "file-type","title"],
    data() {
        return {
            fileUrls: [],
            initFiles: [],
            // imgMaxNum:3,
            // videoMaxNum:1,
            // fileType:2,// 1：只是图片 2：只是视频 3：图片，视频混合
            fileTypeTip: [
                "文件类型只支持 jpg, jpeg, gif 格式的图片",
                "文件类型只支持 MP4 格式的视频",
                "文件类型支持 jpg,jpeg,gif和MP4"
            ],
        };
    },
    components: {
        fileShow
    },
    methods: {
        //文件上传
        changeFile: function(e) {
            Loading.run();
            var self = this;
            if (this.limit(e.target.files[0].type)) {
                if (this.examinationFormat(e.target.files[0].type)) {
                    var formData = new FormData();
                    formData.append("sf_upfile", e.target.files[0]);
                    apiUp.ajaxUpload(formData).then(res => {
                        console.log(res.data);
                        self.fileUrls.push(res.data);
                        this.toParent();
                        Loading.stop();
                    });
                } else {
                    alert(this.fileTypeTip[this.fileType - 1]);
                }
            }
        },
        toParent() {
            this.$emit("changeUrls", this.fileUrls);
        },
        //文件支持上传的格式
        examinationFormat(fileURL) {
            let right_type = this.changeFileType();

            let right_typeLen = right_type.length;
            let imgUrl = fileURL.toLowerCase();
            let postfixLen = imgUrl.length;
            let len3 = imgUrl.substring(postfixLen - 3, postfixLen);
            let len4 = imgUrl.substring(postfixLen - 4, postfixLen);

            for (let i = 0; i < right_typeLen; i++) {
                if (len3 == right_type[i] || len4 == right_type[i]) {
                    return true;
                }
            }
            Loading.stop();
            return false;
        },
        //限制文件的数目
        limit(data) {
            var imgUrl = [];
            var videoUrl = [];

            for (let index in this.fileUrls) {
                if (this.checkImgType(this.fileUrls[index])) {
                    imgUrl.push(this.fileUrls[index]);
                } else {
                    videoUrl.push(this.fileUrls[index]);
                }
            }
            if (this.checkFileType(data)) {
                if (imgUrl.length >= this.imgMaxNum) {
                    alert("最多上传" + this.imgMaxNum + "张图片！！");
                    Loading.stop();
                    return false;
                }
            } else {
                if (videoUrl.length >= this.videoMaxNum) {
                    alert("最多上传" + this.videoMaxNum + "个视频！！");
                    Loading.stop();
                    return false;
                }
            }
            return true;
        },
        //文件上传的格式(fileURL 文件的路径)
        checkImgType: function(fileURL) {
            let right_type = new Array(".jpg", ".jpeg", ".mp4", ".gif");
            let right_typeLen = right_type.length;
            let imgUrl = fileURL.toLowerCase();
            let postfixLen = imgUrl.length;
            let len4 = imgUrl.substring(postfixLen - 4, postfixLen);
            let len5 = imgUrl.substring(postfixLen - 5, postfixLen);
            for (let i = 0; i < right_typeLen; i++) {
                if (len4 == right_type[i] || len5 == right_type[i]) {
                    if (len4 == ".mp4") {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        //文件上传的格式(fileURL 文件的类型)
        checkFileType: function(fileURL) {
            let right_type = new Array("jpg", "jpeg", "mp4", "gif");
            let right_typeLen = right_type.length;
            let imgUrl = fileURL.toLowerCase();
            let postfixLen = imgUrl.length;
            let len3 = imgUrl.substring(postfixLen - 3, postfixLen);
            let len4 = imgUrl.substring(postfixLen - 4, postfixLen);
            for (let i = 0; i < right_typeLen; i++) {
                if (len3 == right_type[i] || len4 == right_type[i]) {
                    if (len3 == "mp4") {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        //改变选择的范围
        changeFileType() {
            // 1：只是图片 2：只是视频 3：图片，视频混合
            let fanwei = [];
            if (this.fileType == 1) {
                return new Array("jpg", "jpeg", "gif");
            } else if (this.fileType == 2) {
                return (fanwei = new Array("mp4"));
            } else {
                return (fanwei = new Array("jpg", "jpeg", "mp4", "gif"));
            }
        }
    },
    mounted() {
        Bus.$on("initImg", res => {
            this.fileUrls = res;
            this.initFiles = JSON.parse(JSON.stringify(this.fileUrls));
            this.toParent();
        });
    }
};
</script>

<style scoped>
#upload {
    position: relative;
    font-size: .4rem;
    text-align: center;
}
#upload .tishi{
    display: inline-block;
    padding: .1rem .2rem;
    font-size: .35rem;
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
</style>


