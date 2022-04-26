<template>
<!-- 头部用户信息-->
  <div class="headerUserInfoMain">
        <div class="isMemberBox headerMember_bg">
            <div class="leftMember">
                <div class="leftMemberTop"><div class="icons"> <svg-icon iconClass='vipvip' className='svg_icon'></svg-icon></div> <div class="texts ft16">会员享折上折</div></div>
                <div class="leftMemberBtm ft12 color_white_06">
                    {{$store.getters.getIsMember.flag? '到期时间：'+$store.getters.getIsMember.data.memberExpireDate: '畅享试玩，送至高价值¥'+$store.getters.getIsMember.data+'游戏'}}
                </div>
            </div>
            <div class="rightMember" @click="displayAlertMemberFun">{{$store.getters.getIsMember.flag? '续费会员': '开通会员'}} </div>
        </div>
        <div class="userMyOrder">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='wallet' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">我的余额</div>
            </div>
            <div class="userMyOrderIcon3"  @click="getMyBalance"> ¥{{$store.getters.getUserBalance.balance}} <div class="icons"> <svg-icon iconClass='refresh' className='svg_icon'></svg-icon> </div></div>
        </div>
        <div class="userMyOrder">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='myGold' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">我的P币</div>
            </div>
            <div class="userMyOrderIcon3"  @click="getMyBalance">{{$store.getters.getUserBalance.credit}} <div class="icons"> <svg-icon iconClass='refresh' className='svg_icon'></svg-icon> </div></div>
        </div>
        <div class="userMyOrder" @click="goToMyGame">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='game' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">我的游戏</div>
            </div>
            <div class="userMyOrderIcon2 arrow1_bg"></div>
        </div>
        <div class="userMyOrder" @click="goToMyOrder">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='file' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">我的订单</div>
            </div>
            <div class="userMyOrderIcon2 arrow1_bg"></div>
        </div>

        <div class="userMyOrder" @click="openMyCard">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='cardCoupon' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">我的卡券</div>
            </div>
            <!-- 卡券余额 -->
            <div class="userCardBalance ft14" :class="$store.getters.getCouponNumber > 0 ? 'hoverCoupon' : 'noCoupon' ">{{$store.getters.getCouponNumber}}张可使用</div>
            <div class="userMyOrderIcon2 arrow1_bg"></div>
        </div>

        <div class="userMyOrder" @click="goRealName">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='realNameAuthentication' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">实名认证<span class="isRealName ft12" v-if="alreadyCertified"> (已认证)</span>
                <span class="noRealName ft12" v-else> (未认证)</span></div>
            </div>
            <div class="userMyOrderIcon2 arrow1_bg"></div>
        </div>
        <div class="userMyOrder"  @click="setUpBtn">
            <div class="opc_hover">
                <div class="userMyOrderIcon"><svg-icon iconClass='setUp' className='svg_icon'></svg-icon></div>
                <div class="userMyOrderText ft14 color_white_1">软件设置</div>
            </div>
            <div class="userMyOrderIcon2 arrow1_bg"></div>
        </div>
  </div>
</template>
<style lang="scss" scoped>
.headerUserInfoMain{
    width: 100%;
    height: 100%;
    
    .isMemberBox{
        width: 100%;
        height: 77px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftMember{
            width: 215px;
            height: 47px;
            margin-left: 13px;
            display: flex;
            flex-direction: column;
            .leftMemberTop{
                width: 100%;
                height: 22px;
                line-height: 22px;
                margin-bottom: 5px;
                display: flex;
                .icons{
                    width: 22px;
                    height: 22px;
                }
                .texts{
                    margin-left: 6px;
                    color: rgba(234, 228, 177, 1);
                }
            }
            .leftMemberBtm{
                width: 100%;
                height: 20px;
                line-height: 20px;
                text-align: left;
            }
        }
        .rightMember{
            width:84px;
            height:25px;
            background:linear-gradient(112deg,rgba(162,163,125,1) 0%,rgba(132,126,83,1) 100%);
            border-radius:4px;
            line-height:25px;
            margin-right: 25px;
        }
    }
    // //会员炫彩字体
    // .userName.isMemberSty{
    //     background-image: linear-gradient(to right , #ff0000, #02ff9e);
    //     -webkit-background-clip: text;
    //     -webkit-text-fill-color: transparent;
    // }
    .userMyOrder{
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .userCardBalance {
            position: absolute;
            left: 240px;
        }
        &>div{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .userMyOrderIcon{
                width: 24px;
                height: 24px;
                margin-left: 27px;
            }
            .userMyOrderText{
                min-width: 100px;
                height: 24px;
                margin-left: 6px;
                line-height: 24px;
                text-align: left;
                // 已认证
                .isRealName {
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #8addff;
                    text-shadow: 0px 4px 19px 0px rgba(0,0,0,0.85); 
                }
                // 未认证
                .noRealName {
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #999999;
                    text-shadow: 0px 4px 19px 0px rgba(0,0,0,0.85); 
                }
            }
        }
        
        .userMyOrderIcon2{
            width: 24px;
            height: 24px;
            margin-right: 27px;
            opacity: 0.6;
        }
        .userMyOrderIcon3{
            width: auto;
            height: 24px;
            margin-right: 25px;
            opacity: 0.6;
            .icons{
                width: 20px;
                height: 20px;
                margin-left: 6px;
            }
        }
    }
    .userMyOrder:hover .userMyOrderIcon2,
    .userMyOrder:hover .userMyOrderIcon3{
        opacity: 1;
    }
    
}

.hoverCoupon {
    color: yellowgreen;
}
.noCoupon {
    color: #ffffff;
}
</style>
<script>
import { EventBus } from "@/utils/eventBus.js";
import { setStore, getStore, removeStore } from "@/utils/storage";
import JumpTo from '@/utils/jumpTo';
import store from '@/store';
export default {
    name: 'headerUserInfo',
    components: {
        JumpTo,
    },
    data(){
        return {
            
        }
    },
    mounted() {
        
		if(!!this.$store.getters.getLoginCode && this.$store.getters.getLoginCode.loginCode != ''){
			this.getMyBalance()
        }
        this.userIsMember()
	},
    methods:{
        // 打开我的卡包
        openMyCard(){
            this.$store.commit('setOpenMyCardBag',true)
        },
        //查看设置按钮
        setUpBtn(){
            // console.log(this.$store.getters.getStorage)
            this.$confirm({
                title: " 设置",
                mesg: '',
                mesgStyle:{'height':'410px'},
                settings:true,
                // cntMsg: '<div class="helAA">你好</div>',
                confirmValStyle:{'font-size':'10Px'},
                cancelValStyle:{'font-size':'10Px'},
                cancel:false,
                confirm:false,
                // mackStyle:{'width':'800px','height':'800px'},
                btn: {
                    confirmVal: "Apply for extracting account",
                    cancelVal: "Cancellation request"
                }
            }).then(() => {
                if(data == 'extractTheAccount'){
                
                }else if(data == 'refund'){
                    this.alertFun(2,'refund')
                }
            })
            .catch(() => {
            });
        },
        goToMyOrder(){
            if(this.$store.getters.getIsRefresh){
                JumpTo(4)
            }
        },
        // 跳转到 我的游戏 - 认证界面
        goRealName(){
            JumpTo(3)
            if(getStore({name:'loginRealName'}).isAdopt !== 1){
                EventBus.$emit('toRealName',true)
            }
        },
        goToMyGame(){
            JumpTo(3)
        },
        //我的余额
		getMyBalance(){
			this.$fetch("/account/getBalance").then(response => {
				this.$store.commit('setUserBalance',response.data)
			});
        },
        // 打开会员购买
        displayAlertMemberFun(data){
            this.$store.commit('setDisplayOpenMember',true)
        },
        //是否会员
        userIsMember(){
            this.$fetch('/member/join')
                .then((response) => {
                    // setTimeout(()=>{response.flag=true},3000)
                    this.$store.commit('setIsMember', response)
                })
        },
    },
    computed:{
        alreadyCertified(){
          return this.$store.state.alreadyCertified;
      },
    }
};
</script>
