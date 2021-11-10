<template>
<!-- 订单支付成功 -->
<div class="alertMemberMain" v-ga_p="{'items':{
                        buyGameInfo: {
                            item_id: allOrderData.appId || '',
                            item_name:allOrderData.chinaName || allOrderData.englishName,
                            price: allOrderData.price,
                            item_variant: `${purchaseTypeText[allOrderData.model]}`,
                        },
                        value:allOrderData.price}}">
    <div class="alertContent">
        <div class="logoBg"><svg-icon iconClass='logoBg' className='svg_icon'></svg-icon></div>
        <!-- 关闭 -->
        <div class="close opc_hover" @click="cancel"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div>
        <!-- 支付成功 -->
        <div class="openMember">
            <div class="title ft24 color_white_1"><div class="paymentSuccess"><svg-icon iconClass="paymentSuccess" class="svg_icon"></svg-icon></div> 支付成功</div>
            <div class="title1 ft18 color3">游戏已发至您的游戏库中，请注意查收！</div>
            <div class="btn ft18 color_white_1" @click="gotoMyGames">点击跳转我的游戏</div>
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
            }
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
  name: "orderSuccess",
  components: { JumpTo, loading ,store},
  props: ['allOrderData'],
  data() {
    return {
        purchaseTypeText:['','独享版','畅享版','试玩'],//购买类型 合完或者独享
    };
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
      this.$emit('change',false,'close')
    // this.$store.getters.getUserBalance  获取方式 
    },
    // 跳转我的游戏
    gotoMyGames() {
      this.$emit('change',false,'toMyGame')
    //   JumpTo(3);
    },
  }
};
</script>
