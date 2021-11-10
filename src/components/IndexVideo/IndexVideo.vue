<template>
    <div class="indexView bg_color_3 border_radius_4">
       <div class="videoBox">
           <div class="leftVideoBtn videoBtnPublicSty dispCenter indexVideoLeftBtn_bg" @click="backBtnClickFun"></div>
           <div class="rightVideoBtn videoBtnPublicSty dispCenter indexVideoRightBtn_bg"  @click="arrowBtnClickFun"></div>
           <div class="VideoPlayBox bg_color_1" @click="publiClick(itemDatas.appId)">
              <video :src="itemDatas.gameImages[0].carouselAddress" autoplay muted @ended="videoPlayEnd()"></video>
           </div>
       </div>
       <div class="gameInfoBox">
           <div class="gameInfoBoxLeft">
               <img :src="itemDatas.libraryCapsule" alt="">
           </div>
           <div class="gameInfoBoxMiddle">
               <div class="gameInfoBoxMiddleTopTitle ft14 color_white_1 textOver">{{itemDatas.englishName}}</div>
               <div class="gameInfoBoxMiddleBtmPrice">
                   <div class="gameInfoDiscount ft16 ft_weight color_white_1 topLabelIcon_red1">{{ ( (itemDatas.lowPrice/itemDatas.steamPrce).toFixed(2)*10 ).toFixed(1) }}折</div>
                   <div class="gameInfoCurrentPrice margin_left_8 ft18 ft_weight color_white_1">$ {{itemDatas.lowPrice}}</div>
                   <div class="gameInfoOriginalPrice margin_left_4 ft14 ft_weight color_white_04 textDecor">$ {{itemDatas.steamPrce}}</div>
               </div>
           </div>
           <div class="gameInfoBoxRight">
               <div class="checkBtn ft16 color_white_1 ft_weight btnBg_active" @click="publiClick(itemDatas.appId)">Check</div>
           </div>
       </div>
    </div>
</template>
<style lang="scss" scoped>
.indexView{
    width: 564px;
    height: 100%;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    .videoBox{
        width: 544px;
        height: 306px;
        margin: 0 auto;
        position: relative;
        background-color: #5a5656;
        cursor: pointer;
        .VideoPlayBox{
            width: 100%;
            height: 100%;
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            video,img{width: 100%;height: 100%;display: block;}
        }
        .videoBtnPublicSty{
            width: 50px;
            height: 72px;
            font-size: 24px;
            transform: translateY(117px);
            border-radius:0px 4px 4px 0px;
            background-color: rgba(0,0,0,1);
            position: absolute;
            top: 0;
            z-index: 10;
            opacity: 0.4;
            .btnIconBox{
                width: 25px;
                height: 31px;
            }
        }
        .videoBtnPublicSty:hover{opacity: 1;}
        .leftVideoBtn{left: 0;}//background:linear-gradient(270deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
        .rightVideoBtn{right: 0;}//background:linear-gradient(270deg,rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
    }
    .gameInfoBox{
        width: 544px;
        height: 76px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .gameInfoBoxLeft{
            width: 53px;
            height: 76px;
            &>img{display: block;width: 100%;height: 100%;}
        }
        .gameInfoBoxMiddle{
            width: 333px;
            height: 76px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding-left: 8px;
            .gameInfoBoxMiddleTopTitle{
                width: 100%;
                height: 24px;
            }
            .gameInfoBoxMiddleBtmPrice{
                width: 100%;
                height: 24px;
                display: flex;
                align-items: center;
                .gameInfoDiscount{
                    width: 55px;
                    height: 24px;
                    text-align: center;
                    position: relative;
                }
            }
        }
        .gameInfoBoxRight{
            width: 150px;
            height: 76px;
            &>.checkBtn{
               width:150px;
                height:32px;
                cursor: pointer;
                text-align: center;
                line-height: 32px;
                border-radius:2px;
                margin-top: 34px;
            }
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'indexView',
  components:{JumpTo},
  props:{
     indexVideoData:{
         type: Array,
     }
  },
  data(){
      return {
          itemDatas:'',
          itemsLength : 0
      }
  },
  created(){
      this.itemDatas = this.indexVideoData[this.itemsLength]
  },
 
  methods:{
    backBtnClickFun(){
        this.itemsLength--
        this.changeNum(this.itemsLength,5)
        this.itemDatas = this.indexVideoData[this.itemsLength]
    },
    arrowBtnClickFun(){
        this.itemsLength++
        this.changeNum(this.itemsLength,5)
        this.itemDatas = this.indexVideoData[this.itemsLength]
        console.log(this.itemDatas)
    },
    changeNum(num,lengths){
        if(num > lengths){
            num = num % lengths
        }else if(num < 0){
            num = num * -1 % lengths
        }else if(num == lengths){
            num = 0
        }
       this.itemsLength = num
    },
    publiClick(data){
        JumpTo(2,{'appId': data});
    },
    videoPlayEnd(){
        this.itemsLength++
        this.changeNum(this.itemsLength,5)
        this.itemDatas = this.indexVideoData[this.itemsLength]
    }
  }
}
</script>
