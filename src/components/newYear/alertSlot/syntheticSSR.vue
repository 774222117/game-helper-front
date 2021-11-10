<template>
<!-- 合成SSR赏 -->
<div class="freeGoldCoinsMain">
   <alertTitles titles='合成SSR赏' titles2="请勾选3款游戏合成，合成后将不可领取到游戏库"></alertTitles>
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
       <div class="nextStep nextStep_bg" @click="nextStep">
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
        .nextStep {
            width: 248px;
            height: 71px;
            cursor: pointer;
            position: relative;
            .checkNum {
                width: 27px;
                height: 34px;
                color: #5C421A;
                position: absolute;
                top: 19px;
                left: 153px;
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

export default {
  name: 'syntheticSSR',
  components:{alertTitles,gameItemH},
  inject:['ancestors'],
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
    // 下一步
    nextStep(){
        let _this = this;
        //判断是否选择了三个游戏
        var querys={
                'type':['','B','A','S','SS','SSR'].indexOf(_this.$attrs.syntheticLevel),
                'cardId':_this.getCardIdString()
            }
        if(_this.saveGame.length == 3){
            var querys={
                'type':['','B','A','S','SS','SSR'].indexOf(_this.$attrs.syntheticLevel),
                'cardId':_this.getCardIdString()
            }
            _this.ancestors.ssrQueryData = querys.cardId
            _this.$emit('change',true,{ 'changeSolt':'choosePrize'})
        }else{
            // console.log('请选择三款游戏')
            _this.failAlert = true;
            if(_this.failAlert){
                setTimeout(() => {
                    _this.failAlert = false
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
