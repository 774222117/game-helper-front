<template>
    <!-- 金币不足，请充值 -->
    <div class="alertSlotBox">
        <!-- 充值不足 -->
        <div class="pager ft24 font_weight">您的金币不足，请充值后购买福袋</div>
        <!-- 去充值 -->
        <div class="ready" @click="voucher">
            <div class="BtnClick ready_bg" ></div>
        </div>
    </div>
</template>


<script>
export default {
    name:'insufficientGoldCoins',
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
        // 点击 去充值
        voucher(){
            this.$emit('change',false)
            this.$emit('changes',true,{'changeFun':'voucherCenter'})
        }
    }
}
</script>


<style lang="scss" scoped>
    .alertSlotBox {
        width: 691px;
        height: 452px;
        position: relative;
        top: 97px;
        left: 0px;
        .pager {
            width: 360px;
            height: 32px;
            // color: rgba(133,45,0,1);
            margin: 161px 0 0 178px;
            background-image: linear-gradient(93deg,#ff947c 0%, rgba(254,255,191,0.88) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
            text-align: center;
            line-height: 32px;
        }
        // 好的
        .ready {
            width: 294px;
            height: 135px;
            margin: 58px 0 0 199px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .BtnClick {
                width: 294px;
                height: 135px;
                position: absolute;
                z-index: 3;
                cursor: pointer;
            }
        }     
    }

</style>