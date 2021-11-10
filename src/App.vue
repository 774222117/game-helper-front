<template>
  <div id="app" class="greenSkin bodyBg">
    <div id="headerNav" class="back1">
      <HeaderBox :reload="reload"></HeaderBox>
      <keep-alive>
        <router-view v-if="isRouterAlive" :key="key"></router-view>
      </keep-alive>
      <register v-if="isRegister"></register>
      <firstOrderFloat v-if="$store.getters.getFirstOrder" :firstOrderType="$store.getters.getFirstOrderType"></firstOrderFloat>
      <alertMember v-if="$store.getters.getDisplayOpenMember" />
    </div>
  </div>
</template>

<script>
import HeaderBox from "./views/header";
import register from "./views/register";
import firstOrderFloat from "@/components/firstOrderFloat/firstOrderFloat";  //首单活动浮框
import alertMember from '@/components/alertMember/alertMember'  //会员支付弹框
import store from "@/store";
export default {
  components: {
    HeaderBox,
    register,
    firstOrderFloat,
    alertMember
  },
  store,
  provide () {
    return {
      reload: this.reload,
      openRegister:this.openRegister
    }
  },
  data () {
    return {
      isRegister: !this.$store.getters.getStorage, //是否显示登录弹出
    }
  },
  computed:{
      isRouterAlive(){
          return this.$store.state.isRouterAlive;
      },
      key(){
        if( this.$route.path == '/gameDetails' || this.$route.path == '/allGame' || this.$route.path == '/orderList'){
          return this.$route.path + Math.random();
        }else{
          return this.$route.path;
        }
          
      }
  },
  mounted(){
    // //判断是否登陆
    // if(!!this.$store.getters.getStorage){
    //   // 判断用户是否参与过活动
    //   this.$fetch('/people/activity/join')
    //     .then((response) => {
    //       if(response.flag){
    //         if(response.data == 0){  //没有领取过活动
    //             this.openRegister(true)
    //         }else{
    //           this.openRegister(false)
    //         }
    //       }else{
    //         console.log('下面的数据，没有数据')
    //       }
    //     })
    //   }else{
    //     this.openRegister(true)
    //   }
  },
  methods: {
    reload () {
      // this.$store.commit('increment', false)
      // this.$nextTick(function () {          //if判断然组件隐藏显示一次达到刷新目的
      //   this.$store.commit('increment', true)
      // })
      // console.log('reload')
      // this.$forceUpdate() 强制刷新
      //使用window刷新 会白屏
      window.location.reload()
    },
    openRegister(value){
      this.isRegister = value
    }
  }
};
</script>

<style lang="scss">
@import "./font/font.css";
@import "assets/css/activityRegiste/activityRegiste.css";  //活动页面使用的全局css
@import 'assets/css/firstOrder/firstOrder.css';  //首单全免
@import "@/assets/css/skin/green.scss";   //皮肤 蓝绿的

html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  min-height: 100%;
  #headerNav {
    width: 100%;
    margin: 0 auto;
    padding-top: 60px;
    min-height: 100%;
  }
}
</style>
