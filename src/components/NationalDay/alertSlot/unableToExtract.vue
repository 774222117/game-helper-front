<template>
    <!-- 您已抽取全部奖品，无法继续抽取 -->
    <div class="alertSlotBox">
        <!-- 充值不足 -->
        <div class="pager ft24 font_weight">您已抽取全部奖品，无法继续抽取</div>
        <!-- 好的 -->
        <div class="ready">
            <div class="BtnClick ready_bg" @click="close"></div>
        </div>
    </div>
</template>


<script>
export default {
    name:'unableToExtract',
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
        },
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
            color: rgba(133,45,0,1);
            margin: 161px 0 0 151px;
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
                width: 240px;
                height: 75px;
                position: absolute;
                z-index: 3;
                cursor: pointer;
            }
        }     
    }

</style>