<template>
    <div id="upload">
        <div class="upload_wrapper">
            <span class="zk-icon-jia add"></span>
            <input type="file" id="file" name="sf_upfile" @change="handleSuccess($event)" :accept="accept_type[acceptTypeNum]">
        </div>
    </div>
</template>

<script>
import apiUp from "@/api/upload";
export default {
    name: "upload",
    props: {
        filelist1: {
            type: Array,
            default: function() {
                return [];
            }
        },
        acceptTypeNum: {
            default: 0
        }
    },
    watch: {
        filelist1(val, oldval) {
            this.fileList = val;
        },
        fileList(val,oldVal){
            console.log(val);
        }
    },
    data() {
        return {
            fileList: this.filelist1,
            accept_type: ["", "image/*", "video/mp4"]
        };
    },
    methods: {
        handleSuccess(data) {
            let file = document.getElementById("file").files[0];
            if (
                document.getElementById("file").files[0] &&
                this.checkImgType(file.name)
            ) {
                var formData = new FormData();
                formData.append("sf_upfile", file);
                var self = this;
                apiUp.ajaxUpload(formData).then(res => {
                    if (this.checkImgType) {
                        self.fileList.push({ alt: "", url: res.data });
                        this.$emit("getFileList", self.fileList);
                    }
                });
            }
        },
        checkImgType(fileURL) {
            let fan = "";

            var right_type = new Array(".jpg", ".png", ".jpeg", ".mp4", ".gif");
            var right_typeLen = right_type.length;
            var imgUrl = fileURL.toLowerCase();
            var postfixLen = imgUrl.length;
            var len4 = imgUrl.substring(postfixLen - 4, postfixLen);
            var len5 = imgUrl.substring(postfixLen - 5, postfixLen);

            for (let i = 0; i < right_typeLen; i++) {
                if (len4 == right_type[i] || len5 == right_type[i]) {
                    if (len4 == ".mp4") {
                        fan = "2";
                    } else {
                        fan = "1";
                    }
                }
            }

            if (fan) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style scoped>
#upload {
    position: relative;
}
#upload .upload_wrapper {
    height: 2.2rem;
}
#upload .upload_wrapper input {
    width: 100%;
    height: 2.2rem;
    opacity: 0;
}
#upload .upload_wrapper .add {
    position: absolute;
    font-size: 1rem;
    color: #ccc;
    top: 50%;
    left: 50%;
    margin-top: -0.5rem;
    margin-left: -0.5rem;
}
</style>
