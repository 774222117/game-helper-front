<template>
    <div class="alertContent">
        <!-- 背景图 -->
        <div class="voucherContent voucherContent_bg">
            <!-- 关闭按钮 -->
            <div class="close serchClose_bg" @click="close"></div>
            <!-- 左边内容 -->
            <div class="leftContent">
                <div class="gameNameContent">
                    <div class="gameNameText ft16">游戏名称</div>
                    <div class="bagText ft14">新春畅享包</div>
                </div>
                <!-- 购买的游戏名称 -->
                <div class="gameBagName gameBagName_bg">
                    <div class="gameBagContent ft12">
                        <div class="gameName1" v-for="item in alreadyChangeGame">{{item.chinaName}}</div>
                    </div>
                </div>
                <!-- 购买类型 -->
                <div class="gameTypeContent">
                    <div class="buyType ft16">选择购买类型</div>
                    <div class="type ft14">畅享</div>
                </div>
                <!-- 选择优惠 -->
                <div class="changeDiscountText ft16">选择优惠</div>
                <!-- 新春活动价格 -->
                <div class="newYearContent newYearContent_bg">
                    <div class="yearActivityText ft16">新春活动价</div>
                    <div class="yearPriceContent ft14">
                        <!-- 立省 -->
                        <div class="establish">立省￥{{discount}}</div>
                        <!-- 仅售 -->
                        <div class="onlySale">仅售￥{{unpay}}</div>
                    </div>
                </div>
                <!-- 用户余额 -->
                <div class="priceContent">
                    <!-- P币 -->
                    <div class="pCoinsContent">
                        <div class="pText ft16">P币</div>
                        <div class="pCoinsBalanceContent">
                            <!-- 选中 -->
                            <div class="changePCoinPic" :class="pCoins ? 'isActive_bg' : 'unActive_bg' " @click="choicePcoins"></div>
                            <div class="userPcoins ft14">使用{{userPCoins}}</div>
                        </div>
                    </div>
                    <!-- 余额 -->
                    <div class="balanceContent">
                        <div class="balaceText ft16">余额</div>
                        <div class="balanceCoinsContent">
                            <!-- 选中 -->
                            <div class="changePCoinPic" :class="userBalance ? 'isActive_bg' : 'unActive_bg' " @click="choiceUserBalance"></div>
                            <div class="userPcoins ft14">使用￥{{userMoneyCoins}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右边内容 -->
            <div class="rightContent">
                <!-- 支付主界面 -->
                <div class="payforContent1" v-if="moneyEnough !== 2">
                    <!-- 支付方式 -->
                    <div class="payforText ft16">请选择支付方式</div>
                    <!-- wx zfb -->
                    <div class="payforTypeContent">
                        <!-- wx -->
                        <div class="wxIcon" @click="paymentMethod(2)"><svg-icon :iconClass="createOrderData.payType == 2 ? 'wxNationActive' : 'wxNationDefault'" className='svg_icon'></svg-icon></div>
                        <!-- zfb -->
                        <div class="zfbIcon" @click="paymentMethod(3)"><svg-icon :iconClass="createOrderData.payType == 3 ? 'zfbNationActive' : 'zfbNationDefault'" className='svg_icon'></svg-icon></div>
                    </div>
                    <!-- qrcode二维码 -->
                    <div class="qrcodeContent qrcodeContent_bg">
                        <div class="qrcodeBox">
                            <!-- 左边二维码 -->
                            <div class="leftQrcode">
                                <img :src="qrcodePic" alt="">
                            </div>
                            <!-- 右边付款详情 -->
                            <div class="rightPayfor">
                                <div class="payText ft14">待付金额</div>
                                <!-- 金额 -->
                                <div class="price ft24">￥{{unpay}}</div>
                                <!-- 已优惠 -->
                                <div class="alreadyDiscount ft12">已优惠{{discount}}元</div>
                                <!-- 协议 -->
                                <div class="agreement ft12" @click="openAgreement">《用户服务协议》</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="payforContent2 ft14" v-else @click="userMoneyCoinsPayfor">立即支付</div>
                <!-- 底部三证 -->
                <div class="bottomProve">
                    <div class="prove1 prove1_bg"></div>
                    <div class="prove2 prove2_bg"></div>
                    <div class="prove3 prove3_bg"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'voucherCenter',
    data(){
        return {
            pCoins:false,//默认未选中P币按钮
            userBalance:false,//默认未选中用户余额
            userPCoins:null,//用户P币余额
            userMoneyCoins:null,//用户余额 
            createOrderData:{
                appIds:'',// 1121560,582010,1659800 用逗号分隔购买游戏的appid
                payType:2,//支付方式    INT       是     支付方式 1 余额支付 2 微信支付 3 支付宝支付(默认) 4 券票支付
                balanceType:0,//是否使用余额 INT       是     0 否(默认)  1 是
                creditType:0,//是否使用P币 INT       是     0 否(默认)  1 是      4.23 新增
                channelId:this.$store.getters.getChannelIdFun,//渠道ID
            },
            qrcodePic:'',//保存二维码图
            unpay:'',//待支付金额
            discount:'',//已优惠金额
            orderId:'',//订单ID
            moneyEnough:1,//用户余额不足
            timer:300000,//定时器时间
        }
    },
    props:['alreadyChangeGame'],
    mounted(){
        // console.log(this.alreadyChangeGame)
        this.computedAppid()
        // 获取用户余额
        this.$fetch("/account/getBalance").then(response => {
            this.$store.commit('setUserBalance',response.data)
            // 用户余额
            this.userMoneyCoins = response.data.balance
            // 用户P币
            this.userPCoins = response.data.credit
        });

        //创建订单
        this.createDiscountGame()
    },
    methods:{
        // 用户余额直接支付
        userMoneyCoinsPayfor(){
            var _this = this
            _this.$fetch('/order/balance/pay',{orderId:_this.orderId})
            .then((response) => {
                // console.log(response)
                if(response.flag){
                    // 关闭支付窗口，跳转支付成功界面
                    _this.$emit('change',false)
                    _this.$emit('success',true)
                }else{
                    console.log('支付失败')
                }
            })
        },
        // 将appid逗号分隔并组合
        computedAppid(){
            for(var i = 0;i < this.alreadyChangeGame.length;i++){
                this.createOrderData.appIds += this.alreadyChangeGame[i].appId + ','
                // console.log(this.createOrderData.appIds)
            }
        },
        // 关闭按钮
        close(){
            // 关闭定时器
            if(this.timer != null){
                this.closeOrder()
			}
            this.$emit('change',false)
        },
        // 关闭定时器
        closeOrder(){
            clearInterval(this.timer);
            this.timer = null;
        },
        // 选中P币
        choicePcoins(){
            this.pCoins = !this.pCoins
            if(!!this.pCoins){
                this.createOrderData.creditType = 1
            }else{
                this.createOrderData.creditType = 0
            }
            //创建订单
            this.createDiscountGame()
        },
        // 选中用户余额
        choiceUserBalance(){
            this.userBalance = !this.userBalance
            if(!!this.userBalance){
                this.createOrderData.balanceType = 1
            }else{
                this.createOrderData.balanceType = 0
            }
            //创建订单
            this.createDiscountGame()

        },
        // 点击更改支付方式
        paymentMethod(data){
            this.createOrderData.payType = data
            //创建订单
            this.createDiscountGame()
            // console.log(this.createOrderData.payType)
            // this.createluckNewYearOrder()
        },
        // "worth": 98.00,//价值
        // "discount": 97.91,//立减
        // "orderId":1,//订单ID
        // "loseTime":300,//订单超时时间
        // "enough":0,//不可以使用余额 1 可以使用但不足 2 可以使用且足够 在勾选余额时需要payType=1
        // "balance":999999.99,//余额
        // "credit": 100000,//积分         4.23 新增
        // "unpay":0.01,//待支付 //enough=true 无待支付
        // 创建订单 /newYear/create
        createDiscountGame(){
            var _this = this
            // 关闭上一个定时器
            _this.closeOrder()
            // 发送创建订单请求
            _this.$fetch('/newYear/create',_this.createOrderData)
            .then((response) => {
                // console.log(response)
                if(response.flag){
                    _this.qrcodePic = response.data.qrcode
                    _this.unpay = response.data.unpay
                    _this.discount = response.data.discount
                    _this.orderId = response.data.orderId
                    _this.moneyEnough = response.data.enough
                    // 启动定时器，查询订单状态
                    _this.setTimer()
                }else{
                    _this.$emit('replayGame',true,response.message)
                    console.log('创建订单失败')
                }
            })
        },
        //每隔1秒查询一次订单状态
        setTimer(){
            var _this = this
            _this.timer = setInterval(function(){
                _this.watchOrderState()
            },1000)
        },
        // /order/query  查询支付状态 
        watchOrderState(){
            var _this = this
            if(_this.moneyEnough == 2){
                return
            }
            _this.$fetch('/order/query',{orderId:_this.orderId})
            .then((response) => {
                // console.log(response)
                if(response.flag){
                    // 关闭定时器
                    clearInterval(_this.timer);
                    _this.timer = null;
                    // 关闭支付窗口，跳转支付成功界面
                    _this.$emit('change',false)
                    _this.$emit('success',true)
                }else{
                    console.log('订单未支付')
                }
            })
        },
        // 打开协议
        openAgreement(){
            var urls = window.location.protocol + '//' + window.location.host + "/userAgreement.html";
            window.sendCef("open_url", urls);
        },
    }
}
</script>


<style lang="scss" scoped>
    .alertContent {
        width: 100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        margin: auto;
        background-color: rgba(13, 22, 30, 0.7);
        .voucherContent {
            width: 760px;
            height: 441px;
            position: absolute;
            top: 204px;
            left: 0;
            right: 0;
            margin: 0 auto;
            // 关闭按钮
            .close {
                width: 33px;
                height: 40px;
                position: absolute;
                top: 0;
                right: 30px;
                cursor: pointer;
            }
            // 左边内容
            .leftContent {
                width: 307px;
                height: 358px;
                position: absolute;
                left: 43px;
                top: 36px;
                .gameNameContent {
                    width: 307px;
                    height: 22px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .gameNameText {
                        width: 64px;
                        line-height: 22px;
                        font-family: PingFang SC, PingFang SC-Medium;
                        font-weight: 500;
                        text-align: center;
                        color: rgba(255,240,202,0.63);
                    }
                    .bagText {
                        width: 70px;
                        line-height: 20px;
                        font-family: PingFang SC, PingFang SC-Regular;
                        font-weight: 400;
                        text-align: center;
                        color: #ffe8ac;
                    }
                }
                // 购买的游戏合集名称
                .gameBagName {
                    width: 307px;
                    height: 67px;
                    margin-top: 8px;
                    overflow: hidden;
                    .gameBagContent {
                        width: 235px;
                        height: 40px;
                        margin: 14px 0 0 12px;
                        font-family: PingFang SC, PingFang SC-Semibold;
                        font-weight: 600;
                        text-align: LEFT;
                        color: #ffe8ac;
                        line-height: 20px;
                        // 文字第二排超出省略
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        display: flex;
                        flex-wrap: wrap;
                        .gameName1 {
                            margin-right: 10px;
                            height: 20px;
                            line-height: 20px;
                            text-align: left;
                        }
                    }
                }
                // 购买类型
                .gameTypeContent {
                    width: 307px;
                    height: 22px;
                    margin-top: 8px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .buyType {
                        width: 96px;
                        height: 22px;
                        font-family: PingFang SC, PingFang SC-Medium;
                        font-weight: 500;
                        text-align: LEFT;
                        color: rgba(255,240,202,0.63);
                    }
                    .type {
                        width: 28px;
                        height: 20px;
                        font-family: PingFang SC, PingFang SC-Regular;
                        font-weight: 400;
                        text-align: right;
                        color: #ffe8ac;
                    }
                }
                // 选择优惠
                .changeDiscountText {
                    width: 64px;
                    height: 22px;
                    font-family: PingFang SC, PingFang SC-Medium;
                    font-weight: 500;
                    text-align: LEFT;
                    color: rgba(255,240,202,0.63);
                    margin-top: 32px;
                }
                // 新春活动价
                .newYearContent {
                    width: 307px;
                    height: 50px;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    .yearActivityText {
                        width: 80px;
                        height: 22px;
                        font-family: PingFang SC, PingFang SC-Medium;
                        font-weight: 500;
                        text-align: LEFT;
                        color: #fff0ca;
                        margin-left: 10px;
                    }
                    .yearPriceContent {
                        min-width: 176px;
                        height: 20px;
                        font-family: PingFang SC, PingFang SC-Regular;
                        font-weight: 400;
                        text-align: LEFT;
                        color: #ffe8ac;
                        margin-left: 32px;
                        display: flex;
                        justify-content: space-between;
                        .onlySale {
                            // margin-left: 4px;
                        }
                    }
                }
                // 用户余额
                .priceContent {
                    width: 307px;
                    height: 59px;
                    margin-top: 62px;
                    // P币
                    .pCoinsContent {
                        width: 307px;
                        height: 22px;
                        display: flex;
                        justify-content: space-between;
                        .pText {
                            width: 27px;
                            height: 22px;
                            font-family: PingFang SC, PingFang SC-Medium;
                            font-weight: 500;
                            text-align: LEFT;
                            color: rgba(255,240,202,0.63);
                        }
                        .pCoinsBalanceContent {
                            width: 118px;
                            height: 20px;
                            display: flex;
                            justify-content: space-between;
                            // 选中
                            .changePCoinPic {
                                width: 20px;
                                height: 20px;
                                cursor: pointer;
                            }
                            .userPcoins {
                                width: 89px;
                                line-height: 20px;
                                font-family: PingFang SC, PingFang SC-Regular;
                                font-weight: 400;
                                text-align: LEFT;
                                color: #ffe8ac;
                            }
                        }
                    }
                    // 余额
                    .balanceContent {
                        width: 307px;
                        height: 22px;
                        margin-top: 15px;
                        display: flex;
                        justify-content: space-between;
                        .balaceText {
                            width: 32px;
                            height: 22px;
                            font-family: PingFang SC, PingFang SC-Medium;
                            font-weight: 500;
                            text-align: LEFT;
                            color: rgba(255,240,202,0.63);
                        }
                        .balanceCoinsContent {
                            width: 118px;
                            height: 20px;
                            display: flex;
                            justify-content: space-between;
                            // 选中
                            .changePCoinPic {
                                width: 20px;
                                height: 20px;
                                cursor: pointer;
                            }
                            .userPcoins {
                                width: 89px;
                                line-height: 20px;
                                font-family: PingFang SC, PingFang SC-Regular;
                                font-weight: 400;
                                text-align: LEFT;
                                color: #ffe8ac;
                            }
                        }
                    }
                }
            }
            // 右边内容
            .rightContent {
                width: 309px;
                height: 358px;
                position: absolute;
                top: 36px;
                right: 32px;
                .payforContent1 {
                    width: 309px;
                    height: 303px;
                    .payforText {
                        width: 112px;
                        height: 22px;
                        font-family: PingFang SC, PingFang SC-Medium;
                        font-weight: 500;
                        text-align: LEFT;
                        color: rgba(255,240,202,0.63);
                    }
                    // wx zfb
                    .payforTypeContent {
                        width: 308px;
                        height: 42px;
                        margin-top: 11px;
                        display: flex;
                        justify-content: space-between;
                        // wx
                        .wxIcon {
                            width: 148px;
                            height: 42px;
                            border-radius: 2px;
                            cursor: pointer;
                        }
                        // zfb
                        .zfbIcon {
                            width: 148px;
                            height: 42px;
                            border-radius: 2px;
                            cursor: pointer;
                        }
                    }
                    // 支付盒子
                    .qrcodeContent {
                        width: 309px;
                        height: 201px;
                        border-radius: 8px;
                        margin-top: 27px;
                        overflow: hidden;
                        .qrcodeBox {
                            width: 256px;
                            height: 123px;
                            margin: 39px 0 0 28px;
                            display: flex;
                            justify-content: space-between;
                            // 左边二维码
                            .leftQrcode {
                                width: 126px;
                                height: 123px;
                                position: relative;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    position: absolute;
                                }
                            }
                            // 右边付款明细
                            .rightPayfor {
                                width: 104px;
                                height: 123px;
                                .payText {
                                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                                    font-weight: 400;
                                    text-align: LEFT;
                                    color: #9f6350;
                                    margin-left: 5px;
                                }
                                .price {
                                    line-height: 32px;
                                    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                                    font-weight: 700;
                                    text-align: LEFT;
                                    color: #ffebcc;
                                    text-shadow: 0px 2px 4px 0px #441815;
                                    margin: 1px 0 0 2px;
                                }
                                .alreadyDiscount {
                                    width: 69px;
                                    line-height: 18px;
                                    opacity: 0.47;
                                    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                                    font-weight: 700;
                                    text-align: LEFT;
                                    color: #ffebcc;
                                    margin-left: 6px;
                                }
                                .agreement {
                                    width: 104px;
                                    line-height: 18px;
                                    opacity: 0.47;
                                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                                    font-weight: 400;
                                    text-align: LEFT;
                                    color: #9f6350;
                                    margin-top: 35px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
                .payforContent2 {
                    width: 298px;
                    line-height: 43px;
                    background: #c06c50;
                    border: 1px solid #ffe8ac;
                    border-radius: 4px;
                    margin: 10px auto;
                    font-family: PingFang SC, PingFang SC-Semibold;
                    font-weight: 600;
                    text-align: center;
                    color: #ffe8ac;
                    letter-spacing: 0.22px;
                    cursor: pointer;
                }
                // 底部三证
                .bottomProve {
                    width: 308px;
                    height: 27px;
                    position: absolute;
                    bottom: 0;
                    display: flex;
                    justify-content: space-between;
                    .prove1 {
                        width: 93px;
                        height: 27px;
                    }
                    .prove2 {
                        width: 93px;
                        height: 27px;
                    }
                    .prove3 {
                        width: 110px;
                        height: 27px;
                    }
                }
            }
        }
    }
</style>