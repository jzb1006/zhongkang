import {ajax,qs} from '../ajax';
export default {
    //用户登录
    login(params){
        // console.log()
       return ajax.post('user.php?action=ajax_user_login',qs.stringify(params))
    },
    //确认用户登录状态
    checkLogin(){
        return ajax.get('user.php?act=checkLogin');
    }
}