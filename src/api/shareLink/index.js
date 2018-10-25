import {
  ajax5,
  qs,
  img_prifix
} from '../ajax';
export default {
  //搜索
  shareSDK( params = {}) {
    return ajax5.get(`wx_ready.php`, {
      params
    });
  }
}
