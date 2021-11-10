import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import './assets/icons/index.js'//svg

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'// require styles
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import VueParticles from 'vue-particles'  //粒子特效
Vue.use(VueParticles)

import {post,fetch,patch,put} from './request/http.js'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

// google 先去掉
// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//   clientId: '1070379129719-npo2pcq0g38034m5fj3hkskat8re1g7h.apps.googleusercontent.com',
//   cookiepolicy: 'single_host_origin'
// }
// Vue.use(GAuth, gauthOption)

//导入全局弹框
import macksjs from './assets/mackjs'
Vue.prototype.$confirm= macksjs;

// 加入百度统计
// router.afterEach( ( to, from, next ) => {
//  setTimeout(()=>{
//    var _hmt = _hmt || [];
//    (function() {
//     //每次执行前，先移除上次插入的代码
//     document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?xxxx";
//     hm.id = "baidu_tj"
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
//    })();
//  },0);
// } );
// router.beforeEach((to, from, next) => {
//   if (to.path) {
//     if (window._hmt) {
//       window._hmt.push(['_trackPageview', '/#' + to.fullPath])
//     }
//   }
//   next()
// })
Vue.directive('ga_si', {
  bind(el, binding) {
    el.addEventListener('click', () => {
      // binding.value 拿到 v-ga_si 指令的参数
      console.log(binding.value)
      gtag('event', 'select_item', {
        items: [{
          item_id: binding.value.items.gameInfo.appId,
          item_name: binding.value.items.gameInfo.name,
          promotion_name:binding.value.items.promotion_name,
          creative_slot:binding.value.items.promotion_name
        }],
        'item_list_name': binding.value.items.item_list_name,
        'item_list_id':binding.value.items.item_list_id
      })
    })
  },
  unbind(el) {
    el.removeEventListener('click', () => {})
  }
})
Vue.directive('ga_bc', {
  bind(el, binding) {
      // binding.value 拿到 v-ga_bc 指令的参数
      gtag('event', 'begin_checkout', {
        currency:'CNY',
        items: [{
          item_id: binding.value.items.buyGameInfo.item_id,
          price: binding.value.items.buyGameInfo.price,
          item_variant: binding.value.items.buyGameInfo.item_variant,
          item_name: binding.value.items.buyGameInfo.item_name,
          currency:'CNY',
          quantity:1
        }],
        value:binding.value.items.value
      })
  },
})
Vue.directive('ga_p', {
  bind(el, binding) {
    // binding.value 拿到 v-ga_p 指令的参数
    gtag('event', 'purchase', {
      currency:'CNY',
      items: [{
        item_id: binding.value.items.buyGameInfo.item_id,
        price: binding.value.items.buyGameInfo.price,
        item_variant: binding.value.items.buyGameInfo.item_variant,
        item_name: binding.value.items.buyGameInfo.item_name,
        currency:'CNY',
        quantity:1
      }],
      value:binding.value.items.value
    })
  }
})
Vue.directive('ga_pv', {
  bind(el, binding) {
    gtag('event', 'page_view', {
      'page_title': binding.value.page_title,
    })
  }
})
Vue.directive('ga_vi', {
  bind(el, binding) {
    gtag('event', 'view_item',{items:[{
      'id': binding.value.items.appId,
      'name': binding.value.items.chinaName || binding.value.items.englishName
    }]})
  }
})

new Vue({
  router,
  store,
  created(){
    //判断是否登陆  留个口子在后面可能会使用
    if(!!this.$store.getters.getStorage){
      this.$fetch('/game/blackList',{'phoneNum':this.$store.getters.getStorage.phoneNumber})  //获取黑名单设置
        .then((response) => {
          this.$store.commit('setBlackList', response)
        })
      // console.log('有登陆数据')
      // console.log(this.$store.getters.getStorage)
      // this.$fetch('/people/activity/join')  //登录未参加用户刷新后到活动页面
      //   .then((response) => {
      //     if(response.data == 0){  //未参加
      //       if(window.location.pathname == '/activityMain'){
      //         return
      //       }else{
      //         this.$router.push('/activityMain')
      //       }
      //     }
      //   })
    }else{
      if(window.location.pathname !== '/gameDetails' && window.location.pathname !== '/NationalDay'){
        this.$router.push('/').catch(err => {err})
      }
      // console.log(this.$store.getters.getStorage)
    }
    if(!!window.sendCef){
      window.sendCef("check_auto_run","");
      window.sendCef("get_channel_id","");
    }else{
      // 浏览器打开  设置渠道ID 
      if(window.location.hostname.indexOf('store') >= 0){
        this.$store.commit('setChannelId','BZWEB')
      };
      console.log('没有cef方法 获取不到开机启动')
    }
  },
  mounted (){
    let _this = this;
    window['callNative']=(num,data)=>{
      _this.callNative(num,data)
    }
  },
  methods:{
    callNative(num,data){
      switch (num) {
        case 'openGame':  //打开游戏
          if(window.login_steam){
            window.login_steam(data.peopleId+'', data.gameId+'',data.InjectModel+'');
          }else{
            console.log('打开游戏错误')
          }
          break;
        case 'payment':  //打开支付页面
            if(window.open_payment){
              window.open_payment(data.url+'', data.width+'', data.height+'');
            }else{
              console.log('打开支付窗口错误')
            }
          break;
        case 'openOrder':  //支付成功：success 支付失败：failure
          if(data == 'success'){
            this.$store.commit('isOrderSuccessFun', true)
          }else if(data == 'failure'){
            this.$store.commit('isOrderSuccessFun', false)
          }
          // console.log(this.$store.getters.getOrderSuccess)
          break;
        case 'back':
          console.log('回调了back'+data)
          break;
        case 'arrow':
          
            break;
        case 'glogin_result':  //返回google登陆结果
          this.$store.commit('SET_LOGINDATA',res)
          window.sendCef("glogin_result", "");  //关闭登陆
          this.reload()
          break;
        case 'set_window_max':  //最大化
          window.sendCef("set_window_max", " ");
            break;
        case 'set_window_min':  //最小化
          window.sendCef("set_window_min", " ");
            break;
        case 'close_window':  //关闭
          window.sendCef("close_window",  " ");
            break;
        case 'send_end_game':  //发送结束游戏
          if(!!window.sendCef){
            window.sendCef('end_game', JSON.stringify(data));
          }else{ console.log('没有sendCef方法 无法发送结束游戏') }
              break;
        case 'end_game':  //接收结束游戏
            this.$children[0].$children[1]._data.isInTheGame = 0
              break;
        case 'gamerun_flag':  //接收打开游戏错误或者正确信息  0 错误什么都不干  1 正确 弹出正在玩游戏界面
              if(data == 1){
                this.$store.commit('setOpenGameFun',1)
                // window.testFun()
              }else{
                this.$store.commit('setOpenGameFun',0)
              }
              break;
        case 'check_auto_run':  //接收是否设置开机自启动
              // alert(data + ' --value: 检测结果，“0”，未设置开机自启动；“1”，设置了开机自启动。')
              if(data == 1){
                this.$store.commit('setStartupFun',true)
              }else{
                this.$store.commit('setStartupFun',false)
              }
              break;
        case 'get_channel_id':  //接收渠道id
              // alert('接收小胖的渠道id=  '  +  data)
              this.$store.commit('setChannelId',data)
              break;
        case 'open_xunyou_speed':  //发送 打开加速器
              if(!!window.sendCef){
                window.sendCef('open_xunyou_speed', '')
              }else{ console.log('没有sendCef方法 无法打开加速器') }
              
              break;      
        default:
          console.log(num)
          break;
      }
    },
  },
  
  render: h => h(App)
}).$mount('#app')



