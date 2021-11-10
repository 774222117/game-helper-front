<template>
  <!-- 轮播 小编精选 -->
  <div class="commentMain" v-if="!!items">
    <!-- 左边图片 -->
    <div class="leftImg" @click="publiClick" v-if="isChange">
      <img class="imgBlock" :src="items[activeNum].bannerImg" alt="">
    </div>
    <div class="leftImg" v-else>
      <recommendation :items="recommendationData" />
    </div>
    <!-- 右边 选项卡 -->
    <div class="rightTab">
      <!-- 嵌套背景 -->
      <div class="nestBackground opc65"></div>
      <!-- 整体内容 -->
      <div class="content">
        <!-- top 头部-->
        <div class="top">
          <!-- 头部内容 -->
          <div class="topTitle" @mousemove="changeSwiperIn('title')" @mouseout="changeSwiperOut('title')">
            <div class="hotIcon"><svg-icon :iconClass="isChange?'hot':'hotColor' " className='svg_icon'></svg-icon></div>
            <div class="title ft18" :class="isChange?'color_white_06':'color_white_1 font_weight'">今日游戏推荐</div>
            <div class="refreshIcon animes opc_hover" @click="changeRecommendationData"><svg-icon iconClass='refresh' className='svg_icon'></svg-icon></div>
          </div>      
        </div>
        <!-- 文案内容 小编精选-->
        <div class="selectedWorksText ft18 " :class="isChange?'color_white_1 font_weight':'color_white_06'">小编精选</div>
        <!-- 轮播切换数组 -->
        <div class="swiperBar"> 
          <div class="textSwiperBar ft14  color_white_06" 
          :class="index == activeNum?'avtiveText':''" 
          v-for="(i,index) in items" 
          @click="publiClick"
          @mousemove="changeSwiperIn(index)"
          @mouseout="changeSwiperOut"
          >{{i.gameName}}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import recommendation from '@/components/indexs/bannerSwiper/recommendation';//今日特惠后面的 6个
import JumpTo from '@/utils/jumpTo'
import { setInterval,setTimeout, clearInterval } from "timers";
export default {
  name: 'selectedWorks',
  props: [],
  components:{recommendation},
  data(){
      return {
          items:'',
          recommendationData:[],
          isChange:true,//是否切换左边的图片组件
          bannerChangeTimer:null,  //轮播倒计时
          activeNum:0,  //选中的值
          
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
        // 到最后一个切换
        if(_this.activeNum == 3){
          _this.changeFun()
        }
        if(_this.activeNum != -1){
          _this.activeNum = (_this.activeNum + 1)%4
        }
      },5000);
    },
    // 鼠标移入
    changeSwiperIn(index){
      this.bannerChangeTimerClear()
      if(index == 'title'){
        this.isChange = false
      }else{
        this.isChange = true
        this.activeNum = index
      }
      
    },
    // 鼠标离开
    changeSwiperOut(index){
      if(index == 'title'){
        this.isChange = false
      }else{
        this.bannerChange()
      }
      
    },
    // 切换模块
    changeFun(){
      this.bannerChangeTimerClear()
      this.isChange = false
    },
    // 清楚定时器
    bannerChangeTimerClear(){
      this.activeNum = -1
      clearInterval(this.bannerChangeTimer)
      this.bannerChangeTimer = null
    },
    // 跳转详情
    publiClick(){
      var urls = this.items[this.activeNum].navigateUrl
      if(urls.indexOf('elevenActivity') > 0){
        var pageId = this.getQueryStringRegExp('pageId', urls)
        JumpTo(9,{'pageId': pageId});
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
  //  左边图片
  .leftImg{
    width: 890px;
    height: 100%;
    // background:linear-gradient(90deg,(17, 24, 34, 1) 0%,rgba(11, 39, 58, 1) 100%);
    background:rgba(17, 24, 34, 1);
  }
  .rightTab{
    width: 270px;
    height: 100%;
    position: relative;
    // 嵌套的背景
    .nestBackground{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      // background:linear-gradient(90deg,rgba(0,0,0,0) 0%,rgba(16,22,30,0.94) 100%);
      background:rgba(17, 24, 34, 1);
      opacity: 0.65;
      z-index: 1;
    }
    // 内容
    .content{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      // 头部
      .top{
        width: 100%;
        height: 46px;
        padding: 0 4px;
        box-sizing: border-box;
        .topTitle{
          width: 100%;
          height: 100%;
          border-bottom: 1px solid rgba(55, 169, 255, 0.15);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .hotIcon{width: 12px;height: 16px;margin-left: 22px;margin-top: 5px;}
          .title{width: 113px;height: 21px;margin-left: 7px;}
          .refreshIcon{width: 21px;height: 21px;margin-left: 75px; cursor: pointer;}
          .animes{
            animation: firstdiv 2s linear 1s infinite alternate;
          }
          @keyframes firstdiv{
              0%{transform: rotate(0)}
              50%{transform: rotate(360deg)}
              100%{transform: rotate(360deg)}
          }
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
        height: 184px;
        padding-left: 41px;
        box-sizing: border-box;
        .textSwiperBar{
          width: 100%;
          height: 27px;
          line-height: 27px;
          margin-bottom: 16px;
          cursor: pointer;
        }
      }
    }
  }
}
.avtiveText{
  color: rgba(58, 197, 255, 1);
  font-size:18Px;
  font-weight:bold;
}
</style>
