<template>
  <!-- 没有评测 -->
  <div class="noCommentMain" :style="!!heights ?  'height:'+heights +'px':'height:289px'">
      <div class="noComment" :style="!!heights ?  'margin-top: 60px;':'margin-top: 50px;'">
          <!-- 上面的图片名字等 -->
            <div class="top"><svg-icon iconClass="noCommentBg" class="svg_icon"></svg-icon></div>
            <!-- 底部文案 -->
            <div class="bottomText">这是一片没有评测的荒原</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'noComment',
  props: ['heights'],
  data(){
      return {
         
      }
  },
  mounted(){

  },
  methods:{
  

  },
};
</script>
<style lang="scss" scoped>
.noCommentMain{
    width: 100%;
    height: 289px;
    display: flex;
    justify-content: center;
    .noComment{
        width: 184px;
        height: 128px;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        // 上面的
        .top{
            width: 151px;
            height: 86px;
        }
        // 底部的发布时间评测人数
        .bottomText{
            width:100%;
            height:21px;
            font-size:16px;
            color:rgba(86,159,203,1);
            line-height:21px;
            text-align: center;
        }
    }
    
}
</style>
