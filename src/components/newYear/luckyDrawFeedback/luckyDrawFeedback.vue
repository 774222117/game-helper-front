<template>
<!-- 抽奖回馈展示组件-->
<div class="luckyDrawFeedbackMain">
    <div class="middleLine">
        <div class="lines"></div>
        <div class="spot" v-for="(item,index) in 40">
            <div class="lightSpot lightSpot_bg" v-if="index+1 == nowLuckDrawNum"></div>
            <div class="spotTypes" 
            :class="[3,10,20,30,40].includes(index + 1) ?'circular_bg': [5,15,25,35].includes(index + 1)?'circularSmall':''">
                <!-- 展示的领取金币 -->
                <div :class="[3,20,40].includes(index + 1) ?`luckyDrawTop luckDraw_${index + 1}_bg`:''" :style="{width:(index + 1== 40?'120px':''),height:(index + 1== 40?'120px':''),left:(index + 1== 40?'-52px':'-43px'),top:(index + 1== 40?'-122px':'-113px')}"></div>
                <div :class="[10,30].includes(index + 1) ?`luckyDrawDown luckDraw_${index + 1}_bg`:''"></div>
                <!-- 立即领取按钮 -->
                <template v-for="(data,indexs) in luckyBagFeedback">
                    <div v-if="data.state == 1 && data.times == index+1 && nowLuckDrawNum >= index+1" :class="[3,20,40].includes(index + 1) ?'getNowBtnsBtmDown curs getNowBtnsDown_bg':''" @click="luckyDrawFeedback(data)"></div>
                    <div v-if="data.state == 1 && data.times == index+1 && nowLuckDrawNum >= index+1" :class="[10,30].includes(index + 1) ?'getNowBtnsBtmTop curs getNowBtnsTop_bg':''" @click="luckyDrawFeedback(data)"></div>
                </template>
                
            </div>
        </div>
        
    </div>
</div>
</template>

<script>
import { EventBus } from "@/utils/eventBus.js";
export default {
    name:'luckyDrawFeedback',
    components:{},
    inject:['ancestors'],
    data(){
        return {
            nowLuckDrawNum:1,//当前抽奖次数默认1
            luckyBagFeedback:'',//抽奖次数回馈数据
        }
    },
    mounted(){
        this.init()
         // 领取40次大赏后初始化数据
        EventBus.$on("getDrawFeedInit", () => {
            this.$nextTick(()=>{
                this.init()
            })
        });
        
    },
    methods:{
       //初始化
        init(){
            let _this = this;
            // 抽奖次数回馈
            if(!!_this.$store.getters.getStorage){
                _this.$fetch("/lucky/bag/feedback").then(response => {
                    if(response.flag){
                        _this.luckyBagFeedback = response.data 
                        response.code >40? _this.nowLuckDrawNum = 40 : response.code == 0? _this.nowLuckDrawNum =1: _this.nowLuckDrawNum = response.code
                    }else{
                        console.log('没有抽奖次数回馈')
                    }
                });
            }
            
        },
        //领取抽奖次数回馈
        luckyDrawFeedback(data){
            let _this = this;
            if(data.times == 40){
                _this.$emit('change',true,{ 'changeSolt':'confirmToReceiveLuckyDrawFeedback'})
            }else{
                _this.$fetch("/lucky/bag/feedback/draw",{'drawId':data.drawId}).then(response => {
                    //领取成功后出现领取金币框
                    if(response.flag){
                        _this.ancestors.freeGoldPic = data
                        _this.$emit('change',true,{ 'changeSolt':'freeGoldCoins'})
                        // 重新初始化一次领取回馈
                        _this.init()
                        // 领取金币成功之后，重新获取我的金币
                        _this.ancestors.myGoldLucky()
                    }else{
                        console.log('领取抽奖次数回馈失败')
                        
                    }
                });
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
.luckyDrawFeedbackMain{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .lines{
        width: 100%;
        height: 2px;
        position: absolute;
        left: 0;
        top: 8px;
        background-color: rgba(253,198,49,1);
        z-index: 1;
    }
    .middleLine{
        width: 980px;
        height: 18px;
        position: relative;
        display: flex;
        align-items: center;
        .spot{
            width: 15px;
            height: 15px;
            margin-right: 10px;
            position: relative;
            .spotTypes{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                position: relative;
                .luckyDrawTop{
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    top: -113px;
                    left: -43px;
                    z-index: 6;
                }
                .luckyDrawDown{
                    width: 100px;
                    height: 100px;
                    position: absolute;
                    top: 28px;
                    left: -43px;
                    z-index: 6;
                }
                .getNowBtnsBtmDown{
                    width: 76px;
                    height: 34px;
                    position: absolute;
                    top: 23px;
                    left: -30px;
                    z-index: 6;
                }
                .getNowBtnsBtmTop{
                    width: 76px;
                    height: 34px;
                    position: absolute;
                    top: -43px;
                    left: -32px;
                    z-index: 6;
                }
            }
            .circularSmall{
                width: 15px;
                height: 15px;
                overflow: hidden;
            }
            .circularSmall:before{
                content: '';
                display: block;
                width: 7px;
                height: 7px;
                background-color: rgba(253,198,49,1);
                border-radius: 50%;
                margin: 4px auto;
            }
        }
        .spot:nth-last-of-type(1){
            margin-right: 0px;
        }
        .lightSpot{
            width: 245px;
            height: 102px;
            position: absolute;
            left: -54px;
            top: -44px;
            z-index: 5;
        }
    }
    
}

.curs{cursor: pointer;}
</style>