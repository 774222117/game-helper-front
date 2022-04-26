<template>
    <div class="newYear">
        <!-- 背景图层 -->
        <div class="discountNewYearBox discountNewYearBox_bg">
            <!-- 选择游戏框 -->
            <div class="discountContent">
                <!-- 包裹 -->
                <div class="gameItemBorder" v-for="(item,index) in list">
                    <!-- 背景图单独一个div -->
                    <div class="gameItemBorderPic gameItemBorder_bg" @click="changeGame(index)" :class=" alreadyGameContent.length > index?'isRemoveGame':''">
                        <!-- 删除样式 -->
                         <div class="removeGameContent removeGame_bg" @click.stop="removeContentGame(index)"></div>
                    </div>
                   
                    <div class="gameItemPic activeChange_bg" :key="index" >
                        <!-- 有数据的盒子 -->
                        <div class="changeGameGoods ft14" v-if="!!alreadyGameContent.length">     
                            <!-- 游戏图 -->
                            <img v-if="alreadyGameContent.length > index" :src="alreadyGameContent[index]['libraryCapsule']  || noGamePic" alt="">
                            <!-- 遮罩层 -->
                            <div class="shadowPic gameBox_bg" v-if="alreadyGameContent.length > index"></div>
                            <!-- 底部遮罩 -->
                            <div class="gameItemShadow gameItemShadow_bg ft14" v-if="alreadyGameContent.length > index">{{alreadyGameContent[index]['chinaName'] || alreadyGameContent[index]['englishName']}}</div>
                            <!-- 价格 -->
                            <div class="gameTopPrice gamePriceShadow_bg ft14" v-if="alreadyGameContent.length > index"><span class="ft12">￥</span><span class="ft_weight">{{alreadyGameContent[index]['steamPrce']}}</span></div>
                        </div>
                    </div>
                    <!-- 几件几折 -->
                    <div class="gameDiscountPic gameDiscountPic_bg ft14" >{{discountText[index].name}}</div>
                </div>
            </div>
            <!-- 已选游戏框 -->
            <div class="alreadyGameContent ft24">已选<div class="bigSize">{{alreadyGameNum}}</div>件，立享<div class="bigSize">{{alreadyDiscount}}</div>折！仅需￥{{finallyPrice}}</div>
            <!-- 按钮框 -->
            <div class="btnContent">
                <!-- 试试手气 -->
                <div class="leftBtn" :class="tryHand ? 'leftBtn2_bg' : 'leftBtn1_bg' " @mouseenter="handleft(true)" @mouseleave="handleft(false)" @click="tryFeeling"></div>
                <!-- 立即下单 -->
                <div class="rightBtn" :class="playOrder? 'rightBtn2_bg' : 'rightBtn1_bg' " @mouseenter="handOrder(true)" @mouseleave="handOrder(false)" @click="changeVoucher"></div>
            </div>
            <!-- 活动介绍 -->
            <div class="activityInfo">
                <!-- 活动介绍 -->
                <div class="activityIntro ft18">活动介绍</div>
                <!-- 活动详细介绍 -->
                <div class="activityDetail">
                    <div class="detailItem ft14" v-for="(text,index) in detailText" :key='index'>{{text}}</div>
                </div>
            </div>
            <!-- 选择重复游戏弹窗 -->
            <div class="changeReplayAlert changeReplayAlert_bg" v-if="changeReplayAlert">
                <div class="changeReplayText ft18">{{replayGameText}}</div>
                <div class="changeReplayClose ft16" @click="changeReplayClose">好的</div>
            </div>
        </div>
        

        <serchGame v-if="serchType" @change="serchClose" @changeGameItem='alreadyGameItem'/>
        <voucherCenter v-if="voucherType" @change='voucherClose' :alreadyChangeGame='alreadyGameContent' @success='successAlert' @replayGame='replayGame'/>
        <successAlert v-if="successType" @change='closeSuccess'/>
    </div>
</template>

<script>
import serchGame from '@/components/discountNewYear/serchGame.vue';//搜索框
import voucherCenter from '@/components/discountNewYear/voucherCenter.vue';//充值框
import successAlert from '@/components/discountNewYear/successAlert.vue';//支付成功

export default {
    name:'discountNewYear',
    components:{
        serchGame,
        voucherCenter,
        successAlert
    },
    data(){
        return {
            alreadyGameContent:[],//已选的游戏合集
            list:5,
            tryHand:false,//试试手气默认未选中状态
            playOrder:false,//立即下单默认未选中状态
            detailText:['1.本活动仅五一活动期间可参与，活动期间内可多次参与。','2.本轮活动获取的游戏均为畅享版游戏。畅享版游戏为游戏的永久使用权，在W4PLAY中可以一键启动游玩游戏，不是游戏账号、代充服务或游戏CDKEY','3.活动商品为特殊电子商品，售出后24小时内且游玩不超过2小时可退。退款时需整单退款，无法拆分退款。'],
            serchType:false,//搜索游戏框开关
            voucherType:false,//充值中心开关
            handleGame:false,//用户是否已选游戏
            removeGame:false,//删除游戏框默认不显示
            currentIndex:null,//当前鼠标移入的游戏
            successType:false,//支付成功界面开关
            count:0,//试试手气需要添加的游戏数量
            temporaryContent:[],//临时存放游戏合集appid
            changeReplayAlert:false,//重复游戏弹窗
            replayGameText:'不能重复选择游戏噢~',
            alreadyUserGame:'',//用户已选择的游戏
            temporaryGameAppid:[],//存放查询游戏的appid
            finallyPrice:0,//仅需的价格
            serchItemGame:'',//记录当前选中的游戏appid，看该游戏是否能被选
            noGamePic:require('../../assets/discountNewYear/images/noGamePic.png'),//没有游戏图片时显示
            showRemovePic:false,//显示删除游戏按钮
            discountText:[
                    {name:'选2件8折'},
                    {name:'选2件8折'},
                    {name:'选3件7折'},
                    {name:'选4件6折'},
                    {name:'选5件5折'}
                ],
        }
    },
    mounted(){
        //在获取一次渠道id
        if(!!window.sendCef){
            window.sendCef("get_channel_id","");
        }else{
        // 浏览器打开  设置渠道ID 
        if(window.location.hostname.indexOf('store') >= 0){
            this.$store.commit('setChannelId','BZWEB')
        };
            console.log('没有cef方法 不能获取渠道id')
        }
    },
    methods:{
        ccc(){
            console.log('321321')
        },
        aaa(){
            if(this.alreadyGameContent.length > 0){
                console.log('true')
                this.showRemovePic = true
                console.log(this.showRemovePic)
            }else{
                console.log('false')
            }
        },
        bbb(){
            this.showRemovePic = false
        },
        // 请勿重复购买游戏
        replayGame(data,message){
            this.changeReplayAlert = data
            this.replayGameText = message
        },
        // 关闭重复游戏弹窗
        changeReplayClose(){
            this.changeReplayAlert = false
        },
        // 支付成功打开支付成功界面
        successAlert(data){
            this.successType = data
        },
        // 关闭支付成功框
        closeSuccess(data,num){
            this.successType = data
            this.alreadyGameContent = num
            this.temporaryGameAppid = num
        },
        // 删除合集中保存的游戏
        removeContentGame(index){
            this.temporaryGameAppid.splice(this.temporaryGameAppid.indexOf(this.alreadyGameContent[index].appId),1)
            this.alreadyGameContent.splice(index,1)
            this.queryPrice()
        },
        // 接收已选的游戏
        alreadyGameItem(item,show){
            // console.log(item)
            var _this = this
            // 检查该游戏是否能被选
            // /newYear/getGameInfo 表示游戏可以选择的请求
            _this.$fetch('/newYear/getGameInfo',{appId:item.appId})
            .then((response) => {
                if(response.code == 1){
                    if(_this.alreadyGameContent.length == 0){
                        _this.alreadyGameContent.push(item)
                        _this.serchType = show
                    }else{
                        _this.alreadyGameContent.forEach(data => {
                            if(!_this.temporaryContent.includes(data.appId)){
                                _this.temporaryContent.push(data.appId)
                            }
                        });
                        if(_this.temporaryContent.includes(item.appId)){
                            _this.changeReplayAlert = true
                            _this.replayGameText = '不能选择重复的游戏哦~'
                        }else{
                            _this.alreadyGameContent.push(item)
                            _this.serchType = show
                        }
                    }
                    _this.getAppid(_this.alreadyGameContent)
                    _this.queryPrice()
                }else{
                    _this.changeReplayAlert = true
                    _this.replayGameText = response.message
                }
            })
        },
        getAppid(data){
            // alreadyUserGame 存appId
            for(var i = 0;i < data.length;i++){
                this.temporaryGameAppid.push(data[i].appId)
            }
            this.temporaryGameAppid = [...new Set(this.temporaryGameAppid)]
        },
        // 将appid逗号分隔并组合
        computedAppid(){
            for(var i = 0;i < this.alreadyGameContent.length;i++){
                this.alreadyUserGame += this.alreadyGameContent[i].appId + ','
            }
        },
        // 试试手气
        async tryFeeling(){
            var _this = this
            if(_this.temporaryGameAppid.length >=5){
                return
            }else if(_this.temporaryGameAppid.length == 0){
               await _this.$fetch('/newYear/randomAppId',{count:5,appIds:_this.temporaryGameAppid})
                .then((response) => {
                    if(response.flag){ 
                        _this.getAppid(response.data.rows)
                        _this.alreadyGameContent = response.data.rows
                    }else{
                        console.log('试试手气数据请求失败')
                    }
                })
            }else{
                let counts = 5 - _this.temporaryGameAppid.length
                await _this.$fetch('/newYear/randomAppId',{count:counts,appIds:_this.temporaryGameAppid.join()})
                .then((response) => {
                    if(response.flag){ 
                        _this.alreadyGameContent = _this.alreadyGameContent.concat(response.data.rows) 
                        _this.getAppid(_this.alreadyGameContent)
                    }else{
                        console.log('试试手气数据请求失败')
                    }
                })
            }
            await _this.queryPrice()
        },
        // 请求所选游戏的价格
        queryPrice(){
            let _this = this
            _this.$fetch('/newYear/getPrice',{appIds:_this.temporaryGameAppid.join()})
            .then((response) => {
                // console.log(response)
                _this.finallyPrice = (response.code*1).toFixed(2)
            })
        },
        // 删除游戏样式
        handRemove(show,index){
            this.currentIndex = index
            this.removeGame = show      
        },
        // 鼠标移入 试试手气 状态改变
        handleft(data){
            this.tryHand = data
        },
        // 鼠标移入 立即下单 状态改变
        handOrder(data){
            this.playOrder = data
        },
        // 关闭搜索框
        serchClose(data){
            this.serchType = data
        },
        // 关闭充值中心
        voucherClose(data){
            this.voucherType = data
        },
        // 单选每一个游戏
        changeGame(index){
            if(index >= this.alreadyGameContent.length){
                this.serchType = true
            }else{
                this.serchType = false
            }
        },
        // 点击下单按钮
        changeVoucher(){
            // console.log(this.alreadyGameContent.length)
            if(this.alreadyGameContent.length > 1){
                // 是否为黑名单用户
                if(this.$store.getters.getBlackList.flag && this.$store.getters.getBlackList.data.isOpen == 1){
                    this.changeReplayAlert = true
                    this.replayGameText = '没有库存了！'
                    return
                }else{
                    this.voucherType = true
                }
            }else{
                this.changeReplayAlert = true
                this.replayGameText = '请选择两个以上的游戏'
                // alert('请选择2个或2个以上的游戏')
            }
        }
    },
    computed:{
        // 已选游戏数量
        alreadyGameNum:function(){
            return this.alreadyGameContent.length
        },
        // 享受的折扣
        alreadyDiscount:function(){
            var result = 0;
            switch(this.alreadyGameContent.length){
                case 0:
                    return result = 0
                    break;
                case 1:
                    return result = 0
                    break;
                case 2:
                    return result = 8
                    break;
                case 3:
                    return result = 7
                    break;
                case 4:
                    return result = 6
                    break;
                case 5:
                    return result = 5
                    break; 
                default:
                    break  
            }
            return result
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/discountNewYear/css/homepage.css";
    .newYear {
        width: 100%;
        // 背景图
        .discountNewYearBox {
            width: 1280px;
            height: 912px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            // 选择重复游戏弹窗
            .changeReplayAlert {
                width: 490px;
                height: 287px;
                position: fixed;
                top: 228px;
                left: 0px;
                right: 0px;
                margin: 0 auto;
                z-index: 59;
                .changeReplayText {
                    width: 200px;
                    height: 32px;
                    font-family: PingFang SC, PingFang SC-Semibold;
                    font-weight: 600;
                    text-align: center;
                    color: #f2d59e;
                    line-height: 32px;
                    letter-spacing: 0.32px;
                    margin: 93px auto 0 auto;
                }
                .changeReplayClose {
                    width: 148px;
                    line-height: 43px;
                    background: #c06c50;
                    border: 1px solid #ffe8ac;
                    border-radius: 4px;
                    font-family: PingFang SC, PingFang SC-Semibold;
                    font-weight: 600;
                    text-align: center;
                    color: #ffe8ac;
                    letter-spacing: 0.04px;
                    margin: 52px auto 0 auto;
                    cursor: pointer;
                }
            }
            // 内容层
            .discountContent {
                width: 714px;
                height: 490px;
                overflow: hidden;
                margin: 190px 0 0 282px;
                display: flex;
                flex-wrap: wrap;
                // 包裹游戏的外框
                
                .gameItemBorder {
                    width: 161px;
                    height: 238px;
                    position: relative;
                    .gameDiscountPic {
                        width: 98px;
                        height: 28px;
                        position: absolute;
                        bottom: 0;
                        left: 33px;
                        z-index: 36;
                        line-height: 28px;
                        color: #fff1d4;
                        text-align: center;
                    }
                    
                    
                    .gameItemBorderPic.isRemoveGame:hover .removeGameContent{display: block;}
                    .gameItemBorderPic {
                        width: 161px;
                        height: 238px;
                        position: absolute;
                        z-index: 35;
                        cursor: pointer;
                        // 删除样式
                        .removeGameContent {
                            width: 132px;
                            height: 198px;
                            position: absolute;
                            z-index: 37;
                            left: 16px;
                            bottom: 24px;
                            display: none;
                            border: red;
                            img {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                z-index: 44;
                            }
                        }
                    }
                    
                    .gameItemShadow {
                        width: 132px;
                        height: 45px;
                        z-index: 32;
                        position: absolute;
                        bottom: 0px;
                        left: 0px;
                        text-align: center;
                        color: #ffe6b2;
                        line-height: 45px;
                    }
                    .gameItemPic {
                        width: 132px;
                        height: 198px;
                        position: absolute;
                        top: 16px;
                        left: 16px;
                        z-index: 33;
                        
                        .changeGameGoods{
                            width: 132px;
                            height: 198px;
                            position: absolute;
                            z-index: 34;
                        }
                        



                        .gameTopPrice {
                            width: 62px;
                            height: 27px;
                            position: absolute;
                            top: 10px;
                            right: 1px;
                            z-index: 35;
                            color: #ffe8ac;
                            line-height: 27px;
                            text-align: center;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            z-index: 21;
                        }
                    }
                }
                
                .gameItemBorder:nth-child(1){

                }
                .gameItemBorder:nth-child(2){
                    margin: 122px 0 0 120px;
                }
                .gameItemBorder:nth-child(3){
                    margin: 0 0 0 110px;
                }
                .gameItemBorder:nth-child(4){
                    margin: -109px 0 0 0;
                }
                .gameItemBorder:nth-child(5){
                    margin: -109px 0 0 392px;
                }
                // 游戏盒
                // .gameItem {
                //     width: 132px;
                //     height: 198px;
                //     overflow: hidden;
                //     -webkit-border-radius: 10px 10px 0px 0px;
                //     cursor: pointer;
                //     position: relative;
                //     // border: 1px black solid;
                //     // 删除游戏界面
                //     .removeGameGoods {
                //         width: 135px;
                //         height: 141px;
                //     }
                //     // 删除框
                //     .removeGame {
                //         width: 135px;
                //         height: 141px;
                //         background-color: blue;
                //     }
                //     .changeGameGoods.isRemoveGame:hover .removeGameContent{display: block;}
                //     .changeGameGoods {
                //         width: 135px;
                //         height: 141px;
                //         img {
                //             width: 100%;
                //             // height: 100%;
                //             position: absolute;
                //             z-index: 1;
                //         }
                //         .removeGameContent {
                //             width: 135px;
                //             height: 141px;
                //             position: absolute;
                //             z-index: 39;
                //             display: none;
                //         }
                //         .shadowPic {
                //             width: 135px;
                //             height: 141px;
                //             position: absolute;
                //             z-index: 22;
                //         }
                //         // 底部遮罩
                //         .bottomShadow {
                //             width: 135px;
                //             height: 30px;
                //             line-height: 34px;
                //             position: absolute;
                //             bottom: 0;
                //             z-index: 33;
                //             font-family: PingFang SC, PingFang SC-Semibold;
                //             font-weight: 600;
                //             text-align: center;
                //             color: #ffe6b2;
                //         }
                //         // 游戏价格
                //         .gameTopPrice {
                //             width: 53px;
                //             height: 22px;
                //             position: absolute;
                //             top: 0;
                //             right: 0;
                //             z-index: 22;
                //             font-family: PingFang SC, PingFang SC-Medium;
                //             font-weight: 500;
                //             text-align: center;
                //             color: #ffe8ac;
                //             line-height: 20px;
                //             text-shadow: 0px 1px 1px 0px #4d0200; 
                //         }
                //     }
                    
                // }
                // .gameItem:nth-child(1){
                //     margin: 9px 0 0 12px;
                // }
                // .gameItem:nth-child(2){
                //     margin: 136px 0 0 148px;
                // }
                // .gameItem:nth-child(3){
                //     margin: 10px 0 0 142px;
                // }
                // .gameItem:nth-child(4){
                //     margin: -100px 0 0 12px;
                // }
                // .gameItem:nth-child(5){
                //     margin: -100px 0 0 424px;
                // }
                // 已选游戏盒子
            }
            // 已选游戏框
            .alreadyGameContent {
                min-width: 340px;
                display: flex;
                align-items: center;
                margin: 0 auto;
                
                height: 46px;
                position: absolute;
                bottom: 278px;
                left: 464px;
                font-family: PingFang SC, PingFang SC-Semibold;
                font-weight: 600;
                text-align: center;
                color: #121227;
                text-shadow: 0px 1px 2px 0px #2d1414;
                // border: 1px black solid;
            }
            // 按钮框
            .btnContent {
                width: 378px;
                height: 45px;
                position: absolute;
                left: 450px;
                bottom: 224px;
                display: flex;
                justify-content: space-between;
                .leftBtn {
                    width: 157px;
                    height: 56px;
                    cursor: pointer;
                }
                .rightBtn {
                    width: 157px;
                    height: 56px;
                    cursor: pointer;
                }
            }
            // 活动介绍
            .activityInfo {
                width: 686px;
                height: 145px;
                position: absolute;
                bottom: 10px;
                left: 250px;
                font-family: Roboto, Roboto-Medium;
                font-weight: 500;
                text-align: left;
                color: rgba(255,241,214,0.70);
                letter-spacing: 0.05px;
                // border: 1px white solid;
                .activityIntro {
                    width: 74px;
                    line-height: 24px;
                }
                // 活动详细介绍
                .activityDetail {
                    width: 686px;
                    height: 116px;
                    margin-top: 5px;
                    display: flex;
                    flex-direction: column;
                    .detailItem {
                        width: 100%;
                        line-height: 21px;
                        height: 21px;
                    }
                    .detailItem:nth-child(2){
                        margin-top: 11px;
                    }
                    .detailItem:nth-child(3){
                        margin-top: 31px;
                    }
                }
            }
        }
    }
    .bigSize {
        font-size: 32px;
    }
</style>