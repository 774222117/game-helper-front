<template>
   <!-- 标题 -->
  <div class="commentMain" style="dislay:none;">
    <!-- 左边 -->
    <div class="left">
      <!-- <div class="icon"><svg-icon iconClass='indexTitleBg' className='svg_icon'></svg-icon></div> -->
      <div class="icon"><svg-icon :iconClass='indexTitleIcon' className='svg_icon'></svg-icon></div>
      <div class="titleText ft18 color_white_1 font_weight">{{text}}</div>
      <div class="labels">
        <div class="labelItem ft12" v-for="i in labels">{{i}}</div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right opc_hover8" @click="reloadFun" v-if="text == '限量秒杀'?false:true">
      <img src="../../../../public/images/breath.png" alt="">
      <div class="refreshIcon"><svg-icon iconClass='refreshBull' className='svg_icon'></svg-icon></div>
      <div class="text ft16">
        {{playNum}}人刚浏览</div>
    </div>
  </div>
</template>
<script>
import { setInterval,setTimeout, clearInterval } from "timers";
export default {
  name: 'indexTitle',
  props: ['text','indexTitleIcon','labels'],
  data(){
      return {
        playNum:10,
        playNumTimer:null
      }
  },
  activated(){

  },
  mounted(){
    this.playNumRandom()
  },
  methods:{
    //重新加载数据
    reloadFun(){
      this.clearPlayNumRandom()
      this.$emit('change',this.text)
      this.playNumRandom()
    },
    // 随机增加浏览人数
    playNumRandom(){
      this.playNumTimer = setInterval(()=>{
        if(this.playNum >= 9999){
          this.playNum = 9999
        }else{
          this.playNum = this.playNum + Math.floor(Math.random() * (10)) + 1
        }
         
      },Math.floor(Math.random() * (2000)) + 1000)
    },
    // 清楚定时器
    clearPlayNumRandom(){
      this.playNum = 0
      clearInterval( this.playNumTimer )
      this.playNumTimer = null
    }
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 左边
  .left{
    width: auto;
    height: 44px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
   .icon{
     width: 30px;
     height: 30px;
     margin-right: 4px;
   }
   .titleText{
     margin-right: 10px;
   }
   .labels{
     display: flex;
    .labelItem{
      padding: 1px 5px;
      border-radius: 2px;
      border: 1px solid rgba(138, 221, 255, 0.8);
      font-weight: bold;
      color: #8ADDFF;
      margin-right: 10px;
    }
   }

  }

  .right:hover .refreshIcon{
    transform: rotate(180deg);
  }
  .right{
    width:145px;
    height:44px;
    // border:1px solid rgba(55,169,255,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #051824;
    color:rgba(138, 221, 255, 1);
    position: relative;
    img {
        position: absolute;
        top: 0;
        left: -5px;
        animation:myBox 7s infinite linear;
			  transform-origin: center 44px;
        position: absolute;
      }
    .refreshIcon{
      width: 24px;
      height: 24px;
      transition: all 0.3s linear;
    }
    .text{
      width: auto;
      height: 24px;
      line-height: 24px;
      margin-left: 7px;
      position: relative;
      // overflow: hidden;
    }
  }
}

@keyframes myBox{
				0%{transform: scale(0.75);}
				25%{transform: scale(0.45);}
				50%{transform: scale(0.1);}
				75%{transform: scale(0.45);}
				100%{transform: scale(0.75);}
			}
</style>
