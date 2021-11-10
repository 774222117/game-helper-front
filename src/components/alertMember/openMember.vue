<template>
<!-- 开启会员成功 -->
<div class="alertMemberMain">
    <div class="alertContent">
        <!-- 关闭 -->
        <!-- <div class="close opc_hover" @click="cancel"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div> -->
        <!-- 开启会员 -->
        <div class="openMember">
            <div class="title ft24 color_white_1">W4PLAY <div class="vipIcon"><svg-icon iconClass="vip" class="svg_icon"></svg-icon></div> 会员开通成功</div>
            <div class="title1 ft18 color3">赠送的游戏及福利已发至您的账户中，请注意</div>
            <div class="btn ft18 color_white_1" @click="close">好的，朕知道了!</div>
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
        width: 716px;
        height: 477px;
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
            height: 24px;
            line-height: 24px;
            text-align: center;
            margin-top: 33px;
        }
        .btn{
            width:312px;
            height:44px;
            background:linear-gradient(136deg,rgba(52,171,220,1) 0%,rgba(54,124,206,1) 100%);
            border-radius:4px;
            margin: 148px auto 0;
            line-height: 44px;
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
  name: "openMember",
  components: { JumpTo, loading ,store},
  props: [],
  data() {
    return {};
  },
  watch: {
    
  },
  created() {
    
  },
  destroyed() {
   
  },
  mounted() {},
  methods: {
    // 取消关闭按钮
    cancel() {
      this.$emit('change',false)
    // this.$store.getters.getUserBalance  获取方式 
    },
    // 跳转我的游戏
    close() {
      // 完成订单在查询一次会员
      // this.$fetch('/member/join')
      //     .then((response) => {
      //         this.$store.commit('setIsMember', response)
      //     })
      this.$emit('change',false,'openSuccess')
    },
    
  }
};
</script>
