<template>
    <!-- 恭喜抽中以下游戏 -->
    <div class="alertSlotBox">
        <!-- title -->
        <div class="title congratulationsGame_bg"></div>
        <div class="gameContent">
            <!-- 抽中的单个游戏 -->
            <div class="changeGame" v-for="data in gameItemSData">
                <gameItemChange :item='data' />
            </div>
        </div>
        <!-- 好的 -->
        <div class="ready">
            <div class="BtnClick ready_bg"  @click="close"></div>
        </div>
       
    </div>
</template>


<script>
import gameItemChange from '@/components/NationalDay/gameItem/gameItemChange';//抽中的单个游戏(尺寸最大)
import { EventBus } from "@/utils/eventBus.js";

export default {
    name:'congratulationsGame',
    components:{
        gameItemChange
    },
    inject:['ancestors'],
    data(){
        return {
            lighting:false,
            gameItemSData:'', //抽中的数据
        }
    },
    mounted(){
        this.getOneLuck();
    },
    methods:{
        // 按钮选中未选中状态切换
        BtnShow(data){
            this.lighting = data
        },
        // 点击 好的 关闭弹窗
        close(){
            this.$emit('change',false)
        },
        //抽游戏 /lucky/turntable/draw
        getOneLuck(){
            let _this = this;
            _this.$fetch("/lucky/turntable/draw").then(response => {
                //领取成功
                // console.log(response)
                if(response.flag){
                    _this.gameItemSData = response.data
                    // console.log(response)
                }else{
                    console.log('抽游戏失败')
                    _this.$emit('change',true,{'changeSolt':'unableToExtract'})
                }
                EventBus.$emit('changeMyGold')
                EventBus.$emit('changeMyGame')
            })    
        },
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
        .gameContent {
            width: 680px;
            height: 240px;
            // left: 74px;
            // top: 80px;
            margin: 24px 0 0 22px;
            // border: 1px white solid;
            // position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            //抽中的单个游戏
            .changeGame {
                // width: 211px;
                // height: 98px;
                border: 1px solid #FED47E;
                margin-right: 20px;
                // margin: 85px 0 0 237px;
                // position: absolute;
            }
        }
        // 文案
        .title {
            width: 302px;
            height: 76px;
            margin-top: 10px;
            margin-left: 200px;
        }
        // 好的
        .ready {
            width: 294px;
            height: 135px;
            // margin: 58px 0 0 199px;
            left: 199px;
            top: 304px;
            position: absolute;
            display: flex;
            justify-content: center;
            // align-items: center;
            .BtnClick {
                width: 240px;
                height: 75px;
                position: absolute;
                z-index: 3;
                top: 50px;
                cursor: pointer;
            }
        }
              
    }

</style>