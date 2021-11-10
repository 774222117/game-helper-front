<template>
<!-- 说明  畅享版和独享版的特点-->
<div class="alertMain">
    <div class="alertContent playTogetherExplainModel_bg">
        <div class="closeBtn opc_hover" @click="cancel"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
        <div class="contentMain">
            <div class="content" :class="'transForm' + transForm ">
                <div class="cloudAccount cloudAccount1_bg">
                    <div class="title ft14 color_white_1">畅享版和独享版的特点是什么？</div>
                    <div class="iconTitle">
                        <div class="iconTitleBox iconTitleBoxSty1">
                            <div class="iconBox"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon> </div>
                            <div class="margin_left_8 ft14 ft_weight color_white_1">畅享版</div>
                        </div>
                        <div class="iconTitleBox iconTitleBoxSty2">
                            <div class="iconBox"><svg-icon iconClass='private' className='svg_icon'></svg-icon></div>
                            <div class="margin_left_8 ft14 ft_weight color_white_1">独享版</div>
                        </div>
                    </div>
                    <div class="title2 ft12 color_white_1">畅享版可以享受更高折扣！</div>
                </div>
                <div class="cloudAccount cloudAccount2_bg">
                    <div class="title ft14 color_white_1">畅享版和独享版的特点是什么？</div>
                    <div class="iconTitle">
                        <div class="iconTitleBox iconTitleBoxSty1">
                            <div class="iconBox"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon> </div>
                            <div class="margin_left_8 ft14 ft_weight color_white_1">畅享版</div>
                        </div>
                        <div class="iconTitleBox iconTitleBoxSty2">
                            <div class="iconBox"><svg-icon iconClass='private' className='svg_icon'></svg-icon></div>
                            <div class="margin_left_8 ft14 ft_weight color_white_1">独享版</div>
                        </div>
                    </div>
                    <div class="title2 ft12 color_white_1">为您的登录提供安全的云端加密功能！</div>
                </div>
                <div class="cloudAccount cloudAccount3_bg">
                    <div class="title ft14 color_white_1">畅享版和独享版的特点是什么？</div>
                    <div class="iconTitle">
                        <div class="iconTitleBox iconTitleBoxSty1">
                            <div class="iconBox"><svg-icon iconClass='replaceLogo' className='svg_icon'></svg-icon> </div>
                            <div class="margin_left_8 ft14 ft_weight color_white_1">畅享版</div>
                        </div>
                        <div class="iconTitleBox iconTitleBoxSty2">
                            <div class="iconBox"><svg-icon iconClass='private' className='svg_icon'></svg-icon></div>
                            <div class="margin_left_8 ft14 ft_weight color_white_1">独享版</div>
                        </div>
                    </div>
                    <div class="title2 ft12 color_white_1">享受独立存档不窜档，独享版更拥有云端存档功能！</div>
               
                </div>
                <div class="cloudAccount cloudAccount4_bg">
                    <div class="title ft14 color_white_1">畅享版和独享版的特点是什么？</div>
                    <div class="allInfo">
                        <div class="allInfoItems" v-for="item in itemsData">
                            <div class="allInfoLeft ft14 color_white_1">{{item.text}}</div>
                            
                            <div class="allInfoMiddle ft18 color_white_1">
                                <div class="allInfoMiddle ft18 color_white_1" v-if="item.public == '畅享版'">{{item.public}}</div>
                                <div class="iconBox" v-else><svg-icon :iconClass="item.public == 1 ?'checks':'unchecks'" className='svg_icon'></svg-icon></div>
                            </div>
                            <div class="allInfoRight ft18 color_white_1">
                                <div class="allInfoRight ft18 color_white_1" v-if="item.private == '独享版'">{{item.private}}</div>
                                <div class="iconBox" v-else><svg-icon :iconClass="item.private == 1 ?'checks':'unchecks'" className='svg_icon'></svg-icon></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="progressBar">
            <div class="progressBarItem" :class="transForm == 0? 'avtive' : ''" @click="transFromFun(0)"></div>
            <div class="progressBarItem" :class="transForm == 1? 'avtive' : ''" @click="transFromFun(1)"></div>
            <div class="progressBarItem" :class="transForm == 2? 'avtive' : ''" @click="transFromFun(2)"></div>
            <div class="progressBarItem" :class="transForm == 3? 'avtive' : ''" @click="transFromFun(3)"></div>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.alertMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(0,0,0,0.8);
    .alertContent{
        width: 1080px;
        height: 600px;
        background-color: rgba(0,0,0,0.8);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        // 关闭按钮
        .closeBtn{
            width: 30px;
            height: 30px;
            cursor: pointer;
            float: right;
            margin: 20px 20px 18px 0;
            position: absolute;
            right: 0;
            z-index: 11;
        }
        .contentMain{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .content{
                width: 400%;
                height: 100%;
                transition: all 0.5s;
                .title{
                    width: 100%;
                    height: 25px;
                    line-height: 25px;
                    margin-top: 80px;
                    text-shadow:0px 20px 40px rgba(0,0,0,0.2);
                    text-align: center;
                }
                .title2{
                    width: 100%;
                    height: 25px;
                    line-height: 25px;
                    margin-top: 300px;
                    text-shadow:0px 20px 40px rgba(0,0,0,0.2);
                    text-align: center;
                }
                .iconTitle{
                    display: flex;
                    margin-top: 56px;
                    .iconTitleBox{
                        display: flex;
                    }
                    .iconTitleBoxSty1{
                        margin-left: 231px;
                    }
                    .iconTitleBoxSty2{
                        margin-left: 441px;
                    }
                    .iconBox{
                        width: 24px;
                        height: 24px;
                    }
                }
                .cloudAccount{
                    width: 25%;
                    height: 100%;
                    display: block;
                    float: left;
                    .allInfo{
                        width: 900px;
                        height: 353px;
                        margin: 42px auto 0;
                        .allInfoItems{
                            width: 100%;
                            height: 43px;
                            display: flex;
                            justify-content: space-between;
                            .allInfoLeft{
                                width: 200px;
                                height: 100%;
                                line-height: 43px;
                            }
                            .allInfoMiddle{
                                width: 70px;
                                height: 100%;
                                text-align: center;
                                line-height: 43px;
                                .iconBox{
                                    width: 16px;
                                    height: 16px;
                                    margin: 13px auto 0;
                                }
                            }
                            .allInfoRight{
                                width: 70px;
                                height: 100%;
                                text-align: center;
                                line-height: 43px;
                                .iconBox{
                                    width: 16px;
                                    height: 16px;
                                    margin: 13px auto 0;
                                }
                            }
                        }
                        
                    }
                }
            }
        }
        
        .progressBar{
            width: 100%;
            height: 5px;
            position: absolute;
            bottom: 0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .progressBarItem{
                width:40px;
                height:5px;
                background-color:rgba(42,44,52,1);
                border-radius:3px;
                margin-right: 0.2rem;
                cursor: pointer;
            }
            .progressBarItem.avtive{
                background-color:rgba(255,0,54,1);
            }
        }
    }
}
.cloudAccount4_bg{}
.transForm0{transform: translateX(0);}
.transForm1{transform: translateX(-25%);}
.transForm2{transform: translateX(-50%);}
.transForm3{transform: translateX(-75%);}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'alertModelPlayTogetherExplain',
  components:{JumpTo},
  data(){
      return {
        transForm:0,
        itemsData:[
            {'text':'','public':'畅享版','private':'独享版'},
            {'text':'官方正版游戏','public':'1','private':'1'},
            {'text':'随时随地游玩','public':'1','private':'1'},
            {'text':'游戏永久可玩','public':'1','private':'1'},
            {'text':'本地存档','public':'1','private':'1'},
            {'text':'云端存档','public':'0','private':'1'},
            {'text':'不能玩可退','public':'1','private':'1'},
            {'text':'24H退款','public':'1','private':'0'},
        ]
      }
  },
  created(){
      
  },
  mounted(){
    
  },
  methods:{
    // 取消关闭按钮
    cancel(){
        this.$emit('changeAlertModelPlayTogetherExplain',  false) 
    },
    // 确定按钮
    confirm(){
       
    },
    transFromFun(data){
        this.transForm = data
    }
    
  }
}
</script>
