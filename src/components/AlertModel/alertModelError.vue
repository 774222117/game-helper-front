<template>
<div class="alertMain">
    <div class="alertContent">
        <!-- 关闭按钮 -->
        <div class="closeBtn opc_hover" @click="cancel"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
        <div class="paymentSuccess">
            <div class="paymentSuccessSvg">
                <svg-icon iconClass="stockErr" class="svg_icon"></svg-icon>
            </div>
            <div class="paymentSuccessText ft18 color_white_1 font_weight">当前库存不足，请稍后再试</div>
            <div class="paymentSuccessBtn back5 ft14 color_white_1" @click="confirm">好的</div>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.alertMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 11;
    background-color: rgba(0,0,0,0.8);
    .alertContent{
        width: 633px;
        height: 450px;
        background-color: rgba(0,0,0,0.8);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        // 关闭按钮
        .closeBtn{
            width: 30px;
            height: 30px;
            cursor: pointer;
            float: right;
            margin: 20px 20px 18px 0;
        }
        // 库存不足
        .paymentSuccess {
            .paymentSuccessSvg {
                width: 134px;
                height: 134px;
                margin: 0.83rem auto 0.06rem;
            }
            .paymentSuccessText {
                text-align: center;
                line-height: 23px;
                margin-bottom: 0.53rem;
            }
            .paymentSuccessBtn {
                width: 246px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                cursor: pointer;
                border-radius: 4px;
                margin: auto;
            }
        }
    }
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
export default {
  name: 'alertModelError',
  components:{JumpTo,store},
  props:['ifModelShow','iserrtype'],
  inject:['reload'],
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
        // this.reload()
    },
    // 确定按钮
    confirm(){
        this.$emit('change',  false)
        // this.reload()
    },
  }
}

</script>
