<template>
<!-- 充值中心 -->
    <div class="alertSlotBox">
        <!-- 充值 -->
        <div class="voucher">
            <!-- 充值title文案 -->
            <div class="newYearText ft24 font_weight">新年福袋金币充值</div>
            <!-- 选择充值金额 -->
            <div class="voucherBox">
                <!-- 充值选项 -->
                <div class="voucherItem goldLine_bg" v-for="(data,index) in paypal">
                    <!-- 翻倍logo -->
                    <div class="double"></div>
                    <!-- 充值内部框 -->
                    <div class="voucherChange" @click="isVoucher(data,index)" :class="index == number ? 'isVoucher' : ''">
                        <!-- 金币数量盒子 -->
                        <div class="priceBox">
                            <!-- 金币图片 -->
                            <div class="gold"></div>
                            <!-- 金币数量 -->
                            <div class="goldNum">
                                <div class="num ft16">￥{{data.money}}</div>
                            </div>
                            <!-- 金币兑换价格 -->
                            <div class="price">
                                <div class="gold gold_bg"></div>
                                <div class="payfor ft16">{{data.prize}}</div>
                                <div class="text ft16">金币</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的金币 -->
            <div class="myGold">
                <div class="goldPic gold_bg"></div>
                <div class="goldText ft16 font_weight">我的金币：</div>
                <div class="goldNum ft16 font_weight">{{ancestors.myGoldDatas.balance}}</div> 
            </div>
            <!-- 金币活动规则 -->
            <div class="rule ft12">*活动期间获得的代币在活动结束后会保留，不可退还，可以参加下一次活动。*</div>
        </div>
        <!-- 付款方式 -->
        <div class="paymentInfo">
            <!-- 支付方式文案 -->
            <div class="choosePayment ft24 font_weight">选择支付方式</div>
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
import { EventBus } from "@/utils/eventBus.js";

export default {
    name:'voucherCenter',
    components:{loading},
    store,
    inject:['ancestors'],
    data(){
        return {
            paypal:[],//金币充值保存数据
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
    },
    destroyed(){
        this.orderTimerClearInterval();
    },
    mounted(){
        this.queryOrderPrize();
        this.createluckNewYearOrder();
    },
    methods:{
        // 点击更改支付方式
        paymentMethod(data){
            this.createeOrderData.payType = data
            this.createluckNewYearOrder()
        },
        // 点击哪个充值框显示被选中
        isVoucher(data,index){
            this.createeOrderData.chargeId = data.chargeId
            this.number = index
            this.createluckNewYearOrder()
        },
        // 金币充值接口 /lucky/turntable/charge/prize
        queryOrderPrize(){
            let _this = this;
            _this.$fetch('/lucky/turntable/charge/prize').then(response => {
                // 查询成功
                // console.log(response)
                if(response.flag){
                    _this.paypal = response.data
                    // console.log(_this.paypal)
                    // EventBus.$emit('queryGold')
                }else{
                    console.log('查询失败')
                }
            })
        },
        // 创建订单
        createluckNewYearOrder(){
            let _this = this;
            // 清除定时器
            _this.orderTimerClearInterval();
            // 清除创建订单返回数据
            _this.createeOrderSeccessData = {};
            _this.$fetch('/lucky/turntable/gold/charge',_this.createeOrderData).then(response => {
                // console.log(response)
                // 创建订单成功
                if(response.flag){
                    _this.createeOrderSeccessData = response.data
                    //创建订单成功 调用定时器函数
                    _this.queryOrderTimer()
                }else{
                    console.log('创建订单失败')
                }
            })
        },
        // 查看订单状态
        queryOrderState(){
            var _this = this;
            _this.$fetch('/lucky/turntable/gold/query',{orderId:_this.createeOrderSeccessData.orderId})
                .then(response => {
                    // 订单已支付
                    if(response.flag){
                        _this.orderTimerClearInterval()
                        // 充值成功调用一次我的金币查询接口
                        EventBus.$emit('changeMyGold')
                        _this.$emit('change',true,{'changeFun':'voucherSuccess'})
                    }
            })
        },
        // 创建订单定时器
        queryOrderTimer(){
            var _this = this;
            _this.orderTimerClearInterval()
            _this.orderTimer = setInterval(() => {
                _this.queryOrderState()
            },1000)
        },
        // 清楚定时器
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
    .alertSlotBox {
        display: flex;
        width: 821px;
        height: 464px;
        position: relative;
        top: 0px;
        left: 0px;
        //充值
        .voucher {
            width: 411px;
            height: 464px;
            //充值title文案
            .newYearText {
                width: 192px;
                line-height: 32px;
                margin: 43px 0 0 40px;
                color: #351D05;
            }
            //选择充值金额
            .voucherBox {
                width: 360px;
                height: 226px;
                margin: 37px 0 0 40px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-content: space-between;
                // 充值选项
                .voucherItem {
                    width: 172px;
                    height: 50px;
                    position: relative;
                    cursor: pointer;
                    .voucherChange {
                        width: 172px;
                        height: 50px;
                        position: absolute;
                        border-radius: 10px;
                        .priceBox {
                            width: 150px;
                            height: 24px;
                            margin: 13px 0 0 9px;
                            display: flex;
                            //金币数量
                            .goldNum {
                                width: 45px;
                                height: 24px;
                                margin-right: 10px;
                                .num {
                                    min-width: 25px;
                                    line-height: 24px;
                                    color: #351D05;
                                    font-weight: 600;
                                    text-align: right;
                                }
                            }
                            //金币兑换价格
                            .price {
                                width: 96px;
                                height: 24px;
                                align-items: center;
                                justify-content: space-between;
                                display: flex;
                                color: #351D05;
                                border-left: 1px dashed #000000;
                                .gold {
                                    width: 17px;
                                    height: 14px;
                                    margin-left: 10px;
                                }
                                .payfor {
                                    min-width: 18px;
                                    height: 24px;
                                }
                                .text {
                                    width: 32px;
                                    height: 24px;
                                }
                            }
                        }
                    }
                }
            }
            //我的金币
            .myGold {
                width: 170px;
                height: 22px;
                margin: 24px 0 0 40px;
                display: flex;
                //金币图片
                .goldPic {
                    width: 17px;
                    height: 14px;
                    margin-top: 7px;
                }
                //我的金币
                .goldText {
                    width: 88px;
                    height: 22px;
                    margin-left: 6px;
                    color: #351D05;
                }
                //金币数量
                .goldNum {
                    min-width: 20px;
                    height: 22px;
                    color: #351D05;
                    margin-top: 1px;
                }
            }
            //金币活动规则
            .rule {
                width: 358px;
                line-height: 17px;
                margin: 6px 0 0 40px;
                color: rgba(53,29,5,0.85);
            }
        }
        // 右侧支付
        .paymentInfo {
            width: 406px;
            height: 365px;
            margin-top: 43px;
            border-left: 1px solid rgba(53,29,5,1);
            // border: 1px pink solid;
            // 支付文案
            .choosePayment {
                width: 168px;
                line-height: 39px;
                margin-left: 28px;
                color:rgba(53,29,5,1);
            }
            // 支付方式
            .paymentBox {
                width: 302px;
                height: 42px;
                margin: 29px 0 0 28px;
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
                background: rgba(255,238,149,1);
                border-radius: 8px;
                display: flex;
                align-items: center;
                //二维码
                .qrcode {
                    width: 123px;
                    height: 123px;
                    margin-left: 28px;
                    position: relative;
                }
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
                        color: rgba(60,60,67,0.65);
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
                        color: rgba(53,29,5,0.47);
                        cursor: pointer;
                    }
                }
            }
        }
    }

.isVoucher {background-color: rgba(255,162,0,0.6);}
</style>