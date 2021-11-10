<template>
<!-- 选择优惠 -->
<div class="chooseDiscount">
    <!-- 普通的 -->
    <div class="contents chooseDiscountActive_bg" v-if="isVip == 0" >
        <!-- 文字内容 -->
        <div class="textContents">
            <div class="leftText"> 
                    <div class="logoBg"><svg-icon iconClass='logoIcon' className='svg_icon'></svg-icon></div>
                    <div class="ft14 color_white_1">特惠</div>
                </div>
            <div class="rightText ft16" v-if="discountData.model !== 3">
                <div class="ft14 font_weight color_white_08 margin_right_8"></div>
                <div class="ft14 color_white_1 font_weight margin_right_20">¥{{discountData.gamePriceData.price}}</div>
            </div>
            <div class="rightText ft14 color_white_1 font_weight margin_right_20" v-else>¥{{discountData.gamePriceData.price}}/{{discountData.gamePriceData.hour}}小时</div>
        </div>
    </div>
    <!-- 会员的 非会员-->
    <div class="contentsVip cur chooseDiscountDefault_bg" v-else-if="isVip == 1 && !$store.getters.getIsMember.flag">
        <!-- <div class="logoBg"><svg-icon iconClass='logoBg' className='svg_icon'></svg-icon></div> -->
        <div class="contentsVipPackage">
            <!-- 文字内容 -->
            <div class="textContents">
                <div class="leftText"> 
                    <div class="vipBox"><svg-icon iconClass='vip' className='svg_icon'></svg-icon></div>
                    <div class="ft14 text1">专享</div>
                </div>
                <div class="rightText ft16" v-if="discountData.model !== 3">
                    <div class="ft14 font_weight color_white_08 margin_right_8"></div>
                    <div class="ft14 color_white_1 font_weight margin_right_20">¥{{discountData.gamePriceData.memberPrice}}</div>
                </div>
                <div class="rightText ft14 color_white_1 font_weight margin_right_20" v-else>畅享试玩</div>
            </div>
        </div>
    </div>
    <!-- 会员的 是会员-->
    <div class="contentsVip chooseDiscountActive_bg" v-else-if="isVip == 1 && $store.getters.getIsMember.flag">
        <!-- <div class="logoBg"><svg-icon iconClass='logoBg' className='svg_icon'></svg-icon></div> -->
        <div class="contentsVipPackage">
            <!-- 文字内容 -->
            <div class="textContents">
                <div class="leftText"> 
                    <div class="vipBox"><svg-icon iconClass='vip' className='svg_icon'></svg-icon></div>
                    <div class="ft14 color_white_1">专享</div>
                </div>
                <div class="rightText ft16" v-if="discountData.model != 3">
                    <div class="ft14 font_weight color_white_08 margin_right_8"></div>
                    <div class="ft14 color_white_1 font_weight margin_right_20">¥{{discountData.gamePriceData.memberPrice}}</div>
                </div>
                <div class="rightText ft14 color_white_1 font_weight margin_right_20" v-if="discountData.model == 3">x{{myCoupon}}</div>
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
export default {
  name: 'chooseDiscount',
  props: ['isVip','discountData'],
  data(){
      return {
        myCoupon:'0',//我的会员试玩券
      }
  },
  created(){
    
  },
  mounted(){
    //   vip调用并且用户为 会员时调用
    if(this.isVip == 1 && this.$store.getters.getIsMember.flag){
        this.queryCoupon()
    }
    //   console.log(this.discountData)
  },
  methods:{
    // 查询我的试玩券
    queryCoupon(){
        this.$fetch('/ticket/mine')
            .then((response) => {
                this.myCoupon = response.code
            })
    }
    
  },
};
</script>
<style lang="scss" scoped>
.chooseDiscount{
    width: 100%;
    height: 100%;
    // 背景内容  普通的
    .contents{
        width: 100%;
        height: 45px;
        // background: rgba(25,45,61,1);
        // background:linear-gradient(126deg,rgba(64,202,224,1) 0%,rgba(65,161,226,1) 100%);
        // border:1px solid rgba(140,212,255,0.15);
        position: relative;
        // 文字内容
        .textContents{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .leftText{
                display: flex;
                .vipBox{
                    width: 22px;
                    height: 20px;
                    margin: 0 7px 0 14px;
                }
                .logoBg{
                    width: 22px;
                    height: 20px;
                    margin: 0 7px 0 14px;
                }
            }
            .rightText{
                // color:rgba(191,233,255,1);
                display: flex;
                align-items: center;
            }
        }
    }
    // 背景内容  会员的
    .contentsVip{
        width: 100%;
        height: 45px;
        // background: rgba(25,45,61,1);//linear-gradient(126deg,rgba(64,202,224,1) 0%,rgba(65,161,226,1) 100%);
        // border:1px solid rgba(140,212,255,0.15);
        position: relative;
        .logoBg{
            width: 90px;
            height: 70px;
            position: absolute;
            left: -20px;
            top: -8px;
        }
        .contentsVipPackage{
            width: 100%;
            height: 100%;
            // 文字内容
            .textContents{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .leftText{
                    display: flex;
                    .vipBox{
                        width: 22px;
                        height: 20px;
                        margin: 0 7px 0 14px;
                    }
                }
                .rightText{
                    display: flex;
                    align-items: center;
                    // color:rgba(191,233,255,1);
                }
            }
        }
    }
}
.marB10{margin-bottom: 10px;}
.marB14{margin-bottom: 14px;}
.cur{cursor: pointer;}
.border{border:1px solid rgba(140,212,255,0.15);}
.text1{color:rgba(234,228,177,1);font-weight:bold;}
</style>
