<template>
<div class="alertMain">
    <div class="alertContent">
        <!-- 关闭按钮 -->
        <div class="closeBtn opc_hover" @click="cancel"> <svg-icon iconClass='close' className='svg_icon'></svg-icon> </div>
        <!-- 标题 -->
        <div class="title ft24 color_white_1">{{alertData.title}}</div>
        <!-- 内容文本 -->
        <div class="contentText" v-if="alertData.type == 1">
            <div class="ft14 color_white_08 marB">{{alertData.msg1}}</div>
            <div class="ft14 color_white_08 marB">{{alertData.msg2}}</div>
            <div class="ft14 color_white_08 marB" v-if="!!alertData.msg4">{{alertData.msg4}}</div>
            <div class="ft14 color_white_08 marB">{{alertData.msg3}}</div>
        </div>
        <!-- 手机验证 -->
        <div class="contentText contentText2Sty" v-if="alertData.type == 2">
            <div class="reasonForRefund">
                <div class="ft14 color_white_06">退款原因：</div>
                <div class="reasonForRefundOptions">
                    <div class="reasonForRefundOptionsItems" v-for="(item,index) in reasonForRefundDatas" :key="item.id">
                        <div class="checkMark checkMark1 opc_hover8" @click="changeCheckMark(index)"><svg-icon v-if="item.checkType" iconClass='whiteHookUp' className='svg_icon'></svg-icon></div>
                        <div class="ft14 color_white_1 margin_left_6">{{item.text}}</div>
                    </div>
                </div>
                <div class="ft14 color_white_06">详细说明：</div>
                <div class="textareaMsg">
                    <textarea class="textareaSty ft14 color_white_1" minlength="20" maxlength='100' v-model="textareaData" placeholder="请在此处输入详细原因说明（请输入20～100字）"></textarea>
                </div>
            </div>
            <div class="phoneContent">
                <div class="ft14 color_white_06">手机号:</div>
                <div class="ft14 color_white_1">{{userData.phoneNumber}}</div>
            </div>
            <div class="codeContent">
                <div class="ft14 color_white_06">验证码:</div>
                <div class="inputBox ft14 color_white_06">
                    <input class="ft14 color_white_08 opc_focus validateInput" type="text" placeholder="请输入验证码"  v-model="userData.smsCode" />
                    <div class="inpuLine"></div>
                    <input class="validate" type="button" :disabled="validateDisable" v-model="validateText" @click="sendValidate" />
                    <!-- <div class="error" :class="{'validateError':validateDisplay}">{{validateErrorText}}</div> -->
                </div>
            </div>
            <div class="errorMsg ft14" v-show="errorMsgTextShow" v-text="errorMsgText"></div>
        </div>
        <!-- 退款成功 -->
        <div class="contentText" v-if="alertData.type == 3">
            <div class="ft14 color_white_08">{{alertData.msg1}}</div>
        </div>
        <!-- 退到哪儿 -->
        <div class="contentText" v-if="alertData.type == 4">
            <div class="ft14 color_white_08">{{alertData.msg1}}</div>
        </div>
        <!-- 退款成功2 -->
        <div class="contentText" v-if="alertData.type == 5">
            <div class="ft14 color_white_08">{{alertData.msg1}}</div>
        </div>
        <!-- 按钮 -->
        <div class="btmBtn">
            <!-- 取消 -->
            <div class="cancel ft14 color_white_06" v-if="alertData.cancelType" @click="cancel">{{alertData.cancel}}</div>
            <!-- 确定 -->
            <div class="confirm back5 ft14 color_white_1 ft_weight margin_left_10"  @click="confirm">{{alertData.confirm}}</div>
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
    background-color: rgba(0,0,0,0.8);
    .alertContent{
        width: 540px;
        height: 540px;
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
        }
        // 标题
        .title {
            width: 476px;
            height: 38px;
            margin: 68px auto 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        // 内容文本
        .contentText{
            width: 476px;
            height: 330px;
            margin: 23px auto 0;
            .marB{
                margin-bottom: 30px;
            }
            // 退款原因
            .reasonForRefund{
                width: 100%;
                height: 202px;
                
                .reasonForRefundOptions{
                    width: 100%;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    .reasonForRefundOptionsItems{
                        width: 49%;
                        height: 30px;
                        display: flex;
                        align-items: center;
                    }
                }
                .textareaMsg{
                    width: 100%;
                    height:61px;
                    margin-top: 7px;
                    .textareaSty{
                        width: 100%;
                        height: 100%;
                        display: block;
                        background:rgba(43,44,52,1);
                        border-radius:4px;
                        resize: none;
                        border: none;
                        overflow: hidden;
                        word-break: break-all;
                        padding: 0.13rem 0.1rem 0.13rem 0.1rem;
                        -webkit-appearance: none;
                    }
                }
            }
            // 手机号
            .phoneContent{
                width: 100%;
                height: 50px;
                display: flex;
                div:nth-of-type(1){
                    width: 70px;
                    height: 50px;
                    line-height: 48px;
                }
                div:nth-of-type(2){
                    width: 70px;
                    height: 50px;
                    line-height: 48px;
                }

            }
            // 验证码
            .codeContent{
                width: 100%;
                height: 50px;
                display: flex;
                div:nth-of-type(1){
                    width: 70px;
                    height: 50px;
                    line-height: 48px;
                }
                .inputBox{
                    width: 334px;
                    height: 48px;
                    line-height: 48px;
                    border-radius:4px;
                    display: flex;
                    border:1px solid rgba(255,255,255,0.1);
                    &>input{
                        display: block;
                        box-sizing: border-box;
                        outline: none;
                        background: none;
                        border: none;
                        opacity: 0.8;
                    }
                    .validateInput{
                        width: 238px;
                        text-indent: 20px;
                        display: inline-block;
                    }
                    .inpuLine{
                        width: 1px;
                        height: 20px;
                        background-color: rgba(255,255,255,0.1);
                        margin-top: 14px;
                    }
                    .validate{
                        width: 95px;
                        cursor: pointer;
                        color: #fff;
                        display: inline-block;
                        text-shadow: 0px 20px 40px rgba(0,0,0,0.2);
                        position: relative;
                    }
                    .nameError{
                        display: none;
                    }
                    .validateError{
                        display: none;
                    }
                }
            }
            .errorMsg{
                color: rgba(255, 0, 54, 1);
            }
        }
        .contentText2Sty{
            margin: 9px auto 0;
        }
        // 按钮
        .btmBtn{
            width: 476px;
            height: 48px;
            margin: 0 auto;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .cancel{
                width: 135px;
                height: 48px;
                cursor: pointer;
                text-align: center;
                line-height: 48px;
            }
            .confirm{
                width: 214px;
                height: 48px;
                cursor: pointer;
                line-height: 48px;
                text-align: center;
            }
        }
    }
}
// 勾勾
.checkMark{
    width:16px;
    height:16px;
    border-radius:4px;
    border:1px solid rgba(49,52,61,1);
    font-size: 9px;
    text-align: center;
    line-height: 16px;
    color: white;
    cursor: pointer;
}
</style>
<script>
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
export default {
  name: 'alertModel',
  components:{JumpTo,store},
  props:['ifModelShow','ifModelType'],
  data(){
    return {
        alertData:{
            type:'1',  //退款
            title:'申请游戏退款',
            msg1:'您当前购买的游戏账号处于本系统托管状态，可享受账号防盗、一键登录服务；',
            msg2:'若您需要申请退款，您将失去游戏的所有权，且我们将收回您账号中的游戏。如果游戏正在运行中，可能会直接导致游戏中断。',
            msg4:"如参与首单活动，由于活动已返还至P币所以无法重复返还，此情况请联系客服处理。",
            msg3:'由于独享游戏的特殊性，如果游戏已经启动过会影响二次销售将无法退款。退款成功后，退回的款项将会进入您的账户余额，如需提现请联系客服。',
            cancel:'取消申请',
            cancelType:true,
            confirm:'申请退款'
        },
        alertDataCode:{
            type:'2',  //获取手机验证码
            title:'请选择退款原因，并完成手机号验证',
            cancelType:false,
            confirm:'下一步'
        },
        alertDataRefundConfirm:{
            type:'3',  //退款成功
            title:'申请退款成功',
            msg1:'申请退款成功，审核成功后款项将退到您的W4PLAY账户余额中，请耐心等候！',
            cancelType:false,
            confirm:'好的'
        },
        alertDataRefundWhere:{
            type:'4',  //退到哪儿
            title:'退到哪儿了？',
            msg1:'款项已经退到您的W4PLAY账户余额中(首单商品无法退还金额)。为防止违法洗钱等非法经营活动，如需提现请在客户端右上角联系客服，核实后将为您处理。',
            cancelType:false,
            confirm:'好的'
        },
        alertDataRefundConfirm2:{
            type:'5',  //退款成功 待审核
            title:'申请成功，等待审核',
            msg1:'您的独享订单已经申请成功，客服将在24小时内审核您的退款申请。',
            cancelType:false,
            confirm:'好的'
        },
        userData:{
          phoneNumber:'',
          smsCode:''
        },
        reasonForRefundDatas:[
            {'id':1,'checkType':false,'text':'游戏账号有问题'},
            {'id':2,'checkType':false,'text':'游戏启动或运行报错'},
            {'id':3,'checkType':false,'text':'无法登录游戏'},
            {'id':4,'checkType':false,'text':'其他，下方原因详细说明中填写'}
            
        ],//退款原因数据
        textareaData:'',  //用户输入的值
        isAgreement:false,//勾勾

        userPhoneNumber:'',  //不加****手机号
        validateText:'获取验证码',
        validateDisable:false,
        nameDisplay:true,
        validateDisplay:true,
        nameErrorText:'',
        validateErrorText:'',

        errorMsgText:'',   //错误提示信息
        errorMsgTextShow:false,  //是否显示错误提示

        parameterArray:[],//后台接收的数组参数
      }
  },
  created(){
      
  },
  mounted(){
    var str = this.$store.getters.getStorage.phoneNumber+'';
    var str2 = str.substr(0,3)+"****"+str.substr(7); 
    this.userData.phoneNumber = str2
    this.userPhoneNumber = str
    if(this.ifModelType == 4){
         this.alertData = this.alertDataRefundWhere
    }
  },
  methods:{
    // 取消关闭按钮
    cancel(){
        this.$emit('change',  false) 
    },
    // 确定按钮
    confirm(){
        let _this = this;
        if( _this.alertData.type == 1 ){
            _this.alertData = _this.alertDataCode
        }else if( _this.alertData.type == 2 ){
            //判断用户是否勾选了原因
            if(_this.parameterArray.length == 0 && _this.textareaData ==  ''){// 如果未勾选原因 并且未输入原因
                _this.errorMsgText = '请选择退款原因'
                _this.errorMsgTextShow = true
                return
            }
            // 如果勾选原因为1个 并且未输入详细原因 并且勾选的是第四个其他
            if(_this.parameterArray.length == 1 && _this.textareaData ==  '' && _this.reasonForRefundDatas[3].checkType == true){
                _this.errorMsgText = '请输入退款原因'
                _this.errorMsgTextShow = true
                return
                
            }
            if(_this.parameterArray.length == 1 && _this.reasonForRefundDatas[3].checkType == true){
                //判断用户输入是否在规定范围内
                if(_this.textareaData.length < 20 || _this.textareaData.length > 100){
                    _this.errorMsgText = '请填写20~100字内'
                    _this.errorMsgTextShow = true
                    return
                }
            }
            
            // 下一步
            if(_this.userData.smsCode == ''){
                _this.errorMsgText = '验证码不能为空'
                _this.errorMsgTextShow = true
                return
            }else{
                _this.testing()
            }
            
        }else if( _this.alertData.type == 3 ){
            _this.$emit('change',  false) 
        }else if( _this.alertData.type == 4 ){
            _this.$emit('change',  false,4) 
        }else if( _this.alertData.type == 5 ){
            _this.$emit('change',  false,5) 
        }
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
    },
    // 切换勾勾
    changeCheckMark(num){
        let _this = this;
        let emptyArr=[];
        _this.reasonForRefundDatas[num].checkType = !_this.reasonForRefundDatas[num].checkType
        _this.reasonForRefundDatas.forEach(function(v,i){
            if(v.checkType){
                //存下来的原因
                emptyArr.push(v.text)
            }
        })
        _this.parameterArray = emptyArr
        console.log(_this.parameterArray)
    },
    //发送验证码，并验证手机号
    sendValidate(){
        this.nameDisplay = true
        this.validateDisplay = true
        this.time = 60
        this.validateDisable = true
        this.timer()
        this.$fetch("/account/sendRefundSmsCode", {'phoneNumber': this.userPhoneNumber}).then(response => {})
    },
    //验证短信验证码
    testing(){
        this.$fetch("/account/checkRefundSmsCode", {'phoneNumber': this.userPhoneNumber,'smsCode':this.userData.smsCode}).then(response => {
            if(response.flag){
               this.errorMsgTextShow = false
               //发送 申请退款
                this.applyForRefund()
            }else{
                this.errorMsgText = response.message
                this.errorMsgTextShow = true
            }
        })
    },
    //申请退款
    applyForRefund(){
        var datas = {
            'orderId': this.ifModelShow.id,
            'code': this.userData.smsCode,
            'reason': this.parameterArray.join(','),
        }
        this.$fetch("/account/applyRefund", datas).then(response => {
           if(response.flag){
            //    判断合完退款 还是独享退款  1 独享     2 合玩
            if(this.ifModelShow.model == 1){
                this.alertData = this.alertDataRefundConfirm2
            }else if(this.ifModelShow.model == 2){
                this.alertData = this.alertDataRefundConfirm
            }
             
           }else{
                this.errorMsgText = response.message
                this.errorMsgTextShow = true 
           }
           // 查询余额
            this.$fetch("/account/getBalance").then(response => {
				this.$store.commit('setUserBalance',response.data)
			});
        }).catch(err =>{
            console.log(err)
        })
    },
    
  }
}

</script>
