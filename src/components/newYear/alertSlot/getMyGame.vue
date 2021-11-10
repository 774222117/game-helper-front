<template>
<!-- 确认领取我的游戏 -->
<div class="freeGoldCoinsMain">
   <div class="title">
       <div class="text1 ft28 font_weight simkai">确认领取到我的游戏？</div>
       <div class="text2 ft14 simkai">领取后将无法合成其他游戏</div>
   </div>
   <div class="freeGoldCoin">
      <gameItemS :gameItemSData="item" :isBigs="true" />
   </div>
   <!-- 底部按钮  去充值-->
   <div class="footerBtn">
       <div class="close getGameClose_bg" @click="getGameClose"></div>
       <div class="getGame getGameGet_bg" @click="getGameGet"></div>
   </div>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 426px;
    .title {
        width: 100%;
        color: #FFE6B3;
        margin-top: 37px;
        .text1 {
            text-align: center;
            line-height: 39px;
            margin: 0 auto;
        }
        .text2 {
            text-align: center;
            line-height: 20px;
            margin: 0 auto;
        }
    }
    .freeGoldCoin{
        width: 95px;
        height: 162px;
        margin: 27px auto;
    }
    .footerBtn{
        width: 518px;
        height: 71px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .close {
            width: 246px;
            height: 71px;
            cursor: pointer;
        }
        .getGame {
            width: 246px;
            height: 71px;
            cursor: pointer;
        }
    }
}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles'
import gameItemS from '@/components/newYear/gameItem/gameItemS'

export default {
  name: 'getMyGame',
  components:{alertTitles,gameItemS},
  inject:['myLuckyBag','ancestors'],
  data(){
    return {
        item:'',
      }
  },
  created(){
      
  },
  mounted(){
      this.item=this.$attrs.item
  },
  methods:{
    // 点击取消关闭领取游戏
    getGameClose(){
        this.$emit('change',false,false)
    },
    // 点击领取我的游戏
    getGameGet(){
        let _this = this;
        _this.$fetch("/lucky/bag/game/getIn",{'cardId':this.item.cardId}).then(response => {
            if(response.flag){
                //重新获取我的福袋数据状态
                _this.myLuckyBag.init()
                //更新我的金币 我的福袋数量 
                // this.ancestors.myGoldLucky()
            }else{
                console.log('领取游戏错误了' + response.message)
            }
            _this.$emit('change',false,true,response.flag)
        })
        
    }
  }
}

</script>
