<template>
<!-- 充值成功 -->
    <div class="alertSlotBox">
        <!-- 成功logo -->
        <div class="successLogo voucherSuccess_bg"></div>
        <!-- 成功文案 -->
        <div class="text1 ft24 font_weight">充值成功！</div>
        <div class="text2 ft24 font_weight">快去开福袋吧！</div>
        <!-- 好的 -->
        <div class="ready mygold_bg">
            <div class="BtnClick" @click="close"></div>
        </div>
    </div>
</template>



<script>
export default {
    name:'voucherSuccess',
    components:{

    },
    data(){
        return {
            lighting:false,//切换按钮点击状态
        }
    },
    methods:{
        // 按钮选中未选中状态切换
        BtnShow(data){
            this.lighting = data
        },
        // 点击 好的 关闭弹窗
        close(){
            this.$emit('change',false)
        }
    }
}
</script>


<style lang="scss" scoped>
    .alertSlotBox {
        width: 821px;
        height: 464px;
        position: relative;
        top: 0px;
        left: 0px;
        //成功logo
        .successLogo {
            width: 76px;
            height: 76px;
            margin: 107px 0 0 375px;
        }
        // 文案
        .text1 {
            width: 120px;
            height: 32px;
            margin: 22px 0 0 364px;
            background-image: linear-gradient(93deg,#ff947c 0%, rgba(254,255,191,0.88) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .text2 {
            width: 168px;
            height: 32px;
            margin: 10px 0 0 340px;
            background-image: linear-gradient(93deg,#ff947c 0%, rgba(254,255,191,0.88) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        // 好的
        .ready {
            width: 294px;
            height: 135px;
            margin: 6px 0 0 266px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .BtnClick {
                width: 179px;
                height: 79px;
                position: absolute;
                z-index: 3;
                left: 50px;
                cursor: pointer;
            }
        }  
    }
</style>