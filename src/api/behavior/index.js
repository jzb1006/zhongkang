import {ajax,qs,img_prifix} from '../ajax';
export default {
   behavior(params={}){
       console.log(params);
       return ajax.get('behavior.php?act=behavior',{params})
   }
}