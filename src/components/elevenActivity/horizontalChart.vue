<template>
  <!-- 十一活动包内部模板 横图4个的 单品4个横图包-->
  <div class="horizontalChartMain" v-if="!!itemData">
    <div class="contents" v-for="(i,index) in itemData.games" @click="publicGoto(i)" @mouseenter="hoverItemsFun(false,index)" @mouseleave="hoverItemsFun(true,index)">
      <div class="imgs">
         <video class="imgBlock" :src="i.sixVideo" autoplay muted loop v-if="!videoIsShow && itemsIndex == index"></video>
        <img class="imgBlock" :src="i.image" alt="" v-else>
        <!-- <img class="imgBlock" :src="i.image" alt="" v-else> -->
      </div>
      <div class="btnBgBox">
        <!-- 底部信息 -->
        <div class="btmInfo">
            <!-- 左边游戏信息 -->
            <div class="leftInfo">
                <div class="gameName ft14 font_weight color_white_1 textOver">{{i.chinaName == '' ? i.englishName: i.chinaName }}</div>
                <div class="priceInfos">
                    <div class="presentPrice ft22 font_weight color3"><span class="ft22">¥</span>{{Math.ceil(i.lowPrice)}}</div>
                    <div class="originalPrice ft12 color_white_06 textDecor">¥{{i.steamPrce}}</div>
                    <!-- <div class="labels ft12">今日特惠</div> -->
                </div>
            </div>
            <!-- 右边折扣信息 -->
            <div class="rightLowRatio">
                <div class="discount font_weight ft16 back2 color4">{{i.lowRatio}}折</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'  //跳转函数
export default {
  name: 'horizontalChart',
  props: ['itemData'],
  components:{JumpTo},
  data(){
      return {
        videoIsShow:true,
        itemsIndex:0,
      }
  },
  mounted(){

  },
  methods:{
    hoverItemsFun(data,index){
      this.videoIsShow = data
      this.itemsIndex = index
    },
    publicGoto(data){
      JumpTo(2,{'appId': data.appId});
    }
  }
};
</script>
<style lang="scss" scoped>
.horizontalChartMain{
 width: calc(100% - 30px);
 height: 185px;
 padding: 0 15px;
 padding-bottom: 30px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 .contents{
    width: 272px;
    height: 185px;
    background-color: black;
    position: relative;
    cursor: pointer;
    .imgs{
      width: 272px;
      height: 130px;
      .imgBlock{width: 100%;height: 100%;display: block;}
    }
    .btnBgBox{
      width: 272px;
      height: 70px;
      // background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.94) 17%, #000000 100%);
      position: absolute;
      bottom: 0;
      .btmInfo{
        width: 100%;
        height: 50px;
        padding-left: 5px;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        z-index: 4;
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
    
 }
}
</style>
