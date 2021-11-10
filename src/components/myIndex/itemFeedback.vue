<template>
    <div class="backgroundBox">
            <div class="feedbackBox" v-if="feedbackInterface">
            <!-- 关闭按钮 -->
            <div class="close close_bg" @click="closeFeedBack"></div>
            <div class="feedbackDetail">
                <!-- 左边 -->
                <div class="leftFeedback">
                    <div class="feedbackText">
                        <div class="feedPic feedback_bg"></div>
                        <div class="feedText">反馈投诉</div>
                    </div>
                    <!-- 游戏名 -->
                    <div class="gameBox">
                        <div class="gameText">游戏名称：</div>
                        <div class="gameName">{{this.questionGame.chinaName || this.questionGame.englishName}}</div>
                    </div>
                    <!-- 反馈问题 -->
                    <div class="feedQuestionBox">
                        <div class="leftFeed">反馈问题：</div>
                        <div class="rightFeed">
                            <div class="question" v-for="(item,index) in questionList">
                                <div class="point" @click="changeQuestion(index)" :class="currentIndex == index ? 'choice_bg' : ''"></div>
                                <div class="text">{{item.name}}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 详细说明 -->
                    <div class="detailBox">
                        <div class="detailText">详细说明：</div>
                        <div class="detailIntrod">
                            <textarea class="detailInput" placeholder="请输入详细问题，方便客服小姐姐帮您定位 到具体问题，我们将在24小时内为您回复。" v-model="detailQuestion"></textarea>
                        </div>
                    </div>
                    <!-- 提示详细不能为空 -->
                    <div class="detailTips ft12" v-if="detailTips">*详细说明不能为空</div>
                    <!-- 联系方式 -->
                    <div class="concatBox">
                        <div class="concatText">联系方式：</div>
                        <div class="concatNum">
                            <input class="number" type="text" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength=11 placeholder="请输入您的手机号/qq邮箱" v-model="customerPhone">
                        </div>
                    </div>
                    <!-- 联系方式不能为空 -->
                    <div class="concatTips ft12" v-if="concatTips">*手机号/邮箱不能为空</div>
                    <!-- 提交 -->
                    <div class="submitBtn submit_bg" @click="submitQuestion"></div>
                </div>
                <!-- 右边 -->
                <div class="rightFeedback">
                    <div class="customerText">
                        <div class="customerPic customerText_bg"></div>
                        <div class="custText">联系客服</div>
                    </div>
                    <!-- 在线联系客服时间 -->
                    <div class="customerTime">在线联系客服时间:10:00-24:00</div>
                    <!-- 点击联系客服 -->
                    <div class="customerBtn">
                        <div class="bluePic customer_bg" @click="sendContactService()"></div>
                        <div class="hand hand_bg"></div>
                    </div>
                    <!-- 邮件投诉 -->
                    <div class="emailBox">
                        <div class="emailPic email_bg"></div>
                        <div class="emailText">邮件投诉</div>
                    </div>
                    <div class="emailTime">24小时内处理，会对您的问题或建议进行回复</div>
                    <div class="emailAdress ft12">邮箱地址:kefu@we4game.com</div>
                    <!-- 400 技术支持 -->
                    <div class="fourPhoneBox">
                        <div class="fourPhonePic phone_bg"></div>
                        <div class="fourPhoneText">400技术支持电话</div>
                    </div>
                    <div class="workTime">工作时间:10:00-18:00</div>
                    <div class="fourPhoneNum">
                        <div class="numBox">
                            <div class="telPic fourNum_bg"></div>
                            <div class="fourNum">400-001-5955</div>
                        </div>
                    </div>
                </div>
            </div>
            <sevenWy7yuAlert v-if="displaySevenWy7yuAlert" @change="displaySevenWy7yuAlertFun"/>
        </div>
        <!-- 点击提交之后 -->
        <div class="feedbackBox" v-else>
            <div class="successPic successful_bg"></div>
            <div class="successText ft18">提交成功，我们会及时排查问题并联系您</div>
            <div class="successBtn successBtn_bg" @click="closeFeedBack"></div>
        </div>
    </div>
    
</template>
<script>
import sevenWy7yuAlert from '@/components/sevenWy7yuAlert/sevenWy7yuAlert';
import {post} from '@/request/http.js'
export default {
    name:'itemFeedback',
    components:{
        sevenWy7yuAlert,
        post
    },
    props:['questionGame'],
    data(){
        return {
            questionList:[
                {name:'点击启动启动游戏没有反应'},
                {name:'游戏下载问题'},
                {name:'游戏启动或者运行报错'},
                {name:'其他'}],
            currentIndex:0,//记录选择的哪一个问题
            displaySevenWy7yuAlert:false,//网易七鱼客服系统
            submitQuestionList:{
                type:this.currentIndex,//记录问题类型
                msg:this.detailQuestion,//记录详细说明
                gameName:this.questionGame.chinaName || this.questionGame.englishName,//记录当前游戏名称
                contact:this.customerPhone,//记录联系方式
            },//发送提交的用户详细问题
            detailQuestion:null,//记录详细说明的内容
            customerPhone:null,//记录联系方式
            feedbackInterface:true,//显示反馈投诉界面
            detailTips:false,//详细说明提示框显示隐藏
            concatTips:false,//联系方式提示框显示隐藏
        }
    },
    methods:{
        // 关闭反馈投诉界面
        closeFeedBack(){
            this.$emit('change',false)
        },
        // 提交结果
        submitQuestion(){
            if(this.detailQuestion == undefined || this.customerPhone == undefined) {
                if(this.detailQuestion == undefined){
                    this.detailTips = true
                }else{
                    this.concatTips = true
                }
            }else{
                var _this = this;
                _this.submitQuestionList = {
                    type:this.currentIndex,//记录问题类型
                    msg:this.detailQuestion,//记录详细说明
                    gameName:this.questionGame.chinaName || this.questionGame.englishName,//记录当前游戏名称
                    contact:this.customerPhone,//记录联系方式
                }
                // _this.submitQuestionList = {type:1,msg:'321321',gameName:'鬼泣5',contact:'21345'}
                if(!!this.$store.getters.getStorage){
                    console.log(_this.submitQuestionList)
                    _this.$fetch('/complaint/save',_this.submitQuestionList)
                    .then((response) => {
                        console.log(response)
                        if(response.flag){
                            this.feedbackInterface = false
                        }else{
                            console.log('提交失败')
                        }
                    })
                }
                
            }
        },
        // 选择反馈问题
        changeQuestion(index){
            this.currentIndex = index
        },
        // 发送联系客服
		sendContactService(){
		  var _this =this;
			var isSdkReady = false;
			ysf('onready', function () {
				isSdkReady = true;
			})
			if(isSdkReady) {
				var phoneNumbers = _this.$store.getters.getStorage && _this.$store.getters.getStorage.phoneNumber || '';
				ysf('config', {
					uid:phoneNumbers,
					name:phoneNumbers,
					mobile:phoneNumbers,
					success: function(){     // 成功回调
					console.log('成功回调')
						_this.displaySevenWy7yuAlertFun(true)
					},
					error: function(){       // 错误回调
						// handle error
						console.log('客服系统配置错误')
					}
				});
			}
		},
        //网易七鱼弹框
		displaySevenWy7yuAlertFun(data){
			this.displaySevenWy7yuAlert=data
		},
    },
    mounted(){
        
    }

}
</script>
<style lang="scss" scoped>
@import "../../assets/css/itemFeedback/itemFeedback.css";
.backgroundBox {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 23;
    background-color: rgba(0,0,0,0.6);
    .feedbackBox {
        width: 891px;
        height: 598px;
        background-color: #051824;
        border-radius: 8px;
        position: fixed;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 160px;
        z-index: 23;
        .successPic {
            width: 167px;
            height: 192px;
            margin: 100px 0 0 362px;
        }
        .successText {
            width: 324px;
            height: 24px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: LEFT;
            color: #bfe9ff;
            margin: 33px 0 0 283px;
        }
        // 好的
        .successBtn {
            width: 206px;
            height: 48px;
            margin: 104px 0 0 342px;
            cursor: pointer;
        }
        .close {
            width: 24px;
            height: 24px;
            position: absolute;
            right: 38px;
            top: 24px;
            cursor: pointer;
        }
        .feedbackDetail {
            width: 772px;
            height: 575px;
            margin: 15px 0 0 48px;
            display: flex;
            justify-content: space-between;
            // 左边
            .leftFeedback {
                width: 397px;
                height: 575px;
                border-right: 1px solid #444444;
                .feedbackText {
                    width: 100px;
                    height: 24px;
                    margin: 15px 0 0 4px;
                    display: flex;
                    align-items: center;
                    .feedPic {
                        width: 20px;
                        height: 22px;
                    }
                    .feedText {
                        width: 72px;
                        height: 24px;
                        font-size: 18px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                        font-weight: 700;
                        text-align: center;
                        color: #ffffff;
                        line-height: 20px;
                        margin-left: 7px;
                    }
                }
                // 游戏名
                .gameBox {
                    width: 300px;
                    height: 21px;
                    margin-top: 15px;
                    display: flex;
                    align-items: center;
                    .gameText {
                        width: 80px;
                        height: 21px;
                        font-size: 16px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                        font-weight: 400;
                        text-align: center;
                        color: #ffffff;
                        line-height: 21px;
                    }
                    .gameName {
                        min-width: 200px;
                        height: 18px;
                        font-size: 14px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                        font-weight: 400;
                        text-align: left;
                        color: #c6c6c6;
                        margin-left: 8px;
                        line-height: 18px;
                    }
                }
                // 反馈问题
                .feedQuestionBox {
                    width: 281px;
                    height: 114px;
                    margin-top: 37px;
                    display: flex;
                    .leftFeed {
                        width: 80px;
                        height: 21px;
                        font-size: 16px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                        font-weight: 400;
                        text-align: LEFT;
                        color: #ffffff;
                    }
                    .rightFeed {
                        width: 191px;
                        height: 111px;
                        font-size: 14px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                        font-weight: 400;
                        text-align: LEFT;
                        color: #c6c6c6;
                        display: flex;
                        flex-flow: column;
                        justify-content: space-between;
                        .question {
                            width: 191px;
                            height: 18px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            .point {
                                width: 14px;
                                height: 14px;
                                border: 1px solid #9e9e9e;
                                border-radius: 1px;
                            }
                            .text {
                                width: 168px;
                                height: 18px;
                                font-size: 14px;
                                line-height: 18px;
                                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                                font-weight: 400;
                                text-align: LEFT;
                                color: #c6c6c6;
                            }
                        }
                    }
                }
                // 详细说明
                .detailBox {
                    width: 348px;
                    height: 104px;
                    margin-top: 37px;
                    display: flex;
                    .detailText {
                        width: 80px;
                        height: 21px;
                        font-size: 16px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                        font-weight: 400;
                        text-align: LEFT;
                        color: #ffffff;
                    }
                    .detailIntrod {
                        width: 258px;
                        height: 104px;
                        border: 1px solid #9e9e9e;
                        border-radius: 2px;
                        overflow: hidden;
                        position: relative;
                        .detailInput {
                            width: 244px;
                            height: 150px;
                            left: 6px;
                            top: 10px;
                            background-color: #051824;
                            overflow: hidden;
                            resize: none;
                            font-size: 14px;
                            color: #c6c6c6;
                            border: none;
                            position: absolute;
                            font-size: 12px;
                            font-family: Microsoft YaHei, Microsoft YaHei-Light;
                            font-weight: 300;
                            text-align: LEFT;
                            color: #c6c6c6;
                        }
                    }
                }
                // 详细说明不能为空
                .detailTips {
                    width: 150px;
                    height: 20px;
                    color: #e52323;
                    position: absolute;
                    left: 128px;
                    bottom: 192px;
                }
                // 联系方式
                .concatBox {
                    width: 348px;
                    height: 30px;
                    margin-top: 37px;
                    display: flex;
                    align-items: center;
                    .concatText {
                        width: 80px;
                        height: 21px;
                        font-size: 16px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                        font-weight: 400;
                        text-align: LEFT;
                        color: #ffffff;
                        line-height: 20px;
                    }
                    .concatNum {
                        width: 258px;
                        height: 30px;
                        border: 1px solid #9e9e9e;
                        border-radius: 2px;
                        position: relative;
                        .number {
                            width: 220px;
                            height: 26px;
                            position: absolute;
                            background-color: #051824;
                            border: none;
                            font-size: 16px;
                            color: #c6c6c6;
                            left: 14px;
                            top: 3px;
                            font-size: 12px;
                            font-family: Microsoft YaHei, Microsoft YaHei-Light;
                            font-weight: 300;
                            text-align: LEFT;
                            color: #c6c6c6;
                        }
                    }
                }
                // 联系方式提示框
                .concatTips {
                    width: 150px;
                    height: 20px;
                    left: 128px;
                    bottom: 124px;
                    color: #e52323;
                    position: absolute;
                }
                // 提交
                .submitBtn {
                    width: 256px;
                    height: 48px;
                    margin: 41px 0 0 80px;
                    cursor: pointer;
                }
            }
            // 右边
            .rightFeedback {
                width: 374px;
                height: 575px;
                .customerText {
                    width: 110px;
                    height: 24px;
                    margin: 15px 0 0 44px;
                    display: flex;
                    align-items: center;
                    .customerPic {
                        width: 25px;
                        height: 25px;
                    }
                    .custText {
                        width: 74px;
                        height: 24px;
                        font-size: 18px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                        font-weight: 700;
                        text-align: LEFT;
                        color: #ffffff;
                        margin-left: 10px;
                        line-height: 24px;
                    }
                }
                // 在线联系客服时间
                .customerTime {
                    width: 222px;
                    height: 21px;
                    font-size: 16px;
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #ffffff;
                    margin: 10px 0 0 44px;
                }
                // 点击联系客服
                .customerBtn {
                    width: 256px;
                    height: 91px;
                    margin: 10px 0 0 44px;
                    position: relative;
                    .bluePic {
                        width: 256px;
                        height: 30px;
                        cursor: pointer;
                    }
                    .hand {
                        width: 64px;
                        height: 91px;
                        position: absolute;
                        left: 185px;
                        top: 0px;
                    }
                }
                // 邮件投诉
                .emailBox {
                    width: 98px;
                    height: 24px;
                    margin: 48px 0 0 44px;
                    display: flex;
                    align-items: center;
                    .emailPic {
                        width: 20px;
                        height: 19px;
                    }
                    .emailText {
                        width: 72px;
                        height: 24px;
                        font-size: 18px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                        font-weight: 700;
                        text-align: LEFT;
                        color: #ffffff;
                        margin-left: 6px;
                        line-height: 22px;
                    }
                }
                .emailTime {
                    width: 323px;
                    height: 21px;
                    font-size: 16px;
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #ffffff;
                    margin: 5px 0 0 44px;
                }
                .emailAdress {
                    width: 258px;
                    height: 30px;
                    border: 1px solid #9e9e9e;
                    border-radius: 2px;
                    margin: 10px 0 0 44px;
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #c6c6c6;
                    line-height: 30px;
                    padding-left: 20px;
                }
                // 400
                .fourPhoneBox {
                    width: 168px;
                    height: 24px;
                    margin: 116px 0 0 53px;
                    display: flex;
                    align-items: center;
                    .fourPhonePic {
                        width: 23px;
                        height: 15px;
                    }
                    .fourPhoneText {
                        width: 142px;
                        height: 24px;
                        font-size: 18px;
                        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                        font-weight: 700;
                        text-align: LEFT;
                        color: #ffffff;
                        margin-left: 3px;
                    }
                }
                .workTime {
                    width: 158px;
                    height: 21px;
                    font-size: 16px;
                    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                    font-weight: 400;
                    text-align: LEFT;
                    color: #ffffff;
                    margin: 10px 0 0 46px;
                }
                .fourPhoneNum {
                    width: 258px;
                    height: 30px;
                    border: 1px solid #9e9e9e;
                    border-radius: 2px;
                    margin: 10px 0 0 44px;
                    .numBox {
                        width: 100px;
                        height: 16px;
                        margin: 7px 0 0 21px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .telPic {
                            width: 14px;
                            height: 13px;
                        }
                        .fourNum {
                            width: 81px;
                            height: 16px;
                            font-size: 12px;
                            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                            font-weight: 400;
                            text-align: LEFT;
                            color: #c6c6c6;
                            line-height: 16px;
                        }
                    }
                }
            }
        }
    }
}
    
    
</style>
