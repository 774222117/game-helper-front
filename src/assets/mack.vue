<template>
  <div class="mack RobotoRegular" v-if="isShow">
    <div class="mackWeb" :style="text.mackStyle">
      <!-- 关闭按钮 -->
      <div class="closeBtn opc_hover" @click="cancel" v-if="text.isClose"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
      <!-- 标题 -->
      <div class="title ft24 color_white_1 BangersRegular" v-if="text.title" :style="text.titleStyle">{{text.title.trim()}}</div>
      <!-- 内容 -->
      <div class="mesg ft14 color_white_06 RobotoRegular" v-if="text.mesg" :style="text.mesgStyle">
        <div>{{text.mesg.trim()}}</div>
        <div v-if="text.cntMsg" v-html="text.cntMsg" :style="text.cntMsgSty"></div>
        <div class="codeInput" v-if="text.verificationCode">
          <input type="text" maxlength="1" minlength="1" v-for="(item,index) in 6" :key="index" class="codeInputValue"/>
        </div>
      </div>
      <!-- 内容  选择退款 -->
       <div class="mesg ft14 color_white_06" v-if="text.refundAgreement"  :style="text.mesgStyle">
        <div class="refundAgreementBox" :class="text.isleftRadioActive==1?'leftRadioActive':''">
          <div class="leftRadio" :class="text.isleftRadioActive==1?'leftRadioActive':''" @click="leftRadioActiveFun(1)"></div>
          <div class="rightText">
            <div class="titleText ft12 color_white_1 ft_weight">Refund the balance</div>
            <div class="contentText ft12 color_white_06">Immediate return to our balance, balance can buy late game or provide other services.</div>
          </div>
        </div>
        <div class="refundAgreementBox" :class="text.isleftRadioActive==2?'leftRadioActive':''">
          <div class="leftRadio" :class="text.isleftRadioActive==2?'leftRadioActive':''" @click="leftRadioActiveFun(2)"></div>
          <div class="rightText">
            <div class="titleText ft12 color_white_1 ft_weight">The way back</div>
            <div class="contentText ft12 color_white_06">Within 48 hours after audit, will return to your original account.</div>
          </div>
        </div>
      </div>
      <!-- 提取账号信息 -->
       <div class="mesg ft14 color_white_06" v-if="text.extractTheAccountInfo"  :style="text.mesgStyle">
        <div class="extractTheAccountInfoBox">
          <div class="gameInfoBox" v-for="item in text.extractTheAccountData" :key="item.id">
            <div class="gameInfoLeft">
              <div class="gameInfoLeftIcon" :class="item.icon"></div>
              <div class="gameInfoLeftText ft14 color_white_04">{{item.name}}</div>
            </div>
            <div class="gameInfoMiddleLine"></div>
            <div class="gameInfoRight ft14 color_white_1">{{item.value}}</div>
          </div>
        </div>
      </div>
      <div class="mesg ft14 color_white_06" v-if="text.settings"  :style="text.mesgStyle">
        <div class="settingsBox">
          <div class="startUpBox">
            <div class="frameBox margin_right_16 opc_hover8" @click="startupBtn"><svg-icon v-if="$store.getters.getStartup" iconClass='whiteHookUp' className='svg_icon'></svg-icon></div>
            <div class="ft14 color_white_1">设置为开机自启动</div>
          </div>
          <div class="userLoginOutBox">
            <div class="settingsUserIcon"><svg-icon iconClass='user' className='svg_icon'></svg-icon></div>
            <div class="settingsUserName ft14 color_white_1 textOver">{{$store.getters.getStorage.userName}}</div>
            <div class="settingsUserLoginOut ft14 color_white_06" @click="outLogin">注销</div>
          </div>
        </div>
      </div>
      <!-- 下面确定取消盒子 -->
      <div class="footBtnBox">
        <!-- 取消按钮 -->
        <div
          class="confirmCancel ft14 color_white_06"
          @click="cancel"
          v-if="text.cancel"
        >{{text.btn.cancelVal}}</div>
        <!-- 确定按钮 -->
        <div
          class="confirmOk bg_color_4 ft14 color_white_1 ft_weight margin_left_10"
          @click="confirm"
          v-if="text.confirm"
        >{{text.btn.confirmVal}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { setStore, getStore, removeStore } from "@/utils/storage";
import store from '@/store'
export default {
  store,
  name:'mack',
  data() {
    return {
      isShow: true,
      text: { 
        title: "",          //标题
        mesg: "",           //内容
        mesgStyle:null,     //内同样式
        cntMsg: "",         //插入的div
        cntMsgSty:null,      //插入的样式
        isClose:true,       //关闭按钮是否显示
        cancel: true,         //取消按钮是否显示
        confirm: true,        //确认按钮是否显示
        mackStyle: null,      //外层大盒子的样式
        titleStyle: null,     //标题样式
        verificationCode:false,  //验证码
        refundAgreement:false,   //退款协议
        isleftRadioActive:1,  //退款默认选择1
        extractTheAccountInfo:false, //提取账号信息
        extractTheAccountData:[     //提取账号数据
          {
            'id':'0id',
            'name':'Steam account',
            'icon':'icon1_bg',
            'value':'askjhdlash'
          },{
            'id':'1id',
            'name':'Steam password',
            'icon':'icon2_bg',
            'value':'askjhdlash'
          },{
            'id':'2id',
            'name':'Binding email',
            'icon':'mail_bg',
            'value':'858323707@qq.com'
          },{
            'id':'3id',
            'name':'Your password',
            'icon':'icon2_bg',
            'value':'sumczw345'
          },{
            'id':'4id',
            'name':'Email login to',
            'icon':'icon1_bg',
            'value':'http://mx.banmajs.com/mail'
          },
        ],  
        settings:false,  //设置 
        btn: {
          confirmVal: "确定",
          cancelVal: "取消"
        }
      }
    };
  },
  methods: {
    cancel() {
      this.isShow = false;
    },
    confirm() {
      // this.text.alertsss()
      this.isShow = false;
    },
    leftRadioActiveFun(data){
      this.text.isleftRadioActive = data
    },
    //退出登陆
		outLogin(){
      this.$store.commit('REOMVE_SET_LOGINDATA')
      this.$store.commit('REOMVE_SET_LOGINCODE')
      this.isShow = false;
      removeStore({name:'loginRealName'})
      removeStore({name:'loginTurn101'})
      removeStore({name:'loginNewYear'})
      window.location.reload()
    },
    //开机启动设置
    startupBtn(){
      this.$store.commit('setStartupFun',!this.$store.getters.getStartup)
      console.log(this.$store.getters.getStartup)
      if(this.$store.getters.getStartup){
        if(!!window.sendCef){
          window.sendCef("set_auto_run", '1');
        }else{
          console.log('没有cef方法 无法设置开机启动')
        }
      }else{
        if(!!window.sendCef){
           window.sendCef("set_auto_run", '0');
        }else{
          console.log('没有cef方法 无法设置开机启动')
        }
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.mack {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(21, 21, 21, 0.7);
  // 弹出盒子
  .mackWeb {
    width: 540px;
    height: 540px;
    background:rgba(29,31,36,0.8);
    border-radius:8px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // 关闭按钮
    .closeBtn{
      width: 30px;
      height: 30px;
      cursor: pointer;
      float: right;
      margin: 20px 20px 18px 0;
    }
    // 标题
    .title {
      width: 476px;
      height: 38px;
      margin: 68px auto 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    // 内容
    .mesg {
      width: 476px;
      height: 330px;
      margin: 24px auto 0;
      line-height:24px;
      letter-spacing:1px;
      // 验证码输入盒子
      .codeInput{
        padding:17px 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>input{
          width:48px;
          height:48px;
          font-size: 28PX;
          border-radius:4px;
          border:1px solid rgba(255,255,255,0.1);
          background: none;
          text-align: center;
          line-height: 48px;
          color: white;
        }
      }
      //选择退款
      .refundAgreementBox.leftRadioActive{
        border:1px solid rgba(255,0,54,1);
      }
      .refundAgreementBox{
        width:476px;
        height:110px;
        border-radius:4px;
        border:1px solid rgba(255,255,255,0.1);
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 32px;
        .leftRadioActive.leftRadio{
          background:rgba(255,0,54,1);
          border-radius:10px;
          border:1px solid rgba(255,255,255,0.4);
        }
        .leftRadioActive.leftRadio::before{
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          background-color: #fff;
          text-align: center;
          line-height: 20px;
          transform: translate(5px, 5px);
          border-radius: 50%;
        }
        .leftRadio{
          width: 20px;
          height: 20px;
          background:rgba(49,52,61,1);
          border-radius:10px;
          border:1px solid rgba(255,255,255,0.4);
          cursor: pointer;
        }
        .rightText{
          width:416px;
          height:80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .titleText{
            width:416px;
            height:24px;
          }
          .contentText{
            width:416px;
            height:48px;
          }
        }
      }
      // 提取账号信息
      .extractTheAccountInfoBox{
        width:476px;
        height:280px;
        border:1px solid rgba(255,255,255,0.1);
        .gameInfoBox{
          width: 473px;
          height: 56px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          &:nth-of-type(5){
            border-bottom: none;
          }
          .gameInfoLeft{
            width: 185px;
            height: 56px;
            display: flex;
            align-items: center;
            .gameInfoLeftIcon{
              width: 24px;
              height: 24px;
              margin-left: 16px;
            }
            .gameInfoLeftText{}
          }
          .gameInfoMiddleLine{
              width:1px;
              height:24px;
              background-color:rgba(255,255,255,0.1);
          }
          .gameInfoRight{
            width: 290px;
            height: 56px;
            line-height: 56px;
            text-indent:16px;
          }
        }
      }
      //设置
      .settingsBox{
        width: 100%;
        height: 410px;
        .startUpBox{
          width: 100%;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .frameBox{
            width:20px;
            height:20px;
            border-radius:4px;
            border:1px solid rgba(49,52,61,1);
            cursor: pointer;
          }
        }
        .userLoginOutBox{
          width: 100%;
          height: 48px;
          margin-top: 38px;
          display: flex;
          align-items: center;
          .settingsUserIcon{
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-right: 8px;
          }
          .settingsUserName{
            min-width: 90px;
            height: 48px;
            line-height: 48px;
            margin-right: 38px;
          }
          .settingsUserLoginOut{
            width:81px;
            height:40px;
            border-radius:2px;
            border:1px solid rgba(255,255,255,0.1);
            text-align: center;
            line-height: 40px;
            cursor: pointer;
          }
        }
      }
      
    }
    // 下面按钮盒子
    .footBtnBox{
      width: 476px;
      height: 48px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      // 取消按钮
      .confirmCancel{
        width: 135px;
        height: 48px;
        cursor: pointer;
        text-align: center;
        line-height: 48px;
      }
      // 确定按钮
      .confirmOk{
        width: 214px;
        height: 48px;
        cursor: pointer;
        line-height: 48px;
        text-align: center;
      }
    }
  }
}
</style>