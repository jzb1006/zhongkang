import {ajax2,ajax3,qs,img_prifix, ajax} from './../ajax'

export default{
    //文件网址前缀
    fileUrl(){
        return img_prifix;
    },
    material(module = '',params={}){
        params = qs.stringify(params);
        return ajax3.post(`material.php?action=${module}`,params);
    },
    act_material(module = "",params={}){        
        return ajax.get(`material.php?act=${module}`,{params});
    }
}