import {ajax,qs,img_prifix} from '../ajax';
export default {
    //添加购物车
    addCard(param){
        return ajax.post(`ajax.php?action=addcart`, qs.stringify(param))
    },

    //获取购物车商品
    mycard(){
       return ajax.get(`mycart.php?type=checkout`)
    },
    //改变价格
    change_money(param){
        return ajax.post('mycart.php?action=ajax_change_price', qs.stringify(param));
    },
    //提交订单
    add_order(params){
       return ajax.post('mycart.php?type=confirm',qs.stringify(params))
    },
    //进入支付页面
    pay(params={}){
        console.log(params);
        return ajax.get(`mycart.php?type=pay2`,{params});
        // return ajax.get(``,{param});
    },
    //快速支付：
    fastpay(params={}){
      console.log(params);
      return ajax.get('mycart.php?type=fastpay2',{params});
    },
     //相片网址前缀
     imgUrl(){
        return img_prifix;
    }
}