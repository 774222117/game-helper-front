<template>
<!-- 合成大赏 展示组件 游戏元素 -->
<div class="synthesisViewItemsMain">
    <!-- 元素盒子 -->
   <div class="itemsBox">
       <!-- 背景图片 -->
       <div class="imgBox">
           <img class="imgBlock" :src="item.image">
       </div>
       <!-- 遮罩 -->
       <div class="maskBox"></div>
       <!-- 价值 -->
       <div class="priceBox ft12">价值:{{item.steamPrce}}</div>
       <!-- 游戏等级 -->
       <div class="gameGradeBox" :class="`${synthesisLevel.toLowerCase()}_level_bg`"></div>
       <!-- 游戏名字 -->
       <div class="gameNameBox ft14">{{item.chinaName == ''? item.englishName : item.chinaName}}</div>
   </div>
</div>
</template>

<script>

export default {
    name:'synthesisViewItems',
    components:{},
    props:['item','synthesisLevel'],
    data(){
        return {
           
        }
    },
    methods:{
       
    }
}
</script>

<style lang="scss" scoped>
.synthesisViewItemsMain{
    min-width: 177px;
    height: 76px;
    margin-right: 8px;
    .itemsBox{
        width: 165px;
        height: 76px;
        position: relative;
        // 背景图片
        .imgBox{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }
        // 图片遮罩
        .maskBox{
            width: 100%;
            height: 43px;
            position: absolute;
            left: 0;
            bottom: 0;
            background: linear-gradient(0deg,#000000, rgba(0,0,0,0.00));
        }
        //游戏价值
        .priceBox{
            width: 56px;
            height: 18px;
            background-color: #250b0b;
            border-radius: 0px 0px 10px 0px;
            font-weight: 700;
            color: #ffe6b2;
            text-align: center;
            line-height: 18px;
            position: absolute;
            top: 0;
            left: 0;
        }
        //游戏等级
        .gameGradeBox{
            width: 45px;
            height: 14px;
            position: absolute;
            top: 5px;
            right: -12px;
        }
        //游戏名字
        .gameNameBox{
            width: calc(100% - 14px);
            height: 20px;
            padding:0 7px;
            position: absolute;
            bottom: 2px;
            // font-weight: 700;
            color: #ffe6b2;
            line-height: 20px;
        }
    }
}
</style>