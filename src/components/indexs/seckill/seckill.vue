<template>
  <!-- 秒杀 -->
  <div class="commentMain" v-if="seckillData" @mouseenter="hoverItemsFun(true)" @mouseleave="hoverItemsFun(false)">
      <div class="left">
          <div class="imgBox">
              <img class="imgBlock" :src="seckillData.data.basicInfo.libraryCapsule" :onerror="errorImage" alt="">
          </div>
      </div>
      <div class="right">
          <div class="rightContent">
            <div class="times bubble3_bg"> 
                <div class="ft12 color_white_1 margin_right_4">距结束</div>
                <div class="ft14 color_white_1 font_weight">{{dataTime.date_m+':'+dataTime.date_s+':'+dataTime.date_ms}}</div>
            </div>
            <div class="gameName ft16 color_white_1 font_weight textOver">{{seckillData.data.basicInfo.chinaName == ''? seckillData.data.basicInfo.englishName:seckillData.data.basicInfo.chinaName}}</div>
            <div class="gameLabel ft12 color_white_1 font_weight">限量秒杀</div>
            <div class="gameNum ft12 color_white_1 font_weight">仅{{seckillData.data.total}}件，还剩 <span class="ft16">{{seckillData.data.canUse}}</span>件</div>
            <div class="gameSpeed">
                <div class="speedItems" :style="{width:Math.floor((seckillData.data.total - seckillData.data.canUse)/seckillData.data.total*100)+'%'}"></div>
                <!-- <div class="animeBox"></div> -->
            </div>
            <div class="gamePrice">
                <div class="leftPrice">
                    <div class="text1 ft24 color_white_1 font_weight"> <span class="ft16">￥</span> {{seckillData.data.basicInfo.lowPrice}}</div>
                    <div class="ft14 color_white_08 textDecor">￥{{seckillData.data.basicInfo.steamPrce}}</div>
                </div>
                <div class="rightBuyBtn" @click="buyBtn">
                    <div class="texts ft20 color_white_1 font_weight">立即购买</div>
                    <div class="discount ft14 color4 font_weight bubble1_bg">{{seckillData.data.basicInfo.lowRatio}}折</div>
                </div>
            </div>
          </div>
      </div>
        <div class="hoverMain indexItemHoverBg_bg" v-if="hoverItems"  v-rights="winObj" >
            <div class="contents">
                <div class="contentItems">
                    <div class="gameName ft16 color_white_1 font_weight">{{seckillData.data.basicInfo.chinaName == '' ? seckillData.data.basicInfo.englishName : seckillData.data.basicInfo.chinaName}}</div>
                    <div class="itemLabels">
                        <template  v-for="(i,index) in seckillData.data.basicInfo.attributes.category3">
                            <div class="labels" v-if="index < 3">{{i.title}}</div>
                        </template>
                    </div>
                    <div class="videoContents">
                        <video class="imgBlock" v-if="seckillData.data.basicInfo.sixVideo" autoplay muted loop :src="seckillData.data.basicInfo.sixVideo"></video>
                        <img v-else class="imgBlock" :src="seckillData.data.basicInfo.image" alt="">
                    </div>
                    <div class="describe ft12 color_white_06 textOver3" v-html="seckillData.data.basicInfo.intro"></div>
                </div>
            </div>
        </div>
        <seckillOrders :allOrderData="allOrderData" v-if="displaySeckillOrder" @change="displayAllOrderFun" />
        <alertSeckill :dataType="dataType" :times="dataTime.date_m" v-if="displaySeckill" @change="displaySeckillFun" />
        
  </div>
</template>

<script>
import alertSeckill from '@/components/indexs/seckill/alertSeckill' //秒杀弹框 等待下一轮等
import seckillOrders from '@/components/indexs/seckill/seckillOrders' //秒杀订单弹框
import loading from '@/components/Loading/loading'  //加载中
import JumpTo from '@/utils/jumpTo'
export default {
  name: 'seckill',
  inject:['reload','openRegister'],
  props: [],
  components:{loading,alertSeckill,seckillOrders},
  data(){
      return {
        displaySeckill:false,//是否显示秒杀弹框
        displaySeckillOrder:false,//是否显示秒杀订单弹框
        dataType:0,//秒杀弹框的类型
        seckillData:'', //秒杀数据
        allOrderData:'',//订单所需数据
        endTime:'',
        dataTime:{
            date_d:'',
            date_h:'',
            date_m:'00',
            date_s:'00',
            date_ms:'00',
        },
        hoverItems:false,
        timerSeckill:null,
        getData:true,
        winObj:{
            ww: document.documentElement.offsetWidth,
            wh: document.documentElement.offsetHeight,
            dw: 303,
            dh: 341
        },
        sendAjax:true,
        errorImage:"this.src='"+require('../../../assets/image/register/errorImage.png')+"'"
      }
  },
  mounted(){
    this.inits()
  },
  methods:{
    inits(){
        let _this = this;
        // 秒杀游戏
        if(_this.getData){
            _this.getData = false
            _this.sendAjax = false
            _this.$fetch("/seckill/killGame", _this.gameListData).then(response => {
                if(response.flag){
                    _this.seckillData = response;
                    _this.endTime = _this.seckillData.code
                    _this.sendAjax = true
                    _this.countTime()
                }else{
                    console.log('获取秒杀游戏失败')
                }
            });
        }   
    },
    // 立即购买
    buyBtn(){
        //判断登录
        if(!!this.$store.getters.getStorage){
            // 是否为黑名单用户
            if(this.$store.getters.getBlackList.flag && this.$store.getters.getBlackList.data.isOpen == 1){
                this.dataType = 3
                this.displaySeckillFun(true) 
                return
            }
            // 总数减去剩余数
            if( this.seckillData.data.total - this.seckillData.data.canUse >= 0 &&  this.seckillData.flag){
                // 订单所需数据 打开订单 
                this.allOrderData={
                    'appId':this.seckillData.data.basicInfo.appId,
                    'payType':2,
                    'channelId': this.$store.getters.getChannelIdFun,
                    'balanceType':0,
                    'creditType':0,
                    'model': 2,
                    'englishName': this.seckillData.data.basicInfo.englishName,
                    'chinaName': this.seckillData.data.basicInfo.chinaName,
                    'ratio':this.seckillData.data.basicInfo.ratio,
                    'price':this.seckillData.data.basicInfo.price,
                    'steamPrce':this.seckillData.data.basicInfo.steamPrce,
                }
                // 显示全部订单
                this.displaySeckillOrder = true
            }else{
                this.dataType = 2
                this.displaySeckillFun(true) 
            }
            
        }else{
            this.openRegister(true) 
        }
    },
    // 接收弹框的消息
    displaySeckillFun(data){
        this.getData = true
        this.inits()
        this.displaySeckill = data
    },
    // 接收秒杀订单弹框的消息
    displayAllOrderFun(data,num){
        this.getData = true
        this.inits()
        // 秒杀订单重复购买
        if(num == 3){
            this.dataType = 3
            this.displaySeckillFun(true)
        }
        if(num == 4){
            this.dataType = 2
            this.displaySeckillFun(true)
        }
        // 支付成功
        if(num == 0){
            this.dataType = 0
            this.displaySeckillFun(true)
        }
        this.displaySeckillOrder = data
    },
    // 优惠倒计时
    countTime() {
        // var date = new Date()
        var now = new Date().getTime()
        var end = this.endTime// 在data中定义的,后台拿到的结束时间戳
        var leftTime = end - now //时间差
        var d, h, m, s, ms
        if (leftTime > 100) {
            d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
            h = Math.floor(((leftTime / 1000 / 60 / 60) % 24) + 24 * d)
            m = Math.floor((leftTime / 1000 / 60) % 60)
            s = Math.floor((leftTime / 1000) % 60)
            ms = Math.floor(leftTime % 1000 / 100)
            if (ms < 10) {
            ms = ms
            }
            if (s < 10) {
            s = '0' + s
            }
            if (m < 10) {
            m = '0' + m
            }
            // if(h < 10) {
            h =   h
            // }

                //将倒计时赋值到div中
            // this.dataTime.date_d = d  //这里是渲染的天数
            this.dataTime.date_h = h  //这里是渲染的小时
            this.dataTime.date_m = m  //这里是渲染的分钟
            this.dataTime.date_s = s  //这里是渲染的秒数
            this.dataTime.date_ms = ms  //这里是渲染的毫秒
            //递归每秒调用countTime方法，显示动态时间效果
            this.timerSeckill = setTimeout(this.countTime, 50)
            
        } else {
            this.dataTime.date_h = '00' 
            this.dataTime.date_m = '00' 
            this.dataTime.date_s = '00'  
            this.dataTime.date_ms = '00'
            this.timerSeckill = null
            // this.countTime = null
            this.getData = true
            console.log('已截止')
            // 重新初始化
            if(this.sendAjax){this.inits()}
        }
    },
    hoverItemsFun(data){
        this.hoverItems = data
    }
  },
  directives:{
    'rights':{
      inserted:function(el,binding){
        var elObj = el.getBoundingClientRect();
        if(elObj.right - binding.value.ww > 0){
            el.style.right = ( elObj.right - binding.value.ww ) - elObj.width  +'px'
        }
        if(elObj.bottom - binding.value.wh > 0){
            el.style.top = ( binding.value.wh - elObj.bottom )  +'px'
        }
      }
    },
    'lefts':{
      inserted:function(el,binding){
        var elObj = el.getBoundingClientRect();
        if(elObj.left - binding.value.ww > 0){
            el.style.lefts = ( elObj.lefts - binding.value.ww ) - elObj.width  +'px'
        }
        if(elObj.bottom - binding.value.wh > 0){
            el.style.top = ( binding.value.wh - elObj.bottom )  +'px'
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.commentMain{
    width: 100%;
    height: 100%;
    background: #051824;
    box-shadow: 0px 4px 8px 0px rgba(4, 18, 27, 0.16), 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    position: relative;
    // 左边
    .left{
        width: 145px;
        height: 100%;
        background-color: aquamarine;
        .imgBox{
            width: 100%;
            height: 100%;
            background-color: brown;
            .imgBlock{width: 100%;height: 100%;display: block}
        }
    }
    // 右边
    .right{
        width: 285px;
        height: 100%;
        margin-left: 17px;
        .rightContent{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .times{
                width: 123px;
                height: 27px;
                align-self: flex-end;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .gameName{
                width: 100%;
                height: 22px;
                line-height: 22px;
                margin-bottom: 9px;
            }
            .gameLabel{
                width: fit-content;
                padding: 2px 6px;
                background: rgba(228, 50, 28, 0.49);
                border-radius: 4px;
                // border: 1px solid #FF3100;
                margin-bottom: 12px;
            }
            .gameNum{
                margin-bottom: 6px;
            }
            .gameSpeed{
                width: 164px;
                height: 11px;
                background: rgba(189, 229, 255, 0.11);
                border-radius: 5px;
                margin-bottom: 20px;
                position: relative;
                .speedItems{
                    width: 0%;
                    height: 100%;
                    border-radius: 5px;
                    background: linear-gradient(0deg, rgba(247, 159, 74, 1) 100%, rgba(202, 68, 29, 1) 100%);
                    transition: all 0.3s linear;
                }
                .animeBox{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 10%;
                    height: 100%;
                    border-radius: 5px;
                    background: rgba(255, 255, 255, 1);
                    animation: rightArr 0.8s ease-in-out infinite;
                }
                // @keyframes rightArr {
                //     0%{transform: translateX(0%);}
                //     100%{transform: translateX(1000%);}
                // }
            }
            .gamePrice{
                width: 268px;
                height: 48px;
                background: linear-gradient(0deg, rgba(52, 171, 220, 1) 100%, rgba(54, 124, 206, 1) 100%);
                display: flex;
                align-items: center;
                border-radius: 4px;
                .leftPrice{
                    width: 150px;
                    height: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    .text1{
                        display: flex;
                        align-items: baseline;
                    }
                }
                .rightBuyBtn::before{
                    content: '';
                    width:1px;
                    height: 35px;
                    background-color: rgba(255, 255, 255, 0.4);
                    position: absolute;
                    left: 0;
                    top: 6px;
                }
                .rightBuyBtn{
                    width: 117px;
                    height: 100%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .discount{
                        width: 57px;
                        height: 36px;
                        position: absolute;
                        top: -27px;
                        right: 6px;
                        text-align: center;
                        line-height: 36px;
                    }
                }
                
            }
        }
    }
    // 划上显示的东西
    .hoverMain{
        width: 303px;
        height: 341px;
        position: absolute;
        right: -303px;
        // left: 0;
        top: -60px;
        z-index: 19;
        .contents{
            width: 100%;
            height: 100%;
            padding-top: 1px;
            .contentItems{
                width: 249px;
                height: 275px;
                margin: 0 auto;
                margin-top: 26px;
                .gameName{margin-bottom: 9px;}
                .itemLabels{
                    width: 100%;
                    height: 20px;
                    display: flex;
                    margin-bottom: 14px;
                    .labels{
                        line-height: 16px;
                        padding: 2px 4px;
                        font-size: 12px;
                        color: #FFFFFF;
                        // background: rgba(0, 0, 0, 0.2);
                        background: rgba(225, 245, 255, 0.1);
                        border-radius: 2px;
                        margin-right: 9px;
                    }
                }
                .videoContents{
                    width: 100%;
                    height: 140px;
                    margin-bottom: 16px;
                    .imgBlcok{width: 100%;height: 100%;display: block}
                }
                .describe{
                    width: 100%;
                    height: 54px;
                    line-height: 18px;
                    letter-spacing: 1px;
                }
            }
        }
    }
}    
</style>
