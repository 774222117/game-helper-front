<template>
<!-- 未登录付款弹框 -->
  <div class="alertMain">
    <div class="alertContent" v-if="flag">
      <!-- 内容盒子 -->
      <div class="mainConment" v-if="!ifpayments">
        <div class="leftGameInfo">
          <!-- 图片 -->
          <div class="gameInfoImg">
            <img class="imgBlock" :src="noLoginPaymentOrderData.image" alt />
          </div>
          <!-- 游戏名称 -->
          <div class="texts text1">
            <div class="ft14 color_white_04">游戏名称</div>
            <div class="ft14 color_white_08">{{ noLoginPaymentOrderData.chinaName == '' ? noLoginPaymentOrderData.englishName : noLoginPaymentOrderData.chinaName}}</div>
          </div>
          <!-- 购买类型 -->
          <div class="texts text2">
            <div class="ft14 color_white_04">购买类型</div>
            <div class="ft14 color_white_08">{{noLoginPaymentOrderData.model == 1?'独享版':'畅享版' }}</div>
          </div>
          <!-- 线条 -->
          <div class="lineBox"></div>
          <!-- 游戏原价 -->
          <div class="texts text3">
            <div class="ft14 color_white_04">游戏原价</div>
            <div class="ft14 color_white_08">¥{{worth}}</div>
          </div>
          <!-- 专享优惠 -->
          <div class="texts text4">
            <div class="ft14 color_white_04">专享优惠</div>
            <div class="ft14 color3 textRed">本次立省¥{{discount}}</div>
          </div>
           <!-- 账户余额 -->
          <div class="texts text5">
            <div class="ft14 color_white_04">账户余额</div>
            <div class="checkMarkBox">
              
              <div class="ft14 color_white_08 margin_left_8">--</div>
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
        <!-- 登录界面 -->
        <div class="rightPaymentMode" v-if="orderTure">
          <!-- 关闭按钮 -->
          <div class="closeBtn opc_hover" @click="cancel">
            <svg-icon iconClass="close" class="svg_icon"></svg-icon>
          </div>
          <div class="title ft18 font_weight color_white_04">选择支付方式</div>
          <div v-if="!enough" class="paymentMain">
            <div class="paymentContentTop">
              <div class="wxBox" @click="wxActiveFun">
                <svg-icon
                  :iconClass="orderData.payType == 2 ? 'wxActive' : 'wxDefault'"
                  class="svg_icon"
                ></svg-icon>
              </div>
              <div class="zfbBox" @click="zfbActiveFun">
                <svg-icon
                  :iconClass="orderData.payType == 3 ? 'zfbActive' : 'zfbDefault'"
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
          <div class="agreements">
            <div class="ft12 color_white_02 margin_left_6 cur marAuto" @click="openUrl">支付成功即表示同意《用户服务协议》</div>
          </div>
          <!-- 线条 -->
          <div class="lineBox"></div>
          <!-- 卖点 独享 -->
          <div class="sellingPoint" v-if="noLoginPaymentOrderData.model == 1">
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
          <div class="sellingPoint" v-if="noLoginPaymentOrderData.model == 2">
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
        <!-- 订单界面 -->
        <div class="noLogin" v-else>
          <!-- 关闭按钮 -->
          <div class="closeBtn opc_hover" @click="cancel">
            <svg-icon iconClass="close" class="svg_icon"></svg-icon>
          </div>
          <div class="title ft18 font_weight color_white_04" style="margin-top:15px;">绑定账号后购买</div>
          <!-- 登录的 账号 -->
          <div class="inputBox">
            <div class="leftIcon">
              <svg-icon iconClass='loginphone' className='svg_icon'></svg-icon>
            </div>
            <div class="rightInput">
              <input class="ft14 color_white_08 opc_focus" type="text" placeholder="请输入手机号" v-model="userData.phoneNumber" />
              <div class="error ft14" :class="{'nameError':nameDisplay}">{{nameErrorText}}</div>
            </div>
          </div>
          <!--登录的 密码 -->
          <div class="inputBox">
            <div class="leftIcon">
              <svg-icon iconClass='loginpassword' className='svg_icon'></svg-icon>
            </div>
            <div class="rightInput">
              <input class="ft14 color_white_08 opc_focus validateInput fl" type="text" placeholder="请输入验证码"  v-model="userData.smsCode" />
              <input class="validate ft14 fl" type="button" :disabled="validateDisable" v-model="validateText" @click="sendValidate">
              <div class="error ft14" :class="{'validateError':validateDisplay}">{{validateErrorText}}</div>
            </div>
          </div>
          <!-- 现在登陆按钮 -->
          <div class="loginNow ft14 color_white_1 back5 opc_hover8" @click="loginNow">立即登录</div>
          <!-- 线条 -->
          <div class="lineBox" style="margin-top:112px;"></div>
          <!-- 卖点 独享 -->
          <div class="sellingPoint" v-if="noLoginPaymentOrderData.model == 1">
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
          <div class="sellingPoint" v-if="noLoginPaymentOrderData.model == 2">
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
    <alertModelError v-if="ifStockModel" iserrtype="1" @change="ifStockModelFun"></alertModelError>
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
      // 返回了二维码
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
      // 没有登录出现登录
      .noLogin{
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
        // 邮箱账号,密码
        .inputBox{
          width: 280px;
          height: 48px;
          margin-top: 24px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          background:rgba(22,23,27,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          .leftIcon{
            width: 24px;
            height: 24px;
            margin: 12px 8px 12px 12px;
          }
          .rightInput{
            width: 246px;
            height: 48px;
            &>input{
              display: block;
              width:100%;
              height: 100%;
              box-sizing: border-box;
              outline: none;
              background: none;
              border: none;
              opacity: 0.8;
            }
            .validateInput{
              width: 60%;
              display: inline-block;
            }
            .validate{
              width: 40%;
              cursor: pointer;
              color: #fff;
              display: inline-block;
              text-shadow: 0px 20px 40px rgba(0,0,0,0.2);
            }
            .error{
              color:red;
            }
            .nameError{
              display: none;
            }
            .validateError{
              display: none;
            }
          }
        }
        .inputBox:hover{border: 1px solid rgba(255,255,255,0.3)}
        // 现在登陆
        .loginNow{
          width:280px;
          height:48px;
          cursor: pointer;
          border-radius:4px;
          text-align: center;
          margin-top: 40px;
          line-height: 48px;
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
import {login,gooleLogin, loginSms} from '@/utils/login'
import {post} from '@/request/http.js'
import {setStore,getStore,removeStore}  from '@/utils/storage'
export default {
  name: "noLoginPaymentOrder",
  components: { JumpTo, loading ,store},
  props: ["noLoginPaymentOrderData"],
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
      worth: 0,//价值
      discount: 0,//优惠金额

      ifpayments: false, //是否支付成功 成功显示成功页面
      timer: null, //定时器
      timeS: 15, //15s跳转
      timeAjax: 1000, //1秒请求一次

      qrcodeTimer: 180000, //二维码失效时间
      qrcodeSetTimeOut: null, // 二维码定时器
      qrcodeImgType: false, //判断二维码是否失效 true为失效

      orderData: {}, //当前订单的请求数据

      orderTure:false, // 还没有订单走登录流程
      userData:{
        phoneNumber:'',
        smsCode:'',
        channelAbbr: this.$store.getters.getChannelIdFun
      },
      validateText:'获取验证码',
      validateDisable:false,
      nameDisplay:true,
      validateDisplay:true,
      nameErrorText:'',
      validateErrorText:'',
      verifytime:null,

      ifStockModel:false,  //是否显示库存不足弹出
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
  created() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器创建订单
    clearInterval(this.timer);
    this.timer = null;

    clearInterval(this.qrcodeSetTimeOut);
    this.qrcodeSetTimeOut = null;
    // this.createOrder();
    this.getNoLoginPaymentOrder();
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
     //协议点击方法 切换勾勾
    agreement() {
     
      this.isAgreement = !this.isAgreement;
    },
    // 获取登录订单信息 需要先获取
    getNoLoginPaymentOrder(){
      var _this = this;
      var datas = {
        'appId' :  _this.noLoginPaymentOrderData.appId,
        'productId' : _this.noLoginPaymentOrderData.productId
      }
      _this.$fetch("/order/preview", datas).then(response => {
        _this.flag = response.flag;
        _this.orderData = response.data
        _this.discount = response.data.discount
        _this.worth = response.data.worth
        _this.tobePaid = response.data.unpay
      });
    },
    //创建订单
    createOrder() {
      var _this = this;
      var datas = {
        appId: _this.noLoginPaymentOrderData.appId,
        productId: _this.noLoginPaymentOrderData.productId,
        // 'OKF_TOKEN':this.orderData.OKF_TOKEN,
        payType: 2,
        balanceType: 0,
        channelId: _this.orderData.channelId,
      };
      _this.orderData = datas;
      console.log(_this.orderData);
      _this.$fetch("/order/create", datas).then(response => {
        _this.userBalance = response.data.balance; //用户余额
        _this.tobePaid = response.data.unpay; //待付款金额
        _this.qrcodeUrl = response.data.qrcode; //二维码
        _this.enough = response.data.enough; //是否可以使用余额直接支付
        _this.flag = response.flag; //订单创建是否成功
        _this.orderId = response.data.orderId; //订单id

        //创建订单完成开始轮询 查询订单是否完成
        _this.setTimerAjax();
        //生成二维码失效时间定时器
        _this.qrcodeSetTimeOutFun();

        _this.orderTure = response.flag
        // console.log(response)
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
            _this.ifpayments = true;  //不跳转 打开成功页面
            // this.$emit("change", false);  //关闭付款框 在关闭的时候刷新页面

            clearInterval(_this.timer);
            _this.timer = null;

            clearInterval(_this.qrcodeSetTimeOut);
            _this.qrcodeSetTimeOut = null;
          } else {
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
      _this.$fetch("/order/create", _this.orderData).then(response => {
        _this.userBalance = response.data.balance; //用户余额
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
      if(_this.orderData.payType != 3){
        _this.orderData.payType = 3;

        _this.qrcodeUrl = ''

        clearInterval(_this.timer);
        _this.timer = null;

        clearInterval(_this.qrcodeSetTimeOut);
        _this.qrcodeSetTimeOut = null;

        _this.$fetch("/order/create", _this.orderData).then(response => {
          _this.userBalance = response.data.balance; //用户余额
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
      if(_this.orderData.payType != 2){
        _this.orderData.payType = 2;

        _this.qrcodeUrl = ''

        clearInterval(_this.timer);
        _this.timer = null;

        clearInterval(_this.qrcodeSetTimeOut);
        _this.qrcodeSetTimeOut = null;

        _this.$fetch("/order/create", _this.orderData).then(response => {
          _this.userBalance = response.data.balance; //用户余额
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
    },

    //发送验证码，并验证手机号
    sendValidate(){
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
      if(this.userData.phoneNumber == '') {
        this.nameErrorText = "请填写手机号"
        this.nameDisplay = false
        return false
      }
      if(!phoneReg.test(this.userData.phoneNumber)){
        this.nameErrorText = "请填写正确的手机号"
        this.nameDisplay = false
        return false
      }
      this.nameDisplay = true
      this.validateDisplay = true
      this.verifytime = 60
      this.validateDisable = true
      this.verifytimerFun()
      this.$fetch("/author/sendSmsCode", {'phoneNumber': this.userData.phoneNumber}).then(response => {})
    },
    verifytimerFun(){
      if(this.verifytime > 0) {
        this.verifytime--;
        this.validateText = this.verifytime + 's后重新获取';
        setTimeout(this.verifytimerFun, 1000);
      } else {
        this.verifytime = 0;
        this.validateDisable = false;
        this.validateText = '获取验证码';

      }
    },
    // 立即登录
    loginNow(){
      if(this.userData.smsCode == '') {
        this.validateErrorText = '验证码不能为空'
        this.validateDisplay = false
        return false
      }
      // this.userData.channelId = this.$store.getters.getChannelIdFun
      // alert('获取存下来的渠道id == '+ this.$store.getters.getChannelIdFun)
      // alert(this.userData.channelId)
      loginSms(this.userData).then(res=>{
        if(!res.flag) {
          this.validateErrorText = res.message
          this.validateDisplay = false
          return false
        } else {
          this.validateErrorText = ''
          this.validateDisplay = true
          this.$store.commit('SET_LOGINDATA',res.data)
          this.$store.commit('SET_LOGINCODE',res.code)
          // this.reload()
          // 登录成功后在我的游戏页面需要刷新  未登录购买
          setStore({name:'ifRelodMygame',content:true,type:false})


          //判断是否参加过首单活动
          this.$fetch('/activity/join')   
              .then((response) => {
                console.log(response.flag)
                  if(response.flag){
                    //登录成功就创建订单  没有参加过
                    // 关闭当前订单
                    this.$emit("change", false,'openFirstOrder');
                  }else{
                     // 关闭当前订单
                    this.$emit("change", false,'openBuyGame');
                    // this.createOrder()
                    
                  }
              })
          
        }

      })
    },
    ifStockModelFun(data){  //库存不足弹出
        this.ifStockModel = data
    },
  }
};
</script>
