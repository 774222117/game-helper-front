<template>
    <div class="middleItem" @click="publiClick(middleItemData.appId)">
        <!-- 夏季大促 -->
        <div class="summerPromotion summerPromotionB_bg ft16"></div>
        <!-- <div class="topLabelIcon_red2 ft16 color_white_1 textCen">{{middleItemData.lowRatio}}%</div> -->
        <div class="gameListItemTop">
            <div class="bgGradation textOver ft14 color_white_1 RobotoRegular">{{ middleItemData.chinaName == '' ? middleItemData.englishName : middleItemData.chinaName }}</div>
            <img :src="middleItemData.image" alt="" style="width:100%;height:100%;">
            <!-- <p class="gameListTitle ft14 color_white_1">{{middleItemData.lowRatio}}</p> -->
        </div>
        <div class="gameListItemBtm back4Active">
            <div class="ft16 color1 back2 font_weight">{{ ( (middleItemData.lowPrice/middleItemData.steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
            <div class="ft20 color3 margin_left_8">￥{{Math.ceil(middleItemData.lowPrice) }}</div>
            <div class="ft14 color_white_04 margin_left_6 margin_top_5 textDecor">￥{{ Math.ceil(middleItemData.steamPrce) }}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.middleItem:hover>.gameListItemTop>img{transition: all 0.3s ease; transform: scale(1.1)}
.middleItem{
    width: 265px;
    height: 182px;
    cursor: pointer;
    box-shadow:0px 10px 24px 0px rgba(0,0,0,0.1);
    position: relative;
    // .topLabelIcon{
    // 使用公共的样式 public。css中
    // }
    // 游戏盒子元素
    .gameListItemTop{
        width: 100%;
        height: 135px;
        border-radius:8px 8px 0 0;
        overflow: hidden;
        position: relative;
        .bgGradation{
            width: calc(100% - 20px);
            height: 24px;
            line-height: 24px;
            // background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(56,59,71,1) 100%);
            background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(17,24,34,1) 100%);
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 11;
            padding: 0 10px;
        }
        img{transition: all 0.3s ease;}
        .gameListTitle{
            width: calc(100% - 24px);
            height: 44px;
            padding-left: 12px;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
    .gameListItemBtm{
        width: 100%;
        height: 47px;
        border-radius:0px 0px 8px 8px;
        display: flex;
        align-items: center;
        div:nth-of-type(1){
            padding: 2px 7px;
            border-radius:4px;
            margin-left: 15px;
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'middleItem',
  props:{
     middleItemData:{
         type: Object,
         default: function(){
             return {
                 middleItemData:{
                     lowRatio:'',
                     clientIcon:'',
                     englishName:'',
                     lowPrice:'',
                     steamPrce:''
                 }
             }
         }
     }
  },
  methods:{
      publiClick(data){
          JumpTo(2,{'appId': data});
      }
  }
}
</script>
