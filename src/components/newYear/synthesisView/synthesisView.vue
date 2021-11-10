<template>
<!-- 合成大赏 展示组件 -->
<div class="synthesisViewMain">
    <!-- 左边 大赏等级 -->
    <div class="leftGrade" :class="`synthesisViewGrade_${synthesisLevel}_bg`"></div>
    <!-- 右边背景图片 -->
    <div class="rightView synthesisViewBg_bg">
        <!-- 右边展示内容 -->
        <div class="righrContent">
            <!-- 头部 -->
            <div class="titlesBox">
                <!-- 文案 -->
                <div class="titlsTexts ft14 simkai">
                    {{synthesisCompose[ synthesisCompose.indexOf(synthesisLevel) ]}}赏合成池：
                </div>
                <!-- 左右按钮 -->
                <div class="btns">
                    <!-- leftDefault rightDefault -->
                    <div class="leftBtns" :class="data>0 ? 'leftActive_bg' : 'leftDefault_bg'" @click="btnsClick('left')"></div> 
                    <div class="rightBtns" :class="data >= compositeData.length - 4 ? 'rightDefault_bg' : 'rightActive_bg'"  @click="btnsClick('right')"></div>
                </div>
            </div>
            <!-- 中间部分 -->
            <div class="middles">
                <div class="itemsContent" :style="{ transform: 'translateX(' + distance + 'px)' }">
                    <synthesisViewItems :synthesisLevel="synthesisLevel" :item="item" v-for="(item,index) in compositeData" :key="index"/>
                </div>
            </div>
            <!-- 底部 -->
            <div class="footers">
                <div class="haveNum ft14 simkai">
                    已有{{synthesisCompose[ synthesisCompose.indexOf(synthesisLevel) -1 ]}}赏数：<span class="ft20">{{nowCompositeNum}}</span>
                </div>
                <div class="explain ft14 simkai">3个{{synthesisCompose[ synthesisCompose.indexOf(synthesisLevel) -1 ]}}赏可以合成一个{{synthesisCompose[ synthesisCompose.indexOf(synthesisLevel) ]}}赏游戏</div>
                <!-- 立即合成按钮 -->
                <div class="synthesisBtn immediateSynthesisActive_bg curs" v-if="nowCompositeNum>=3" @click="synthesisBtn"></div>
                <div class="synthesisBtn immediateSynthesisDefault_bg" v-else></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import synthesisViewItems from '@/components/newYear/synthesisView/synthesisViewItems'
import { EventBus } from "@/utils/eventBus.js";
export default {
    name:'synthesisView',
    components:{synthesisViewItems},
    props:['synthesisLevel'],
    data(){
        return {
            data: 0, //记录每次点击按钮的值
            num:185, //每次需要滚动的距离
            distance: 0, //距离
            synthesisCompose:['B','A','S','SS','SSR'],//合成大赏数组
            compositeData:'',//当前大赏的数据  用于展示
            syntheticGameData:'',//当前拥有大赏的数据  用于合成 或者领取
            nowCompositeNum:'0',//已有当前大赏数
            
        }
    },
    mounted(){
        this.init()
         // 合成成功后接收eventBus 重新获取我的已有赏数
        EventBus.$on("syntheticGameGetData", () => {
            this.$nextTick(()=>{
                this.init()
            })
        });
    },
    methods:{
        //初始化
        init(){
            let _this = this;
            // 合成大赏-数据接口请求
            if(!!_this.$store.getters.getStorage){
                _this.$fetch("/lucky/bag/card/composite",{'type': _this.synthesisCompose.indexOf(_this.synthesisLevel) + 1}).then(response => {
                    //成功获取数据
                    if(response.flag){
                        _this.nowCompositeNum = response.code
                        _this.syntheticGameData = response.data.cards//当前拥有大赏的数据  用于合成 或者领取
                        _this.compositeData = response.data.prizes//当前大赏的数据  用于展示
                        
                    }else{
                        console.log('没有合成大赏-数据接口请求')
                    }
                });
            }
        },
        // 左右切换按钮
        btnsClick(types){
            if(types == 'left'){
                this.data = this.data - 1 < 0 ? 0 : this.data - 1;
                this.distance = this.data * this.num * -1;
            }else if(types == 'right'){
                if (this.data >= this.compositeData.length - 4) {
                    // this.data = 0;
                    // this.distance = 0;
                } else {
                    if(this.data + 1 >= this.compositeData.length){
                        this.data = this.compositeData.length
                    }else if(this.data + 1 < this.compositeData.length){
                        if(this.data + 1 >= this.compositeData.length - 4){
                            this.data = this.data + 1
                        }else{
                            this.data = this.data + 1
                        }

                    }
                    this.distance = this.data * this.num * -1;
                }
            }
        },
        //立即合成按钮 需要大赏等级 弹出不同合成等级
        synthesisBtn(){
            this.$emit('change',true,{'syntheticLevel':this.synthesisLevel,'syntheticGameData':this.syntheticGameData})
        }
    }
}
</script>

<style lang="scss" scoped>
// 大盒子
.synthesisViewMain{
    width: 980px;
    height: 191px; 
    position: relative;
    // 左边大赏等级
    .leftGrade{
        width: 134px;
        height: 134px;
        position: absolute;
        left: 0;
        top: 29px;
        z-index: 3;
    }
    // 右边背景
    .rightView{
        width: 910px;
        height: 191px;
        overflow: hidden;
        position: absolute;
        right: 0;
        // 右边内容
        .righrContent{
            width: 800px;
            height: 178px;
            float: right;
            margin: 6px 12px 7px 0;
            // 头部
            .titlesBox{
                width: 100%;
                height: 20px;
                margin-top: 7px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                // 头部文案
                .titlsTexts{
                    width: 100px;
                    height: 20px;
                    font-weight: 700;
                    color: rgba(93,0,0,1);
                }
                // 头部按钮
                .btns{
                    width: 56px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-right: 6px;
                    .leftBtns{
                        width: 27px;
                        height: 16px;
                        cursor: pointer;
                    }
                    .rightBtns{
                        width: 27px;
                        height: 16px;
                        cursor: pointer;
                    }
                }
            }
            //中间内容部分
            .middles{
                width: 100%;
                height: 76px;
                margin: 5px 0 11px;
                overflow: hidden;
                .itemsContent{
                    // width: 100%;
                    height:100%;
                    display: flex;
                    transition: all 0.2s linear;
                }
            }
            //底部
            .footers{
                width: 100%;
                height: 44px;
                display: flex;
                align-items: center;
                .haveNum{
                    min-width: 106px;
                    height: 31px;
                    margin-right: 17px;
                    background-color: #ffcb81;
                    border: 1px solid #9d1616;
                    color: #9d1616;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 6px;
                    span{
                        font-weight: 900;
                        color: #e80303;
                    }
                }
                .explain{
                    width: 220px;
                    height: 20px;
                    font-weight: 700;
                    color: #9d1616;
                }
                // 立即合成按钮
                .synthesisBtn{
                    width: 156px;
                    height: 44px;
                    margin-left: 286px;
                }
            }
        }
    }
}
.curs{cursor: pointer;}
</style>