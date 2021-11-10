<template>
<!-- 首页弹窗 -->
    <div class="newyearalert" v-if="loginState == true &&  dailyLogin == true ? true : false" @click="closeAlert(false)">
        <!-- 新春红包框 -->
        <div class="redBagBox goldLighting_bg">
            <!-- 金光 -->
            <div class="lighting "></div>
            <!-- 红包 -->
            <div class="envelopes turnRedBag_bg"></div>
            <!-- 免费领取游戏 -->
            <div class="getGame" :class=" item ? lighting ? 'ungotoSee_bg' : 'gotoSee_bg' :lighting ? 'unfreeGetGame_bg' : 'freeGetGame_bg'" @click="goToNewYear">
            </div>
        </div>
    </div>

    <!-- 首页右下角小logo -->
    <div class="smallalert" @click="gotoActivity" v-else>
        <div class="smallbag smallbag_bg"></div>
        <!-- <div class="smallget smallget_bg"></div> -->
    </div>
</template>

<script>
import store from '@/store'
import JumpTo from '@/utils/jumpTo'  //跳转函数
import {setStore,getStore,removeStore}  from '@/utils/storage'

export default {
    name:'newYearAlert',
    components:{store,JumpTo},
    props:['item','loginState','dailyLogin'],
    data(){
        return {
            // redbagShow:false,
            lighting:false,
        }
    },
    methods:{
        // 按钮选中未选中状态切换
        BtnShow(data){
            this.lighting = data
        },
        // 点击空白处控制首页弹窗显示隐藏
        closeAlert(tag){
            // this.redbagShow = tag
            this.$emit('change',tag)
        },
        // 点击去看看保存用户信息
        goToNewYear(){
            // {
			// 	'value':'',//当前用户是否参加过活动
			// 	'active':0,//当前用户当前是否点击过去看看
			// 	'newTime':0,//记录当天点击过去看看的时间
            // 		}
            var date = new Date();//获取当前点击时间
            var month = date.getMonth();//获取当前点击时间月份
            var strDate = date.getDate();//获取当前点击时间日期
            //建立loginInfo变量来保存已经创建的storage信息
            var loginInfo =  getStore({name:'loginTurn51',type:false})
            if(loginInfo.value && loginInfo.active == 0){//如果 用户已经参加活动 && 用户当前没有点击'去看看'
                loginInfo.active = 1 //点击去看看变为1
                loginInfo.newTime = {'month':month,'day':strDate} //重新获取用户点击去看看的时间(月份和日期)
                // console.log(loginInfo.newTime)
                // 重新记录更新之后的用户信息保存到storage中
                setStore({name:'loginTurn51',content:loginInfo,type:false})
            }
            JumpTo(22);

        },
        // 点击小图标跳转活动页面
        gotoActivity(){
            JumpTo(22);
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/luckNewYear/css/homepage.css";

    .newyearalert {
        width: 100%;
        height: calc(100% - 60px);
        position: fixed;
        top: 60px;
        left: 0;
        z-index: 51;
        background-color: rgba(13, 22, 30, 0.7);
        
        .redBagBox {
            width: 512px;
            height: 535px;
            box-sizing: border-box;
            border-radius: 6px;
            position: absolute;
            left: 0;
            top: 65px;
            right: 0;
            margin:0 auto;
            // display: none;
            .lighting {
                width: 1267px;
                height: 780px;
                position: absolute;
                margin-left: -377px;
                z-index: 1;
            }
            .envelopes {
                width: 325px;
                height: 476px;
                position: absolute;
                left: 0;
                right: 0;
                margin: 37px auto 0;
            }
            .getGame {
                width: 246px;
                height: 70px;
                left: 0;
                right: 0;
                margin: 385px auto 160px;
                z-index: 2;
                position: absolute;
                cursor: pointer;
            }
        }
        .close {
            width: 50px;
            height: 50px;
            margin-left: 750px;
            margin-top: 90px;
            cursor: pointer;
            z-index: 10;
            position: absolute;
        }
    }
     //小红包
        .smallalert {
            width: 144px;
            height: 113px;
            position: fixed;
            bottom: 83px;
            // right: 23px;
            left: 23px;
            z-index: 51;
            cursor: pointer;
            .smallbag {
                width: 144px;
                height: 113px;
                position: absolute;
            }
            .smallget {
                width: 115px;
                height: 36px;
                position: absolute;
                margin:100px 0 0 12px
            }
         }
</style>