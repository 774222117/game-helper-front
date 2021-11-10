<template>
  <!-- 十一活动包内部模板 包 -->
  <div class="templates">
    <div class="contents">
      <div class="left">
        <div class="itemsContentBox" :style="{transform:'translateX('+translateX+'px)', width:itemData.games.length*329+'px'}">
          <!-- 第一个宽的 -->
          <div class="items" @mouseenter="hoverItemsFun(true,itemData.games[0])" @mouseleave="hoverItemsFun(false,itemData.games[0])">
            <div class="imgs">
              <img class="imgBlock_1" :src="itemData.games[0].image" alt="">
            </div>
            <div class="btmBg">
              <div class="text1 textOver ft14 color_white_1">{{itemData.games[0].chinaName == '' ? itemData.games[0].englishName: itemData.games[0].chinaName }}</div>
              <div class="text2 ft14 font_weight">原价¥{{itemData.games[0].steamSalePrce}}</div>
            </div>
          </div>
          <!-- 后面的 -->
          <transition v-for="(i,index) in itemData.games">
            <div class="items1" v-if="index > 0" @mouseenter="hoverItemsFun(true,i)" @mouseleave="hoverItemsFun(false,i)">
              <div class="imgs">
                <img class="imgBlock" :src="i.libraryCapsule" alt="">
              </div>
              <div class="btmBg">
                <div class="text1 textOver ft14 color_white_1">{{i.chinaName == '' ? i.englishName: i.chinaName }}</div>
                <div class="text2 ft14 font_weight">原价¥{{i.steamSalePrce}}</div>
              </div>
            </div>
          </transition>
          
        </div>
        <div class="leftActive packagesTemplatesLeft_bg" @click="leftActive"></div>
        <div class="rightActive packagesTemplatesRight_bg" @click="rightActive"></div>
      </div>
      <div class="right">
        <div class="textBox">
          <div class="text1 font_weight textOver2 ft20 color_white_1">{{itemData.title}}</div>
          <div class="text2 font_weight ft16 color_white_1">共 <span class="ft20 color5">{{itemData.games.length}}</span> 款游戏</div>
        </div>
        <div class="videoBox packagesTemplatesVideoBg_bg" v-show="isShowVideo">
            <div class="labelItems">
              <div class="labelName textOver ft14 color_white_1 font_weight">{{videoData.chinaName == '' ? videoData.englishName : videoData.chinaName }}</div>
              <div class="ft14 color_white_1 textDecor">原价￥{{videoData.steamPrce}}</div>
            </div>
            <div class="videoContent">
              <video class="imgBlock" autoplay muted loop :src="videoData.sixVideo"></video>
            </div>
        </div>
        <!-- 购买立省 -->
        <div class="buyProvince" @click="buyOrder">
            <div class="leftPrice">
                <div class="top">
                    <div class="text1 ft20 color_white_1 font_weight"> <span class="ft16">￥</span>{{itemData.salePrice}}</div>
                    <!-- <div class="ft14 color_white_08 textDecor">￥122</div> -->
                </div>
                <div class="btm">
                  <div class="ft14 color_white_08 textDecor">￥{{itemData.groupPrice}}</div>
                    <!-- <div class="text2 ft12 color_white_1 font_weight"> VIP<span class="ft12">￥</span> 121</div> -->
                </div>
            </div>
            <div class="rightBuyBtn">
                <div class="texts ft20 color_white_1 font_weight">{{itemData.button}}</div>
                <div class="discount ft12 color4 font_weight bubble4_bg">
                  <div>{{itemData.radio}}折</div>
                  <div>立减￥{{itemData.discount}}</div>
                </div>
            </div>
            <!-- <div class="texts ft20 color_white_1">现在购买立省 ¥{{gameInfo.discount}}</div>
            <div class="icons ft20 color_white_1"><svg-icon iconClass='rightArrow' className='svg_icon'></svg-icon></div> -->
        </div>
      </div>
    </div>
    <elevenActivityAllOrder v-if="displayAllOrder" @change="displayAllOrderFun" :allOrderData="allOrderData" />
  </div>
</template>

<script>
import elevenActivityAllOrder from '@/components/elevenActivity/elevenActivityAllOrder'
export default {
  name: 'packages',
  props: ['itemData'],
  inject:['reload','openRegister'],
  components:{elevenActivityAllOrder},
  data(){
      return {
         activeNum:0,
         dataslength:0,
         translateX:0,//329
         isShowVideo:false,//是否显示视频
         videoData:'', //video的数据
         displayAllOrder:false, //全部订单显示隐藏
         allOrderData:'',
      }
  },
  mounted(){
   this.dataslength = this.itemData.games.length
   
  },
  methods:{
    // 左边跑的点击
    leftActive(){
      this.activeNum = this.activeNum <= 0 ? 0 : this.activeNum - 1
      this.translateX = this.activeNum*-329
    },
    // 右边边跑的点击
    rightActive(){
       this.activeNum = this.activeNum >= this.dataslength - 3 ? this.dataslength - 3 : this.activeNum + 1
       this.translateX = this.activeNum*-329
    },
    // 鼠标划上
    hoverItemsFun(data,obj){
      this.videoData = obj
      this.isShowVideo = data
    },
    // 购买包
    buyOrder(){
      //判断登录
      if(!!this.$store.getters.getStorage){
        // 订单所需数据 打开订单
        this.allOrderData={
            'groupId':this.itemData.groupId,  //包id
            'channelId': this.$store.getters.getChannelIdFun,
            // 'image': this.itemData.image,
            'payType':2,
            'balanceType':0,
            // 'ratio':this.gamePriceData.ratio,
            // 'price':this.gamePriceData.price,
            // 'steamPrce':this.gameInfo.steamPrce,
            // 'gamePriceData':this.gamePriceData
        }
        // 显示全部订单
        this.displayAllOrderFun(true)
      }else{
        this.openRegister(true) 
      }
    },
    // 订单关闭
    displayAllOrderFun(data){
      this.displayAllOrder = data
    }
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
   width: 1164px;
   box-sizing: border-box;
   .templates{
     width: calc(100% - 0.15rem);
     height: 240px;
     padding: 0 15px;
     padding-bottom: 30px;
    //  内容
     .contents{
       width: 100%;
       height: 100%;
       display: flex;
       justify-content: space-between;
       align-items: center;
      // 左边得元素信息
       .left{
         width: 832px;
         height: 100%;
         overflow: hidden;
         position: relative;
         .itemsContentBox{
           height: 100%;
           background-color: #051824;
           box-sizing: border-box;
           transition: all 0.3s linear;
           display: flex;
          //  第一个
           .items{
             width: 329px;
             height: 240px;
             position: relative;
             margin-right: 15px;
             .imgs{
               width: 100%;
               height: 211px;
               overflow: hidden;
               display: flex;
               align-items: center;
               justify-content: center;
               .imgBlock_1{height: 100%;display: block}
             }
             .btmBg{
               width: 100%;
               height: 123px;
              //  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
               background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.94) 70%, #000000 100%);
               position: absolute;
               bottom: 0;
               display: flex;
               justify-content: space-between;
               align-items: flex-end;
               .text1{margin:0 0 12px 27px; max-width:200px; line-height: 20px;}
               .text2{margin:0 11px 12px 0px; line-height: 20px;color: rgba(116, 143, 154, 1)}
             }
           }
          //  后面的
           .items1{
             width: 157px;
             height: 240px;
             position: relative;
             margin-right: 15px;
             .imgs{
               width: 100%;
               height: 211px;
               .imgBlock{width: 100%;height: 100%;display: block}
             }
             .btmBg{
               width: 100%;
               height: 81px;
              //  background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, #000000 100%);
               background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.86) 53%, #000000 100%);
               position: absolute;
               bottom: 0;
               display: flex;
               flex-direction: column;
               justify-content: flex-end;
               align-items: flex-start;
               .text1{margin:0 5px 3px 5px; max-width:150px; line-height: 20px;}
               .text2{margin:0px 7px 12px 7px; line-height: 20px;color: rgba(116, 143, 154, 1)}
             }
           }
         }
         .leftActive{
           width: 28px;
           height: 100%;
           position: absolute;
           left: 0;
           top: 0;
           cursor: pointer;
         }
         .rightActive{
           width: 28px;
           height: 100%;
           position: absolute;
           right: 0;
           top: 0;
           cursor: pointer;
         }
       }
      //  右边的包信息
      .right{
         width: 275px;
         height: 100%;
         margin-right: 19px;
         position: relative;
         .textBox{
           width: 240px;
           height: 184px;
           margin: 0 auto;
           .text1{margin-bottom: 18px;}
         }
         .videoBox{
              width: 317px;
              height: 213px;
              margin: 0 auto;
              position: absolute;
              left: -30px;
              top: -10px;
              padding-left: 10px;
              box-sizing: border-box;
              z-index: 11;
          //  background-color: rgba(17, 24, 34, 1);
           .labelItems{
             width: 235px;
             height: 35px;
             padding-top: 10px;
             margin: 0 auto;
             display: flex;
             align-items: center;
             justify-content: space-between;
             .labelName{
               width: 70%;
             }
             .labelItemsContents{
                width: auto;
                height: 12px;
                text-align: center;
                line-height: 12px;
                padding: 4px 6px;
                border-radius: 2px;
                background: rgba(0, 0, 0, 0.2);
                margin-right: 8px;
             }
           }
           .videoContent{
            width: 235px;
            height: 132px;
            margin: 0 auto;
            .imgBlock{width: 100%;height: 100%;display: block}
           }
         }
        // 购买立省
        .buyProvince{
          width: 245px;
          height: 56px;
          border-radius: 4px;
          margin: 0 auto;
          // position: absolute;
          // bottom: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: linear-gradient(90deg,rgba(52, 171, 220, 1) 0%,rgba(54, 124, 206, 1) 100%);
          .leftPrice{
              width: 189px;
              height: 100%;
              padding-left: 16px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
            .top{
              display: flex;
              align-items: baseline;
              .text1{
                  display: flex;
                  align-items: baseline;
                  margin-right: 9px;
              }
            }
            .btm{
              display: flex;
              .text2{
                  display: flex;
                  align-items: baseline;
                  margin-right: 9px;
                  color: rgba(255, 182, 73, 1);
              }
            }
          }
          .rightBuyBtn::before{
            content: '';
            width:1px;
            height: 35px;
            background-color: rgba(255, 255, 255, 0.4);
            position: absolute;
            left: 0;
            top: 11px;
          }
          .rightBuyBtn{
            width: 152px;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            .discount{
                width: 134px;
                height: 36px;
                padding: 0 7px;
                box-sizing: border-box;
                position: absolute;
                top: -27px;
                right: 6px;
                text-align: center;
                line-height: 36px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
            }
          }
            // .texts{margin-left: 17px;}
            // .icons{width: 20px;height: 20px; margin-right: 26px;}
        }
         
       }
     }
   }
}
</style>
