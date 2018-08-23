import {ajax,qs,img_prifix} from '../ajax';
export default {
    //首页
    index(params={}){
        // console.log()hospital.php?action=ins_home&id=0000000012&num_list=1&ins_id=12
       return ajax.get('index.php',{params})
    }, 
    //医生列表
    get_doctor_list(params={}){
        return ajax.get('hospital.php?action=doctor_list',{params})
    },
     //医院列表
     institution_list(params={}){
        return ajax.get('hospital.php?action=institution_list',{params})
    },
    //图片前缀
    imgPrifix(){
       return img_prifix;
    }
}