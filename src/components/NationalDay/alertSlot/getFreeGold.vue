<template>
    <!-- 恭喜获得新春好礼 -->
    <div class="alertSlotBox">
        <!-- title -->
        <!-- <div class="title getFreeGold_bg"></div> -->
        <!-- 免费金币 -->
        <!-- <div class="freeGold gold10_bg"></div> -->
        <!-- 好的 -->
        <div class="ready rotate_bg" @click="freeGoldCoin">
            <!-- <div class="BtnClick getGold_bg" ></div> -->
        </div>
    </div>
</template>


<script>
import { EventBus } from "@/utils/eventBus.js";
export default {
    name:'getFreeGold',
    components:{
    },
    data(){
        return {
            lighting:false,//切换按钮点击状态
        }
    },
    inject:['ancestors'],
    mounted(){
        this.ancestors.freeGoldClose = 1
    },
    methods:{
        // 按钮选中未选中状态切换
        BtnShow(data){
            this.lighting = data
        },
        freeGoldCoin(){
            let _this = this;
            //已参加过为true 取反
            if(!_this.ancestors.newReceivedGold){
                _this.$fetch("/lucky/turntable/gold/draw").then(response => {
                //点击领取后需要在首页重新获取我的金币与我的游戏  使用 祖宗页面的 provide 将自身传递给后代组件
                EventBus.$emit('changeMyGold')
                })
            }
            _this.ancestors.showBulletFrameSmallFun(false)
        }
    }
}
</script>


<style lang="scss" scoped>
    .alertSlotBox {
        width: 691px;
        height: 452px;
        position: relative;
        top: 97px;
        left: 0px;
        // 文案
        .title {
            width: 690px;
            height: 50px;
            margin-top: 21px;
        }
        // 免费领取金币图标
        .freeGold {
            width: 153px;
            height: 153px;
            margin: 66px auto 0;
        }
        // 好的
        .ready {
            width: 506px;
            height: 545px;
            position: relative;
            display: flex;
            left: 50px;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            // .BtnClick {
            //     width: 240px;
            //     height: 75px;
            //     position: absolute;
            //     z-index: 3;
            //     cursor: pointer;
            // }
        }  
    }
</style>