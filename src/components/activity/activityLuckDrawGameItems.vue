<template>
<!-- 抽奖的三个游戏 -->
    <div class="main" v-if="!!activityLuckDrawGameItemsData">
        <div class="items" :class="indexs == activeType || indexs == 'all'?'active':''" >
            <div class="itemsImg">
                <img class="imgBlock" :src="activityLuckDrawGameItemsData.image" alt="">
            </div>
            <!-- 上面的视频 -->
            <div class="itemsVideo"> 
                <div class="leftImg ft16 color_white_1"  :class="activityLuckDrawGameItemsData.trialDays == 0?'allDay_bg':'oneDay_bg'">
                    <!-- {{activityLuckDrawGameItemsData.trialDays == 0?'永久':'一天'}} -->
                </div>
                <div class="rightVideo ft14 color_white_1" @click="viewVideo" v-if="indexs !== 'all'" :style="indexs !== 'all'?'':'background: none'">
                    <div class="playVideoIcon"> <svg-icon iconClass="playVideo" class="svg_icon"></svg-icon> </div>
                    <div class="playVideoText ft12 color_white_1">查看视频</div>
                </div>
            </div>
            <!-- 下面的名字 -->
            <div class="itemsName textOver ft14 color_white_1">{{activityLuckDrawGameItemsData.chinaName == '' ? activityLuckDrawGameItemsData.englishName :activityLuckDrawGameItemsData.chinaName}}</div>
        </div>
        <div class="worth worth_bg">
            <div class="ft18 color_white_1">价值：</div>
            <div class="ft18 color_white_1">{{activityLuckDrawGameItemsData.worth}}</div>
        </div>
        <activityLookVideo v-if="lookVideoIsShow" :videourl="activityLuckDrawGameItemsData.video" @change="playVideo" />
    </div>
</template>
<style lang="scss" scoped>
.active{
    border: 3px solid rgba(32, 247, 248, 1);
    box-shadow: 0px 8px 10px 0 rgba(53, 13, 0, 0.5);
}
.main{
    width: 100%;
    height: 100%;
    .items{
        width: 161px;
        height: 245px;
        margin-bottom: 13px;
        position: relative;
        .itemsImg{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            .imgBlock{
                width: 100%;
                height: 100%;
                display: block;
            }
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
    .worth{
        width:117px;
        height:45px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
            font-weight: bold;
            color:rgba(0,254,255,1);
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
import activityLookVideo from '@/components/activity/activityLookVideo'
export default {
  name: 'activityLuckDrawGameItems',
  components:{JumpTo,activityLookVideo},
  props:{
    activityLuckDrawGameItemsData:{
         type: Object,
         default: function(){
             return {}
         }
     },
     indexs:0,
     activeType: Number,
  },
  data(){
      return{
        lookVideoIsShow: false,
        itemVideoUrl:'',
      }
  },
  methods:{
    publiClick(data){
        JumpTo(2,{'appId': data});
    },
    //查看视频
    viewVideo(){
        this.lookVideoIsShow = true
    },
    // video弹出关闭与否 接收消息
    playVideo(data){
        this.lookVideoIsShow = data
    },

  },
  mounted(){

  }

}
</script>
