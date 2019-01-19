import Axios from 'axios';
import router from '@/router';
import store from '@/store';
//添加QS是post请求的时候前端参数转换，为了解决后端接收不到post数据的问题。
import Qs from 'qs';
const timeOut = 3000;
export const ajax = Axios.create({
  baseURL: 'http://192.168.0.118/m/',
  //增加这个是为了解决后端接收不到post数据的问题。
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true,
  timeout: timeOut,
})

export const ajax2 = Axios.create({
  baseURL: 'http://192.168.0.118/m/',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  timeout: timeOut,
})

export const ajax3 = Axios.create({
  baseURL: '/m/',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  timeout: timeOut,
})

export const ajax4 = Axios.create({ 
  baseURL: 'http://192.168.0.118/m',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  timeout: timeOut,
})

export const ajax5 = Axios.create({
  baseURL: 'http://192.168.0.118/',
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  timeout: timeOut,
})

export const ajax6 = Axios.create({
  baseURL: 'http://192.168.0.118/m',
    headers: {
    'Content-Type': 'multipart/form-data'
  },
  timeout: timeOut,
})

export const qs = Qs;

//相片网址前缀

export const img_prifix = "http://192.168.0.116/zhongkang/"

//拦截器
ajax.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.headers.token){
     store.dispatch("saveToken",response.headers.token);
  }
 
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status==402){
    // alert('请先登录');
    router.push({name: "container",query:{id:'28'}})
  }
  // return false;
  return Promise.reject(error);
});

export default ajax;
