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
                <!-- 滚动信息背景图 -->
                <div class="scroll_background scroll_background_bg"></div>
                <!-- 抽奖中心 -->
                <div class="luckDraw">
                    <div class="rightImgs positionImgsSty"></div>
                    <div class="btmImgs positionImgsSty"></div>
                    <lotteryCenter @change="showBulletFrameBigFun" @changes="showBulletFrameSmallFun" @changex='showNewYearAlertAnimeFun'></lotteryCenter>
                </div> 
                <!-- 福袋规则logo -->
                <div class="blessingLogo blessingLogo_bg"></div>
                <!-- 福袋规则Info -->
                <div class="blessingInfo blessingInfo_bg">
                    <!-- 规则盒子 -->
                    <div class="ruleBox">
                        <div class="ruleText ft16" v-for="(item,index) in ruleInfo">{{item}}
                            <span class="watchDevice ft16" v-if="index == 2" @click="watchDevice">查看抽取概率</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 小弹窗 -->
        <popUpSmall v-if="showBulletFrameSmall" @change="showBulletFrameSmallFun" :changeSolt='changeSolt'>
        <!-- <popUpSmall v-if="true" @change="showBulletFrameSmallFun" :changeSolt='changeSolt'> -->
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
        <!-- <popUpBig v-if="true" @change="showBulletFrameBigFun"> -->
            <voucherSuccess slot="contents" v-if="changeFun == 'voucherSuccess'" @change="showBulletFrameBigFun" />
            <voucherCenter slot="contents" v-if="changeFun == 'voucherCenter'" @change="showBulletFrameBigFun" />
        </popUpBig>
        <!-- 红包动画 -->
        <nationalDayAlertAnime v-if="newYearTransitionAnimation" @change="showNewYearAlertAnimeFun" :newYearAlertAnimeQuery="newYearAlertAnimeQuery" />
    </div>
</template>



<script>
import {setStore,getStore,removeStore}  from '@/utils/storage'
import scrollInfo from '@/components/NationalDay/scrollInfo/scrollInfo';//首页滚动抽奖信息
import lotteryCenter from '@/components/NationalDay/lotteryCenter/lotteryCenter';//首页抽奖中心
import popUpSmall from '@/components/NationalDay/popUp/popUpSmall';//首页小弹窗
import popUpBig from '@/components/NationalDay/popUp/popUpBig';//首页大弹窗
import includeContent from '@/components/NationalDay/alertSlot/includeContent';//查看福袋礼包内容
import randomDrawGame from '@/components/NationalDay/alertSlot/randomDrawGame';//随机抽游戏
import congratulationsGame from '@/components/NationalDay/alertSlot/congratulationsGame';//恭喜抽中以下游戏
import insufficientGoldCoins from '@/components/NationalDay/alertSlot/insufficientGoldCoins';//金币不足，请充值
import unableToExtract from '@/components/NationalDay/alertSlot/unableToExtract';//已抽完，无法继续抽取
import getFreeGold from '@/components/NationalDay/alertSlot/getFreeGold';//恭喜获得新春好礼
import voucherSuccess from '@/components/NationalDay/alertSlot/voucherSuccess';//充值成功
import voucherCenter from '@/components/NationalDay/alertSlot/voucherCenter';//充值中心
import myLucklyBag from '@/components/NationalDay/alertSlot/myLucklyBag';//福袋记录
import redBagProbability from '@/components/NationalDay/alertSlot/redBagProbability';//拆福袋概率
import nationalDayAlertAnime from '@/components/NationalDay/nationalDayAlertAnime';//打开福袋领取游戏的动画过渡弹框


export default {
    name:'NationalDay',
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
        nationalDayAlertAnime
        },
    data(){
        return {
            ruleInfo:['1.本活动需要使用金币开启，金币特殊电子商品，售出后不可退换，敬请谅解',
                      '2.已抽中的奖励不会重复；抽奖最多可抽14次；福袋开启的游戏，请在“我的游戏”中查看。',
                      '3.福袋赠送的道具种类包含：畅享游戏、畅享游戏包。其中畅享游戏为游戏的永久使用权，在W4PLAY中可以一键启动游玩游戏，不是游戏账号、代充服务或游戏CDKEY。',
                      '4.活动期间赠送的福袋在活动结束后可保留至下一次活动，但请不要购买过多的福袋。'],
            showBulletFrameSmall:false,//小 组件弹框
            showBulletFrameBig:false,//大 组件弹框
            changeSolt:'unableToExtract', //切换小弹窗插槽内容
            changeFun:'voucherSuccess',//切换大弹窗插槽内容
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
        this.goToNewYear();
        this.getMysteryGift();
    },
    methods:{
        // 点击活动保存用户信息
        goToNewYear(){
            var _this = this
            // 验证用户是否登陆
            if(!!_this.$store.getters.getStorage){
                // 登陆之后去查看storage
                if(!!getStore({name:'loginNewYear22',type:false})){
                    console.log('有缓存')
                    // 保存storage的值
                    var activeInfo = getStore({name:'loginNewYear22',type:false})
                }else{
                    console.log('没有缓存，建立缓存')
                    // 没有缓存则建立缓存并保存
                    var activeInfo = {
                        'value':'',//当前用户是否参加过活动
                    }
                }
                // 发送请求查询是否参加过活动
                 _this.$fetch('/lucky/turntable/join')//请求数据
                .then((response) => {
                    // 已领取
                    if(response.flag){
                        activeInfo.value = response.flag
                        setStore({name:'loginNewYear22',content:activeInfo,type:false})//创建用户信息
                    }else{
                        console.log('未领取')
                        // 也要保存用户信息
                        setStore({name:'loginNewYear22',content:activeInfo,type:false})//也创建用户信息
                        _this.showBulletFrameSmallFun(true,{'changeSolt':'getFreeGold'})
                    }
                })
            }else{
                // 没登陆调用登陆窗口
                _this.openRegister(true)
            }
        },
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
@import "../../assets/NationalDay/css/homepage.css";

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
                    position: absolute;
                    left: 122px;
                    top: 540px;
                    z-index: 2;
                }
                // 滚动信息背景图
                .scroll_background {
                    width: 1042px;
                    height: 33px;
                    position: absolute;
                    top: 546px;
                    left: 126px;
                }
                // 抽奖中心
                .luckDraw {
                    width: 1038px;
                    height: 470px;
                    margin: 72px 0 0 122px;
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
                    width: 698px;
                    height: 60px;
                    position: absolute;
                    bottom: 353px;
                    left: 289px;
                }
                // 福袋规则
                .blessingInfo {
                    width: 1038px;
                    height: 308px;
                    padding-top: 1px;
                    position: absolute;
                    bottom: 27px;
                    left: 118px;
                    // position: relative;
                    // 规则盒子
                    .ruleBox {
                        width: 1010px;
                        height: 202px;
                        // position: absolute;
                        // left: 34px;
                        // top: 45px;
                        margin-top: 20px;
                        margin-left: 38px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .ruleText {
                            width: 100%;
                            line-height: 26px;
                            position: relative;
                            font-family: Microsoft YaHei UI, Microsoft YaHei UI-Regular;
                            font-weight: 600;
                            text-align: LEFT;
                            color: #F1DCB1;
                            margin: 26px 0 0 -14px;
                            .watchDevice {
                                color: #CF1C26;
                                cursor: pointer;
                            }
                        }
                        // .ruleText::before{
                        //     content: '';
                        //     width: 16px;
                        //     height: 23px;
                        //     position: absolute;
                        //     left: -30px;
                        //     top: 1px;
                        // }
                        // .ruleText:nth-child(1)::before{
                        //     background: url('~@/assets/NationalDay/images/listItem1.png');
                        //     background-size: cover;
                        // }
                        // .ruleText:nth-child(2)::before{
                        //     background: url('~@/assets/NationalDay/images/listItem2.png');
                        //     background-size: cover;
                        // }
                        // .ruleText:nth-child(3)::before{
                        //     background: url('~@/assets/NationalDay/images/listItem3.png');
                        //     background-size: cover;
                        // }
                        // .ruleText:nth-child(4)::before{
                        //     background: url('~@/assets/NationalDay/images/listItem4.png');
                        //     background-size: cover;
                        // }
                    }
                }
            }
        }
    }
</style>