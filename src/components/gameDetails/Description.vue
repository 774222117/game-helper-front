<template>
    <div class="descriptionBox" :class="isCutOut?'opens':'cutOut'">
      <div class="contents color_white_08" v-html="description.description">
        {{description.description}}
      </div>
      <div :class="isCutOut?'btmMaskOpen':'btmMask'">
        <div class="maskBg"></div>
        <div class="maskText"><div class="text ft14 color3" @click="changeMask">{{isCutOut?'收起全部':'展开阅读'}}</div></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Description',
  props:{
    description:{
      type: Object,
      default: function(){
        return {description:{}}
      }
    }
  },
  data(){
    return{
      isCutOut:false,   //是否展开
    }
  },
  methods:{
    changeMask(){
      this.isCutOut = !this.isCutOut
    }
  },
  mounted(){
      // console.log(this.description)
  }
}
</script>

<style lang="scss" scoped>
@import 'gameDetailsPublic.css';
.contents{
  padding-bottom: 50px;
}
.cutOut{
  height: 262px;
  overflow: hidden;
  position: relative;
}
.opens{
  height: auto;
  position: relative;
}
.btmMask{
  width: 100%;
  height: 120px;
  position: absolute;
  bottom: 0;
  .maskBg{
    width: 100%;
    height: 70px;
    background:linear-gradient(180deg,rgba(6,23,34,0.44) 0%,rgba(6,23,34,1) 100%);
  }
  .maskText{
    width: 100%;
    height: 50px;
    background:rgba(6,23,34,1);
    text-align: right;
    cursor: pointer;
    .text{
      width: 70px;
      text-align: right;
      float: right;
    }
  }
}
.btmMaskOpen{
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  .maskBg{
    width: 100%;
    height: 70px;
    background:linear-gradient(180deg,rgba(6,23,34,0.44) 0%,rgba(6,23,34,1) 100%);
    display: none;
  }
  .maskText{
    width: 100%;
    height: 50px;
    background:rgba(6,23,34,1);
    text-align: right;
    cursor: pointer;
    .text{
      width: 70px;
      text-align: right;
      float: right;
    }
  }
}
</style>