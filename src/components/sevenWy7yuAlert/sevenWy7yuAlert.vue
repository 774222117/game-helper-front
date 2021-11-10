<template>
<!-- 网易七鱼 -->
<div class="sevenMoorMain"  @mousedown.stop="''">
    <div class="sevenMoorMainContents">
        <!-- 关闭 -->
        <div class="close hover" @click="cancel"> <svg-icon iconClass="close" class="svg_icon"></svg-icon> </div>
        <div class="sevenMoorBox">
            <iframe :src="iframeSrc" width="100%" height="100%" frameborder="0"></iframe>
        </div>
    </div>
</div>
</template>

<script>
import store from '@/store'
export default {
  name: 'sevenWy7yuAlert',
  components: {},
  store,
  data(){
      return {
        phoneNum:'',
        textareas:'',
        reciprocal:0,//问题描述框输入的字数
        iframeSrc:'',
      }
  },
  mounted(){
    this.iframeSrc = ysf('url');
  },
  methods:{
    //关闭
    cancel(){
        this.$emit("change", false);
    },

  }
};
</script>
<style lang="scss" scoped>
.sevenMoorMain{
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 51;
    background-color: rgba(0, 0, 0, 0.8);
    .sevenMoorMainContents{
        width: 665px;
        height: 627px;
        // background:rgba(16,22,32,1);
        border-radius:4px;
        position: relative;
        left: 0;
        top: 80px;
        right: 0;
        bottom: 0;
        margin: auto;
        padding-top: 1px ;
        // 关闭
        .close{
            width: 18px;
            height: 18px;
            cursor: pointer;
            position: absolute;
            right: 12px;
            top: 6px;
            z-index: 88;
            .svg_icon {
              width: 24px;
              height: 24px;
            }
        }
        .sevenMoorBox{
          width: 590px;
         
          height: 100%;
          margin: 0 auto;
        }
        .titles{
          width: 100%;
          height: 28px;
          margin-top: 48px;
          font-weight: 500;
          display: flex;
          color: rgba(227,247,255,1);
          // 联系客服svg图标
          .svg_icon {
            width: 28px;
            height: 28px;
          }
          .customerService{
            width: 80px;
            line-height: 28px;
            margin-left: 5px;
          }
          .time {
            min-width: 92px;
            line-height: 30px;
            margin-left: 12px;
          }
        }
        .phoneNum {
          width: 70px;
          line-height: 22px;
          margin-top: 21px;
          color: rgba(255, 255, 255, 0.87);
        }
        .phoneNumInputBox {
          width: 569px;
          height: 40px;
          margin-top: 8px;
          position: relative;
          .phoneNumInput{
            width: 557px;
            height: 40px;
            position: absolute;
            background-color: #0B273A;
            padding-left: 12px;
            border: none;
            color: rgba(255, 255, 255, 0.87);
          }
          // 输入框默认字体颜色
          input::-webkit-input-placeholder,
          textarea::-webkit-input-placeholder {
            color: rgba(235, 235, 245, 0.2);
          }
        }
        .problem {
          width: 70px;
          line-height: 22px;
          margin-top: 16px;
          color: rgba(255, 255, 255, 0.87);
        }
        .phoneNumInputBox2 {
          width: 569px;
          height: 90px;
          margin-top: 8px;
          background-color: #0B273A;
          position: relative;
          .phoneNumInput2{
            width: 557px;
            height: 75px;
            margin-top: 12px;
            position: absolute;
            background-color: #0B273A;
            padding-left: 12px;
            border: none;
            color: rgba(255, 255, 255, 0.87);
          }

          /*修改滚动条样式*/
          textarea::-webkit-scrollbar{
            width:2px;
            height:8px;
          }
          textarea::-webkit-scrollbar-track{
          /* background:rgba(42,44,52,1); */
            
          }
          textarea::-webkit-scrollbar-thumb{
            background:rgba(56,59,71,1);
            border-radius:10px;
          }
          textarea::-webkit-scrollbar-thumb:hover{
            background:rgba(56,59,71,1);
          }

          // 输入框默认字体颜色
          input::-webkit-input-placeholder,
          textarea::-webkit-input-placeholder {
            color: rgba(235, 235, 245, 0.2);
            
          }
        }
        // 提交按钮
        .contactService{
          width: 214px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(90.53deg, #5FCBED 6.86%, #0F88E0 93%);
          border-radius: 2px;
          cursor: pointer;
          margin-top: 23px;
        }
        // 邮箱框
        .emailBox {
          width: 570px;
          height: 126px;
          border-top: 0.5px solid rgba(235, 235, 245, 0.2);
          margin-top: 38px;
          .emailTitle {
            width: 116px;
            height: 28px;
            margin-top: 24px;
            display: flex;
            .svg_icon {
              width: 28px;
              height: 28px;
            }
            .emailText {
              min-width: 80px;
              line-height: 28px;
              margin-left: 8px;
              color: #E3F7FF;
            }
          }
          .text {
            min-width: 562px;
            height: 22px;
            margin-top: 20px;
            color: rgba(235, 235, 245, 0.65);
          }
          .emailAdrress {
            margin-top: 8px;
            color: #8ADEFF;
          }
        }
    }
}

</style>
