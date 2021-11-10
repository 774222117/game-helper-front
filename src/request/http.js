import axios from 'axios';
import store from '@/store'
import {setStore,getStore,removeStore} from '@/utils/storage.js'
// import qs from 'qs';
// axios.defaults.withCredentials=true;//让ajax携带cookie
axios.defaults.timeout = 5000;
axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/json';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    // config.data = JSON.stringify(config.data);  不能要  为需要fromData  qs了
    // if(config.method == 'post'){
    //   config.headers['Content-Type'] = "application/json" ;//换个请求头  因为需要fromData
    // }else{
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // }
    
    config.cancelToken = new axios.CancelToken(function (cancel) {
      store.commit('pushToken', {cancelToken: cancel})
    })
  
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// axios.interceptors.response.use(
//   response => {
//       console.log(response,'打印返回值 测试取消请求')
//       return response;
//   },
//   error => {
//       console.log(error,'打印错误值 测试取消请求')
//       return Promise.reject(error);
//   }
// );

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    if(url !== '/author/loginDomestic'){  //判断登录接口
      if(store.getters.getLoginCode){
        params['OKF_TOKEN'] = store.getters.getLoginCode.loginCode
      }else{
        params['OKF_TOKEN'] = ''
      }
    }
    // axios.get('https://source.sgsugou.com/app'+url,{
    axios.get( window.onekeyfunDomin + url ,{
      params:params
    })
    .then(response => {
      //判断接口返回的数据是否需要重新登陆
      if(response.data.flag == false && response.data.message == "请重新登陆"){
        removeStore({name:'loginData'})
        removeStore({name:'loginCode'})
        window.location.reload()
      }
     
      resolve(response.data);
    })
    .catch(err => {
      console.log('我出错了啦啦啦啦···········································')
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url  api.onekeyfun.com
 * @param data
 * @returns {Promise}
 */
  
export function post(url,params = {}){
    return new Promise((resolve,reject) => {
      if(url !== '/author/loginDomestic'){  //判断登录接口
        if(store.getters.getLoginCode){
          params['OKF_TOKEN'] = store.getters.getLoginCode.loginCode
        }else{
          params['OKF_TOKEN'] = ''
        }
      }
      // axios.post('https://source.sgsugou.com/app'+url, params)
      axios.post(window.onekeyfunDomin+url, params )
           .then(response => {
            //判断接口返回的数据是否需要重新登陆
            if(response.data.flag == false && response.data.message == "请重新登陆"){
              removeStore({name:'loginData'})
              removeStore({name:'loginCode'})
              window.location.reload()
            }
             resolve(response.data);
           },err => {
             reject(err)
           })
    })
  }
 
  /**
  * 封装patch请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 
 export function patch(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.patch(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }
 
  /**
  * 封装put请求
  * @param url
  * @param data
  * @returns {Promise}
  */
 
 export function put(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.put(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }