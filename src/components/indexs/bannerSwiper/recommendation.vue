<template>
  <!-- 轮播 重磅推荐 -->
  <div class="commentMain">
    <div class="leftImg">
      <transition v-for="(item,index) in items">
        <div class="allItems" v-if="index < 4" @click="bannerClick(item.appId)">
          <div class="topImg">
              <!-- 图片层 -->
              <div class="imgBox">
                <img class="imgBlock" :src="item.libraryCapsule" alt="">
              </div>
              <!-- 遮罩背景等 -->
              <div class="masks">
                  <!-- <div class="topMask"></div> -->
                  <div class="btmMask"></div>
                  <!-- 限时倒计时 -->
                  <div class="timerMask bannerLabel_bg ft14 font_weight color_white_1">{{item.label}}</div> 
              </div>
          </div>
          <!-- 底部信息 -->
          <div class="btmInfo">
              <div class="gameName ft14 font_weight color_white_1 textOver">{{ item.chinaName == ''?item.englishName:item.chinaName }}</div>
              <div class="gamePriceInfo">
                  <div class="discount ft16 back2 color4 font_weight">{{item.lowRatio}}折</div>
                  <div class="presentPrice ft20 font_weight color3">¥{{Math.ceil(item.lowPrice)}}</div>
                  <div class="originalPrice ft14 font_weight color_white_06 textDecor">¥{{item.steamPrce}}</div>
              </div>
          </div>
        </div>
      </transition>
     
    </div>
  </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'recommendation',
  props: ['items'],  
  data(){
      return {
        
      }
  },
  activated(){

  },
  mounted(){

  },
  methods:{
    bannerClick(data){
      JumpTo(2,{'appId': data});
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
    background:rgba(17, 24, 34, 1);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .allItems{
      width: 166px;
      height: 243px;
      cursor: pointer;
      position: relative;
      .topImg{
          width: 100%;
          height: 100%;
          position: relative;
          .imgBox{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 1;
          }
          .masks{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              z-index: 2;
              .topMask{
                  width: 100%;
                  height: 20px;
                  background:linear-gradient(360deg,rgba(26,97,132,0) 0%,rgba(11,50,77,1) 100%);
                  position: absolute;
                  top: 0;
                  left: 0;
              }
              .btmMask{
                  width: 100%;
                  height:78px;
                //   background:linear-gradient(180deg,rgba(26,97,132,0) 0%,rgba(11,50,77,1) 35%,rgba(11,50,77,1) 100%);
                  background: -webkit-linear-gradient(270deg,rgba(26,97,132,0) 0%,rgba(11,50,77,1) 35%,rgba(11,50,77,1) 100%);
                  position: absolute;
                  bottom: 0px;
                  left: 0px;
              }
              .timerMask{
                  width: 74px;
                  height: 28px;
                  text-align: center;
                  line-height: 24px;
                  position: absolute;
                  top: 10px;
                  left: -6px;
              }
          }
      }
      .btmInfo{
          width: calc(100% - 6px);
          height: 78px;
          padding-left: 6px;
          position: absolute;
          bottom: 0;
          z-index: 4;
          .gameName{
            width: 100%;
            height: 36px;
            line-height: 56px;
          }
          .gamePriceInfo{
              width: 100%;
              height: 42px;
              display: flex;
              align-items: center;
              .discount{
                width:50px;
                height:27px;
                border-radius:4px;
                text-align: center;
                line-height: 27px;
            }
            .presentPrice{margin-left: 8px;}
            .originalPrice{margin-left: 8px;}
          }
      }
    }
  }
}
</style>
