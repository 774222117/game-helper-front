<template>
  <!-- 轮播 重磅推荐 -->
  <div class="commentMain">
    <div class="leftImg">
      <div class="lighting"></div>
      <!-- 顶部游戏推荐选择 -->
      <div class="topOption">
        <!-- 左上游戏logo -->
        <div class="logo"></div>
        <!-- 三个游戏推荐选项 -->
        <div class="titleBar" v-for="(item,index) in recommendInfo">
          <!-- 鼠标移入更多游戏推荐title -->
          <div class="titleOption ft14 font_weight" @mouseenter="changeTitleIn(index,item)" @mouseout="changeTitleOut(index,item)"
          :class="index == currentType?'active':'' ">{{item.title}}</div>
        </div>
      </div>
      <!-- 游戏轮播 -->
      <div class="rotation" v-if="Object.keys(info).length != 0  && currentType !== null">
        <div class="rotationItem" v-for="(item, index) in info[currentType].games" :style="{ transform: 'translateX(' + distance + 'px)' }"
            v-ga_si="{'items':{
              gameInfo:{
                'appId':item.appId || '',
                'name':item.chinaName || item.englishName,
              'promotion_name':recommendInfo[currentType].title
              },
              'item_list_name':recommendInfo[currentType].title,
              'item_list_id':recommendInfo[currentType].title+index
            }}">
          <div class="allItems" @click="bannerClick(item.appId)" @mouseenter="hoverItemsFun(true,index)" @mouseleave="hoverItemsFun(false,index)">
            <!-- 图片层 -->
            <div class="imgBox">
              <img class="imgBlock" :src="item.image" alt="" />
            </div>
            <!-- 视频播放 -->
            <div class="videos" v-if="isShowVideo && videoData === index">
                <video class="imgBlock" autoplay loop muted :src="item.sixVideo"></video>
            </div>
            <!-- 游戏底部信息框 -->
            <div class="gameInfo">
              <!-- 信息框左边价格和名字 -->
              <div class="priceBox">
                <!-- 游戏名称 -->
                <div class="gameName ft14 color_white_1 font_weight">
                  {{ item.chinaName == "" ? item.englishName : item.chinaName }}
                </div>
                <!-- 游戏价格 -->
                <div class="gamePrice ft18 font_weight"><span class="ft12">¥</span>{{ Math.ceil(item.lowPrice)}}<span class="ft12 color_white_06">¥{{ item.steamPrce }}</span>
                </div>
              </div>
              <!-- 信息框右边折扣 -->
              <div class="count ft16 font_weight">{{ item.lowRatio }}折</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 左右按钮 -->
      <div class="leftBtn" @click="leftBtn"></div>
      <div class="rightBtn" @click="rightBtn"></div>
    </div>
  </div>
</template>

<script>
import JumpTo from "@/utils/jumpTo";
export default {
  name: "recommenNewdation",
  props: ["items"],
  data() {
    return {
      recommendInfo:[],//保存数据
      info:[],//保存数据
      data: 0, //记录每次点击按钮的值
      num: 287, //每次需要滚动的距离
      distance: 0, //距离
      currentType:0, //记录选中的标题
      isShowVideo:false, //隐藏视频
      videoData:-1, //当前播放的视频值
      itemLength:0, //记录不同的title获取的游戏长度
    };
  },
  activated() {},
  mounted() {
    this.inits();
  },
  methods: {
    bannerClick(data) {
      JumpTo(2, { appId: data });
    },
    // 左侧按钮
    leftBtn() {
      this.data = this.data - 2 < 0 ? 0 : this.data - 2;
      this.distance = this.data * this.num * -1;
    },
    // 右侧按钮
    rightBtn() {
      // console.log(this.data)
      // console.log(this.itemLength)
      if (this.data >= this.itemLength - 3) {
        this.data = 0;
        this.distance = 0;
      } else {
        // this.data = 0
        // this.data = this.data + 2 >= this.itemLength? this.itemLength: this.data + 2;
        if(this.data + 2 >= this.itemLength){
            this.data = this.itemLength
        }else if(this.data + 2 < this.itemLength){
          if(this.data + 1 >= this.itemLength - 3){
            this.data = this.data + 1
          }else{
            this.data = this.data + 2
          }

        }
        console.log(this.data);
        this.distance = this.data * this.num * -1;
      }
    },
    inits(){
      //更多推荐
      this.$fetch('/index/v2/more/focus').then((response) => {
        //  response.data[0].games = response.data[0].games.concat(response.data[2].games)
        //  response.data[0].games = response.data[1].games.add(1)
        // console.log(response)
        this.recommendInfo = response.data
        this.info = response.data
        this.itemLength = response.data[this.currentType].games.length
        // console.log(this.itemLength)
      })
    },
    // 鼠标移入标题
    changeTitleIn(index,item){
      this.currentType = null
      this.$nextTick(()=>{
        this.currentType = index
        this.distance = 0
        this.itemLength = item.games.length
      })
      // console.log(item)
      // console.log(this.itemLength)
    },
    // 鼠标移出标题
    changeTitleOut(index){
      this.currentType = null
      this.$nextTick(()=>{
        this.currentType = index
        if(index != -1){
          this.currentType = index
        }
      })
      
    },
    // 鼠标移入
    hoverItemsFun(date,index){
      this.videoData = index
      this.isShowVideo = date
    },
  },
};
</script>
<style lang="scss" scoped>
.commentMain {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //  左边图片
  .leftImg {
    width: 1160px;
    height: 100%;
    // background: rgba(20, 43, 58, 1);
    background: url('../../../../public/images/leftbackground.png');
    display: flex;
    justify-content: space-evenly;
    position: relative;
    .lighting {
      width: 317px;
      height: 95px;
      background: url('../../../../public/images/lighting.png');
      position: absolute;
      left: 0;
    }
    .leftBtn {
      width: 40px;
      height: 40px;
      background: url("../../../../public/images/leftBtn.png");
      position: absolute;
      left: 4px;
      top: 122px;
      cursor: pointer;
    }
    .rightBtn {
      width: 40px;
      height: 40px;
      position: absolute;
      z-index: 5;
      background: url("../../../../public/images/rightBtn.png");
      left: 965px;
      top: 122px;
      cursor: pointer;
    }
    .topOption {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 38px;
      top: 12px;
      display: flex;
      .logo {
        width: 30px;
        height: 30px;
        background: url("../../../../public/images/logoOption.png");
      }
      .titleBar {
        width: 98px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        .titleOption {
          width: 90px;
          height: 26px;
          line-height: 26px;
          color: rgba(225, 246, 255,1);
          text-align: center;
          padding: 0px 2px;
        }
      }
    }
    .rotation {
      width: 100%;
      height: 190px;
      position: relative;
      left: 46px;
      top: 68px;
      display: flex;
      overflow: hidden;
      .rotationItem {
        width: 276px;
        height: 190px;
        transition: all 0.2s linear;
        margin-right: 13px;
        .allItems {
          width: 276px;
          height: 190px;
          cursor: pointer;
          position: relative;
          .imgBox {
            width: 100%;
            height: 129px;
            z-index: 3;
            img {
              width: 276px;
              height: 128px;
            }
          }
          .videos {
            width: 276px;
            height: 129px;
            position: absolute;
            top: 0;
            background: rgba(0, 0, 0,1);
          }
          .gameInfo {
            width: 100%;
            height: 50px;
            margin-top: 12px;
            display: flex;
            .priceBox {
              width: 100%;
              height: 52px;
              .gameName {
                width: 100%;
                height: 21px;
                line-height: 19px;
                margin-left: 3px;
              }
              .gamePrice {
                width: 100%;
                height: 31px;
                color: rgba(138, 221, 255,1);
                line-height: 21px;
                margin-left: 1px;
                span {
                  line-height: 15px;
                  font-weight: 400;
                  text-decoration: line-through;
                  margin-left: 2px;
                }
              }
            }
            .count {
              width: 70px;
              height: 40px;
              background: rgba(76, 107, 34,1);
              border-radius: 4px;
              line-height: 39px;
              color: rgba(214, 255, 71,1);
              text-align: center;
              box-sizing: content-box;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}

.active {
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}
</style>
