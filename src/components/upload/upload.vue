<template>
    <div id="upload">
        <div class="upload_wrapper">
            <el-upload class="upload-demo" action="/m/upload4.php" name="sf_upfile" :accept="accept_type[acceptTypeNum]" :on-success="handleSuccess" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :on-exceed="handleExceed" :file-list="fileList">
                <span class="el-icon-plus plus"></span>
            </el-upload>
        </div>
    </div>
</template>

<script>
export default {
    name:"upload",
    props: {
        filelist1: {
            type: Array,
            default: function() {
                return [];
            }
        },
        acceptTypeNum:{
            default: 0
        }
    },
    watch: {
        filelist1(val, oldval) {
            this.fileList = val;
        }
    },
    data() {
        return {
            fileList: this.filelist1,
            accept_type:["","image/*","video/mp4"]
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        handleSuccess(response, file, fileList) {
            if (this.checkImgType) {
                this.fileList.push({ alt: file.name, url: file.response });
                this.$emit("getFileList", this.fileList);
            }
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
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
    width: 2.2rem;
    height: 2.2rem;
}
#upload .upload_wrapper {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* border: 1px dashed #d9d9d9; */
    border-radius: 0.1rem;
    cursor: pointer;
    background-color: #e6e6e6;
}
#upload .upload_wrapper .plus {
    position: relative;
    line-height: 2.2rem;
    color: #aaa;
    font-size: 0.8rem;
}
.upload-demo {
    position: absolute;
    width: 100%;
    height: 100%;
    /* left: 50%;
    top: 50%;
    margin-top: -0.4rem;
    margin-left: -0.4rem; */
}
</style>
