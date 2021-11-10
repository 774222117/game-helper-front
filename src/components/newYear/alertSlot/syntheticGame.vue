<template>
<!-- 合成游戏 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='合成游戏' titles2="请勾选3款游戏合成，合成后将不可领取到游戏库"></alertTitles>
   <!-- 合成游戏框 -->
   <div class="freeGoldCoin">
       <!-- 游戏展示区 -->
       <div class="gameItem">
           <!-- 左按钮 -->
           <div class="leftBtnBox">
               <div class="leftBtn leftBtn_bg" @click="leftBtn"></div>
           </div>
           <!-- 中间展示区 -->
           <div class="centerGameBox">
              <!-- 存放游戏框 -->
              <div class="centerShow" :style="{ transform: 'translateX(' + distance + 'px)' }">
                <!-- 显示并包裹gameItemH -->
                <div class="ItemBox" v-for="(num,indexs) in Math.ceil(itemGame.length / 6)">
                    <div class="gameItemHBox" v-for="(data,index) in itemGame" 
                    v-if="index >= 6*indexs && index < (indexs + 1)*6" 
                    @click="gameChecked(data,index)">
                        <!-- 单个游戏框 -->
                        <div class="gameItemH" :class="saveGame.includes(index) ? 'isChecked' : ''">
                            <gameItemH :item="data" />
                        </div>
                    </div>
                </div>
              </div>
           </div>
           <!-- 合成失败弹窗 -->
           <div class="failAlert" v-if="failAlert">
               <div class="tips ft16">请选中3款游戏合成</div>
           </div>
           <!-- 右按钮 -->
           <div class="rightBtnBox">
               <div class="rightBtn rightBtn_bg" @click="rightBtn"></div>
           </div>
       </div>
       <!-- 分页器 -->
       <div class="pager">
           <div class="pointBox">
               <div class="point" v-for="(page,index) in (Math.ceil(itemGame.length / 6))" :class="index == data ? 'isCheck' : 'unCheck'" @click="pointChange(index)"></div>
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
            height: 173px;
            display: flex;
            // 左边按钮
            .leftBtnBox {
                width: 48px;
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
                            margin-top: 12px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin: 5px 5px;
                            .gameItemH {
                                width: 168px;
                                height: 80px;
                            }
                        }
                    }
                }
            }
            // 合成失败弹窗
            .failAlert {
                width: 240px;
                height: 78px;
                position: absolute;
                background-color: rgba(6,6,6,0.84);
                border: 1px solid #FFC850;
                box-sizing: border-box;
                left: 224px;
                top: 192px;
                // 提示
                .tips {
                    min-width: 136px;
                    line-height: 78px;
                    color: #FFFFFF;
                    text-align: center;
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
            margin-top: 15px;
            .pointBox {
                display: flex;
                .point {
                    width: 15px;
                    height: 3px;
                    border-radius: 2px;
                    margin-right: 6px;
                    cursor: pointer;
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
.isCheck{background-color: #FAFFBD;}
// 未选中
.unCheck{background-color: #FFC850;}
</style>
<script>
import alertTitles from '@/components/newYear/alertTitles/alertTitles';
import gameItemH from '@/components/newYear/gameItem/gameItemH'; //单个游戏展示
import { EventBus } from "@/utils/eventBus.js";
export default {
  name: 'syntheticGame',
  components:{alertTitles,gameItemH},
  data(){
    return {
        distance:0,//移动的距离
        num:536,//每个游戏移动的距离
        data:0,//记录每次鼠标点击按钮的值
        itemGame:[],//游戏的数据
        isCheck:0,//被选中的游戏个数
        saveGame:[],//保存被选中的游戏
        failAlert:false,//合成数量不足提示弹窗
      }
  },
  inject:['ancestors'],
  created(){
      
  },
  mounted(){
      this.itemGame = this.$attrs.syntheticGameData
  },
  methods:{
    //获取cardIs的序列化方法
    getCardIdString(){
        let cardIds=''
        this.saveGame.forEach((index)=>{
            cardIds += this.itemGame[index].cardId +','
        })
        return cardIds.substring(0, cardIds.lastIndexOf(','))
    },
    // 合成游戏
    syntheticGame(){
        let _this = this;
        //判断是否选择了三个游戏
        if(_this.saveGame.length == 3){
            var querys={
                'type':['','B','A','S','SS','SSR'].indexOf(_this.$attrs.syntheticLevel),
                'cardId':_this.getCardIdString()
            }
            if(querys.type == 5){
                // console.log('合成ssr')
                _this.$emit('change',true,{ 'changeSolt':'syntheticSSR'})
            }else{
                _this.$fetch("/lucky/bag/composite",querys).then(response => {
                    if(response.flag){
                        _this.ancestors.synthesisItemGameData = response.data
                        // 合成成功后调用eventBus给合成大赏组件重新获取我的已有赏数
                        EventBus.$emit('syntheticGameGetData')
                        _this.$emit('change',true,{ 'changeSolt':'synthesisItemGame'})
                    }else{
                        console.log('没有合成游戏 合成游戏失败')
                    }
                })
            }
        }else{
            // alert('请选择三款游戏')
            // 合成数量不足提示定时器
            this.failAlert = true;
            if(this.failAlert){
                setTimeout(() => {
                    this.failAlert = false
                },1000)
            }
        }
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
        if(this.data < Math.ceil((this.itemGame.length / 6)) -1){
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
        if(this.saveGame.includes(index) && this.saveGame.length <= 3){
            this.saveGame.splice(this.saveGame.indexOf(index),1)
        }else if(this.saveGame.length < 3 && !this.saveGame.includes(index)){
            this.saveGame.push(index)
        }
    }
  }
}

</script>
