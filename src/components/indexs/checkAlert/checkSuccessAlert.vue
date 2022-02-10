<template>
    <div class="container" @mousedown.stop="''">
        <div class="checkSuccessAlert checkSuccessAlert_bg">
            <!-- 关闭按钮 -->
            <div class="checkCloseBtn checkCloseBtn_bg" @click="closeCheckSuccessAlert"></div>
            <!-- 每日签到增加P币 -->
            <div class="todayAddCoins ft18">每日签到成功+<span class="ft18" style="color:#FAEFC9">{{ordinaryGold}}</span>P币</div>
            <!-- 好的 按钮 -->
            <div class="checkGoodBtn checkGoodBtn_bg" @click="closeCheckSuccessAlert"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'checkSuccessAlert',
    props:['ordinaryGold'],
    data(){
        return {
            
        }
    },
    methods:{
        // 关闭签到成功弹窗
        closeCheckSuccessAlert(){
            this.$emit('change',false)
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
        .checkSuccessAlert {
            width: 549px;
            height: 394px;
            position: relative;
            margin: 150px auto;
            // 关闭按钮
            .checkCloseBtn {
                width: 20px;
                height: 20px;
                position: absolute;
                cursor: pointer;
                top: 40px;
                right: 50px;
            }
            // 每日签到获得P币
            .todayAddCoins {
                width: 100%;
                height: 25px;
                position: absolute;
                margin: 156px auto;
                text-align: center;
                color: #ffffff;
            }
            // 好的 按钮
            .checkGoodBtn {
                width: 172px;
                height: 35px;
                position: absolute;
                margin: 240px 192px;
                cursor: pointer;
            }
        }
    }
</style>