<template>
    <!-- 合玩包包含内容 -->
    <div class="alertSlotBox">
        <!-- title -->
        <div class="title includeContent_bg"></div>
        <!-- 内容 -->
        <div class="content">
            <!-- 游戏盒子 -->
            <div class="gameContent" :class="togetherGame.length > 2 ? 'threeGame' : 'twoGame'">
                <!-- 单个游戏盒子 -->
                <div class="gameItemBox" v-for="data in togetherGame">
                    <gameItemSmall :item='data'/>
                </div>
            </div>
        </div>
        <!-- 价值 -->
        <div class="price">
            <!-- 总价值 -->
            <div class="mygold">
                <div class="gold ft18">总价值: </div>
                <div class="myprice ft20 font_weight">￥{{totalPrice}}</div>
            </div>
        </div>
    </div>
</template>


<script>
import gameItemSmall from '@/components/luckNewYear/gameItem/gameItemSmall';//游戏小图

export default {
    name:'includeContent',
    components:{
        gameItemSmall
    },
    props:[],
    inject:['ancestors'],
    data(){
        return {
            togetherGame:'',//存放游戏数据
            totalPrice:0,//合玩包总价值
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            let _this = this;
                _this.$fetch('/lucky/turntable/info/prize',{'key':_this.ancestors.playBag}).then(response => {
                    // console.log(response)
                    _this.togetherGame = response.data
                    _this.totalPrice = response.code
                })
            }
    },
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
        // 内容
        .content {
            width: 100%;
            // height: 76px;
            margin-top: 47px;
            // 游戏盒子
            .gameContent {
                // width: 533px;
                // width: 348px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                // 单个游戏盒子
                .gameItemBox {
                    width: 163px;
                    height: 77px;
                    border: 1px solid #FED47E;
                    margin-right: 19px;
                    margin-bottom: 20px;
                }
            }
        }
        // 价格
        .price {
            width: 100%;
            height: 32px;
            margin-top: 20px;
            .mygold {
                width: 150px;
                height: 32px;
                margin: 0 auto;
                color:rgba(0,0,0,0.85);
                display: flex;
                align-items: center;
                .gold {
                    min-width: 72px;
                    line-height: 32px;
                    padding-left: 6px;
                }
                .myprice {
                    min-width: 58px;
                    height: 32px;
                    margin-left: -2px;
                    color: rgba(255,162,0,1);
                }
            }
        }
    }

.threeGame {width: 563px;flex-wrap: wrap;}
.twoGame {width: 348px;}
</style>