<template>
    <!-- 游戏展示 -->
    <div class="gameBox" v-if="!!item" @mouseenter="watchBag(true,item)" @mouseleave="watchBag(false,item)">
        <!-- 游戏图 -->
        <div  v-if="item.got == 0 && !isHover">
            <div class="gamePic">
                <img :src="item.image" alt="">
            </div>
            <!-- 游戏价格 -->
            <div class="gamePrice gamePrice_bg ft12">
                价值:￥<span class="ft12">{{item.worth}}</span>
            </div>
            <!-- 游戏背景渐变 -->
            <div class="Gradual gradual_bg"></div>
            <!-- 游戏名字 -->
            <div class="gameName">
                <div class="bag" :class="item.bag == 1 ? 'bag_bg' : 'unbag'"></div>
                <div class="name ft14 textOver">{{item.name}}</div>
            </div>
        </div>
        <!-- 游戏已获得样式 -->
        <div class="gameBox" v-if="item.got == 1 && !isHover">
            <div class="gamePic">
                <img :src="item.image" alt="">
            </div>
            <!-- 背景层 -->
            <div class="gameBack"></div>
            <!-- 红色粉底 -->
            <div class="pinkBack pinkBack_bg"></div>
            <!-- 领取结果状态 -->
            <div class="text ft14">已获得</div>
        </div>
        <!-- 查看礼包鼠标划入样式 -->
        <div class="gameBox" v-if="isHover">
            <div class="gamePic">
                <img :src="item.image" alt="">
            </div>
            <!-- 背景层 -->
            <div class="gameBack"></div>
            <!-- 红色粉底 -->
            <div class="pinkBack pinkBack_bg"></div>
            <!-- 领取结果状态 -->
            <div class="text ft14">查看礼包</div>
        </div>
    </div>
</template>


<script>
export default {
    name:'gameItemBig',
    components:{},
    props:['item'],
    data(){
        return {
            isHover:false,//鼠标移入显示隐藏游戏礼包
        }
    },
    methods:{
        // 抽中之后改变游戏样式
        watchBag(isHover,item){
            if(item.bag == 1 && item.got == 0){
                this.isHover = isHover
            }
        },
    }
}
</script>


<style lang="scss" scoped>
    .gameBox {
        width: 176px;
        height: 82px;
        position: relative;
        // 背景图
        .gamePic {
            width: 176px;
            height: 82px;
            position: absolute;
            img {
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
        // 游戏价格
        .gamePrice {
            width: 77px;
            line-height: 24px;
            position: absolute;
            right: 0;
            top: 0;
            color: rgba(255,224,92,1);
            text-align: center;
        }
        // 背景渐变
        .Gradual {
            width: 176px;
            height: 54px;
            position: absolute;
            bottom: 0;
            left: 0;
        }
        // 游戏名字
        .gameName {
            min-width: 154px;
            line-height: 32px;
            position: absolute;
            z-index: 2;
            bottom: 0;
            left: 10px;
            color: rgba(255,216,9,1);
            font-weight: 600;
            text-align: left;
            display: flex;
            align-items: center;
            .bag {
                width: 12px;
                height: 20px;
            }
            .name {
                min-width: 90px;
                line-height: 32px;
                margin-left: 3px;
            }
        }
    }

    .unbag {display: none;}

    // 已获得
    .gameBox {
        width: 176px;
        height: 82px;
        position: relative;
        // 背景图
        .gamePic {
            width: 176px;
            height: 82px;
            position: absolute;
            img {
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
        // 黑色透明背景
        .gameBack {
            width: 176px;
            height: 82px;
            background: rgba(0,0,0,0.85);
            position: absolute;
        }
        // 粉色底
        .pinkBack {
                width: 176px;
                height: 82px;
                position: absolute;
                z-index: 2;
        }
        // 领取状态结果
        .text {
            min-width: 56px;
            height: 22px;
            position: absolute;
            margin: 0 auto;
            text-align: center;
            z-index: 3;
            top: 28px;
            left: 0;
            right: 0;
            color: #FFFFFF;
            font-weight: 600;
        } 
    }
</style>