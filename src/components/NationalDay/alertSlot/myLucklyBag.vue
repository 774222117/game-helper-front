<template>
<!-- 我的福袋 -->
<div class="alertSlotBox">
   <!-- title -->
   <div class="title luckyBagRecord_bg"></div>
   <!-- 我的福袋 内容 -->
   <div class="freeGoldCoin">
       <!-- 游戏名称，游戏类型，抽取时间 -->
       <div class="luckBagTitle1 topColor">
           <div class="luckBagBox font_weight">
             <div class="gameName ft14">游戏名称</div>
             <div class="gameType ft14">游戏类型</div>
             <div class="drawTime ft14">抽取时间</div>
           </div>
       </div>
       <template  v-if="ancestors.blessingBag.length > 0">
           <div class="luckBagTitle2 elseColor" v-for="(item,index) in ancestors.blessingBag" :class="index%2?'block':'white'">
            <div class="luckBagBox bottomLine">
                <div class="gameName ft14 font_weight textOver">{{item.chinaName == '' ? item.englishName : item.chinaName}}</div>
                <div class="gameType ft14">合玩</div>
                <div class="drawTime ft14">{{item.createTime.slice(0,10)}}</div>
            </div>
          </div>
       </template>
    
       <div class="luckBagBottom" v-else></div>
   </div>
</div>
</template>

<script>
export default {
  name: 'myLucklyBag',
  components:{
      },
  inject:['ancestors'],
  data(){
    return {
      }
  },
  mounted(){

  }
}

</script>

<style lang="scss" scoped>
.alertSlotBox{
    width: 691px;
    height: 466px;
    position: relative;
    top: 90px;
    left: 0px;
    // 文案
    .title {
        width: 688px;
        height: 46px;
        margin-top: 21px;
    }
    .freeGoldCoin{
        width: 617px;
        height: 319px;
        margin: 17px 0 0 36px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: rgba(255,238,149,1);
        // 游戏名称，类型，时间
        .luckBagTitle1 {
            width: 100%;
            height: 49px;
            .luckBagBox {
                width: 558px;
                height: 48px;
                margin-left: 24px;
                display: flex;
                color: #D0442C;
                .gameName {
                    width: 183px;
                    line-height: 48px;
                    margin-left: 16px;
                }
                .gameType {
                    width: 56px;
                    line-height: 48px;
                    margin-left: 33px;
                }
                .drawTime {
                    width: 108px;
                    line-height: 48px;
                    margin-left: 150px;
                }
            }
        }
        .luckBagTitle2 {
            width: 100%;
            height: 49px;
            .luckBagBox {
                width: 558px;
                height: 48px;
                margin-left: 24px;
                display: flex;
                color: #906F2A;
                .gameName {
                    width: 183px;
                    line-height: 48px;
                    margin-left: 16px;
                }
                .gameType {
                    width: 56px;
                    line-height: 48px;
                    margin-left: 43px;
                }
                .drawTime {
                    width: 108px;
                    line-height: 48px;
                    margin-left: 130px;
                }
            }
        }
        .luckBagBottom {
            width: 606px;
            height: 298px;
        }
    }
}
/*修改滚动条样式*/
.freeGoldCoin::-webkit-scrollbar{
    width:4px;
    height:8px;
}
.freeGoldCoin::-webkit-scrollbar-track{
/* background:rgba(42,44,52,1); */
}
.freeGoldCoin::-webkit-scrollbar-thumb{
    background-color:#906F2A;
    border-radius:10px;
}
.freeGoldCoin::-webkit-scrollbar-thumb:hover{
    // background:rgba(56,59,71,1);
}
.freeGoldCoin::-webkit-scrollbar-corner{
/* background: #179a16; */
}
  /* 参数说明
  ::-webkit-scrollbar 滚动条整体部分
  ::-webkit-scrollbar-thumb  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  ::-webkit-scrollbar-track  滚动条的轨道（里面装有Thumb）
  ::-webkit-scrollbar-button 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  ::-webkit-scrollbar-track-piece 内层轨道，滚动条中间部分（除去）
  ::-webkit-scrollbar-corner 边角，即两个滚动条的交汇处
  ::-webkit-resizer 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件 */


//其他区域底色
.elseColor {background-color: rgba(255,238,149,1);}
//顶部底色
.topColor {background-color: #FED47E;}
// 底边框线
.bottomLine {border-bottom: 0.5px solid rgba(207,161,44,0.34);}
.white {background-color: #FFE6B2;}
.block {background-color: #FFDE9A;}
</style>