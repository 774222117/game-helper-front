<template>
  <div class="register">
    <!-- 注册登录 -->
    <div class="activityRegisterMainBox activityRegisterMain_bg" v-show="loginState == 0">
      <!-- 登录背景 -->
      <div class="loginBgBox activityRegisterLogin_bg"></div>
      <!-- 装饰1  透明背景-->
      <div class="decorateBgBox activityRegisterDecorate_bg"></div>
      <!-- 登录的所有元素用盒子 -->
      <div class="loginMain">
        <!-- 登录内容盒子多一层嵌套备用 -->
        <div class="loginMainItems">
          <!-- 登录内容用盒子 -->
          <div class="loginContents">
            <!-- 人物 -->
            <div class="characterBox character_bg"></div>
            <!-- 关闭 -->
            <div class="closeBox close_bg"  @click="closeLogin"></div>
            <!-- 输入框 手机-->
            <div class="inputBox inputBox1">
              <div class="phoneBox input_bg">
                <input class="ft14 color_white_08 opc_focus" type="text" placeholder="请输入手机号" v-model="userData.phoneNumber" />
              </div>
              <div class="error" :class="{'nameError':nameDisplay}">{{nameErrorText}}</div>
            </div>
            <!-- 输入框 密码-->
            <div class="inputBox inputBox2">
              <div class="passwordBox input_bg">
                <input class="ft14 color_white_08 opc_focus validateInput" type="text" placeholder="请输入验证码"  v-model="userData.smsCode" />
                <input class="validate ft14" type="button" :disabled="validateDisable" v-model="validateText" @click="sendValidate">
              </div>
              <div class="error" :class="{'validateError':validateDisplay}">{{validateErrorText}}</div>
            </div>
            <!-- 注册并登录按钮 -->
            <!-- registerBtn_bg -->
            <div class="registerBtnBox registerBtn_bg" @click="loginNow"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 立即领取 -->
    <div class="getItNowMainBox activityRegisterMain_bg" v-show="loginState == 1">
      <!-- 登录背景 -->
      <div class="loginBgBox getItNowLogin_bg"></div>
      <!-- 装饰1  透明背景-->
      <div class="decorateBgBox activityRegisterDecorate_bg"></div>
      <!-- 登录的所有元素用盒子 -->
      <div class="loginMain">
        <!-- 登录内容盒子多一层嵌套备用 -->
        <div class="loginMainItems">
          <!-- 登录内容用盒子 -->
          <div class="loginContents">
            <!-- 人物 -->
            <div class="characterBox character_bg"></div>
            <!-- 关闭 -->
            <div class="closeBox close_bg"  @click="closeLogin"></div>
           
            <!-- 立即领取 -->
            <div class="getItNowBtnBox getItNowBtn_bg" @click="getItNow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoogleSignInButton from 'vue-google-signin-button-directive'
  import {login,gooleLogin, loginSms} from '@/utils/login'
  import {post} from '@/request/http.js'
  import {setStore,getStore,removeStore}  from '@/utils/storage'
  import JumpTo from '@/utils/jumpTo'
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
        loginState: 1 ,  // 0 默认显示登录   1 立即领取
        mailInfoText:'Enter your email address to reset your password. You may need to check your spam folder. ',//文案
        findPasswordMail:'',//双向绑定找回密码的邮箱
        mailErrorTips:'Invalid email address', //邮箱错误提示文案
        mailErrorTipsIsShow:false, //邮箱错误提示是否显示
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
    mounted(){
      //判断是否登陆
      if(!!this.$store.getters.getStorage){
        // 判断用户是否参与过活动
      this.$fetch('/people/activity/join')
        .then((response) => {
          if(response.flag){
            if(response.data == 0){  //没有领取过活动
              this.loginState = 1
              if(!!this.openRegister){
                this.openRegister(true)
              }else{
                console.log('没得openRegister方法')
              }
            }else{
              if(!!this.openRegister){
                this.openRegister(false)
              }else{
                console.log('没得openRegister方法')
              }
              console.log(response.message + '         登录参与过活动')
            }
          }else{
            console.log('下面的数据，没有数据')
          }
        })
      }else{
        this.loginState = 0
        if(!!this.openRegister){
          this.openRegister(true)
        }else{
          console.log('没得openRegister方法')
        }
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
      // 立即领取
      getItNow(){
        this.mailErrorTipsIsShow = false
        if(!!this.openRegister){
          this.openRegister(false)
        }else{
          console.log('没得openRegister方法')
        }
        JumpTo(8)
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
    //活动登录样式
    .activityRegisterMainBox{
      width: 1280px;
      height: 780px;
      border-radius:8px;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 60px auto 0;
      z-index: 11;
      // 登录背景
      .loginBgBox{
        width: 734px;
        height: 532px;
        position: absolute;
        left: 0;
        right: 0;
        top: 83px;
        bottom: 0;
        margin: auto;
        z-index: 12;
      }
      // 装饰背景
      .decorateBgBox{
        width: 780px;
        height: 343px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 13;
      }
      //登录元素的盒子
      .loginMain{
        width: 734px;
        height: 532px;
        position: absolute;
        left: 0;
        right: 0;
        top: 83px;
        bottom: 0;
        margin: auto;
        // background-color: rgba(0,0,0,0.2);
        z-index: 16;
        // 登录内容盒子多一层嵌套备用
        .loginMainItems{
          width: 100%;
          height: 100%;
          // 登录内容盒子
          .loginContents{
            width: 100%;
            height: 100%;
            position: relative;
            //人物
            .characterBox{
              width:288px;
              height:562px;
              position: absolute;
              left: -35px;
              top: -44px;
            }
            //关闭
            .closeBox{
              width:60px;
              height:60px;
              position: absolute;
              right: -33px;
              top: -33px;
              cursor: pointer;
            }
            //注册并登录按钮
            .registerBtnBox{
              width:249px;
              height:62px;
              position: absolute;
              left: 302px;
              top: 395px;
              cursor: pointer;
            }
            //输入框
            .inputBox{
              width:360px;
              height:86px;
              .error{
                width: 360px;
                height: 24px;
                color:red;
                font-size: 14px;
                line-height: 24px;
                .nameError{
                  display: none;
                }
                .validateError{
                  display: none;
                }
              }
            }
            .inputBox1{
              position: absolute;
              left: 258px;
              top: 207px;
              .phoneBox{
                width:360px;
                height:62px;
                &>input{
                  display: block;
                  width:100%;
                  height: 100%;
                  box-sizing: border-box;
                  outline: none;
                  background: none;
                  border: none;
                  text-indent: 43px;
                }
              }
            }
            .inputBox2{
              width:360px;
              height:62px;
              position: absolute;
              left: 258px;
              top: 300px;
              .passwordBox{
                width:360px;
                height:62px;
                position: relative;
                display: flex;
                &>input{
                  display: block;
                  width:100%;
                  height: 100%;
                  box-sizing: border-box;
                  outline: none;
                  background: none;
                  border: none;
                  text-indent: 43px;
                }
                .validate{
                  width: 110px;
                  height: 32px;
                  position: absolute;
                  right: 18px;
                  top: 14px;
                  cursor: pointer;
                  color:rgba(242,124,40,1);
                  line-height:32px;
                  text-align: center;
                  text-indent: 0;
                  text-shadow: 0px 20px 40px rgba(0,0,0,0.2);
                  border-radius:4px;
                  border:1px solid rgba(242,124,40,1);
                }
              }
            }
          }
        }
      }
    }
    //立即领取
    .getItNowMainBox{
      width: 1280px;
      height: 780px;
      border-radius:8px;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 60px auto 0;
      z-index: 11;
      // 登录背景
      .loginBgBox{
        width: 648px;
        height: 457px;
        position: absolute;
        left: 0;
        right: 0;
        top: 83px;
        bottom: 0;
        margin: auto;
        z-index: 12;
      }
      // 装饰背景
      .decorateBgBox{
        width: 780px;
        height: 343px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 13;
      }
      //登录元素的盒子
      .loginMain{
        width: 648px;
        height: 457px;
        position: absolute;
        left: 0;
        right: 0;
        top: 83px;
        bottom: 0;
        margin: auto;
        // background-color: rgba(0,0,0,0.2);
        z-index: 16;
        // 登录内容盒子多一层嵌套备用
        .loginMainItems{
          width: 100%;
          height: 100%;
          // 登录内容盒子
          .loginContents{
            width: 100%;
            height: 100%;
            position: relative;
            //人物
            .characterBox{
              width:288px;
              height:562px;
              position: absolute;
              left: -75px;
              top: -34px;
            }
            //关闭
            .closeBox{
              width:60px;
              height:60px;
              position: absolute;
              right: -13px;
              top: -23px;
              cursor: pointer;
            }
            //立即领取
            .getItNowBtnBox{
              width:281px;
              height:70px;
              position: absolute;
              right: 143px;
              bottom: 67px;
              cursor: pointer;
            }
            
          }
        }
      }
    }
  }
</style>
