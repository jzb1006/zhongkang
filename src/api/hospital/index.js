import {ajax,qs,img_prifix} from '../ajax';
export default {
    //医院详情
    detail(params={}){
        // console.log()hospital.php?action=ins_home&id=0000000012&num_list=1&ins_id=12
       return ajax.get('hospital.php?action=ins_home',{params})
    },
    get_licence(params={}){
        return ajax.get('hospital.php?action=get_ins_licence',{params})
    },
    //获取医院相册
    get_ins_photo(params={}){
        return ajax.get('hospital.php?action=get_ins_picture',{params})
    },
    //搜索所有
    ajaxSearch(module = 'index',params={}){
        return ajax.get(`hospital.php?action=${module}`, {params});
    },
    
    //图片前缀
    imgPrifix(){
      return img_prifix;
    }
}