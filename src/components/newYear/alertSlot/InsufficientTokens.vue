<template>
<!-- 代币不足 -->
<div class="freeGoldCoinsMain">
   <!-- <alertTitles titles='恭喜获得新春好礼'></alertTitles> -->
   <!-- 代币不足 文案 -->
   <div class="freeGoldCoin">
       <div class="text1 ft28 simkai">您的代币不足，请充值后购买福袋</div>
       <div class="text2 ft14 simkai">我的代币：{{$attrs.balanceCard.balance}}</div>
   </div>
   <!-- 底部按钮  去充值-->
   <div class="footerBtn toRecharge_bg" @click="toRecharge"></div>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 426px;
    padding-top: 40px;
    .freeGoldCoin{
        width: 100%;
        margin-top: 115px;
        .text1{
            font-weight: bold;
            line-height: 39px;
            color: #FFE6B3;
            text-align: center;
        }
        .text2{
            margin-top: 16px;
            // font-weight: bold;
            line-height: 20px;
            color: #FFE6B3;
            text-align: center;
        }
    }
    .footerBtn{
        width: 246px;
        height: 71px;
        margin: 121px auto 0;
        cursor: pointer;
    }
}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles'
export default {
  name: 'insufficientTokens',
  components:{alertTitles},
  data(){
    return {
        
      }
  },
  created(){
      
  },
  mounted(){
      
  },
  methods:{
    toRecharge(){
        // 并切换插槽内容 为freeGoldCoins免费领取金币组件 待修改
        this.$emit('change',false)
        this.$emit('changeFunc',true,{ 'changeFun':'voucherCenter'})
    }
  }
}

</script>
