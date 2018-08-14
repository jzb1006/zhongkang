import {ajax,qs,img_prifix} from '../ajax';
export default {

    //搜索
    ajaxSearch(module = 'index',params={}){
        console.log(params);
        return ajax.get(`search.php?action=${module}`, {params});
    },

    //获取文章：
    ajaxProduct(params={}){
        // params = qs.stringify(params);
        return ajax.get(`product.php`,{params});
    },

    //相片网址前缀
    imgUrl(){
        return img_prifix;
    }
    
}