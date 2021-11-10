/*登陆
* */
import qs from 'qs'
import {post} from '@/request/http.js'
//登陆注册
export function login(query) {
    return post('/author/login', qs.stringify(query))
    .then((response) => {
        if(response.flag){
            return response.data
        }
    })
}
//gooles登陆注册
export function gooleLogin(query) {
    return post('/author/google', qs.stringify(query))
    .then((response) => {
        if(response.flag){
            return response.data
        }
    })
}
// 中文手机登录
export function loginSms(query) {
  return post('/author/loginDomestic', qs.stringify(query))
    .then((response) => {
        return response
    })
}