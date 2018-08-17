import {ajax2,ajax3,qs} from './../ajax'
export default {

    //图片上传
    ajaxUpload(params){
        console.log(params);
        return ajax2.post('upload4.php', params);
    },
    //文件网址前缀
    fileUrl(){
        return "http://localhost/"
    },
    // //删除图片或者视频
    // ajaxDelFile(module = 'del',params={}){
    //     params = qs.stringify(params);
    //     return Axios.post(`/m/upload4.php?action=${module}`,params);
    // },
    //删除图片或者视频
    ajaxDelFile(module = 'del',params={}){
        params = qs.stringify(params);
        return ajax3.post(`upload4.php?action=${module}`,params);
    }

}