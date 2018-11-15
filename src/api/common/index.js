import {ajax,qs,img_prifix,ajax6} from './../ajax';
export default {

    //搜索所有
    ajaxSearch(name = '',module = 'index',params={}){
        return ajax6.get(`${name}.php?act=${module}`, {params});
    },

    //相片网址前缀
    imgUrl(){
        return img_prifix
    },

    //上传数据
    ajaxSubmit(name = '',module = 'index',params={}){
        params = qs.stringify(params);
        return ajax.post(`${name}.php?action=${module}`,params)
    }
}