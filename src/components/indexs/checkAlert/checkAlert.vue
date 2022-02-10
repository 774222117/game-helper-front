<template>
    <div class="container" @mousedown.stop="''">
        <div class="checkMemberAlert checkPage_bg">
            <!-- 普通会员签到 -->
            <div class="ordinaryCheck" :class="ordinaryBtn ? 'alreadyOrdinary_bg' : 'ordinaryCheck_bg'" @click="handleOrdinaryMember(0)"></div>
            <!-- 超级会员签到或者开通会员 -->
            <div class="superMemberCheck" :class="superMemberBtn ? (superBtn ? 'alreadySuper_bg' : 'getSuperMemberGame_bg' ) : 'superMemberCheck_bg'" @click="handleOrdinaryMember(1)"></div>
            <!-- 关闭按钮 -->
            <div class="close checkClose_bg" @click="closeMemberAlert"></div>
        </div>
    </div>
</template>
<script>
import { EventBus } from "@/utils/eventBus.js";
export default {
    name:'checkAlert',
    props:['superMemberBtn','ordinaryBtn','superBtn'],//superMemberBtn是否超级会员，ordinaryBtn普通会员是否签到，superBtn超级会员是否签到
    data(){
        return {
            ordinaryCheckNum:0,//签到获得的金币
        }
    },
    methods:{
        // 关闭弹窗
        closeMemberAlert(){
            this.$emit('change',false)
        },
        // 点击签到
        handleOrdinaryMember(data){
            var _this = this
            if(data == 0){
                _this.checkWay(data)
            }else{
                if(data == 1 && _this.superMemberBtn){
                    _this.checkWay(data)
                }else{
                    // 不是超级会员
                    _this.$emit('change',false)
                    _this.$store.commit('setDisplayOpenMember',true)
                    // 中央事件总线传递至 开通会员界面 eventOpenMember为false
                    this.$nextTick(()=>{
                        EventBus.$emit('eventOpenMember',false)
                    })
                }
            }
        },
        // 签到请求方法
        checkWay(data){
            var _this = this
            _this.$fetch('/account/sign',{'isSvip':data})
            .then((response) => {
                // 改变已签到状态
                if(data == 0){
                    _this.$emit('changeMemberState',data,true)
                }else{
                    _this.$emit('changeMemberState',data,true)
                }
                // console.log(response)
                if(response.flag){
                    // 保存用户签到获得金币
                    _this.ordinaryCheckNum = response.code
                    // 传到父级:保存签到的金币，打开签到成功窗口，关闭签到框
                    _this.$emit('ordinaryCheck',_this.ordinaryCheckNum,true)
                    // 查询是否今日已全部签到
                    _this.checkMemberState()
                }else{
                    console.log('签到接口异常')
                }
            })
        },
        // 查询签到状态
        checkMemberState(){
            var _this = this
            _this.$fetch('/account/signStatus')
			.then((response) => {
				// console.log(response)
				if(response.flag){
					if(response.data.svipSign && response.data.sign){
                        // 修改首页签到按钮为超级会员标识
                        _this.$emit('superMemberUser',true)
                    }else{
                        console.log('今日未全部签到')
                    }
				}else{
					console.log('查询签到状态异常')
				}
                // 关闭签到窗
                // _this.$emit('change',false)
			})
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        margin: auto;
        background-color: rgba(13, 22, 30, 0.7);
        .checkMemberAlert {
            width: 538px;
            height: 388px;
            margin: 150px auto;
            position: relative;
            // 普通会员签到
            .ordinaryCheck {
                width: 171px;
                height: 41px;
                // border: 1px red solid;
                position: absolute;
                left: 58px;
                bottom: 70px;
                cursor: pointer;
            }
            // 超级会员签到或者开通会员
            .superMemberCheck {
                width: 171px;
                height: 41px;
                // border: 1px red solid;
                position: absolute;
                right: 74px;
                bottom: 70px;
                cursor: pointer;
            }
            // 关闭按钮
            .close {
                width: 20px;
                height: 20px;
                position: absolute;
                top: 36px;
                right: 46px;
                cursor: pointer;
                z-index: 99;
            }
        }
    }
</style>