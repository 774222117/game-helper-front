<template>
<!-- 会员支付 -->
    <div class="alertMemberMain">
        <div class="alertContent memberMain_bg">
            <!-- 关闭 -->
            <div class="close opc_hover" @click="cancel"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div>
            <!-- 本单立减 -->
            <div class="thisListReduction ft16" v-if="reductionOrder">VIP会员, <i>{{$store.getters.getReductionOrder.name}}</i> 立减 <span class="ft22 font_weight">{{$store.getters.getReductionOrder.price}}元</span></div>
            <!-- <div class="thisListReduction ft16" v-else></div> -->
            <!-- 下面内容 会员信息 -->
            <div class="memberInfo">
                <!-- 会员卖点 -->
                <div class="memberInfoTitle">
                    <div class="sellingPoint ft16" v-for="n in sellingPoint">
                        <div class="icon"><svg-icon :iconClass='n.icon' className='svg_icon'></svg-icon></div>
                        <div class="texts">{{n.text}}</div>
                    </div>
                </div>
                <!-- 会员选择 月 季  付款码-->
                <div class="memberTypeAddPayment">
                    <!-- 左边的会员选择 -->
                    <div class="leftMemberType">
                        <!-- 上面的选择月季年 -->
                        <div class="leftMemberTypeTop">
                            <!-- 外层元素 -->
                            <div class="memberTypeItems" v-for="(n,index) in memberLevelData" :class="[memberTypeItemsActive == index?'memberTypeItemsActive':'' ,n.recommend == 1?'recommend':'']" @click="memberTypeChange(index)">
                                <div class="memberItemContents" :class="memberTypeItemsActive == index?'memberItemsDiamonds_bg':''" >
                                    <div class="text1">
                                        <div class="iconLeft"> <svg-icon iconClass='memberLeft' className='svg_icon'></svg-icon> </div> 
                                        <div class="textMiddle ft18 font_weight"> {{ n.levelName }} </div> 
                                        <div class="iconRight"> <svg-icon iconClass='memberRight' className='svg_icon'></svg-icon> </div> 
                                    </div>
                                    <div class="text2">
                                        <div class="ft14">￥</div>
                                        <div class="ft26 font_weight">{{ n.price }} </div>
                                        <!-- <div class="ft16">/月</div> -->
                                    </div>
                                    <div class="text3">
                                        <div class="ft12">送</div>
                                        <div class="ft12 font_weight">{{n.gameNum}}</div>
                                        <div class="ft12">款</div>
                                    </div>
                                    <div class="text4">
                                        <div class="ft12">游戏总价值</div>
                                        <div class="ft12 font_weight">￥{{n.worth}}</div>
                                        <!-- <div class="ft12"></div> -->
                                    </div>
                                    <div class="text5">
                                        <div class="ft12">送</div>
                                        <div class="ft12 font_weight">{{n.ticketHour}}</div>
                                        <div class="ft12">小时试玩</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 下面的游戏价值展示 -->
                        <div class="memberFooter memberFooter_bg">
                            <div class="footerTitle">
                                <div class="leftText ft16 font_weight">{{memberTypeItems.levelName}}赠送{{memberTypeItems.gameNum}}款游戏</div>
                                <div class="rightPrice ft16">价值：¥{{memberTypeItems.worth}}</div>
                            </div>
                            <div class="gameImg">
                                <div class="gameImgItems" v-for=" n in memberTypeItems.levelGames">
                                    <div class="imgBox"><img :src="n.image" alt=""></div>
                                    <div class="imgName ft12 color_white_1 textOver2">{{ n.chinaName ==''?n.englishName:n.chinaName }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 付款码 -->
                    <div class="rightMemberPayment">
                        <!-- 付款方式 -->
                        <div class="titlePayment">
                            <!-- 微信 -->
                            <div class="leftWx" @click="wxActiveFun">
                                <svg-icon
                                :iconClass="memberOrderData.payType == 2 ? 'wxActiveVip' : 'wxDefaultVip'"
                                class="svg_icon"
                                ></svg-icon>
                            </div>
                            <!-- 支付宝 -->
                            <div class="rightZfb" @click="zfbActiveFun">
                                <svg-icon
                                :iconClass="memberOrderData.payType == 3 ? 'zfbActiveVip' : 'zfbDefaultVip'"
                                class="svg_icon"
                                ></svg-icon>
                            </div>
                        </div>
                        <!-- 付款二维码 -->
                        <div class="qrCode">
                            <div class="imgQrCode" v-if="!!memberOrderBackData.qrcode">
                                <img :src="memberOrderBackData.qrcode" alt="">
                            </div>
                            <div class="loadings" v-else>
                                <loading :text="''"/>
                            </div>
                        </div>
                        <!-- 应付金额 -->
                        <div class="amountDue ft18"> 应付金额：<span class="ft24">¥{{memberOrderBackData.unpay}}</span></div>
                        <!-- 协议 -->
                        <div class="agreement">
                            <div class="memberAgreement ft12" @click="openAgreement">《会员服务协议》</div>
                            <div class="shareAgreement ft12" @click="openAgreement">《畅享服务协议》</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <openMember v-if="displayOpenMember" @change="displayOpenMemberFun"/>
    </div>
</template>
<style lang="scss" scoped>
.font_weight{font-weight: bold;}
.alertMemberMain {
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(0, 0, 0, 0.8);
    .alertContent {
        width: 1040px;
        height: 658px;
        box-sizing: border-box;
        border-radius:6px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        // 关闭
        .close{
            width: 24px;
            height: 24px;
            position: absolute;
            right: 14px;
            top: 14px;
            cursor: pointer;
        }
        // 本单立减
        .thisListReduction{
            width:100%;
            height: 38px;
            background: #ACA173;
            color: #FFFCED;
            border-radius: 8px 8px 0px 0px;
            position: absolute;
            left: 0;
            top: -28px;
            display: flex;
            align-items: center;
            justify-content: center;
            letter-spacing: 1px;
            font-weight: bold;
            i{}
            span{
                margin-left: 5px;
                color: #483C00;
                letter-spacing: -1px;
            }
        }
        // 会员信息
        .memberInfo{
            width: 943px;
            height: 491px;
            margin: 169px auto 36px;
            // 会员信息卖点
            .memberInfoTitle{
                width: 100%;
                height: 42px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // 上面三个卖点
                .sellingPoint{
                    width:248px;
                    height:42px;
                    background-color:rgba(2,9,18,0.31);
                    color: rgba(218, 216, 195, 1);
                    border-radius:3px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon{
                        width: 16px;
                        height: 16px;
                        margin-right: 4px;
                    }
                }
            }
            // 会员类型与付款码
            .memberTypeAddPayment{
                width: 100%;
                height: 417px;
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                // 左边会员类型
                .leftMemberType{
                    width: 612px;
                    height: 100%;
                    //会员类型选择
                    .leftMemberTypeTop{
                        width: 100%;
                        height: 230px;
                        display: flex;
                        justify-content: space-between;
                        //外层盒子
                        .memberTypeItems{
                            width:178px;
                            height:230px;
                            box-sizing: border-box;
                            background:linear-gradient(180deg,rgba(32,41,57,1) 0%,rgba(3,11,19,1) 100%);
                            box-shadow:0px 4px 20px 0px rgba(0,0,0,0.5);
                            border-radius:3px;
                            cursor: pointer;
                            // 内层盒子
                            .memberItemContents{
                                width: 118px;
                                height: 164px;
                                margin: 30px auto 0;
                                .text1{
                                    width: 100%;
                                    height: 24px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .iconLeft{
                                        width: 16px;
                                        height: 16px;
                                    }
                                    .textMiddle{
                                        color:rgba(203,201,161,1);
                                        line-height:24px;
                                        text-shadow:0px 2px 4px rgba(0,0,0,0.47); 
                                    }
                                    .iconRight{
                                        width: 16px;
                                        height: 16px;
                                    }
                                }
                                .text2{
                                    width: 100%;
                                    height: 28px;
                                    margin-top: 14px;
                                    color:rgba(254,255,188,1);
                                    display: flex;
                                    justify-content: center;
                                    align-items: baseline;
                                }
                                .text3{
                                    width: 100%;
                                    height: 20px;
                                    line-height: 20px;
                                    display: flex;
                                    justify-content: center;
                                    margin-top: 29px;
                                    color:rgba(255,252,218,1);
                                }
                                .text4{
                                    width: 100%;
                                    height: 20px;
                                    line-height: 20px;
                                    display: flex;
                                    justify-content: center;
                                    margin-top: 5px;
                                    color:rgba(255,252,218,1);
                                }
                                .text5{
                                    width: 100%;
                                    height: 20px;
                                    line-height: 20px;
                                    display: flex;
                                    justify-content: center;
                                    margin-top: 5px;
                                    color:rgba(255,252,218,1);
                                }
                            }
                        }
                        // 选中态
                        .memberTypeItems.memberTypeItemsActive{
                            width: 187px;
                            box-shadow:0px 4px 20px 0px rgba(0,0,0,0.5);
                            border-radius:3px;
                            border:2px solid rgba(137,136,102,1);
                            box-sizing: border-box;
                            position: relative;
                        }
                        // 推荐
                        .recommend{position: relative;}
                        .recommend::before{
                            content: '推荐';
                            width:48px;
                            height:22px;
                            background:rgba(15,25,32,1);
                            border-radius:0px 0px 0px 14px;
                            font-size:14px;
                            color:rgba(218,216,195,1);
                            text-align: center;
                            line-height: 22px;
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                    }
                    
                    // 会有送的游戏展示
                    .memberFooter{
                        width: 100%;
                        height: 168px;
                        padding-top: 1px;
                        box-sizing: border-box;
                        margin-top: 17px;
                        //底部
                        .footerTitle{
                            width: 100%;
                            height: 30px;
                            margin-top: 30px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .leftText{
                                margin-left: 20px;
                                color:rgba(190,183,151,1);
                                line-height:30px;
                            }
                            .rightPrice{
                                width:107px;
                                height:30px;
                                text-align: center;
                                line-height: 30px;
                                 margin-right: 20px;
                                color:rgba(190,183,151,1);
                                border:1px solid rgba(254,255,188,0.41);
                            }
                        }
                        .gameImg{
                            width: 100%;
                            height: 39px;
                            margin-top: 13px;
                            padding-left: 20px;
                            box-sizing: border-box;
                            display: flex;
                            justify-content: start;
                            align-content: center;
                            .gameImgItems{
                                width: 84px;
                                height: 79px;
                                margin-right: 14px;
                                .imgBox{
                                    width: 84px;
                                    height: 39px;
                                    img{
                                        width: 100%;
                                        height: 100%;
                                        display: block;
                                    }
                                }
                                .imgName{
                                    width: 100%;
                                    height: 35px;
                                    padding-top: 5px;
                                }
                                
                            }
                        }
                    }
                }
                //右边付款码
                .rightMemberPayment{
                    width: 301px;
                    height: 100%;
                    padding: 16px;
                    box-sizing: border-box;
                    background:linear-gradient(180deg,rgba(32,41,57,1) 0%,rgba(3,11,19,1) 100%);
                    box-shadow:0px 4px 20px 0px rgba(0,0,0,0.5);
                    border-radius:5px;
                    // 支付方式
                    .titlePayment{
                        width: 100%;
                        height: 40px;
                        display: flex;
                        justify-content: space-between;
                        .leftWx{
                            width: 128px;
                            height: 40px;
                            cursor: pointer;
                        }
                        .rightZfb{
                            width: 128px;
                            height: 40px;
                            cursor: pointer;
                        }
                    }
                    //付款码
                    .qrCode{
                        width: 160px;
                        height: 160px;
                        margin: 61px auto 0;
                        .imgQrCode{
                            width: 100%;
                            height: 100%;
                            img{width: 100%;height: 100%;display: block}
                        }
                        .loadings{
                            width: 100%;
                            height: 100%;
                            position: relative;
                        }
                    }
                    // 应付金额
                    .amountDue{
                        width: 100%;
                        height: 32px;
                        text-align: center;
                        margin: 37px auto 0;
                        color:rgba(167,162,128,1);
                        line-height:32px;
                    }
                    // 协议
                    .agreement{
                        width: 100%;
                        height: 16px;
                        margin-top: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .memberAgreement{
                            color:rgba(167,162,128,1);
                            line-height:16px;
                            cursor: pointer;
                        }
                        .shareAgreement{
                            color:rgba(167,162,128,1);
                            line-height:16px;
                            cursor: pointer;
                        }
                    }
                }
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
import openMember from '@/components/alertMember/openMember'
export default {
  name: "alertModelPayment",
  components: { JumpTo, loading ,store,openMember},
  props: [],
  inject:['reload'],
  data() {
    return {
        // 卖点
        sellingPoint:[
            {
                'icon':'bookmark',
                'text':'畅爽试玩 全场游戏随心玩'
            },
            {
                'icon':'fairyBall',
                'text':'超值折上折 两个游戏就回本'
            },
            {
                'icon':'diamonds',
                'text':'尊贵会员 VIP图标彰显身份'
            }
        ],
        // 会员类型选择
        memberTypeItems:[],  //当前选中的会员类型数据
        memberTypeItemsActive: 1,
        //会员等级 数据
        memberLevelData:{},
        displayOpenMember:false,//支付成功是否显示
        //会员订单支付数据
        memberOrderData:{
            levelId:'',
            payType:2,
            channelId:this.$store.getters.getChannelIdFun,
        },
        memberOrderBackData:{},  //会员订单返回数据
        memberOrderTimer:null, //定时器查询订单状态

        reductionOrder:false,//本单立减 是否详情页面打开
    };
  },
  
  created() {
    // this.memberClearInterval()
  },
  destroyed() {
    this.memberClearInterval()
  },
  mounted() {
    this.init()
    if(this.$route.path == '/gameDetails'){
        this.reductionOrder = true
    }else{
        this.reductionOrder = false
    }
  },
  watch:{
    // reductionOrder
    
  },
  computed:{
   
  },
  methods: {
    //初始化 
    init(){
        this.memberLevel()
    },
    // 取消关闭按钮
    cancel() {
        this.memberClearInterval()
        this.$store.commit('setDisplayOpenMember',false)
    },
    // 切换会员购买类型
    memberTypeChange(index){
        this.memberTypeItemsActive = index
        this.memberTypeItems = this.memberLevelData[index] //当前选中的数据
        this.memberOrderData.levelId = this.memberTypeItems.levelId//默认的等级id
        this.getQrCode()
    },
    //会员等级展示接口
    memberLevel(){
        this.$fetch('/member/level')
            .then((response) => {
                this.memberLevelData = response.data   //设置数据
                //设置默认选中
                response.data.forEach((v,n) => {
                    if(v.recommend == 1){
                        this.memberTypeItemsActive = n
                    }
                });
                this.memberTypeItems = response.data[this.memberTypeItemsActive]  //当前选中的数据
                this.memberOrderData.levelId = this.memberTypeItems.levelId  //默认的等级id
            })
            .then( ()=>{
                this.getQrCode()  //获取订单二维码
            })
            // console.log(this.memberLevelData)             
    },
    // 微信点击
    wxActiveFun(){
        if(this.memberOrderData.payType != 2){
            this.memberOrderData.payType = 2
            this.getQrCode() 
        }
        
    },
    // 支付宝点击
    zfbActiveFun(){
        if(this.memberOrderData.payType != 3){
            this.memberOrderData.payType = 3
            this.getQrCode() 
        }
        
    },
    //获取订单二维码
    getQrCode(){
        this.memberClearInterval() //清楚定时器
        this.memberOrderBackData.qrcode = ''  //二维码设置为空的
        this.$fetch('/member/order/create',this.memberOrderData)
            .then((response) => {
                this.memberOrderBackData = response.data
                this.setIntervalFun() //订单获取成功后开始查询订单状态
            })
    },
    // 查询订单状态
    queryMemberOrderState(){
        var _this = this;
        _this.$fetch('/member/order/query',{'orderId': _this.memberOrderBackData.orderId})
            .then((response) => {
                if(response.flag){
                    this.displayOpenMember = true
                    this.memberClearInterval()
                    // 完成订单在查询一次会员
                    this.$fetch('/member/join')
                        .then((response) => {
                            // setTimeout(()=>{response.flag=true},3000)
                            this.$store.commit('setIsMember', response)
                        })
                }
            })
    },
    // 定时器函数
    setIntervalFun(){
        var _this = this;
        _this.memberClearInterval()
        _this.memberOrderTimer = setInterval(function() {
            console.log('定时器函数 我一直都在')
            _this.queryMemberOrderState();
        }, 1000);
    },
    // 清楚定时器
    memberClearInterval(){
        if(this.memberOrderTimer != null){
            clearInterval(this.memberOrderTimer)
            this.memberOrderTimer = null
        }
    },
    // 支付成功弹框
    displayOpenMemberFun(data,n){
        this.memberClearInterval()
        if(n == 'openSuccess'){
            // this.reload()  //购买会员成功刷新页面
            this.$store.commit('setDisplayOpenMember',false)
        }else{
            this.displayOpenMember = data
        }
    },
    openAgreement(){
      var urls = window.location.protocol + '//' + window.location.host + "/userAgreement.html";
      window.sendCef("open_url", urls);
    }
  }
  
};
</script>
