<template>
    <!-- 您已抽取全部奖品，无法继续抽取 -->
    <div class="alertSlotBox">
        <!-- 充值不足 -->
        <div class="pager ft24 font_weight">您已抽取全部奖品，无法继续抽取</div>
        <!-- 好的 -->
        <div class="ready mygold_bg">
            <div class="BtnClick" @click="close"></div>
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
            margin: 161px 0 0 171px;
            background-image: linear-gradient(93deg,#ff947c 0%, rgba(254,255,191,0.88) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
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
                width: 179px;
                height: 79px;
                position: absolute;
                z-index: 3;
                cursor: pointer;
            }
        }     
    }

</style>