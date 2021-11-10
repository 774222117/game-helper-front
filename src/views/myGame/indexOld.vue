<template ref="mygame">
  <div class="myGameBox RobotoRegular myGameBg_bg">
    <div class="viewMyGameBox"  v-if="isInTheGame == 0 || isInTheGame == 2">
      <!-- :style="{backgroundImage: 'url(' + myGameListData[0].image + ')' , backgroundSize:'100% 598px'}" -->
      <div class="viewMyGameBg">
        <div class="myGameMainBox">
          <!-- 头部title -->
          <div class="myGameTitle">
            <div class="leftMyGame">
              <div class="ft26 color_white_06 ft_weight">{{dataNum || 0}}</div>
              <div class="ft26 color_white_06 ft_weight margin_left_8">全部游戏</div>
              <div class="ft12 color_white_04 margin_left_8">温馨提示：若游戏启动出错或没反应，请关闭安全软件或添加到信任区后重试</div>
            </div>
            <!-- <div class="activeGame"><button class="btnGame" @click="btnClick">{{message}}</button></div> -->
            <div class="rightMyGame">
              <div class="screenBtnBox">
                <div
                  class="recentBtn ft12 color_white_1 opc_hover8"
                  :class="isActive == 1 ? 'screenBtnActive' : ''"
                  @click="screenBtnClick(1)"
                >最近购买</div>
                <div
                  class="allBtn ft12 color_white_1 opc_hover8 margin_left_2"
                  :class="isActive == 2 ? 'screenBtnActive' : ''"
                  @click="screenBtnClick(2)"
                >字母排序</div>
              </div>
              <div class="searchBtn" v-if="false">
                <input
                  type="text"
                  class="searchInput"
                  placeholder="搜索我的游戏"
                  v-model="gameListData.name"
                />
                <div class="searchIconBtn opc_hover8" @click="inputSearch">
                  <svg-icon iconClass="search" class="svg_icon"></svg-icon>
                </div>
              </div>
            </div>
          </div>
          <!-- 我的游戏内容 -->
          <div class="myGameListBox" v-if="myGameListData.length > 0 && isPageActive">
            <!-- 已发货可以打开 待发货待刷新  -->
            <div class="myGameListItem" v-if="item.status == 2 || item.status == ''" :class="item.status == 2 || item.status == ''? 'myGameListItemHover' : '' " v-for="(item,index) in myGameListData">
              <div class="topImg">
                <div class="topImgBox"><img class="myGameItemImg" :src="item.image" /><div class="topImgBoxBgBox"></div></div>
                <div class="myGameItemTopIcon">
                  <svg-icon iconClass="replaceLogo" class="svg_icon"></svg-icon>
                </div>
                <div class="invalidTime ft14 color_white_1 font_weight" v-if="item.invalidTime !== 0">{{ item.invalidTime | formatDate}}结束</div>
                <div class="topImgBgColor">
                  <div class="myGameItemSynopsis ft14 color_white_1">{{item.chinaName == ''? item.englishName : item.chinaName }}</div>
                </div>
              </div>
              <div
                class="btmBtn"
                :class="isItemActive == index?'itemActive':''"
                @click="itemClickFun(index,item)"
              >
               <div class="btmBtnText">
                  <div class="openGameIcon">
                  <svg-icon iconClass="game" class="svg_icon"></svg-icon>
                </div>
                <div class="ft16 color_white_1">启动游戏</div>
               </div>
                <div class="wavesbtn" ref="wavesbtn"></div>
              </div>
              <div class="maskItems" v-if="item.status == 1">
                <div class="maskItemsText ft14 color_white_1 ft_weight">{{itemStatusText1}}</div>
                <div class="maskItemsText ft14 color_white_1 ft_weight">{{itemStatusText2}}</div>
              </div>
            </div>
            <!-- 已失效状态  -->
            <div class="myGameListItem myGameListItemHover" v-if="item.status == -2" v-for="(item,index) in myGameListData">
              <div class="topImg">
                <div class="topImgBox"><img class="myGameItemImg" :src="item.image" /><div class="topImgBoxBgBox"></div></div>
                <div class="myGameItemTopIcon">
                  <svg-icon iconClass="replaceLogo" class="svg_icon"></svg-icon>
                </div>
                <div class="myGameItemInvalid ft14 font_weight">已过期</div>
                <div class="topImgBgColor">
                  <div class="myGameItemSynopsis ft14 color_white_1">{{item.chinaName == ''? item.englishName : item.chinaName }}</div>
                </div>
              </div>
              <div
                class="btmBtn"
                :class="isItemActive == index?'itemActive':''"
                @click="continuePlay(index,item)"
              >
               <div class="btmBtnText">
                  <div class="openGameIcon">
                  <svg-icon iconClass="game" class="svg_icon"></svg-icon>
                </div>
                <div class="ft16 color_white_1">继续游玩</div>
               </div>
                <div class="wavesbtn" ref="wavesbtn"></div>
              </div>
            </div>
            <!-- 取消申请退款  -->
            <div class="myGameListItem myGameListItemHover" v-if="item.status == -3" v-for="(item,index) in myGameListData">
              <div class="topImg">
                <div class="topImgBox"><img class="myGameItemImg" :src="item.image" /><div class="topImgBoxBgBox"></div></div>
                <div class="myGameItemTopIcon">
                  <svg-icon iconClass="replaceLogo" class="svg_icon"></svg-icon>
                </div>
                <div class="myGameItemInvalid ft14 font_weight" style="width:102px;">退款审核中</div>
                <div class="topImgBgColor">
                  <div class="myGameItemSynopsis ft14 color_white_1">{{item.chinaName == ''? item.englishName : item.chinaName }}</div>
                </div>
              </div>
              <div
                class="btmBtn"
                :class="isItemActive == index?'itemActive':''"
                @click="cancelRefund(index,item)"
              >
               <div class="btmBtnText">
                  <div class="openGameIcon">
                  <svg-icon iconClass="game" class="svg_icon"></svg-icon>
                </div>
                <div class="ft16 color_white_1">继续游玩</div>
               </div>
                <div class="wavesbtn" ref="wavesbtn"></div>
              </div>
            </div>
          </div>
          <div class="myGameListBox" v-if="myGameListData.length > 0 && !isPageActive">
              <loading :text="'游戏正在启动中'"/>
          </div>
          <div class="pagingContent" v-if="dataNum > 12">
            <div class="page ft14 color_white_1">
              <!-- //这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值 -->
              <Paging v-if="ifpagings" :dataAll="all" :dataCur="cur" :datanum="num" :dataDatanum="dataNum" @change="pageChange"></Paging>
            </div>
					</div>
          <!-- 没有我的游戏 -->
          <div class="myGameListBoxNodata" v-if="myGameListData.length <= 0">
            <div class="myGameListEmpty myGameEmpty_bg">
              <div class="ft20 color_white_04">您的游戏库中没有游戏 >-<！</div>
              <div
                class="ft14 color_white_02"
                style="margin-bottom:100px;"
              >快去商店挑选你喜欢的游戏吧!</div>
            </div>
          </div>
          <div class="infinite-scroll" v-show="loading">
            <!-- <span class="infinite-scroll-text">{{tips}}</span> -->
          </div>
        </div>
      </div>
      <div class="loadings" v-if="isInTheGame == 2">
        <loading :text="'游戏正在启动中'"/>
      </div>
    </div>
    <!-- 正在游戏中 -->
    <div class="inTheGame anime" v-if="isInTheGame == 1">
      <div class="playGameBox">
        <div class="gameProblem startUpIssues_bg"></div>
        <div class="bgBox"></div>
        <div class="gameInfo">
          <div class="ft30 color_white_1">{{itemClickFun2QueryDatas.data.chinaName == ''?itemClickFun2QueryDatas.data.englishName:itemClickFun2QueryDatas.data.chinaName}}</div>
          <div class="ft18 color_white_06" v-if="itemClickFun2QueryDatas.data.chinaName !=''">{{itemClickFun2QueryDatas.data.englishName}}</div>
          <!-- <div class="gameLabel" v-if="false">
            <div class="gameLabelItem ft12 color_white_06 margin_right_8">Racing game</div>
            <div class="gameLabelItem ft12 color_white_06 margin_right_8">Racing game</div>
            <div class="gameLabelItem ft12 color_white_06">Racing game</div>
          </div> -->
        </div>
        <img :src="openGameBgImgUrl" alt />
      </div>
      <div class="playGameTimeBox bg_color_1">
        <div class="left">
          <div class="ft14 color_white_04 margin_bottom_8">游玩时长</div>
          <div class="gameTime color_white_1 RobotoRegular">
            <div class="margin_right_30">{{timeH}} <span class="ft14 color_white_04">小时</span>  </div>
            <div>{{timeM}} <span class="ft14 color_white_04">分钟</span> </div>
          </div>
        </div>
        <div class="right">
          <div class="gameOverContent">
            <div class="restartGame ft16 color_white_1 back5" @click="restartGameFun">重启游戏</div>
            <div class="repairGame ft14 color_white_08" @click="repairGameAmbient"> 修复游戏环境 </div>
          </div>
          <div class="gameOverContent">
            <div class="endGame ft16 color_white_1" @click="endGameFun">结束游戏</div>
          </div>
          
        </div>
      </div>
    </div>
    <!-- 取消申请退款 -->
    <cancelRefund v-if="displayCancelRefund" :cancelRefundData="cancelRefundData" @change="displayCancelRefundFun" />
    <!-- 失效游戏弹出付款 -->
    <myGameInvalid v-if="ifMyGameInvalid" :myGameInvalid="myGameInvalidData" @change="isMyGameInvalidFun"></myGameInvalid>
    <!-- 赠送礼物 -->
    <div v-show="!isShow">
      <give></give>
    </div>
      <lunchGame v-if="lunchGame" @change="lunchGameFun"></lunchGame>
      <!-- 加速器球球盒子 -->
      <div class="acceleratorBox">
        <accelerator />
      </div>
      <acceleratorModel v-if="acceleratorModelDisplay" @change="acceleratorModelFun" :acceleratorModelGameName="acceleratorModelGameName" />
      
  </div>
</template>

<script>
import { setInterval, setTimeout,clearInterval } from "timers";
import loading from '../../components/Loading/loading';
import myGameInvalid from '@/components/myGameInvalid/myGameInvalid'
import cancelRefund from '@/components/myIndex/cancelRefund'
import give from '@/components/give/give' //赠送礼物
import {setStore,getStore,removeStore}  from '@/utils/storage'
import JumpTo from '@/utils/jumpTo'  //跳转函数
import lunchGame from '@/components/myIndex/lunchGame'
import Paging from '@/components/pager/pager';
import accelerator from '@/components/myIndex/accelerator'
import acceleratorModel from '@/components/myIndex/acceleratorModel'

export default {
  inject:['reload'],
  name: "myGame",
  components: {loading ,myGameInvalid,cancelRefund,give,lunchGame,Paging,accelerator,acceleratorModel},
  data() {
    return {
      all: 0, //总页数
      cur: 1, //当前页码
      num: 9, //一页显示的数量  必须是奇数
      dataNum: 0, //数据的数量
      ifpagings:false,
      isPageActive:true,  //控制执行时间 次数 分页的@change pageChange 会执行两次
      isActive: 1,
      isItemActive: 0,
      isInTheGame: 0, // isInTheGame: 0, this.$store.getters.getOpenGameFun
      gameListData: {
        current: 1, // = 1 当前页
        limit: 10, // = 20 页数量
        peopleId: this.$store.getters.getStorage.id, // = 1 人ID
        name: "", // 游戏名称 查询
        orderBy: "" // 排序方式 空 默认 1 按英文名排序
      },
      myGameListData: [], //我的游戏列表
      nowGame:{}, //当前的游戏

      message:'活动入口',
      isShow:true,
      lunchGame:false,

      REQUIRE: true,
      loading: false,
      tips: "努力加载中...",

      timeH: 0, //时间小时
      timeM: 1, //时间分钟
      openGameBgImgUrl: "", //打开游戏的背景图片
      timer: null, //定时器
      openGameInfo: null,//开始游戏的信息

      testFunTimer:null,//20秒后打开游戏的定时器

      testFunData:{'index':'','data':''},
      itemStatusText1:'正在为您发货中',
      itemStatusText2:'请5~10分钟后刷新',

      ifMyGameInvalid:false,//我的游戏失效游戏购买弹框
      myGameInvalidData:{},//失效游戏数据

      displayCancelRefund:false,
      cancelRefundData:'',//需要取消退款的数据

      acceleratorModelDisplay:false,//加速器弹框显示隐藏
      acceleratorModelGameName:'',//传递给弹框的游戏名称
      itemClickFun2QueryDatas:{},//保存启动游戏需要的参数传递
    }
  },
  activated() {
    // 判断是否需要刷新页面 因为在详情未登录购买 会有登录状态 跳转我的游戏需刷新整体取本地存储 
    if(!!getStore({name:'ifRelodMygame',type:false})){
      removeStore({name:'ifRelodMygame'})  //删除后在刷新页面
      this.reload()  //刷新页面
    }else{
      this.init();
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.scrollBtm);
    let _this = this;
    window['testFun']=()=>{
      _this.testFun()
    }

    if(getStore({name:'isAcceleratorModel',type:true}) === '1'){
      return
    }else if(getStore({name:'isAcceleratorModel',type:true}) === '0'){
      return
    }else{
      setStore({name:'isAcceleratorModel',content:'0',type:true})
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.queryWeb = _this.$route.query.appId; //获取页面路径传来的参数
      _this.gameListData.current = 1;
      _this.pageInit()
      
    },
    //分页初始化
    pageInit(){
			let _this = this;
			_this.gameListData = {'current':1,'limit':12,'orderType':1}  //每次进来重新赋值
      // 我的游戏列表
      _this.$fetch("/account/findGames", _this.gameListData).then(response => {
        if(response.flag){
          _this.dataNum = response.data.total  //总数据条数
          _this.all = Math.ceil(response.data.total / _this.gameListData.limit)   //总页数
          _this.cur = response.data.current
          _this.$nextTick(()=>{
            _this.ifpagings = true
          })
          _this.myGameListData = response.data.rows;
        }else if(response.flag == false && response.message == "请重新登陆"){
          _this.$store.commit('REOMVE_SET_LOGINDATA')
          _this.$store.commit('REOMVE_SET_LOGINCODE')
          window.location.reload()
        }
      });
    },
    //子级传值到父级上来的动态拿去
    pageChange: function(page) {
      let _this = this
			if(_this.isPageActive || _this.cur != page){
				_this.isPageActive = false
				_this.cur = page
				_this.gameListData.current = page
			  _this.$fetch('/account/findGames',_this.gameListData)
				.then((response) => {
          _this.dataNum = response.data.total  //总数据条数
          _this.all = Math.ceil(response.data.total / _this.gameListData.limit)   //总页数
          _this.cur = response.data.current
          _this.myGameListData = response.data.rows;
          _this.$nextTick( ()=>{
            // _this.ifpagings = true
            _this.isPageActive = true 
          } )
          
				})
			}else{
				return
			}
    },
    btnClick(){
      this.isShow = !this.isShow;
    },
    screenBtnClick(num) {
      let _this = this;
      _this.isActive = num;
      if (num == 1) {
        _this.gameListData.orderBy = "";
      } else if (num == 2) {
        _this.gameListData.orderBy = 1;
      }
      _this.gameListData.current = 1;
      _this.$fetch("/account/findGames", _this.gameListData).then(response => {
        _this.myGameListData = response.data.rows;
      });
    },
    //开始游戏函数
    itemClickFun(index, data) {
      let _this = this;
      _this.itemClickFun2QueryDatas.index=index
      _this.itemClickFun2QueryDatas.data=data
      if(location.hostname.indexOf('store') >= 0){
        _this.lunchGame = true;
      }else{
        if(data.invalidTime !== 0){
          var nowTime = +new Date()
          if(nowTime > data.invalidTime){
            _this.init()
            return
          }
        }
     
        //如果需要加速器 弹出加速器 并return 不需要则继续执行
        if(data.isAccelerator == 1 && getStore({name:'isAcceleratorModel',type:true}) !== '1'){
          _this.acceleratorModelGameName = data.chinaName == ''? data.englishName : data.chinaName
          _this.acceleratorModelFun(true)
          return
        }
        //继续走下面的方法
        _this.itemClickFun2(_this.itemClickFun2QueryDatas.index,_this.itemClickFun2QueryDatas.data)
       
      }
    },
    //开始游戏itemClickFun 继续的方法 提取出来
    itemClickFun2(index,data){
      //先出现loading页
        this.isInTheGame = 2

        // 设置刷新按钮为不可刷新
        this.$store.commit('setIsRefreshFun', false)
        this.nowGame = data
        // 发送消息客户端打开游戏
        callNative("openGame", { 'peopleId': data.peopleId, 'gameId': data.id });
        this.testFunData.index = index
        this.testFunData.data = data
        this.openGameInfo = data.appId;

        this.testFunTimer = setTimeout(() => {
            this.testFun()
            clearInterval(this.testFunTimer);
            this.testFunTimer = null
        }, 20000);
    },
    testFun(){
      let index = this.testFunData.index
      let data = this.testFunData.data
      if( this.isInTheGame = 2){
          this.isItemActive = index;
          this.isInTheGame = 1;
          this.openGameBgImgUrl = data.image; //打开游戏的背景图片
          this.setTimer();
      }else{
        return
      }
    },
    // 我的游戏搜索
    inputSearch() {
      let _this = this;
      // 我的游戏列表
      _this.$fetch("/account/findGames", _this.gameListData).then(response => {
        _this.myGameListData = response.data.rows;
      });
    },
    //我的游戏已失效点击继续游玩购买游戏
    continuePlay(index,item){
      JumpTo(2,{'appId': item.appId});
      // this.myGameInvalidData = item
      // this.ifMyGameInvalid = true
    },
    // 取消退款
    cancelRefund(index,item){
      this.cancelRefundData = item
      this.displayCancelRefundFun(true)
    },
    // 接收取消申请退款方法
    displayCancelRefundFun(data,types){
      if( types == 'cancelRefundSuccess'){
        this.displayCancelRefund = data
        // 取消申请退款成功
        this.init()
      }else{
        this.displayCancelRefund = data
      }
      
    },
    //接收失效游戏弹框的方法
    isMyGameInvalidFun(data,n){
      this.ifMyGameInvalid = data
      this.init()
    },

    // 以下三个与enter相关的方法只会在元素由隐藏变为显示的时候才会执行
    // el:指的是当前调用这个方法的元素对象
    // done:用来决定是否要执行后续的代码如果不执行这个方法，那么将来执行完before执行完enter以后动画就会停止
    beforeEnter: function(el) {
      console.log("beforeEnter");
      // 当入场之前会执行 v-enter
      el.style = "top:100%";
    },
    enter: function(el, done) {
      // 当进行的过程中每执行 v-enter-active
      console.log("enter");
      // 为了能让代码正常进行，在设置了结束状态后必须调用一下这个元素的
      // offsetHeight / offsetWeight  只是为了让动画执行
      el.offsetHeight;
      // 结束的状态最后啊写在enter中
      el.style = "top:0";
      // 执行done继续向下执行
      done();
    },
    afterEnter: function(el) {
      // 当执行完毕以后会执行
      console.log("afterEnter");
      this.isInTheGame = 0;
    },
    /*下拉加载 隐藏
    scrollBtm() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      let _this = this;
      if (scrollTop + windowHeight + 20 >= scrollHeight && _this.REQUIRE) {
        // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
        _this.REQUIRE = false;
        _this.loading = true;
        _this.tips = "努力加载中...";
        if (_this.gameListData.current == 1) {
          _this.gameListData.current = 2;
        }
        _this
          .$fetch("/account/findGames", _this.gameListData)
          .then(response => {
            _this.myGameListData = _this.myGameListData.concat(
              response.data.rows
            );
            if(response.data.rows.length == 0){
              _this.$nextTick(() => {
                _this.REQUIRE = false;
                _this.loading = false;
                // _this.gameListData.current++;
              });
            }else{
              _this.$nextTick(() => {
                _this.REQUIRE = true;
                _this.loading = false;
                _this.gameListData.current++;
              });
            }
            
          })
          .catch(() => {
            this.tips = "连接失败，请稍后重试";
            // 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
            this.REQUIRE = true;
          });
      }
    },*/

    //结束游戏
    endGameFun() {
      //当前没有打开的游戏
      this.openGameInfo = null
      // 设置刷新按钮为可以刷新
      this.$store.commit('setIsRefreshFun', true)
      // 设置游戏状态为关闭 （不能打开游戏）
      this.$store.commit('setOpenGameFun',0)
      this.isInTheGame = 0;
      clearInterval(this.timer);
      this.timer = null;
      this.timeH = 0;
      this.timeM = 1;
      callNative('send_end_game',this.nowGame)
    },
    // 修复游戏环境
    repairGameAmbient(){
      if(!!window.sendCef){
        window.sendCef("open_fixtools"," ");
      }else{
        console.log('没有cef方法 无法修复游戏环境')
      }
    },
    //定时器函数
    setTimer() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          this.timeM++;
          if (this.timeM == 60) {
            this.timeH = this.timeH + 1;
          }
          this.timeM = this.timeM % 60;
        }, 60000);
      }
    },
    //接收下载弹框的方法
    lunchGameFun(data){
      this.lunchGame = data
    },
    //重启游戏
    restartGameFun(){
      console.log(this.itemClickFun2QueryDatas.data)
      // 发送消息客户端打开游戏
      callNative("openGame", { 'peopleId': this.itemClickFun2QueryDatas.data.peopleId, 'gameId': this.itemClickFun2QueryDatas.data.id });
    },
    //加速器弹框
    acceleratorModelFun(data,types){
      this.acceleratorModelDisplay = data
      console.log(data,types)
      if(types == 'speedUp'){  //加速并启动  调用加速器
        //发送打开加速器
        callNative("open_xunyou_speed",'')
      }
      if(!data){
        //调用启动游戏后续
        this.itemClickFun2(this.itemClickFun2QueryDatas.index,this.itemClickFun2QueryDatas.data)
      }
      
    }
  },
  created: function() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    clearInterval(this.timer);
    this.timer = null;
  },
  destroyed: function() {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return MM + '-' + d + ' ' + h + ':' + m;
    }
  }
}
</script>
<style lang="scss" scoped>
.myGameBox {
  width: 100%;
  position: relative;
  // background: rgba(42, 44, 52, 1);
  .viewMyGameBox {
    width: 1280px;
    height: auto;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: top left;
    .viewMyGameBg {
		width: 100%;
		height: 100%;
		background-size: 100% 601px;
      .myGameMainBox {
        width: 1156px;
        height: 100%;
        margin: 0 auto;
        // 我的游戏头部
        .myGameTitle {
          width: 1156px;
          height: 104px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .leftMyGame {
            height: 36px;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          .activeGame{
            .btnGame{
              width: 100px;
              height: 28px;
              display: block;
              background-color: transparent;
              outline: none;
              border: none; 
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color:#FF0036;
              line-height: 16px;
              border: 1px solid #FF0036;
              position: absolute;
              left:64%;
              top:6%;
            }
          }
          .rightMyGame {
            width: 498px;
            height: 40px;
            display: flex;
            // justify-content: space-between;
            justify-content: flex-end;
            align-items: center;
            .screenBtnBox {
              width: 203px;
              height: 28px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .recentBtn,
              .allBtn {
                width: 100px;
                height: 28px;
                cursor: pointer;
                text-align: center;
                line-height: 28px;
                border: 1px solid rgba(255, 255, 255, 0.2);
              }
              .screenBtnActive {
                opacity: 1;
                color: rgba(172, 220, 245, 1);
                border: 1px solid rgba(86, 159, 203, 1);
              }
            }
            .searchBtn {
              width: 265px;
              height: 40px;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 2px;
              position: relative;
              .searchInput {
                width: 100%;
                height: 100%;
                display: block;
                background-color: transparent;
                outline: none;
                border: none;
                font-size: 12px;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                line-height: 18px;
                text-indent: 20px;
              }
              .searchIconBtn {
                width: 24px;
                height: 24px;
                position: absolute;
                right: 10px;
                top: 8px;
                cursor: pointer;
              }
            }
          }
        }
        // 我的游戏内容
        .myGameListBox {
          width: 100%;
          min-height: 588px;
          overflow: hidden;
          // display: flex;
          // flex-wrap: wrap;
          // justify-content: flex-start;
          .myGameListItem:nth-child(4n) {
            margin-right: 0;
          }
          .myGameListItemHover:hover .topImg .topImgBox> img {
            transform: scale(1.1);
          }
          .myGameListItemHover:hover .btmBtn{
            background-color:rgba(86, 159, 203, 1);
            transform: translateY(-40px);
            transition: transform 0.2s linear;
          }
          .myGameListItemHover:hover .myGameItemSynopsis{
            display: none;
          }
          .myGameListItem .btmBtn:active{
            background-color:rgba(172, 220, 245, 1);
            // background-color: rgba(86, 159, 203, 1);
          }
          .myGameListItem{
            width: 265px;
            height: 164px;
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 32px;
            margin-right: 32px;
            box-shadow: 0px 0.1rem 0.24rem 0px rgba(0, 0, 0, 0.1);
            float: left;
            position: relative;
            .topImg {
              width: 100%;
              height: 164px;
              position: relative;
              overflow: hidden;
              .topImgBox{
                width: 100%;
                height: 130px;
                border-radius: 8px 8px 0 0;
                overflow: hidden;
                position: relative;
                .topImgBoxBgBox{
                  width: 100%;
                  height: 30%;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(17,24,34,1) 100%);
                }
                .myGameItemImg {
                  width: 100%;
                  height: 100%;
                  border-radius: 8px 8px 0 0;
                  display: block;
                  transition: all 0.3s ease;
                }
              }
              
              .myGameItemTopIcon {
                width: 24px;
                height: 24px;
                position: absolute;
                left: 16px;
                top: 16px;
              }
              //失效时间
              .invalidTime{
                width:169px;
                height:37px;
                background-color:rgba(56,59,71,0.8);
                border-radius:0px 8px 0px 8px;
                text-align: center;
                line-height: 37px;
                position: absolute;
                right: 0px;
                top: 0px;
                letter-spacing:1px;
              }
              // 已失效
              .myGameItemInvalid{
                width:78px;
                height:37px;
                background:rgba(171,36,56,0.54);
                border-radius:0px 8px 0px 8px;
                color:rgba(241,241,241,1);
                text-align: center;
                line-height: 37px;
                position: absolute;
                right: 0px;
                top: 0px;
              }
              .topImgBgColor {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(17,24,34,1) 100%);
                border-radius: 8px 8px 0 0;
                .myGameItemSynopsis {
                  width: 233px;
                  height: 34px;
                  line-height: 30px;
                  position: absolute;
                  bottom: 0;
                  left: 16px;
                }
              }
            }
            .btmBtn {
              width: 100%;
              height: 40px;
              background: rgba(29, 31, 36, 1);
              border-radius:0 0 8px 8px;
              cursor: pointer;
              overflow: hidden;
              position: relative;
              transition: all 0.3s linear;
              .btmBtnText{
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .openGameIcon {
                  width: 24px;
                  height: 24px;
                  display: block;
                  border-radius: 50%;
                  margin-right: 5px;
                }
              }
              
            }
            // .btmBtn:hover {
            //   background-color: rgba(255, 0, 54, 1);
            // }
            // .btmBtn:active {
            //   background-color: rgba(229, 0, 48, 1);
            // }
            .itemActive {
              background: rgba(86, 159, 203, 1);
            }
            // 当游戏为待发货得遮罩
            .maskItems{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .maskItemsText{
                width: 132px;
                height: 22px;
                text-align: center;
                line-height: 21px;
              }
            }
          }
        }
        //分页盒子
        .pagingContent{
          width: 100%;
          height:40px;
        }
        //没有数据
        .myGameListBoxNodata {
          width: 1160px;
          height: 575px;
          .myGameListEmpty {
            width: 500px;
            height: 500px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
    }
  }
  //加载中
  .loadings{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
}
.infinite-scroll {
  width: 100%;
  height: 30px;
}
.infinite-scroll-text {
  display: block;
  width: 100%;
  height: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 22px;
}
// 正在游戏中
.myGameBox {
  width: 100%;
  //   min-height: 100%;
  position: relative;
  .inTheGame {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    transition: all 1s;
    .playGameBox {
      width: 100%;
      height: 600px;
      position: absolute;
      top: 0;
      .gameProblem{
        width: 126px;
        height: 44px;
        position: absolute;
        top: 0;
        right: 73px;
        z-index: 9;
        animation: gameProblem 1s linear infinite;
      }
      .bgBox {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          180deg,
          rgba(22, 23, 27, 0.4) 0%,
          rgba(22, 23, 27, 1) 100%
        );
      }
      .gameInfo {
        width: 100%;
        height: 82px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        padding-left: 100px;
        .gameLabel {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .gameLabelItem {
            width: auto;
            height: 20px;
            padding: 4px 2px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 2px;
          }
        }
      }
      & img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .playGameTimeBox {
      width: 100%;
      height: 184px;
      position: absolute;
      top: 600px;
      display: flex;
      // align-items: center;
      justify-content: space-between;
      .left {
        width: calc(100%-400px);
        height: 100px;
        padding-left: 100px;
        margin-top: 5px;
        .gameTime {
          width: 292px;
          height: 47px;
          font-size: 40px;
          display: flex;
          // justify-content: space-between;
          align-items: center;
        }
      }
      .right {
        width: 440px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .gameOverContent{
          width: 300px;
          height: 100%;
          display: flex;
          justify-content: start;
          flex-direction: column;
          .endGame {
            width: 180px;
            height: 44px;
            background: linear-gradient(135deg,#5fcbed, #0f88e0);
            border-radius: 2px;
            text-align: center;
            line-height: 44px;
            margin-top: 40px;
            cursor: pointer;
          }
          .restartGame{
            width: 178px;
            height: 42px;
            background: rgba(72,136,176,0.44);
            border: 1px solid #4888b0;
            text-align: center;
            line-height: 44px;
            border-radius: 2px;
            margin-top: 40px;
            margin-left: 27px;
            cursor: pointer;
          }
          .repairGame{
            width: 180px;
            height: 30px;
            text-align: center;
            margin-top: 5px;
            margin-left: 27px;
            cursor: pointer;
          }
        }
        
      }
    }
  }
  .anime {
    top: 0;
    transition-delay: 1s;
    transition: all 1s;
  }
}
// 加速器球球
.acceleratorBox{
  width: 98px;
  height: 98px;
  position: fixed;
  bottom: 156px;
  right: 51px;
  cursor: pointer;
}
/*游戏启动问题动画序列 */
@keyframes gameProblem {
  0%{transform: translateY(0px)};
  50%{transform: translateY(10px)};
  100%{transform: translateY(0px)};
}
</style>
