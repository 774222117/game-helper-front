<template>
<!-- 大盒子 -->
 <div class="activityMainBox">
   <!-- 中间适应盒子 -->
   <div class="activityMain activityMain_bg">
     <!-- 背景层盒子 -->
     <div class="activityBg">
       <!-- 内容盒子 -->
       <div class="activityContents">
         <!-- 头部标题 -->
         <div class="topTitle topTitle_bg"></div>
         <!-- 滚动游戏内容 -->
         <div class="rollGameContents">
          <swiper :options="swiperRecentlySold" ref="swiperRecentlySold">
            <swiper-slide  v-for="(item,index) in activityGameItemsData"  :key="index">
              <div class="items">
                <activityGameItems :activityGameItemsData="item"/>
              </div>
            </swiper-slide>
          </swiper>
         </div>
         <!-- 获取免费游戏按钮 -->
         <div class="getFreeBtn" :class="getFreeBtnData==0?'getFreeBtn_bg':'getFreeBtnNo_bg'" @click="getFreeBtn"></div>
         <!-- 购买用户轮询 -->
         <div class="buyUserPoll buyUserPoll_bg ft14 color_white_08 textOver" v-text="message"></div>
         <!-- 活动规则 -->
         <div class="activityRules activityRules_bg">
           <div class="activityRulesTextBox">
             <div class="activityRulesText ft16" v-for="i in activityRules" v-html="i"></div>
           </div>
           
         </div>
         <!-- 抽奖游戏 -->
         <div class="luckDraw luckDraw_bg">
           <div class="luckDrawContents">
             <div class="luckDrawContentsItem" v-for="i in luckDrawItemsDatas">
               <luckDrawItems :luckDrawItemsData="i" />
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   <newActivityAlertModel v-if="activityAlertModelIsShow" :activityType="activityAlertModelType" @change="activityAlertModelChange" />
 </div>
</template>

<script>
import JumpTo from '@/utils/jumpTo'
import activityGameItems from '@/components/activity/activityGameItems'
import luckDrawItems from '@/components/activity/luckDrawItems'
import newActivityAlertModel from '@/components/activity/newActivityAlertModel'
export default {
  components: {JumpTo,activityGameItems,luckDrawItems,newActivityAlertModel},
  inject:['openRegister'],
  data(){
    return {
      activityGameItemsData:{},  //上面轮询的游戏
      activityRules:[  //活动规则文案
      '1.本活动仅限新用户或未参与过活动的用户参加。活动商品为特殊电子商品，售出后正常情况下不可退换，敬请谅解。' ,    
      '2.用户可以抽出一款游戏免费领取到游戏库中。',
      '3.免费领取的游戏分为限时游玩和永久游玩两种类型，限时时长从点击领取到游戏库中那一刻开始计算。',
      '4.本轮活动获取的游戏均为畅享版游戏。畅享版游戏为游戏的永久使用权，在W4PLAY中可以一键启动游玩游戏，不是游戏账号、代充服务或游戏CDKEY。',
      '5.新人礼包全额返还活动：当用户购买了礼包后，支付金额将返还到您的余额中，购买全场游戏都可抵扣，但不可提现。'    
      ], 
      activityAlertModelIsShow:false,//弹框是否显示
      activityAlertModelType:0,//显示领取完成还是抽奖页面 0 没有抽奖 领取过  新的打开礼物页面
      getFreeBtnData:0, //按钮样式
      //中奖用户轮询
      message:"",
      timer:null, //在data上定义定时器timer，默认为null

      // 下面的25个
      luckDrawItemsDatas:{},
  
      swiperRecentlySold:{
				observer:true,
    			observeParents:true,
				lazy: true,
				autoplay:true,
				slidesPerView: 6,
				spaceBetween: 30,
			},
    }
  },
  activated(){
    this.init()
    this.show()
  },
  watch:{
    $route(to, from) {
      if(from.path == '/activityMain'){
        this.activityAlertModelIsShow = false,
        this.stop()
        //清除定时器  多清除两边 怕了
        clearInterval(this.timer)
        //清除定时器之后，需要重新将定时器置为null
        this.timer = null
      }
      // if(to.path == '/activityMain'){
      //   this.stop()
      //   //清除定时器  多清除两边 怕了
      //   clearInterval(this.timer)
      //   //清除定时器之后，需要重新将定时器置为null
      //   this.timer = null
      // }
    }
  },
  computed:{
   
  },
  methods:{
    init(){
      var _this = this;
      // 上面的滚动
      _this.$fetch('/people/activity/brief')
        .then((response) => {
           if(response.flag){
             _this.activityGameItemsData = response.data
          }else{
            console.log('上面的滚动，没有数据')
          }
         
        })
      //文字轮询
      _this.$fetch('/people/activity/receive')
        .then((response) => {
          if(response.flag){
            console.log(response.data.join(' '))
            _this.message = response.data.join(' 😍 😍 😍 ')
          }else{
            console.log('文字轮询，没有数据')
          }
          
        })
      //下面的数据
      _this.$fetch('/people/activity/forever')
        .then((response) => {
          if(response.flag){
            _this.luckDrawItemsDatas = response.data
          }else{
            console.log('下面的数据，没有数据')
          }
        })
      // 判断用户是否参与过活动
      if(!!this.$store.getters.getStorage){
        _this.$fetch('/people/activity/join')
        .then((response) => {
          this.getFreeBtnData = response.data
        })
      }
      if(!!this.$store.getters.getStorage){
        
      }else{
        if(!!this.openRegister){
          this.openRegister(true)
        }else{
          console.log('没得openRegister方法')
        }
      }
    },
    //获取免费游戏  打开礼物
    getFreeBtn(){
      if(!!this.$store.getters.getStorage){
        // 判断用户是否参与过活动
        this.$fetch('/people/activity/join')
          .then((response) => {
            if(response.flag){
              if(response.data == 0){
                this.activityAlertModelType = 0
                this.activityAlertModelIsShow = true
              }else{
                console.log(response.message)
              }
            }else{
              console.log('下面的数据，没有数据')
            }
            this.getFreeBtnData = response.data
          })
      }else{
        if(!!this.openRegister){
          this.openRegister(true)
        }else{
          console.log('没得openRegister方法')
        }
      }
      
    },
    // 接收弹框组件的参数
    activityAlertModelChange(data,n){
      this.activityAlertModelIsShow = data
      this.activityAlertModelType = n
    },
    backFun(){
        JumpTo(0)
    },
    show(){
        if(this.timer != null) return;
        this.timer = setInterval(() => {
            //获取到头的第一个字符
            let start = this.message.substring(0,1);
            //获取到后面的所有字符
            let end = this.message.substring(1);
            //重新拼接得到新的字符串，并赋值给this.message
            this.message = end + start;
        },300)
    },
    stop(){
        //清除定时器
        clearInterval(this.timer)
        //清除定时器之后，需要重新将定时器置为null
        this.timer = null
    }
  },
  created() {
    this.stop()
    //清除定时器  多清除两边 怕了
    clearInterval(this.timer)
    //清除定时器之后，需要重新将定时器置为null
    this.timer = null
  },
  destroyed() {
    this.stop()
    //清除定时器  多清除两边 怕了
    clearInterval(this.timer)
    //清除定时器之后，需要重新将定时器置为null
    this.timer = null
  },
};
</script>
<style lang="scss" scoped>
.activityMainBox{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color:rgba(3, 7, 23, 0.9);
    .activityMain{
      width: 100%;
      height: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      .activityBg{
        width: 100%;
        height: 100%;
      }
      .activityContents{
        width: 1280px;
        height: 100%;
        margin: auto;
        padding-top: 1px;
        padding-bottom: 100px;
        // 头部标题
        .topTitle{
          width: 817px;
          height: 296px;
          margin: 0 auto ;
        }
        // 滚动游戏内容
        .rollGameContents{
          width: 100%;
          height: 277px;
          margin-top: -10px;
          display: flex;
          justify-content: space-around;
          .items{
            width: 155px;
            height: 277px;
          }
        }
        // 获取免费游戏按钮
        .getFreeBtn{
          width: 253px;
          height: 70px;
          margin: 57px auto 0;
          cursor: pointer;
          opacity: 0.8;
        }
        .getFreeBtn:hover{
          opacity: 1;
        }
        // 购买用户轮询
        .buyUserPoll{
          width:100%;
          height:32px;
          line-height: 32px;
          margin:48px auto 0;
          color:rgba(33,247,248,0.8);
        }
        // 活动规则
        .activityRules{
          width: 1180px;
          height: 380px;
          padding-top: 1px;
          margin: 116px auto 0;
          
          .activityRulesTextBox{
            width: 926px;
            height: 168px;
            margin: 143px auto 0;
            .activityRulesText{
              width: 926px;
              margin: 0 auto 10px;
              color:rgba(32,247,248,0.95);
            }
          }
        }
        // 抽奖游戏
        .luckDraw{
          width: 1186px;
          height: 1000px;
          padding-top: 1px;
          margin: 69px auto 0;
          .luckDrawContents{
            width: 1178px;
            height: 921px;
            margin-top: 75px;
            padding: 40px 35px 0;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .luckDrawContentsItem{
              width: 202px;
              height: 133px;
            }
          }
        }
      }
    }
}
</style>
