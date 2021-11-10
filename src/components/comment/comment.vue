<template>
  <!-- 评测 -->
  <div class="commentMain">
      <!-- 上面的图片名字等 -->
      <div class="top">
          <!-- 用户图片  名字 -->
          <div class="topLeft">
              <div class="commentIcon userLoginSuccess_bg"></div>
              <div class="commentPeople ft14 color_white_08 font_weight">{{items.commentatorNickname}}</div>
          </div>
          <!-- 推荐 时间 -->
          <div class="topRight">
              <div class="recommendTextBox ft16 color_white_1"><div class="recommendText">推荐</div> <div class="recommendIcon"> <svg-icon iconClass='fabulous' className='svg_icon'></svg-icon> </div> </div>
              <div class="recommendTimer ft12 color_white_06">评测时{{items.playedHours}}小时</div>
          </div>
      </div>
      <!-- 中间的评测信息 -->
      <div class="midleComment" :style="isCutOut === true?'height: auto;':'height: 152px;'" v-if="items.estimateContentLength > 300">
          <div class="commentBox ft14 color_white_08" :style="isCutOut === false?'padding-bottom: 10px;':'padding-bottom: 35px;;'" v-html="items.commentContent"></div>
          <div class="btmMask" :style="isCutOut === false?'height: 77px;':'height: 37px;'">
              <div class="maskTop" v-show="isCutOut === false"></div>
              <div class="maskBtm"><div class="maskBtnClick ft14 color3" @click="changeMask">{{isCutOut?'收起全部':'展开阅读'}}</div></div>
          </div>
      </div>
      <div class="midleComment" v-else>
          <div class="commentBox ft14 color_white_08" v-html="items.commentContent"></div>
      </div>
      <!-- 底部的发布时间评测人数 -->
      <div class="bottomInfo">
          <div class="ft12 color_white_06">发布于：{{items.postTime}}</div>
          <div class="ft12 color_white_06">{{items.commentValue}}人觉得有价值</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: ['items'],
  data(){
      return {
          isCutOut:false,
      }
  },
  mounted(){

  },
  methods:{
    changeMask(){
      this.isCutOut = !this.isCutOut
    },

  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return MM + '月' + d +'日';
    },
    interceptStr:function(value){
        return value.slice(5)
    }
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
    width: 100%;
    padding-top: 25px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    // 上面的
    .top{
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // 左边名字 用户头像
        .topLeft{
            width: 49%;
            height: 100%;
            display: flex;
            .commentIcon{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                img{display: block;width: 100%;height: 100%;}
            }
            .commentPeople{
                margin-left: 10px;
                line-height: 30px;
            }
        }
        // 右边推荐 时间
        .topRight{
             width: 49%;
            height: 100%;
            .recommendTextBox{
                width: 100%;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                .recommendText{
                    height: 20px;
                    line-height: 20px;
                    margin-right: 4px;
                }
                .recommendIcon{
                    width: 20px;
                    height: 20px;
                    box-sizing: border-box;
                }
            }
            .recommendTimer{
                text-align: right;
                line-height: 20px;
            }
        }
    }
    // 中间的评测内容
    .midleComment{
        width: 100%;
        padding-top:15px;
        overflow: hidden;
        position: relative;
        .commentBox{
            width: 100%;
            height: 100%;
            line-height:24px;
            letter-spacing:1px;
            padding-bottom: 10px;
        }
        .btmMask{
            width: 100%;
            height: 77px;
            position: absolute;
            bottom: 0;
            
            .maskTop{
                width: 100%;
                height: 40px;
                background:linear-gradient(180deg,rgba(6,23,34,0.44) 0%,rgba(6,23,34,1) 100%);
            }
            .maskBtm{
                width: 100%;
                height: 37px;
                background-color: rgba(6, 23, 34, 1);
                .maskBtnClick{
                    float: right;
                    cursor: pointer;
                }
            }
        }
    }
    // 底部的发布时间评测人数
    .bottomInfo{
        width: 100%;
        height: 55px;
        display: flex;
        justify-content:space-between;
    }
}
</style>
