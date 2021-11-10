<template>
<!-- 我的福袋 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='我的福袋'></alertTitles>
   <!-- 我的福袋 内容 -->
   <div class="freeGoldCoin">
       <div class="contents" v-if="myLuckyBagInfo.length > 0">
            <div class="items" v-for="item in myLuckyBagInfo">
                <div class="gameName ft14 textOver font_weight">{{item.chinaName == ''? item.englishName : item.chinaName}}</div>
                <div class="gameLevel ft14">{{levelArray[item.level]}}</div>
                <div class="gameTime ft14">{{item.createTime}}</div>
                <div class="gameBtns ft14">
                    <div class="gameBtnsSty1" v-if="item.state == 0" @click="getGame(item)">领取游戏</div>
                    <div class="gameBtnsSty2" v-if="item.state == 1">已合成</div>
                    <div class="gameBtnsSty2" v-if="item.state == 2">已领取</div>
                </div>
            </div>
            <!-- 领取成功 -->
            <div class="tipsSuccess" v-if="gameTips">
                <div class="gameTip ft16">{{showtext?'游戏已领取':'游戏已拥有,无法领取'}}</div>
            </div>
       </div>
       <div class="noData myLuckyBagNoData_bg" v-else></div>
   </div>
    <bulletFrameSmall v-if="getMyGameModel" @change="getMyGameModelFun"><getMyGame slot="contents" :item='getMyGameData' @change="getMyGameModelFun"/></bulletFrameSmall>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 426px;
    padding-top: 40px;
    .freeGoldCoin{
        width: 606px;
        height: 349px;
        margin: 16px auto 0;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #FFE6B3;
        .contents{
            width: 100%;
            padding-top: 10px;
            .items{
                width: 508px;
                height: 51px;
                border-bottom: 1px solid #EBCA86;
                color: #916F2A;
                margin: 0 auto 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .gameName{
                    width: 56px;
                    height: 20px;
                }
                .gameLevel{
                    width: 40px;
                    height: 20px;
                }
                .gameTime{
                    width: 140px;
                    height: 20px;
                }
                .gameBtns{
                    width: 77px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    .gameBtnsSty1{
                        width: 100%;
                        height: 100%;
                        border: 1px solid #916F2A;
                        box-sizing: border-box;
                        cursor: pointer;
                    }
                    .gameBtnsSty1:hover{
                        border: 1px solid #916F2A;
                        font-weight: bold;
                    }
                    .gameBtnsSty2{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            // 游戏已领取
            .tipsSuccess {
                width: 240px;
                height: 78px;
                position: fixed;
                background-color: rgba(6,6,6,0.84);
                border: 1px solid #FFC850;
                box-sizing: border-box;
                left: 0;
                top: 350px;
                right: 0;
                bottom: 0;
                margin: 0 auto;
                // 提示
                .gameTip {
                    min-width: 136px;
                    line-height: 78px;
                    color: #FFFFFF;
                    text-align: center;
                }
            }
        }
        .noData{
            width: 100%;
            height: 100%;
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
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles'
import getMyGame from '@/components/newYear/alertSlot/getMyGame'; //领取我的游戏
import bulletFrameSmall from '@/components/newYear/bulletFrame/bulletFrameSmall';
export default {
  name: 'myLuckyBag',
  components:{alertTitles,bulletFrameSmall,getMyGame},
  inject :['ancestors'],
  data(){
    return {
        levelArray:['','B','A','S','SS','SSR'],
        myLuckyBagInfo:[],
        getMyGameModel:false,//是否开启弹框
        getMyGameData:'',//领取游戏的数据
        gameTips:false,//游戏是否领取提示框显示隐藏
        showtext:true,//游戏是否领取提示框文案
      }
  },
  provide(){
      return {
          myLuckyBag:this
      }
  },
  created(){
      
  },
   mounted(){
        this.init()
    },
    methods:{
       //初始化
        init(){
            let _this = this;
            // 我的福袋数据
            if(!!_this.$store.getters.getStorage){
                _this.$fetch("/lucky/bag/my/card").then(response => {
                    if(response.flag){
                        _this.myLuckyBagInfo = response.data 
                    }else{
                        console.log('没有抽奖次数回馈')
                    }
                });
            }
            
        },
        //打开关闭领取游戏
        getMyGameModelFun(data,state,writ){
            // 整个领取框
            this.getMyGameModel = data
            // 游戏领取框显示
            this.gameTips = state
            // 游戏领取文案选择 
            this.showtext = writ
            setTimeout(() => {
                this.gameTips = false ;
            },2000)
        },
        //领取游戏
        getGame(item){
            this.getMyGameData = item
            this.getMyGameModelFun(true)
        }
    }
}

</script>
