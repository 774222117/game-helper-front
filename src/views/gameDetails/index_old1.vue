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
                 <!-- 右边信息 -->
                <div class="rightGameInfoBox">
                    <!-- title -->
                    <div class="bannerTopTitle">
                        <!-- 中文名字和icon -->
                        <div class="gameNameBox">
                            <div class="gameName ft18 color_white_1">{{gameInfo.chinaName == '' ? gameInfo.englishName : gameInfo.chinaName}}</div>
                            <div class="gameNameIcon margin_left_8"><svg-icon iconClass='steamIcon' className='svg_icon'></svg-icon></div>
                            <div class="gameNameIcon margin_left_6"><svg-icon iconClass='windowIcon' className='svg_icon'></svg-icon></div>
                        </div>
                        <!-- 英文名字 -->
                        <div class="gameEnglishName ft14 color_white_1">{{gameInfo.englishName}}</div>
                        <!-- 标签 -->
                        <div class="gameLabelBox margin_top_10">
                            <transition v-for="(n, i) in gameInfo.attributes.category3">
                                <div class="gameLabelItem margin_right_8 ft12 color_white_08" v-if="i<3">{{n.title}}</div>
                            </transition>
                        </div>
                        <!-- 简介 -->
                        <div class="gameInfoSynopsis textOver3 ft12 color_white_1">{{ gameInfo.detailedInfo.introduce }}</div>
                    </div>
                    <!-- content 下面的按钮与价格等 -->
                    <div class="contentBtns"  v-if="findSaleData">
                        <div class="contentBtnsTop">
                            <!-- 价格 多少人游玩 -->
                            <div class="pricePeople">
                                <!-- 原价 -->
                                <div class="originalPrice">
                                    <div class="ft12 color_white_1">原价：</div>
                                    <div class="ft12 color3 textDecor">￥{{gameInfo.steamPrce}}</div>
                                </div>
                                <!-- 昨日游玩人数 -->
                                <div class="playNumber margin_right_8">
                                    <div class="ft12 color_white_1 margin_right_4">昨日</div>
                                    <div class="peoplePhoto ft12 color_white_1 margin_right_4">
                                        <div><img :src="randomInt.randomInt1Img" alt=""></div>
                                        <div><img :src="randomInt.randomInt2Img" alt=""></div>
                                        <div><img :src="randomInt.randomInt3Img" alt=""></div>
                                    </div>
                                    <div class="ft12 color3">{{gameInfo.playersDay}} </div>
                                    <div class="ft12 color_white_1">人游玩 </div>
                                    
                                </div>
                            </div>
                            <!-- 畅享 -->
                            <div class="share gameTypeSty" v-if="togetherData.model == 2" @click="gameTypeClick('together')">
                                <div class="gameTypeStyMaskBg" :class="isActive=='together'?'gameTypeStyActive':''" ></div>
                                <div class="gameTypeStyMask">
                                    <div class="leftBox">
                                        <div class="shareText ft16 ft_weight color_white_1">畅享</div>
                                        <div class="playTogetherExplain opc_hover" @click="playTogetherExplainModelFun"><svg-icon iconClass='ask' className='svg_icon'></svg-icon> </div>
                                    </div>
                                    <div class="rightBox">
                                        <div class="priceInfo">
                                            <div class="ft18 color3 font_weight">¥{{findSaleData.together.price}}</div>
                                            <div class="ft12 color_white_1">VIP价：¥{{findSaleData.together.memberPrice}}</div>
                                        </div>
                                        <div class="priceSave detailsPurchaseBg_bg">
                                            <div class="ft14 color_white_1 ft_weight">立省</div>
                                            <div class="ft14 color_white_1 ft_weight">¥{{Math.floor(findSaleData.together.discount)}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- 试玩 -->
                            <div class="trial gameTypeSty" v-if="tryData.model == 3" @click="gameTypeClick('try')">
                                <div class="gameTypeStyMaskBg" :class="isActive=='try'?'gameTypeStyActive':''" ></div>
                                <div class="gameTypeStyMask">
                                    <div class="leftBox">
                                        <div class="shareText ft16 ft_weight color_white_1">试玩</div>
                                    </div>
                                    <div class="rightBox">
                                        <div class="priceInfo">
                                            <div class="ft18 color3 font_weight">¥{{findSaleData.try.price}}/{{findSaleData.try.hour}}小时</div>
                                            <div class="ft12 color_white_1">VIP送{{findSaleData.try.ticketHour}}小时</div>
                                        </div>
                                        <div class="priceSave detailsPurchaseBg_bg">
                                            <div class="ft14 color_white_1 ft_weight">¥{{findSaleData.try.discount}}</div>
                                            <div class="ft14 color_white_1 ft_weight">每小时</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <!-- 独享 -->
                            <div class="private gameTypeSty"  v-if="accountData.model == 1" @click="gameTypeClick('account')">
                                <div class="gameTypeStyMaskBg" :class="isActive=='account'?'gameTypeStyActive':''" ></div>
                                <div class="gameTypeStyMask">
                                    <div class="leftBox">
                                        <div class="shareText ft16 ft_weight color_white_1">独享</div>
                                    </div>
                                    <div class="rightBox">
                                        <div class="priceInfo">
                                            <div class="ft18 color3 font_weight">¥{{findSaleData.account.price}}</div>
                                            <div class="ft12 color_white_1">VIP价：¥{{findSaleData.account.memberPrice}}</div>
                                        </div>
                                        <div class="priceSave detailsPurchaseBg_bg">
                                            <div class="ft14 color_white_1 ft_weight">立省</div>
                                            <div class="ft14 color_white_1 ft_weight">¥{{Math.floor(findSaleData.account.discount)}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 购买按钮 -->
                        <div class="btmBuyBtn opc_hover8" @click="buyGame">     <!--  @click="gameStock" -->
                            <div class="iconBox"><svg-icon iconClass='gouwuche' className='svg_icon'></svg-icon></div>
                            <div class="textBox ft20 color_white_1">立即购买</div>
                        </div>
                    </div>
                    <!-- 没有状态 -->
                    <div class="noState" v-else>
                       <div class="noStateImgBox noState_bg">
                        </div>
                        <div class="btmBuyBtn" :class="noStateBtnType == false?'noStateBtnSty':''"  @click="noState">
                            <div class="textBox ft20 color_white_1">添加到愿望清单</div>
                        </div>
                    </div>
                    <!-- 图片文案卖点 -->
                    <div class="gameInfoIntroduce">
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
                        <div class="gameBtn" v-else-if="isActive == 'try'">  
                            <!-- 下面卖点鼠标画上显示的盒子 -->
                            <transition name="animeHover">
                                <div class="gameBtnPublicHoverBox border_radius_4 ft14 color_white_06 RobotoRegular" v-show="hoverIsShow">
                                    {{rightInfoData[isFouch]}}
                                </div>
                            </transition>
                            <div class="fastRefundBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" style="margin-right:16px;" @mouseenter="iconFocus(3)" @mouseleave="iconFocusLeave(3)">
                                <div class="iconBox"><svg-icon iconClass='gift' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">官方正版</div>
                            </div>
                            <div class="payPalBtnBox gameBtnPublic gameBtnPublicHover opc_hover6" @mouseenter="iconFocus(4)" @mouseleave="iconFocusLeave(3)">
                                <div class="iconBox"><svg-icon iconClass='lightning' className='svg_icon'></svg-icon></div>
                                <div class="textBox RobotoRegular color_white_1">极速发货</div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部描述 评测  -->
            <div class="aboutGamesInfo">
                <!-- 左边游戏信息 -->
                <div class="leftGameInfo">
                    <div class="gameInfoTopBtnBox">
                        <div class="descriptionBtn ft16" :class="gameInfoContentActive==1?'gameInfoBtnActive':''" @click="btnClick(1)">游戏简介</div>
                        <div class="minimumRequirementsBtn ft16" :class="gameInfoContentActive==2?'gameInfoBtnActive':''" @click="btnClick(2)">精选评测({{commentAllNum}})</div>
                        <!-- <div class="languageBtn" :class="gameInfoContentActive==3?'gameInfoBtnActive':''" @click="btnClick(3)">LANGUAGE</div> -->
                        <div class="gameInfoActiveLine back5" :style="gameInfoContentActive == 1?'left:26px':gameInfoContentActive==2?'left:162px':'left:363px'"></div>
                    </div>
                    <div class="gameInfoContentBox">
                        <div class="gameInfoContentDescription" v-if="gameInfoContentActive == 1">
                            <Description :description="gameInfo.detailedInfo"></Description>
                        </div>
                        
                        <div class="gameInfoContentMinimumRequirements" v-else-if="gameInfoContentActive == 2">
                            <div class="allComments" v-if="!!commentThreeData">
                                <commentPage />
                            </div>
                             <div class="commentContent" v-else>
                                <noComment :heights="'320'" />
                            </div>
                        </div>
                    </div>
                    <!-- 评测 -->
                    <div class="evaluationScreen" v-if="gameInfoContentActive == 1">
                        <div class="title ft16 color_white_1">精选评测 <div class="titleLine back5"></div>  </div>
                        <div class="commentContent" v-if="!!commentThreeData">
                            <transition v-for="(items) in commentThreeData">
                                <Comment :items="items" />
                            </transition>
                            <div class="viweAllComment" @click="btnClick(2)">
                                <div class="texts ft14">查看全部评测</div> 
                                <div class="icons"> <svg-icon iconClass='downArrow' className='svg_icon'></svg-icon> </div> 
                            </div>
                        </div> 
                        <div class="commentContent" v-else>
                            <noComment />
                        </div>

                    </div>
                </div>
           
                <!-- 右边游戏信息 -->
                <div class="rightGameInfo">
                    <!-- 配置信息 -->
                    <div class="configInfo">
                        <MinimumRequirements :systemNeedsMins="gameInfo.detailedInfo.systemNeedsMin | capitalize" :systemNeedsRecommends="gameInfo.detailedInfo.systemNeedsRecommend | capitalize"></MinimumRequirements>
                    </div>
                    <!-- 语言信息 -->
                    <div class="gameInfoContentLanguage">
                        <div class="languageBtn ft16 color_white_1">语言</div>
                        <ContentLanguage :supportedlang="gameInfo.attributes.supportedlang"></ContentLanguage>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <alertModelPlayTogetherExplain v-if="playTogetherExplainModel" @changeAlertModelPlayTogetherExplain="isPlayTogetherExplainModel"></alertModelPlayTogetherExplain>
    <alertModelError v-if="ifStockModel" iserrtype="1" @change="ifStockModelFun"></alertModelError>
    <allOrder v-if="displayAllOrder" @change="displayAllOrderFun" :allOrderData="allOrderData" />
</div>
</template>

<script>
import Description from '@/components/gameDetails/Description';  //详情
import MinimumRequirements from '@/components/gameDetails/MinimumRequirements'; //配置
import ContentLanguage from '@/components/gameDetails/ContentLanguage';  //语言
import Comment from '@/components/comment/comment';  //评论
import noComment from '@/components/comment/noComment';  //没有评论
import commentPage from '@/components/comment/commentPage';  //评论带分页
import alertModelError from '@/components/AlertModel/alertModelError'  //错误 满库存
import alertModelPlayTogetherExplain from '@/components/AlertModel/alertModelPlayTogetherExplain'  //合完模式说明
import allOrder from '@/components/allOrder/allOrder'  //全部订单
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
import {setStore,getStore,removeStore}  from '@/utils/storage'
import { setInterval,setTimeout, clearInterval } from "timers";
import {post} from '@/request/http.js'
// import index_oldVue from '../register/index_old.vue';
export default {
    name: 'gameDetails',
    store,
    inject:['reload','openRegister'],
    components: {
        Description,
        MinimumRequirements,
        ContentLanguage,
        Comment,
        noComment,
        commentPage,
        JumpTo,
        alertModelError,
        alertModelPlayTogetherExplain,
        allOrder
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
            tryData:'',      //试玩模式数据

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

            ifModelTypeData:{},  //传给弹框的数据
            
            ifStockModel:false,  //是否显示库存不足弹出
            iserrtype:6,

            isQueryFirstOrderImmunity:false, // 首单全免默认参加过  true 可以参与 false 不可以参与
            queryFirstOrderImmunityData:{}, //首单全免的返回数据
            fiveSecondsShowFirstOrderTimer: null,  //5秒后显示

            // 获取当前游戏有没有合完
            nowGameModelType:0,
            //  $store.getters.getFirstOrder

            displayAllOrder:false, //全部订单显示隐藏
            allOrderData:'',  //全部订单数据

            randomInt:{
                randomInt1:Math.floor(Math.random() * (32)) + 1,
                randomInt2:Math.floor(Math.random() * (32)) + 1,
                randomInt3:Math.floor(Math.random() * (32)) + 1,
                randomInt1Img: '',
                randomInt2Img: '',
                randomInt3Img: '',
            },

            commentThreeData:{},//三条评测数据
            commentAllNum:0,
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
    mounted(){
        this.randomInt.randomInt1Img = require('@/assets/image/headPortrait/img ('+this.randomInt.randomInt1+').png') 
        this.randomInt.randomInt2Img = require('@/assets/image/headPortrait/img ('+this.randomInt.randomInt2+').png') 
        this.randomInt.randomInt3Img = require('@/assets/image/headPortrait/img ('+this.randomInt.randomInt3+').png') 
    },
    watch:{
        //监听是否点击了首单全免的下单按钮
        isFirstOrderClick(cur,old){
            if(cur){
                this.gameTypeClick('together')
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
                })
            // 游戏售卖价格数据  findSaleData
            _this.$fetch('/game/findSaleData',{'appId':this.$route.query.appId})
                .then((response) => {
                    _this.findSaleData = response.data || ''  //全部模式数据
                    _this.togetherData = _this.findSaleData.together; //合玩模式
                    _this.accountData =  _this.findSaleData.account; //账号模式
                    _this.tryData = _this.findSaleData.try; //试玩
                    // _this.gamePriceData = response.data.together || response.data.account || response.data.try || ''//账号或者合完渲染的数据  默认为合玩
                    
                    if(_this.togetherData && _this.togetherData.model == 2){
                        _this.isActive = 'together'
                        _this.gamePriceData = _this.togetherData
                        _this.$store.commit('setReductionOrder',{'name':_this.gameInfo.chinaName || _this.gameInfo.englishName,'price':_this.togetherData.discount})
                    }else if(_this.accountData && _this.accountData.model == 1){
                        _this.isActive = 'account'
                        _this.gamePriceData = _this.accountData
                        _this.$store.commit('setReductionOrder',{'name':_this.gameInfo.chinaName || _this.gameInfo.englishName,'price':_this.togetherData.discount})  
                    }else{
                        _this.isActive = 'try'
                        _this.gamePriceData = _this.tryData
                    }
                   
                })
            // 游戏评测  comment
             _this.$fetch('/game/listGameComments',{'appid':this.$route.query.appId,'offset':1,'limit':3} )
                .then((response) => {
                   _this.commentThreeData = response.data.rows
                   _this.commentAllNum = response.data.total
                })
                
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
            }else if(data == 'try'){
                this.$nextTick(()=>{
                    this.gamePriceData = this.tryData
                })
            }
        },
        buyGame(){
            //判断登录  判断库存
            if(!!this.$store.getters.getStorage){
                this.$fetch('/order/stock',{'productId':this.gamePriceData.productId,'appId':this.$route.query.appId})
                .then((response) => {
                    // console.log(response)
                   if(response.flag){
                        // 订单所需数据 打开订单
                        this.allOrderData={
                            'appId':this.gameInfo.appId,
                            'productId':this.gamePriceData.productId,
                            'channelId': this.$store.getters.getChannelIdFun,
                            'image': this.gameInfo.image,
                            'englishName': this.gameInfo.englishName,
                            'chinaName': this.gameInfo.chinaName,
                            'model': this.gamePriceData.model,
                            'payType':2,
                            'balanceType':0,
                            'ratio':this.gamePriceData.ratio,
                            'price':this.gamePriceData.price,
                            'steamPrce':this.gameInfo.steamPrce,
                            'gamePriceData':this.gamePriceData
                        }
                        // 显示全部订单
                        this.displayAllOrder = true
                   }else{
                       this.ifStockModel = true
                       console.log('没有库存')
                       return
                   }
                })
            }else{
               this.openRegister(true) 
            }
            
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
        //接收全部订单传来的是否关闭框
        displayAllOrderFun(data){
            this.displayAllOrder = data
        },
        // 接收子组件传来的值确定弹框是否关闭  合玩弹框
        isPlayTogetherExplainModel(data){
            this.playTogetherExplainModel = data
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
                    // console.log(!!response.data.together)
                    if(!!response.data.together && response.data.together.model == 2){
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

        // 生成随机数
        getRandomInt(min, max) {
            this.randomInt={
                randomInt1:Math.floor(Math.random() * (max - min + 1)) + min,
                randomInt2:Math.floor(Math.random() * (max - min + 1)) + min,
                randomInt3:Math.floor(Math.random() * (max - min + 1)) + min,
            }
        }
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
            height: 538px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background:linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.6) 100%);
            border-radius: 4px;
            // background:linear-gradient(270deg,rgba(42,44,52,0.4) 0%,rgba(42,44,52,1) 100%);
            .leftBannerBox{
                width: 733px;
                height: 100%;
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
                width: 372px;
                height: 100%;
                margin-right: 26px;
                // 上面的名字 标签 介绍 等
                .bannerTopTitle{
                    width: 100%;
                    height: 164px;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                    // 中文名字 icon
                    .gameNameBox{
                        width: 100%;
                        height: 24px;
                        line-height: 24px;
                        margin-top: 22px;
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        .gameName{height: 24px;line-height: 24px;}
                        .gameNameIcon{
                            width: 14px;
                            height: 14px;
                            border-radius: 50%;
                            &>img{width: 100%;height: 100%;display: block;border-radius: 50%;}
                        }
                    }
                    // 英文名字
                    .gameEnglishName{
                        width: 100%;
                        height: 19px;
                        line-height: 19px;
                        margin-top: 2px;
                    }
                    // 标签
                    .gameLabelBox{
                        width: 100%;
                        height: 20px;
                        display: flex;
                        margin-top: 5px;
                        .gameLabelItem{
                            width: auto;
                            height: 12px;
                            text-align: center;
                            line-height: 12px;
                            padding: 4px 6px;
                            border-radius: 2px;
                            background-color: rgba(0, 0, 0, 0.2);
                        }
                    }
                    // 简介
                    .gameInfoSynopsis{
                        width:100%;
                        height:66px;
                        line-height:22px;
                        letter-spacing:1px;
                    }
                }
                // 下面的按钮价格等
                .contentBtns{
                    width: 100%;
                    height: 310px;
                    overflow: hidden;
                    .contentBtnsTop{
                        width: 100%;
                        height: 243px;
                        // 价格 多少人在游玩
                        .pricePeople{
                            width: 100%;
                            height:21px;
                            background:rgba(0,0,0,0.2);
                            border-radius:2px;
                            margin: 10px 0;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .originalPrice{
                                display: flex;
                                align-items: center;
                                margin-left: 17px;
                            }
                            .playNumber{
                                margin-right: 10px;
                                display: flex;
                                align-items: center;
                                .peoplePhoto{
                                    display: flex;
                                    div{
                                        width: 13px;
                                        height: 13px;
                                        border-radius: 50%;
                                        margin-left: -2px;
                                        img{
                                            width: 100%;
                                            height: 100%;
                                            display: block;
                                        }
                                    }
                                }
                            }
                        }
                        
                        .gameTypeSty:hover .gameTypeStyMaskBg{
                            border-radius:4px;
                            background:linear-gradient(126deg,rgba(52,189,244,0.6) 0%,rgba(65,161,226,0.9) 100%);
                            opacity: 0.3;
                        }
                        .gameTypeSty{
                            width: 100%;
                            height: 60px;
                            margin-bottom: 10px;
                            border-radius:4px;
                            cursor: pointer;
                            position: relative;
                            .gameTypeStyMaskBg{
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                opacity: 0.3;
                                border:1px solid rgba(140,212,255,0.24);
                                background:rgba(11,39,58,0.86);
                                box-sizing: border-box;
                                border-radius:4px;
                            }
                            // 按钮公共样式 畅享 试玩 独享
                            .gameTypeStyMaskBg.gameTypeStyActive{
                                background:linear-gradient(126deg,rgba(52,189,244,0.6) 0%,rgba(65,161,226,0.9) 100%);
                                border-radius:4px;
                                box-sizing: border-box;
                            }
                            .gameTypeStyMask{
                                width: 100%;
                                height: 100%;
                                border-radius:4px;
                                position: absolute;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                // 左边
                                .leftBox{
                                    width: 60px;
                                    height: 20px;
                                    margin-left: 25px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .shareText{
                                        width: 32px;
                                        height: 20px;
                                        line-height: 20px;
                                    }
                                    .playTogetherExplain{
                                        width: 20px;
                                        height: 20px;
                                        margin-left: 6px;
                                    }
                                }
                                // 右边
                                .rightBox{
                                    width: 195px;
                                    height: 45px;
                                    margin-right: 25px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .priceInfo{
                                        // width: 130px;
                                        width: 195px;
                                        height: 100%;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: flex-end;
                                        justify-content: center;
                                    }
                                    .priceSave{
                                        width: 65px;
                                        height: 100%;
                                        margin-left: 6px;
                                        display: flex;
                                        display: none;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                    }
                                }
                            }
                        }
                    }
                    // 购买按钮
                    .btmBuyBtn{
                        width: 100%;
                        height: 56px;
                        border-radius:4px 4px 4px 4px;
                        background:linear-gradient(126deg,rgba(52, 171, 220, 1) 0%,rgba(54, 124, 206, 1) 100%);
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
                // 暂不销售 添加愿望清单
                .noState{
                    width: 100%;
                   .noStateImgBox{
                        width: 262px;
                        height: 200px;
                        margin: 33px auto 21px;
                    }
                    // 添加愿望清单
                    .btmBuyBtn{
                        width: 100%;
                        height: 56px;
                        border-radius:0px 0px 4px 4px;
                        background:linear-gradient(126deg,rgba(52, 171, 220, 1) 0%,rgba(54, 124, 206, 1) 100%);
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
                    .noStateBtnSty{
                        cursor: auto;
                        background:rgba(56,59,71,1);
                        .textBox {
                            color:rgba(255,255,255,0.4);
                        }
                    }
                }
                // 卖点
                .gameInfoIntroduce{
                    width: 100%;
                    height: 64px;
                    .gameBtn{
                        width: 100%;
                        height: 64px;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
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
                        margin-right: 72px;
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
                    padding: 0 26px 0;
                    .gameInfoContentDescription{
                        width: 100%;
                    }
                    .gameInfoContentMinimumRequirements{
                        width: 100%;
                        .allComments{
                            width: 100%;
                        }
                    }
                   
                }
                //评测
                .evaluationScreen{
                    width:681px;
                    // height:987px;
                    background:rgba(0,0,0,0.4);
                    border-radius:4px;
                    margin: 32px 0;
                    padding: 15px 26px 0;
                    .title{
                        position: relative;
                        .titleLine{
                            width: 70px;
                            height: 3px;
                            border-radius: 3px;
                            position: absolute;
                            left: 0;
                            bottom: -4px;
                        }
                    }
                    // 评论内容
                    .commentContent{
                        width: 100%;
                        padding-top: 34px;
                        .viweAllComment{
                            width: 100%;
                            height: 50px;
                            margin:  0 auto;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            .texts{
                                color: rgba(86, 159, 203, 1);
                            }
                            .icons{
                                width: 12px;
                                height: 8px;
                                margin-left: 6px;
                            }
                        }
                    }
                }
            }
            // 右边
            .rightGameInfo{
                width: 391px;
                box-sizing: border-box;
                // 配置信息
                .configInfo{
                    width: calc(100% - 32px);
                    height: 340px;
                    padding: 16px;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius:4px;
                    margin-bottom: 32px;
                    .configInfoBox{
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                    }
                }
                // 语言说明
                .gameInfoContentLanguage{
                    width: calc(100% - 32px);
                    height: 230px;
                    padding: 16px;
                    background-color: rgba(0, 0, 0, 0.4);
                    border-radius:4px;
                    margin-bottom: 50px;
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
