<template>
  <!-- 滚动视频 -->
  <div class="commentMain back1">
    <!-- 中间的内容 -->
    <transition name="leaveTop">
        <div class="maskContents" v-if="gameInfo">
            <div class="bgImg">
                <div class="imgBlock opc10" :style="{backgroundImage: 'url(' + gameInfo.libraryCapsule + ')' , backgroundSize:'cover',backgroundPosition: 'center top'}"></div>
                <div class="maskBgImgs"></div>
            </div>
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
                    <div class="textBg"></div>
                    <!-- title -->
                    <div class="bannerTopTitle">
                        <!-- 中文名字和icon -->
                        <div class="gameNameBox">
                            <div class="gameName ft18 color_white_1 font_weight textOver">{{gameInfo.chinaName == '' ? gameInfo.englishName : gameInfo.chinaName}}</div>
                            <div class="gameNameIcon margin_left_8"><svg-icon iconClass='steamIcon' className='svg_icon'></svg-icon></div>
                            <div class="gameNameIcon margin_left_6"><svg-icon iconClass='windowIcon' className='svg_icon'></svg-icon></div>
                        </div>
                        <!-- 英文名字 -->
                        <div class="gameEnglishName ft14 color_white_1">{{gameInfo.englishName}}</div>
                    </div>
                    <!-- 标签 -->
                    <div class="gameLabelBox margin_top_10" v-if="!!gameInfoLabel">
                        <transition v-for="(n, i) in gameInfoLabel">
                            <div class="gameLabelItem margin_right_8 ft12 color_white_08" v-if="i < 3">{{n.title}}</div>
                        </transition>
                    </div>
                    <!-- 评测 -->
                    <div class="gameInfoSynopsis ft14 color_white_1" v-html="gameInfo.gameComment.commentContent">
                        <!-- <span class="ft24">{{gameInfo.gameComment.commentContent.slice(0,1)}}</span>
                        {{gameInfo.gameComment.commentContent.slice(1)}} -->
                    </div>
                    <!-- 已游玩评测 -->
                    <div class="playEvaluating">
                        <div class="icons userLoginSuccess_bg"></div>
                        <div class="texts ft12 color_white_08">已游玩{{gameInfo.gameComment.playedHours}}小时评测</div>
                    </div>
                    <!-- 查看更多评论 -->
                    <div class="moveBtn ft12 margin_top_16"  @click="publiClick(gameInfo.appId)"
                     v-ga_si="{'items':{
                        'gameInfo':{
                            'appId':gameInfo.appId || '',
                            'name':gameInfo.chinaName || gameInfo.englishName,
                            'promotion_name':'专属推荐'
                        },
                        'item_list_name':'专属推荐',
                        'item_list_id':'专属推荐'
                        }}">
                    查看更多评论 &nbsp;&nbsp;&nbsp;&nbsp; > </div>
                    <!-- 购买立省 -->
                    <div class="buyProvince">
                        <div class="leftPrice">
                            <div class="top">
                                <div class="text1 ft20 color_white_1 font_weight"> <span class="ft16">￥</span>{{gameInfo.lowPrice}}</div>
                                <div class="ft14 color_white_08 textDecor">￥{{gameInfo.steamPrce}}</div>
                            </div>
                            <div class="btm">
                                <div class="text2 ft12 color_white_1 font_weight"> VIP<span class="ft12">￥</span> {{gameInfo.memberPrice}}</div>
                            </div>
                        </div>
                        <div class="rightBuyBtn" @click="publiClick(gameInfo.appId)"
                        v-ga_si="{'items':{
                        'gameInfo':{
                            'appId':gameInfo.appId || '',
                            'name':gameInfo.chinaName || gameInfo.englishName,
                            'promotion_name':'专属推荐'
                        },
                        'item_list_name':'专属推荐',
                        'item_list_id':'专属推荐'
                        }}">
                            <div class="texts ft20 color_white_1 font_weight">立即购买</div>
                            <div class="discount ft14 color4 font_weight bubble2_bg">{{gameInfo.lowRatio}}折</div>
                        </div>
                        <!-- <div class="texts ft20 color_white_1">现在购买立省 ¥{{gameInfo.discount}}</div>
                        <div class="icons ft20 color_white_1"><svg-icon iconClass='rightArrow' className='svg_icon'></svg-icon></div> -->
                    </div>
                    <!-- 查看配置等信息 -->
                    <div class="moveBtn ft12 margin_top_16"  @click="publiClick(gameInfo.appId)"
                    v-ga_si="{'items':{
                        'gameInfo':{
                            'appId':gameInfo.appId || '',
                            'name':gameInfo.chinaName || gameInfo.englishName,
                            'promotion_name':'专属推荐'
                        },
                        'item_list_name':'专属推荐',
                        'item_list_id':'专属推荐'
                        }}">查看配置等信息 &nbsp;&nbsp;&nbsp;&nbsp; > </div>
                </div>
            </div>
        </div>
    </transition>
     <transition name="leaveTop1">
         <div class="maskContents back4Active" v-if="gameInfo"></div>
    </transition>
    <!-- <div v-else> <loading/>  </div> -->
    <div class="boxs back4Active"></div>
    <!-- <alertModelError v-if="ifStockModel" iserrtype="1" @change="ifStockModelFun"></alertModelError> -->
  </div>
</template>

<script>
import loading from '@/components/Loading/loading';  //加载中
import JumpTo from '@/utils/jumpTo'
// import alertModelError from '@/components/AlertModel/alertModelError'  //错误 满库存
export default {
  name: 'rollVideo',
  props: ['appids'],
  components:{loading},
  data(){
      return {
        gameInfo:'',  //详情页面数据
        swiperSlides:[],       //所有轮播的数据
        swiperActive:0,     //略缩图点击的下标
        isVideo:[],      //有视频的元素下标
        isPlayVideo:true, //当前播放的是视频还是图片
        itemSrc:'',    //当前 视频 或者 图片 的链接

        gameInfoLabel:'',
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
        // ifStockModel:false,  //是否显示库存不足弹出
      }
  },
  watch:{
    'appids':function(n,o){
        if(n){
            this.gameInfo = ''
            this.inits()
        }
    }
  },
  activated(){
    
  },
  updated(){

  },
  mounted(){
    this.inits()
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
        inits(){
            var _this = this;
            _this.queryWeb = this.appids//_this.$route.query.appId  //获取页面路径传来的参数
            // 游戏详情  gameInfo
            _this.$fetch('/index/v2/only/game',{'appId':_this.queryWeb})//_this.queryWeb
                .then((response) => {
                    _this.gameInfo = response.data
                    _this.swiperSlides = response.data.gameImages
                    _this.gameInfoLabel = response.data.attributes.category3
                    // 获取视频的元素
                    _this.swiperSlides.forEach(function(v,l){
                        if(v.carouselAddress.indexOf('.mp4') > 0){
                            _this.isVideo.push(l)
                        }
                    })
                    if(_this.isVideo.length > 0){
                        //添加第一次进来的默认值
                        _this.itemSrc = response.data.gameImages[_this.isVideo[0]].carouselAddress
                        _this.isPlayVideo = true
                    }else{
                            _this.itemSrc = _this.swiperSlides[0].carouselAddress
                            _this.isPlayVideo = false
                    }
                })
        },
        publiClick(data){
            JumpTo(2,{'appId': data});
        },
        // ifStockModelFun(data){  //库存不足弹出
        // console.log(data)
        //     this.ifStockModel = data
        // },
        // rollFun(){
        //     if(this.ifStockModel){
        //         console.log('显示弹框了 关闭滚动事件')
        //     }else{
        //         console.log('关闭弹框了 打开滚动事件')
        //     }
        // }
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 11; 
    .maskContents{
        width: 1160px;
        height: 628px;
        padding: 30px 27px 84px 27px;
        box-sizing: border-box;
        margin: 43px auto 0;
        border-radius: 4px;
        position: relative;
        .bgImg{
            width: 100%;
            height: 100%;
            // padding: 30px 27px 84px 27px;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            background:rgba(17,24,34,1);
            .opc10{opacity: 0.3;position: relative;z-index: 3;}
            .maskBgImgs{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 4;
                background:linear-gradient(180deg,rgba(0,0,0,0.51) 0%,rgba(0,0,0,1) 100%);
            }
        }
        .bannerGameInfo{
            width: 1105px;
            height: 518px;
            position: relative;
            z-index: 4;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // background:linear-gradient(180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.6) 100%);
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
                width: 330px;
                height: 100%;
                margin-left: 43px;
                position: relative;
                
                // 上面的名字 标签 介绍 等
                .bannerTopTitle{
                    width: 100%;
                    height:71px;
                    overflow: hidden;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
                    // 中文名字 icon
                    .gameNameBox{
                        width: 100%;
                        height: 32px;
                        line-height: 32px;
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        .gameName{height: 32px;line-height: 32px;}
                        .gameNameIcon{
                            width: 21px;
                            height: 21px;
                            opacity: 0.6;
                            border-radius: 50%;
                            &>img{width: 100%;height: 100%;display: block;border-radius: 50%;}
                        }
                    }
                    // 英文名字
                    .gameEnglishName{
                        width: 100%;
                        height: 19px;
                        line-height: 19px;
                        margin-top: 8px;
                        color:rgba(58,191,233,1);
                    }
                    
                }
                // 标签
                .gameLabelBox{
                    width: 100%;
                    height: 80px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: start;
                    box-sizing: border-box;
                    .gameLabelItem{
                        width: auto;
                        height: 12px;
                        text-align: center;
                        line-height: 12px;
                        padding: 4px 6px;
                        border-radius: 2px;
                        background: rgba(0, 0, 0, 0.2);
                        // background: rgba(225, 245, 255, 0.1);
                    }
                }
                // 简介
                .gameInfoSynopsis{
                    width:100%;
                    height:187px;
                    line-height: 22px;
                    overflow: hidden;
                }
                // 已游玩评测
                .playEvaluating{
                    width: 100%;
                    height: 20px;
                    margin-top: 7px;
                    display: flex;
                    align-items: center;
                    .icons{
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                    }
                    .texts{
                        width: 300px;
                        height: 20px;
                        line-height: 20px;
                        margin-left: 7px;
                    }
                }
                // 查看更多评测
                .moveBtn{
                    width: 100%;
                    height: 16px;
                    color: #8ADDFF;
                    opacity: 0.69;
                    cursor: pointer;
                }
                // 购买立省
                .buyProvince{
                    width: 100%;
                    height: 56px;
                    margin-top: 30px;
                    border-radius: 4px;
                    // position: absolute;
                    // bottom: 4px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    background: linear-gradient(90deg,rgba(52, 171, 220, 1) 0%,rgba(54, 124, 206, 1) 100%);
                    .leftPrice{
                        width: 189px;
                        height: 100%;
                        padding-left: 16px;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        .top{
                            display: flex;
                            align-items: baseline;
                            .text1{
                                display: flex;
                                align-items: baseline;
                                margin-right: 9px;
                            }
                        }
                        .btm{
                            display: flex;
                            .text2{
                                display: flex;
                                align-items: baseline;
                                margin-right: 9px;
                                color: rgba(255, 182, 73, 1);
                            }
                        }
                        
                    }
                    .rightBuyBtn::before{
                        content: '';
                        width:1px;
                        height: 35px;
                        background-color: rgba(255, 255, 255, 0.4);
                        position: absolute;
                        left: 0;
                        top: 11px;
                    }
                    .rightBuyBtn{
                        width: 152px;
                        height: 100%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                        .discount{
                            width: 74px;
                            height: 36px;
                            position: absolute;
                            top: -27px;
                            right: 6px;
                            text-align: center;
                            line-height: 36px;
                        }
                    }
                    // .texts{margin-left: 17px;}
                    // .icons{width: 20px;height: 20px; margin-right: 26px;}
                }
            }
        }
    }
    .boxs{
        width: 1160px;
        height: 30px;
        margin: 0 auto;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
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


// 动画
.leaveTop-enter{
    transform: translateY(0);
}
.leaveTop-enter-active{
    // transform: translateY(0);
    transition: all 0.5s linear;
}
.leaveTop-enter-to{
    transform: translateY(-700px);
}

.leaveTop-leave{
   transform: translateY(-700px);
}
.leaveTop-leave-active{
    transform: translateY(-700px);
}
.leaveTop-leave-to{
    transform: translateY(0);
}
// 动画1
.leaveTop1-enter{
    transform: translateY(0);
}
.leaveTop1-enter-active{
    // transform: translateY(0);
    transition: all 0.5s linear;
}
.leaveTop1-enter-to{
    transform: translateY(-700px);
}

.leaveTop1-leave{
   transform: translateY(0);
}
.leaveTop1-leave-active{
    transform: translateY(0);
}
.leaveTop1-leave-to{
    transform: translateY(-700px);
}
// v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
// v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
// v-enter-to：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
// v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
// v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
// v-leave-to：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
</style>
