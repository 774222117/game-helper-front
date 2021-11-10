<template>
    <!-- 竖向单个游戏框 -->
    <div class="photoBox">
        <!-- 游戏框 -->
        <div class="gameItem" v-if="isBigs">
            <!-- 图片框 -->
            <div class="gamePic">
                <img :src="gameItemSData.libraryCapsule" alt="">
            </div>
            <!-- 价格框 -->
            <div class="gamePrice">
                <div class="priceBox">
                    <div class="textPrice ft12 simkai">原价:</div>
                    <div class="price ft12">￥{{gameItemSData.steamPrce}}</div>
                </div>
            </div>
            <!-- 品级 -->
            <div class="level" :class="`${['','b','a','s','ss','ssr'][gameItemSData.level]}_level_bg`">
            </div>
            <!-- 游戏名字框 -->
            <div class="gameName">
                <div class="name ft14 font_weight textOver simkai">{{gameItemSData.chinaName == ''? gameItemSData.englishName : gameItemSData.chinaName}}</div>
            </div>
        </div>

        <div class="gameOnce" v-else>
            <!-- 图片框 -->
            <div class="gamePic">
                <img :src="gameItemSData.libraryCapsule" alt="">
            </div>
            <!-- 价格框 -->
            <div class="gamePrice">
                <div class="priceBox">
                    <div class="textPrice ft12 simkai">原价:</div>
                    <div class="price ft12">￥{{gameItemSData.steamPrce}}</div>
                </div>
            </div>
            <!-- 品级 -->
            <div class="level" :class="`${['','b','a','s','ss','ssr'][gameItemSData.level]}_level_bg`"></div>
            <!-- 游戏名字框 -->
            <div class="gameName">
                <div class="name ft18 textOver">{{gameItemSData.chinaName == ''? gameItemSData.englishName : gameItemSData.chinaName}}</div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    name:'gameItemS',
    components:{},
    props:['gameItemSData','isBigs'],
}
</script>


<style lang="scss" scoped>
.photoBox {
    max-width: 597px;
    max-height: 345px;
    .gameItem {
    width: 95px;
    height: 162px;
    position: relative;
    //图片框
    .gamePic {
        width: 91px;
        height: 138px;
        border: 2px solid #FFED4F;
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
    // 价格框
    .gamePrice {
        min-width: 91px;
        height: 24px;
        background-color: #2F0000;
        position: absolute;
        top: 116px;
        left: 2px;
        // 价格框
        .priceBox {
            width: 61px;
            line-height: 21px;
            margin: 2px 0 0 15px;
            display: flex;
            .textPrice {
                min-width: 34px;
                line-height: 20px;
                color: #FFE6B2;
            }
            .price {
                min-width: 16px;
                line-height: 18px;
                color: #FFE6B2;
            }
        }
    }
    //品级
    .level {
        width: 51px;
        height: 16px;
        position: absolute;
        top: 4px;
        left: -18px;
        img {
            position: absolute;
        }
    }
    //游戏名字框
    .gameName {
        width: 91px;
        height: 20px;
        margin: 0 auto;
        .name {
            color: rgba(255,237,79,1);
            line-height: 24px;
            text-align: center;
            }
        }
    }
}



.gameOnce {
    width: 147px;
    height: 220px;
    position: relative;
    // 图片框
    .gamePic {
        width: 141px;
        height: 212px;
        border: 3px solid #FFED4F;
        margin: 0 auto;
        img {
            width: 100%;
            height: 100%;
        }
    }
    // 价格框
    .gamePrice {
        width: 141px;
        height: 24px;
        background-color: #2F0000;
        position: absolute;
        top: 192px;
        left: 3px;
        .priceBox {
            min-width: 61px;
            height: 20px;
            margin: 2px 0 0 40px;
            display: flex;
            .textPrice {
                min-width: 30px;
                line-height: 20px;
                color: #FFE6B2;
            }
            .price {
                min-width: 16px;
                line-height: 19px;
                color: #FFE6B2;
            }
        }
    }
    //品级
    .level {
        width: 51px;
        height: 16px;
        position: absolute;
        top: 11px;
        left: -23px;
        img {
            position: absolute;
        }
    }
    //游戏名字框
    .gameName {
        width: 147px;
        height: 28px;
        margin: 0 auto;
        .name {
            color: #FFED4F;
            line-height: 28px;
            text-align: center;
        }
    }
}
</style>