<template>
    <div class="gameListMain" @click="changeIndex">
        <div class="left">
            <img :src="otherPeopleGameListData.image" alt="">
        </div>
        <div class="minddle">
            <!-- <div class="ft16 color_white_1">{{ otherPeopleGameListData.chinaName == '' ? otherPeopleGameListData.englishName : otherPeopleGameListData.chinaName }}</div> -->
            <div class="gameNameBox">
                <div class="gameName ft18 color_white_1">{{otherPeopleGameListData.chinaName == '' ? otherPeopleGameListData.englishName : otherPeopleGameListData.chinaName}}</div>
                <div class="gameNameIcon margin_left_8"><svg-icon iconClass='steamIcon' className='svg_icon'></svg-icon></div>
                <!-- <div class="gameNameIcon margin_left_6"><svg-icon iconClass='windowIcon' className='svg_icon'></svg-icon></div> -->
            </div>
            <div class="gameListInfo">
                <div class="gameName ft12 color_white_04">{{otherPeopleGameListData.englishName}}</div>
                <!-- <div class="ft12 color_white_06 margin_right_8">
                    <div>12313</div>
                    <div>人正在玩</div>
                </div>
                <div class="ft12 color_white_04">
                    <div>标签1</div>
                    <div>标签2</div>
                    <div>标签3</div>
                </div> -->
            </div>
        </div>
        <div class="right">
            <div class="ft16 back2 color_white_1 font_weight">{{ Math.floor( (otherPeopleGameListData.lowPrice/otherPeopleGameListData.steamPrce)*100 )/10 }}折</div>
            <div class="ft20 color_white_1 font_weight">￥{{ Math.ceil(otherPeopleGameListData.lowPrice) }}</div>
            <div class="ft14 color_white_04 textDecor">￥{{ Math.ceil(otherPeopleGameListData.steamPrce) }}</div>
            <div class="viewDetails back2 ft15 color_white_1" @click="publiClick(otherPeopleGameListData.appId)">查看游戏详情</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.gameListMain{
    width: 100%;
    height: 74px;
    border-radius: 4px; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
        width: 156px;
        height: 100%;
        img{display: block;width: 100%;height: 100%;}
    }
    .minddle{
        width: 259px;
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
        width: 165px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        div:{margin-right: 4px;}
        div:nth-of-type(1){
            padding: 2px 7px;
            border-radius:4px;
        }
        div:nth-of-type(3){
            margin-top: 4px;
        }
        .viewDetails{
            width:121px;
            height:40px;
            line-height:40px;
            text-align: center;
            display: none;
        }
    }
}
.gameListMain:hover .right>div{display: none}
.gameListMain:hover .right .viewDetails{display: block}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'otherPeopleGameList',
  props:{
     otherPeopleGameListData:{
         type: Object,
         default: function(){
             return {}
         }
     },
     indexNum:{
         type: Number,
         default: 0
     }
  },
  methods:{
      publiClick(data){
          JumpTo(2,{'appId': data});
      },
      changeIndex(){
          this.$emit('changeVideo', this.indexNum)
      }
  }
}
</script>
