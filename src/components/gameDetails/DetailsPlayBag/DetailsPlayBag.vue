<template>
<!-- 合玩包背景图 -->
    <div class="backPic" v-if="!!packData.data[0]">
        <!-- 左边游戏盒子 -->
        <div class="playGame">
            <!-- 最左边主游戏 -->
            <div class="mainGame">
                <!-- 游戏图盒子 -->
                <div class="itemImgs" @mouseenter="hoverItemsFun(true,0)" @mouseleave="hoverItemsFun(false,0)">
                    <!-- 视频盒子 -->
                    <div class="videoBox" v-if="isShowVideo && videoData == 0">
                        <video class="videoPlay" 
                        autoplay
                        muted
                        loop
                        :src="packData.data[0].games[0].sixVideo">
                        </video>
                    </div>
                    <!-- 游戏图盒子 -->
                    <div class="imgBox" v-else>
                        <!-- 游戏图 -->
                        <img class="imgPic" :src="packData.data[0].games[0].image" alt="">
                    </div>
                </div>

                <!-- 游戏名称 -->
                <div class="gameName ft12 color_white_1 font_weight">{{packData.data[0].games[0].chinaName}}</div>
                <!-- 游戏原价和优惠价 -->
                <div class="gamePrice">
                    <!-- 优惠价 -->
                    <div class="price ft14 color_white_1 font_weight">¥{{packData.data[0].games[0].lowPrice}}</div>
                    <!-- 原价 -->
                    <div class="pastPrice ft12">¥{{packData.data[0].games[0].steamSalePrce}}</div>
                </div>
            </div>
            <!-- 加购优惠游戏 -->
            <div class="elseGame">
                <!-- 两张游戏图片盒子 -->
                <div class="gameBox">
                    <!-- 第二个游戏 -->
                    <div class="firstGame" v-if="!!packData.data[0].games[1]" @mouseenter="hoverItemsFun(true,1)" @mouseleave="hoverItemsFun(false,1)">
                        <!-- 视频盒子 -->
                        <div class="videoBox" v-if="isShowVideo && videoData == 1">
                            <video class="videoPlay" 
                            autoplay
                            muted
                            loop
                            :src="packData.data[0].games[1].sixVideo">
                            </video>
                        </div>
                        
                        <!-- 游戏图盒子 -->
                        <div class="imgBox" v-else>
                            <img class="imgs" :src="packData.data[0].games[1].image" alt="">
                        </div>
                    </div>
                    <!-- 第三个游戏 -->
                    <div class="secondGame" v-if="!!packData.data[0].games[2]" @mouseenter="hoverItemsFun(true,2)" @mouseleave="hoverItemsFun(false,2)">
                        <!-- 视频盒子 -->
                        <div class="videoBox" v-if="isShowVideo && videoData == 2">
                            <!-- 视频 -->
                            <video class="videoPlay" 
                            autoplay
                            muted
                            loop
                            :src="packData.data[0].games[2].sixVideo">
                            </video>
                        </div>
                        <!-- 游戏图盒子 -->
                        <div class="imgBox" v-else>
                            <!-- 游戏图 -->
                            <img class="imgs" :src="packData.data[0].games[2].image" alt="">
                        </div>
                    </div>
                </div>
                <!-- 游戏名称合集 -->
                <div class="gameName ft12 color_white_1 font_weight">({{!!packData.data[0].games[1]? packData.data[0].games[1].chinaName :''}}，{{!!packData.data[0].games[2]?packData.data[0].games[2].chinaName:''}})</div>
                <!-- 橙色背景图盒子 -->
                <div class="addPrice orangeLine">
                    <!-- 换购条件 -->
                    <div class="changePriceInfo ft12 color_white_1">加 ¥<span class="ft16 font_weight color_white_1">{{packData.data[0].morePrice}}</span> ,再得 <span class="ft16 font_weight color_white_1">{{packData.data[0].moreSize}}</span> 款</div>
                    <!-- 原价 -->
                    <!-- <div class="pastPrice ft12 color_white_1">原价¥{{packData.data[0].discount}}</div> -->
                </div>
            </div>
        </div>
        <!-- 右侧礼包文案及价格 -->
        <div class="payGame">
            <!-- 礼包名称 -->
            <div class="payGamePic"></div>
            <!-- 蓝色横线特效 -->
            <!-- <div class="blueLine"></div>     -->
            <!-- 折扣和购买人数 -->
            <div class="discountPeople">
                <!-- 折扣 -->
                <!-- <div class="discount ft12 font_weight">{{packData.data[0].radio}}折</div> -->
                <!-- 人数 -->
                <!-- <div class="people ft12 font_weight">{{packData.data[0].saleNum}}人已买</div> -->
                <!-- 立省多少钱 -->
                <div class="reducePrice ft12 font_weight">立省{{packData.data[0].discount}}</div>
            </div>
            <!-- 现价和原价 -->
            <div class="priceBox">
                <!-- 现价 -->
                <div class="price ft18 font_weight"><span class="ft12">低至¥</span>{{packData.data[0].price}}</div>
                <!-- 原价 -->
                <div class="pastPrice ft12 ">¥{{packData.data[0].enjoyPrice}}</div>
            </div>
            <!-- VIP价格 -->
            <!-- <div class="vipPrice ft12">VIP¥{{packData.data[0].priceMember}}</div> -->
            <!-- 按钮盒子 -->
            <div class="buyBtn" @click="payClick">
                <!-- 蓝色按钮图片 -->
                <div class="blueBtn">
                    <!-- 立即购买 -->
                    <div class="shop ft16 color_white_1 font_weight">立即抢购</div>
                </div>
            </div>
        </div>
        <details-payment v-if="payShow" @change="displayDetailsPayment" :allOrderData='createOrderData' :enjoyId="enjoyId"></details-payment>
        <alertModelError v-if="ifStockModel" iserrtype="1" @change="ifStockModelFun"></alertModelError>
    </div>
</template>


<script>
import DetailsPayment from './DetailsPayment'// 合玩包支付界面组件
import alertModelError from '@/components/AlertModel/alertModelError'  //错误 满库存
export default {
    name:'DetailsPlayBag',
    props:['packData','createOrderData'],
    inject:['openRegister'],
    data(){
        return {
            payShow:false,
            isShowVideo: false, //视频隐藏
            videoData: -1,
            enjoyId:'',
            ifStockModel:false,  //是否显示库存不足弹出
        }
    },
    components:{
        DetailsPayment,
        alertModelError
    },
    mounted(){

    },
    methods:{
        // 点击按钮弹出支付界面
        payClick(){
            // 是否为黑名单用户
            if(this.$store.getters.getBlackList.flag && this.$store.getters.getBlackList.data.isOpen == 1){
                this.ifStockModel = true
                console.log('黑名单没有库存')
                return
            }
            if(!!this.$store.getters.getStorage){
                 this.displayDetailsPayment(true)
            }else{
               this.openRegister(true)
                //  this.$emit('closeSimpleLogin',true)
            }
            
        },
        displayDetailsPayment(data){
            this.payShow = data
        },
        // 鼠标移入视频
        hoverItemsFun(data,obj) {
            this.videoData = obj;
            this.isShowVideo = data;
        },
        ifStockModelFun(data){  //库存不足弹出
            this.ifStockModel = data
        },
    }
}
</script>


<style lang="scss" scoped>
    @import '../../../assets/css/DetailsPlayBag/DetailsPlayBag.css';

    // 背景图
    .backPic {
        width: 700px;
        height: 172px;
        display: flex;
        // 左侧购买游戏盒子
        .playGame {
            width: 520px;
            height: 100%;
            display: flex;
            // 最左边主游戏
            .mainGame {
                width: 151px;
                height: 120px;
                margin:24px 0 0 24px;
                position: relative;
                // 游戏图片
                .itemImgs {
                    width: 151px;
                    height: 72px;
                    .imgPic {
                        width: 151px;
                        height: 72px;
                        display: block;
                    }
                    
                    .videoBox {
                        width: 151px;
                        height: 72px;
                        margin: 0 auto;
                        background: #000000;
                        .videoPlay {
                        width: 151px;
                        height: 72px;
                        display: block;
                        }
                    }
                }


                // 游戏名称
                .gameName {
                    width: 132px;
                    height: 14px;
                    line-height: 16px;
                    margin-top: 8px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                // 游戏价格盒子
                .gamePrice {
                    width: 151px;
                    height: 18px;
                    margin-top: 13px;
                    display: flex;
                    justify-content: space-between;
                    // 现价
                    .price {
                    width: 24px;
                    height: 18px;
                    line-height: 18px;
                    }
                    // 原价
                    .pastPrice {
                        width: 31px;
                        height: 16px;
                        line-height: 15px;
                        color: rgba(191,233,255,1);
                        font-weight: 400;
                        text-decoration: line-through;
                    }
                }
            }
            // 额外礼包游戏
            .elseGame {
                width: 302px;
                height:160px;
                float: left;
                margin: 24px 0 0 24px;
                // 游戏合集盒子
                .gameBox {
                    width: 302px;
                    height: 72px;
                    display: flex;
                    position: relative;
                    // 第二个游戏图片
                    .firstGame {
                    width: 151px;
                    height: 72px;
                        .imgs {
                            width: 151px;
                            height: 72px;
                            display: block;
                        }
                        .videoBox {
                        width: 151px;
                        height: 72px;
                        margin: 0 auto;
                        background: #000000;
                            .videoPlay {
                            width: 151px;
                            height: 72px;
                            display: block;
                            }
                        }
                    }
                    // 第三个图片
                    .secondGame::before {
                        content:'';
                        position: absolute;
                        width: 15px;
                        height: 72px;
                        left: -12px;
                        top: 0;
                        background: url('../../../../public/images/boxShadow.png') no-repeat;
                        // background: red;
                    }
                    .secondGame {
                        box-shadow: -8px 2px 4px 0px rgba(0, 0, 0, 0.2);
                        position: absolute;
                        right: 8px;
                        top: 0;
                        .imgs {
                            width: 151px;
                            height: 72px;
                            display: block;
                        }
                        .videoBox {
                        width: 151px;
                        height: 72px;
                        margin: 0 auto;
                        background: #000000;
                            .videoPlay {
                            width: 151px;
                            height: 72px;
                            display: block;
                            }
                        }
                    }
                }
                // 游戏名称合集
                .gameName {
                    width: 190px;
                    height: 15px;
                    line-height: 16px;
                    margin-top: 8px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                // 加购游戏条件盒子
                .addPrice {
                    width: 296px;
                    height: 23px;
                    margin-top: 8px;
                    display: flex;
                    justify-content: space-between;
                    // 加购游戏条件
                    .changePriceInfo {
                        width: 200px;
                        height: 22px;
                        font-weight: 600;
                        line-height: 22px;
                        margin-left: 10px;
                        span {
                            line-height: 22px;
                        }
                    }
                    // 原价
                    .pastPrice {
                        width: 78px;
                        height: 22px;
                        font-weight: 400;
                        line-height: 22px;
                        text-decoration: line-through;
                        margin-right: 22px;
                    }
                }
            }
        }
        // 右侧盒子
        .payGame {
            width: 100px;
            height: 100%;
            // 右侧顶部文案
            .payGamePic {
                width: 96px;
                height: 15px;
                margin: 16px 0 0 4px;
            }
            // 蓝色特效
            .blueLine {
                width: 159px;
                height: 4px;
                margin: 3px 0 0 -6px;
            }
            // 折扣和人数
            .discountPeople {
                width: 140px;
                height: 18px;
                margin: 4px 0 0 4px;
                display: flex;
                justify-content: space-between;
                margin-top: 11px;
                // background: yellow;
                // 折扣
                .discount {
                    width: 80px;
                    height: 18px;
                    border: 1px solid #436C0F;
                    color: rgba(199,238,68,1);
                    border-radius: 4px;
                    line-height: 18px;
                    text-align: center;
                    margin: 0 auto;
                }
                // 人数
                .people {
                    width: 124px;
                    height: 18px;
                    border: 1px solid #436C0F;
                    color: rgba(199,238,68,1);
                    border-radius: 4px;
                    line-height: 18px;
                    text-align: center;
                    margin-left: 6px;
                }
                .reducePrice {
                    // width: 94px;
                    height: 18px;
                    border: 1px solid #436C0F;
                    color: rgba(199,238,68,1);
                    border-radius: 4px;
                    line-height: 18px;
                    // text-align: center;
                    padding: 1px 8px
                }
            }
            // 价格盒子
            .priceBox {
                width: 170px;
                height: 24px;
                display: flex;   
                // justify-content: space-between;
                margin: 24px 0 0 4px;
                // background: blue;
                // 现价
                .price {
                    width: 104px;
                    height: 24px;
                    line-height: 24px;
                    color: rgba(73,192,255,1);
                    // background: red;
                    span {
                        color: #49C0FF;
                        line-height: 14px;
                    }
                }
                // 原价
                .pastPrice {
                    width: 28px;
                    height: 24px;
                    color: rgba(191,233,255,1);
                    line-height: 28px;
                    text-decoration: line-through;
                    // background: yellow;  
                }
            }
            // VIP价格
            .vipPrice {
                width: 39px;
                height: 16px;
                color: rgba(255,182,73,1);
                line-height: 16px;
                margin: 4px 0 0 5px;
            }
            // 购买盒子
            .buyBtn {
                width: 159px;
                height: 34px;
                margin: 8px 0 0 6px;
                cursor: pointer;
                // 蓝色按钮
                .blueBtn {
                    width: 159px;
                    height: 34px;
                    // 立即购买
                    .shop {
                        text-align: center;
                        line-height: 34px;
                    }
                }
            }
        }
    }
</style>