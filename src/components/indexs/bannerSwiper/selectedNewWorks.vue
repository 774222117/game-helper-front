<template>
  <!-- 轮播 小编精选 -->
  <div class="commentMain" v-if="!!items">
    <!-- 左边图片 -->
    <div class="leftImg" @click="publiClick" v-show="isChange">
      <!-- <img class="imgBlock" :src="items[activeNum].bannerImg" alt=""> -->

      <div class="leftImgContent" v-for="(item,index) in items" v-ga_si="{'items':{
            gameInfo:{
              'appId': getQueryStringRegExp('appId', item.navigateUrl) || '',
              'name':item.gameName,
              'promotion_name':'轮播图'
            },
            'item_list_name':'轮播图',
            'item_list_id':'轮播图'+index
          }}">
        <!-- 清晰图 -->
        <div class="clearImg" :style="{transform:'translateX('+distance+'px)'}">
          <!-- 轮播图 -->
          <img :src="item.bannerImg" alt="" />
          <!-- 轮播图结束：重复第一张图 -->
          <img class="lastPic" :src="items[0].bannerImg" alt="">
          <!-- 左侧模糊图 -->
          <div :class=" index ==  currentType?'blurleftPic':''" :style="{backgroundImage: 'url(' + item.bannerImg + ')' }">
          </div>
          <!-- 右侧模糊图 -->
          <div :class=" index ==  currentType + 1?'blurrightPic':''" :style="{backgroundImage: 'url(' + item.bannerImg + ')' }">
          </div>
        </div>
      </div>

    </div>
    <!-- 左侧轮播 -->
    <div class="leftImg" v-show="!isChange">
      <!-- 今日游戏推荐 -->
      <recommenNewdation :items="recommendationData" />
    </div>
    <!-- 右边 选项卡 -->
    <div class="rightTab">
      <div class="gradBack"></div>
      <!-- 整体内容 -->
      <div class="content">
        <!-- 轮播切换数组 -->
        <div class="swiperBar"> 
          <div class="textSwiperBar ft14  color_white_06" 
          v-for="(i,index) in items" 
          :key="index"
          @click="publiClick" v-ga_si="{'items':{
            gameInfo:{
              'appId': getQueryStringRegExp('appId', i.navigateUrl) || '',
              'name':i.gameName,
              'promotion_name':'轮播图'
            },
            'item_list_name':'轮播图',
            'item_list_id':'轮播图'+index
          }}">
            <!-- 右侧游戏名称 -->
            <div class="textSwiperBarItem" :class="index == currentType?'activeText':''" @mousemove="changeSwiperIn(index)"
          @mouseout="changeSwiperOut">{{i.gameName}}</div>
          </div>

          <!-- 更多游戏盒子 -->
          <div class="title ft14  color_white_06" @mousemove="changeSwiperIn('title')" @mouseout="changeSwiperOut('title')">
              <div class="textTitle" :class="isChange?'':'activeText'">更多游戏推荐</div>
            </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
import recommenNewdation from '@/components/indexs/bannerSwiper/recommenNewdation';//今日特惠后面的 6个
import JumpTo from '@/utils/jumpTo'
import { setInterval,setTimeout, clearInterval } from "timers";
export default {
  name: 'selectedWorks',
  props: [],
  components:{recommenNewdation},
  data(){
      return {
          items:'',
          recommendationData:[],
          isChange:true,//是否切换左边的图片组件
          bannerChangeTimer:null,  //轮播倒计时
          activeNum:0,  //选中的值
          distance:-0, //距离
          num:903, //每个图片移动距离
          currentType:0, //当前选中的图片下标
          currentActive:0 ,//模糊图层选中的图片下标
      }
  },
  activated(){
   
  },
  mounted(){
    this.inits()
    
  },
  methods:{
    inits(){
      var _this = this
      // 小编精选 
			_this.$fetch('/index/v2/banners')
				.then((response) => {
					_this.items = response.data
          _this.bannerChange()
        })
      //  重磅推荐
			_this.$fetch('/index/v2/today/fun')
				.then((response) => {
					_this.recommendationData = response.data
				})
    },
    // 重磅推荐 切换数据
    changeRecommendationData(){
      this.$fetch('/index/v2/today/fun')
				.then((response) => {
					this.recommendationData = response.data
				})
    },
    // 定时器切换
    bannerChange(){
      var _this = this;
      _this.bannerChangeTimer = setInterval(()=>{
        // 关闭更多推荐
        _this.isChange = true
        // 自动跳转图片
        _this.currentType++
        _this.distance = _this.currentType*_this.num*-1
        if(_this.currentType > 5){
          _this.changeFun()
        }
      },5000);
    },
    // 鼠标移入
    changeSwiperIn(index){
      this.currentType = index
      // this.currentActive = index + 1
      this.bannerChangeTimerClear()
      this.distance = index*this.num*-1
      if(index == 'title'){
        this.isChange = false
      }else{
        this.isChange = true
        this.currentType = index
      } 
    },
    // 鼠标离开
    changeSwiperOut(index){
      // console.log(index)
      if(index == 'title'){
        this.isChange = false
        // this.bannerChange()
      }else{
        this.bannerChange()
      }
      
    },
    // 切换模块
    changeFun(){
      this.bannerChangeTimerClear()
      this.isChange = false
      // this.bannerChange()
    },
    // 清除定时器
    bannerChangeTimerClear(){
      this.currentType = -1
      clearInterval(this.bannerChangeTimer)
      this.bannerChangeTimer = null
    },
    // 跳转详情
    publiClick(){
      var urls = this.items[this.currentType].navigateUrl
      console.log(urls)
      if(urls.indexOf('elevenActivity') > 0){
        var pageId = this.getQueryStringRegExp('pageId', urls)
        JumpTo(9,{'pageId': pageId});
      }else if(urls.indexOf('newYear') > 0){
        JumpTo(21);
      }else if(urls.indexOf('NationalDay') > 0){
        JumpTo(23);
      }else if(urls.indexOf('gameDetails') > 0){
        var dataAppid = this.getQueryStringRegExp('appId', urls)
        JumpTo(2,{'appId': dataAppid});
      }
    },
    // 获取参数信息  appid
    getQueryStringRegExp(name,url){
      var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
      if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
    }
    
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  //  左边图片
  .leftImg{
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    // background: #0B273A;
    // position: relative;
    // background:linear-gradient(90deg,(17, 24, 34, 1) 0%,rgba(11, 39, 58, 1) 100%);
    // background:rgba(17, 24, 34, 1);
    .leftImgContent{
      width: 890px;
      height: 100%;
      flex-shrink:0;
      padding-right: 12px;
      position: relative;
    }
    .leftImgContent::before{
      content: '';
      width: 10px;
      height: 287px;
      position: absolute;
      right: 0px;
      background: rgba(11, 39, 58,1);
      // filter: blur(2px);
    }
    .clearImg {
      height: 287px;
      position: relative;
      right: 0;
      top: 0;
      display:flex;
      transition: all 0.3s linear;
      img{width: 100%;height: 100%;cursor: pointer;}
      .lastPic {
        margin-left: 14px;
        // filter: blur(1px);
      }
    
      .blurleftPic{
          width: 27px;
          height: 287px;
          position: absolute;
          left: 866px;
          top: 0;
          // background: red;
          overflow: hidden;
          background-position-x: 27px;
          // filter: blur(2px);
          background-size: 890px 287px;
      }
      .blurrightPic{
        width: 131px;
        height: 287px;
        position: absolute;
        left: -1px;
        top: 0;
        overflow: hidden;
        // filter: blur(2px);
        background-size: 890px 287px;
        box-shadow: -5px 0px 5px rgba(11,39,58,0.8);
      }
    }
  }
  .rightTab{
    width: 296px;
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    // 嵌套的背景
    .gradBack {
      width: 276px;
      height: 289px;
      background: url('../../../../public/images/gradients.png');
      background-size: 276px 291px;
      margin-top: -2px;
      margin-left: 20px;
    }

    .nestBackground{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // background:linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(16,22,30,0.94) 100%);
      // background:rgba(17, 24, 34, 1);
      opacity: 0.65;
      // z-index: 1;
    }
    // 内容
    .content{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // z-index: 2;
      // 头部
      .top{
        width: 100%;
        height: 46px;
        // padding: 0 4px;
        box-sizing: border-box;
        .topTitle{
          width: 100%;
          height: 100%;
          // border-bottom: 1px solid rgba(55, 169, 255, 0.15);
          display: flex;
          // justify-content: flex-start;
          align-items: center;
          // .hotIcon{width: 12px;height: 16px;margin-left: 22px;margin-top: 5px;}
          .title{width: 100%;height: 18px;text-align: right;}
          // .refreshIcon{width: 21px;height: 21px;margin-left: 75px; cursor: pointer;}
          // .animes{
          //   animation: firstdiv 2s linear 1s infinite alternate;
          // }
          // @keyframes firstdiv{
          //     0%{transform: rotate(0)}
          //     50%{transform: rotate(360deg)}
          //     100%{transform: rotate(360deg)}
          // }
        }
      }
      //文案内容 小编精选
      .selectedWorksText{
        width: calc(100% - 41px);
        height: 21px;
        margin: 13px 0 23px 41px;
      }
      //轮播切换数组
      .swiperBar{
        width: 100%;
        height: 288px;
        padding-left: 42px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .textSwiperBar{
          width: 100%;
          height: 41px;
          margin-bottom: 5px;
          cursor: pointer;
          text-align: right;
          flex: 1;
          align-items: center;
          position: relative;
          // background: linear-gradient(90deg,rgba(12,42,62,0.02) 0%,#45B4FF 100%);
          // background: linear-gradient(90deg,rgba(16,22,30,0) 0%,rgba(0,0,0,0) 100%);
          // opacity: 0.65;
          .textSwiperBarItem {
            // margin-right: 16px;
            line-height: 34px;
            display: inline-block;
            padding-right: 16px;
            // color: rgba(255,246,255,.8);
            // padding-left: 10px;
          }
        }
        .title {
          width: 100%;
          height: 18px;
          cursor: pointer;
          text-align: right;
          flex: 1;
          align-items: center;
          position: relative;
          margin-bottom: 1px;
          .textTitle {
              line-height: 34px;
              padding-right: 16px;
              padding-left: 18px;
              display: inline-block;
              // color: rgba(255,246,255,1);
          }
        }
      }
    }
  }
}
.activeText{
  // color: rgba(58, 197, 255, 1);
  color:rgba(255,246,255,1);
  font-size:18Px;
  font-weight:bold;
  background: linear-gradient(90deg,rgba(12,42,62,0.02) 0%,rgba(69, 180, 255,1) 100%);
  // background: linear-gradient(90deg,rgba(12,42,62,0.02) 0%,#45B4FF 100% linear-gradient(90deg,rgba(16,22,30,0) 0%,rgba(0,0,0,0) 100%));
  // opacity: 0.65;
}
</style>
