import {ajax3,qs} from './../ajax';
export default {

    //搜索所有
    ajaxSearch(module = 'index',params={}){
        return ajax3.get(`hospital_guide.php?action=${module}`, {params});
    },
    ajaxPost(module = 'index',params={}){
    	params = qs.stringify(params);
        return ajax3.post(`hospital_guide.php?action=${module}`, params);
    },

    //相片网址前缀
    imgUrl(){
        return "http://localhost/"
    }
}