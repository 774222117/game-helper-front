<template>
<!-- 拆福袋概率 -->
<div class="alertSlotBox">
   <!-- title -->
   <div class="title probability_bg"></div>
   <!-- title2 -->
   <div class="title2 ft12">不会抽取到重复道具，因此抽取次数增多概率会相应升高</div>
   <!-- 我的福袋 内容 -->
   <div class="freeGoldCoin">
       <!-- 游戏名称，游戏类型，抽取时间 -->
       <div class="luckBagTitle1 topColor">
           <div class="luckBagBox font_weight">
             <div class="gameName ft14">游戏名称</div>
             <div class="gameType ft14">游戏类型</div>
             <div class="drawTime ft14">概率</div>
           </div>
       </div>
       <div class="luckBagTitle2 " v-for="(item,index) in gameProbability" :class="index%2?'block':'white'">
           <div class="luckBagBox bottomLine">
             <div class="gameName ft14 font_weight">{{item.chinaName}}</div>
             <div class="gameType ft14">合玩</div>
             <div class="drawTime ft14">{{item.probability}}</div>
           </div>
       </div>
   </div>
</div>
</template>

<script>
export default {
  name: 'redBagProbability',
  components:{
      },
  data(){
    return {
        gameProbability:[{chinaName:'春节福利礼包',probability:'24%'},{chinaName:'城市：天际线',probability:'15%'},{chinaName:'觅长生',probability:'15%'},
                        {chinaName:'方舟',probability:'10%'},{chinaName:'欢乐共斗',probability:'10%'},{chinaName:'狙击精英4标准版',probability:'10%'},
                        {chinaName:'文明6',probability:'3.75%'},{chinaName:'红色警戒：重制版/红警',probability:'3.75%'},{chinaName:'漫漫长路',probability:'3.75%'},
                        {chinaName:'帝国时代大礼包',probability:'1.25%'},{chinaName:'极限竞速：地平线 5',probability:'1.25%'},{chinaName:'赛博朋克2077',probability:'1.25%'},
                        {chinaName:'三国志14 威力加强版',probability:'0.5%'},{chinaName:'使命召唤大礼包',probability:'0.5%'}],
      }
  },
}

</script>

<style lang="scss" scoped>
.alertSlotBox{
    width: 691px;
    height: 466px;
    position: relative;
    top: 100px;
    left: 0px;
    // 文案
    .title {
        width: 691px;
        height: 46px;
        margin-top: 9px;
    }
    .title2 {
        width: 300px;
        height: 20px;
        color: #FFE6B2;
        position: absolute;
        left: 192px;
    }
    .freeGoldCoin{
        width: 616px;
        height: 309px;
        margin: 38px 0 0 37px;
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
                    margin-left: 23px;
                }
                .drawTime {
                    width: 108px;
                    line-height: 48px;
                    margin-left: 148px;
                }
            }
        }
        .luckBagTitle2 {
            width: 616px;
            height: 49px;
            .luckBagBox {
                width: 558px;
                height: 48px;
                margin-left: 24px;
                display: flex;
                color: rgba(53,29,5,1);
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
                    margin-left: 140px;
                }
            }
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
.block {background-color: #FFE6B2;}
// .block {background-color: #FFDE9A;}
</style>
