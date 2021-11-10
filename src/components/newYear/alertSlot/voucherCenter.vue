<template>
<!-- 充值中心 -->
    <div class="voucherCenter">
        <!-- 充值 -->
        <div class="voucher">
            <!-- 充值title文案 -->
            <div class="newYearText ft28 font_weight simkai">新年限时首充翻倍</div>
            <!-- 选择充值金额 -->
            <div class="voucherBox">
                <!-- 充值选项 -->
                <div class="voucherItem goldLine_bg" v-for="(data,index) in paypal">
                    <!-- 翻倍logo -->
                    <div class="double" :class="data.state == 1?  index == 4 || index == 5? 'superDoublePrice superDoublePrice_bg' : 'doublePrice doublePrice_bg' : ''"></div>
                    <!-- 充值内部框 -->
                    <div class="voucherChange" @click="isVoucher(data,index)" :class="index == number ? 'isVoucher' : ''">
                        <!-- 金币数量盒子 -->
                        <div class="priceBox">
                            <!-- 金币图片 -->
                            <div class="gold gold_bg"></div>
                            <!-- 金币数量 -->
                            <div class="goldNum">
                                <div class="num ft18 font_weight simkai">{{data.prize}}</div>
                                <div class="text ft16 font_weight simkai">金币</div>
                            </div>
                            <!-- 金币兑换价格 -->
                            <div class="price ft18 font_weight simkai">¥{{data.money}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的金币 -->
            <div class="myGold">
                <div class="goldPic gold_bg"></div>
                <div class="goldText ft16 font_weight simkai">我的金币：</div>
                <div class="goldNum ft16 font_weight simkai">{{ancestors.balanceCard.balance}}</div> 
            </div>
            <!-- 金币活动规则 -->
            <div class="rule ft12 simkai">*活动期间获得的代币在活动结束后会保留，不可退还，可以参加下一次活动。*</div>
        </div>
        <!-- 付款方式 -->
        <div class="paymentInfo">
            <!-- 支付方式文案 -->
            <div class="choosePayment ft28 simkai font_weight">选择支付方式</div>
            <!-- 选择支付方式 -->
            <div class="paymentBox">
                <!-- 微信 -->
                <div class="wechat" @click="paymentMethod(2)"><svg-icon :iconClass="createeOrderData.payType == 2 ? 'wxNewYearActive' : 'wxNewYearDefault'" className='svg_icon'></svg-icon></div>
                <!-- 支付宝 -->
                <div class="alipay" @click="paymentMethod(3)"><svg-icon :iconClass="createeOrderData.payType == 3 ? 'zfbNewYearActive' : 'zfbNewYearDefault'" className='svg_icon'></svg-icon></div>
            </div>
            <!-- 二维码价格展示区 -->
            <div class="qrcodeBox">
                <!-- 二维码 -->
                <div class="qrcode" v-if="Object.keys(createeOrderSeccessData).length > 0">
                    <img class="imgBlock" :src="createeOrderSeccessData.qrcode"  alt="">
                </div>
                <!-- qrcode11_bg -->
                <div class="qrcodeNoData" v-else> <loading :text="''"/> </div> 
                <!-- 待付金额 -->
                <div class="payAmount">
                    <div class="payText ft14">待付金额</div>
                    <!-- 付款金额 -->
                    <div class="price ft24 font_weight">¥{{createeOrderSeccessData.unpay}}</div>
                    <div class="userAgreement ft12" @click="openAgreement">《用户服务协议》</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import store from '@/store'
import loading from "@/components/Loading/loading";
export default {
    name:'voucherCenter',
    components:{loading},
    store,
    inject:['ancestors'],
    data(){
    return {
        // 首冲翻倍假数据
        paypal:[],
        //创建订单所需的数据
        createeOrderData:{
            chargeId:3,//充值id
            payType:2,//默认微信创建订单
            channelId:this.$store.getters.getChannelIdFun,
        },
        //订单创建成功的数据
        createeOrderSeccessData:{},
        orderTimer:null,//订单定时器
        number:2,//记录充值选项被选中的下标
      }
    },
    created(){
        this.orderTimerClearInterval()
        // console.log('创建组件 清除定时器')
    },
    destroyed(){
        this.orderTimerClearInterval()
        // console.log('离开组件 清除定时器')
    },
    mounted(){
        console.log(this.paypal)
        this.queryOrderPrize()
        this.createNewYearOrder()
    },
    methods:{
        // 点击更改支付方式
        paymentMethod(data){
            this.createeOrderData.payType = data
            this.createNewYearOrder()
        },
        // 充值成功
        voucherSuccess(){
            this.$emit('change',true,{ 'changeFun':'voucherSuccess'})
        },
        // 点击哪个充值框显示被选中
        isVoucher(data,index){
            this.createeOrderData.chargeId = data.chargeId
            this.number = index
            this.createNewYearOrder()
        },
        //查询充值奖励
        queryOrderPrize(){
            let _this = this;
            _this.$fetch("/lucky/bag/charge/prize").then(response => {
                //查询成功
                if(response.flag){
                    _this.paypal = response.data
                    console.log(_this.paypal)
                }else{
                    console.log('查询失败')
                }
            })
        },
        
        //创建订单
        createNewYearOrder(){
            let _this = this;
            //清除定时器
            _this.orderTimerClearInterval()
            // 清除创建订单返回数据
            _this.createeOrderSeccessData = {}
            _this.$fetch("/lucky/bag/gold/charge",_this.createeOrderData).then(response => {
                // console.log(response)
                //创建订单成功
                if(response.flag){
                    _this.createeOrderSeccessData = response.data
                    //创建订单成功 调用定时器函数
                    _this.queryOrderTimer()
                }else{
                    console.log('创建订单失败')
                }
            })
        },
        //查询订单状态
        queryOrderState() {
            var _this = this;
            _this.$fetch("/lucky/bag/gold/query", { orderId: _this.createeOrderSeccessData.orderId })
                .then(response => {
                    //订单已支付
                    if(response.flag){
                        _this.orderTimerClearInterval()
                        // 充值成功调用一次我的金币查询接口
                        _this.ancestors.myGoldLucky()
                        _this.$emit('change',true,{ 'changeFun':'voucherSuccess'})
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
            var _this = this;
            if(_this.orderTimer != null){
                clearInterval(_this.orderTimer)
                _this.orderTimer = null
            }
        },
        // 打开协议
        openAgreement(){
            var urls = window.location.protocol + '//' + window.location.host + "/userAgreement.html";
            window.sendCef("open_url", urls);
        }
    }
}
</script>


<style lang="scss" scoped>
    .voucherCenter {
        width: 788px;
        height: 445px;
        margin:9px 16px 11px 17px;
        display: flex;
        //充值
        .voucher {
            width: 411px;
            height: 445px;
            //充值title文案
            .newYearText {
                width: 224px;
                line-height: 39px;
                margin: 36px 0 0 23px;
                color: #FFE6B3;
            }
            //选择充值金额
            .voucherBox {
                width: 360px;
                height: 263px;
                margin-left: 23px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                // 充值选项
                .voucherItem {
                    width: 172px;
                    height: 50px;
                    position: relative;
                    margin-top: 21px;
                    cursor: pointer;
                    // 首充翻倍
                    .doublePrice {
                        width: 51px;
                        height: 18px;
                        position: absolute;
                        top: -7px;
                        left: 107px;
                        z-index: 1;
                    }
                    // 超值！首充翻倍
                    .superDoublePrice {
                        width: 95px;
                        height: 18px;
                        position: absolute;
                        top: -7px;
                        left: 63px;
                        z-index: 1;
                    }
                    .voucherChange {
                        width: 164px;
                        height: 42px;
                        top: 3px;
                        left: 4px;
                        position: absolute;
                        .priceBox {
                            width: 150px;
                            height: 28px;
                            margin: 8px 0 0 5px;
                            display: flex;
                            //金币图片
                            .gold {
                                width: 16px;
                                height: 12px;
                                margin-top: 7px;
                            }
                            //金币数量
                            .goldNum {
                                width: 65px;
                                height: 23px;
                                margin: 2px 0 0 4px;
                                border-right: 1px dashed #FFE6B3;
                                display: flex;
                                .num {
                                    min-width: 18px;
                                    line-height: 22px;
                                    color: #FFE6B3;
                                }
                                .text {
                                    width: 34px;
                                    line-height: 22px;
                                    margin-left: 3px;
                                    color: #FFE6B3;
                                }
                            }
                            //金币兑换价格
                            .price {
                                min-width: 33px;
                                height: 23px;
                                margin-left: 23px;
                                color: #FFE6B3;
                            }
                        }
                    }
                }
            }
            //我的金币
            .myGold {
                width: 170px;
                height: 22px;
                margin-left: 23px;
                margin-top: 20px;
                display: flex;
                //金币图片
                .goldPic {
                    width: 16px;
                    height: 12px;
                    margin-top: 7px;
                }
                //我的金币
                .goldText {
                    width: 88px;
                    height: 22px;
                    margin-left: 6px;
                    color: #FFE6B3;
                }
                //金币数量
                .goldNum {
                    min-width: 20px;
                    height: 22px;
                    color: #FFE6B3;
                    margin-top: 1px;
                }
            }
            //金币活动规则
            .rule {
                width: 358px;
                line-height: 17px;
                margin: 3px 0 0 23px;
                color: rgba(255, 230, 179, 0.8);
            }
        }
        // 右侧支付
        .paymentInfo {
            width: 377px;
            height: 355px;
            margin-top: 36px;
            border-left: 1px solid rgba(255, 230, 179, 0.3);
            // 支付文案
            .choosePayment {
                width: 168px;
                line-height: 39px;
                margin-left: 28px;
                color: rgba(255,230,178,1);
            }
            // 支付方式
            .paymentBox {
                width: 302px;
                height: 42px;
                margin: 22px 0 0 28px;
                display: flex;
                justify-content: space-between;
                // 微信
                .wechat {
                    width: 148px;
                    height: 42px;
                    cursor: pointer;
                }
                // 支付宝
                .alipay {
                    width: 148px;
                    height: 42px;
                    cursor: pointer;
                }
            }
            // 二维码盒子
            .qrcodeBox {
                width: 299px;
                height: 223px;
                margin: 21px 0 0 28px;
                background: linear-gradient(180deg, #FFE6B3 0%, #FFD06D 100%);
                border-radius: 8px;
                display: flex;
                align-items: center;
                //二维码
                .qrcode,.qrcodeNoData {
                    width: 123px;
                    height: 123px;
                    margin-left: 28px;
                    position: relative;
                }
                //待付金额
                .payAmount {
                    width: 144px;
                    height: 123px;
                    // 待付金额
                    .payText {
                        width: 56px;
                        line-height: 19px;
                        margin-left: 29px;
                        color: rgba(77,56,15,1);
                    }
                    // 价格
                    .price {
                        min-width: 42px;
                        height: 32px;
                        margin: 9px 0 0 29px;
                        color: #CB4000;
                    }
                    // 用户服务协议
                    .userAgreement {
                        width: 101px;
                        line-height: 18px;
                        margin: 38px 0 0 22px;
                        color: #4D380F;
                        cursor: pointer;
                    }
                }
            }
        }
    }

// 点击充值的选项背景颜色
.isVoucher {background-color: rgba(148, 14, 14, 0.23);}
</style>