<template>
<!-- 小 的弹框 -->
<div class="bulletFrameSmallMain">
    <!-- 背景主体 -->
    <div class="bulletFrameSmallContent" :class="[changeluck == 1 ? 'luckdraw' : '',changeSolt == '' ? '' : 'smallPopUp_bg']"></div>
    <!-- 背景光 -->
    <!-- <div class="bulletFrameSmallLight"></div> -->
    <!-- 插槽内容 -->
    <div class="bulletalert" :class="changeluck == 1 ? 'cancel' : ''">
        <!-- 关闭按钮 -->
        <div class="close luckNewYearclose_bg" @click="cancel" :class="changeClose == 1 ? 'unClose' : ''"></div>
        <slot name="contents"></slot>
    </div>
</div>
</template>

<script>

export default {
  name: 'popUpSmall',
  props:['changeSolt'],
  components:{
      
  },
  inject:['ancestors'],
  data(){
    return {
        changeluck:0,
        changeClose:0,
        // changelucks:changeluck == 1 ? 'luckdraw' : '',
        // changeSolts:changeSolt == 'getFreeGold' ? '' : 'smallPopUp_bg'

      }
  },
  computed:{
      bbb(){
          return {
            changelucks:changeluck == 1 ? 'luckdraw' : '',
            changeSolts:changeSolt == 'getFreeGold' ? '' : 'smallPopUp_bg'
          }
      }
  },
  destroyed(){
      this.ancestors.animation = 0
      this.ancestors.freeGoldClose = 0
  },
  mounted(){
      if(this.ancestors.animation == 1){
          this.changeluck = 1
      }else{
          this.changeluck = 0
      }
      if(this.ancestors.freeGoldClose == 1){
          this.changeClose = 1
      }else{
          this.changeClose = 0
      }   
  },
  methods:{
    // 取消关闭按钮
    cancel(){
        this.$emit('change',false) 
    },
  }
}

</script>


<style lang="scss" scoped>
.bulletFrameSmallMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(13, 22, 30, 0.7);
    
    .bulletFrameSmallContent{
        width: 691px;
        height: 466px;
        position: absolute;
        top: 180px;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        .contents{
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 11;
            cursor: pointer;
        }
        .btnsBox{
            width: 691px;
            height: 160px;
            background-color: yellowgreen;
            cursor: pointer;
            position: relative;
            z-index: 11;
        }
    }
    .bulletalert {
        width: 691px;
        height: 627px;
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        margin: 0 auto;
        .close{
            width: 48px;
            height: 48px;
            position: absolute;
            right: -20px;
            top: 66px;
            cursor: pointer;
            z-index: 22;
        }
    }
}

.unClose{display: none;}

.cancel {animation: cancel 0.4s linear;}
.changelighting {animation: luckDrawlighting 0.4s linear;}
.luckdraw{animation: luckDraw 0.4s linear;}

    // 抽奖框弹出动画
    @keyframes luckDraw{
        0%{transform: scale(0);}
        30%{transform: scale(0.3);}
        60%{transform: scale(0.6);}
        80%{transform: scale(0.8);}
        100%{transform: scale(1);}
    }

    // 抽奖框金光动画
    @keyframes luckDrawlighting{
        0%{transform: scale(0);}
        30%{transform: scale(0.3);}
        60%{transform: scale(0.6);}
        80%{transform: scale(0.8);}
        100%{transform: scale(1);}
    }

    // 抽奖框关闭按钮动画
    @keyframes cancel{
        0%{transform: scale(0);}
        30%{transform: scale(0.3);}
        60%{transform: scale(0.6);}
        80%{transform: scale(0.8);}
        100%{transform: scale(1);}
    }
</style>
