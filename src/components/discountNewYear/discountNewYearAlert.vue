<template>
    <!-- 大弹窗 -->
   <div class="newyearalert" v-if="discountNewYearType">
       <div class="redBagBox redBagBox_bg" @click="flyingActivity">
           <div class="close alertClose_bg" @click.stop="smallAlert"></div>
       </div>
   </div>
    <!-- 小弹窗 -->
   <div class="smallalert smallalert_bg" v-else @click="flyNewYear"></div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'  //跳转函数

export default {
    name:'discountNewYearAlert',
    components:{ JumpTo },
    data(){
        return {
            discountNewYearType:true,//活动弹窗开关
        }
    },
    inject: ["openRegister"],
    methods:{
        // 点击首页2022折扣活动图片
        flyingActivity(){
            if(!!this.$store.getters.getStorage){
                JumpTo(24);
            }else{
                this.openRegister(true)
            }
        },
        // 活动弹窗变大
        flyNewYear(){
            this.discountNewYearType = true
        },
        // 活动弹窗变小
        smallAlert(){
            this.discountNewYearType = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/discountNewYear/css/homepage.css";
    .newyearalert {
        width: 100%;
        height: calc(100% - 60px);
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 51;
        background-color: rgba(13, 22, 30, 0.7);
        .redBagBox {
            width: 370px;
            height: 409px;
            box-sizing: border-box;
            border-radius: 6px;
            position: absolute;
            left: 0;
            top: 65px;
            right: 0;
            margin:0 auto;
            cursor: pointer;
            .close {
                width: 43px;
                height: 43px;
                top: -40px;
                right: -60px;
                position: absolute;
                cursor: pointer;
                z-index: 22;
            }
        }
    }
    .smallalert {
        width: 132px;
        height: 147px;
        position: fixed;
        bottom: 83px;
        // right: 23px;
        left: 23px;
        z-index: 51;
        cursor: pointer;
    }
</style>