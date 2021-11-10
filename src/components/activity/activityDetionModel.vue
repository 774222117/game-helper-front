<template>
<!-- 挽留 -->
    <div class="main">
        <div class="alertContent">
            <!-- <div class="activityVideoClose activityVideoClose_bg" @click="cancel"></div> -->
            <div class="detionBox detion_bg">
                <div class="textColor1">确定放弃</div>
                <div class="textColor2">立减￥{{detionModelData}}</div>
                <div class="textColor1">的新人礼包吗？</div>
            </div>
            <div class="btnBox">
                <div class="text1 ft18 " @click="receiveGame(1)">含泪放弃</div>
                <div class="text2 immediateDiscount_bg" @click="receiveGame(3)"></div>
            </div>
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
        .activityVideoClose{
            width: 39px;
            height: 39px;
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }
        .detionBox{
            width: 549px;
            height: 201px;
            margin: 80px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            .textColor1{
                font-size: 24px;
                color: rgba(32, 247, 248, 0.67);
                line-height: 24px;
            }
            .textColor2{
                font-size: 28px;
                color: rgba(32, 247, 248, 1);
                line-height: 28px;
            }
        }
        .btnBox{
            width: 549px;
            height: 48px;
            margin: 40px auto;
            display: flex;
            justify-content: space-between;
            .text1{
                font-weight:bold;
                color:rgba(0,249,251,1);
                line-height: 36px;
                margin-right: 24px;
                cursor: pointer;
            }
            .text2{
                width: 194px;
                height: 48px;
                cursor: pointer;
                margin-right: 18px;
            }
        }
    }

}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'detionModel',
  components:{JumpTo},
  props:['detionModelData'],
  data(){
      return{
        
      }
  },
  methods:{
    // 取消关闭按钮  暂时没有这个功能
    cancel(){
       
    },
    receiveGame(data){
        this.$emit('change',  false,data) 
    }
  },
  mounted(){
    
  }

}
</script>
