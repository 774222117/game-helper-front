<template>
  <div class="register RobotoRegular">
    <!-- 登录 -->
    <div class="registerLoginBox" v-show="loginState == 0">
      <div class="closeBtn opc_hover" @click="closeLogin"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
      <!--<div class="titleText color_white_1 BangersRegular">LOGIN/SIGN UP</div>-->
      <div class="registerLogo"><svg-icon iconClass='headerLogo' className='svg_icon'></svg-icon> </div>
      <!-- <img class="registerLogoImg" src="images/smallLogo.png" alt=""/> -->
      <div class="mainBox ft14">
        <!-- goole登陆按钮 -->
        <!-- <div class="gooleLogin ft14 color_white_1 bg_color_4 google-signin-button" id="customBtn" @click="gooleLoginClick" v-google-signin-button="clientId" >CONTINUE WITH GOOGLE</div> -->
        <!-- 分割线 -->
        <!-- <div class="divisionLineBox">
          <div class="divisionLine"></div>
          <div class="ft12 color_white_04">OR</div>
          <div class="divisionLine"></div>
        </div> -->
        <!-- 账号 -->
        <div class="inputBox">
          <div class="leftIcon">
            <svg-icon iconClass='loginphone' className='svg_icon'></svg-icon>
          </div>
          <div class="rightInput">
            <input class="ft14 color_white_08 opc_focus" type="text" placeholder="请输入手机号" v-model="userData.phoneNumber" />
            <div class="error" :class="{'nameError':nameDisplay}">{{nameErrorText}}</div>
          </div>
        </div>
        <!-- 密码 -->
        <div class="inputBox">
          <div class="leftIcon">
            <svg-icon iconClass='loginpassword' className='svg_icon'></svg-icon>
          </div>
          <div class="rightInput">
            <input class="ft14 color_white_08 opc_focus validateInput" type="text" placeholder="请输入验证码"  v-model="userData.smsCode" />
            <input class="validate" type="button" :disabled="validateDisable" v-model="validateText" @click="sendValidate">
            <div class="error" :class="{'validateError':validateDisplay}">{{validateErrorText}}</div>
          </div>
        </div>
        <!-- 找回密码 -->
        <!--<div class="findPassword clearfix" >-->
        <!--<div class="findPasswordBtn ft12 color_white_06" @click="forgotPassword">Forgot password?</div>-->
        <!--</div>-->
        <!-- 现在登陆按钮 -->
        <div class="loginNow ft14 color_white_1 back5 opc_hover8" @click="loginNow">立即登录</div>
      </div>
    </div>
    <!-- 找回密码 -->
    <div class="findPasswordBox" v-show="loginState == 1">
      <div class="closeBtn opc_hover" @click="closeLogin"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
      <div class="titleText color_white_1 BangersRegular">FORGET YOUR PASSWORD?</div>
      <div class="mainBox ft14">
        <!-- 发送邮箱说明 -->
        <div class="mailInfo ft14 color_white_06 RobotoRegular">{{mailInfoText}}</div>
        <!-- 邮箱账号 -->
        <div class="inputBox">
          <div class="leftIcon mail_bg"></div>
          <div class="rightInput">
            <input class="ft14 color_white_04 opc_focus" type="text" placeholder="Email" v-model="findPasswordMail">
          </div>
        </div>
        <!-- 错误提示 -->
        <div class="mailErrorTips ft12 RobotoRegular" v-show="mailErrorTipsIsShow">{{mailErrorTips}}</div>
        <!-- 发送邮箱 -->
        <div class="remindMeBtn ft14 color_white_1 bg_color_4 opc_hover8" @click="sendMail">Remind Me</div>
        <!-- 返回登录 -->
        <div class="backLoginBtn opc_hover6 color_white_1 dispCenter" @click="backLogin">
          <div class="backIcon margin_right_4 "><svg-icon iconClass='turnAround' className='svg_icon'></svg-icon></div>
          <div class="backText ft12">Back To Log In</div>
        </div>
      </div>
    </div>
    <!-- 发送邮件成功 -->
    <div class="sendMailBox" v-show="loginState == 2">
      <div class="closeBtn opc_hover" @click="closeLogin"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
      <div class="mainBox ft14">
        <!-- 发送邮箱成功图片 -->
        <div class="sendMailImg">
          <svg-icon iconClass='sendMailOk' className='svg_icon'></svg-icon>
        </div>
        <!-- 发送邮箱说明 -->
        <div class="semdMailInfo ft14 color_white_06 RobotoRegular">{{sendMailInfoText}}</div>
        <!-- 发送邮件ok按钮 -->
        <div class="sendMailBtn ft14 color_white_1 bg_color_4 opc_hover8" @click="closeLogin">OK</div>

      </div>
    </div>
  </div>
</template>

<script>
  import GoogleSignInButton from 'vue-google-signin-button-directive'
  import {login,gooleLogin, loginSms} from '@/utils/login'
  import {post} from '@/request/http.js'
  import {setStore,getStore,removeStore}  from '@/utils/storage'
  import store from '@/store'
  export default {
    name: "register",
    components: {},
    inject:['openRegister','reload'],
    store,
    data(){
      return {
        userData:{
          phoneNumber:'',
          smsCode:'',
          channelAbbr: this.$store.getters.getChannelIdFun
        },
        loginState: 0 ,  // 0 默认显示登录框   1 找回密码
        mailInfoText:'Enter your email address to reset your password. You may need to check your spam folder. ',//文案
        findPasswordMail:'',//双向绑定找回密码的邮箱
        mailErrorTips:'Invalid email address', //邮箱错误提示文案
        mailErrorTipsIsShow:false, //邮箱错误提示是否显示
        sendMailInfoText:'An email has been sent to your mailbox, please check your mailbox and continue',//发送邮件成功文案
        validateText:'获取验证码',
        validateDisable:false,
        nameDisplay:true,
        validateDisplay:true,
        nameErrorText:'',
        validateErrorText:'',
        // clientId: '1070379129719-npo2pcq0g38034m5fj3hkskat8re1g7h.apps.googleusercontent.com',  google登录
        // isInit: false,
        // isSignIn: false
      }
    },
    methods:{
      // 关闭弹框
      closeLogin(){
        this.loginState = 0
        this.mailErrorTipsIsShow = false
        if(!!this.openRegister){
          this.openRegister(false)
        }else{
          console.log('没得openRegister方法')
        }
      },
      // 立即登录
      loginNow(){
        if(this.userData.smsCode == '') {
          this.validateErrorText = '验证码不能为空'
          this.validateDisplay = false
          return false
        }
        // this.userData.channelId = this.$store.getters.getChannelIdFun
        // alert('获取存下来的渠道id == '+ this.$store.getters.getChannelIdFun)
        // alert(this.userData.channelId)
        loginSms(this.userData).then(res=>{
          if(!res.flag) {
            this.validateErrorText = res.message
            this.validateDisplay = false
            return false
          } else {
            this.validateErrorText = ''
            this.validateDisplay = true
            this.$store.commit('SET_LOGINDATA',res.data)
            this.$store.commit('SET_LOGINCODE',res.code)
            this.reload()
          }

        })
      },
      // 找回密码
      forgotPassword(){
        this.loginState = 1
      },
      // 发送邮箱腌制
      sendMail(){
        this.$fetch("/author/check", {'username':this.findPasswordMail}).then(response => {
          if(response.flag == true){
            this.loginState = 2
            this.mailErrorTipsIsShow = false
            this.$fetch("/author/reset/email", {'email':this.findPasswordMail}).then(response => {});
          }else{
            this.mailErrorTips = response.message
            this.mailErrorTipsIsShow = true
          }
        });
      },
      // 返回登录
      backLogin(){
        this.loginState = 0
      },
      //发送验证码，并验证手机号
      sendValidate(){
        var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
        if(this.userData.phoneNumber == '') {
          this.nameErrorText = "请填写手机号"
          this.nameDisplay = false
          return false
        }
        if(!phoneReg.test(this.userData.phoneNumber)){
          this.nameErrorText = "请填写正确的手机号"
          this.nameDisplay = false
          return false
        }
        this.nameDisplay = true
        this.validateDisplay = true
        this.time = 60
        this.validateDisable = true
        this.timer()
        this.$fetch("/author/sendSmsCode", {'phoneNumber': this.userData.phoneNumber}).then(response => {})
      },
      timer(){
        if(this.time > 0) {
          this.time--;
          this.validateText = this.time + 's后重新获取';
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.validateDisable = false;
          this.validateText = '获取验证码';

        }
      }
      // google登录使用 暂时不用取消google登录
      // gooleLoginClick(){
      //   console.log('33333333333333333333333需要发送后台请求')
      // },
      // OnGoogleAuthSuccess (idToken) {
      //   console.log(111)
      //   // Receive the idToken and make your magic with the backend
      // },
      // OnGoogleAuthFail (error) {
      //   console.log(222)
      //   console.log(error)
      // }
    },
    mounted(){


    },
    directives: {
      // GoogleSignInButton
    },
  };

</script>
<style lang="scss" scoped>
  .register {
    width: 100%;
    height:100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    margin: auto;
    background-color: rgba(21, 21, 21, 0.7);
    // 登录
    .registerLoginBox{
      width: 540px;
      height: 420px;
      background:rgba(29,31,36,0.8);
      border-radius:8px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .closeBtn{
        width: 30px;
        height: 30px;
        cursor: pointer;
        float: right;
        margin: 20px;
      }
      .titleText{
        width:100%;
        height:47px;
        font-size:36px;
        margin: 35px 0 0 70px;
      }
      .registerLogo{
        width: 155px;
        height: 43px;
        margin: 53px 0 0 200px;
      }
      .registerLogoImg{
        margin-bottom: 17px;
      }
      .mainBox{
        width: 400px;
        height: 210px;
        margin: 23px auto 66px;
        // goole登陆
        .gooleLogin{
          width:400px;
          height:48px;
          border-radius:4px;
          cursor: pointer;
          text-align: center;
          line-height: 48px;
        }
        // 分割线
        .divisionLineBox{
          width: 100%;
          height: 16px;
          margin: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .divisionLine{
            width:183px;
            height:1px;
            background:rgba(255,255,255,0.1);
          }
        }
        // 邮箱账号,密码
        .inputBox{
          width: 400px;
          height: 48px;
          margin-top: 24px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          background:rgba(22,23,27,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          .leftIcon{
            width: 24px;
            height: 24px;
            margin: 12px 8px 12px 12px;
          }
          .rightInput{
            width: 356px;
            height: 48px;
            &>input{
              display: block;
              width:100%;
              height: 100%;
              box-sizing: border-box;
              outline: none;
              background: none;
              border: none;
              opacity: 0.8;
            }
            .validateInput{
              width: 70%;
              display: inline-block;
            }
            .validate{
              width: 30%;
              cursor: pointer;
              color: #fff;
              display: inline-block;
              text-shadow: 0px 20px 40px rgba(0,0,0,0.2);
            }
            .error{
              color:red;
            }
            .nameError{
              display: none;
            }
            .validateError{
              display: none;
            }
          }
        }
        .inputBox:hover{border: 1px solid rgba(255,255,255,0.3)}
        //找回密码
        .findPassword{
          width: 100%;
          height: 56px;
          text-align: right;
          line-height: 56px;
          .findPasswordBtn{
            width: 110px;
            height: 56px;
            text-align: right;
            line-height: 56px;
            float: right;
            cursor: pointer;
          }
        }
        // 现在登陆
        .loginNow{
          width:400px;
          height:48px;
          cursor: pointer;
          border-radius:4px;
          text-align: center;
          margin-top: 40px;
          line-height: 48px;
        }
      }
    }
    // 找回密码
    .findPasswordBox{
      width: 540px;
      height: 540px;
      background:rgba(29,31,36,0.8);
      border-radius:8px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .closeBtn{
        width: 30px;
        height: 30px;
        cursor: pointer;
        float: right;
        margin: 20px;
      }
      .titleText{
        width:calc(100% - 0.7rem);
        height:47px;
        font-size:36px;
        margin: 35px 0 0 70px;
      }
      .mainBox{
        width: 400px;
        height: 336px;
        margin: 67px auto 0;
        // 邮箱文案说明
        .mailInfo{
          width:400px;
          height:48px;
          line-height:24px;
          letter-spacing:1.4px;
          text-shadow:0px 20px 40px rgba(0,0,0,0.2);
        }
        // 邮箱账号,密码
        .inputBox{
          width: 400px;
          height: 48px;
          margin-top: 24px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          background:rgba(22,23,27,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          .leftIcon{
            width: 24px;
            height: 24px;
            margin: 12px 8px 12px 12px;
          }
          .rightInput{
            width: 356px;
            height: 48px;
            &>input{
              display: block;
              width:100%;
              height: 100%;
              box-sizing: border-box;
              outline: none;
              background: none;
              border: none;
            }
          }
        }
        // 邮箱错误提示
        .mailErrorTips{
          margin-top: 8px;
          color: rgba(255,0,54,1);
        }
        .inputBox:hover{border: 1px solid rgba(255,255,255,0.3)}
        // 发送邮箱
        .remindMeBtn{
          width:400px;
          height:48px;
          cursor: pointer;
          border-radius:4px;
          text-align: center;
          line-height: 48px;
          margin-top: 64px;
        }
        .remindMeBtn:hover{ background-color:rgba(255,0,54,1);}
        // 返回登录
        .backLoginBtn{
          width: 114px;
          height: 24px;
          margin: 24px auto 0;
          cursor: pointer;
          .backIcon{
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    //发送邮件成功
    .sendMailBox{
      width: 540px;
      height: 540px;
      background:rgba(29,31,36,0.8);
      border-radius:8px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .closeBtn{
        width: 30px;
        height: 30px;
        cursor: pointer;
        float: right;
        margin: 20px;
      }
      .mainBox{
        width: 400px;
        height: 336px;
        margin: 67px auto 0;
        // 发送邮件成功图片
        .sendMailImg{
          width: 134px;
          height: 134px;
          margin: 94px auto 20px;
        }
        // 邮箱文案说明
        .sendMailInfo{
          width:400px;
          height:48px;
          line-height:24px;
          letter-spacing:1.4px;
          text-shadow:0px 20px 40px rgba(0,0,0,0.2);
        }
        // 发送邮箱
        .sendMailBtn{
          width:400px;
          height:48px;
          cursor: pointer;
          border-radius:4px;
          text-align: center;
          line-height: 48px;
          margin-top: 74px;
        }
        .sendMailBtn:hover{ background-color:rgba(255,0,54,1);}
      }
    }
  }
</style>