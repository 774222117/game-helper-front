<template>
<!-- 下载客户端弹窗 -->
<div class="alertMemberMain">
    <!-- 下载弹窗 -->
    <div class="popUp">
        <!-- 下载弹窗logo -->
        <div class="lunchGameLogo lunchgamelogo_bg">
        <!-- 关闭 -->
        <div class="close opc_hover" @click="cancel"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div>
        </div>
        <div class="text ft14">下载客户端才能启动游戏哦～</div>
        <!-- 下载游戏按钮 -->
        <div class="downBtn" @click="downloads">
             <a class="downUrl ft20 color_white_1 font_weight">立即下载</a>
        </div>
    </div>
</div>
</template>


<script>
import lunchGame from '../../assets/css/lunchGame/lunchGame.css';

export default {
  name: "lunchGame",
  components: {},
  props: {
      lunchGame:{
          type:Object,
          default:function(){
              return {}
          }
      }
  },
  data() {
    return {
        
    };
  },
  watch: {
    
  },
  created() {
    
  },
  destroyed() {
   
  },
  mounted() {},
  methods: {
      cancel(){
         this.$emit('change',false);
      },
      downloads(){
          var _this = this;
          var data = {'channelId':'BZWEB','channelLogType':'DOWNLOAD'};
        //  统计下载
        _this.$fetch('/channel/index',data)
            .then((data) => {
            //    console.log(data)
               window.open("https://grsource.we4game.com/packet/channel/SteamOnline_BZWEB.exe",'_blank')
            })
      }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/lunchGame/lunchGame.css";

.alertMemberMain {
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .popUp{
        width:466px;
        height:516px;
        background: rgba(5,24,36,1);
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5), 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        opacity: 0.93;
        position: relative;
        // 关闭
        .close{
            width: 24px;
            height: 24px;
            position: absolute;
            right: -36px;
            top: -42px;
            cursor: pointer;
        }
        .lunchGameLogo{
            width: 361px;
            height:303px;
            position: absolute;
            margin-left: 53px;
            margin-top: 57px;
        }
        .text{
            width: 182px;
            height:19px;
            color: #A0DBFF;
            line-height: 19px;
            margin-left: 143px;
            margin-top: 366px;
        }
        .downBtn{
            width: 214px;
            height:50px;
            background: linear-gradient(136deg, #34ABDC 0%, #367CCE 100%);
            border-radius: 4px;
            margin-left: 124px;
            margin-top: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .downUrl{
                width: 80px;
                height: 27px;
                line-height: 27px;
                text-decoration: none;
            }
        }
        .downBtn:hover{background: linear-gradient(136deg, #57CEFF 0%, #4091EF 100%);}
    }
}
</style>
