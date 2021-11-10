<template>
<!-- 抽奖动画弹框 -->
    <div class="newyearalert">
        <!-- 新春红包框 -->
        <div class="redBagBox" :class="newYearAnim == 1 ? 'animation1':''">
            <!-- 金光 -->
            <div class="lighting goldLighting_bg"></div>
            <!-- 红包 -->
            <div class="envelopes turnRedBag_bg"></div>
            <!-- 动画金光 -->
            <div class="goldlighting">
                <div class="lighting gold_lighting_bg"></div>
            </div>
        </div>
    </div>

</template>

<script>
import store from '@/store'
import JumpTo from '@/utils/jumpTo'  //跳转函数
import { EventBus } from "@/utils/eventBus.js";
export default {
    name:'nationalDayAlertAnime',
    components:{store,JumpTo},
    props:['newYearAlertAnimeQuery'],
    data(){
        return {
            newYearAnim:0
        }
    },
    inject:['ancestors'],
    mounted(){
       this.newYearAnim = 1
       this.ancestors.animation = 1
       setTimeout(()=>{ this.closeAlert() },1400)
    },
    methods:{
        closeAlert(){
            this.$emit('change',false,this.newYearAlertAnimeQuery) 
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/NationalDay/css/homepage.css";

    .newyearalert {
        width: 100%;
        height: calc(100% - 60px);
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 51;
        background-color: rgba(13, 22, 30, 0.5);
        .redBagBox {
            width: 588px;
            height: 649px;
            box-sizing: border-box;
            border-radius: 6px;
            position: absolute;
            left: 0;
            top: 85px;
            right: 0;
            margin:0 auto;
            .lighting {
                width: 1267px;
                height: 780px;
                position: absolute;
                margin-left: -347px;
                z-index: 1;
            }
            // 红包
            .envelopes {
                width: 325px;
                height: 476px;
                position: absolute;
                left: 0;
                right: 0;
                margin:0 auto;
                animation:envelopes 1s 0.5s linear;
            }
            // 金光
            .goldlighting {
                width: 100%;
                height: 100%;
                position: relative;
                .lighting {
                    width: 3071px;
                    height: 3071px;
                    left: -1180px;
                    right: 0;
                    top: 200px;
                    bottom: 0;
                    margin: auto;
                    opacity: 0;
                    transform-origin: 48% 45%;
                    animation:goldlighting 1s 0.5s linear;
                }
            }
        }
        .close {
            width: 50px;
            height: 50px;
            margin-left: 750px;
            margin-top: 90px;
            cursor: pointer;
            z-index: 10;
            position: absolute;
        }
    }
    .animation1 {animation:newYearAlert 1s linear;
            animation-fill-mode: forwards;}
    // 红包掉落动画
    @keyframes newYearAlert{
        0%{transform: translate(0,-500px);opacity: 1;}
        10%{transform: translate(0,-200px);opacity: 1;}
        20%{transform: translate(0,80px);opacity: 1;}
        30%{transform: translate(0,0px);opacity: 1;}
        40%{transform: translate(0,-40px);opacity: 1;}
        50%{transform: translate(0,0);opacity: 1;}
        60%{transform: translate(0,0);opacity: 1;}
        70%{transform: translate(0,0);opacity: 1;}
        80%{transform: translate(0,0);opacity: 1;}
        90%{transform: translate(0,0);opacity: 1;}
        100%{transform: translate(0,0);opacity: 1;}
    }

    // 金光逐渐变大隐藏动画
    @keyframes goldlighting{
        0%{transform: scale(0);opacity: 1;}
        30%{transform: scale(0.3);opacity: 1;}
        60%{transform: scale(0.9);opacity: 1;}
        80%{transform: scale(1.3);opacity: 1;}
        100%{transform: scale(1.5);opacity: 0;}
    }

    // 红包隐藏动画
    @keyframes envelopes{
        0%{transform: scale(1);opacity: 1;}
        30%{transform: scale(1);opacity: 1;}
        60%{transform: scale(1);opacity: 0.7;}
        80%{transform: scale(1);opacity: 0.3;}
        100%{transform: scale(1);opacity: 0;}
    }
</style>