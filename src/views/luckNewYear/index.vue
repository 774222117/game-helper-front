<template>
    <!-- 新年幸运抽奖活动 -->
    <div class="luckNewYear">
        <!-- 背景图层 -->
        <div class="NewYearBox newYearBack_bg">
            <!-- 内容层 -->
            <div class="NewYearContent">
                <!-- 滚动信息 -->
                <div class="scrollInfo">
                    <scrollInfo></scrollInfo>
                </div>
                <!-- 抽奖中心 -->
                <div class="luckDraw">
                    <div class="rightImgs positionImgsSty rightImgs_bg"></div>
                    <div class="btmImgs positionImgsSty btmImgs_bg"></div>
                    <lotteryCenter @change="showBulletFrameBigFun" @changes="showBulletFrameSmallFun" @changex='showNewYearAlertAnimeFun'></lotteryCenter>
                </div> 
                <!-- 福袋规则logo -->
                <!-- <div class="blessingLogo blessingRule_bg"></div> -->
                <!-- 福袋规则Info -->
                <div class="blessingInfo ruleBack_bg">
                    <!-- 规则盒子 -->
                    <div class="ruleBox">
                        <div class="ruleText ft18" v-for="(item,index) in ruleInfo">{{item}}
                            <span class="watchDevice ft18" v-if="index == 2" @click="watchDevice">查看抽取概率</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 小弹窗 -->
        <popUpSmall v-if="showBulletFrameSmall" @change="showBulletFrameSmallFun">
            <includeContent slot="contents" v-if="changeSolt == 'includeContent'" @change="showBulletFrameSmallFun" />
            <randomDrawGame slot="contents" v-if="changeSolt == 'randomDrawGame'" @change="showBulletFrameSmallFun" :steryGame='mysteryGame' />
            <congratulationsGame slot="contents" v-if="changeSolt == 'congratulationsGame'" @change="showBulletFrameSmallFun" />
            <insufficientGoldCoins slot="contents" v-if="changeSolt == 'insufficientGoldCoins'" @change="showBulletFrameSmallFun" @changes="showBulletFrameBigFun"/>
            <unableToExtract slot="contents" v-if="changeSolt == 'unableToExtract'" @change="showBulletFrameSmallFun" />
            <getFreeGold slot="contents" v-if="changeSolt == 'getFreeGold'" @change="showBulletFrameSmallFun" />
            <myLucklyBag slot="contents" v-if="changeSolt == 'myLucklyBag'" @change="showBulletFrameSmallFun" />
            <redBagProbability slot="contents" v-if="changeSolt == 'redBagProbability'" @change="showBulletFrameSmallFun" />
        </popUpSmall>
        <!-- 大弹窗 -->
        <popUpBig v-if="showBulletFrameBig" @change="showBulletFrameBigFun">
            <voucherSuccess slot="contents" v-if="changeFun == 'voucherSuccess'" @change="showBulletFrameBigFun" />
            <voucherCenter slot="contents" v-if="changeFun == 'voucherCenter'" @change="showBulletFrameBigFun" />
        </popUpBig>
        <!-- 红包动画 -->
        <newYearAlertAnime v-if="newYearTransitionAnimation" @change="showNewYearAlertAnimeFun" :newYearAlertAnimeQuery="newYearAlertAnimeQuery" />
    </div>
</template>



<script>
import scrollInfo from '@/components/luckNewYear/scrollInfo/scrollInfo';//首页滚动抽奖信息
import lotteryCenter from '@/components/luckNewYear/lotteryCenter/lotteryCenter';//首页抽奖中心
import popUpSmall from '@/components/luckNewYear/popUp/popUpSmall';//首页小弹窗
import popUpBig from '@/components/luckNewYear/popUp/popUpBig';//首页大弹窗
import includeContent from '@/components/luckNewYear/alertSlot/includeContent';//查看福袋礼包内容
import randomDrawGame from '@/components/luckNewYear/alertSlot/randomDrawGame';//随机抽游戏
import congratulationsGame from '@/components/luckNewYear/alertSlot/congratulationsGame';//恭喜抽中以下游戏
import insufficientGoldCoins from '@/components/luckNewYear/alertSlot/insufficientGoldCoins';//金币不足，请充值
import unableToExtract from '@/components/luckNewYear/alertSlot/unableToExtract';//已抽完，无法继续抽取
import getFreeGold from '@/components/luckNewYear/alertSlot/getFreeGold';//恭喜获得新春好礼
import voucherSuccess from '@/components/luckNewYear/alertSlot/voucherSuccess';//充值成功
import voucherCenter from '@/components/luckNewYear/alertSlot/voucherCenter';//充值中心
import myLucklyBag from '@/components/luckNewYear/alertSlot/myLucklyBag';//福袋记录
import redBagProbability from '@/components/luckNewYear/alertSlot/redBagProbability';//拆福袋概率
import newYearAlertAnime from '@/components/luckNewYear/newYearAlertAnime';//打开福袋领取游戏的动画过渡弹框


export default {
    name:'luckNewYear',
    components:{
        scrollInfo,
        lotteryCenter,
        popUpSmall,
        popUpBig,
        includeContent,
        randomDrawGame,
        congratulationsGame,
        insufficientGoldCoins,
        unableToExtract,
        getFreeGold,
        voucherSuccess,
        voucherCenter,
        myLucklyBag,
        redBagProbability,
        newYearAlertAnime
        },
    data(){
        return {
            ruleInfo:['1.本活动需要使用金币开启，金币特殊电子商品，售出后不可退换，敬请谅解',
                      '2.已抽中的奖励不会重复；抽奖最多可抽14次；福袋开启的游戏，请在“我的游戏”中查看。',
                      '3.福袋赠送的道具种类包含：畅享游戏、畅享游戏包。其中畅享游戏为游戏的永久使用权，在W4PLAY中可以一键启动游玩游戏，不是游戏账号、代充服务或游戏CDKEY。',
                      '4.活动期间赠送的福袋在活动结束后可保留至下一次活动，但请不要购买过多的福袋。'],
            showBulletFrameSmall:false,//小 组件弹框
            showBulletFrameBig:false,//大 组件弹框
            changeSolt:'getFreeGold', //切换小弹窗插槽内容
            changeFun:'voucherCenter',//切换大弹窗插槽内容
            mysteryGame:'',//保存神秘游戏数据
            newReceivedGold:false,// 是否领取过活动金币 10个的
            newYearTransitionAnimation:false,//打开福袋领取游戏的动画过渡弹框
            newYearAlertAnimeQuery:{},//传递给过渡动画的数据
            playBag:0,//合玩包ID
            blessingBag:'',//记录抽到的游戏
            myGoldDatas:'',//首页定义一个我的金币方便传参
            animation:0,//记录动画，0为动画未开始，1为开始执行
            freeGoldClose:0,//记录免费送金币关闭按钮
            
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
        this.getMysteryGift();
    },
    methods:{
        //新春活动弹框的动画过渡type 显示隐藏quer参数  animation接收需要保持的数据再传给动画组件
        showNewYearAlertAnimeFun(type,newYearAlertAnimeQuery,animation){
            let _this = this;
            _this.newYearTransitionAnimation = type
            _this.newYearAlertAnimeQuery = animation
            if(!!newYearAlertAnimeQuery){
                _this.showBulletFrameSmallFun(true,{'changeSolt':newYearAlertAnimeQuery.whoCallback})
            }
        },
        // 获取神秘游戏数据 /lucky/turntable/mystery
        getMysteryGift(){
            let _this = this;
            _this.$fetch('/lucky/turntable/mystery').then(response => {
                if(response.flag){
                    _this.mysteryGame = response.data
                    // console.log(_this.mysteryGame)
                }
            })
        },
        // 查看抽奖概率
        watchDevice(){
            this.showBulletFrameSmallFun(true,{'changeSolt':'redBagProbability'})
        },
        //显示隐藏小组件弹框 data: booler值 表示显示隐藏弹框 query 表示参数值对象
        showBulletFrameSmallFun(data,query,num){
            if(!!query){
                this.changeSolt = query.changeSolt
            }
            this.showBulletFrameSmall=data
            this.playBag = num
        },
        // 显示隐藏充值弹窗 data:boolean值 query 参数
        showBulletFrameBigFun(data,query){
            if(!!query){
                this.changeFun = query.changeFun
            }
            this.showBulletFrameBig = data
        },
    },
}
</script>


<style lang="scss" scoped>
@import "../../assets/luckNewYear/css/homepage.css";

    .luckNewYear {
        width: 100%;
        // 背景图层
        .NewYearBox {
            width: 1280px;
            margin: 0 auto;
            position: relative;
            // 内容层
            .NewYearContent {
                width: 100%;
                min-height: 1600px;
                overflow: hidden;
                // 滚动信息
                .scrollInfo {
                    width: 1042px;
                    height: 33px;
                    margin: 440px 0 0 122px;
                }
                // 抽奖中心
                .luckDraw {
                    width: 1038px;
                    height: 470px;
                    margin: 32px 0 0 122px;
                    position: relative;
                    .rightImgs{
                        top: 57px;
                        right: -70px;
                    }
                    .btmImgs{
                        left: -57px;
                        bottom: -30px;
                    }
                    .positionImgsSty{
                        width: 93px;
                        height: 91px;
                        position: absolute;
                        z-index: 9;
                    }
                }
                // 福袋logo
                .blessingLogo {
                    width: 688px;
                    height: 58px;
                    margin: 110px auto 0;
                }
                // 福袋规则
                .blessingInfo {
                    width: 1038px;
                    height: 415px;
                    margin: 32px 0 0 122px;
                    padding-top: 1px;
                    // position: relative;
                    // 规则盒子
                    .ruleBox {
                        width: 961px;
                        height: 217px;
                        // position: absolute;
                        // left: 34px;
                        // top: 45px;
                        margin-top: 150px;
                        margin-left: 64px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .ruleText {
                            width: 100%;
                            line-height: 26px;
                            color: #351D05;
                            position: relative;
                            .watchDevice {
                                color: #CF1C26;
                                cursor: pointer;
                            }
                        }
                        .ruleText::before{
                            content: '';
                            width: 16px;
                            height: 16px;
                            background: url('~@/assets/luckNewYear/images/listItem.png');
                            position: absolute;
                            left: -30px;
                            top: 4px;

                        }
                    }
                }
            }
        }
    }
</style>