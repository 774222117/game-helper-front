<template>
<!-- 充值成功 -->
    <div class="voucherCenter">
        <!-- 成功logo -->
        <div class="voucherSuccess">
            <div class="success voucherSuccess_bg"></div>
            <div class="text1 ft28 simkai">充值成功！</div>
            <div class="text2 ft28 simkai">快去开福袋吧</div>
        </div>
        <!-- 好的 -->
        <div class="good finish_bg" @click="cancel"></div>
    </div>
</template>



<script>
export default {
    name:'voucherSuccess',
    components:{},
    methods:{
        // 点击 好的 关闭充值成功弹窗
        cancel(){
            this.$emit('change',false)
        }
    }
}
</script>



<style lang="scss" scoped>
    //充值成功
    .voucherCenter {
        width: 788px;
        height: 445px;
        margin:9px 16px 11px 17px;
        display: flex;
        position: relative;
        //成功logo
        .voucherSuccess {
            width: 168px;
            height: 172px;
            position: absolute;
            left: 310px;
            top: 87px;
            .success {
                width: 76px;
                height: 76px;
                margin: 0 auto;
            }
            .text1 {
                width: 140px;
                line-height: 39px;
                color: #FFE6B3;
                margin: 11px auto 0 auto;
            }
            .text2 {
                width: 168px;
                line-height: 39px;
                margin-top: 2px;
                color: #FFE6B3;
            }
        }
        //好的
        .good {
            width: 246px;
            height: 71px;
            position: absolute;
            left: 271px;
            top: 305px;
            cursor: pointer;
        }
    }
</style>