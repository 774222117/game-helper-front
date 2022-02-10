/*页面间跳转方法
 *   import JumpTo from '@/utils/jumpTo';
 *  JumpTo(0,{name:'123',id:1});
* */
//引入路由配置模块
import Router from '@/router';
//路径
const routerList = {
    //首页
    0:'/',
    // 全部游戏
    1:'/allGame',
    //详情
    2:'/gameDetails',
    //我的游戏
    3:'/myGame',
    //订单列表
    4:'/orderList',
    //订单
    5:'/order',
    //注册
    6:'/register',
    //活动预告
    7:'activity',
    //活动正文
    8:'activityMain',
    //十一活动
    9:'/elevenActivity',
    //新春活动
    21:'/newYear',
    // 新春转盘活动
    22:'/luckNewYear',
    // 2021国庆活动
    23:'/NationalDay',
    // 2022新年折扣活动
    24:'/discountNewYear',
    //404
    404:'/err404',
    //500
    500:'/err500'

};
//传参反序列化
function deserializeParam(options){
    let _result = '';
    switch (typeof options){
        case 'object':
            let _arr = [];
            for(let index in options){
                _arr.push(index+'='+options[index]);
            }
            _result = _arr.join('&');
            break;
        case 'string':
            _result = options;
            break;
        default:
    }
    return _result;
}
export default function (url,options,type) {
    let jumpUrl = '/',_oldPath = Router.app.$route.fullPath;
    if(url>=0){
        let _url = routerList[url];
        if(url == 11){
            let _kw = options.kw;
            if(_kw){
                jumpUrl = _url+'/'+_kw;
            }else {
                console && console.log('搜索关键词不能为空');
                return;
            }
        }else {
            let _options = deserializeParam(options),
                _params = _options ? '?'+_options : '';
            jumpUrl = _url+_params;
        }
    }
    //跳转 重复跳转静默失效
    if(_oldPath != jumpUrl){
        if(type){
            let _host = location.href.split('#')[0]+'#'+jumpUrl;
            window.open(_host)
        }else{
            Router.push(jumpUrl);
        }
    }else{
        console && console.log('from: '+Router.app.$route.fullPath+' to: '+jumpUrl+' 重复跳转');
    }
}
