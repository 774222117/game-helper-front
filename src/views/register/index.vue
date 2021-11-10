<template>
  <div class="register RobotoRegular">
    <!-- 粒子背景 -->
    <div class="particlesBox">
       <vue-particles style="width:100%;height:100%;"
        color="#158387"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#158387"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="100"
        :moveSpeed="3"
        :hoverEffect="false"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <!-- 关闭 -->
    <div class="closeBtn" @click="closeLogin"></div>
    <!-- 登录新的 -->
    <div class="registerLoginBoxNew">
      <!-- <div class="loginTitles"></div> -->
      <div class="loginMainBox">
        <div class="phoneInputs">
          <input class="phoneInputSty ft14 color_white_08 opc_focus" type="text" placeholder="请输入手机号" v-model="userData.phoneNumber" />
        </div>
        <div class="error ft14" :class="{'nameError':nameDisplay}">{{nameErrorText}}</div>
        
        <div class="codesInputs">
            <input class="ft14 color_white_08 opc_focus validateInput" type="text" placeholder="请输入验证码"  v-model="userData.smsCode"/>
            <input class="validate ft14 color_white_08" type="button" :disabled="validateDisable" v-model="validateText" @click="sendValidate" />
        </div>
        <div class="error ft14" :class="{'validateError':validateDisplay}">{{validateErrorText}}</div>

        <div class="loginBtns" @click="loginNow"></div>
      </div>
    </div>
  </div>
</template>
<script>
  // import GoogleSignInButton from 'vue-google-signin-button-directive'
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
        //在获取一次渠道id
        if(!!window.sendCef){
            window.sendCef("get_channel_id","");
        }else{
        // 浏览器打开  设置渠道ID 
        if(window.location.hostname.indexOf('store') >= 0){
          this.$store.commit('setChannelId','BZWEB')
        };
            console.log('没有cef方法 不能获取渠道id')
        }
        this.userData.channelAbbr = this.$store.getters.getChannelIdFun
        // alert('获取存下来的渠道id == '+ this.$store.getters.getChannelIdFun)
        // alert(this.userData.channelAbbr)
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
        //在获取一次渠道id
        if(!!window.sendCef){
            window.sendCef("get_channel_id","");
        }else{
        // 浏览器打开  设置渠道ID 
        if(window.location.hostname.indexOf('store') >= 0){
          this.$store.commit('setChannelId','BZWEB')
        };
            console.log('没有cef方法 不能获取渠道id')
        }
        this.userData.channelAbbr = this.$store.getters.getChannelIdFun
        var phoneReg =  /^1[3456789]\d{9}$/; ///^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/;
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
    background-color: rgba(13, 22, 30, 0.8);
    // 粒子背景
    .particlesBox{
      width: 100%;
      height: 100%;
    }
    // 关闭
    .closeBtn{
      width: 40px;
      height: 40px;
      position: absolute;
      right: 50px;
      top: 90px;
      background:url('../../assets/image/register/close.png') no-repeat center;
      opacity: 0.6;
      cursor: pointer;
    }
    .closeBtn:hover{opacity: 1;}
    //登录新的
    .registerLoginBoxNew{
      width: 852px;
      height: 800px;
      border-radius:8px;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      z-index: 9;
      margin: auto; 
      overflow: hidden;
      
      .loginTitles{
        width: 603px;
        height: 243px;
        // background:url('../../assets/image/register/loginTitle.png') no-repeat center;
        margin:77px auto 0;
        position: relative;
        z-index: 5;
      }
      .loginMainBox{
        width: 852px;
        height: 458px;
        background:url('../../assets/image/register/loginMainBg.png') no-repeat center;
        background-size:852px 458px;
        margin: 2rem auto 0;
        position: relative;
        z-index: 4;
        overflow: hidden;
        .phoneInputs{
          width: 366px;
          height: 40px;
          background:url('../../assets/image/register/phone.png') no-repeat center;
          margin: 114px 0 0 362px;
          .phoneInputSty{
            width: 100%;
            height: 100%;
            text-indent: 50px;
            display: block;
            background: transparent;
            outline: none;
            border: none;
          }
        }
        .codesInputs{
          width: 366px;
          height: 40px;
          background:url('../../assets/image/register/codes.png') no-repeat center;
          margin: 4px 0 0 362px;
          display: flex;
          .validateInput{
            width: 70%;
            height: 100%;
            text-indent: 50px;
            display: block;
            background: transparent;
            outline: none;
            border: none;
          }
          .validate{
            width: 30%;
            height: 100%;
            cursor: pointer;
            display: block;
            text-shadow: 0px 20px 40px rgba(0,0,0,0.2);
            background: transparent;
            outline: none;
            border: none;
          }
        }
        .loginBtns{
          width: 231px;
          height: 58px;
          background:url('../../assets/image/register/loginBtn.png') no-repeat center;
          margin: 14px 0 0 431px;
          cursor: pointer;
          opacity: 0.8;
        }
        .loginBtns:hover{opacity: 1;}
        .error{
          width: 400px;
          height: 20px;
          line-height: 20px;
          margin: 4px auto auto 364px;
          color: red;
        }
      }
    }
  }
</style>