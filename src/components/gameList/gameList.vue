<template>
    <div class="gameListMain" @click="publiClick(gameListData.appId)" @mouseenter="hoverItemsFun(true)" @mouseleave="hoverItemsFun(false)"
    v-ga_si="{'items':{
        'gameInfo':{
            'appId':gameListData.appId || '',
            'name':gameListData.chinaName || gameListData.englishName,
            'promotion_name':'搜索结果'
        },
        'item_list_name':'搜索结果',
        'item_list_id':'搜索结果'
        }}">
       
        <div class="left">
            <!-- 夏季大促 -->
            <div class="summerPromotion summerPromotionB_bg ft14 color_white_1"></div>
            <img :src="gameListData.image" alt="">
        </div>
        <div class="minddle">
            <!-- <div class="ft16 color_white_1">
                {{gameListData.chinaName == '' ? gameListData.englishName : gameListData.chinaName}}
            </div> -->
            <div class="gameNameBox">
                <div class="gameName ft18 color_white_1 RobotoBold">{{gameListData.chinaName == '' ? gameListData.englishName : gameListData.chinaName}}</div>
                <div class="gameNameIcon margin_left_8"><svg-icon iconClass='steamIcon' className='svg_icon'></svg-icon></div>
                <!-- <div class="gameNameIcon margin_left_6"><svg-icon iconClass='windowIcon' className='svg_icon'></svg-icon></div> -->
            </div>
            <div class="gameListInfo">
                <div class="ft12 color_white_06 margin_right_8">
                    <div>{{gameListData.playersNow}}</div>
                    <div>人正在玩</div>
                </div>
                <div class="ft12 color_white_04" v-if="!!gameListData.attributes && gameListData.attributes.category3.length > 0">
                    <template v-for="(items,index) in gameListData.attributes.category3">
						<div  v-if="index!=0 && index<3">{{items.title}}</div>
					</template>
                </div>
            </div>
        </div>
        <div class="right" v-if="gameListData.state == 1">
            <div class="rightBox">
                <div class="rightOne">
                    <div class="ft14 color_white_04 textDecor">￥{{ Math.ceil(gameListData.steamPrce) }}</div>
                    <span class="ft16 color3 font_weight">￥</span>
                    <div class="ft20 color3 font_weight">{{ Math.ceil(gameListData.lowPrice) }}</div>
                </div>
                <div class="rightTwo">
                    <div class="ft12 color1 font_weight">{{ Math.floor( (gameListData.lowPrice/gameListData.steamPrce)*100 )/10}}折</div>
                    <div class="ft12 color1 font_weight">立省{{ Math.ceil(gameListData.discount) }}</div>
                </div>
            </div>
        </div>
        <div v-else class="right"></div>

        <!-- 视频播放 -->
        <div class="hoverMain indexItemHoverBg_bg" v-if="hoverItems" v-rights="winObj" >
            <div class="contents">
                <div class="contentItems">
                    <div class="gameName ft16 color_white_1 font_weight">{{gameListData.chinaName == '' ? gameListData.englishName : gameListData.chinaName}}</div>
                    <div class="itemLabels">
                        <template  v-for="(i,index) in gameListData.attributes.category3">
                            <div class="labels" v-if="index < 3">{{i.title}}</div>
                        </template>
                    </div>
                    <div class="videoContents">
                        <video class="imgBlock" v-if="gameListData.sixVideo" autoplay muted loop :src="gameListData.sixVideo"></video>
                        <img v-else class="imgBlock" :src="gameListData.image" alt="">  
                    </div>
                    <div class="describe ft12 color_white_06 textOver3" v-html="gameListData.intro"></div>
                </div>
            </div>
        </div>


    </div>
</template>
<style lang="scss" scoped>
.gameListMain{
    width: 100%;
    height: 74px;
    border-radius: 4px; 
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
        width: 156px;
        height: 100%;
        position: relative;
        img{display: block;width: 100%;height: 100%}
    }
    .minddle{
        width: 532px;
        height: 100%;
        padding-left: 16px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
                opacity: 0.2;
                &>img{width: 100%;height: 100%;display: block;border-radius: 50%;}
            }
        }
        .gameListInfo{
            display: flex;
            div:nth-of-type(1){
                display: flex;
                align-items: center;
            }
            div:nth-of-type(2){
                display: flex;
                align-items: center;
                div{
                    padding: 2px 6px;
                    margin-right: 8px;
                    background-color: rgba(0,0,0,0.2)
                }
            }
        }
    }
    .right{
        width: 168px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .rightBox {
            width: 120px;
            height: 52px;
            margin-right: 17px;
            .rightOne {
                display: flex;
                justify-content: flex-end;
                width: 100%;
                height: 31px;
                span {
                    line-height: 34px;
                }
                :nth-child(1) {
                    line-height: 34px;
                    margin-right: 5px;
                }
            }
            .rightTwo {
                width: 130px;
                height: 22px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                text-align: center;
                :nth-child(1) {
                    height: 18px;
                    margin-right: 3px;
                    padding:0 4px;
                    border: 1px solid #436C0F;
                    border-radius: 4px;
                }
                :nth-child(2) {
                    height: 18px;
                    padding:0 7px;
                    border: 1px solid #436C0F;
                    border-radius: 4px;
                }
            }
        }
    }
    // 划上显示的东西
    .hoverMain{
        width: 303px;
        height: 341px;
        position: absolute;
        right: -303px;
        top: 0;
        // left: 0;
        z-index: 9;
        .contents{
            width: 100%;
            height: 100%;
            padding-top: 1px;
            .contentItems{
                width: 249px;
                height: 275px;
                margin: 0 auto;
                margin-top: 26px;
                .gameName{margin-bottom: 9px;}
                .itemLabels{
                    width: 100%;
                    height: 20px;
                    display: flex;
                    margin-bottom: 14px;
                    .labels{
                        line-height: 16px;
                        padding: 2px 4px;
                        font-size: 12px;
                        color: #FFFFFF;
                        // background: rgba(0, 0, 0, 0.2);
                        background: rgba(225, 245, 255, 0.1);
                        border-radius: 2px;
                        margin-right: 9px;
                    }
                }
                .videoContents{
                    width: 100%;
                    height: 140px;
                    margin-bottom: 16px;
                    .imgBlcok{width: 100%;height: 100%;display: block}
                }
                .describe{
                    width: 100%;
                    height: 54px;
                    line-height: 18px;
                    letter-spacing: 1px;
                }
            }
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'

export default {
  name: 'gameList',
  props:{
     gameListData:{
         type: Object,
         default: function(){
             return {}
         }
     }
  },
  data(){
      return {
          hoverItems:false,
          winObj:{
            ww: document.documentElement.offsetWidth,
            wh: document.documentElement.offsetHeight,
            dw: 303,
            dh: 341
          },
      }
  },
  methods:{
      publiClick(data){
          JumpTo(2,{'appId': data});
      },
      hoverItemsFun(data){
          this.hoverItems = data
      }
  },
  directives:{
    'rights':{
      inserted:function(el,binding){
        var elObj = el.getBoundingClientRect();
        if(elObj.right - binding.value.ww > 0){
            el.style.right = ( elObj.right - binding.value.ww ) - elObj.width  +'px'
        }
        if(elObj.bottom - binding.value.wh > 0){
            el.style.top = ( binding.value.wh - elObj.bottom )  +'px'
        }
      }
    },
    'lefts':{
      inserted:function(el,binding){
        var elObj = el.getBoundingClientRect();
        if(elObj.left - binding.value.ww > 0){
            el.style.lefts = ( elObj.lefts - binding.value.ww ) - elObj.width  +'px'
        }
        if(elObj.bottom - binding.value.wh > 0){
            el.style.top = ( binding.value.wh - elObj.bottom )  +'px'
        }
      }
    }
  }
}
</script>
