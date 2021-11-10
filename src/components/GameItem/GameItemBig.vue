<template>
    <div class="firstItem" @click="publiClick(firstItemData.appId)">
        <div class="topLabelIcon_red2 ft16 color_white_1 textCen">{{ ( (firstItemData.lowPrice/firstItemData.steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
        <div class="gameListItemTop">
            <img class="animeScale" :src="firstItemData.image" alt="" style="width:100%;height:100%;">
            <div class="bgGradation ft14 color_white_1"></div>
            <!-- <p class="gameListTitle ft16 color_white_1 RobotoRegular">{{firstItemData.englishName}}</p> -->
        </div>
        <div class="gameListItemBtm bg_color_3">
             <p class="gameListTitle ft16 color_white_1 RobotoRegular">{{ firstItemData.chinaName == '' ? firstItemData.englishName : firstItemData.chinaName }}</p>
            <div class="ft20 color_white_1 margin_left_12 RobotoBold" style="margin-top:40px;">${{firstItemData.lowPrice}}</div>
            <div class="ft14 color_white_04 margin_left_8 textDecor RobotoBold" style="margin-top:40px;">${{firstItemData.steamPrce}}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.firstItem{
    width: 364px;
    height: 100%;
    cursor: pointer;
    box-shadow:0px 10px 24px 0px rgba(0,0,0,0.1);
    position: relative;
    // .topLabelIcon{
    // 使用公共的样式 public。css中
    // }
    // 游戏盒子元素
    .gameListItemTop{
        width: 100%;
        height: 170px;
        border-radius:4px 4px 0px 0px;
        overflow: hidden;
        position: relative;
        .bgGradation{
            width: 100%;
            height: 74px;
            background:linear-gradient(180deg,rgba(56,59,71,0) 0%,rgba(56,59,71,1) 100%);
            position: absolute;
            bottom: 0;
            left: 0;
        }
        .gameListTitle{
            width: calc(100% - 12px);
            height: 20px;
            padding-left: 12px;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
    .gameListItemBtm{
        width: 100%;
        height:85px;
        border-radius:0px 0px 4px 4px;
        display: flex;
        align-items: center;
        position: relative;
         .gameListTitle{
            width: calc(100% - 12px);
            height: 20px;
            padding-left: 12px;
            position: absolute;
            top: 15px;
            left: 0;
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'firstItem',
  components:{JumpTo},
  props:{
     firstItemData:{
         type: Object,
         default: function(){
             return {
                 firstItemData:{
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
  },
  mounted(){
     
  }

}
</script>
