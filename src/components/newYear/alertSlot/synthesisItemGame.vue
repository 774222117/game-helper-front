<template>
<!-- 合成单个SSR游戏 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='恭喜合成以下游戏'></alertTitles>
   <!-- 单个游戏 -->
   <div class="freeGoldCoin">
       <gameItemS :gameItemSData="item" :isBigs="false" />
   </div>
   <!-- 底部按钮-->
   <div class="footerBtn">
       <div class="TakeInBlessingBag TakeInBlessingBag_bg" @click="TakeInBlessingBag"></div>
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
        width: 159px;
        height: 146px;
        margin: 59px auto 0;
    }
    .footerBtn{
        width: 518px;
        height: 71px;
        display: flex;
        justify-content: center;
        margin: 218px auto 0 auto;
        .TakeInBlessingBag {
            width: 246px;
            height: 71px;
            cursor: pointer;
        }
    }
}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles';
import gameItemS from '@/components/newYear/gameItem/gameItemS'; //单个游戏展示

export default {
  name: 'synthesisItemGame',
  components:{alertTitles,gameItemS},
  data(){
    return {
        item:'',
      }
  },
  created(){
      
  },
  mounted(){
      this.$nextTick(()=>{
          this.item = this.$attrs.synthesisItemGameData
      })
  },
  methods:{
    // 收进福袋
    TakeInBlessingBag(){
        this.$emit('change',false)
    }
  }
}

</script>
