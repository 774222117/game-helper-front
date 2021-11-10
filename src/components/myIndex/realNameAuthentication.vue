<template>
<!-- 实名认证弹窗 -->
    <div class="backgroundBox" v-if="beforeRealName">
        <div class="realNameBox backgroundPic_bg">
            <!-- 关闭按钮 -->
            <div class="realNameClose close_bg" @click="closeRealName"></div>
            <!-- 内容 -->
            <div class="realNameContent">
                <div class="title ft24">个人实名认证</div>
                <div class="realNameText ft16">{{realNameText1}}<span class="realName">{{realNameText2}}</span></div>
                <!-- 真实姓名 -->
                <div class="realNameInput">
                    <div class="name ft14">真实姓名</div>
                    <input type="text" class="nameInput ft14" placeholder="请输入真实姓名" v-model="userName">
                    <div class="errorNameBox">
                        <div class="errorName ft14" v-show="errorName">{{userNameTips}}</div>
                    </div>
                </div>
                <!-- 身份证号 -->
                <div class="IDcard">
                    <div class="number ft14">身份证号</div>
                    <input type="text" class="numberInput ft14" placeholder="请输入请输入18位身份证号" v-model="userCard">
                    <div class="errorNumberBox">
                        <div class="errorNumber ft14" v-show="errorNumber">{{userCardTips}}</div>
                    </div>
                </div>
                <!-- 今天提交过多 -->
                <div class="todayEnought ft14" v-show="todayError">今天验证次数过多，请明天再试哦！</div>
            </div>
            <!-- 提交按钮 -->
            <div class="submitRealName sumbitButton_bg" @click="submitInfo"></div>
        </div>
    </div>

    <div class="backgroundBox" v-else>
        <div class="realNameBox backgroundPic_bg">
            <!-- 关闭按钮 -->
            <div class="realNameClose close_bg"></div>
            <div class="successPic successPic_bg"></div>
            <div class="successText ft18">实名认证成功!</div>
            <div class="rightButton rightButton_bg" @click="isRight"></div>
        </div>
    </div>
</template>

<script>
import {setStore,getStore,removeStore}  from '@/utils/storage'

export default {
    name:'realNameAuthenitcation',
    component:{},
    data(){
        return {
            realNameText1:"W4PLAY全力为玩家们提供专业、便捷、健康的游戏服务。根据中华人民共和国文化部《互联网文化管理暂行规定》和《网络游戏管理暂行办法》对于网络游戏市场的相关规定及要求,游戏用户需要登记并认证如下个人信息,我们将于近期实行强制实名认证,",
            realNameText2:"未实名用户将不能启动游戏,未成年人在法规下仅允许在法定节假日晚上8~9点启动游戏。",
            errorName:false,//显示隐藏姓名错误
            errorNumber:false,//显示隐藏身份证号错误
            todayError:false,//今日验证次数超过三次
            userName:'',//用户姓名
            userCard:'',//用户身份证号
            userNameTips:'',//用户姓名错误 提示
            userCardTips:'',//身份证号错误 提示
            beforeRealName:true,//实名认证之前
        }
    },
    methods:{
        // 认证成功之后，点击 好的 关闭弹窗
        isRight(){
            this.$emit('change',false)
            window.location.reload()
        },
        // 关闭弹窗
        closeRealName(){
            this.$emit('change',false)
        },
        // 提交个人实名认证信息
        submitInfo(){
            // 姓名和身份证号都必须正确
            if(this.nameIsTrue() && this.cardNumberIsTrue()){
                this.idCardRealName()
            }
        },
        // 验证姓名是否正确
        nameIsTrue(){
            var reg = /^[\u4e00-\u9fa5]{2,4}$/i;
            var person = this.userName
            if(!person){
                this.errorName = true
                this.userNameTips = '真实姓名不能为空'
            }else{
                if(!reg.test(person)){
                    this.errorName = true
                    this.userNameTips = '请输入正确的姓名'
                }else{
                    this.errorName = false
                    console.log('姓名正确')
                    return true
                }
            }
            return false
        },
        // 验证身份号是否正确
        cardNumberIsTrue(){
            var card = this.userCard
            var reg  = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            if(!card){
                this.errorNumber = true
                this.userCardTips = '身份证号不能为空'
            }else{
                if(reg.test(card) === false){
                    this.errorNumber = true
                    this.userCardTips = '请填写正确的身份证号'
                    console.log('身份证号错误')
                }else{
                    this.errorNumber = false
                    console.log('身份证正确！~')
                    return true
                }
            }
            return false
        },
        // 提交个人信息到后台验证  /game/idCardRealname
        // 熊小悠
        // 420106201207169528
        idCardRealName(){
            var _this = this
            // 保存个人信息
            var personInfo = {
                idCard:_this.userCard,
                userName:_this.userName
            }
            var peopleInfo = getStore({name:'loginRealName'})
            if(peopleInfo.AuthenFailed < 3){
                _this.$fetch('/game/idCardRealname',personInfo).then((response) => {
                // console.log(response)
                if(response.flag){
                    // 认证成功之后，关闭认证界面，弹出认证成功界面
                    _this.beforeRealName = false;//关闭认证界面
                    peopleInfo.isAdopt = response.data.isAdopt;//保存已认证
                    peopleInfo.userBirthday = personInfo.idCard;//保存用户身份号
                    setStore({name:'loginRealName',content:peopleInfo})
                }else{
                    peopleInfo.AuthenFailed++;
                    setStore({name:'loginRealName',content:peopleInfo})
                    _this.errorNumber = true
                    _this.userCardTips = response.message
                }
            })
            }else{
                _this.todayError = true
            }
            // console.log(peopleInfo)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/realNameAuthentication/realNameAuthentication.css";
.backgroundBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 23;
    background-color: rgba(0,0,0,0.6);
    .realNameBox {
        width: 908px;
        height: 538px;
        border-radius: 8px;
        position: absolute;
        left: 0;
        right: 0;
        top: 140px;
        margin: 0 auto;
        // 认证成功图片
        .successPic {
            width: 415px;
            height: 309px;
            margin: 61px 0 0 257px;
        }
        .successText {
            width: 114px;
            height: 24px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: LEFT;
            color: #bfe9ff;
            line-height: 24px;
            margin: 0 auto;
        }
        .rightButton {
            width: 211px;
            height: 48px;
            margin: 50px auto;
            cursor: pointer;
        }
        // 关闭按钮
        .realNameClose {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;
        }
        // 内容
        .realNameContent {
            width: 730px;
            height: 382px;
            margin: 54px auto 0px;
            .title {
                line-height: 24px;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: 700;
                text-align: center;
                color: #d6ecf9;
                line-height: 24px;
            }
            .realNameText {
                width: 730px;
                height: 120px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: rgba(197,226,242,0.6);
                line-height: 30px;
                margin-top: 39px;
                .realName {
                    text-align: left;
                    color: rgba(197,226,242,1);
                    font-weight: 600;
                }
            }
            .realNameInput {
                min-width: 768px;
                height: 43px;
                margin-top: 47px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                .name {
                    min-width: 58px;
                    height: 24px;
                    font-weight: 400;
                    text-align: left;
                    color: #7ea0b5;
                    line-height: 24px;
                }
                // 姓名输入框
                .nameInput {
                    color: #ffffff;
                    width: 460px;
                    height: 43px;
                    background-color: rgba(255,255,255,0.09);
                    border: 1px solid rgba(153,153,153,0.71);
                    border-radius: 4px;
                    padding-left: 26px;
                }
                // 输入错误提示框
                .errorNameBox {
                    min-width: 140px;
                    height: 24px;
                    .errorName {
                        color: #c7161f;
                    }
                }
            }
            .IDcard {
                min-width: 768px;
                height: 43px;
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                .number {
                    min-width: 58px;
                    height: 24px;
                    font-weight: 400;
                    text-align: left;
                    color: #7ea0b5;
                    line-height: 24px; 
                }
                // 身份证号输入框
                .numberInput {
                    color: #ffffff;
                    width: 460px;
                    height: 43px;
                    background-color: rgba(255,255,255,0.09);
                    border: 1px solid rgba(153,153,153,0.71);
                    border-radius: 4px;
                    padding-left: 26px;
                }
                // 身份证格式错误提示框
                .errorNumberBox {
                    min-width: 140px;
                    height: 24px;
                    .errorNumber {
                        color: #c7161f;
                    }
                }
            }
            // 今日提价过多
            .todayEnought{
                width: 224px;
                height: 24px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: LEFT;
                color: #bde9ff;
                line-height: 24px;
                margin: 22px 0 0 256px;
            }
        }
        // 提交按钮
        .submitRealName {
            width: 211px;
            height: 48px;
            margin: 10px 0 0 336px;
            cursor: pointer;
        }
    }
}
</style>