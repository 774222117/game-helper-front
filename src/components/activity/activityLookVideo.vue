<template>
<!-- 播放视频 -->
    <div class="main">
        <div class="alertContent">
            <video class="videoItem" :src="videourl" autoplay="autoplay"></video>
            <div class="activityVideoClose activityVideoClose_bg" @click="cancel"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.main{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    background-color:rgba(3, 7, 23, 0.9);
    z-index: 51;
    .alertContent{
        width: 793px;
        height: 446px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        .videoItem{
            width: 100%;
            height: 100%;
        }
        .activityVideoClose{
            width: 39px;
            height: 39px;
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }
    }

}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'activityLookVideo',
  components:{JumpTo},
  props:['videourl'],
  data(){
      return{
        
      }
  },
  methods:{
    // 取消关闭按钮  暂时没有这个功能
    cancel(){
        this.$emit('change',  false) 
    },
  },
  mounted(){
    console.log(this.videourl)
  }

}
</script>
