<template>
<!-- 支付弹框 -->
<div class="alertMain">
    <div class="alertContent">
        <div class="firstOrderLine ft18 color_white_1" v-if="isQueryFirstOrderImmunity">本单立享全额返还，{{dataTime.date_m+':'+dataTime.date_s+':'+dataTime.date_ms}}秒后资格将被释放</div>
        <!-- 关闭 -->
        <div class="close hover" @click="cancel"> <svg-icon iconClass="close" class="svg_icon"></svg-icon> </div>
        <!-- 中间内容 -->
        <div class="middleContents">
            <div class="limitBox" v-show="limits"></div>
            <!-- 左边的游戏信息 -->
            <div class="leftGameInfo">
                <!-- 游戏图片 -->
                <!-- <div class="gameImg marB"> <img class="imgBlock" :src="allOrderData.image" alt=""> </div> -->
                <!-- 游戏名字 -->
                <div class="gameNameInfo publicCenter marB16">
                    <div class="gameNameLeft ft14 color_white_04">游戏名称</div>
                    <div class="gameNameRight ft14 color_white_08 textOver">{{allOrderData.enjoyName}}</div>
                </div>
                <div class="gameNameAll">
                    <div class="nameAll ft12 color_white_1">{{gamePackageName}}</div> 
                </div>
                <!-- 购买类型 -->
                <div class="purchaseType publicCenter marB13">
                    <div class="ft14 color_white_04">购买类型</div>
                    <div class="ft14 color_white_08">畅享版</div>
                </div>
                <!-- 分割线 -->
                <div class="divider marB13"></div>
                <!-- 游戏原价 -->
                <!-- <div class="gameOriginalPrice publicCenter marB">
                    <div class="ft14 color_white_04">游戏原价</div>
                    <div class="ft14 color_white_08">￥{{allOrderData.steamPrce}}</div>
                </div> -->
                <!-- 选择优惠 -->
                <div class="chooseAdiscount marB27">
                     <div class="title ft14 color_white_04 marB16">选择优惠</div>
                     <div class="chooseAdiscountBox">
                         <!-- 优惠价格显示 -->
                        <div class="displayPrice" v-if="!$store.getters.getIsMember.flag">
                            <!-- 普通价格 -->
                            <div class="ordinaryPrice seckillOrder_bg" >
                                <div class="giftPriceName ft14 color_white_1 font_weight">限时礼包价</div>
                                <div class="giftPrice ft14 color_white_1 font_weight">¥{{allOrderData.price}}</div>
                                <!-- <chooseDiscount :isVip="0" :discountData="allOrderData"/> -->
                            </div>
                            <!-- 会员价格 -->
                            <div class="memberPrice chooseDiscountActive_bg" style="cursor:pointer" @click="buyGameVip">
                                <div class="vipName">
                                    <div class="vipBox"><svg-icon iconClass='vip' className='svg_icon'></svg-icon></div>
                                    <div class="vipText ft14 font_weight">专享</div>
                                </div>
                                <div class="vipPrice ft14 color_white_1 font_weight">¥{{allOrderData.priceMember}}</div>
                                <!-- <chooseDiscount :isVip="1" :discountData="allOrderData" /> -->
                            </div>
                        </div>
                        <div class="displayPrice" v-if="$store.getters.getIsMember.flag">
                            <!-- 会员价格 -->
                            <div class="memberPrice chooseDiscountActive_bg">
                                <div class="vipName">
                                    <div class="vipBox"><svg-icon iconClass='vip' className='svg_icon'></svg-icon></div>
                                    <div class="vipText ft14 font_weight">专享</div>
                                </div>
                                <div class="vipPrice ft14 color_white_1 font_weight">¥{{allOrderData.priceMember}}</div>
                                <!-- <chooseDiscount :isVip="1" :discountData="allOrderData" /> -->
                            </div>
                        </div>

                     </div>
                </div>
                <!-- 分割线 -->
                <div class="divider marB19"></div>
                <!-- 账户余额 -->
                <div class="accountBalance publicCenter marB13">
                    <div class="ft14 color_white_04">账户余额</div>
                    <div class="checkBox" v-if="ifUseBalance"> 
                        <div class="checkMark" v-if="balance>0" @click="balancePaymentHook"><svg-icon v-if="isBalancePayment" iconClass="whiteHookUp" class="svg_icon"></svg-icon></div>
                        <div class="ft14 color_white_08">使用 ¥{{balance || 0}}</div>
                    </div>
                    <div class="checkBox ft14 color_white_1" v-else> -- </div>
                </div>
                <!-- 我的P币 -->
                <div class="accountBalance publicCenter marB13" v-if="allOrderData.model != 1">
                    <div class="ft14 color_white_04">我的P币</div>
                    <div class="checkBox"> 
                        <div class="checkMark" v-if="credit>0" @click="creditPaymentHook"><svg-icon v-if="isCreditPayment" iconClass="whiteHookUp" class="svg_icon"></svg-icon></div>
                        <div class="ft14 color_white_08">使用 {{credit || 0}}</div>
                    </div>
                </div>
               
            </div>
            <!-- 右边的支付信息 -->
            <div class="rightPaymentInfo" v-if="enough == 2">
                <div class="balancePayment back5 ft14 color_white_1" @click="balancePayment" >
                    {{isCouponPurchase == false?'立即支付':'使用试玩券'}}</div>
            </div>
            <div class="rightPaymentInfo" v-else>
                <!-- 标题  选择优惠-->
                <!-- <div class="title ft18 color_white_04 marB16">选择优惠</div> -->
                <!-- 标题  选择支付方式-->
                <div class="title ft18 color_white_04 marB19">选择支付方式</div>
                <!-- 付款方式 -->
                <div class="titlePayment marB24">
                    <!-- 微信 -->
                    <div class="leftWx" @click="wxActiveFun">
                        <svg-icon :iconClass="queryOrderData.payType == 2 ? 'wxActiveAllOrder' : 'wxDefaultAllOrder'" class="svg_icon" ></svg-icon>
                    </div>
                    <!-- 支付宝 -->
                    <div class="rightZfb" @click="zfbActiveFun">
                        <svg-icon :iconClass="queryOrderData.payType == 3 ? 'zfbActiveAllOrder' : 'zfbDefaultAllOrder'" class="svg_icon" ></svg-icon>
                    </div>
                </div>
                <!-- 待付款金额 支付按钮 -->
                <!-- <div class="awaitPayment">
                    <div class="awaitPaymentBox ft14 color_white_08">待付金额  ￥{{awaitPayment}}</div>
                    <div class="paymentBtn ft18" @click="paymentFun">去支付</div>
                </div> -->
                <!-- 付款二维码金额等 -->
                <div class="priceInfoBox marB19">
                    <div class="content">
                        <div class="leftQrcodeBox">
                            <!-- 支付的二维码 -->
                            <div class="paymentQrCodeBox" v-if="displayPaymentQrCode">
                                <paymentQrCode ref="paymentQrCodes" :text="queryOrderData.payType" :qrCodeSrc="qrCodeSrc" :orderId="orderId"  @change="displayPaymentQrCodeFun"/>
                            </div>
                        </div>
                        <div class="rightPriceInfo">
                            <div class="ft14 color_white_06">待付金额</div>
                            <div class="ft24 font_weight textColorBule">￥{{awaitPayment}}</div>
                            <div class="ft12 font_weight textColorBule1">已优惠{{discount}}元</div>
                            <div class="ft12 color_white_06 uesrAgreementTexts" @click="openAgreement">《用户服务协议》</div>
                        </div>
                    </div>
                </div>
                 <!-- 卖点 独享 -->
                <div class="sellingPoint" v-if="allOrderData.model == 1">
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
                <div class="sellingPoint">
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
                <!-- 卖点 试玩 -->
                <div class="sellingPoint" v-if="allOrderData.model == 3">
                    <div class="sellingPointItems">
                        <div class="iconBox"><svg-icon iconClass='gift' className='svg_icon'></svg-icon></div>
                        <div class="textBox ft12 color_white_06">官方正版</div>
                    </div>
                    <div class="sellingPointItems">
                        <div class="iconBox"><svg-icon iconClass='acPrice' className='svg_icon'></svg-icon></div>
                        <div class="textBox ft12 color_white_06">特价试玩</div>
                    </div>
                    <div class="sellingPointItems">
                        <div class="iconBox"><svg-icon iconClass='lightning' className='svg_icon'></svg-icon></div>
                        <div class="textBox ft12 color_white_06">极速发货</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 支付成功 -->
    <orderSuccess v-if="displayOrderSuccess" @change="displayOrderSuccessFun" :allOrderData="allOrderData" />
    <!-- <loading /> -->
</div>
</template>
<style lang="scss" scoped>
@import '../../../assets/css/DetailsPlayBag/DetailsPlayBag.css';

.alertMain {
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(0, 0, 0, 0.8);
    //上面的一条线首单全免
    .firstOrderLine{
      width: 759px;
      height: 44px;
      background:linear-gradient(90deg,rgba(234,96,9,1) 0%,rgba(221,60,60,1) 100%);
      border-radius: 8px 8px 0px 0px;
      position: absolute;
      left: 0;
      right: 0;
      top: -44px;
      margin: auto;
      font-weight: bold;
      text-align: center;
      line-height: 44px;
    }
    .alertContent {
        width: 760px;
        height: 441px;
        box-sizing: border-box;
        background-color: rgba(16, 22, 32, 1);
        border-radius:6px;
        box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.2);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        // 关闭
        .close{
            width: 18px;
            height: 18px;
            cursor: pointer;
            position: absolute;
            right: 6px;
            top: 6px;
        }
        // 中间内容
        .middleContents{
            width: 700px;
            height: 403px;
            margin: 38px 33px 0 27px;
            display: flex;
            justify-content: space-between;
            .limitBox{
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 9;
            }
            // 左边的游戏信息
            .leftGameInfo{
                width: 306px;
                height: 100%;
                padding-right: 46px;
                // 游戏图片
                .gameImg{
                    width:298px;
                    height:139px;
                }
                // 游戏名称
                .gameNameInfo{
                    margin-bottom: 9px;
                    .gameNameLeft{
                        width: 60px;
                        margin-right: 10px;
                    }
                    .gameNameRight{}
                }
                .gameNameAll {
                    width: 302px;
                    height: 30px; 
                    margin-bottom: 9px; 
                    display: flex;
                    .nameAll {
                        width: 271px;
                        height: 16px;
                        line-height: 16px;
                        text-overflow: ellipsis;
                        margin: auto;
                        margin-top: 9px;
                        
                    }
                }
                // 购买类型
                .purchaseType{}
                // 游戏原价
                .gameOriginalPrice{}
                // 选择优惠
                .chooseAdiscount{
                    .chooseAdiscountBox{
                        width: 100%;
                        height: 104px;
                        box-sizing: border-box;
                        // 价格显示
                        .displayPrice{
                            width: 100%;
                            height: 104px;
                            // 普通价格
                            .ordinaryPrice{
                                width: 310px;
                                height: 48px;
                                margin-bottom: 14px;
                                display: flex;
                                justify-content: space-between;
                                .giftPriceName {
                                    width: 70px;
                                    height: 17px;
                                    line-height: 17px;
                                    margin-left: 27px;
                                    margin-top: 13px;
                                }
                                .giftPrice {
                                    height: 19px;
                                    line-height: 19px;
                                    margin-top: 13px;
                                    margin-right: 20px;
                                }
                            }
                            // 会员价格
                            .memberPrice{
                                width: 309px;
                                height: 46px;
                                display: flex;
                                justify-content: space-between;
                                // cursor: pointer;
                                .vipName {
                                    width: 60px;
                                    height: 20px;
                                    display: flex;
                                    margin: 12px 0 0 23px;
                                    .vipBox {
                                        width: 22px;
                                        height: 20px;
                                    }
                                    .vipText {
                                        width: 28px;
                                        height: 17px;
                                        line-height: 17px;
                                        color: rgba(234,228,177,1);
                                        margin-left: 9px;
                                    }
                                }
                                .vipPrice {
                                    height: 19px;
                                    line-height: 19px;
                                    margin-top: 13px;
                                    margin-right: 20px;
                                }
                            }
                        }
                    }
                }
                // 购买类型
                .accountBalance{
                    .checkBox{
                        display: flex;
                        align-items: center;
                    }
                }
            }
            .rightPaymentInfo::before{
                content: '';
                width: 1px;
                height: 363px;
                position: absolute;
                left: 0;
                top: 0;
                border-right: 1px dashed rgba(255, 255, 255, 0.1);
            }
            // 右边的支付信息
            .rightPaymentInfo{
                width: 302px;
                height: 100%;
                padding-left: 46px;
                position: relative;
                // 标题
                .title{
                    height: 24px;
                }
                // 付款方式
                .titlePayment{
                    width: 100%;
                    height: 42px;
                    display: flex;
                    justify-content: space-between;
                    .leftWx{
                        width: 148px;
                        height: 42px;
                        cursor: pointer;
                    }
                    .rightZfb{
                        width: 148px;
                        height: 42px;
                        cursor: pointer;
                    }
                }
                // 待付款金额 支付按钮
                // .awaitPayment{
                //     width: 100%;
                //     height: 40px;
                //     padding-top: 10px;
                //     display: flex;
                //     justify-content: space-between;
                //     align-items: center;
                //     .awaitPaymentBox{
                //         height: 40px;
                //         line-height: 40px;
                //     }
                //     .paymentBtn{
                //         width:189px;
                //         height:40px;
                //         text-align: center;
                //         line-height: 40px;
                //         background:linear-gradient(136deg,rgba(52,171,220,1) 0%,rgba(54,124,206,1) 100%);
                //         border-radius:4px;
                //         color:rgba(255,255,255,1);
                //         cursor: pointer;
                //     }
                // }
                // 付款二维码金额等
                .priceInfoBox{
                    width:302px;
                    height:183px;
                    background:rgba(34,47,69,1);
                    border-radius:8px;
                    display: flex;
                    align-items: center;
                    .content{
                        width: 100%;
                        height: 123px;
                        display: flex;
                        align-items: center;
                        .leftQrcodeBox{
                            width: 123px;
                            height: 123px;
                            position: relative;
                            margin-left: 31px;
                        }
                        .rightPriceInfo{
                            width: 100px;
                            height: 123px;
                            margin-left: 22px;
                            .uesrAgreementTexts{
                                margin-top: 30px;
                                cursor: pointer;
                            }
                        }
                    }
                }
                // 余额直接支付
                .balancePayment{
                    width: 100%;
                    height: 50px;
                    border-radius: 2px;
                    text-align: center;
                    line-height: 50px;
                    cursor: pointer;
                }

                // 卖点
                // .sellingPoint.sellingPointTry{justify-content: start;}
                // .sellingPoint.sellingPointTry .sellingPointItems{margin-right: 15px;}
                .sellingPoint{
                    width: 100%;
                    height: 42px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .sellingPointItems{
                        padding: 3px 9px;
                        background-color:rgba(0, 0, 0, 0.2);
                        border-radius:21px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: -20px;
                        .iconBox{
                            width: 21px;
                            height: 21px;
                            margin-right: 6px;
                            opacity: 0.6;
                        }
                    }
                }
            }
        }
        //支付的二维码盒子
        .paymentQrCodeBox{
            width:100%;
            height: 100%;
            // position: absolute;
            // left: 0;
            // top: 0;
            // right: 0;
            // bottom: 0;
            // margin: auto;
        }

    }
}
.hover{opacity: 0.6;}
.hover:hover{opacity: 1;}
// 左右布局公用样式
.publicCenter{
    width: 100%;
    height: 19px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
// 分割线
.divider{
    width: 100%;
    height: 1px;
    background-color: rgba(151, 151, 151, 0.1);
}
// 勾勾
.checkMark {
  width: 16px;
  height: 16px;
  border-radius:4px;
  border:1px solid rgba(49,52,61,1);
  font-size: 9px;
  text-align: center;
  line-height: 16px;
  color: white;
  cursor: pointer;
  margin-right: 9px;
}
.marB{margin-bottom: 18px;}
.marB13{margin-bottom: 13px;}
.marB16{margin-bottom: 16px;}
.marB19{margin-bottom: 19px;}
.marB24{margin-bottom: 24px;}
.marB27{margin-bottom: 27px;}
.marB30{margin-bottom: 30px;}
.marB36{margin-bottom: 36px;}
.marB46{margin-bottom: 46px;}
.imgBlock{width: 100%;height: 100%;display: block}
.textColorBule{color:rgba(61,180,255,1);text-shadow:0px 2px 4px rgba(0,0,0,0.29);}
.textColorBule1{color:rgba(67,183,248,0.47);}
</style>
<script>
import chooseDiscount from "@/components/allOrder/chooseDiscount";
import paymentQrCode from "@/components/allOrder/paymentQrCode";
import orderSuccess from "@/components/allOrder/orderSuccess";
import { setInterval,setTimeout, clearInterval } from "timers";
import JumpTo from "@/utils/jumpTo";
import loading from "../../Loading/loading";
import store from '@/store'
export default {
    name: "allOrder",
    components: { JumpTo, loading ,chooseDiscount,paymentQrCode,orderSuccess},
    props: ['allOrderData'],
    store,
    data() {
        return {
            limits:false,//点击P币 余额 切换支付方式时候出现的加载框
            isBalancePayment: false, //是否使用余额支付 点击的勾勾
            isCreditPayment: false, //是否使用P币支付 点击的勾勾
            ifUseBalance:true,//是否可以使用余额 出现勾选或者出现没有的
            
            balance:0,  //余额
            credit:0,  //P币
            awaitPayment:'--',//待付款金额
            orderId:'',
            displayPaymentQrCode:true,//支付二维码是否显示
            qrCodeSrc:'', //支付的二维码图片
            enough:'', //0不可以使用余额 1可以使用但不足 2可以使用且足够 在勾选余额时需要payType=1
            discount:'',//已优惠
            gamePackageName:'',//合玩包名称

            isQueryFirstOrderImmunity:false,//是否首单
            queryFirstOrderImmunityData:{},//首单数据

            myCoupon:'',//我的试玩券

            //创建订单
            queryOrderData:{
                channelId:this.$store.getters.getChannelIdFun,
                payType:2,
                enjoyId:this.allOrderData.enjoyId,
                balanceType:0,
                creditType: 0,
            },
            firstOrderTimer:'15:00:00',
            nowTime: 0,
            endTime:  0,
            dataTime:{
                date_d:'',
                date_h:'',
                date_m:'00',
                date_s:'00',
                date_ms:'00',
            },
            displayOrderSuccess:false,//订单支付成功是否显示

            isCouponPurchase:false,//会员有优惠券时购买调用余额支付
            // isResteOrder: !!this.$store.getters.getIsMember.flag,
        };
    },
    created() {
        
    },
    destroyed() {

    },
    mounted() { 
        this.queryFirstOrderImmunity()
    },
    watch:{
        isResteOrder:function(news,old){
            if(news){
                this.createOrder()
                console.log('会员重新创建订单')
            }
        }
    },
    computed:{
        isResteOrder(){
            return !!this.$store.getters.getIsMember.flag
        }
    },
    methods: {
        // 清除子组件的定时器函数
        clearPaymentQrCodeTimer(){
            console.log(this.$refs.paymentQrCodes)
            if(this.$refs.paymentQrCodes){
                this.$refs.paymentQrCodes.orderTimerClearInterval()
            }
        },
        //关闭
        cancel(){
            this.clearPaymentQrCodeTimer()
            this.$emit("change", false);
        },
        // 创建订单
        async createOrder(){
            // 需要判断是否参加首单全免活动 判断是否是合完游戏 
            var _this = this;
            await _this.$fetch('/activity/join')   //判断是否参加过首单活动
                .then((response) => {
                    _this.isQueryFirstOrderImmunity = response.flag
                    if(_this.isQueryFirstOrderImmunity){
                        _this.queryOrderData.activityId = 1
                    }else{
                        delete _this.queryOrderData.activityId
                    }
                })
            await _this.$fetch("/module/activity/create", _this.queryOrderData).then(response => { 
                if(response.flag){
                    _this.awaitPayment = response.data.unpay  //待支付金额
                    _this.qrCodeSrc = response.data.qrcode //付款码
                    _this.balance = response.data.balance //用户余额
                    _this.credit = response.data.credit //P币
                    _this.enough = response.data.enough //不可以使用余额 1 可以使用但不足 2 可以使用且足够
                    _this.orderId = response.data.orderId //订单id
                    _this.discount = response.data.discount //已优惠
                    _this.gamePackageName = response.code //游戏包的所有游戏名
                    // _this.countTime()
                }else{
                    if(response.code == 'out_of_stock'){
                        // 创建订单失败 关闭当前订单 打开秒杀错误提示弹框
                        this.$emit("change", false,3);
                    }else{
                        this.$emit("change", false,4);
                    }
                }
            });
        },
        // 支付按钮
        paymentFun(){
            if(this.isCouponPurchase){
                this.balancePayment()
            }else{
                this.displayPaymentQrCode = true
            }
        },
        // 使用余额支付
        balancePayment(){
            var _this = this;
            _this.$fetch("/order/balance/pay", { orderId: _this.orderId })
                .then(response => {
                if (response.flag) {
                   this.displayOrderSuccessFun(true)
                   console.log('余额支付成功')
                }
            });
        },
        //使用余额 切换勾勾
        balancePaymentHook() {
            this.limitsFun()
            this.isBalancePayment = !this.isBalancePayment
            if(this.isBalancePayment){
                this.queryOrderData.balanceType = 1
                this.qrCodeSrc = '';
                // this.clearPaymentQrCodeTimer()
            }else{
                this.qrCodeSrc = '';
                this.queryOrderData.balanceType = 0
            }
            this.createOrder()
        },
         //使用P币 切换勾勾
        creditPaymentHook() {
            this.limitsFun()
            this.isCreditPayment = !this.isCreditPayment
            if(this.isCreditPayment){
                this.queryOrderData.creditType = 1
                this.qrCodeSrc = '';
                // this.clearPaymentQrCodeTimer()
            }else{
                this.qrCodeSrc = '';
                this.queryOrderData.creditType = 0
            }
            this.createOrder()
        },
        // 支付宝点击
        zfbActiveFun(){
            this.limitsFun()
            if(this.queryOrderData.payType  != 3){
                this.qrCodeSrc = '';
                this.queryOrderData.payType  = 3
                this.createOrder()
            }
        },
        // 微信点击
        wxActiveFun(){
            this.limitsFun()
            if(this.queryOrderData.payType  != 2){
                this.qrCodeSrc = '';
                this.queryOrderData.payType  = 2
                this.createOrder()
            }
            
        },
        // 打开会员购买
        displayAlertMemberFun(){
            this.$store.commit('setDisplayOpenMember',true)
        },
        //会员购买
        buyGameVip(){
            if(!this.$store.getters.getIsMember.flag){
                this.displayAlertMemberFun()
            }
        },
        // 查询是否首单
        queryFirstOrderImmunity(){
            this.$fetch('/activity/join')   //判断是否参加过首单活动
                .then((response) => {
                    if(response.flag){
                        this.isQueryFirstOrderImmunity = response.flag
                        this.queryFirstOrderImmunityData = response.data

                        this.endTime = response.data.activeLong*1000 + new Date().getTime()
                        // 首单全面倒计时
                        this.countTime()
                    }
                    this.ifUseBalance = !response.flag
                    this.createOrder()
                })
        },
        //二维码是否显示
        displayPaymentQrCodeFun(data,type){
            this.displayPaymentQrCode = data
            if(type == 'paymentSuccess'){
                this.displayOrderSuccessFun(true)
            }
        },
        // 支付成功是否显示
        displayOrderSuccessFun(data,types){
            console.log(types)
            if(types == 'toMyGame'){
                console.log('去我的游戏')
                JumpTo(3);
            }else if(types == 'close'){
                console.log('关闭弹框')
                this.cancel()
            }else{
                this.displayOrderSuccess = data
            }
            // this.cancel() //成功后关闭订单
        },
        // 首单全面倒计时 15分钟
        countTime() {
            // var date = new Date()
            var now = new Date().getTime()
            var end =  this.endTime //this.treasu_data.etime * 1000     //this.treasu_data 在data中定义的,后台拿到的结束时间戳
            var leftTime = end - now //时间差
            var d, h, m, s, ms
            if (leftTime > 100) {
                // d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
                // h = Math.floor(((leftTime / 1000 / 60 / 60) % 24) + 24 * d)
                m = Math.floor((leftTime / 1000 / 60) % 60)
                s = Math.floor((leftTime / 1000) % 60)
                ms = Math.floor(leftTime % 1000 / 100)
                if (ms < 10) {
                ms = ms
                }
                if (s < 10) {
                s = '0' + s
                }
                if (m < 10) {
                m = '0' + m
                }
                // if(h < 10) {
                h =   h
                // }

                    //将倒计时赋值到div中
            // this.dataTime.date_d = d  //这里是渲染的天数
            // this.dataTime.date_h = h  //这里是渲染的小时
            this.dataTime.date_m = m  //这里是渲染的分钟
            this.dataTime.date_s = s  //这里是渲染的秒数
            this.dataTime.date_ms = ms  //这里是渲染的毫秒
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 50)
            } else {
                this.dataTime.date_m = '00' 
                this.dataTime.date_s = '00'  
                this.dataTime.date_ms = '00'

                this.countTime = null
                console.log('已截止')
            }
        },
        // 打开协议
        openAgreement(){
            var urls = window.location.protocol + '//' + window.location.host + "/userAgreement.html";
            window.sendCef("open_url", urls);
        },
        limitsFun(){
            var _this = this;
            _this.limits = true
            setTimeout(()=>{
                _this.limits = false
            },1500)
        }
    }
};
</script>
