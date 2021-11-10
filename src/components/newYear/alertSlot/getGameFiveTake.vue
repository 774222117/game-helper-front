<template>
<!-- 十连抽 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='恭喜您抽中了以下游戏'></alertTitles>
   <!-- 十连抽到的游戏 -->
   <div class="freeGoldCoin">
       <gameItemS class="gameItem" v-for="data in gameItemSData" :gameItemSData="data" :isBigs="true"/>
   </div>
   <!-- 底部按钮-->
   <div class="footerBtn">
       <div class="TakeInBlessingBag TakeInBlessingBag_bg" @click="TakeInBlessingBag"></div>
       <div class="OneMoreTime OneMoreTime_bg" @click="OneMoreTime"></div>
   </div>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 524px;
    padding-top: 40px;
    position: relative;
    .freeGoldCoin{
        width: 550px;
        height: 146px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        margin-top: 85px;
        align-items: center;
        animation: fiveTake 0.4s 0.2s linear;
        transform-origin: 45% 40%;
        animation-fill-mode: forwards;
        opacity: 0;
    }
    .footerBtn{
        width: 518px;
        height: 71px;
        display: flex;
        justify-content: space-between;
        margin: 191px auto 0 auto;
        animation: footerBtn 0.4s linear;
        .TakeInBlessingBag {
            width: 246px;
            height: 71px;
            cursor: pointer;
        }
        .OneMoreTime {
            width: 246px;
            height: 71px;
            cursor: pointer;
        }
    }
}

// 抽奖框内容弹出
    @keyframes fiveTake{
			0%{transform: scale(0);opacity: 0;}
			30%{transform: scale(0.3);opacity: 0.5;}
			60%{transform: scale(0.6);opacity: 1;}
			80%{transform: scale(0.8);opacity: 1;}
			100%{transform: scale(1);opacity: 1;}
        }

// 抽奖框内容底部按钮
    @keyframes footerBtn{
			0%{transform: scale(0);}
			30%{transform: scale(0.3);}
			60%{transform: scale(0.6);}
			80%{transform: scale(0.8);}
			100%{transform: scale(1);}
        }
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles';
import gameItemS from '@/components/newYear/gameItem/gameItemS'; //单个游戏展示
import { EventBus } from "@/utils/eventBus.js";
export default {
  name: 'getGameFiveTake',
  components:{alertTitles,gameItemS},
  data(){
    return {
        gameItemSData:'',
      }
  },
  inject:['ancestors'],
  created(){
      
  },
  mounted(){
      this.geFiveLuck()
  },
  methods:{
    //五连抽游戏
    geFiveLuck(){
        let _this = this;
        _this.$fetch("/lucky/bag/draw",{'open':5}).then(response => {
            //领取成功
            if(response.flag){
                _this.gameItemSData = response.data
                _this.ancestors.myGoldLucky()
                // 抽奖成功重新获取合成大赏的数据
                EventBus.$emit('syntheticGameGetData')
                // 抽奖成功重新获取达量反馈数据
                EventBus.$emit('getDrawFeedInit')
                // 五连抽成功让奖品展示框添加class动画
                EventBus.$emit('luckFive',{'changeAnimation':1})
            }else{
                console.log('五连抽游戏失败')
            }
        })    
    },
    // 收进福袋
    TakeInBlessingBag(){
        this.$emit('change',false)
    },
    // 再抽一次
    OneMoreTime(){
        this.$emit('change',false)
        this.ancestors.luckDrawNum('getGameFiveTake')
    }
  }
}

</script>
