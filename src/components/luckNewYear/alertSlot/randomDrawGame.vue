<template>
    <!-- 随机抽游戏 -->
    <div class="alertSlotBox">
        <!-- title -->
        <div class="title randomDrawOne_bg"></div>


        <!-- 合成游戏框 -->
        <div class="freeGoldCoin">
            <!-- 游戏展示区 -->
            <div class="gameItem">
                <!-- 左按钮 -->
                <div class="leftBtnBox">
                    <div class="leftBtn leftBtn_bg" @click="leftBtn"></div>
                </div>
                <!-- 中间展示区 -->
                <div class="centerGameBox">
                    <!-- 存放游戏框 -->
                    <div class="centerShow" :style="{ transform: 'translateX(' + distance + 'px)' }">
                        <!-- 显示并包裹gameItem -->
                        <div class="ItemBox" v-for="(item,indexs) in Math.ceil(steryGame.length / 9)">
                            <div class="gameItemHBox" v-for="(data,index) in steryGame"
                            v-if="index >= 9*indexs && index < (indexs + 1)*9">
                                <!-- 单个游戏框 -->
                                <div class="gameItemH">
                                    <gameItemSmall :item='data'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 右按钮 -->
                <div class="rightBtnBox">
                    <div class="rightBtn rightBtn_bg" @click="rightBtn"></div>
                </div>
            </div>
        </div>

        <!-- 分页器 -->
        <div class="pager">
            <div class="pointBox">
                <div class="point" v-for="(page,index) in Math.ceil(steryGame.length / 9)" :class="index == data ? 'ischange' : 'unchange'" @click="pointChange(index)"></div>
            </div>
        </div>


    </div>
</template>


<script>
import gameItemSmall from '@/components/luckNewYear/gameItem/gameItemSmall';//游戏小图

export default {
    name:'randomDrawGame',
    components:{
        gameItemSmall
    },
    props:['steryGame'],
    data(){
        return {
            distance:0,//移动的距离
            num:536,//每个游戏移动的距离
            data:0,//记录每次鼠标点击按钮的值
        }
    },
    mounted(){
    },
    methods:{
        // 左边按钮
        leftBtn(){
            if(this.data > 0){
                this.data -= 1
                this.distance = this.data * this.num * -1
            }
        },
        //右边按钮
        rightBtn(){
            if(this.data < Math.ceil((this.steryGame.length / 9)) -1){
                this.data += 1
                this.distance = this.data * this.num * -1
            }
        },
        // 点击分页器切换游戏
        pointChange(index){
            this.data = index
            this.distance = index * this.num * -1
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
        // 文案
        .title {
            width: 690px;
            height: 50px;
            margin-top: 21px;
        }
                .freeGoldCoin{
                width: 636px;
                height: 260px;
                margin: 0 auto;
                margin-top: 35px;
                .gameItem {
                    height: 173px;
                    display: flex;
                    // 左边按钮
                    .leftBtnBox {
                        width: 50px;
                        height: 260px;
                        position: absolute;
                        .leftBtn {
                            width: 25px;
                            height: 40px;
                            margin-top: 110px;
                            cursor: pointer;
                        }
                    }
                    .centerGameBox {
                    width:536px;
                    height: 260px;
                    position: absolute;
                    left: 76px;
                    overflow: hidden;
                    // 中间游戏框
                        .centerShow {
                            min-width: 536px;
                            height: 260px;
                            display: flex;
                            transition: all 0.5s linear;
                            position: absolute;
                            // 显示并包裹gameItemH
                            .ItemBox {
                                width: 536px;
                                height: 260px;
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: space-between;
                                
                                align-content: space-between;
                                
                                    .gameItemHBox {
                                    width: 163px;
                                    height: 77px;
                                    border: 1px solid #FED47E;
                                    // display: flex;
                                    // justify-content: space-between;
                                    // align-items: space-between;
                                    .gameItemH {
                                        
                                        width: 163px;
                                        height: 77px;
                                        
                                    }
                                }
                            }
                        }
                    }
                    // 右边按钮
                    .rightBtnBox {
                        min-width: 50px;
                        height: 260px;
                        position: absolute;
                        right: 28px;
                        .rightBtn {
                            width: 25px;
                            height: 40px;
                            margin: 110px 0 0 19px;
                            cursor: pointer;
                        }
                    }
                }
            }
            // 分页器
                .pager {
                    width: 639px;
                    height: 55px;
                    display: flex;
                    margin: 0 auto;
                    align-items: center;
                    justify-content: center;
                    .pointBox {
                        display: flex;
                        .point {
                            width: 9px;
                            height: 9px;
                            border-radius: 50%;

                            margin-right: 6px;
                            cursor: pointer;
                        }
                    }
                }
    }

// 选中
.ischange {background: rgba(255,219,9,1);border: 1px solid #000000;}
// 未选中
.unchange {background: rgba(0,0,0,1);}
</style>