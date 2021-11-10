<template>
<!-- 强制提示未成年人在允许范围内启动游戏 -->
    <div class="backgroundBox">
        <div class="underAgeBox">
            <!-- 关闭按钮 -->
            <div class="close close_bg" @click="close"></div>
            <div class="underAgePic underAgePic_bg"></div>
            <div class="underAgeText ft14">抱歉！未成年人在法规下仅允许在法定节假日晚上8~9点启动游戏。</div>
            <!-- 好的 -->
            <div class="rightBtn rightBtn_bg" @click="close"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'underAge',
    data(){
        return {

        }
    },
    methods:{
        // 关闭按钮
        close(){
            this.$emit('change',false)
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
        .underAgeBox {
            width: 583px;
            height: 290px;
            background-color: #051824;
            border-radius: 8px;
            position: absolute;
            left: 0;
            right: 0;
            top: 300px;
            margin: 0 auto;
            // 关闭按钮
            .close {
                width: 30px;
                height: 30px;
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
            }
            .underAgePic {
                width: 93px;
                height: 93px;
                position: absolute;
                top: 39px;
                left: 244px;
            }
            .underAgeText {
                width: 422px;
                height: 31px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: LEFT;
                color: #8fb4c9;
                position: absolute;
                bottom: 111px;
                left: 80px;
            }
            .rightBtn {
                width: 161px;
                height: 42px;
                position: absolute;
                bottom: 40px;
                left: 210px;
                cursor: pointer;
            }
        }
    }
</style>