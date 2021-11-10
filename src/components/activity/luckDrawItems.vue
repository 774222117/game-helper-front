<template>
<!-- 抽奖游戏 组件 -->
    <div class="main">
        <div class="items">
            <div class="itemsImg">
                <img class="imgBlock" :src="luckDrawItemsData.image" alt="">
            </div>
            <div class="maskBg"></div>
        </div>
        <div class="itemsBtm">
            <div class="itemsName ft14 color_white_1 textOver">{{luckDrawItemsData.chinaName == ''? luckDrawItemsData.englishName : luckDrawItemsData.chinaName}}</div>
            <div class="ft14 color_white_1 worth">¥{{luckDrawItemsData.worth}}</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.main{
    width: 100%;
    height: 100%;
    .items{
        width:202px;
        height:96px;
        border-radius:4px;
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
        .maskBg{
            width: 100%;
            height:37px;
            background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
            border-radius:4px; 
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
    .itemsBtm{
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .itemsName{
            width: 150px;
            text-indent: 10px;
        }
        .worth{
            width:52px;
            height:17px;
            line-height: 16px;
            text-align: center;
            color:rgba(0,255,255,1);
            border:1px solid rgba(0,206,206,1);
        }
    }
    
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'luckDrawItems',
  components:{JumpTo},
  props:{
    luckDrawItemsData:{
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
