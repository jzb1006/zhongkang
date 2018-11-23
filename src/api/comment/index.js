import {ajax,ajax2,ajax4,ajax5,qs,img_prifix} from './../ajax';
import Axios from 'axios';
export default {

    //搜索所有
    ajaxSearch(module = 'index',params={}){
        return ajax.get(`getcomment.php?action=${module}`, {params});
    },

    addComment(params={}){
        console.log(params);
        params = qs.stringify(params);
        return ajax5.post('wordpress/wordpress/wp-comments-post.php', params);
    },

    //相片网址前缀
    imgUrl(){
        return img_prifix
    },
}