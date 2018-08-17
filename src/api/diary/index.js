import {ajax,qs} from './../ajax';
export default {

    //搜索所有
    ajaxSearch(module = 'index',params={}){
        return ajax.get(`diary.php?act=${module}`, {params});
    },

    //相片网址前缀
    imgUrl(){
        return "http://localhost/"
    },

    //上传数据
    ajaxSubmit(module = 'index',params={}){
        params = qs.stringify(params);
        return ajax.post(`diary.php?action=${module}`,params)
    }
}