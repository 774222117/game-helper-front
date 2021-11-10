<template>
<!-- 活动上面轮询的元素 -->
    <div class="main">
        <div class="items">
            <div class="itemsImg">
                <img class="imgBlock" :src="activityGameItemsData.libraryCapsule" alt="">
            </div>
            <div class="itemsName ft14 color_white_1">{{activityGameItemsData.chinaName == ''?activityGameItemsData.englishName:activityGameItemsData.chinaName}}</div>
        </div>
        <div class="worth worth_bg">
            <div class="ft18 color_white_1">价值：</div>
            <div class="ft18 color_white_1">{{activityGameItemsData.worth}}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.main{
    width: 100%;
    height: 100%;
    .items{
        width: 155px;
        height: 231px;
        position: relative;
        .itemsImg{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            .imgBlock{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .itemsName{
            width: 100%;
            height: 32px;
            text-align: center;
            line-height: 32px;
            position: absolute;
            left: 0;
            bottom: 0;
            background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
        }
    }
    .worth{
        width:117px;
        height:45px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
            color:rgba(32,247,248,1);
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'activityGameItems',
  components:{JumpTo},
  props:{
     activityGameItemsData:{
         type: Object,
         default: function(){
             return {}
         }
     }
  },
  data(){
      return{
        
      }
  },
  methods:{
      publiClick(data){
          JumpTo(2,{'appId': data});
      }
  },
  mounted(){
     
  }

}
</script>
