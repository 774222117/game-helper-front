<template>
<!-- 免费领取金币 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='恭喜获得新春好礼'></alertTitles>
   <!-- 免费金币 -->
   <div class="freeGoldCoin freeGoldCoinBg10_bg" :class="`freeGoldCoinBg${ancestors.freeGoldPic.drawId}0_bg`">
   </div>
   <!-- 底部按钮 免费领取金币-->
   <div class="footerBtn freeGoldCoin_bg" @click="freeGoldCoin"></div>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 426px;
    padding-top: 40px;
    .freeGoldCoin{
      width: 159px;
      height: 146px;
      margin: 53px auto 0;
    }
    .footerBtn{
      width: 246px;
      height: 71px;
      margin: 70px auto 0;
      cursor: pointer;
    }
}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles'
export default {
  name: 'freeGoldCoins',
  components:{alertTitles},
  inject:['ancestors'],
  data(){
    return {
      
      }
  },
  created(){
      
  },
  mounted(){
      this.ancestors.freeGoldClose = 1
  },
  methods:{
    freeGoldCoin(){
      let _this = this;
      //已参加过为true 取反
      if(!_this.ancestors.newReceivedGold){
        _this.$fetch("/lucky/bag/gold/draw").then(response => {
          //点击领取后需要在首页重新获取我的金币与我的游戏  使用 祖宗页面的 provide 将自身传递给后代组件
          _this.ancestors.myGoldLucky()
        })
      }
      _this.ancestors.showBulletFrameSmallFun(false)
    }
  }
}

</script>
