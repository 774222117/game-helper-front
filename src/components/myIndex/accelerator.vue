<template>
  <!-- 加速器 球球 -->
  <div
    class="accelerator acceleratorOuterBall_bg"
    :class="!!animationOpen?'animationOpen':''"
    @mousemove="animationOpenFun(true)"
    @mouseout="animationOpenFun(false)"
    @click="startAccelerator"
  >
    <div class="ball acceleratorBall_bg"></div>
  </div>
</template>


<script>
export default {
  name: "accelerator",
  components: {},
  props: {},
  data() {
    return {
      animationOpen: false
    };
  },
  methods: {
    animationOpenFun(boolers) {
      this.animationOpen = boolers;
    },
    startAccelerator() {
      //发送打开加速器
      callNative("open_xunyou_speed",'true')
    }
  }
};
</script>


<style lang="scss" scoped>
@import url("../../assets/css/accelerator/accelerator.css");
.accelerator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transform-origin: 50% 50%;
  .ball {
    width: 78px;
    height: 78px;
    margin: 10px;
  }
}
.animationOpen {
  animation: rotateBall 3s linear infinite;
  .ball {
    animation: rotateBall2 3s linear infinite;
  }
}
//旋转动画
@keyframes rotateBall {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
//旋转动画
@keyframes rotateBall2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
