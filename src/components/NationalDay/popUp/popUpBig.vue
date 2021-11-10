<template>
<!-- 大 的弹框 -->
<div class="bulletFrameSmallMain">
    <!-- 背景主体 -->
    <div class="bulletFrameSmallContent BigPopUp_bg"></div>
    <!-- 背景光 -->
    <!-- <div class="bulletFrameSmallLight"></div> -->
    <!-- 插槽内容 -->
    <div class="bulletalert">
        <!-- 关闭按钮 -->
        <div class="close luckNewYearclose_bg" @click="cancel"></div>
        <slot name="contents"></slot>
    </div>
</div>
</template>

<script>
export default {
  name: 'popUpBig',
  components:{

  },
  data(){
    return {
     
      }
  },
  created(){
      
  },
  mounted(){
  
  },
  methods:{
    // 取消关闭按钮
    cancel(){
        this.$emit('change',  false) 
    },
  }
}

</script>


<style lang="scss" scoped>
.bulletFrameSmallMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(13, 22, 30, 0.7);
    .bulletFrameSmallContent{
        width: 820px;
        height: 466px;
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        .contents{
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 11;
            cursor: pointer;
        }
        .btnsBox{
            width: 691px;
            height: 160px;
            background-color: yellowgreen;
            cursor: pointer;
            position: relative;
            z-index: 11;
        }
    }
    // .bulletFrameSmallLight{
    //     width: 1236px;
    //     height: 690px;
    //     position: absolute;
    //     top: 62px;
    //     left: 0;
    //     right: 0;
    //     margin: 0 auto;
    // }
    .bulletalert {
        width: 821px;
        height: 466px;
        position: absolute;
        top: 90px;
        left: 0;
        right: 0;
        margin: 0 auto;
        .close{
            width: 48px;
            height: 48px;
            position: absolute;
            right: -24px;
            top: -28px;
            cursor: pointer;
            z-index: 22;
        }
    }
    
}
</style>
