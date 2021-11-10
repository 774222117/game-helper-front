<template>
<!-- 开启会员成功 -->
<div class="alertMemberMain">
    <div class="alertContent">
        <!-- 关闭 -->
        <div class="close opc_hover" @click="cancel"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div>
        <!-- 开启会员 -->
        <div class="openMember">
            <!-- <div class="title ft24 color_white_1">W4PLAY <div class="vipIcon"><svg-icon iconClass="vip" class="svg_icon"></svg-icon></div> 会员开通成功</div> -->
            <div class="title1 ft24 color_white_1">勇士，是否需要继续游戏？</div>
            <div class="title2 ft14 color_white_1">继续游戏将为您取消退款申请</div>
            <div class="btn2 ft14 color_white_1" @click="cancelRefund">继续游玩</div>
            <div class="btn1 ft14 color_white_1" @click="cancel">算了</div>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.alertMemberMain {
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(0, 0, 0, 0.8);
    .alertContent {
        width: 540px;
        height: 360px;
        box-sizing: border-box;
        border-radius:6px;
        background:rgba(16,22,32,1);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        // 关闭
        .close{
            width: 24px;
            height: 24px;
            position: absolute;
            right: 14px;
            top: 14px;
            cursor: pointer;
        }
        .title{
            width: 100%;
            height:32px;
            font-weight:bold;
            line-height:32px; 
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 138px;
            .vipIcon{
                width: 24px;
                height: 24px;
                margin: 0 5px 0 15px;
            }
        }
        .title1{
            width: 100%;
            height: 32px;
            text-align: center;
            margin-top: 108px;
        }
        .title2{
            width: 100%;
            height: 19px;
            text-align: center;
            margin-top: 6px;
        }
        .btn1{
          margin-right: 14px;
          cursor: pointer;
          text-decoration:underline;
          margin: 6px auto 0;
          text-align: center;
        }
        .btn2{
          width: 214px;
          height: 48px;
          margin: 60px  auto 0;
          // background:linear-gradient(136deg,rgba(52,171,220,1) 0%,rgba(54,124,206,1) 100%);
          background-color: #569FCB;
          border-radius:4px;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
        }
    }
}
</style>
<script>
import { setInterval, clearInterval } from "timers";
import JumpTo from "@/utils/jumpTo";
import loading from "../../components/Loading/loading";
import store from '@/store'
export default {
  name: "cancelRefund",
  components: { JumpTo, loading ,store},
  props: ['cancelRefundData'],
  data() {
    return {};
  },
  watch: {
    
  },
  created() {
    
  },
  destroyed() {
   
  },
  mounted() {
   
  },
  methods: {
    // 取消关闭按钮
    cancel() {
      this.$emit('change',false)
    },
    // 继续游玩 取消退款
    cancelRefund(){
      let _this = this;
      _this.$fetch("/account/cancelRefund", {orderId :_this.cancelRefundData.orderId}).then(response => {
        if(response.flag){
          // 取消退款成功后刷新我的游戏数据
          this.$emit('change',false,'cancelRefundSuccess')
        }
      });
    }
  }
};
</script>
