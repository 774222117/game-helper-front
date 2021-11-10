<template>
    <div class="smallItem animeScale" @click="publiClick(smallItemData.appId)">
        <div class="topLabelIcon_red2 ft16 color_white_1 textCen">{{ ( (smallItemData.lowPrice/smallItemData.steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
        <div class="gameListItemTop">
            <img :src="smallItemData.libraryCapsule" alt="" style="width:100%;height:100%;">
        </div>
        <div class="bgBox"></div>
        <div class="overBox"> 
            <div class="textBox">
                <div class="textPriceBox">
                    <div class="ft20 color_white_1 margin_left_12">￥{{smallItemData.lowPrice}}</div>
                    <div class="ft14 color_white_04 margin_left_8 textDecor">￥{{smallItemData.steamPrce}}</div>
                </div>
                <div class="viewOffers">
                    <div class="viewOffersBtn ft16 color_white_1 back2 border_radius_2">查看详情</div>
                </div>
            </div>
        </div>
        <div class="fooderBgBox back4Active"></div>
    </div>
</template>
<style lang="scss" scoped>
.smallItem:hover .overBox>.textBox{ bottom: 0px; }
.smallItem:hover .overBox{ height: 100%;}
.smallItem:hover .bgBox{ height: 128px; }
.smallItem{
    width: 166px;
    height: 255px;
    margin: 0 auto;
    cursor: pointer;
    position: relative;
    box-shadow:0px 10px 24px 0px rgba(0,0,0,0.1);
    // 游戏盒子元素
    .gameListItemTop{
        width: 100%;
        height: 233px;
        border-radius:4px 4px 0 0;
        overflow: hidden;
        position: absolute;
        top: 0;
    }
    .bgBox{
        width: 100%;
        height: 80px;
        // background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(56,59,71,1) 100%);
        background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(17,24,34,1) 100%);
        position: absolute;
        bottom: 22px;
        z-index: 2;
        transition: all 0.3s ease;
    }
    .overBox{
        width: 100%;
        height: 50%;
        overflow: hidden;
        position: absolute;
        bottom: 0;
        .textBox{
            width: 100%;
            height: 84px;
            position: absolute;
            bottom: -48px;
            z-index: 3;
            transition: all 0.3s ease;
            .textPriceBox{
                height: 25px;
                display: flex;
                justify-content: flex-start;
                align-content: center;
                &>div{line-height: 25px;}
            }
            .viewOffers{
                // opacity: 0;
                width: 100%;
                height: 60px;
                .viewOffersBtn{
                    width:142px;
                    height:36px;
                    margin: 12px;
                    text-align: center;
                    line-height: 36px;
                }
            }
        }
    }
    
    .fooderBgBox{
        width: 100%;
        height: 22px;
        border-radius:0px 0px 4px 4px;
        position: absolute;
        bottom: 0;
        z-index: 1;
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'smallItem',
  props:{
     smallItemData:{
         type: Object,
         default: function(){
             return {
                 smallItemData:{
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
