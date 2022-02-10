<template>
    <!-- 游戏展示 -->
    <div class="gameBox" v-if="true">
        <!-- 游戏图 -->
        <div class="gamePic">
            <img :src="item.image" alt="">
        </div>
        <!-- 游戏价格 -->
        <div class="gamePrice gamePrice2_bg ft12">
            价值:￥<span class="ft12">{{item.steamPrce}}</span>
        </div>
        <!-- 游戏背景渐变 -->
        <div class="Gradual gradual_bg"></div>
        <!-- 游戏名字 -->
        <div class="gameName">
            <!-- <div class="bag bag_bg"></div> -->
            <div class="name ft14 textOver">{{item.chinaName == ''?item.englishName:item.chinaName}}</div>
        </div>
    </div>

    <!-- 游戏已获得样式 -->
    <div class="gameBox" v-else>
        <!-- 背景层 -->
        <div class="gameBack"></div>
        <!-- 红色粉底 -->
        <div class="pinkBack pinkBack_bg"></div>
        <!-- 领取结果状态 -->
        <div class="text ft14">查看礼包</div>
    </div>
</template>


<script>
export default {
    name:'gameItemSmall',
    components:{},
    props:['item'],
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>


<style lang="scss" scoped>
    .gameBox {
        width: 165px;
        height: 79px;
        position: relative;
        // 背景图
        .gamePic {
            width: 167px;
            height: 74px;
            position: absolute;
            right: 0;
            top: 0;
            img {
                position: absolute;
                width: 167px;
                height: 74px;
            }
        }
        // 游戏价格
        .gamePrice {
            width: 77px;
            line-height: 24px;
            position: absolute;
            right: 0px;
            top: 0;
            color: #FFE05C;
            text-align: center;
        }
        // 背景渐变
        .Gradual {
            width: 167px;
            height: 54px;
            position: absolute;
            bottom: 0px;
            right: 0;
        }
        // 游戏名字
        .gameName {
            width: 150px;
            line-height: 32px;
            position: absolute;
            z-index: 2;
            bottom: 0px;
            left: 4px;
            color: #FFD809;
            font-weight: 600;
            text-align: left;
            display: flex;
            align-items: center;
            .name {
                min-width: 70px;
                line-height: 32px;
                margin-left: 6px;
            }
        }
    }
</style>