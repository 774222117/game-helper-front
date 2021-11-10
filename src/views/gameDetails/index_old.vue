<template>
<div class="gameDetailsMainBox" v-if="gameInfo">
    <div class="detailsBgBox" :style="{backgroundImage: 'url(' + gameInfo.libraryHero + ')' , backgroundSize:'1920px 598px',backgroundPosition: 'center top'}">
        <div class="detailsBgBoxBg detailsBg_bg"></div>
        <!-- 游戏详情 -->
        <div class="gameDetailsContentBox">
            <!-- 头部轮播 -->
            <div class="bannerGameInfo">
                <!-- 左边轮播 -->
                <div class="leftBannerBox">
                    <div class="bannerTopTitle">
                        <div class="gameNameBox">
                            <div class="gameName ft18 color_white_1 RobotoBold">{{gameInfo.chinaName == '' ? gameInfo.englishName : gameInfo.chinaName}}</div>
                            <div class="gameNameIcon margin_left_8"><svg-icon iconClass='steamIcon' className='svg_icon'></svg-icon></div>
                            <div class="gameNameIcon margin_left_6"><svg-icon iconClass='windowIcon' className='svg_icon'></svg-icon></div>
                        </div>
                        <div class="gameLabelBox margin_top_10">
                            <div class="gameLabelItem margin_right_8 ft12 color_white_08 RobotoRegular" v-for="(n, i) in gameInfo.attributes.category3" :key = "i">{{n.title}}</div>
                        </div>
                    </div>
                    <div class="bannerSwiper">
                        <div class="gallery-top bannerPlayBox ft20">
                            <transition name="videoAnime">
                                <video class='imgorvideo' controls autoplay muted  :src="itemSrc" v-if="isPlayVideo"></video>
                                <img class='imgorvideo' :src="itemSrc" alt="" v-if="!isPlayVideo">
                            </transition>
                        </div>
                        <div class="sketchMapOuter">
                            <div class="sketchMapInner">
                                <!-- 略缩图轮播 -->
                                <swiper :options="gallerythumbs" class="gallery-thumbs bannerChoiceBox ft20" ref="gallerythumbss">
                                    <swiper-slide class="swiperSlides" v-for="(slide, index) in swiperSlides" :key="index" :class="[swiperActive == index?'active':'',isVideo.indexOf(index) > -1?'isVideo':'']" >
                                        <!-- <img :src="slide.thumbnailAddress 略缩图的值" alt=""  slide.carouselAddress 播放图的值>     -->
                                        <div class="isVideoBgBox" @click="changeSwiper(index, slide.carouselAddress)"><div class="iconVideoSvg"><svg-icon iconClass='playVideo' className='svg_icon'></svg-icon></div></div>
                                        <div class="solidImgBox"  @click="changeSwiper(index, slide.carouselAddress)"><img :src="slide.thumbnailAddress" alt=""></div>
                                    </swiper-slide>
                                    <!-- 如果需要导航按钮 -->
                                    <div class="swiper-button-next swiper-button-white detailsVideoBtnRight_bg" slot="button-next"></div>
                                    <div class="swiper-button-prev swiper-button-white detailsVideoBtnLeft_bg" slot="button-prev"></div>
                                </swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右边游戏详情 -->
                <div class="rightGameInfoBox" v-if="findSaleData">
                    <!-- 标题头部 -->
                    <div class="gameInfoType">
                        <div class="onlyPlayTogether" v-if="findSaleData.together && findSaleData.together.model == 2 && Object.keys(findSaleData).length <2">
                            <div class="iconBox"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon></div>
                            <div class="margin_left_4 ft14 ft_weight color_white_1">畅享版</div>
                            <div class="playTogetherExplain" v-show="isActive == 'together'" @click="playTogetherExplainModelFun"><svg-icon iconClass='ask' className='svg_icon'></svg-icon> </div>
                            
                        </div>
                        <div class="onlyExclusive" v-else-if="findSaleData.account && findSaleData.account.model == 1 && Object.keys(findSaleData).length <2">
                            <div class="iconBox"><svg-icon iconClass='private' className='svg_icon'></svg-icon></div>
                            <div class="margin_left_4 ft14 ft_weight color_white_1">独享版</div>
                            
                            <!-- <div class="margin_left_8 ft18 ft_weight color_white_1">$ {{findSaleData.account.price}}</div> -->
                        </div>
                        <div class="playTogetherAddExclusive" v-else>
                            <div class="lineBox back5" :style="isActive == 'together'?'left:0':isActive == 'account'?'left:50%':'left:50%'"></div>
                                <!-- -->
                            <div class="onlyPlayTogether opc_hover6" :class="isActive=='together'?'active':''" @click="gameTypeClick('together')">
                                <div class="iconBox" v-show="isActive == 'together'"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon></div>
                                <div class="margin_left_4 ft14 ft_weight color_white_1" v-show="isActive == 'together'">畅享版</div>
                                <div class="playTogetherExplain" v-show="isActive == 'together'" @click="playTogetherExplainModelFun"><svg-icon iconClass='ask' className='svg_icon'></svg-icon> </div>
                                
                                <div class="margin_left_8 ft18 ft_weight color_white_1" v-show="isActive != 'together'">￥{{togetherData.price}}</div>
                                <div class="margin_left_16 ft14 ft_weight color_white_1 centerIcon" v-show="isActive != 'together'">畅享版
                                    <!-- <div class="playTogetherExplain" v-show="isActive != 'together'" @click="playTogetherExplainModelFun"><svg-icon iconClass='ask' className='svg_icon'></svg-icon> </div> -->
                                </div>
                            </div>
                            <!-- :class="isActive=='account'?'active':''"  -->
                            <div class="onlyExclusive opc_hover6" :class="isActive=='account'?'active':''" @click="gameTypeClick('account')">
                                <div class="margin_left_8 ft18 ft_weight color_white_1" v-show="isActive != 'account'">￥{{accountData.price}}</div>
                                <div class="margin_left_16 ft14 ft_weight color_white_1" v-show="isActive != 'account'">独享版</div>

                                <div class="iconBox" v-show="isActive == 'account'"><svg-icon iconClass='private' className='svg_icon'></svg-icon></div>
                                <div class="margin_left_4 ft14 ft_weight color_white_1" v-show="isActive == 'account'">独享版</div>
                            </div>
                        </div>
                    </div>
                    <!-- 图片文案卖点 -->
                    <div class="gameInfoIntroduce">
                        <div class="gameImgBox">
                            <img :src="gameInfo.detailedInfo.image" alt="">
                        </div>
                        <!-- <p class="gameInfoTitle ft14 color_white_1 RobotoBold">Play a simple introduction and purchase way</p> -->
                        <p class="gameInfoSynopsis textOver5 ft14 color_white_06 RobotoRegular">
                            {{  gameInfo.detailedInfo.introduce }}
                        </p>
                        
                        <div class="gameBtn"  v-if="isActive == 'together'"> 
                            <!-- 下面卖点鼠标画上显示的盒子 -->
                            <transition name="animeHover">
                                <div class="gameBtnPublicHoverBox border_radius_4 ft14 color_white_06 RobotoRegular" v-show="hoverIsShow">
                                    {{rightInfoData[isFouch]}}
                                </div>
                            </transition>
                            <div class="fastRefundBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" style="margin-right:16px;" @mouseenter="iconFocus(0)" @mouseleave="iconFocusLeave(0)">
                                <div class="iconBox"><svg-icon iconClass='gift' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">官方正版</div>
                            </div>
                            <div class="payPalBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" style="margin-right:16px;" @mouseenter="iconFocus(1)" @mouseleave="iconFocusLeave(0)"> 
                                <div class="iconBox"><svg-icon iconClass='lightning' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">极速发货</div>
                            </div>
                            <div class="discountBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" @mouseenter="iconFocus(2)" @mouseleave="iconFocusLeave(0)">
                                <div class="iconBox"><svg-icon iconClass='acPrice' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">24H退款</div>
                            </div>
                        </div>
                        <div class="gameBtn" v-else-if="isActive == 'account'">  
                            <!-- 下面卖点鼠标画上显示的盒子 -->
                                <transition name="animeHover">
                                <div class="gameBtnPublicHoverBox border_radius_4 ft14 color_white_06 RobotoRegular" v-show="hoverIsShow">
                                    {{rightInfoData[isFouch]}}
                                </div>
                            </transition>
                            <div class="fastRefundBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" style="margin-right:16px;" @mouseenter="iconFocus(3)" @mouseleave="iconFocusLeave(3)">
                                <div class="iconBox"><svg-icon iconClass='security' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">独享游戏</div>
                            </div>
                            <div class="payPalBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" @mouseenter="iconFocus(4)" @mouseleave="iconFocusLeave(3)">
                                <div class="iconBox"><svg-icon iconClass='gift' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">官方正版</div>
                            </div>
                            <div class="discountBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" @mouseenter="iconFocus(5)" @mouseleave="iconFocusLeave(0)">
                                <div class="iconBox"><svg-icon iconClass='acPrice' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">未玩退款</div>
                            </div>

                        </div>
                    </div>
                    <!-- 底部按钮 -->
                    <div class="gameInfoPurchase">
                        <div class="topPrice">
                            <div class="gameInfoDiscount ft22 color_white_1 back2 color1">{{ ( (gamePriceData.price/gameInfo.steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
                            <div class="gameInfoPresentPrice ft22 color3 margin_left_20">￥{{gamePriceData.price}}</div>
                            <div class="gameInfoOriginalPrice ft16 color_white_06 margin_left_10 textDecor">￥{{gameInfo.steamPrce}}</div>
                        </div>
                        <div class="btmBuyBtn back5" @click="buyGame">     <!--  @click="gameStock" -->
                            <div class="iconBox"><svg-icon iconClass='gouwuche' className='svg_icon'></svg-icon></div>
                            <div class="textBox ft20 color_white_1">立即购买</div>
                        </div>
                    </div>
                </div>
                <!-- 没有状态 -->
                <div class="rightGameInfoBox" v-else>
                    <!-- 外层盒子 -->
                    <div class="gameInfoType noState">
                        <!-- 头部 -->
                        <div class="onlyPlayTogether">
                            <!-- <div class="iconBox"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon></div> -->
                            <div class="margin_left_18 ft18 ft_weight color_white_06">暂不销售</div>
                        </div>
                        <!-- 图片文案 -->
                        <div class="gameInfoIntroduce">
                            <div class="gameImgBox">
                                <img :src="gameInfo.detailedInfo.image" alt="">
                            </div>
                            <p class="gameInfoSynopsis textOver5 ft14 color_white_06 RobotoRegular">
                               {{  gameInfo.detailedInfo.introduce }}
                            </p>
                        </div>
                         <!-- 底部按钮 -->
                        <div class="gameInfoPurchase">
                           <div class="noStateImgBox">
                               <div class="noStateContentBox">
                                   <div class="leftImg noState_bg"></div>
                                   <div class="rightText ft20 RobotoBold color_white_06">暂不销售</div>
                               </div>
                           </div>
                            <div class="btmBuyBtn back5" :class="noStateBtnType == false?'noStateBtnSty':''"  @click="noState">
                                <div class="textBox ft20 color_white_1 RobotoBold">添加到愿望清单</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部描述 语言 详细信息 -->
            <div class="aboutGamesInfo">
                <!-- 左边游戏信息 -->
                <div class="leftGameInfo">
                    <div class="gameInfoTopBtnBox">
                        <div class="descriptionBtn BangersRegular" :class="gameInfoContentActive==1?'gameInfoBtnActive':''" @click="btnClick(1)">游戏简介</div>
                        <div class="minimumRequirementsBtn BangersRegular" :class="gameInfoContentActive==2?'gameInfoBtnActive':''" @click="btnClick(2)">推荐配置</div>
                        <!-- <div class="languageBtn BangersRegular" :class="gameInfoContentActive==3?'gameInfoBtnActive':''" @click="btnClick(3)">LANGUAGE</div> -->
                        <div class="gameInfoActiveLine back5" :style="gameInfoContentActive == 1?'left:26px':gameInfoContentActive==2?'left:172px':'left:393px'"></div>
                    </div>
                    <div class="gameInfoContentBox">
                        <div class="gameInfoContentDescription" v-if="gameInfoContentActive == 1">
                            <Description :description="gameInfo.detailedInfo"></Description>
                        </div>
                        <div class="gameInfoContentMinimumRequirements" v-else-if="gameInfoContentActive == 2">
                            <MinimumRequirements :systemNeedsMins="gameInfo.detailedInfo.systemNeedsMin | capitalize" :systemNeedsRecommends="gameInfo.detailedInfo.systemNeedsRecommend | capitalize"></MinimumRequirements>
                        </div>
                    </div>
            </div>
            <!-- 右边游戏信息 -->
            <div class="rightGameInfo">
                <div class="gameInfoContentLanguage">
                    <div class="languageBtn BangersRegular ft16 color_white_1">语言</div>
                        <ContentLanguage :supportedlang="gameInfo.attributes.supportedlang"></ContentLanguage>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <noLoginPaymentOrder v-if="ifNoLoginPaymentOrder"  :noLoginPaymentOrderData="noLoginPaymentOrderData" @change="isNoLoginPaymentOrder"></noLoginPaymentOrder>
    <alertModelPayment v-if="ifModelShowData" :ifModelType="ifModelTypeData" @change="isAertModelShow"></alertModelPayment>
    <firstOrderModel v-if="displayFirstOrderImmunityModel" :ifModelType="queryFirstOrderImmunityData" @change="displayFirstOrderImmunityModelFun"></firstOrderModel>
    <alertModelPlayTogetherExplain v-if="playTogetherExplainModel" @changeAlertModelPlayTogetherExplain="isPlayTogetherExplainModel"></alertModelPlayTogetherExplain>
    <alertModelError v-if="ifStockModel" iserrtype="1" @change="ifStockModelFun"></alertModelError>
</div>
</template>

<script>
import Description from '@/components/gameDetails/Description';
import MinimumRequirements from '@/components/gameDetails/MinimumRequirements';
import ContentLanguage from '@/components/gameDetails/ContentLanguage';
import alertModelError from '@/components/AlertModel/alertModelError'
import alertModelPayment from '@/components/AlertModel/alertModelPayment'
import alertModelPlayTogetherExplain from '@/components/AlertModel/alertModelPlayTogetherExplain'
import noLoginPaymentOrder from '@/components/AlertModel/noLoginPaymentOrder'
import firstOrderModel from '@/components/firstOrderFloat/firstOrderModel'  //首单全免弹框
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
import {setStore,getStore,removeStore}  from '@/utils/storage'
import { setInterval,setTimeout, clearInterval } from "timers";
// import index_oldVue from '../register/index_old.vue';
export default {
    name: 'gameDetails',
    store,
    inject:['reload','openRegister'],
    components: {
        Description,
        MinimumRequirements,
        ContentLanguage,
        JumpTo,
        alertModelError,
        alertModelPayment,
        alertModelPlayTogetherExplain,
        noLoginPaymentOrder,
        firstOrderModel
    },
    data(){
        return {
            isActive:'together', //合玩或者独享游戏标识
            isFouch: 0,
            hoverIsShow:false,
            // gamelabel:['Racing game','Action adventure','electronic'],
            gametype:3,
            gameInfoContentActive:1,
            queryWeb:'', //获取页面路径传来的参数
            gameInfo:'',  //详情页面数据
            findSaleData:'',  //游戏售卖价格数据
            togetherData:'',    //合玩模式数据
            accountData:'',      //账号模式数据
            gamePriceData:'',     //账号或者合玩渲染数据的变量
            buyGamePrame:{},      //购买游戏数据
            swiperSlides:[],       //所有轮播的数据
            swiperActive:0,     //略缩图点击的下标
            isVideo:[],      //有视频的元素下标
            isPlayVideo:true, //当前播放的是视频还是图片
            itemSrc:'',    //当前 视频 或者 图片 的链接
            // 略缩图轮播
            gallerythumbs: {
                slidesPerView: 'auto',
                freeMode: true,
                spaceBetween: 16,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            playTogetherExplainModel:false,  //合玩模式弹出控制
            rightInfoData:[
            '官方正版游戏，拒绝盗版放心游玩',
            '购买后游戏极速发货，无需等待直接开玩',
            '假如游戏无法游玩，24小时内可申请退款，请放心购买',
            '独享游戏账号，享受云存档服务（需游戏本身支持）',
            '官方正版游戏，拒绝盗版，放心游玩',
            '如游戏未启动，可在12小时内申请退款，请放心购买'],
            noStateBtnType:true,  //没有状态按钮的状态控制

            ifModelShowData:false,  //是否显示支付弹出框
            ifModelTypeData:{},  //传给弹框的数据

            ifNoLoginPaymentOrder:false,  //是否显示未登录支付弹出框
            
            ifStockModel:false,  //是否显示库存不足弹出
            iserrtype:6,

            isQueryFirstOrderImmunity:false, // 首单全免默认参加过  true 可以参与 false 不可以参与
            queryFirstOrderImmunityData:{}, //首单全免的返回数据
            displayFirstOrderImmunityModel:false, //是否显示首单全免弹框
            fiveSecondsShowFirstOrderTimer: null,  //5秒后显示

            // 获取当前游戏有没有合完
            nowGameModelType:0,
            //  $store.getters.getFirstOrder
        }
    },
    activated(){
        this.inits()
        //在获取一次渠道id
        if(!!window.sendCef){
            window.sendCef("get_channel_id","");
        }else{
            console.log('没有cef方法 不能获取渠道id')
        }
        // 调用5秒后出现弹框
        // this.fiveSecondsShowFirstOrderTimerFun()
        // 调用5秒后出现弹框
        if(!!this.$store.getters.getStorage){
            this.fiveSecondsShowFirstOrderTimerFun()
        }
        
    },
    updated(){
        this.$nextTick(()=>{
            const swiperThumbs = this.$refs.gallerythumbss.swiper
        })
    },
    watch:{
        //监听是否点击了首单全免的下单按钮
        isFirstOrderClick(cur,old){
            if(cur){
                this.buyGame()
            }
        }
    },
    computed:{
        //计算属性取值 用于监听是否点击了首单全面的下单按钮
        isFirstOrderClick(){
            return this.$store.getters.getIsFirstOrderClick
        }
    },
    methods:{
        // 切换略缩图事件
        changeSwiper(index,itemSrc){
            this.swiperActive = index
            this.itemSrc = itemSrc
            if(itemSrc.indexOf('.mp4') > 0){
                this.isPlayVideo = true
            }else{
                this.isPlayVideo = false
            }
        },
        btnClick(num){
            this.gameInfoContentActive = num
        },
        inits(){
            var _this = this;
            _this.queryWeb = _this.$route.query.appId  //获取页面路径传来的参数
            // 游戏详情  gameInfo
            _this.$fetch('/game/info',{'appId':_this.queryWeb})//_this.queryWeb
                .then((response) => {
                    _this.gameInfo = response
                    // _this.$nextTick(()=>{
                        _this.swiperSlides = response.gameImages
                        // 获取视频的元素
                        _this.swiperSlides.forEach(function(v,l){
                            if(v.carouselAddress.indexOf('.mp4') > 0){
                                _this.isVideo.push(l)
                            }
                        })
                        if(_this.isVideo.length > 0){
                            //添加第一次进来的默认值
                            _this.itemSrc = response.gameImages[_this.isVideo[0]].carouselAddress
                            _this.isPlayVideo = true
                        }else{
                             _this.itemSrc = _this.swiperSlides[0].carouselAddress
                             _this.isPlayVideo = false
                        }
                        
                    // })
                })
            // 游戏售卖价格数据  findSaleData
            _this.$fetch('/game/findSaleData',{'appId':this.$route.query.appId})
                .then((response) => {
                    _this.findSaleData = response.data || ''          //全部模式数据
                    _this.togetherData = response.data.together || ''     //合玩模式
                    _this.accountData = response.data.account  || ''      //账号模式
                    _this.gamePriceData = response.data.together || response.data.account || ''//账号或者合完渲染的数据  默认为合玩
                    _this.isActive = Object.keys(response.data)[0]
                })
        },
        //查询是否能参加首单全免活动
        async queryFirstOrderImmunity(){
            if(!!this.$store.getters.getStorage){  //判断用户是否登录 
                await this.$fetch('/activity/join')   //判断是否参加过首单活动
                    .then((response) => {
                        this.isQueryFirstOrderImmunity = response.flag
                        this.queryFirstOrderImmunityData = response.data
                    })
                await this.gameStock() //判断是否购买过游戏或者游戏没有库存
                    
            }
            this.$store.commit('setIsFirstOrderClick',false)
        },
        //合玩或者独享点击事件
        gameTypeClick(data){
            this.isActive = data
            if(data == 'together'){
                this.$nextTick(()=>{
                    this.gamePriceData= this.togetherData
                })
            }else if(data == 'account'){
                this.$nextTick(()=>{
                    this.gamePriceData= this.accountData
                })
            }
        },
        // 购买游戏
        async buyGame(){
            await this.queryFirstOrderImmunity()
            if(this.ifStockModel){
                console.log('没有库存 出现没有库存框')
                return
            }else if(!this.$store.getters.getStorage){
                // 没有登录的订单数据
                this.noLoginPaymentOrderData = {
                    'appId':this.gamePriceData.appId,
                    'productId':this.gamePriceData.id,
                    'channelId': this.$store.getters.getChannelIdFun,
                    'image': this.gameInfo.image,
                    'englishName': this.gameInfo.englishName,
                    'chinaName': this.gameInfo.chinaName,
                    'model': this.gamePriceData.model,
                }
                this.ifNoLoginPaymentOrder = true
				// if(!!this.openRegister){
                //     this.openRegister(true)
				// }else{
				// 	console.log('没得openRegister方法')
                // }
                return
            }else{
                //登录后判断是否参加过首单全免活动
                if(this.isQueryFirstOrderImmunity && this.isActive == 'together'){  //可以参加 ture
                    //定义首单全免的弹框数据
                    this.queryFirstOrderImmunityData = Object.assign(
                        this.queryFirstOrderImmunityData,
                        {
                            'appId':this.gamePriceData.appId,
                            'productId':this.gamePriceData.id,
                            'payType':2,
                            'balanceType':0,
                            'channelId': this.$store.getters.getChannelIdFun,
                            'image': this.gameInfo.image,
                            'chinaName': this.gameInfo.chinaName,
                            'englishName': this.gameInfo.englishName,
                            'id': this.gamePriceData.id,
                            'model': this.gamePriceData.model,
                            'ratio':this.gamePriceData.ratio,
                            'price':this.gamePriceData.price,
                            'steamPrce':this.gameInfo.steamPrce,
                        }
                    )
                    console.log(this.queryFirstOrderImmunityData)
                    this.displayFirstOrderImmunityModel  = true  //显示首单全免弹框
                }else{    //不可以参加首单全免
                    // 登录的订单数据
                    this.ifModelTypeData = {
                        'appId':this.gamePriceData.appId,
                        'productId':this.gamePriceData.id,
                        'payType':2,
                        'balanceType':0,
                        'channelId': this.$store.getters.getChannelIdFun,
                        'image': this.gameInfo.image,
                        'chinaName': this.gameInfo.chinaName,
                        'englishName': this.gameInfo.englishName,
                        'id': this.gamePriceData.id,
                        'model': this.gamePriceData.model,
                        'ratio':this.gamePriceData.ratio,
                        'price':this.gamePriceData.price,
                        'steamPrce':this.gameInfo.steamPrce,
                    }
                    console.log('创建订单时传给弹框的渠道id'+this.$store.getters.getChannelIdFun)
                    this.ifModelShowData = true
                }
            }
        },
        // 游戏库存
        async gameStock(){
            await this.$fetch('/order/stock',{'productId':this.gamePriceData.id,'appId':this.$route.query.appId})
                .then((response) => {
                   if(response.flag){
                    //    this.buyGame()
                   }else{
                       this.ifStockModel = true
                       console.log('没有库存')
                       return
                   }
                })
        },
        ifStockModelFun(data){  //库存不足弹出
            this.ifStockModel = data
        },
        // 没有的购买按钮点击方法
        noState(){
            if(this.noStateBtnType == false){
                return
            }else{
                this.noStateBtnType = false
            }
            // JumpTo(5,{appId: this.gamePriceData.appId,productId:this.gamePriceData.id})
        },
        iconFocus(data){
            this.isFouch = data
            this.hoverIsShow = true
        },
        iconFocusLeave(data){
             this.isFouch = data
             this.hoverIsShow = false
        },
        // 接收子组件传来的值确定弹框是否关闭
        isAertModelShow(data){
            this.ifModelShowData = data
        },
        // 接收子组件传来的值确定弹框是否关闭  合玩弹框
        isPlayTogetherExplainModel(data){
            this.playTogetherExplainModel = data
        },
        // 接收子组件传来的值确定弹框是否关闭  首单全免
        displayFirstOrderImmunityModelFun(data){
            this.displayFirstOrderImmunityModel = data
            // 判断是否需要刷新页面 因为在详情未登录购买 会有登录状态 跳转我的游戏需刷新整体取本地存储 
            if(!!getStore({name:'ifRelodMygame',type:false})){
                removeStore({name:'ifRelodMygame'})  //删除后在刷新页面
                this.reload()  //刷新页面
            }
        },
        
        // 接收没登陆弹出的付款框
        isNoLoginPaymentOrder(data,n){
            this.ifNoLoginPaymentOrder = data
            if(n == 'openFirstOrder'){  //表示用户在未登录时点击了下单 需要创建活动下单
                this.buyGame()
            }else if(n == 'openBuyGame'){
                this.buyGame()
            }else{
                // 判断是否需要刷新页面 因为在详情未登录购买 会有登录状态 跳转我的游戏需刷新整体取本地存储 
                if(!!getStore({name:'ifRelodMygame',type:false})){
                    removeStore({name:'ifRelodMygame'})  //删除后在刷新页面
                    this.reload()  //刷新页面
                }
            }
            
        },
        // 合玩说明弹出
        playTogetherExplainModelFun(data){
            this.playTogetherExplainModel = true
        },
        //5秒后显示首单全免
        fiveSecondsShowFirstOrderTimerFun(){
            // 游戏售卖价格数据  获取当前游戏有没有合完模式
            this.$fetch('/game/findSaleData',{'appId':this.queryWeb})
                .then((response) => {
                    console.log(!!response.data.together)
                    if(!!response.data.together){
                        this.setTimeoutFun()
                    }
                })
        },
        setTimeoutFun(){
            var fiveSecondsShowFirstOrderTimer = setTimeout(() => {
                if(this.$route.path == '/gameDetails'){
                    if(!!this.$store.getters.getStorage){  //判断用户是否登录 
                        this.$fetch('/activity/join')   //判断是否参加过首单活动
                            .then((response) => {
                                if(response.flag){
                                    // 只弹一次 
                                    if(this.$store.getters.getFirstOrder){

                                    }else{
                                        this.$store.commit('setFirstOrder',true)
                                        this.$store.commit('setFirstOrderType',3)
                                    }
                                }
                            })
                    }
                }else{
                    fiveSecondsShowFirstOrderTimer = null
                    clearInterval(fiveSecondsShowFirstOrderTimer)
                }
                fiveSecondsShowFirstOrderTimer = null
                clearInterval(fiveSecondsShowFirstOrderTimer)
            }, 5000);
        },
    },
    
    filters:{
        capitalize: function (value) {
            if (!value) return ''
            value = JSON.parse(value)
            return value
        }
    },
    // 自定义指令和过滤器 可以不要了先放着
    // directives:{
    //     imgorvideo:{
    //         bind(el, binding, vnode){
    //             var fileType = binding.value.slice(binding.value.lastIndexOf('.')) 
    //             var elHtml ='';
    //             if(fileType == '.jpg' || fileType == '.jpeg' || fileType == '.png'){
    //                 elHtml += "<img class='imgorvideo' src="+binding.value+" alt=''>";
    //             }else if(fileType == '.mp4'){
    //                 elHtml += "<video class='imgorvideo' controls autoplay muted src="+binding.value+"></video>";
    //             }
    //             el.innerHTML = elHtml
    //         }
    //     }
    // }
}
</script>
<style>
.imgorvideo{display: block;width: 100%;height: 100%;}
</style>
<style lang="scss" scoped>
.detailsBgBox{
    width: 1280px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    background-repeat: no-repeat;
    position: relative;
    .detailsBgBoxBg{
        width: 101%;
        height: 600px;
        position: absolute;
        top: -1px;
        left: -1px;
    }
}
.gameDetailsMainBox{
    width: 100%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    // 游戏详情内容盒子
    .gameDetailsContentBox{
        width: 1156px;
        height: 100%;
        margin: 26px auto 0;
        position: relative;
        // 上部轮播和游戏信息
        .bannerGameInfo{
            width: 100%;
            height: 581px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background:linear-gradient(270deg,rgba(42,44,52,0.4) 0%,rgba(42,44,52,1) 100%);
            .leftBannerBox{
                width: 733px;
                height: 100%;
                .bannerTopTitle{
                    width: 100%;
                    height: 74px;
                    .gameNameBox{
                        width: 100%;
                        height: 25px;
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        .gameName{height: 25px;line-height: 25px;}
                        .gameNameIcon{
                            width: 14px;
                            height: 14px;
                            border-radius: 50%;
                            &>img{width: 100%;height: 100%;display: block;border-radius: 50%;}
                        }
                    }
                    .gameLabelBox{
                        width: 100%;
                        height: 49px;
                        display: flex;
                        .gameLabelItem{
                            width: auto;
                            height: 12px;
                            text-align: center;
                            line-height: 12px;
                            padding: 6px 7px;
                            border-radius: 2px;
                            background-color: rgba(0, 0, 0, 0.2);
                        }
                    }
                }
                .bannerSwiper{
                    width: 100%;
                    height: 511px;
                    position: relative;
                }
                .bannerPlayBox{
                    width: 100%;
                    height: 412px;
                }
                .bannerPlayBox>video,
                .bannerPlayBox>img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                .sketchMapOuter{
                    width: 100%;
                    height: auto;
                    overflow: hidden;
                }
                .sketchMapInner{
                    width: 100%;
                    height: auto;
                }
                .bannerChoiceBox{
                    width: 100%;
                    height: 81px;
                    cursor: pointer;
                    margin-top: 15px;
                    background:linear-gradient(270deg,rgba(42,44,52,0.4) 0%,rgba(42,44,52,1) 100%);
                }
            }
            .rightGameInfoBox{
                width: 391px;
                height: 100%;
                background-color:rgba(0,0,0,0.4);
                .gameInfoType{
                    width: 100%;
                    height: 60px;
                    .onlyPlayTogether{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        background-color:rgba(0,0,0,0.2);
                        border-radius:4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .playTogetherExplain{
                            width: 16px;
                            height: 16px;
                            margin-left: 8px;
                        }
                        .iconBox{width: 24px;height: 24px;display: block;border-radius: 50%;}
                        .centerIcon{
                            display: flex;
                            align-items: center;
                        }
                    }
                    .onlyExclusive{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        background-color:rgba(0,0,0,0.2);
                        border-radius:4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .iconBox{width: 24px;height: 24px;display: block;border-radius: 50%;}
                        .playTogetherExplain{
                            width: 16px;
                            height: 16px;
                            margin-left: 8px;
                        }
                    }
                    .playTogetherAddExclusive{
                        width: 100%;
                        height: 60px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        .lineBox{width: 50%;height: 2px;position: absolute;bottom: 0;left: 0;transition: left 0.3s;}
                        .onlyPlayTogether{
                            // width: 100%;
                            // height: 100%;
                            // border-radius:4px;
                            // cursor: pointer;
                            // display: flex;
                            // justify-content: center;
                            // align-items: center;
                            // opacity: 0.6;
                            // &>img{width: 20px;height: 20px;display: block;border-radius: 50%;}
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                            .iconBox{
                                width: 24px;
                                height: 24px;
                                &>img{width: 100%;height: 100%; display: block;border-radius: 50%;}
                            }
                            .playTogetherExplain{
                                width: 16px;
                                height: 16px;
                                margin-left: 8px;
                            }
                            .centerIcon{
                                display: flex;
                                align-items: center;
                            }
                        }
                        .onlyPlayTogether.active{
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                            border-radius:4px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: row;
                            &>img{width: 20px;height: 20px;display: block;border-radius: 50%;}
                        }
                        .onlyExclusive{
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                            .iconBox{
                                width: 24px;
                                height: 24px;
                                &>img{width: 100%;height: 100%; display: block;border-radius: 50%;}
                            }
                            .playTogetherExplain{
                                width: 16px;
                                height: 16px;
                                margin-left: 8px;
                            }
                        }
                        .onlyExclusive.active{
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                            border-radius:4px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: row;
                            &>img{width: 20px;height: 20px;display: block;border-radius: 50%;}
                        }
                        
                    }
                    

                }
                .gameInfoIntroduce{
                    width: calc(100% - 32px);
                    height: 381px;
                    margin-top: 17px;
                    padding: 0 16px;
                    .gameImgBox{
                        width: 100%;
                        height: 175px;
                        border-radius:8px;
                        &>img{width: 100%;height: 100%; display: block;border-radius:8px;}
                    }
                    .gameInfoTitle{
                        width: 100%;
                        height: 19px;
                        line-height: 19px;
                        margin-top: 25px;
                    }
                    .gameInfoSynopsis{
                        width:100%;
                        height:110px;
                        line-height:22px;
                        letter-spacing:1px;
                        margin-top: 20px;
                    }
                   
                    .gameBtn{
                        width: 100%;
                        height: 64px;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        margin-top:11px;
                        cursor: pointer;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        position: relative;
                        .gameBtnPublicHoverBox{
                            width: 100%;
                            height: 120px;
                            padding: 16px;
                            box-sizing: border-box;
                            background: rgba(42, 44, 52, 1);
                            position: absolute;
                            left: 0;
                            top: -118px;
                            box-shadow:0px 10px 24px 0px rgba(0,0,0,0.1);
                        }
                        .animeHover{}
                        .animeHover-enter{ top: 0;opacity: 0; }
                        .animeHover-enter-active {
                            top: -58px;
                            opacity: 0;
                            transition: all 0.3s linear;
                        }
                        .animeHover-enter-to /* .fade-leave-active below version 2.1.8 */ {
                            top: -118px;
                            opacity: 1;
                        }
                        .animeHover-leave{
                            top: -118px;
                            opacity: 1;
                        }
                        .gameBtnPublicHover::before{
                            content: '';
                            position: absolute;
                            top: -14px;
                            left: 50%;
                            transform: translateX(-7px);
                            width: 0;
                            height: 0;
                            border-left: 10px solid transparent;
                            border-right: 10px solid transparent;
                            border-top: 14px solid rgba(42, 44, 52, 1);
                            display: none;
                        }
                        .gameBtnPublicHover:hover.gameBtnPublicHover::before{display: block;}
                        .gameBtnPublic{
                            width: 95px;
                            height: 18px;
                            background-color: rgba(0, 0, 0, 0.2);
                            border-radius:21px;
                            padding: 7px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            position: relative;
                            .iconBox{
                                width: 24px;
                                height: 24px;
                                &>img{width: 100%;height: 100%; display: block;border-radius: 50%;}
                            }
                            .textBox{
                                margin-left: 7px;
                                font-size: 12PX;
                            }
                        }
                    }

                }
                .gameInfoPurchase{
                    width: 100%;
                    height: 124px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .topPrice{
                        width: 100%;
                        height: 76px;
                        border-radius:0px 0px 4px 4px;
                        background-color: rgba(0, 0, 0, 0.4);
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        .gameInfoDiscount{
                            width: 73px;
                            height: 36px;
                            text-align: center;
                            line-height: 36px;
                            position: relative;
                        }
                        .gameInfoDiscount::after{
                            border: 18px solid transparent;
                            border-left: 12px solid rgba(76, 107, 34, 1);
                            width: 0;
                            height: 0;
                            position: absolute;
                            right: -30px;
                            top: 0;
                            content: ' '
                        }
                        .gameInfoPresentPrice{
                            height: 30px;
                            line-height: 30px;
                        }
                        .gameInfoOriginalPrice{
                            height: 20px;
                            line-height: 20px;
                        }
                    }
                    .btmBuyBtn{
                        width: 100%;
                        height: 48px;
                        border-radius:0px 0px 4px 4px;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .iconBox{
                            width: 18px;
                            height: 18px;
                            &>img{width: 100%;height: 100%; display: block;}
                        }
                        .textBox{
                            margin-left: 7px;
                        }
                    }
                }
            }
            // 没有状态的样式  
            .rightGameInfoBox{
                .noState{
                    // 上面的标题
                    .onlyPlayTogether{
                        justify-content: start;
                        opacity: 1;
                        .centerIcon{
                            display: flex;
                            align-items: center;
                        }
                    }
                     // 图片下面的
                    .gameInfoIntroduce{
                        height: 330px;
                        // .gameInfoSynopsis{
                        //     line-height:22px;
                        //     letter-spacing:2px;
                        //     margin-top: 24px;
                        // }
                    }
                    
                    // 底部按钮
                    .gameInfoPurchase{
                        height: 188px;
                        .noStateImgBox{
                            width: calc(100% - 32px);
                            padding: 0 16px;
                            height: 139px;
                            margin: 0 auto;
                            .noStateContentBox{
                                width: 100%;
                                height: 100%;
                                border-top: 1px solid rgba(255, 255, 255, 0.1);
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .leftImg{
                                    width: 150px;
                                    height: 114px;
                                }
                                .rightText{
                                    margin-left: 4px;
                                }
                            }
                        }
                        .btmBuyBtn{}
                        .noStateBtnSty{
                            cursor: auto;
                            background-color:rgba(56,59,71,1);
                            .textBox {
                                color:rgba(255,255,255,0.4);
                            }
                        }
                    }
                   
                }
            }
        }
        // 底部描述 语言 详细信息
        .aboutGamesInfo{
            width: 100%;
            height: auto;
            margin-top: 31px;
            display: flex;
            justify-content: space-between;
            // 左边
            .leftGameInfo{
                width: 733px;
                border-radius:4px;
                .gameInfoTopBtnBox{
                    // width: calc(100% - 32px);
                    height: 52px;
                    margin: 0 auto;
                    padding: 0 26px;
                    background-color: rgba(0, 0, 0, 0.4);
                    display: flex;
                    justify-content: start;;
                    align-items: center;
                    position: relative;
                    &>div{
                        width: auto;
                        height: 23px;
                        font-size: 18PX;
                        margin-right: 42px;
                        cursor: pointer;
                        color: rgba(255, 255, 255, 0.6);
                    }
                    .gameInfoBtnActive{
                        color: rgba(255, 255, 255, 1);
                    }
                    .gameInfoActiveLine{
                        width:62px;
                        height:3px;
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        transition: all 0.5s;
                    }
                }
                .gameInfoContentBox{
                    // width: calc(100% - 32px);
                    height: auto;
                    margin: 0 auto;
                    background-color: rgba(0, 0, 0, 0.4);
                    padding: 0 26px 50px;
                    .gameInfoContentDescription{
                        width: 100%;
                    }
                    .gameInfoContentMinimumRequirements{
                        width: 100%;
                    }
                   
                }
            }
            // 右边
            .rightGameInfo{
                width: 391px;
                box-sizing: border-box;
                //卖点介绍
                .gameSellingPointIntroduce{
                    width: 100%;
                    padding: 16px;
                    height: 470px;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius:4px;
                    margin-bottom: 32px;
                    box-sizing: border-box;
                    &>div{
                        width: 100%;
                    }
                    .textBox1{
                        height: 90px;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        line-height:22px;
                        letter-spacing:1px;
                        margin-bottom: 27px;
                    }
                    .textBox2{margin-bottom: 9px;}
                    .textBox3{margin-bottom: 29px;}
                    .textBox4{margin-bottom: 11px;}
                    .textBox5{}

                }
                // 语言说明
                .gameInfoContentLanguage{
                    width: calc(100% - 32px);
                    padding: 16px;
                    height: auto;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius:4px;
                    .languageBtn{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
        }
    }
}
.active{
    opacity: 1 !important;
}
.swiperSlides{
    width: 148px;
    height:100%;
    text-align: center;
    line-height: 81px;
    opacity: 0.6;
    box-sizing: border-box;
    img{
        display: block;
        width: 100%;
        height: 100%;
    }
}
.swiperSlides:hover{opacity: 1;}
// .swiperSlides:hover .solidImgBox>img{transform: scale(1.1)}
.swiperSlides img{transition: all 0.3s linear}
.swiperSlides.active{
    border-radius:4px;
    border:2px solid rgba(86, 159, 203, 1);
    box-sizing: border-box;
    position: relative;
}
.swiperSlides.active::before{
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-7px);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid rgba(86, 159, 203, 1);
}
.swiper-container{padding-top: 0.07rem;}
.solidImgBox{
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
}
.isVideo{
    position: relative;
}
.isVideo>.isVideoBgBox{
   display: block;
}
.isVideoBgBox{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    display: none;
    background-color: rgba(0, 0, 0, 0.2);
}
.isVideoBgBox>.iconVideoSvg{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 8;
}
// 视频或者图片出现的动画
.videoAnime{}
.videoAnime-enter{opacity: 0; }
.videoAnime-enter-active {
    opacity: 0;
    transition: all 1s;
}
.videoAnime-enter-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 1;
}
.videoAnime-leave{
    opacity: 1;
}

// 
.detailsVideoBtnLeft_bg,
.detailsVideoBtnRight_bg{
    width: 76px;
    height: 81px;
    top: 29px;
}
.detailsVideoBtnLeft_bg{left: 0;}
.detailsVideoBtnRight_bg{right: 0;}
</style>
