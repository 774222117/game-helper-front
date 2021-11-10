<template>
  <!-- 组合包整框 -->
  <div class="container">
    <!-- 轮播游戏及侧边抢购信息整框 -->
    <div class="packages">
      <!-- 左侧游戏框 -->
      <div class="main">
        <!-- 三个游戏整框 -->
        <div
          class="bannerPic"
          :style="{
            transform: 'translateX(' + translateX + 'px)',
            width: itemData.games.length * 279 + 'px',
          }"
        >
          <transition v-for="(i, index) in itemData.games">
            <!-- 单个游戏展示 -->
            <div
              class="itemGame"
              @mouseenter="hoverItemsFun(true, i)"
              @mouseleave="hoverItemsFun(false, i)"
            >
              <!-- 视频框 -->
              <div class="gameMask">
                <div class="videoBox" v-show="isShowVideo && videoData == i">
                  <video
                    class="videoPlay"
                    autoplay
                    muted
                    loop
                    :src="videoData.sixVideo"
                  ></video>
                </div>
              </div>
              <!-- 游戏图片 -->
              <div class="imgPic">
                <img class="imgBtn" :src="i.image" />
              </div>
              <!-- 游戏名称框 -->
              <div class="textPic">
                <!-- 游戏名称 -->
                <div class="text">
                  <p class="ft14 color_white_1 font_weight">
                    {{ i.chinaName == "" ? i.englishName : i.chinaName }}
                  </p>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- 左侧游戏框左右两侧按钮 -->
        <div class="leftBtn packagesTemplatesLeft_bg" @click="leftActive"></div>
        <div
          class="rightBtn packagesTemplatesRight_bg"
          @click="rightActive"
        ></div>
      </div>
      <!-- 右侧抢购文字框 -->
      <div class="texts">
        <!-- 最上面标题 -->
        <div class="title">
          <div class="titleName ft16 color_white_1 font_weight">
            {{itemData.title}}
          </div>
        </div>
        <!-- 第二排几款游戏 -->
        <div class="gameNum ft14 color_white_1 font_weight">
          共
          <span class="gameNumColor ft18">{{ itemData.games.length }}</span>
          款游戏
        </div>
        <!-- 绿色按钮折扣 -->
        <div class="text bubble4_bg">
          <div class="ft14 font_weight">
            {{ itemData.radio }}折，立减￥{{ itemData.discount }}
          </div>
        </div>
        <!-- 蓝色折扣价格和抢购按钮 -->
        <div class="purchase blueButton" @click="buyOrder">
          <div class="newPrice ft18 color_white_1 font_weight">
            ¥{{ itemData.salePrice}}
          </div>
          <div class="priced ft14">¥{{ itemData.groupPrice}}</div>
          <div class="goBuy ft16 color_white_1 font_weight">
            {{ itemData.button }}
          </div>
        </div>
      </div>
    </div>
    <elevenActivityAllOrder
      v-if="displayAllOrder"
      @change="displayAllOrderFun"
      :allOrderData="allOrderData"
    />
  </div>
</template>

<script>
import elevenActivityAllOrder from "@/components/elevenActivity/elevenActivityAllOrder";

export default {
  name: "packages",
  props: ["itemData"],
  components: { elevenActivityAllOrder },
  inject: ["reload", "openRegister"],
  data() {
    return {
      activeNum: 0,
      translateX: 0, //265
      isShowVideo: false, //视频隐藏
      videoData: "",
      dataslength: 0,
      displayAllOrder: false, //全部订单显示隐藏
      allOrderData: "",
    };
  },
  mounted() {
    this.dataslength = this.itemData.games.length;
  },
  methods: {
    // 鼠标移入视频
    hoverItemsFun(data, obj) {
      this.videoData = obj;
      this.isShowVideo = data;
    },
    //左边按钮
    leftActive() {
      this.activeNum = this.activeNum <= 0 ? 0 : this.activeNum - 1;
      this.translateX = this.activeNum * -279;
    },
    //右边按钮
    rightActive() {
      this.activeNum =
        this.activeNum >= this.dataslength - 3
          ? this.dataslength - 3
          : this.activeNum + 1;
      this.translateX = this.activeNum * -279;
    },
    buyOrder() {
      //判断登录
      if (!!this.$store.getters.getStorage) {
        // 订单所需数据 打开订单
        this.allOrderData = {
          groupId: this.itemData.groupId, //包id
          channelId: this.$store.getters.getChannelIdFun,
          // 'image': this.itemData.image,
          payType: 2,
          balanceType: 0,
          // 'ratio':this.gamePriceData.ratio,
          // 'price':this.gamePriceData.price,
          // 'steamPrce':this.gameInfo.steamPrce,
          // 'gamePriceData':this.gamePriceData
        };
        // 显示全部订单
        this.displayAllOrderFun(true);
      } else {
        this.openRegister(true);
      }
    },
    // 订单关闭
    displayAllOrderFun(data) {
      this.displayAllOrder = data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/elevenActivity/elevenActivity.css";

.container {
  width: 1164px;
  height: 205px;
  .packages {
    width: 1150px;
    height: 165px;
    margin-left: 16px;
    position: relative;
    .main {
      width: 873px;
      height: 165px;
      position: relative;
      float: left;
      overflow: hidden;
      background: #000000;
      display: flex;
      justify-content: space-between;
      transform: all 0.3 linear;
      //按钮
      .leftBtn {
        width: 35px;
        height: 165px;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
      }
      .rightBtn {
        width: 35px;
        height: 165px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
      //游戏框
      .bannerPic {
        width: 823px;
        height: 165px;
        display: flex;
        justify-content: space-between;
        transition: all 0.3s linear;

        .textPic {
          width: 265px;
          height: 77px;
          margin-top: -39px;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            #000000 55%,
            #000000 100%
          );
          z-index: 1;
          position: absolute;
          .text {
            width: 265px;
            height: 38px;
            position: absolute;
            margin-top: 38px;
            p {
              line-height: 38px;
              margin-left: 5px;
            }
          }
        }

        //单个游戏框
        .itemGame {
          width: 265px;
          height: 165px;
          float: left;
          margin-right: 15px;
          z-index: -1;

          .gameMask {
            position: absolute;
            width: 265px;
            height: 127px;
            .videoBox {
              width: 265px;
              height: 127px;
              margin: 0 auto;
              background: #000000;
              .videoPlay {
                width: 100%;
                height: 100%;
                display: block;
              }
            }
          }

          .imgPic {
            width: 265px;
            height: 127px;
            .imgBtn {
              height: 100%;
              width: 100%;
              display: block;
            }
            // overflow: hidden;
          }
        }
      }
    }
    .texts {
      width: 276px;
      height: 165px;
      float: right;
      // position: absolute;
      // right: 0;
      // top: 0;
      .titleName {
        width: 176px;
        height: 22px;
        line-height: 22px;
        margin-left: 15px;
        margin-top: 1px;
      }
      .gameNum {
        width: 80px;
        height: 23px;
        line-height: 19px;
        margin-top: 6px;
        margin-left: 15px;
        .gameNumColor {
          color: #d6ff47;
        }
      }
      .text {
        width: 159px;
        height: 46px;
        margin-top: 33px;
        margin-left: 77px;
        position: absolute;
        display: flex;
        // align-items: center;
        line-height: 42px;
        justify-content: center;
        div {
          width: 130px;
          height: 19px;
          color: #d6ff47;
          // line-height: 19px;
        }
      }
      .purchase {
        width: 246px;
        height: 44px;
        // background: linear-gradient(90deg, #34abdc 0%, #367cce 100%);
        border-radius: 5px;
        margin-left: 15px;
        margin-top: 66px;
        cursor: pointer;
        .newPrice {
          width: 82px;
          height: 26px;
          line-height: 21px;
          margin-left: 16px;
          margin-top: 4px;
          position: absolute;
        }
        .priced {
          width: 30px;
          height: 18px;
          font-weight: 400;
          line-height: 18px;
          position: absolute;
          margin-left: 17px;
          margin-top: 24px;
          text-decoration: line-through;
          color: #bfe9ff;
        }
        .goBuy {
          width: 72px;
          height: 24px;
          line-height: 24px;
          position: absolute;
          margin-left: 150px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>