<template>
    <div class="couponContainer">
        <!-- 整个弹窗 -->
        <div class="couponAlert" v-if="NoGrabTicketState">
            <!-- 关闭按钮 -->
            <div class="close couponClose_bg" @click="closeCouponAlert"></div>
            <!-- 游戏展示 -->
            <div class="gameDisplay">
                <img :src="$store.getters.getAlertGameInfo.image" alt="">
            </div>
            <!-- 抢券按钮 -->
            <div class="grabTicketBtn grabTicketBtn_bg ft18 color_white_1" @click="grabTicketBtn" v-if="grabTicketState">立即抢券</div>
            <div class="grabTicketBtn grabTicketBtn_bg ft18 color_white_1" @click="alreadyTicketBtn" v-else>领取成功去抢购</div>
        </div>
        <!-- 没有抢到券 -->
        <div class="noCouponAlert" v-else>
            <!-- 关闭按钮 -->
            <div class="close elseClose_bg" @click="closeCouponAlert"></div>
            <!-- 没抢到券图 -->
            <div class="noCouponPage noCouponPage_bg"></div>
            <div class="noCouponText ft16">优惠券已领完了哟~</div>
        </div>
    </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'  //跳转函数
import store from '@/store';
export default {
    name:'gameCouponIndex',
    props:['alertGameInfo'],
    data(){
        return {
            grabTicketState:true,//抢券按钮状态
            NoGrabTicketState:true,//是否抢到券
        }
    },
    methods:{
        // 关闭弹窗
        closeCouponAlert(){
            this.$store.commit('setGameCouponAlert',false)
        },
        // 点击抢券
        grabTicketBtn(){
            var _this = this
            // console.log(_this.$store.getters.getAlertGameInfo)
            _this.$fetch('/product/rolls/getProductRolls',{'rollsId':_this.$store.getters.getAlertGameInfo.rollsId})
             .then((response) => {
                //  console.log(response)
                 if(response.flag){
                     console.log('抢券成功')
                     _this.getCouponInfo()
                     _this.grabTicketState = false
                 }else{
                     console.log('优惠券已抢完')
                     _this.NoGrabTicketState = false
                 }
             })
        },
        // 领券之后再查一下卡券数量
        getCouponInfo(){
            var _this = this
            _this.$fetch('/product/rolls/join')
              .then((response) => {
                //  console.log(response.data)
                _this.$store.commit('setCouponNumber',response.data.count)
              })
        },
        // 点击抢购游戏跳转游戏详情页
        alreadyTicketBtn(){
            JumpTo(2,{'appId': this.$store.getters.getAlertGameInfo.appId});
            if(this.$route.path == '/gameDetails'){
                window.location.reload()
            }
            this.closeCouponAlert()
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/gameCouponIndex/css/homepage.css";
    .couponContainer {
        width: 100%;
        height: calc(100% - 60px);
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 51;
        background-color: rgba(13, 22, 30, 0.7);
        .noCouponAlert {
            width: 600px;
            height: 357px;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 169px;
            right: 0;
            margin:0 auto;
            background-color: #051824;
            .close {
                width: 29px;
                height: 29px;
                position: absolute;
                right: 36px;
                top: 23px;
                cursor: pointer;
            }
            .noCouponPage {
                width: 206px;
                height: 208px;
                position: absolute;
                top: 40px;
                left: 0;
                right: 0;
                margin: 0 auto;
            }
            .noCouponText {
                width: 140px;
                height: 24px;
                line-height: 24px;
                color: rgba(255,255,255,0.65);
                text-align: center;
                position: absolute;
                bottom: 50px;
                left: 0;
                right: 0;
                margin: 0 auto;
            }
        }
        .couponAlert {
            width: 692px;
            height: 408px;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 149px;
            right: 0;
            margin:0 auto;
            .close {
                width: 29px;
                height: 29px;
                position: absolute;
                right: 0;
                cursor: pointer;
            }
            .gameDisplay {
                width: 672px;
                height: 326px;
                position: absolute;
                top: 29px;
                left: 0;
                right: 0;
                margin: 0 auto;
                img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                }
            }
            .grabTicketBtn {
                width: 217px;
                height: 49px;
                position: absolute;
                text-align: center;
                line-height: 49px;
                letter-spacing: 5px;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto;
                cursor: pointer;
            }
        }
    }
</style>