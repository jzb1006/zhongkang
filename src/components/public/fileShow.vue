<template>
    <div id="fileShow">
        <div class="media_list">
            <div class="wrapper" v-for="url in fileUrl" v-if="checkImgType(url)">
                <span class="del" @click="delFile(url)"><i class="zk-icon-guanbi"></i></span>
                <img :src="getFileUrl()+url">
            </div>
            <div class="wrapper" v-else>
                <span class="del" @click="delFile(url)"><i class="zk-icon-guanbi"></i></span>
                <video :src="getFileUrl()+url" controls="controls"></video>
            </div>
        </div>
    </div>
</template>
<script>
import apiUp from "@/api/upload";

export default {
    props: ["file-url", "init-files"],
    data() {
        return {
            mediaList: [],
        };
    },
    methods: {
        checkImgType: function(files) {
            var right_type = new Array(".jpg", ".jpeg", ".mp4", ".gif");
            var right_typeLen = right_type.length;
            var imgUrl = files.toLowerCase();
            var postfixLen = imgUrl.length;
            var len4 = imgUrl.substring(postfixLen - 4, postfixLen);
            var len5 = imgUrl.substring(postfixLen - 5, postfixLen);
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
        getFileUrl() {
            return apiUp.fileUrl();
        },
        delFile(data) {
            var self = this;
            if (this.pdMedia(data)) {
                let formData = {
                    files: data
                };
                apiUp.ajaxDelFile("del", formData).then(res => {
                    for (let index in self.fileUrl) {
                        if (self.fileUrl[index] == data) {
                            self.fileUrl.splice(index, 1);
                        }
                    }
                });
            } else {
                for (let index in self.fileUrl) {
                    if (self.fileUrl[index] == data) {
                        self.fileUrl.splice(index, 1);
                    }
                }
            }
        },
        pdMedia(data) {
            for (let index in this.initFiles) {
                if (this.initFiles[index] == data) {
                    return false;
                }
            }
            return true;
        }
    },
    mounted() {}
};
</script>
<style scoped>
.media_list video,
img {
    width: 100%;
    height: 100%;
    margin: 0.1rem 0;
}
.media_list .wrapper {
    position: relative;
    padding: 0 .2rem;
}
.media_list .wrapper span.del {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.2rem;
    color: #fff;
    border-radius: 1rem;
    z-index: 111;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
