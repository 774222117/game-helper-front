<template>
<!-- 抱歉错误页面 -->
 <div class="activityMainBox">
   <div class="activityError">
     <!-- <div class="backHome backHome_bg" @click="backFun"></div> -->
     <div class="activityErrorImg activityErrorImg_bg"></div>
   </div>
 </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'
export default {
  components: {JumpTo},
  data(){
    return {
     
    }
  },
  activated(){
     
  },
  watch:{
    
  },
  computed:{
   
  },
  methods:{
    backFun(){
        JumpTo(0)
    }
  }
};
</script>
<style lang="scss" scoped>
.activityMainBox{
    width: 100%;
    height: 760px;
    overflow: hidden;
    .activityError{
      width: 1280px;
      height: 100%;
      margin: 0 auto;
      .backHome{
        width: 102px;
        height: 40px;
        margin:60px 0 0 100px;
        cursor: pointer;
      }
      .activityErrorImg{
        width: 1261px;
        height: 759px;
        margin: 0 auto;
      }
    }
}
</style>
