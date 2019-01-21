import {ajax,qs,img_prifix} from './../ajax'
export default{
    add_complaint(params={}){
        params=qs.stringify(params);
        return ajax.post('complaints.php',params);
    },
    get_complaint_options(params={}){
        return ajax.get('complaints.php?action=get_complain_options',{params});
    },
    //相片网址前缀
    imgUrl(){
        return img_prifix;
    }
}