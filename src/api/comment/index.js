import {ajax,ajax4,qs,img_prifix} from './../ajax';
import Axios from 'axios';
export default {

    //搜索所有
    ajaxSearch(module = 'index',params={}){
        return ajax.get(`getcomment.php?action=${module}`, {params});
    },

    addComment(params={}){
        console.log(params);
        params = qs.stringify(params);
    	ajax4.post('wordpress/wordpress/wp-comments-post.php', params);
    },

    //相片网址前缀
    imgUrl(){
        return img_prifix
    },
}