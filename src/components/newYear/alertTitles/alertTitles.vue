<template>
<!-- 弹框头部 -->
<div class="alertTitlesMain">
   <div class="titlesTop">
       <div class="leftBg alertTitleLine_left_bg"></div>
       <div class="texts ft20 simkai">{{titles}}</div>
       <div class="rightBg alertTitleLine_right_bg"></div>
   </div>
   <div class="titlesBtm ft14 simkai" v-if="!!titles2">{{titles2}}</div>
</div>
</template>
<style lang="scss" scoped>
.alertTitlesMain{
    .titlesTop{
        display: flex;
        align-items: center;
        justify-content: center;
        .leftBg{
            width: 172px;
            height: 10px;
            font-weight: bold;
            line-height: 28px;
        }
        .texts{
            margin: 0 16px;
            color: #FFE6B3;
        }
        .rightBg{
            width: 172px;
            height: 10px;
        }
    }
    .titlesBtm{
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: rgba(255, 230, 179, 0.8);
    }
}
</style>
<script>
export default {
  name: 'alertTitles',
  components:{},
  props:['titles','titles2'],
  data(){
    return {
     
      }
  },
  created(){
      
  },
  mounted(){
  
  },
  methods:{
    
  }
}

</script>
