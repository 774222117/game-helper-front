<template>
<!-- 支付弹框 -->
  <div class="alertMain">
    <div class="alertContent" v-if="flag">
      <!-- 内容盒子 -->
      <div class="mainConment" v-if="!ifpayments">
        <div class="leftGameInfo">
          <!-- 图片 -->
          <div class="gameInfoImg">
            <img class="imgBlock" :src="ifModelType.image" alt />
          </div>
          <!-- 游戏名称 -->
          <div class="texts text1">
            <div class="ft14 color_white_04">游戏名称</div>
            <div class="ft14 color_white_08">{{ ifModelType.chinaName == '' ? ifModelType.englishName : ifModelType.chinaName}}</div>
          </div>
          <!-- 购买类型 -->
          <div class="texts text2">
            <div class="ft14 color_white_04">购买类型</div>
            <div class="ft14 color_white_08">{{ifModelType.model == 1?'独享版':'畅享版' }}</div>
          </div>
          <!-- 线条 -->
          <div class="lineBox"></div>
          <!-- 游戏原价 -->
          <div class="texts text3">
            <div class="ft14 color_white_04">游戏原价</div>
            <div class="ft14 color_white_08">¥{{ifModelType.steamPrce}}</div>
          </div>
          <!-- 专享优惠 -->
          <div class="texts text4">
            <div class="ft14 color_white_04">专享优惠</div>
            <div class="ft14 color3 textRed">本次立省¥{{Math.round( (ifModelType.steamPrce - tobePaid)*100 )/100}}</div>
          </div>
          <!-- 账户余额 -->
          <div class="texts text5">
            <div class="ft14 color_white_04">账户余额</div>
            <div class="checkMarkBox">
              <div class="checkMark checkMark1 opc_hover8" v-if="userBalance > -1" @click="balancePaymentHook">
                <svg-icon v-if="isBalancePayment" iconClass="whiteHookUp" class="svg_icon"></svg-icon>
              </div>
              <div class="ft14 color_white_08 margin_left_8">使用 ¥{{userBalance}}</div>
            </div>
          </div>
          <!-- 线条 -->
          <div class="lineBox"></div>
          <!-- 待付金额 -->
          <div class="texts text6">
            <div class="ft14 color_white_04">待付金额</div>
            <div class="ft14 color_white_08">¥{{tobePaid}}</div>
          </div>
        </div>
        <div class="rightPaymentMode">
          <!-- 关闭按钮 -->
          <div class="closeBtn opc_hover" @click="cancel">
            <svg-icon iconClass="close" class="svg_icon"></svg-icon>
          </div>
          <div class="title ft18 font_weight color_white_04">选择支付方式</div>
          <div v-if="!enough" class="paymentMain">
            <div class="paymentContentTop">
              <div class="wxBox" @click="wxActiveFun">
                <svg-icon
                  :iconClass="orderDatas.payType == 2 ? 'wxActive' : 'wxDefault'"
                  class="svg_icon"
                ></svg-icon>
              </div>
              <div class="zfbBox" @click="zfbActiveFun">
                <svg-icon
                  :iconClass="orderDatas.payType == 3 ? 'zfbActive' : 'zfbDefault'"
                  class="svg_icon"
                ></svg-icon>
              </div>
            </div>
            <div class="paymentContentBottom">
              <div @click="refreshQrcodeUrl" v-if="qrcodeImgType">
                <svg-icon iconClass="QRcodeRefresh" class="svg_icon"></svg-icon>
              </div>
              <img class="QRcodeImgs" v-if="qrcodeUrl !=='' && !qrcodeImgType" :src="qrcodeUrl" alt />
              <div class="qrcodeLoading" v-if="qrcodeUrl =='' && !qrcodeImgType">
                <loading :text="''" />
              </div>
            </div>
          </div>
          <div
            v-if="isBalancePayment && enough"
            class="balancePayment back5 ft14 color_white_1"
            @click="balancePayment"
          >使用余额直接支付</div>
          <div class="agreements">
            <div class="ft12 color_white_02 margin_left_6 cur marAuto" @click="openUrl">支付成功即表示同意《用户服务协议》</div>
          </div>
          <!-- 线条 -->
          <div class="lineBox"></div>
          <!-- 卖点 独享 -->
          <div class="sellingPoint" v-if="ifModelType.model == 1">
              <div class="sellingPointItems">
                <div class="iconBox"><svg-icon iconClass='security' className='svg_icon'></svg-icon></div>
                <div class="textBox ft12 color_white_06">独享游戏</div>
              </div>
              <div class="sellingPointItems">
                <div class="iconBox"><svg-icon iconClass='gift' className='svg_icon'></svg-icon></div>
                <div class="textBox ft12 color_white_06">官方正版</div>
              </div>
              <div class="sellingPointItems">
                <div class="iconBox"><svg-icon iconClass='acPrice' className='svg_icon'></svg-icon></div>
                <div class="textBox ft12 color_white_06">未玩退款</div>
              </div>
          </div>
          <!-- 卖点 畅享版 -->
          <div class="sellingPoint" v-if="ifModelType.model == 2">
              <div class="sellingPointItems">
                <div class="iconBox"><svg-icon iconClass='gift' className='svg_icon'></svg-icon></div>
                <div class="textBox ft12 color_white_06">官方正版</div>
              </div>
              <div class="sellingPointItems">
                <div class="iconBox"><svg-icon iconClass='lightning' className='svg_icon'></svg-icon></div>
                <div class="textBox ft12 color_white_06">极速发货</div>
              </div>
              <div class="sellingPointItems">
                <div class="iconBox"><svg-icon iconClass='acPrice' className='svg_icon'></svg-icon></div>
                <div class="textBox ft12 color_white_06">24H退款</div>
              </div>
          </div>
        </div>
      </div>
      <!-- 支付成功 -->
      <div class="paymentSuccess" v-if="ifpayments">
        <div class="paymentSuccessSvg">
          <svg-icon iconClass="paymentSuccess" class="svg_icon"></svg-icon>
        </div>
        <div class="paymentSuccessText ft18 color_white_1 font_weight">支付成功！</div>
        <div class="paymentSuccessBtn back5 ft14 color_white_1" @click="gotoMyGames">点击跳转我的游戏</div>
      </div>
    </div>
    <div class="alertContent" v-else>
      <loading />
    </div>

  </div>
</template>
<style lang="scss" scoped>
.alertMain {
  width: 100%;
  height: calc(100% - 60px);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 51;
  background-color: rgba(0, 0, 0, 0.8);
  .alertContent {
    width: 663px;
    height: 450px;
    // padding: 20px 20px 0;
    box-sizing: border-box;
    background-color: rgba(22, 23, 27, 1);
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .mainConment {
      width: 100%;
      // height: 378px;
      height: 100%;
      // margin-top: 25px;
      display: flex;
      justify-content: space-between;
      .leftGameInfo {
        width: 342px;
        height: 100%;
        padding: 35px 24px 0 24px;
        box-sizing: border-box;
        background-color: rgba(21, 23, 27, 1);
        .gameInfoImg{
          width: 295px;
          height: 138px;
          .imgBlock{
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .lineBox{
          width:100%;
          height:1px;
          background-color: rgba(151, 151, 151, 0.2);
          margin-top: 16px;
        }
        .texts{
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .text1 {
          margin-top: 16px;
        }
        .text2 {
          margin-top: 16px;
        }
        .text3 {
          margin-top: 16px;
        }
        .text4 {
          margin-top: 16px;
          .textRed{
            font-weight: bold;
          }
        }
        .text5 {
          margin-top: 16px;
          .checkMarkBox{
            display: flex;
          }
        }
        .text6 {
          margin-top: 16px;
        }
      }
      .rightPaymentMode {
        width: 320px;
        height: 100%;
        padding-left: 22px;
        box-sizing: border-box;
        background-color: rgba(31, 33, 39, 1);
        // 关闭按钮
        .closeBtn {
          width: 17px;
          height: 17px;
          margin: 3px 3px 0 0;
          cursor: pointer;
          float: right;
        }
        .title {
          height: 23px;
          margin-top: 17px;
          margin-bottom: 10px;
        }
        .paymentMain {
          width: 275px;
          height: 325px;
          .paymentContentTop {
            width: 100%;
            height: 40px;
            margin-bottom: 9px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            div {
              width: 128px;
              height: 40px;
              cursor: pointer;
            }
          }
          .paymentContentBottom {
            width: 275px;
            height: 275px;
            box-sizing: border-box;
            border: 1px solid rgb(108, 115, 117);
            border-radius: 2px;
            overflow: hidden;
            div {
              width: 100%;
              height: 100%;
              display: block;
              cursor: pointer;
            }
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
            .QRcodeImgs{
              width: 245px;
              height: 245px;
              margin: 15px;
            }
            .qrcodeLoading{
              width: 100%;
              height: 100%;
              position: relative;
            }
          }
        }
        .balancePayment {
          width: 280px;
          height: 50px;
          border-radius: 2px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
        }
        .agreements {
          display: flex;
          margin: 8px 0;
          .cur {
            cursor: pointer;
          }
          .marAuto{
            margin: 0 auto;
          }
        }
        .lineBox{
          width:275px;
          height:1px;
          background-color: rgba(151, 151, 151, 0.2);
        }
        // 卖点
        .sellingPoint{
          width: 275px;
          height: 42px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sellingPointItems{
            display: flex;
            justify-content: center;
            align-items: center;
            .iconBox{
              width: 21px;
              height: 21px;
              opacity: 0.6;
            }
          }
        }
      }
    }
  }
  // 支付成功
  .paymentSuccess {
    .paymentSuccessSvg {
      width: 134px;
      height: 134px;
      margin: 0.83rem auto 0.06rem;
    }
    .paymentSuccessText {
      text-align: center;
      line-height: 23px;
      margin-bottom: 0.53rem;
    }
    .paymentSuccessBtn {
      width: 246px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      margin: auto;
    }
  }
}
// 勾勾
.checkMark {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1px solid rgba(49, 52, 61, 1);
  font-size: 9px;
  text-align: center;
  line-height: 18px;
  color: white;
  cursor: pointer;
}
</style>
<script>
import { setInterval, clearInterval } from "timers";
import JumpTo from "@/utils/jumpTo";
import loading from "../../components/Loading/loading";
import store from '@/store'
export default {
  name: "alertModelPayment",
  components: { JumpTo, loading ,store},
  props: ["ifModelShow", "ifModelType"],
  data() {
    return {
      flag: false, //接口请求完成
      isAgreement: true, //勾勾
      isBalancePayment: false, //余额支付
      channelId: "", //渠道id
      userBalance: "", //用户余额
      tobePaid: "", //待付款金额
      qrcodeUrl: "", //二维码
      enough: false, //是否能使用余额支付  为true时余额足够支付 显示直接余额支付
      orderId: "", //订单id

      ifpayments: false, //是否支付成功 成功显示成功页面
      timer: null, //定时器
      timeS: 15, //15s跳转
      timeAjax: 1000, //1秒请求一次

      qrcodeTimer: 180000, //二维码失效时间
      qrcodeSetTimeOut: null, // 二维码定时器
      qrcodeImgType: false, //判断二维码是否失效 true为失效

      orderDatas: {} //当前订单的请求数据
    };
  },
  watch: {
    $route(to, from) {
      clearInterval(this.timer);
      this.timer = null;

      clearInterval(this.qrcodeSetTimeOut);
      this.qrcodeSetTimeOut = null;
    }
  },
  //   created(){
  //     this.createOrder()
  //   },
  created() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器创建订单
    clearInterval(this.timer);
    this.timer = null;

    clearInterval(this.qrcodeSetTimeOut);
    this.qrcodeSetTimeOut = null;
    this.createOrder();
  },
  destroyed() {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer);
    this.timer = null;

    clearInterval(this.qrcodeSetTimeOut);
    this.qrcodeSetTimeOut = null;
  },
  mounted() {},
  methods: {
    // 取消关闭按钮
    cancel() {
      this.timeS = 15;
      clearInterval(this.timer);
      this.timer = null;

      clearInterval(this.qrcodeSetTimeOut);
      this.qrcodeSetTimeOut = null;

      this.$emit("change", false);
    },
    balancePaymentHook() {
      //使用余额 切换勾勾
      var _this = this;

      _this.qrcodeUrl = ''

      clearInterval(this.timer);
      this.timer = null;

      clearInterval(this.qrcodeSetTimeOut);
      this.qrcodeSetTimeOut = null;

      var isBalancePayments = !_this.isBalancePayment;

      var datas = {
        appId: _this.ifModelType.appId,
        productId: _this.ifModelType.id,
        // 'OKF_TOKEN':this.ifModelType.OKF_TOKEN,
        payType: _this.ifModelType.payType,
        balanceType: _this.ifModelType.balanceType,
        channelId: _this.ifModelType.channelId
      };

      if (isBalancePayments) {
        datas.balanceType = 1;
      } else {
        datas.balanceType = 0;
      }

      _this.orderDatas = datas;
      _this.$fetch("/order/create", _this.orderDatas).then(response => {
        _this.userBalance = response.data.balance || ''; //用户余额
        _this.tobePaid = response.data.unpay; //待付款金额
        _this.qrcodeUrl = response.data.qrcode; //二维码
        _this.enough = response.data.enough; //是否可以使用余额直接支付
        _this.flag = response.flag; //订单创建是否成功
        _this.orderId = response.data.orderId; //订单id

        //请求成功后显示勾勾
        _this.isBalancePayment = isBalancePayments;
        //设置显示二维码
        _this.qrcodeImgType = false;
        //创建订单完成开始轮询 查询订单是否完成
        _this.setTimerAjax();
        //生成二维码失效时间定时器
        _this.qrcodeSetTimeOutFun();
      });
    },
    agreement() {
      //协议点击方法 切换勾勾
      this.isAgreement = !this.isAgreement;
    },
    //创建订单
    createOrder() {
      var _this = this;
      var datas = {
        appId: this.ifModelType.appId,
        productId: this.ifModelType.id,
        // 'OKF_TOKEN':this.ifModelType.OKF_TOKEN,
        payType: this.ifModelType.payType,
        balanceType: this.ifModelType.balanceType,
        channelId: this.ifModelType.channelId
      };
      _this.orderDatas = datas;
      console.log(datas.channelId);
      _this.$fetch("/order/create", _this.orderDatas).then(response => {
        if(response.flag){
          _this.userBalance = response.data.balance || ''; //用户余额
          _this.tobePaid = response.data.unpay; //待付款金额
          _this.qrcodeUrl = response.data.qrcode; //二维码
          _this.enough = response.data.enough; //是否可以使用余额直接支付
          _this.flag = response.flag; //订单创建是否成功
          _this.orderId = response.data.orderId; //订单id

          //创建订单完成开始轮询 查询订单是否完成
          _this.setTimerAjax();
          //生成二维码失效时间定时器
          _this.qrcodeSetTimeOutFun();
        }else{
           this.$emit("change", false,'orderFalse');
        }
      });
    },
    //   使用余额直接支付
    balancePayment() {
      var _this = this;
      _this
        .$fetch("/order/balance/pay", { orderId: _this.orderId })
        .then(response => {
          if (response.flag) {
            console.log("支付成功  跳转成功页面");
            this.ifpayments = true;
            this.setTimer();
          }
        });
    },
    //查询订单状态
    queryOrderState() {
      var _this = this;
      _this
        .$fetch("/order/query", { orderId: _this.orderId })
        .then(response => {
          if (response.flag) {
            console.log("支付成功  跳转成功页面");
            _this.ifpayments = true;

            clearInterval(_this.timer);
            _this.timer = null;

            clearInterval(_this.qrcodeSetTimeOut);
            _this.qrcodeSetTimeOut = null;

            _this.setTimer();

            // 查询余额
            _this.$fetch("/account/getBalance").then(response => {
              _this.$store.commit('setUserBalance',response.data)
            });
          } else {
            // clearInterval(_this.timer);
            // _this.timer = null;

            // clearInterval(_this.qrcodeSetTimeOut);
            // _this.qrcodeSetTimeOut = null;
            console.log("支付失败");
          }
        });
    },
    // 跳转我的游戏
    gotoMyGames() {
      let _this = this;
      clearInterval(_this.timer);
      _this.timer = null;

      clearInterval(_this.qrcodeSetTimeOut);
      _this.qrcodeSetTimeOut = null;
      JumpTo(3);
    },
    //定时器函数
    setTimer() {
      clearInterval(this.timer);
      this.timer = null;
    //   this.gotoMyGames();
    //   this.timer = setInterval(() => {
    //     this.timeS--;
    //     if (this.timeS <= 0) {
    //       this.timeS = 15;
    //       clearInterval(this.timer);
    //       this.timer = null;
         
    //     }
    //   }, 1000);
    },
    //查询订单状态定时器函数
    setTimerAjax() {
      this.timer = setInterval(() => {
        this.queryOrderState();
      }, this.timeAjax);
    },
    //二维码失效定时器
    qrcodeSetTimeOutFun() {
      var _this = this;
      _this.qrcodeSetTimeOut = setInterval(() => {
        _this.qrcodeImgType = true;
      }, _this.qrcodeTimer);
    },

    //二维码失效后刷新
    refreshQrcodeUrl() {
      var _this = this;
      _this.queryOrderState(); //查询订单状态
      clearInterval(_this.timer);
      _this.timer = null;

      clearInterval(_this.qrcodeSetTimeOut);
      _this.qrcodeSetTimeOut = null;
      _this.$fetch("/order/create", _this.orderDatas).then(response => {
        _this.userBalance = response.data.balance || ''; //用户余额
        _this.tobePaid = response.data.unpay; //待付款金额
        _this.qrcodeUrl = response.data.qrcode; //二维码
        _this.enough = response.data.enough; //是否可以使用余额直接支付
        _this.flag = response.flag; //订单创建是否成功
        _this.orderId = response.data.orderId; //订单id

        //设置显示二维码
        _this.qrcodeImgType = false;
        //创建订单完成开始轮询 查询订单是否完成
        _this.setTimerAjax();
        //生成二维码失效时间定时器
        _this.qrcodeSetTimeOutFun();
      });
    },
    //支付宝点击
    zfbActiveFun() {
      var _this = this;
      if(_this.orderDatas.payType != 3){
        _this.orderDatas.payType = 3;

        _this.qrcodeUrl = ''

        clearInterval(_this.timer);
        _this.timer = null;

        clearInterval(_this.qrcodeSetTimeOut);
        _this.qrcodeSetTimeOut = null;

        _this.$fetch("/order/create", _this.orderDatas).then(response => {
          _this.userBalance = response.data.balance  || ''; //用户余额
          _this.tobePaid = response.data.unpay; //待付款金额
          _this.qrcodeUrl = response.data.qrcode; //二维码
          _this.enough = response.data.enough; //是否可以使用余额直接支付
          _this.flag = response.flag; //订单创建是否成功
          _this.orderId = response.data.orderId; //订单id

          //创建订单完成开始轮询 查询订单是否完成
          _this.setTimerAjax();
          //生成二维码失效时间定时器
          _this.qrcodeSetTimeOutFun();
        });
      }
      
    },
    //微信点击
    wxActiveFun() {
      var _this = this;
      if(_this.orderDatas.payType != 2){
        _this.orderDatas.payType = 2;

        _this.qrcodeUrl = ''

        clearInterval(_this.timer);
        _this.timer = null;

        clearInterval(_this.qrcodeSetTimeOut);
        _this.qrcodeSetTimeOut = null;

        _this.$fetch("/order/create", _this.orderDatas).then(response => {
          _this.userBalance = response.data.balance || ''; //用户余额
          _this.tobePaid = response.data.unpay; //待付款金额
          _this.qrcodeUrl = response.data.qrcode; //二维码
          _this.enough = response.data.enough; //是否可以使用余额直接支付
          _this.flag = response.flag; //订单创建是否成功
          _this.orderId = response.data.orderId; //订单id

          //创建订单完成开始轮询 查询订单是否完成
          _this.setTimerAjax();
          //生成二维码失效时间定时器
          _this.qrcodeSetTimeOutFun();
        });
      }
      
    },
    // 打开协议
    openUrl() {
      var urls = window.location.protocol + '//' + window.location.host + "/userAgreement.html";
      window.sendCef("open_url", urls);
    }
  }
};
</script>
