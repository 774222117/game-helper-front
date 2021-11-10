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
                <!-- 打开礼物 -->
                <div class="openGift">
                    <div class="topImg">
                        <div class="box1 giftBgImg_bg" :class="openGame == 1?'anime':'' "></div>
                        <div class="box2" :class="openGame == 1?'anime1':'' ">
                            <img :src="gameData.image" alt="">
                            <!-- 上面的视频 -->
                            <div class="itemsVideo"> 
                                <div class="leftImg ft16 color_white_1"  :class="gameData.trialDays == 0?'allDay_bg':'oneDay_bg'" v-show="showLeftIcon === 1">
                                    <!-- {{activityLuckDrawGameItemsData.trialDays == 0?'永久':'一天'}} -->
                                </div>
                                <div class="rightVideo ft14 color_white_1" @click="viewVideo">
                                    <div class="playVideoIcon"> <svg-icon iconClass="playVideo" class="svg_icon"></svg-icon> </div>
                                    <div class="playVideoText ft12 color_white_1">查看视频</div>
                                </div>
                            </div>
                            <!-- 下面的名字 -->
                            <div class="itemsName textOver ft14 color_white_1">{{gameData.chinaName == '' ? gameData.englishName :gameData.chinaName}}</div>
                        </div>
                    </div>
                    <div class="btmWorth ft14 color_white_1 worth_bg">价值： {{gameWoth}}</div>
                </div>
            </div>
        </div>
        <!-- 下面两按钮 -->
        <div class="footerBtn">
            <!-- 打开礼物 -->
           <div class="openGiftBtn openGiftBtn_bg" @click="openGiftBtnFun" v-if="openGame == 0"></div>
           <div class="claimGameBtn claimGameBtn_bg" @click="claimGameBtnFun" v-if="openGame == 1"></div>
        </div>
    </div>
    <activityLookVideo v-if="lookVideoIsShow" :videourl="gameData.video" @change="playVideo" />
    <viewGifts v-if="displayViewGifts" />
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
                height: 305px;
                box-sizing: border-box;
                margin: 87px auto 0;
                display: flex;
                justify-content: center;
                align-items: center;
                .openGift{
                    width: 161px;
                    height: 305px;
                    box-sizing: border-box;
                    .topImg{
                        width: 100%;
                        height: 245px;
                        box-sizing: border-box;
                        border: 2px solid #20f7f8;
                        margin: 0 auto;
                        position: relative;
                        .box1{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 5;
                        }
                        .anime{
                            animation: rotateYAnime 2s ease-in-out forwards;
                        }
                        .box2{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                            z-index: 1;
                            img{
                                width: 100%;
                                height: 100%;
                                display: block;
                            }
                            .itemsVideo{
                                width: 100%;
                                height: 32px;
                                background:linear-gradient(180deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                position: absolute;
                                left: 0;
                                top: 0;
                                z-index: 3;
                                .leftImg{
                                    width: 55px;
                                    height: 24px;
                                    margin-left: -6px;
                                    text-align: center;
                                    line-height: 24px;
                                }
                                .rightVideo{
                                    width: 74px;
                                    height: 16px;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    .playVideoIcon{
                                    width: 12px;
                                    height: 12px; 
                                    }
                                    .playVideoText{
                                        width: 56px;
                                        height: 14px;
                                        line-height: 14px;
                                        margin-left: 5px;
                                    }
                                }
                            }
                            .itemsName{
                                width: 100%;
                                height: 32px;
                                text-align: center;
                                line-height: 32px;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
                            }
                        }
                        .anime1{
                            animation: rotateYAnime1 2s ease-in-out forwards;
                        }
                    }
                    .btmWorth{
                        width:117px;
                        height:45px;
                        margin: 13px auto 0;
                        color:rgba(0,254,255,1);
                        font-weight: bold;
                        line-height:45px;
                        text-align: center;
                        text-shadow:0px 2px 4px rgba(0,0,0,0.5);
                    }
                }
            }
        }
        // 底部两按钮
        .footerBtn{
            width: 100%;
            height: 107px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            .openGiftBtn{
                width: 213px;
                height: 57px;
                cursor: pointer;
            }
            .claimGameBtn{
                width: 213px;
                height: 57px;
                cursor: pointer;
            }
          
        }
    }
}
@keyframes rotateYAnime{
    form{
        transform: rotateY(0deg);
    }
    to{
        transform: rotateY(1440deg);
    }
}
@keyframes rotateYAnime1{
    form{
        transform: rotateY(0deg);
    }
    to{
        transform: rotateY(1440deg);
        z-index: 6;
    }
}
</style>
<script>
import { setInterval, setTimeout, clearInterval } from "timers";
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
import {post} from '@/request/http.js'
import activityLuckDrawGameItems from '@/components/activity/activityLuckDrawGameItems'
import activityLookVideo from '@/components/activity/activityLookVideo'
import viewGifts from '@/components/activity/viewGifts'
export default {
  name: 'activityAlertModel',
  components:{post,JumpTo,store,activityLuckDrawGameItems,activityLookVideo,viewGifts},
  props:['activityType'],
//   inheritAttrs: false,  //父组件传递动态数据后，子组件的默认行为
  data(){
    return {
        gameData:{}, //游戏信息
        gameWoth:'XXX', //价值
        openGame:0,  //控制打开游戏按钮的东西
        openGameTimer: null,  //定时器
        showLeftIcon:0,  //永久角标出现的时机
        lookVideoIsShow: false,

        // 创建订单用的
        orderData:{
            'channelId': this.$store.getters.getChannelIdFun,
            'payType':2,
            'choose':1,
            'appIds':'',
        },

        displayViewGifts:false,
    }
  },
  created(){
   this.init()
  },
  mounted(){
   
  },
  methods:{
    init(){
        var _this = this;
        // 获取礼品游戏
        _this.$fetch('/people/activity/findGames',{'change':0})
            .then((response) => {
                if(response.flag){
                    response.data.games.forEach((v,i) => {
                       if(v.trialDays == 0){
                            _this.gameData = response.data.games[i]
                       }
                    });
                   
                }
            })
    },
    // 打开礼物按钮
    openGiftBtnFun(){
        this.openGame = 1
        this.openGameTimerFun()
        console.log(this.gameData)
    },
    // 领取礼物
    claimGameBtnFun(){
        var _this = this;
        _this.orderData.appIds = _this.gameData.appId
        _this.$fetch('/people/activity/create',_this.orderData)
                .then((response) => {
                    if(response.flag){
                        _this.displayViewGifts = true
                    }
                })
    },
    // 定时器 方法  
    openGameTimerFun(){
        this.openGameTimer = setTimeout(() => {
            this.gameWoth = this.gameData.worth
            this.showLeftIcon = 1
            clearInterval(this.openGameTimer)
            this.openGameTimer = null
        }, 2000);
    },
    //查看视频
    viewVideo(){
        this.lookVideoIsShow = true
    },
    // video弹出关闭与否 接收消息
    playVideo(data){
        this.lookVideoIsShow = data
    },
    // 查看我的游戏
    viewMyGame(){
        JumpTo(3)
    }
  }
}

</script>
