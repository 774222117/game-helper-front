<template>
<!-- 活动抽奖第一步 -->
<div class="alertMain">
    <div class="alertContent" v-if="activityType == 0">
        <!-- 标题 -->
        <div class="congratulationsTitle congratulationsTitle_bg"></div>   
        <!-- 中奖背景 -->
        <div class="winThePrize winThePrize_bg">
            <!-- 中奖游戏元素盒子 -->
            <div class="luckDrawGameContents">
                <!-- 中奖的三个游戏 -->
                <div class="luckDrawGameItems" v-for="(i,index) in gameData.games" @click="activeGame(index)">
                    <activityLuckDrawGameItems :activeType="changeGameType" :indexs="indexData[index]" :activityLuckDrawGameItemsData="i" />
                </div>
            </div>
            <!-- 换一批按钮 -->
            <div class="changeGame activityChangeGame_bg" @click="changeGameItems">
                <div class="text1 ft18">换一批</div>
                <div class="text2 ft12">（剩余{{gameData.clickNumber}}次）</div>
            </div>
        </div>
        <!-- 下面两按钮 -->
        <div class="footerBtn">
            <!-- 选择领取一个 -->
            <div class="pickUp pickUp_bg" @click="choiceGame(1)">
                <div class="errorPickUp ft14 color_red_1" v-show="isErrorPickUp">请选择一个游戏后领取！</div>
            </div>
            <!-- 购买全部 -->
            <div class="purchaseAll purchaseAll_bg" @click="choiceGame(3)">
                <!-- 原价 -->
                <div class="originalPrice ft14 textDecor">¥{{gameData.discount}}</div>
                <!-- 立省 -->
                <div class="saveMoney saveMoney saveMoney_bg ft18 color_white_1"></div>
            </div>
        </div>
    </div>
    <!-- 领取了游戏查看 -->
    <div class="alertContent" v-if="activityType == 1">
        <!-- 标题 -->
        <div class="inStorageTitle inStorageTitle_bg"></div>   
        <!-- 中奖背景 -->
        <div class="winThePrize winThePrize_bg">
            <!-- 中奖游戏元素盒子 -->
            <div class="luckDrawGameContents" :style="viewMyAllGameData.length > 1 ? 'justify-content: space-between;':'justify-content: center;'" v-if="!!viewMyAllGameData">
                <!-- 中奖的三个游戏 -->
                <div class="luckDrawGameItems" v-for="(i,index) in viewMyAllGameData" @click="activeGame(index)">
                    <activityLuckDrawGameItems :activeType="changeGameType" :indexs="'all'" :activityLuckDrawGameItemsData="i" />
                </div>
            </div>
        </div>
        <!-- 下面两按钮 -->
        <div class="footerBtn">
            <!-- 选择领取一个 -->
            <div class="viewMyGame viewMyGame_bg" @click="viewMyGame"></div>
        </div>
    </div>
                    <!-- 是否显示                创建订单数据 -->
    <activityOrder v-bind="$attrs" v-on="$listeners" v-if="isActivityOrderShow" :activityOrderData="orderData" @changes="isActivityOrderShowFun" />
    <activityDetionModel v-if="isActivityDetionModel" :detionModelData="detionModelData" @change="isDetionModelDataShowFun" />
</div>
</template>
<style lang="scss" scoped>
.alertMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 11;
    background-color: rgba(3,7,23,0.9);;
    .alertContent{
        width: 970px;
        height: 698px;
        position: absolute;
        left: 0;
        top: 77px;
        right: 0;
        bottom: 0;
        margin: auto;
        // 标题 抽游戏
        .congratulationsTitle{
            width: 537px;
            height: 105px;
            margin: 0px auto;
        }
        // 标题 领取了游戏查看
        .inStorageTitle{
            width: 713px;
            height: 105px;
            margin: 0px auto;
        }
        // 中奖背景
        .winThePrize{
            width: 961px;
            height: 467px;
            padding-top: 1px;
            margin: 0 auto;
            .luckDrawGameContents{
                width: 571px;
                height: 286px;
                box-sizing: border-box;
                margin: 87px auto 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .luckDrawGameItems{
                    width: 161px;
                    height: 286px;
                    box-sizing: border-box;
                    cursor: pointer;
                }
            }
            .changeGame{
                width: 114px;
                height: 53px;
                position: absolute;
                right: 51px;
                top: 164px;
                cursor: pointer;
                .text1{
                    color:rgba(255,232,215,1);
                    line-height:27px;
                    text-align: center;
                }
                .text2{
                    color:rgba(255,232,215,1);
                    line-height:18px;
                    text-align: center;
                }
            }
        }
        // 底部两按钮
        .footerBtn{
            width: 100%;
            height: 107px;
            margin: 0 auto;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            
            //选择领取一个
            .pickUp{
                width: 226px;
                height: 57px;
                cursor: pointer;
                margin-right: 100px;
                position: relative;
                .errorPickUp{
                    width: 226px;
                    height: 20px;
                    position: absolute;
                    left: 0;
                    top: -30px;
                }
            }
            // 购买全部
            .purchaseAll{
                width: 290px;
                height: 75px;
                cursor: pointer;
                position: relative;
                .originalPrice{
                    width: 60px;
                    height: 20px;
                    line-height: 20px;
                    color:rgba(17, 251, 252, 0.8 );
                    position: absolute;
                    left: 190px;
                    top: 16px;
                }
                .saveMoney{
                    width: 132px;
                    height: 46px;
                    line-height: 45px;
                    position: absolute;
                    right: -80px;
                    top: -22px;
                    color:rgba(0,254,255,1);
                    text-align: center;
                    font-weight: bold;
                    text-shadow:0px 5px 4px rgba(0,0,0,0.5);
                }
            }
            // 查看我的游戏
            .viewMyGame{
                width: 290px;
                height: 79px;
                cursor: pointer;
            }
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
import {post} from '@/request/http.js'
import activityLuckDrawGameItems from '@/components/activity/activityLuckDrawGameItems'
import activityOrder from '@/components/activity/activityOrder'
import activityDetionModel from '@/components/activity/activityDetionModel'
export default {
  name: 'activityAlertModel',
  components:{post,JumpTo,store,activityLuckDrawGameItems,activityOrder,activityDetionModel},
  props:['activityType'],
//   inheritAttrs: false,  //父组件传递动态数据后，子组件的默认行为
  data(){
    return {
        indexData:[0,1,2],
        changeGameType:10,
        luckDrawGameItemsData:{},
        gameData:{},

        // 创建订单用的
        orderData:{
            'channelId': this.$store.getters.getChannelIdFun,
            'payType':2,
            'choose':1,
            'appIds':'',
        },
        viewMyAllGameData:{},  //查看我抽奖或购买的全部游戏
        isActivityOrderShow:false,//活动支付弹框是否显示

        isErrorPickUp: false,

        isActivityDetionModel:false,
        detionModelData:'',
    }
  },
  created(){
    this.init()
    if(this.activityType == 1){
        this.viewMyAllGame()
    }
  },
  mounted(){
   
  },
  methods:{
    init(){
        var _this = this;
        // 抽奖的游戏 与换一批相同
        _this.$fetch('/people/activity/findGames',{'change':0})
            .then((response) => {
                if(response.flag){
                    _this.gameData = response.data
                    _this.detionModelData = _this.gameData.discount 
                }else{
                    console.log('抽奖换一批的3个游戏不对')
                }
            })
    },
    // // 取消关闭按钮  暂时没有这个功能
    // cancel(){
    //     this.$emit('change',  false) 
    // },
    // // 确定按钮  暂时没有这个功能
    // confirm(){
    //     let _this = this;
    //     _this.$emit('change',  false,0) 
    // },
    // 选中游戏
    activeGame(index){
        this.changeGameType = index
        // this.orderData.appIds = this.gameData.games[index].appId
    },
    //换一批
    changeGameItems(){
        var _this = this;
        // 抽奖的游戏 与换一批相同
        _this.$fetch('/people/activity/findGames',{'change':1})
            .then((response) => {
                if(response.flag){
                    _this.gameData = response.data
                }else{
                    console.log('抽奖换一批的3个游戏不对')
                }
            })
    },
    // 选择游戏 
    choiceGame(num){
        var _this = this;
        // num == 1 选择一个 num == 3 选择全部
        if(num == 1){
            if(_this.changeGameType > 3){
                _this.isErrorPickUp = true
                return
            }
            // _this.isActivityDetionModel = true
            _this.orderData.appIds = _this.gameData.games[_this.changeGameType].appId
            _this.orderData.choose = 1
            _this.$fetch('/people/activity/create',_this.orderData)
                .then((response) => {
                    if(response.flag){
                        _this.$emit("change", true,1);
                        _this.viewMyAllGame()
                    }
                })
        }
        if(num == 3){
            _this.isActivityOrderShow = true
            _this.orderData.appIds = _this.gameData.games[0].appId +','+ _this.gameData.games[1].appId +','+ _this.gameData.games[2].appId ;
            _this.orderData.choose = 3
        }
        // data ={
        //     'channelId':'渠道标识',
        //     'payType':'INT/2微信3支付宝',
        //     'choose':'INT/1:选择1款,3:选择3款',
        //     'appIds':'Long/378860',
        // }
    },
    isActivityOrderShowFun(data,n){
        if(n == 'closeParent'){
            this.isActivityOrderShow = data
            this.$emit("change", true,1);
            this.viewMyAllGame()
        }else{
            this.isActivityOrderShow = data
        }
    },
    isDetionModelDataShowFun(data,n){
        var _this = this;
        _this.isActivityDetionModel = data
        if( n == 1){
            _this.orderData.appIds = _this.gameData.games[_this.changeGameType].appId
            _this.detionModelData =  _this.orderData.appIds
            _this.orderData.choose = 1
            _this.$fetch('/people/activity/create',_this.orderData)
                .then((response) => {
                    console.log(response)
                    if(response.flag){
                        _this.$emit("change", true,1);
                        _this.viewMyAllGame()
                    }
                })
        }else if(n == 3){
            _this.isActivityOrderShow = true
            _this.orderData.appIds = _this.gameData.games[0].appId +','+ _this.gameData.games[1].appId +','+ _this.gameData.games[2].appId ;
            _this.orderData.choose = 3
        }
    },
    //查看领取或者购买的游戏
    viewMyAllGame(){
        var _this = this;
        _this.$fetch('/people/activity/received')
            .then((response) => {
                if(response.flag){
                    _this.viewMyAllGameData = response.data
                }else{
                    console.log('查看购买或者抽奖的全部游戏')
                }
            })
    },
    
    // 查看我的游戏
    viewMyGame(){
        JumpTo(3)
    }
  }
}

</script>
