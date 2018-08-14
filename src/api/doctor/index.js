import {ajax,qs,img_prifix} from '../ajax';
export default {
    //医生列表
    get_doctor_list(params={}){
      return ajax.get('hospital.php?action=ins_doc_team',{params})
    },
    doc_home(params={}){
       return ajax.get('hospital.php?action=doc_home',{params})
    },
    //医生相册
    doc_img(params={}){
      // hospital.php?action=get_doc_photo
      return ajax.get('hospital.php?action=get_doc_honor',{params})
    },
    //图片前缀
    imgPrifix(){
      return img_prifix;
    }
}