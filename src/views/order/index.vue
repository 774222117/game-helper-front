<template>
<div class="orderBgBox">
  <div class="orderBgFilter" :style="{backgroundImage: 'url(' + orderData.image + ')' , 'backgroundSize':'100% 600px','backgroundRepeat': 'no-repeat'}"></div>
  <div class="orderBgModel orderBg_bg"></div>
  <div class="order">
      <!-- 左边游戏列表 -->
      <div class="leftGameList">
        <!-- 标题 -->
        <div class="gameListTitle ft24 color_white_1 BangersRegular">PAYMENT METHOD</div>
        <!-- 所有支付方式 -->
        <div class="gameList">
            <!-- 第一个paypal -->
            <div v-for=" item in PaymentMethod" :key="item.value">
              <div class="gameListItem" @click="checkedPaymentMethodFun(item.value)" v-if="item.show">
                <div class="gameListItemLeft">
                  <div class="gameListItemLeftChecked" :class="checkedPaymentMethod == item.value?'checkedPaymentMethod':''"></div>
                  <div class="gameListItemLeftText ft18 color_white_1 RobotoBold">{{item.type}}</div>
                </div>
                <div class="gameListItemRight"><svg-icon :iconClass='item.svgName' className='svg_icon'></svg-icon></div>
              </div>
            </div>
        </div>
      </div>
      <!-- 右边订单 -->
      <div class="rightBuyGame">
        <!-- 订单title -->
         <div class="ft24 color_white_1 line_h30 BangersRegular">ORDER DETAILS</div>
        <!-- 订单表单 -->
        <div class="gameOrder">
          <!-- 游戏信息 -->
          <div class="gameOrderInfo">
            <!-- 左边图片 -->
            <div class="gameOrderInfoLeft">
              <img class="gameOrderInfoLeftImg" :src="orderData.image" alt="">
            </div>
            <!-- 右边游戏详情 -->
            <div class="gameOrderInfoRight">
              <!-- 游戏名称 -->
              <div class="gameName ft22 color_white_1 RobotoBold textOver2">{{orderData.englishName}}</div>
              <!-- 小logo -->
              <div class="smallLogo ft20 color_white_06" v-if="orderData.model == 1">
                <div class="iconBox"><svg-icon iconClass='private' className='svg_icon'></svg-icon></div>
                <div class="margin_left_4 ft14 ft_weight color_white_1">PRIVATE</div>
              </div>
              <div class="smallLogo ft20 color_white_06" v-else-if="orderData.model == 2">
                <div class="iconBox"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon></div>
                <div class="margin_left_4 ft14 ft_weight color_white_1">PUBLIC</div>
              </div>
              <div class="smallLogo color_white_06" v-else> <!-- <svg-icon iconClass='smallLogo' className='svg_icon'></svg-icon> --> </div>
              <!-- 折扣和价格 -->
              <div class="onSaleAndPrice">
                  <div class="onsale redHookUp1_bg color_white_1 ft16">{{orderData.ratio || 0}}%</div>
                  <div class="price ft18 color_white_1 margin_left_8">${{orderData.steamPrice}}</div>
              </div>
            </div>
          </div>
          <!-- 小计 -->
          <div class="subTotal publicSty">
            <div class="ft14 color_white_08 RobotoRegular">Sub-total</div>
            <div class="ft18 color_white_1 RobotoBold">${{orderData.price}}</div>
          </div>
          <!-- 运营费 -->
          <div class="operationalFee publicSty">
            <div class="ft14 color_white_08 RobotoRegular">Operational fee</div>
            <div class="ft18 color_white_1 RobotoBold">${{orderData.servicePrice}}</div>
          </div>
          <!-- 总计 -->
          <div class="total publicSty">
            <div class="ft14 color_white_08 RobotoRegular">Total:</div>
            <div class="ft22 color_white_1 RobotoBold">${{orderData.totalPrice}}</div>
          </div>


          <!-- 货物价格 -->
          <!-- <div class="ft14 color_white_08 RobotoRegular">Amount of goods <span class="ft14 color_white_1 RobotoRegular margin_left_8">${{orderData.price}}</span></div> -->
          <!-- 服务费 -->
          <!-- <div class="ft14 color_white_08 RobotoRegular">Technical service <span class="ft14 color_white_1 RobotoRegular margin_left_8">${{orderData.servicePrice}}</span></div> -->
          <!-- 付款 -->
          <!-- <div class="ft18 color_white_1 BangersRegular">PAYMENT</div> -->
          
          <!-- 协议 -->
          <div class="agreementBox">
            <!-- <div class="checkMark" @click="agreement">{{isAgreement == true?'√':''}} </div> -->
            <div class="checkMark opc_hover8" @click="agreement"><svg-icon v-if="isAgreement" iconClass='whiteHookUp' className='svg_icon'></svg-icon></div>
            <div class="ft12 color_white_06 margin_left_10 RobotoRegular">I have read and accepted the terms and conditions</div>
          </div>

        </div>
        <!-- 下面购买按钮 -->
        <div class="buyGameBtn border_radius_4" @click="buyGameOrder" :class="orderBtnState?'bg_color_4':'bg_color_3'" v-show="!orderSubmin">
            <div class="ft14 color_white_1">CHECK OUT</div>
        </div>
        <div class="buyGameBtn border_radius_4 bg_color_4" v-show="orderSubmin">
            <div class="ft14 color_white_1 orderSubmining loading_bg"></div>
        </div>
      </div>
      <!-- 弹出框 -->
      <div class="orderSuccessMain" v-if="isOrderSuccess">
        <div class="orderSuccess">
          <div class="orderSuccessImg orderSuccess_bg"></div>
          <div class="orderSuccessText1 ft16 color_white_1">Payment is successful ！</div>
          <div class="orderSuccessText2 ft14 color_white_06">Game has been issued to your library, please find!</div>
          <div class="orderSuccessBtn ft14 color_white_1 bg_color_4" @click="orderSuccessClick">Check my game</div>
        </div>
      </div>
      <!-- 下面的东西 -->
      <div class="footBox">
        <div class="topNavBoxItem">
          <div class="leftImg"><svg-icon iconClass='indexIcon1' className='svg_icon'></svg-icon></div>
          <div class="rightText ft16 color_white_06 RobotoRegular">{{allGameNum}} Games In Onekeyfun</div>
        </div>
        <div class="topNavBoxItem">
          <div class="leftImg"><svg-icon iconClass='indexIcon2' className='svg_icon'></svg-icon></div>
          <div class="rightText ft16 color_white_06 RobotoRegular">Instantly Delivery</div>
        </div>
        <div class="topNavBoxItem">
          <div class="leftImg"><svg-icon iconClass='indexIcon4' className='svg_icon'></svg-icon></div>
          <div class="rightText ft16 color_white_06 RobotoRegular">Exclusive Discouunts</div>
        </div>
        <div class="topNavBoxItem">
          <div class="leftImg"><svg-icon iconClass='indexIcon3' className='svg_icon'></svg-icon></div>
          <div class="rightText ft16 color_white_06 RobotoRegular">Support for Refund</div>
        </div>
      </div>
  </div>
</div>
  
</template>

<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: "order",
  components: {JumpTo},
  data(){
    return {
      allGameNum:444,
      orderData:'',  //订单数据
      orderMessage:'', //订单成功或失败的数据
      orderFlag:'', //订单成功或者是失败返回
      orderBtnState:false,  //订单按钮状态
      isAgreement:true,  //勾勾
      orderSubmin: false,  //订单提交中的状态 
      isOrderSuccess:false, //是否显示订单成功弹出框
      //支付的方式
      PaymentMethod:[{type:'PAYPAL',value:'0',svgName:'paypal','show':true},{type:'alipay',value:'1',svgName:'alipay','show':false},{type:'weChatPay',value:'2',svgName:'weChatPay','show':false}],
      // 当前选中的支付方式
      checkedPaymentMethod:0
    }
  },
  inject:['openRegister'],
  // updated(){
  //     this.init()
  // },
  activated(){
      this.init()
  },
  watch:{
    orderState(value){
      if(value){
        this.$nextTick(function(){
          this.isOrderSuccess = true
          this.orderSubmin = false
        })
      }else{
        this.$nextTick(function(){
          this.isOrderSuccess = false
        })
      }
    }
  },
  computed:{
    orderState:function(){
      return this.$store.getters.getOrderSuccess
    }
  },
  methods:{
    init(){
      // 游戏订单
        let _this = this;
        let orderParamData = this.$route.query
      _this.$fetch('/order/data',orderParamData)
          .then((response) => {
            //订单数据
            _this.orderData = response.data
            //订单成功跳转的链接或者错误信息
            _this.orderMessage = response.message
            //订单成功或者失败信息
            _this.orderFlag = response.flag
            //设置按钮状态
            _this.orderBtnState = response.flag
          })
    },
    buyGameOrder(){
      let _this = this;
      //如果状态为灰色则不能点击
      if(!_this.orderBtnState){
        return
      }else{
        //如果状态为红色则变为灰色 在订单创建成功后才变红
        _this.orderSubmin = true
        
      }  
      //判断是否登陆
      if(!!_this.$store.getters.getStorage){
        // JumpTo(5,{appId: this.gamePriceData.appId,productId:this.gamePriceData.id ,peopleId:this.$store.getters.getStorage.id})
         let orderParamData = _this.$route.query
             orderParamData.peopleId = _this.$store.getters.getStorage.id
        console.log('购买游戏点击。。。。。。。。。。。。。。。。。。。。。。。。。。。')
        if(_this.orderFlag == true){  //判断基本信息
          //创建订单
          _this.$fetch('/order/create',orderParamData)
          .then((response) => {
              if(response.flag){   //订单创建成功
                console.log(response.message)
                //调用支付打开cef
                if(window.open_payment){
                  window.open_payment(response.message,'800','600');
                }else{
                  console.log('打开支付窗口错误')
                }
              }else{   //订单创建失败
                console.log(response.message)
              }
          })
        }else{
          console.log(_this.orderMessage)
        }
			}else{
				if(!!_this.openRegister){
					_this.openRegister(true)
				}else{
					console.log('没得openRegister方法')
				}
      }
    },
    agreement(){   //协议点击方法 切换勾勾
      this.isAgreement = !this.isAgreement
      this.orderBtnState = this.isAgreement 
    },
    orderSuccessClick(){  //订单成功后点击按钮跳转我的游戏  并且重置状态
      this.$store.commit('isOrderSuccessFun', false)
      JumpTo(3)
    },
    // 选择支付方式
    checkedPaymentMethodFun(num){
     this.checkedPaymentMethod = num
    }
  }
};
</script>
<style lang="scss" scoped>

.orderBgBox{
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  .orderBgFilter{
    width: 100%;
    height:100%;
    position: absolute;
    filter: blur(20px)
  }
  .orderBgModel{
    width: 100%;
    height:100%;
    position: absolute;
  }
.order {
  width: 1156px;
  height: 784px;
  margin: 0 auto;
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  position: relative;
  // 左边游戏
  .leftGameList{
    width: 726px;
    height: 548px;
    .gameListTitle{
      margin-bottom: 30px;
    }
    .gameList{
      width: 100%;
      height: auto;
      .gameListItem{
        width: 100%;
        height: 86px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background:rgba(0,0,0,0.4);
        border-radius:4px;
        cursor: pointer;
        margin-bottom: 20px;
      }
      .gameListItemLeft{
        display: flex;
        align-items: center;
        justify-content: start;
        margin-left: 28px;
        .gameListItemLeftChecked{
          width:20px;
          height:20px;
          background:rgba(49,52,61,1);
          border-radius:10px;
          border:1px solid rgba(255,255,255,0.4);
        }
        .checkedPaymentMethod{
         position: relative;
        }
        .checkedPaymentMethod::before{
          content: '';
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: rgba(255,0,54,1);
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        .gameListItemLeftText{
          margin-left: 9px;
        }
      }
      .gameListItemRight{
        width: 110px;
        height: 50px;
        background: red;
        margin-right: 18px;
      }
    }
  }
  // 右边订单
  .rightBuyGame{
    width: 400px;
    height: 484px;
    box-sizing: border-box;
    // 游戏订单
    .gameOrder{
      width: 100%;
      height:386px;
      box-sizing: border-box;
      border-radius: 4px 4px 0 0;
      margin-top: 20px;
      padding: 20px 20px 0 20px;
      background-color:rgba(0,0,0,0.4);
      // 游戏信息
      .gameOrderInfo{
        width:100%;
        height:149px;
        border-radius:3px 3px 0px 0px;
        display: flex;
        justify-content: space-between;
        // 左边图片
        .gameOrderInfoLeft{
          width: 106px;
          height: 149px;
          .gameOrderInfoLeftImg{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        // 右边信息
        .gameOrderInfoRight{
          width: 238px;
          height: 149px;
          // 游戏名字
          .gameName{
            width:100%;
            height:50px;
            line-height:25px;
          }
          // 小logo
          .smallLogo{
            width: 93px;
            height: 24px;
            margin: 16px 0 35px 0;
            background:rgba(42,44,52,1);
            border-radius:14px;
          
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .iconBox{width: 24px;height: 24px;display: block;border-radius: 50%;}
          }
          // 折扣价格
          .onSaleAndPrice{
            width: 100%;
            height: 24px;
            display: flex;
            align-items: center;
            // 折扣
            .onsale{
              width: 55px;
              height: 24px;
              text-align: center;
              line-height: 24px;
            }
            // 价格
            .price{
              width: 62px;
              height: 21px;
              line-height: 21px;
              text-align: center;
              line-height: 24px;
            }
          }
        }
      }
      // 小计
      .subTotal{
        height: 21px;
        line-height: 21px;
        margin-top: 43px;
      }
      // 运营费
      .operationalFee{
        height: 21px;
        line-height: 21px;
        margin-top: 14px;
      }
      // 总计
      .total{
        height: 30px;
        line-height: 30px;
        margin-top: 26px;
      }
      .publicSty{
        display: flex;
        justify-content: space-between;
      }
      // 协议
      .agreementBox{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 28px 0 18px 0; 
      }
    }
    // 下面的购买游戏按钮
    .buyGameBtn{
      width: 100%;
      height: 48px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      &>div{
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 48px;
      }
    }
  }
  // 底部
  .footBox{
    width: 1156px;
    height: 62px;
    position: absolute;
    bottom: 0;
		margin: 0 auto;
		display: flex;
		justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.1);
		.topNavBoxItem{
			width: auto;
      height: 36px;
      line-height: 36px;
			display: flex;
			justify-content: flex-start;
      align-items: center;
      margin-right: 60px;
			.leftImg{
				width: 36px;
				height: 36px;
			}
			.rightText{
				width: auto;
        height: 36px;
        margin-left: 8px;
			}
	  }
  }
}
}
// 勾勾
.checkMark{
  width:16px;
  height:16px;
  border-radius:4px;
  border:1px solid rgba(49,52,61,1);
  font-size: 9px;
  text-align: center;
  line-height: 16px;
  color: white;
  cursor: pointer;
}
// 圈圈
.checkRadio{
  width:20px;
  height:20px;
  background-color:rgba(49,52,61,1);
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.4);
  cursor: pointer;
}
.checkRadio.checkRadioActive{
  background:rgba(255,0,54,1);
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.4);
}
.checkRadio.checkRadioActive::before{
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  background-color: #fff;
  text-align: center;
  line-height: 20px;
  transform: translate(5px, 5px);
  border-radius: 50%;
}
// 卡牌样式
.cardImgSty{
  width:40px;
  height:24px;
  display: block;
  background-color:rgba(255,255,255,1);
  border-radius:4px;
  float: left;
  margin-left: 18px;
}

//订单支付中按钮样式
.orderSubmining{
  width:32px;
  height: 32px;
  border-radius: 50%;
  background-color:rgba(255,0,54,1);
  background-size:26px;
  animation: changDeg 2s linear 0.2s infinite;
}
@keyframes changDeg{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

// 弹出框
.orderSuccessMain{
  width: 100%;
  height: 100%;
  background:rgba(42,44,52,0.8);
  position: absolute;
  .orderSuccess{
    width:450px;
    height:580px;
    background:rgba(29,31,36,1);
    border-radius:8px;
    position: absolute;
    left: calc(50% - 225px);
    top: 95px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .orderSuccessImg{
      width: 106px;
      height: 106px;
      margin-top: 146px;
    }
    .orderSuccessText1{
      margin-top: 29px;
    }
    .orderSuccessText2{
      margin-top: 16px;
    }
    .orderSuccessBtn{
      width: 400px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      margin-top: 110px;
    }
  }
}
.line_h30{line-height: 30px}
</style>
