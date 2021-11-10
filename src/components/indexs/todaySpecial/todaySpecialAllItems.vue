<template>
    <!-- 今日特惠 后面的全部 -->
    <div class="allItems" @click="publiClick(items.appId)"  @mouseenter="hoverItemsFun(false)" @mouseleave="hoverItemsFun(true)"
    v-ga_si="{'items':{
        'gameInfo':{
            'appId':items.appId || '',
            'name':items.chinaName || items.englishName,
            'promotion_name':'今日特惠'
        },
        'item_list_name':'今日特惠',
        'item_list_id':'今日特惠'
        }}">
        <div class="topImg">
            <!-- 图片层 -->
            <div class="imgBox" v-if="videoBlock">
                <img class="imgBlock" :src="items.image" alt="">
            </div>
            <div class="videos" v-else>
                <video class="imgBlock" autoplay loop muted :src="items.sixVideo"></video>
            </div>
            <!-- 遮罩背景等 -->
            <div class="masks">
                <div class="topMask">
                    <div class="ft12 color_white_1 margin_right_8">距结束 </div>
                    <div class="ft14 color_white_1 font_weight" v-if="dataTime.date_d != 0" style="margin-right:5px">{{dataTime.date_d+'天'}}</div>
                    <div class="ft14 color_white_1 font_weight">{{dataTime.date_h+':'+dataTime.date_m+':'+dataTime.date_s}}</div>
                </div>
                <div class="btmMask"></div>
                <!-- 限时倒计时 -->
                <!-- <div class="timerMask timeDiscountD_bg ft12 color_white_1">
                    限时折扣 {{dataTime.date_h+':'+dataTime.date_m+':'+dataTime.date_s}}
                </div>  -->
            </div>
        </div>
        <!-- 底部信息 -->
        <div class="btmInfo">
            <!-- 左边游戏信息 -->
            <div class="leftInfo">
                <div class="gameName ft14 font_weight color_white_1 textOver">{{ items.chinaName == ''?items.englishName:items.chinaName }}</div>
                <div class="priceInfos">
                    <div class="presentPrice ft20 font_weight color3"><span class="ft16">¥</span>{{Math.ceil(items.lowPrice)}}</div>
                    <div class="originalPrice ft12 color_white_06 textDecor">¥{{items.steamPrce}}</div>
                    <div class="labels ft12">今日特惠</div>
                </div>
            </div>
            <!-- 右边折扣信息 -->
            <div class="rightLowRatio">
                <div class="discount font_weight ft16 back2 color4">{{items.lowRatio}}折</div>
            </div>
        </div>
    </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'todaySpecialAllItems',
  props: ['items'],
  data(){
      return {
        endTime: '',
        dataTime:{
            date_d:'',
            date_h:'',
            date_m:'00',
            date_s:'00',
            date_ms:'00',
        },
        videoBlock:true,

      }
  },
  activated(){

  },
  mounted(){
      this.countTime()
  },
  methods:{
    // 优惠倒计时
    countTime() {
        // var date = new Date()
        var now = new Date().getTime()
        var end =  this.items.discountTime //this.treasu_data.etime * 1000     //this.treasu_data 在data中定义的,后台拿到的结束时间戳
        var leftTime = end - now //时间差
        var d, h, m, s, ms
        if (leftTime > 100) {
            d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
            // h = Math.floor(((leftTime / 1000 / 60 / 60) % 24) + 24 * d)
            h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
            m = Math.floor((leftTime / 1000 / 60) % 60)
            s = Math.floor((leftTime / 1000) % 60)
            ms = Math.floor(leftTime % 1000 / 100)
            if (ms < 10) {
            ms = ms
            }
            if (s < 10) {
            s = '0' + s
            }
            if (m < 10) {
            m = '0' + m
            }
            if(h < 10) {
            h = '0' + h
            }

                //将倒计时赋值到div中
            this.dataTime.date_d = d  //这里是渲染的天数
            this.dataTime.date_h = h  //这里是渲染的小时
            this.dataTime.date_m = m  //这里是渲染的分钟
            this.dataTime.date_s = s  //这里是渲染的秒数
            this.dataTime.date_ms = ms  //这里是渲染的毫秒
            //递归每秒调用countTime方法，显示动态时间效果
            setTimeout(this.countTime, 50)
        } else {
            this.dataTime.date_h = '00' 
            this.dataTime.date_m = '00' 
            this.dataTime.date_s = '00'  
            this.dataTime.date_ms = '00'

            this.countTime = null
            console.log('已截止')
        }
    },
    publiClick(data){
        JumpTo(2,{'appId': data});
    },
    hoverItemsFun(data){
        this.videoBlock = data
    }
  }
};
</script>
<style lang="scss" scoped>
.allItems{
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
    .topImg{
        width: 100%;
        height: 100%;
        position: relative;
        .imgBox,.videos{
            width: 100%;
            height: 129px;
            position: absolute;
            left: 0;
            top: 26px;
            z-index: 1;
            background: black;
        }
        .masks{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            .topMask{
                width: 100%;
                height: 26px;
                // background:linear-gradient(360deg,rgba(26,97,132,0) 0%,rgba(11,50,77,1) 100%);
                background:linear-gradient(360deg,rgba(247, 159, 74, 1) 100%,rgba(202, 118, 29, 1) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 0;
                left: 0;
            }
            .btmMask{
                width: 100%;
                height:62px;
                //background:linear-gradient(180deg,rgba(26,97,132,0) 0%,rgba(11,50,77,1) 35%,rgba(11,50,77,1) 100%);
                background: -webkit-linear-gradient(270deg,rgba(26,97,132,0) 0%,rgba(11,50,77,1) 35%,rgba(11,50,77,1) 100%);
                position: absolute;
                bottom: 0px;
                left: 0px;
            }
            .timerMask{
                width: 128px;
                height: 40px;
                text-align: left;
                text-indent: 25px;
                line-height: 25px;
                position: absolute;
                top: 10px;
                right: -11px;
            }
        }
    }
    .btmInfo{
        width: 100%;
        height: 62px;
        padding-left: 5px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        z-index: 4;
        background-color: #051824;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftInfo{
            width: 200px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .gameName{width: 100%;}
            .priceInfos{
                display: flex;
                align-items: center;
                .presentPrice{margin-right: 4px;}
                .originalPrice{margin-right: 8px;}
                .labels{
                    padding: 1px 5px;
                    color: #D6FF47;
                    border-radius: 4px;
                    border: 1px solid #436C0F;
                }
            }
        }
        .rightLowRatio{
            margin-right: 5px;
            .discount{
                width: 57px;
                height: 40px;
                text-align: center;
                line-height: 40px;
                border-radius: 4px;
            }
        }
    }
}
</style>
