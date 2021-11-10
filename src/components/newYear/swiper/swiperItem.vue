<template>
   <div class="swiperItemBox" v-if="!!item">
        <div class="gameItem gameItem_bg">
        <!-- 顶部游戏品级和价值 -->
        <div class="grade">
                <!-- 游戏等级 -->
                <div class="level" :class="`${itemLevel[item.level]}_level_bg`">
                    <!-- <img src="../../../assets/newYear/images/ssr.png" alt=""> -->
                </div>
                <!-- 游戏价格框 -->
                <div class="gamePrice">
                    <div class="text ft14 simkai">价值：</div>
                    <!-- 游戏具体价格 -->
                    <div class="textNum ft14 simkai">{{item.steamPrce}}</div>
                </div>
        </div>
        <!-- 游戏图片 -->
        <div class="gamePic">
            <img :src="item.libraryCapsule" alt="">
            <!-- 图片 -->
            <div class="gamephoto">
                <!-- 游戏名字 -->
                <div class="gameName ft16 simkai">{{item.chinaName==''?item.englishName:item.chinaName}}</div>
                <!-- 渐变 -->
                <div class="gradualChange rectangle_bg"></div>

            </div>
        </div>
    </div>
   </div>
</template>



<script>
export default {
    name:'swiperItem',
    components:{},
    props:['item'],
    data(){
        return {
            itemLevel:['','b','a','s','ss','ssr'],//合成大赏数组
        }
    },
    mounted(){

    },
    methods:{
        
    }
}
</script>


<style lang="scss" scoped>
.swiperItemBox{
    width: 157px;
        .gameItem {
            width: 157px;
            height: 235px;
            margin-right: 10px;
            position: relative;
            overflow: hidden;
            //顶部游戏品级和价值
            .grade {
                width: 142px;
                height: 25px;
                margin: 7px 0 0 7px;
                position: absolute;
                display: flex;
                justify-content: space-between;
                z-index: 3;
                background-color: #2f0000;
                //游戏等级
                .level {
                    width: 51px;
                    height: 20px;
                    position: absolute;
                    img{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        
                    }
                }
                //游戏价格框
                .gamePrice {
                    min-width: 66px;
                    height: 21px;
                    display: flex;
                    position: absolute;
                    left: 76px;
                    .text {
                        min-width: 50px;
                        font-weight: 700;
                        color: rgba(255,230,178,1);
                    }
                    .textNum {
                        font-weight: 700;
                        color: rgba(255,230,178,1);
                        margin-left: -6px;
                    }
                }
            }
            //游戏图片
            .gamePic {
                width: 141px;
                height: 212px;
                position: absolute;
                top: 14px;
                left: 8px;
                img {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    z-index: 0;
                }
                //图片
                .gamephoto {
                    width: 141px;
                    height: 189px;
                    position: absolute;
                    //游戏名字
                    .gameName {
                        max-width: 134px;
                        height: 25px;
                        font-weight: 700;
                        color: rgba(255,230,178,1);
                        position: absolute;
                        z-index: 5;
                        top: -62px;
                        left: 8px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    //渐变
                    .gradualChange {
                        width: 141px;
                        height: 100px;
                        position: absolute;
                        top: -135px;
                        z-index: 4;
                    }
                }
            }
        }
    }
</style>