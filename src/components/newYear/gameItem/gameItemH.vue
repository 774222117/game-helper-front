<template>
    <!-- 横向单个游戏框 -->
    <div class="photoBox">  
        <!-- 游戏框 -->
        <div class="gameItem">
            <!-- 图片框 -->
            <div class="gamePic">
                <img class="imgBlock" :src="item.image" alt="">
            </div>
            <!-- 渐变框 -->
            <div class="gradientBox gradientBox_bg"></div>
            <!-- 游戏名字框 -->
            <div class="gameName">
                <div class="name textOver ft14 font_weight simkai">{{item.chinaName == ''? item.englishName : item.chinaName}}</div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    name:'gameItemH',
    props:['item'],
    components:{}
}
</script>

<style lang="scss" scoped>
.photoBox{
    max-width: 552px;
    max-height: 173px;
        .gameItem {
        width: 168px;
        height: 79px;
        position: relative;
        //图片框
        .gamePic {
            width: 166px;
            height: 77px;
            margin: 0 auto;
            position: absolute;
            img {
                margin: 2px 0 0 1px;
            }
        }
        // 渐变框
        .gradientBox {
            width: 166px;
            height: 79px;
            position: absolute;
            z-index: 1;
            margin-top: 2px;
            margin-left: 1px;
        }
        //游戏名字框
        .gameName {
            width: 100%;
            height: 19px;
            position: absolute;
            bottom: 4px;
            z-index: 1;
            .name {
                padding-left: 9px;
                color: #FFE6B3;
                line-height: 19px;
            }
        }
    }
}


// .active {border: 2px solid #FFE6B2;}
</style>