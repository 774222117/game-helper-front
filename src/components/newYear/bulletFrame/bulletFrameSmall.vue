<template>
<!-- 小 的弹框 -->
<div class="bulletFrameSmallMain">
    <!-- 背景主体 -->
    <div class="bulletFrameSmallContent bulletFrameBg_bg" :class="changeluck == 1 ? 'luckdraw' : ''"></div>
    <!-- 背景光 -->
    <div class="bulletFrameSmallLight bulletFrameBgLight_bg" :class="changeluck == 1 ? 'changelighting' : ''"></div>
    <!-- 插槽内容 -->
    <div class="bulletalert" :class="changeluck == 1 ? 'cancel' : ''">
        <!-- 关闭按钮 -->
        <div class="close newYearClose_bg" :class="changeClose == 1 ? 'unClose' : ''" @click="cancel"></div>
        <slot name="contents"></slot>
    </div>
</div>
</template>
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
        top: 90px;
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
    .bulletFrameSmallLight{
        width: 1088px;
        height: 655px;
        position: absolute;
        top: 62px;
        left: 0;
        right: 0;
        margin: 0 auto;
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
            right: -18px;
            top: -20px;
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
<script>
import gameItemS from '@/components/newYear/gameItem/gameItemS'; //弹窗竖向游戏
import gameItemH from '@/components/newYear/gameItem/gameItemH'; //弹窗横向游戏

export default {
  name: 'bulletFrameSmall',
  components:{gameItemS,gameItemH},
  props:['imgName'],
  inject:['ancestors'],
  data(){
    return {
        changeluck:0,
        changeClose:0
      }
  },
  created(){
      
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
        this.$emit('change',  false) 
    },
  }
}

</script>
