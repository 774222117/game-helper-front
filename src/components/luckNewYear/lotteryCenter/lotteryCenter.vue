<template>
    <!-- 抽奖中心 -->
    <div class="lotteryCenterBack lotteryCenterBack_bg">
        <!-- 奖品中心 -->
        <div class="prizeBox">
            <!-- 第一排奖品 -->
            <div class="firstPrize">
                <div class="prizeItem pos" v-for="(data,index) in topGame" @click="togetherPlay1(data)">
                    <div class="leftTopHot leftTopHot_bg" v-if="index == 0 || index == 4"></div>
                    <gameItemBig :item='data' />
                </div>
            </div>
            <!-- 第二排奖品 -->
            <div class="secondPrize">
                <!-- 左边 -->
                <div class="leftBox">
                    <div class="prizeItem1" v-for="data in leftGame" @click="togetherPlay1(data)">
                        <gameItemBig :item='data' />
                    </div>
                </div>
                <!-- 中间 -->
                <div class="centerBox">
                    <!-- 开福袋盒子 -->
                    <div class="openBagBox">
                        <!-- 背景光 -->
                        <div class="backLighting"></div>
                        <!-- 消耗金币 -->
                        <div class="payMoney ft18">
                            本轮需消耗:<span class="ft18 font_weight">{{payMoney}}金币</span>
                        </div>
                        <!-- 抽奖按钮 -->
                        <div class="openBag" @click="luckDrawNum('congratulationsGame')">
                            <div class="openBagBtn openDefault_bg"></div>
                        </div>
                        <!-- 我的金币，福袋记录 -->
                        <div class="goldBox">
                            <!-- 我的金币 -->
                            <div class="mygold">
                                <div class="gold ft14"><span class="befGold_bg befGold"></span> 我的金币:<span class="ft14 font_weight">{{balanceCard.balance}}</span></div>
                                <!-- 充值 -->
                                <div class="voucher Recharge_bg" @click="voucher"></div>
                            </div>
                            <!-- 福袋记录 -->
                            <div class="luckyRecord" @click="luckyRecord">
                                <div class="bag ft14">福袋记录</div>
                                <div class="arrow arrow_bg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右边 -->
                <div class="rightBox">
                    <div class="prizeItem">
                        <div class="prizeItem1" v-for="data in rightGame" @click="togetherPlay1(data)">
                            <gameItemBig :item='data' />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 第三排奖品 -->
            <div class="thirdPrize">
                <div class="prizeItem pos" v-for="(data,index) in bottomGame" @click="togetherPlay1(data)">
                    <div class="leftTopHot leftTopHot_bg" v-if="index == 0 || index == 4"></div>
                    <gameItemBig :item='data' />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gameItemBig from '@/components/luckNewYear/gameItem/gameItemBig';//游戏大图
import { EventBus } from "@/utils/eventBus.js";

export default {
    name:'lotteryCenter',
    components:{
        gameItemBig,
    },
    inject:['openRegister','ancestors'],
    data(){
        return {
            lighting:true,//按钮默认光
            turntableGame:'',//保存转盘游戏数据
            topGame:'',//保存顶部游戏数据
            leftGame:'',//保存左边游戏数据
            rightGame:'',//保存右边游戏数据
            bottomGame:'',//保存底部游戏数据
            balanceCard:{'balance':0,'card':0},
            newYearAlertAnimeQuery:{},//传递给过渡动画的数据
            payMoney:0,//本轮消耗的金币
        }
    },
    mounted(){
        //初始化
        this.init()

        EventBus.$on("changeMyGold", () => {
            this.$nextTick(()=>{
                this.myGoldLucky()
            })
        });
        EventBus.$on("changeMyGame", () => {
            this.$nextTick(()=>{
                this.getGame()
            })
        });
    },
    methods:{
        // 点击悠闲合玩包
        togetherPlay1(data){
            if(data.name == '神秘奖品' && data.worth == '???' && data.got == 0){
                this.$emit('changes',true,{'changeSolt':'randomDrawGame'})
            }else if(data.bag == 1 && data.key != undefined && data.got == 0){
                this.$emit('changes',true,{'changeSolt':'includeContent'},data.key)
            }
        },
        //抽奖
        luckDrawNum(luckDrawNumModel){
            let _this = this;
            if(!!_this.$store.getters.getStorage){
                switch (luckDrawNumModel) {
                    case 'congratulationsGame':
                        // console.log(_this.balanceCard.balance)
                        // console.log(_this.payMoney)
                        if(_this.balanceCard.balance*1 < _this.payMoney*1){
                            return _this.$emit('changes',true,{ 'changeSolt':'insufficientGoldCoins'})
                        }
                        break;
                    default:
                        break;
                }
                if(_this.balanceCard.balance*1 >= 999 && _this.payMoney == 999){
                    _this.$emit('changes',true,{'changeSolt':'unableToExtract'})
                }else{
                    _this.newYearAlertAnimeQuery = {'whoCallback':luckDrawNumModel}
                    // 先传一个空出去，避免重复打开抽奖弹窗，要传给动画的参数放最后
                    _this.$emit('changex',true,'',_this.newYearAlertAnimeQuery)
                }
                
            }else{
                if(!!this.openRegister){
					this.openRegister(true)
				}else{
					console.log('没得openRegister方法')
				}
            }
        },
        
        //初始化
        init(){
            let _this = this;
            //不管登录没有都需要获取数据
            _this.getGame()
            // 是否参与过活动 未参加过出现免费领取金币弹框
            if(!!_this.$store.getters.getStorage){
                _this.$fetch("/lucky/turntable/join").then(response => {
                    //flag true 已经领取
                    if(response.flag){
                        console.log('已经领取过活动金币')
                        //查询一次我的金币 与我的福袋
                        _this.myGoldLucky()
                        _this.ancestors.newReceivedGold = response.flag

                    }else{//未领取
                        this.$emit('changes',true,{'changeSolt':'getFreeGold'})
                    }
                })
            }else{
                this.openRegister(true)
            }
        },
        //我的金币 与福袋
        myGoldLucky(){
            let _this = this;
            _this.$fetch("/lucky/turntable/my/card").then(response => {
                if(response.flag){
                    _this.balanceCard.balance = response.code
                    _this.ancestors.blessingBag = response.data
                    _this.ancestors.myGoldDatas =  _this.balanceCard
                }else{
                    console.log('没有金币 与游戏')
                }
            })
        },
        // 按钮选中未选中状态切换
        BtnShow(data){
            this.lighting = data
        },
        // 点击充值按钮
        voucher(){
            if(!!this.$store.getters.getStorage){
                this.$emit('change',true,{ 'changeFun':'voucherCenter'})
            }else{
                this.openRegister(true)
            }
        },
        // 打开福袋记录
        luckyRecord(){
            if(!!this.$store.getters.getStorage){
                this.$emit('changes',true,{ 'changeSolt':'myLucklyBag'})
            }else{
                this.openRegister(true)
            }
        },
        // 请求游戏数据
        getGame(){
            let _this = this;
            _this.$fetch("/lucky/turntable/all/prize").then(response => {
                // console.log(response)
                if(response.flag){
                    _this.payMoney = response.code
                    _this.turntableGame = response.data
                    _this.topGame = response.data.slice(9,14)
                    _this.leftGame = response.data.slice(0,2)
                    _this.rightGame = response.data.slice(2,4)
                    _this.bottomGame = response.data.slice(4,9)
                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
    // 抽奖中心
    .lotteryCenterBack {
        width: 1038px;
        height: 444px;
        position: relative;
        // 奖品盒子
        .prizeBox {
            width: 972px;
            height: 388px;
            left: 34px;
            top: 19px;
            position: absolute;
            // 第一排奖品
            .firstPrize {
                width: 972px;
                height: 102px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .prizeItem {
                    width: 176px;
                    height: 82px;
                    border: 1px solid #FED47E;
                    cursor: pointer;
                }
            }
            // 第二排奖品
            .secondPrize {
                width: 970px;
                height: 188px;
                display: flex;
                // 左边
                .leftBox {
                    width: 176px;
                    height: 184px;
                    .prizeItem1 {
                        width: 176px;
                        height: 82px;
                        border: 1px solid #FED47E;
                        cursor: pointer;
                        margin-bottom: 14px;
                    }
                }
                // 中间
                .centerBox {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // 抽奖盒子
                    .openBagBox {
                        width: 300px;
                        height: 150px;
                        position: relative;
                        // 背景光
                        .backLighting {
                            width: 294px;
                            height: 158px;
                            position: absolute;
                            top: -5px;
                            left: 2px;
                        }
                        // 本轮消耗
                        .payMoney {
                            width: 100%;
                            height: 28px;
                            text-align: center;
                            // background-image: linear-gradient(to right,#FDFFA9,#FFD99F);
                            // -webkit-background-clip: text;
                            // -webkit-text-fill-color: transparent;
                            span {
                                margin-left: 10px;
                            }
                        }
                        // 开福袋按钮
                        .openBag {
                            width: 100%;
                            height: 82px;
                            .openBagBtn {
                                width: 240px;
                                height: 75px;
                                cursor: pointer;
                                position: relative;
                                z-index: 3;
                                left: 0;
                                right: 0;
                                margin: 0 auto;
                            }
                        }
                        // 我的金币
                        .goldBox {
                            width: 100%;
                            height: 41px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            // 我的金币
                            .mygold {
                                min-width: 159px;
                                height: 32px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                span {
                                    margin-left: 4px;
                                }
                                .befGold{
                                    width: 18px;
                                    height: 19px;
                                    display: inline-block;
                                }
                                .gold {
                                    min-width: 103px;
                                    // color: #FFE6B3;
                                    text-align: center;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-around;
                                }
                                .voucher {
                                    width: 64px;
                                    height: 33px;
                                    cursor: pointer;
                                    position: relative;
                                    margin-left: 8px;
                                    z-index: 44;
                                }
                            }
                            // 福袋记录
                            .luckyRecord {
                                min-width: 88px;
                                height: 32px;
                                display: flex;
                                align-items: center;
                                cursor: pointer;
                                position: relative;
                                z-index: 44;
                                .bag {
                                    width: 56px;
                                    line-height: 32px;
                                    // color: #FFE6B3;
                                }
                                .arrow {
                                    width: 32px;
                                    height: 32px;
                                }
                            }
                        }
                    }
                }
                // 右边
                .rightBox {
                    width: 176px;
                    height: 184px;
                    .prizeItem1 {
                        width: 176px;
                        height: 82px;
                        border: 1px solid #FED47E;
                        cursor: pointer;
                        margin-bottom: 14px;
                    }
                }
            }
            // 第三排奖品
            .thirdPrize {
                width: 972px;
                height: 102px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .prizeItem {
                    width: 176px;
                    height: 82px;
                    border: 1px solid #FED47E;
                    cursor: pointer;
                }
            }
        }
    }

.pos{position: relative;}
.pos .leftTopHot{
    width: 96px;
    height: 87px;
    position: absolute;
    left: -24px;
    top: -31px;
    z-index: 8;
}
</style>