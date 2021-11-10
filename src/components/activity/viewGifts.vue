<template>
<!-- 领取完成礼物 -->
    <div class="main">
        <div class="alertContent">
           <div class="viewInfo viewInfo_bg"></div>
           <div class="iKnow iKnow_bg" @click="iknowClick"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.main{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    background-color:rgba(3, 7, 23, 0.9);
    z-index: 51;
    .alertContent{
        width: 793px;
        height: 446px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
       .viewInfo{
           width: 549px;
           height: 201px;
           position: absolute;
           left: 0;
           right: 0;
           top: 0;
           margin: auto;
       }
       .iKnow{
           width: 194px;
           height: 48px;
           position: absolute;
           left: 0;
           right: 0;
           top: 300px;
           margin: auto;
           cursor: pointer;
       }
    }

}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'viewGifts',
  components:{JumpTo},
  props:[],
  data(){
      return{
        
      }
  },
  methods:{
    // 取消关闭按钮  暂时没有这个功能
    cancel(){
        this.$emit('change',  false) 
    },
    iknowClick(){
        JumpTo(0)
    }
  },
  mounted(){
    
  }

}
</script>
