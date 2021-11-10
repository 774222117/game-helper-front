<template>
<!-- 选择奖品 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='选择奖品' titles2="合成游戏后将不可领取到游戏库"></alertTitles>
   <!-- 合成游戏框 -->
   <div class="freeGoldCoin">
       <!-- 游戏展示区 -->
       <div class="gameItem">
           <!-- 左按钮 -->
           <div class="leftBtnBox">
               <div class="leftBtn leftBtn_bg"></div>
           </div>
           <!-- 中间展示区 -->
           <div class="centerGameBox">
              <!-- 存放游戏框 -->
              <div class="centerShow" :style="{ transform: 'translateX(' + distance + 'px)' }">
                <!-- 显示并包裹gameItemH -->
                <div class="ItemBox" v-for="(num,indexs) in Math.ceil(compositeData.length / 6)">
                    <div class="gameItemHBox" v-for="(data,index) in compositeData"  
                    @click="gameChecked(data,index)">
                        <div class="gameItemH" :class="saveGame.includes(index) ? 'isChecked' : ''">
                            <gameItemH :item="data" />
                        </div>
                    </div>
                </div>
              </div>
           </div>
           <!-- 右按钮 -->
           <div class="rightBtnBox">
               <div class="rightBtn rightBtn_bg"></div>
           </div>
       </div>
       <!-- 分页器 -->
       <div class="pager">
           <div class="pointBox">
               <div class="point" v-for="(page,index) in (Math.ceil(compositeData.length / 6))" :class="index == data ? 'isCheck' : 'unCheck'" @click="pointChange(index)"></div>
           </div>
       </div>
   </div>
   <!-- 底部按钮-->
   <div class="footerBtn">
       <div class="syntheticGame syntheticGame_bg" @click="syntheticGame">
           <div class="checkNum ft24">({{saveGame.length}})</div>
       </div>
   </div>
</div>
</template>
<style lang="scss" scoped>
.freeGoldCoinsMain{
    width: 691px;
    height: 426px;
    padding-top: 40px;
    position: relative;
    .freeGoldCoin{
        width: 639px;
        height: 222px;
        margin: 0 auto;
        margin-top: 35px;
        .gameItem {
            width: 639px;
            height: 173px;
            display: flex;
            .leftBtnBox {
                width: 43px;
                height: 173px;
                position: absolute;
                .leftBtn {
                    width: 25px;
                    height: 40px;
                    margin-top: 73px;
                    cursor: pointer;
                }
            }
            .centerGameBox {
               width:538px;
               height: 202px;
               position: absolute;
               overflow: hidden;
               left: 76px;
            // 中间游戏框
                .centerShow {
                    min-width: 511px;
                    height: 200px;
                    display: flex;
                    transition: all 0.5s linear;
                    position: absolute;
                    // 显示并包裹gameItemH
                    .ItemBox {
                        width: 536px;
                        height: 200px;
                        display: flex;
                        flex-wrap: wrap;
                            .gameItemHBox {
                            width: 168px;
                            height: 80px;
                            // margin-top: 12px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 5px;
                            .gameItemH {
                                width: 168px;
                                height: 80px;
                            }
                        }
                    }
                }
            }
            // 右边按钮
            .rightBtnBox {
                min-width: 52px;
                height: 173px;
                position: absolute;
                right: 18px;
                .rightBtn {
                    width: 25px;
                    height: 40px;
                    margin: 73px 0 0 19px;
                    cursor: pointer;
                }
            }
        }
        // 分页器
        .pager {
            width: 639px;
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: center;
            .pointBox {
                display: flex;
                .point {
                    width: 15px;
                    height: 3px;
                    background-color: #FFC850;
                    border-radius: 2px;
                    margin-right: 6px;
                }
            }
        }
    }
    .footerBtn{
        width: 691px;
        height: 96px;
        display: flex;
        align-items: center;
        justify-content: center;
        .syntheticGame {
            width: 248px;
            height: 71px;
            cursor: pointer;
            position: relative;
            .checkNum {
                width: 27px;
                height: 34px;
                color: #5C421A;
                position: absolute;
                top: 16px;
                left: 138px;
            }
        }
    }
}
.isChecked {border:3px solid #FFC952;}
// 选中
.isCheck{background-color: #fffeea;}
// 未选中
.unCheck{background-color: #FFC850;}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles';
import gameItemH from '@/components/newYear/gameItem/gameItemH'; //单个游戏展示
import { EventBus } from "@/utils/eventBus.js";
export default {
  name: 'choosePrize',
  components:{alertTitles,gameItemH},
  data(){
    return {
        distance:0,//移动的距离
        num:534,//每个游戏移动的距离
        data:0,//记录每次鼠标点击按钮的值
        compositeData:[],//游戏的数据
        isCheck:0,//被选中的游戏个数
        saveGame:[],//保存被选中的游戏
        receiveCardId:'',//接收前面选中的数据
      }
  },
  inject:['ancestors'],
  created(){
    
  },
  mounted(){
    this.init()
    
  },
  methods:{
    init(){
        let _this = this;
        // 合成大赏-数据接口请求 选择SSR游戏
        _this.$fetch("/lucky/bag/card/composite",{'type': 5}).then(response => {
            //成功获取数据
            if(response.flag){
                _this.compositeData = response.data.prizes//当前大赏的数据  用于展示
            }else{
                console.log('没有合成大赏-数据接口请求')
            }
        });
    },
    // 合成游戏
    syntheticGame(){
        let _this = this;
        //判断是否选择了一个游戏
        if(_this.saveGame.length == 1){
            var querys={
                'type':5,
                'cardId':_this.ancestors.ssrQueryData,
                'sssprizeId':_this.getCardIdString()
            }
            if(querys.type == 5){
                _this.$fetch("/lucky/bag/composite",querys).then(response => {
                    if(response.flag){
                        _this.ancestors.synthesisItemGameData = response.data
                        // 合成成功后调用eventBus给合成大赏组件重新获取我的已有赏数
                        EventBus.$emit('syntheticGameGetData')
                    }else{
                        console.log('没有合成游戏 合成游戏失败')
                    }
                    _this.$emit('change',true,{ 'changeSolt':'synthesisItemGame'})
                })
            }
        }else{
            // console.log('请选择一款游戏')
        }
    },
    //获取cardIs的序列化方法
    getCardIdString(){
        let cardIds=''
        this.saveGame.forEach((index)=>{
            cardIds += this.compositeData[index].prizeId +','
        })
        return cardIds.substring(0, cardIds.lastIndexOf(','))
    },
    // 左边按钮
    leftBtn(){
        if(this.data > 0){
            this.data -= 1
            this.distance = this.data * this.num * -1
        }
    },
    //右边按钮
    rightBtn(){
        if(this.data < Math.ceil((this.compositeData.length / 6)) -1){
            this.data += 1
            this.distance = this.data * this.num * -1
        }
    },
    // 点击分页器切换游戏
    pointChange(index){
        this.data = index
        this.distance = index * this.num * -1
    },
    // 被选中合成的游戏
    gameChecked(data,index){
        if(this.saveGame.includes(index) && this.saveGame.length == 1){
            this.saveGame = []
        }else if(this.saveGame.length == 0 && !this.saveGame.includes(index)){
            this.saveGame.push(index)
        }
    }
  }
}

</script>
