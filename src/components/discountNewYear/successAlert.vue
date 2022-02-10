<template>
    <div class="alertContent">
        <div class="voucherContent successBottom_bg">
            <!-- 关闭按钮 -->
            <div class="close serchClose_bg" @click="close"></div>
            <div class="success success_bg"></div>
            <div class="successText ft24">支付成功</div>
            <!-- 好的 -->
            <div class="successRight ft16" @click="close">好的</div>
        </div>
    </div>
</template>


<script>
export default {
    name:'successAlert',
    data(){
        return {}
    },
    methods:{
        // 关闭按钮
        close(){
            this.$emit('change',false,[])
        }
    }
}
</script>


<style lang="scss" scoped>
    .alertContent {
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
        .voucherContent {
            width: 760px;
            height: 441px;
            position: absolute;
            top: 204px;
            left: 0;
            right: 0;
            margin: 0 auto;
            overflow: hidden;
            // 关闭按钮
            .close {
                width: 33px;
                height: 40px;
                position: absolute;
                top: 0;
                right: 30px;
                cursor: pointer;
            }
            .success {
                width: 76px;
                height: 76px;
                margin: 89px auto 0 auto;
            }
            .successText {
                width: 110px;
                height: 32px;
                font-family: Microsoft YaHei UI, Microsoft YaHei UI-Bold;
                font-weight: 700;
                text-align: center;
                color: #f2d59e;
                line-height: 32px;
                letter-spacing: 0.44px;
                margin: 20px auto 0 auto; 
            }
            .successRight {
                width: 148px;
                line-height: 43px;
                // border: 1px white solid;
                margin: 61px auto;
                cursor: pointer;
                text-align: center;
                background: #c06c50;
                border: 1px solid #ffe8ac;
                border-radius: 4px;
                color: #ffe8ac;
                letter-spacing: 0.04px;
            }
        }
    }
</style>