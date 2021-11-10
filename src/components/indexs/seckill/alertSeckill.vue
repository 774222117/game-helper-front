<template>
<!-- 秒杀弹框 -->
<div class="alertMemberMain">
    <div class="alertContent">
        <!-- <div class="logoBg"><svg-icon iconClass='logoBg' className='svg_icon'></svg-icon></div> -->
        <!-- 关闭 -->
        <div class="close opc_hover" @click="cancel"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div>
        <!-- 支付成功 或者 没有库存 -->
        <div class="openMember" v-if="!!currentData && dataType != 3">
            <div class="title ft24 color_white_1"><div class="paymentSuccess"><svg-icon :iconClass="currentData.icons" class="svg_icon"></svg-icon></div> {{currentData.text1}}</div>
            <div class="title1 ft18 color3" v-if="dataType == 2">{{currentData.text2+times+currentData.text4}}</div>
            <div class="title1 ft18 color3" v-else>{{currentData.text2}}</div>
            <div class="btn ft18 color_white_1" @click="cancel">{{currentData.text3}}</div>
        </div>
        <!-- 重复购买 -->
        <div class="openMember" v-if="dataType == 3">
            <div class="title ft24 color_white_1">
                <div class="paymentSuccess">
                    <svg-icon iconClass="imSorry" class="svg_icon"></svg-icon>
                </div> 
                抱歉，无法购买！
            </div>
            <div class="title1 ft18 color3">你已购买过此游戏，不能再次购买!</div>
            <div class="btn ft18 color_white_1" @click="cancel">等待下一轮</div>
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
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        .logoBg{
            width: 486px;
            height: 480px;
            position: absolute;
            left: -87px;
            top: -120px;
        }
        // 关闭
        .close{
            width: 24px;
            height: 24px;
            position: absolute;
            right: 14px;
            top: 14px;
            cursor: pointer;
        }
        // 支付成功
        .openMember{
            width: 100%;
            height: 100%;
            .title{
                width: 100%;
                height:48px;
                font-weight:bold;
                line-height:48px; 
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 138px;
                .paymentSuccess{
                    width: 48px;
                    height: 48px;
                    margin: 0 15px 0 15px;
                }
            }
            .title1{
                width: 100%;
                height: 24px;
                line-height: 24px;
                text-align: center;
                margin-top: 13px;
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
}
</style>
<script>
import { setInterval, clearInterval } from "timers";
import JumpTo from "@/utils/jumpTo";
import store from '@/store'
export default {
  name: "alertSeckill",
  components: { JumpTo ,store},
  props: ['dataType','times'],
  data() {
    return {
        typesData:[
            {
                type:'0',
                icons:'seckillSuccess',
                text1:'支付成功',
                text2:'游戏已放至您的游戏库中，请注意查收！',
                text3:'知道啦',
                text4:''
            },
            {
                type:'1',
                icons:'donGiveUp',
                text1:'别放弃，还有机会！',
                text2:'有勇士暂未付款，请隔几秒再试，说不定能抢到',
                text3:'再试一次',
                text4:''
            },
            {
                type:'2',
                icons:'imSorry',
                text1:'抱歉，本轮被抢完',
                text2:'还剩',
                text3:'等待下一轮',
                text4:'分钟开启下一轮'
            }
        ],
        currentData:'',
    };
  },
  watch: {
    
  },
  created() {
    
  },
  destroyed() {
   
  },
  mounted() {
      var that = this
      that.typesData.forEach(function(v){
          if(v.type == that.dataType){
              that.currentData = v
          }
      })
  },
  methods: {
    // 取消关闭按钮
    cancel() {
      this.$emit('change',false)
    // this.$store.getters.getUserBalance  获取方式 
    },
    // 跳转我的游戏
    gotoMyGames() {
      JumpTo(3);
    },
  }
};
</script>
