import {ajax,qs,img_prifix} from '../ajax';
export default {

    //商品列表
    orderList(params={}){
        console.log(params);
        return ajax.get(`product.php?action=product_list`, {params});
    },
    //相片网址前缀
    imgUrl(){
        return img_prifix;
    }
    
}