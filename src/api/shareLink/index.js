import {
  ajax3,
} from '../ajax';
export default {
  //搜索
  shareSDK( params = {}) {
    return ajax3.get(`wx_jssdk/wx_ready.php`, {
      params
    });
  }
}
