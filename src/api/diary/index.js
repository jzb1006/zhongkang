import {ajax,qs,img_prifix} from './../ajax';
export default {

    //搜索所有
    ajaxSearch(module = 'index',params={}){
        return ajax.get(`diary.php?act=${module}`, {params});
    },

    //相片网址前缀
    imgUrl(){
        return img_prifix
    },

    //上传数据
    ajaxSubmit(module = 'index',params={}){
        console.log(params);
        params = qs.stringify(params);
        console.log(params);
        return ajax.post(`diary.php?action=${module}`,params)
    }
}