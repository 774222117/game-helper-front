<template>
  <!-- 加速器弹框 -->
  <div class="acceleratorModel">
    <div class="alertContent">
      <!-- 关闭 -->
      <div class="close opc_hover" @click="cancel">
        <svg-icon iconClass="close" class="svg_icon"></svg-icon>
      </div>
      <!-- 弹框内容 -->
      <div class="acceleratorModelContent">
        <div class="bgImgs acceleratorBg_bg"></div>
        <div class="text1 ft14 color_white_08">{{acceleratorModelGameName}}需要开启网络加速</div>
        <div class="text1 ft14 color_white_08">才能获取良好的游戏体验</div>
        <div class="btnBox">
          <div class="noSpeedUp_bg" @click="cancel"></div>
          <div class="speedUp_bg" @click="speedUp"></div>
        </div>
        <div class="startUpBox">
          <div class="frameBox margin_right_4 opc_hover8" @click="startupBtn">
            <svg-icon v-if="nomMoreReminders === '1'" iconClass="whiteHookUp" class="svg_icon"></svg-icon>
          </div>
          <div class="text1 ft12 color_white_06">不再提醒</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.acceleratorModel {
  width: 100%;
  height: calc(100% - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 51;
  background-color: rgba(0, 0, 0, 0.8);
  .alertContent {
    width: 276px;
    height: 364px;
    box-sizing: border-box;
    border-radius: 6px;
    background: rgba(16, 22, 32, 1);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    // 关闭
    .close {
      width: 24px;
      height: 24px;
      position: absolute;
      right: 14px;
      top: 14px;
      cursor: pointer;
    }
    //内容
    .acceleratorModelContent {
      width: 100%;
      height: 100%;
      overflow: hidden;
      //背景图片
      .bgImgs {
        width: 248px;
        height: 168px;
        margin: 34px auto 0;
      }
      //文案
      .text1 {
        line-height: 19px;
        text-align: center;
        text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      }
      //加速按钮
      .btnBox {
        width: 229px;
        height: 46px;
        margin: 30px auto 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          width: 102px;
          height: 46px;
          cursor: pointer;
        }
      }
      //不在提醒
      .startUpBox {
        width: 100%;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        .frameBox {
          width: 12px;
          height: 12px;
          border-radius: 4px;
          border: 1px solid rgba(49, 52, 61, 1);
          cursor: pointer;
        }
        .text1 {
          text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
</style>
<script>
import { setStore, getStore, removeStore } from "@/utils/storage";
export default {
  name: "acceleratorModel",
  props: ["acceleratorModelGameName"],
  components: {},
  data() {
    return {
      nomMoreReminders: getStore({ name: "isAcceleratorModel", type: true })
    };
  },
  methods: {
    // 取消关闭按钮
    cancel() {
      this.$emit("change", false);
    },
    speedUp() {
      this.$emit("change", false, "speedUp");
    },
    //不在提醒
    startupBtn() {
      if (getStore({ name: "isAcceleratorModel", type: true }) === "1") {
        setStore({ name: "isAcceleratorModel", content: "0", type: true });
        this.nomMoreReminders = "0";
      } else if (getStore({ name: "isAcceleratorModel", type: true }) === "0") {
        setStore({ name: "isAcceleratorModel", content: "1", type: true });
        this.nomMoreReminders = "1";
      } else {
        setStore({ name: "isAcceleratorModel", content: "1", type: true });
        this.nomMoreReminders = "1";
      }
    }
  }
};
</script>
