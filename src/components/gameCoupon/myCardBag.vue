<template>
    <div class="myCardContainer">
        <div class="myCardAlert">
            <!-- 我的卡券 -->
            <div class="myCardCloseContent">
                <div class="text ft24 color_white_1">我的卡券</div>
                <!-- 关闭按钮 -->
                <div class="myCardClose myCardClose_bg" @click="closeMyCard"></div>
            </div>
            <!-- 卡券使用，过期 -->
            <div class="myCardState">
                <div class="myCardStateItem ft18" 
                v-for="(item,index) in cardState" :key='index' 
                @click="changeCard(item,index)"
                :class="currentIndex == index ? 'active' : 'unactive'"
                >{{item.title}}</div>
            </div>
            <!-- 卡券content -->
            <div class="myCardContent" v-if="activeCoupon">
                <!-- 单个游戏框 -->
                <div class="gameItemHBox" v-for="(item,index) in gameCouponList" :key="'game'+index">
                <!-- 全图阴影 -->
                    <div class="fullShadow ft24" :class="changeStatus == 2 ? 'used_bg' : 'expired_bg' " v-if="changeStatus !== 1">{{cardState[currentIndex].title}}</div>
                    <!-- 左边图片 -->
                    <div class="leftPic">
                        <!-- 阴影 -->
                        <div class="leftMask leftMask_bg ft28 color_white_1 ft_weight">
                            <span style="font-size:18px">￥</span>{{item.money}}
                        </div>
                        <img :src='item.image' alt="">
                    </div>
                    <!-- 右边详情 -->
                    <div class="rightContent">
                        <!-- 游戏名称 -->
                        <div class="gameNameContent ft12">
                            <div class="nameText">游戏:</div>
                            <div class="name">{{item.gameName}}</div>
                        </div>
                        <!-- 游戏类型 -->
                        <div class="gameType ft12">
                            <div class="typeText">类型:</div>
                            <div class="type">{{item.type == 1 ? '独享游戏' : '畅享游戏'}}</div>
                        </div>
                        <!-- 限时 -->
                        <div class="gameLimit ft12">
                            <div class="limitText">限时:</div>
                            <div class="limit">{{item.effectiveTime}}-{{item.failureTime}}</div>
                        </div>
                        <!-- 使用按钮 -->
                        <div class="usedBtn ft14 color_white_1" @click="jumpToGame(index)">立即使用</div>
                    </div>
                </div>
                <!-- 填位置的假盒子 -->
                <div class="gameItemHBoxFalse" v-for="item in ((gameLength == 2 ? 1 : gameLength)%2)" v-if="(gameLength == 2 ? 1 : gameLength)%2 > 0"></div>
            </div>
            <!-- 没有卡券 -->
            <div class="myCardNothing" v-else>
                <div class="noCouponCard noCouponCard_bg"></div>
                <div class="noCouponText ft16">很抱歉！暂时没有券哟~</div>
            </div>
            <!-- 分页pager -->
            <div class="myCardPager">
                <!-- //这里时通过props传值到子级，并有一个回调change的函数，来获取自己传值到父级的值 -->
				<small-pager v-if="ifpagings" :dataAll="all" :dataCur="cur" :datanum="num" @change="pageChange"></small-pager>
            </div>
        </div>
    </div>
</template>

<script>
import smallPager from '../../components/pager/smallPager';
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
export default {
    name:'myCardBag',
    components:{
        smallPager
    },
    data(){
        return {
            all: 1, //总页数
            cur: 1, //当前页码
            num: 9, //一页显示的数量  必须是奇数
            dataNum:10,//总数
            ifpagings:true,
            cardState:[{'title':'可使用','status':1},{'title':'已使用','status':2},{'title':'已过期','status':0}],
            currentIndex:0,//当前选中的卡券状态
            gameCouponList:{},//保存获取的卡券数据
            current:1,//从几页开始
            limit:6,//请求6条
            isActive:true,
            gameLength:0,//数据长度
            changeStatus:1,//卡券状态
            activeCoupon:false,//是否拥有优惠券
        }
    },
    mounted(){
        this.init(1,1)
    },
    methods:{
        pageChange(page){
            let _this = this
            if(_this.isActive){
                _this.isActive = false
                if(page == 0){ page = 1}
                _this.cur = page
                _this.current = page
                _this.$fetch('/product/rolls/getRollsList',{'status':_this.changeStatus,'limit':6,'current':page})
                .then((response) => {
                _this.gameCouponList = response.data.rows
                _this.gameLength = response.data.rows.length
                _this.isActive = true
                })
            }else{
                return
            }
        },
        // 点击使用跳转游戏详情页
        jumpToGame(index){
            JumpTo(2,{'appId': this.gameCouponList[index].appId,'gameNumber':index});
            this.$store.commit('setOpenMyCardBag',false)
        },
        // 获取商品券信息
        init(status,currentPage){
            var _this = this
            _this.gameCouponList = []
            _this.$fetch('/product/rolls/getRollsList',{'status':status,'limit':6,'current':currentPage})
              .then((response) => {
                //   console.log(response)
                  if(response.flag){
                      // 总数量
                      _this.dataNum = response.data.total
                      // 总页数
                      _this.all = Math.ceil(response.data.total / _this.limit) 
                      _this.gameCouponList = response.data.rows
                      _this.gameLength = response.data.rows.length
                      if(_this.gameLength > 0){
                          _this.activeCoupon = true
                      }else{
                          _this.activeCoupon = false
                      }
                      // 当前页
                      _this.cur = response.data.offset + 1
                      if(status == 1){
                          _this.$store.commit('setGameUsedCouponList',response.data.rows)
                      }
                  }else{
                      console.log('商品券获取失败')
                  }
              })
        },
        // 选择卡券类型
        changeCard(item,index){
            this.currentIndex = index
            this.changeStatus = item.status
            this.init(item.status,1)
        },
        // 关闭按钮
        closeMyCard(){
            this.$store.commit('setOpenMyCardBag',false)
        }
    }
}
</script>

<style lang="scss" scoped>
    .myCardContainer {
        width: 100%;
        height: calc(100% - 60px);
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 51;
        background-color: rgba(13, 22, 30, 0.7);
        .myCardAlert {
            width: 930px;
            height: 470px;
            background-color: #051824;
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 149px;
            right: 0;
            margin:0 auto;
            overflow: hidden;
            .myCardCloseContent {
                width: 827px;
                height: 32px;
                margin: 23px 0 0 62px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text {
                    width: 96px;
                    height: 32px;
                    text-align: left;
                    line-height: 30px;
                }
                .myCardClose {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            }
            .myCardState {
                width: 246px;
                height: 27px;
                margin: 12px 0 0 62px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .myCardStateItem {
                    width: 54px;
                    height: 24px;
                    text-align: center;
                    line-height: 24px;
                    cursor: pointer;
                    position: relative;
                }
            }
            .myCardContent {
                width: 810px;
                height: 247px;
                margin: 24px 0 0 62px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-content: space-between;
                .gameItemHBox {
                    width: 260px;
                    height: 114px;
                    position: relative;
                    display: flex;
                    .leftPic {
                        width: 80px;
                        height: 114px;
                        position: relative;
                        .leftMask {
                            width: 80px;
                            height: 114px;
                            position: absolute;
                            z-index: 2;
                            text-align: center;
                            line-height: 114px;
                        }
                        img {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                        }
                    }
                    .rightContent {
                        width: 180px;
                        height: 114px;
                        background-color: #1b3053;
                        border-radius: 0px 10px 10px 0px;
                        color: rgba(254,254,255,0.7);
                        overflow: hidden;
                        .gameNameContent {
                            width: 160px;
                            height: 16px;
                            margin: 11px 0 0 6px;
                            display: flex;
                            line-height: 16px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .gameType {
                            min-width: 76px;
                            height: 16px;
                            margin: 3px 0 0 6px;
                            display: flex;
                            line-height: 16px;
                        }
                        .gameLimit {
                            min-width: 208px;
                            height: 16px;
                            margin: 2px 0 0 6px;
                            display: flex;
                        }
                        .usedBtn {
                            width: 93px;
                            height: 28px;
                            background-color: #3596d6;
                            border-radius: 3px;
                            text-align: center;
                            line-height: 28px;
                            margin: 10px 0 0 6px;
                            cursor: pointer;
                        }
                    }
                    // 阴影
                    .fullShadow {
                        width: 260px;
                        height: 114px;
                        position: absolute;
                        z-index: 22;
                        text-align: center;
                        line-height: 114px;
                        color: rgba(255,255,255,0.90);
                    }
                }
                // 假盒子
                .gameItemHBoxFalse {
                    width: 260px;
                    height: 114px;
                }  

            }
            // 如果没有卡券
            .myCardNothing {
                width: 810px;
                height: 247px;
                margin: 24px 0 0 62px;
                .noCouponCard {
                    width: 369px;
                    height: 219px;
                    margin: 8px auto;
                }
                .noCouponText {
                    width: 176px;
                    height: 24px;
                    text-align: center;
                    color: rgba(255,255,255,0.65);
                    line-height: 24px;
                    margin: 2px auto;
                }
            }
            .myCardPager {
                min-width: 160px;
                height: 20px;
                // border: 1px white solid;
                margin: 39px 0 0 62px;
            }
        }
    }

    // 选中
    .active {
        font-weight: 600;
        color:#ffffff;
    }
    .active:after {
        content: '';
        font-weight: 600;
        color: red;
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 40px;
        height: 3px;
        background-color: #e9b34a;
        border-radius: 15px;
    }
    .unactive {
        color: rgba(255,255,255,0.80);
    }
</style>