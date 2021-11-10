<template>
    <!-- 合成大赏外层盒子 -->
    <div class="itemBox">
        <!-- 单个盒子外框 -->
        <div class="itemPic" v-for="item in Jackpot">
            <prizeinstrItem :item="item" :Level='synthesisLevel'/>
        </div>
    </div>
</template>



<script>
import prizeinstrItem from '@/components/newYear/synthesisView/prizeinstrItem';//大赏一览单个游戏图

export default {
    name:'synthesisItemBox',
    components:{
        prizeinstrItem
    },
    props:['synthesisLevel'],
    data(){
        return {
            Jackpot:'',//大赏一览奖品池数据
            synthesisComposed:['B','A','S','SS','SSR'],//大赏一览数组
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            let _this = this;
            // 大赏一览数据接口
            _this.$fetch('/lucky/bag/schedule',{'level':_this.synthesisComposed.indexOf(_this.synthesisLevel) + 1}).then(response => {
                if(response.flag){
                    _this.Jackpot = response.data
                    // console.log(_this.Jackpot)
                    // console.log(_this.synthesisComposed.indexOf(_this.synthesisLevel) + 1)
                }else{
                    console.log('没有奖品数据')
                }
            })
        },
    }
}
</script>


<style lang="scss" scoped>
    .itemBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
        .itemPic {
            width: 157px;
            height: 235px;
            margin-right: 9px;
            margin-top: 28px;
        }
    }
</style>