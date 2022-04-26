import Vue from 'vue'
import Vuex from 'vuex'
import {setStore,getStore,removeStore} from '@/utils/storage.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    //   存储仓库
    isRouterAlive:true,  //刷新用的 
    loginData: getStore({name:'loginData',type:false}) || '',       //登陆的信息   
    loginCode: getStore({name:'loginCode',type:false}) || '',  //登录后的code  
    isOrderSuccess:false,     //订单状态 是否成功
    startup: false,    //是否开机启动
    cancelTokenArr: [], // 取消请求token数组
    isRefresh:true,  //用户在我的游戏页面打开游戏时不能刷新
    isOpenGame:0,  //能否打开游戏
    channelId:'', //渠道id
    userBalance: { //用户余额
      "balance": 0,// 余额
      "credit": 0//积分
    },  
    firstOrder: false, //首单全免悬浮是否显示
    firstOrderType: 3, //首单全免弹出样式 1为悬浮  2为没有下单按钮  3为详情页面有下单按钮
    isFirstOrderClick:false,//是否在首单全免弹出框点击了下单按钮
    displayOpenMember: false, //显示或者隐藏会员支付框
    isMember:{}, //是否是会员
    reductionOrder:{},//详情页面购买会员出现的本单立减多少钱
    blackList:{},//黑名单
    alertGameInfo:{},//弹窗优惠券信息
    couponNumber:0,//商品券数量
    openMyCardBag:false,//打开卡包
    gameUsedCouponList:{},//保存可使用的卡券数据
    gameCouponAlert:false,//领取优惠券弹窗
    alreadyCertified:getStore({name:'loginRealName'}) && getStore({name:'loginRealName'}).isAdopt == 1 ? true : false,//个人信息中已认证
  },
  mutations: {
    // 领取优惠券弹窗
    setGameCouponAlert(state,value){
      state.gameCouponAlert = value
    },
    // 打开卡包
    setOpenMyCardBag(state,value){
      state.openMyCardBag = value
    },
    // 弹窗优惠券信息
    setAlertGameInfo(state,value){
      state.alertGameInfo = value
    },
    // 保存可使用的卡券数据
    setGameUsedCouponList(state,value){
      state.gameUsedCouponList = value
    },
    // 商品券ID
    setCouponNumber(state,value){
      state.couponNumber = value
    },
    pushToken(state, payload) {
      state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken({ cancelTokenArr }) {
      cancelTokenArr.forEach(item => {
        item('路由跳转取消请求')
      })
      cancelTokenArr = []
    },
    //   用于修改state属性，在actions里调用
    increment(state,value){
      state.isRouterAlive = value;
    },
    SET_LOGINDATA(state,value){
      state.loginData = value
      setStore({name:'loginData',content:value,type:false})
    },
    SET_LOGINCODE(state,value){
      state.loginCode = value
      setStore({name:'loginCode',content:{'loginCode':value},type:false})
    },
    REOMVE_SET_LOGINDATA(state){
      state.loginData = null
      removeStore({name:'loginData'})
    },
    REOMVE_SET_LOGINCODE(state){
      state.loginCode = null
      removeStore({name:'loginCode'})
    },
    isOrderSuccessFun(state,value){
      state.isOrderSuccess = value;
    },
    setStartupFun(state,value){
      state.startup = value
    },
    setIsRefreshFun(state,value){   //是否可以刷新
      state.isRefresh = value
    },
    setOpenGameFun(state,value){  //是否在我的游戏页面显示打开游戏页面
      state.isOpenGame = value
    },
    setChannelId(state,value){  //channelId 设置渠道id
      state.channelId = value
    },
    
    setUserBalance(state,value){    //设置用户余额
      state.userBalance = value
    },
    //首单全免悬浮是否显示 设置
    setFirstOrder(state,value){    
      state.firstOrder = value
    },
    //首单全免 定义弹出样式
    setFirstOrderType(state,value){
      state.firstOrderType = value
    },
    //是否在首单全免弹出框点击了下单按钮
    setIsFirstOrderClick(state,value){    
      state.isFirstOrderClick = value
    },
    //设置会员弹框是否显示
    setDisplayOpenMember(state,value){    
      state.displayOpenMember = value
    },
    //设置是否会员 
    setIsMember(state,value){
      state.isMember = value
    },
    //设置详情页面购买会员出现的本单立减多少钱
    setReductionOrder(state,value){
      state.reductionOrder = value
    },
    //黑名单
    setBlackList(state,value){
      state.blackList = value
    },
    
    
  },
  getters: {
    // 领取优惠券弹窗
    getGameCouponAlert:function(state){
      return state.gameCouponAlert
    },
    // 打开卡包
    getOpenMyCardBag:function(state){
      return state.openMyCardBag
    },
    // 弹窗优惠券信息
    getAlertGameInfo:function(state){
      return state.alertGameInfo
    },
    // 保存可使用的卡券数据
    getGameUsedCouponList:function(state){
      return state.gameUsedCouponList
    },
    // 商品券ID
    getCouponNumber:function(state){
      return state.couponNumber
    },
    //   类似计算属性，用于取值
    getStorage:function(state){
      state.loginData = getStore({name:'loginData',type:false})
      return  state.loginData
    },
    getLoginCode:function(state){
      state.loginCode = getStore({name:'loginCode',type:false})
      return  state.loginCode
    },
    getOrderSuccess:function(state){   //获取订单成功与否
      return state.isOrderSuccess
    },
    //设置开机启动
    getStartup:function(state){
      return state.startup
    },
    //是否可以刷新
    getIsRefresh:function(state){
      return state.isRefresh
    },
    //是否在我的游戏页面显示打开游戏页面
    getOpenGameFun(state){  
      return state.isOpenGame
    },
    //获取渠道id
    getChannelIdFun(state){  
      return state.channelId
    },
    //获取用户余额
    getUserBalance(state){    //获取用户余额
      return state.userBalance
    },
    //首单全面悬浮是否显示 取值
    getFirstOrder(state){
      return state.firstOrder
    },
    //首单全面 定义弹出样式
    getFirstOrderType(state){    
      return state.firstOrderType
    },
    //是否在首单全面弹出框点击了下单按钮
    getIsFirstOrderClick(state){  
      return state.isFirstOrderClick
    },
    //获取是否打开了会员支付弹框
    getDisplayOpenMember(state){    
      return state.displayOpenMember
    },
    //获取是否会员
    getIsMember(state){
      return state.isMember
    },
    //获取详情页面购买会员出现的本单立减多少钱
    getReductionOrder(state){
      return state.reductionOrder
    },
    //黑名单
    getBlackList(state){
      return state.blackList
    },
  },
  actions: {
    //   用this.$store.dispatch('isOrderSuccessFun',value)调用，value为参数
  },
  modules: {
    //   局部调用，大型项目使用
  }
})

// this.$store.commit('setUserBalance',10.11)  调用方式 设置余额
// this.$store.getters.getUserBalance  获取方式  