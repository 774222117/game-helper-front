<template>
  <div class="errBox RobotoRegular">
     <div class="errBgBox err404_bg">
         <div class="backBtn bg_color_4" @click="backFun">
             <div class="ft16 color_white_1">Get back</div>
             <div class="backIcon"><svg-icon iconClass='turnAround' className='svg_icon'></svg-icon></div>
         </div>
         
     </div>
  </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'
export default {
  components: {JumpTo},
  data(){
    return {
     
    }
  },
  activated(){
     
  },
  watch:{
    
  },
  computed:{
   
  },
  methods:{
    backFun(){
        JumpTo(0)
    }
  }
};
</script>
<style lang="scss" scoped>
.errBox{
    width: 100%;
    height: 760px;
    overflow: hidden;
    .errBgBox{
        width: 481px;
        height: 481px;
        margin: 80px auto 0;
        position: relative;
        .backBtn{
            width:160px;
            height:44px;
            border-radius:2px;
            position: absolute;
            bottom: 40px;
            left: 0;
            right: 0;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            cursor: pointer;
            .backIcon{
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>
