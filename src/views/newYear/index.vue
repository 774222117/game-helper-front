<template>
    <div class="newYearBox">
        <!-- 定位盒子 -->
        <div class="backPic">
            <!-- 背景图 -->
           <div class="background background_bg">
               <div class="mymoneyBox">
                    <!-- 我的金币 -->
                    <div class="mymoney rechargePic_bg">
                        <div class="moneyText ft16 color_white_1 simkai">
                            我的金币: {{balanceCard.balance}}
                        </div>
                        <!-- 充值 -->
                        <div class="recharge recharge_bg" @click="recharge"></div>
                    </div>
                    <!-- 我的福袋 -->
                    <div class="stock blessingbag_bg" @click="myLuckyBag">
                        <!-- 游戏数量 -->
                        <div class="gameNum gameNum_bg ft14">{{balanceCard.card}}</div>
                    </div>
               </div>
               

               <!-- 顶部抽奖轮播图 -->
               <div class="swiper-container">
                   <bannerSwiper></bannerSwiper>

               </div>

               <!-- 单抽，十连抽 -->
               <div class="luckdraw">
                   <!-- 单抽 -->
                   <div class="once oncetake_bg" @click="luckDrawNum('getGameOnceTake')"></div>
                   <!-- 十连抽 -->
                   <div class="ten tentake_bg" @click="luckDrawNum('getGameTenTake')"></div>
                   <!-- 五连抽 -->
                   <div class="five fivetake_bg" @click="luckDrawNum('getGameFiveTake')"></div>
               </div>

               <!-- 合成大赏 -->
               <div class="compose syntheticreward2_bg"></div>

               <!-- 合成banner -->
               <template v-for="(item,index) in synthesisCompose">
                   <div class="composeBox" v-if="index>0">
                        <synthesisView :synthesisLevel="item" @change="synthesisBtn"/>
                    </div>
               </template>
               
               <!-- 新年福袋回馈 -->
               <div class="newYearBagTitle newYearhk_bg"></div>

               <!-- 抽奖次数赠送金币 -->
               <div class="exchange">
                    <luckyDrawFeedback @change="showBulletFrameSmallFun"/>
               </div>


           </div>
           <!-- 中间背景层 -->
           <div class="centerBox">
               <!-- 规则 -->
               <div class="rule ruleknow_bg"></div>
               <!-- 规则介绍 -->
               <div class="ruletext ruleBox_bg">
                   <div class="textBox">
                       <div class="text1"  v-for="(data,index) in ruleInfo" :class="index == 3 ? 'addmargin' : ''">
                           <div class="num1" :class="`text${index + 1}_bg`"></div>
                           <div class="introduce1 ft14 simkai font_weight">{{data}}<span v-if="index == 1" class="luckdraw ft16" @click="showProbability">福袋抽奖概率查看</span></div>
                       </div>
                   </div>
                  
               </div>

               <!-- 大赏一览 -->
               <div class="prizeinstr prizelinebox_bg"></div>

               <!-- SSS赏 -->
               <div class="sssBox" v-for="(item,index) in synthesisComposed">
                   <!-- SSS线 -->
                   <div class="sssLine" :class="`${lineInfo[index]}_bg`"></div>
                   <!-- 横排游戏盒子 -->
                   <div class="itemPic">
                       <synthesisItemBox :synthesisLevel="item">
                           <!-- <div class="itemPicBox" v-for="data in prizeNum[index]">
                               <prizeinstrItem/>
                           </div> -->
                       </synthesisItemBox>
                   </div>
               </div>
            
                <!-- 顶部背景图盒子 -->
                <div class="bottomBox">
                    <!-- 活动页底部图 -->
                    <div class="bottomPic buttomPic_bg"></div>
                </div>
           </div>
        </div>
        <bulletFrameSmall v-if="showBulletFrameSmall" @change="showBulletFrameSmallFun">
            <freeGoldCoins slot="contents" v-if="changeSolt == 'freeGoldCoins'" @change="showBulletFrameSmallFun"/>  <!-- 免费领取金币 -->
            <insufficientTokens slot="contents" v-if="changeSolt == 'insufficientTokens'" :balanceCard="balanceCard" @change="showBulletFrameSmallFun" @changeFunc='showBulletFrameBigFun'/>  <!-- 代币不足 -->
            <getMyGame slot="contents" v-if="changeSolt == 'getMyGame'" @change="showBulletFrameSmallFun"/> <!-- 领取我的游戏 -->
            <getGameOnceTake slot="contents" v-if="changeSolt == 'getGameOnceTake'" @change="showBulletFrameSmallFun"/> <!-- 单抽 -->
            <getGameTenTake slot="contents" v-if="changeSolt == 'getGameTenTake'" @change="showBulletFrameSmallFun"/> <!-- 十连抽 -->
            <getGameFiveTake slot="contents" v-if="changeSolt == 'getGameFiveTake'" @change="showBulletFrameSmallFun"/> <!-- 五连抽 -->
            <syntheticGame slot="contents" v-if="changeSolt == 'syntheticGame'" @change="showBulletFrameSmallFun" :syntheticGameData="syntheticGameData" :syntheticLevel="syntheticLevel"/> <!-- 合成游戏 -->
            <probabilityRelease slot="contents" v-if="changeSolt == 'probabilityRelease'" @change="showBulletFrameSmallFun"/>  <!-- 概率公布 -->
            <myLuckyBag slot="contents" v-if="changeSolt == 'myLuckyBag'" @change="showBulletFrameSmallFun"/>  <!-- 我的福袋 -->
            <syntheticSSR slot="contents" v-if="changeSolt == 'syntheticSSR'" @change="showBulletFrameSmallFun" :syntheticGameData="syntheticGameData" :syntheticLevel="syntheticLevel"/> <!-- 合成SSR -->
            <choosePrize slot="contents" v-if="changeSolt == 'choosePrize'" @change="showBulletFrameSmallFun"/> <!-- 选择奖品 -->
            <synthesisItemGame slot="contents" v-if="changeSolt == 'synthesisItemGame'" @change="showBulletFrameSmallFun" :synthesisItemGameData="synthesisItemGameData" /> <!-- 合成单个的SSR -->
            <confirmToReceiveLuckyDrawFeedback slot="contents" v-if="changeSolt == 'confirmToReceiveLuckyDrawFeedback'" @change="showBulletFrameSmallFun" /> <!-- 新年福袋回馈 40次 -->
        </bulletFrameSmall>
        <bulletFrameBig v-if="showBulletFrameBig" @change="showBulletFrameBigFun">
            <voucherCenter slot="contents" v-if="changeFun == 'voucherCenter'" @change="showBulletFrameBigFun"/>
            <voucherSuccess slot="contents" v-if="changeFun == 'voucherSuccess'" @change="showBulletFrameBigFun"/>
        </bulletFrameBig>
        <newYearAlertAnime v-if="newYearTransitionAnimation" @change="showNewYearAlertAnimeFun" :newYearAlertAnimeQuery="newYearAlertAnimeQuery" />
    </div>
</template>

<script>
import synthesisView from '@/components/newYear/synthesisView/synthesisView';
import bannerSwiper from '@/components/newYear/swiper/bannerSwiper'; //轮播图片
import luckyDrawFeedback from '@/components/newYear/luckyDrawFeedback/luckyDrawFeedback' //抽奖回馈
import swiperItem from '@/components/newYear/swiper/swiperItem'; //单个轮播图片
import bulletFrameSmall from '@/components/newYear/bulletFrame/bulletFrameSmall';
import bulletFrameBig from '@/components/newYear/bulletFrame/bulletFrameBig'; 
import freeGoldCoins from '@/components/newYear/alertSlot/FreeGoldCoins'; //免费领取金币
import insufficientTokens from '@/components/newYear/alertSlot/InsufficientTokens'; //代币不足
import getMyGame from '@/components/newYear/alertSlot/getMyGame'; //领取我的游戏
import getGameOnceTake from '@/components/newYear/alertSlot/getGameOnceTake'; //单抽
import getGameTenTake from '@/components/newYear/alertSlot/getGameTenTake'; //十连抽
import getGameFiveTake from '@/components/newYear/alertSlot/getGameFiveTake'; //五连抽
import syntheticGame from '@/components/newYear/alertSlot/syntheticGame'; //合成游戏
import probabilityRelease from '@/components/newYear/alertSlot/ProbabilityRelease'; //概率公布
import myLuckyBag from '@/components/newYear/alertSlot/MyLuckyBag'; //我的福袋
import syntheticSSR from '@/components/newYear/alertSlot/syntheticSSR'; //合成SSR赏
import choosePrize from '@/components/newYear/alertSlot/choosePrize'; //选择奖品
import synthesisItemGame from '@/components/newYear/alertSlot/synthesisItemGame'; //合成游戏 合成成功 非SSR
import voucherCenter from '@/components/newYear/alertSlot/voucherCenter'; //选择奖品
import voucherSuccess from '@/components/newYear/alertSlot/voucherSuccess'; //充值成功
import synthesisItemBox from '@/components/newYear/synthesisView/synthesisItemBox'; //大赏一览大盒子
import newYearAlertAnime from '@/components/newYear/newYearAlertAnime';//打开福袋领取游戏的动画过渡弹框
import confirmToReceiveLuckyDrawFeedback from '@/components/newYear/alertSlot/confirmToReceiveLuckyDrawFeedback';// 新年福袋回馈 40次

export default {
    name:'newYear',
    components:{
        newYearAlertAnime,
        synthesisView,
        luckyDrawFeedback,
        bannerSwiper,
        swiperItem,
        bulletFrameSmall,
        freeGoldCoins,
        insufficientTokens,
        getMyGame,
        getGameOnceTake,
        getGameTenTake,
        getGameFiveTake,
        syntheticGame,
        probabilityRelease,
        myLuckyBag,
        syntheticSSR,
        choosePrize,
        synthesisItemGame,
        bulletFrameBig,
        voucherCenter,
        voucherSuccess,
        synthesisItemBox,
        confirmToReceiveLuckyDrawFeedback
    },
    data(){
        return {
            newYearTransitionAnimation:false,//打开福袋领取游戏的动画过渡弹框
            ruleInfo:['本活动需要使用扭蛋币开启，扭蛋币为特殊电子商品，售出后不可退换，敬请谅解。',
            '福袋开启的游戏，请在“我的礼盒”中查看。',
            '福袋赠送的道具种类包含：畅享游戏、畅享游戏包。其中畅享游戏为游戏的永久使用权， 在W4PLAY中可以一键启动游玩游戏，不是游戏账号、代充服务或游戏CDKEY。',
            '活动期间获得的代币在活动结束后会保留，不可退还，可以参加下一次活动。'],
            lineInfo:['sssline','ssline','sline','aline','bline'],//奖品池顶部图片
            synthesisCompose:['B','A','S','SS','SSR'],//合成大赏数组
            synthesisComposed:['SSR','SS','S','A','B'],//大赏一览数组
            prizeNum:[3,12,18,6,6],//奖品池奖品数量
            showBulletFrameSmall:false,//小 组件弹框
            changeSolt:'insufficientTokens', //切换插槽内容
            changeFun:'voucherCenter',
            showBulletFrameBig:false,//充值弹窗
            balanceCard:{'balance':0,'card':0},
            newYearAlertAnimeQuery:{},//传递给过渡动画的数据
            getMyGameData:'',//领取我的福袋数据
            syntheticGameData:'',//用于合成大赏 合成使用
            syntheticLevel:'',//用于合成大赏 合成等级
            synthesisItemGameData:'',//合成成功后返回的数据
            ssrQueryData:'',//用于保存ssr合成数据
            newReceivedGold:false,// 是否领取过活动金币 10个的
            animation:0,//如果点击点抽，五连抽，十连抽，则改变状态为1，然后if语句添加动画样式给抽奖框进行动画,如果点击合成框则没有动画
            freeGoldPic:0,//免费领取金币图片
            freeGoldClose:0,//弹出免费领取金币框时，设置为1，关闭掉弹框关闭按钮样式
        }
    },
    //让后代组件直接调用祖宗组件的方法 与 变量 后代组件需要使用 inject :['ancestors'] 接收 
    provide(){
        return {
            ancestors:this
        }
    },
    inject:['openRegister'],
    mounted(){
        //登录后初始化
        if(!!this.$store.getters.getStorage){
            this.init()
        }else{
            this.openRegister(true)
        }
    },
    methods:{
        //初始化
        init(){
            let _this = this;
            // 是否参与过活动 未参加过出现免费领取金币弹框
            if(!!_this.$store.getters.getStorage){
                _this.$fetch("/lucky/bag/join").then(response => {
                    //flag true 已经领取
                    if(response.flag){
                        console.log('已经领取过活动金币')
                        _this.newReceivedGold = response.flag
                    }else{//未领取
                        // this.showBulletFrameSmallFun(true,{ 'changeSolt':'freeGoldCoins'})
                    }
                })
                //查询一次我的金币 与我的福袋
                _this.myGoldLucky()
            }
        },
        //我的金币 与福袋
        myGoldLucky(){
            let _this = this;
            _this.$fetch("/lucky/bag/my").then(response => {
                console.log(response)
                if(response.flag){
                    _this.balanceCard = response.data 
                }else{
                    console.log('没有金币 与游戏')
                }
            })
        },
        //显示隐藏小组件弹框 data: booler值 表示显示隐藏弹框 query 表示参数值对象
        //true, {'changeSolt':'syntheticSSR'}
        showBulletFrameSmallFun(data,query){
            if(!!query){
                this.changeSolt = query.changeSolt
            }
            this.showBulletFrameSmall=data
        },
        // 显示隐藏充值弹窗 data:boolean值 query 参数
        showBulletFrameBigFun(data,query){
            if(!!query){
                this.changeFun = query.changeFun
            }
            this.showBulletFrameBig = data
        },
        //单抽 五连抽 十连抽
        luckDrawNum(luckDrawNumModel){
            let _this = this;
            if(!!_this.$store.getters.getStorage){
                switch (luckDrawNumModel) {
                    case 'getGameOnceTake':
                        if(_this.balanceCard.balance < 10) 
                        return _this.showBulletFrameSmallFun(true,{ 'changeSolt':'insufficientTokens'})
                        break;
                    case 'getGameFiveTake':
                        if(_this.balanceCard.balance < 50) 
                        return _this.showBulletFrameSmallFun(true,{ 'changeSolt':'insufficientTokens'})
                        break;
                    case 'getGameTenTake':
                        if(_this.balanceCard.balance < 100)
                        return _this.showBulletFrameSmallFun(true,{ 'changeSolt':'insufficientTokens'})
                        break;
                    default:
                        break;
                }
                
                _this.newYearAlertAnimeQuery = {'whoCallback':luckDrawNumModel}
                _this.showNewYearAlertAnimeFun(true)
                
            }else{
                if(!!this.openRegister){
					this.openRegister(true)
				}else{
					console.log('没得openRegister方法')
				}
            }
        },
        //我的福袋
        myLuckyBag(){
            if(!!this.$store.getters.getStorage){
                this.showBulletFrameSmallFun(true,{ 'changeSolt':'myLuckyBag'})
            }else{
                this.openRegister(true)
            }
        },
        // 点击充值
        recharge(){
            if(!!this.$store.getters.getStorage){
                this.showBulletFrameBigFun(true,{'changeFun':'voucherCenter'})
            }else{
                this.openRegister(true)
            }
        },
        // 充值成功
        voucherSuccess(){
            this.showBulletFrameBigFun(true,{'changeFun':'voucherSuccess'})
        },
        // 点击打开概率公布
        showProbability(){
            this.showBulletFrameSmallFun(true,{'changeSolt':'probabilityRelease'})
        },
        //立即合成
        synthesisBtn(data,query){
            if(query.syntheticLevel != 'SSR'){
                this.syntheticGameData = query.syntheticGameData
                this.syntheticLevel = query.syntheticLevel
                this.showBulletFrameSmallFun(true,{'changeSolt':'syntheticGame'})
            }else{
                this.syntheticGameData = query.syntheticGameData
                this.syntheticLevel = query.syntheticLevel
                this.showBulletFrameSmallFun(true,{'changeSolt':'syntheticSSR'})
            }
            
        },
        //新春活动弹框的动画过渡type 显示隐藏quer参数
        showNewYearAlertAnimeFun(type,newYearAlertAnimeQuery){
            let _this = this;
            _this.newYearTransitionAnimation = type
            if(!!newYearAlertAnimeQuery){
                _this.showBulletFrameSmallFun(true,{'changeSolt':newYearAlertAnimeQuery.whoCallback})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/newYear/css/newYear.css";

    .newYearBox {
        width: 100%;
        // 相对层
        .backPic {
            width: 1280px;
            background-color: rgba(215,99,64,1);
            margin: 0 auto;
            // top: -60px;
            position: relative;
            // 第一个盒子
            .background {
                width: 100%;
                min-height: 2225px;
                overflow: hidden;
                // 我的金币盒子
                .mymoneyBox {
                    width: 251px;
                    height: 57px;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 54px;
                    margin-left: 990px;
                    // 我的金币
                    .mymoney {
                        width: 180px;
                        height: 38px;
                        margin: auto 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        letter-spacing:2px;
                        .moneyText {
                            min-width: 100px;
                            height: 26px;
                            font-weight: 900;
                        }
                        .recharge {
                            width: 30px;
                            height: 26px;
                            margin: -5px 0 0 5px;
                            cursor: pointer;
                        }
                    }
                    // 我的福袋
                    .stock {
                        width: 55px;
                        height: 57px;
                        cursor: pointer;
                        .gameNum {
                            margin-left: 38px;
                            width: 30px;
                            height: 26px;
                            text-align: center;
                            line-height: 28px;
                            font-weight: 700;
                        }
                    }
                }
                
                // 轮播图
                .swiper-container {
                    width: 935px;
                    height: 235px;
                    margin: 40px 0 0 368px;
                }
                // 单抽，十连抽
                .luckdraw {
                    width: 746px;
                    height: 116px;
                    margin: 56px 0 0 448px;
                    display: flex;
                    justify-content: space-between;
                    // 单抽
                    .once {
                        width: 189px;
                        height: 59px;
                        margin-top: 56px;
                        cursor: pointer;
                    }
                    // 十连抽
                    .ten {
                        width: 251px;
                        height: 89px;
                        cursor: pointer;
                    }
                    // 五连抽
                    .five {
                        width: 219px;
                        height: 84px;
                        margin-top: 32px;
                        cursor: pointer;
                    }
                }
                // 合成大赏
                .compose {
                    width: 487px;
                    height: 34px;
                    margin: 64px 0 0 150px;
                }
                // 合成框
                .composeBox {
                    width: 977px;
                    height: 191px;
                    margin: 19px 0 0 152px;
                }

                // 新年福袋回馈
                .newYearBagTitle {
                    width: 446px;
                    height: 122px;
                    margin: 206px 0 0 451px;
                }
                // 抽奖次数赠送金币
                .exchange {
                    width: 1048px;
                    height: 248px;
                    margin: 22px 0 0 150px;
                }

            }
            // 第二个盒子
            .centerBox {
                width: 1280px;
                min-height: 3079px;
                background-color: rgba(215,99,64,1);
                margin: 0 auto;
                position: relative;
                // 规则
                .rule {
                    width: 446px;
                    height: 122px;
                    margin-left: 451px;
                }
                // 规则介绍
                .ruletext {
                    width: 771px;
                    height: 243px;
                    margin: 35px 0 0 257px;
                    position: relative;
                    .textBox {
                        width: 641px;
                        height: 155px;
                        position: absolute;
                        margin: 40px 0 0 52px;
                        .text1 {
                        width: 641px;
                        height: 22px;
                        margin: 0 auto;
                        margin-bottom: 14px;
                        display: flex;
                        .num1 {
                            width: 17px;
                            height: 17px;
                            margin-top:2px;
                        }
                        .introduce1 {
                            width: 624px;
                            height: 44px;
                            color: rgba(152,74,49,1);
                            margin-left: 4px;
                            .luckdraw {
                                color: #BB0C0C;
                                text-decoration-line: underline;
                                line-height: 22px;
                                cursor: pointer;
                            }
                        }
                    }
                    }
                }
                // 大赏一览
                .prizeinstr {
                    width: 446px;
                    height: 122px;
                    margin: 80px 0 0 451px;
                }
                // SSS赏
                .sssBox {
                    width: 1032px;
                    min-height: 382px;
                    margin: 60px 0 0 150px;
                    // sss线
                    .sssLine {
                        width: 980px;
                        height: 34px;
                        margin: 0 auto;
                    }
                    // 游戏大盒子
                    .itemPic {
                        width: 1030px;
                        min-height: 288px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: center;
                        .itemPicBox {
                            width: 157px;
                            height: 235px;
                        }
                    }
                }
                .bottomPic {
                width: 1280px;
                height: 317px;
                margin-top: 300px;
                } 
            }
        }
    }

    .addmargin {
        padding-top: 17px;
    }
</style>