<template>
    <div class="gameListMain back4" @click="publiClick(items.appId)" @mouseenter="hoverItemsFun(true)" @mouseleave="hoverItemsFun(false)"
     v-ga_si="{'items':{
              gameInfo:{
                'appId':items.appId || '',
                'name':items.chinaName || items.englishName,
                'promotion_name':`${types == 'hot'?'热销排行':'折扣热销'}`
              },
              'item_list_name':`${types == 'hot'?'热销排行':'折扣热销'}`,
              'item_list_id':`${types == 'hot'?'热销排行':'折扣热销'}`
            }}">
        <div class="left">
            <!-- 夏季大促 -->
            <div class="summerPromotion summerPromotionB_bg ft14 color_white_1"></div>
            <img :src="items.image" alt="">
        </div>
        <div class="minddle">
            <div class="gameNameBox">
                <div class="gameName ft16 font_weight color_white_1 textOver">{{items.chinaName == '' ? items.englishName : items.chinaName}}</div>
                <div class="gameNameIcon margin_left_8"><svg-icon iconClass='steamIcon' className='svg_icon'></svg-icon></div>
            </div>
            <div class="gameListInfo">
                <div class="ft12 color_white_06 margin_right_8">
                    <div>{{items.playersNow}}</div>
                    <div>人正在玩</div>
                </div>
                <!-- <div class="ft12 color_white_04">
                    <div>设计</div>
                </div> -->
            </div>
        </div>
        <div class="right">
            <div class="leftInfo">
                <div class="leftInfoTop">
                    <div class="ft14 color_white_04 textDecor">￥{{items.steamPrce}}</div>
                    <div class="ft20 color3 font_weight">￥{{ Math.ceil(items.lowPrice) }}</div>
                </div>
                <div class="leftInfoBtm margin_top_5">
                    <!-- <div class="ft14 color4">立省{{Math.floor(items.steamPrce - items.lowPrice)}}</div> -->
                    <div class="ft12 font_weight color4 border_radius_4 margin_right_4">{{items.lowRatio}}折</div>
                    <div class="ft12 color4">立省{{ Math.ceil(items.discount) }}</div>
                </div>
            </div>
            <!-- <div class="rightDiscunt"><div class="ft16 font_weight back2 color4 border_radius_4">{{items.lowRatio}}折</div></div> -->
        </div>
        <div class="hoverMain indexItemHoverBg_bg" v-if="hoverItems && types == 'hot'"  v-rights="winObj" >
            <div class="contents">
                <div class="contentItems">
                    <div class="gameName ft16 color_white_1 font_weight">{{items.chinaName == '' ? items.englishName : items.chinaName}}</div>
                    <div class="itemLabels">
                        <template  v-for="(i,index) in items.attributes.category3">
                            <div class="labels" v-if="index < 3">{{i.title}}</div>
                        </template>
                    </div>
                    <div class="videoContents">
                        <video class="imgBlock" v-if="items.sixVideo" autoplay muted loop :src="items.sixVideo"></video>
                        <img v-else class="imgBlock" :src="items.image" alt="">  
                    </div>
                    <div class="describe ft12 color_white_06 textOver3" v-html="items.intro"></div>
                </div>
            </div>
        </div>
        <div class="hoverMain hoverMainRight indexItemHoverBg_bg" v-if="hoverItems && types == 'discount'"  v-lefts="winObj" >
            <div class="contents">
                <div class="contentItems">
                    <div class="gameName ft16 color_white_1 font_weight">{{items.chinaName == '' ? items.englishName : items.chinaName}}</div>
                    <div class="itemLabels">
                        <template  v-for="(i,index) in items.attributes.category3">
                            <div class="labels" v-if="index < 3">{{i.title}}</div>
                        </template>
                    </div>
                    <div class="videoContents">
                        <video class="imgBlock" v-if="items.sixVideo" autoplay loop muted :src="items.sixVideo"></video>
                        <img v-else class="imgBlock" :src="items.image" alt="">
                        
                    </div>
                    <div class="describe ft12 color_white_06 textOver3" v-html="items.intro"></div>
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
    margin-bottom: 9px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .left{
        width: 156px;
        height: 100%;
        position: relative;
        border-radius: 4px;
        img{display: block;width: 100%;height: 100%;border-radius: 4px;}
    }
    .minddle{
        width:258px;
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
            .gameName{width: auto; height: 25px;line-height: 25px;}
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
        width: 123px;
        margin-right: 17px;
        display: flex;
        align-items: center;
        justify-content: space-between;
       .leftInfo{
           width: 123px;
           display: flex;
        //    background: red;
           flex-direction: column;
           justify-items: center;
           align-items: center;
           .leftInfoTop{
               width: 100%;
               height: 24px;
               display: flex;
               justify-content: flex-end;
               align-items: center;  
           }
           .leftInfoBtm{
               width: 100%;
               text-align: right;
            //    opacity: 0.6;
               display: flex;
               justify-content: flex-end;
               align-items: center;
               div{
                padding:1px 5px;
                border-radius: 4px;
                border: 1px solid #436C0F;
               }
           }
       }
       .rightDiscunt{
            width:53px;
            height:42px;
            margin-left: 10px;
            border-radius:4px;
            text-align: center;
            line-height: 42px;
       }
    }
    // 划上显示的东西
    .hoverMain{
        width: 303px;
        height: 341px;
        position: absolute;
        right: -303px;
        // left: 0;
        top: 0;
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
    .hoverMainRight{
        right: 0;
        left: -303px;
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'hotSaleAddDiscount',
  props:['items','types'],
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
