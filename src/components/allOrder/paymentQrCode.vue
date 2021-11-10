<template>
<!-- 支付的二维码 -->
<div class="qrCodeMain">
    <div class="qrCodeContents">
        <!-- <div class="close hover" @click="cancel"> <svg-icon iconClass="close" class="svg_icon"></svg-icon> </div> -->
        <!-- 标题 -->
        <!-- <div class="title ft18 color_white_06">请使用{{text==2?'微信':'支付宝'}}扫码支付</div> -->
        <!-- 二维码展示区域 -->
        <div class="qrCodeImgBox">
            <img :src="qrCodeSrc" alt="" v-if="qrCodeSrc">
            <loading :text="''" v-else />
        </div>
        <!-- 底部协议 -->
        <!-- <div class="btmText ft12 color_white_04" @click="openAgreement">支付成功代表同意《用户服务协议》</div> -->
    </div>
</div>
</template>

<script>
import loading from "../../components/Loading/loading";
import { setInterval,setTimeout, clearInterval } from "timers";
import store from '@/store'
export default {
  name: 'paymentQrCode',
  props: ['text','qrCodeSrc','orderId'],
  components: {loading},
  store,
  data(){
      return {
        orderTimer:null,
      }
  },
  created(){
    
  },
  destroyed(){
      this.orderTimerClearInterval()
  },
  mounted(){
    this.queryOrderTimer()
  },
  methods:{
    //关闭
    cancel(){
        this.orderTimerClearInterval()
        this.$emit("change", false);
    },
    //查询订单状态
    queryOrderState() {
        var _this = this;
        _this.$fetch("/order/query", { orderId: _this.orderId })
            .then(response => {
                if (response.flag) {
                    _this.orderTimerClearInterval()
                    //支付成功
                    _this.$emit("change", false,'paymentSuccess');
                    // 查询余额
                    _this.$fetch("/account/getBalance").then(response => {
                        _this.$store.commit('setUserBalance',response.data)
                    });
                    //在查询一次首单
                    _this.$fetch('/activity/join').then((response) => {
                    if(!response.flag){
                        _this.$store.commit('setFirstOrder',false)
                    }
                    })
                }
            });
       
        
    },
    // 创建订单定时器
    queryOrderTimer(){
        var _this = this;
        _this.orderTimerClearInterval()
        _this.orderTimer = setInterval(function(){
           _this.queryOrderState()
        },1000)
    },
    // 清除定时器
    orderTimerClearInterval(){
        if(this.orderTimer != null){
            clearInterval(this.orderTimer)
            this.orderTimer = null
        }
    },
    // 打开协议
    openAgreement(){
      var urls = window.location.protocol + '//' + window.location.host + "/userAgreement.html";
      window.sendCef("open_url", urls);
    }
  }
};
</script>
<style lang="scss" scoped>
.qrCodeMain{
    width: 100%;
    height: 100%;
    background:rgba(34,47,69,1);
    // background-color: rgba(0,0,0,0.8);
    .qrCodeContents{
        width:100%;
        height:100%;
        // background:rgba(16,22,32,1);
        // border-radius:4px;
        // position: relative;
        // left: 0;
        // top: 0;
        // right: 0;
        // bottom: 0;
        // margin: auto;
        // padding-top: 1px ;
        // 关闭
        .close{
            width: 18px;
            height: 18px;
            cursor: pointer;
            position: absolute;
            right: 6px;
            top: 6px;
        }
        // 标题
        .title{
            width: 100%;
            height: 24px;
            line-height: 24px; 
            text-align: center;
            margin-top: 75px;
        }
        // 二维码展示区
        .qrCodeImgBox{
            width: 100%;
            height: 100%;
            // margin: 34px auto 0;
            // position: relative;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        // 底部协议
        .btmText{
            width:100%;
            height:16px;
            line-height:16px;
            text-align: center;
            margin-top: 54px;
            cursor: pointer;
        }
    }
}
</style>
