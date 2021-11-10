<template>
<div>
   <div class="container">
			<div class="backgroundline">
				<img :src="BackGroundLine.image">
			</div>
			<div class="gift">
				<img :src="GiftLogo.image">
			</div>
			<div class="givegift">
				<label>
					<img :src="GiveGift.image">
				</label>
			</div>
			<div class="friend">
				<ul class="ul1">
					<li>
						<div class="head"><img src="" alt=""></div>
						<div class="text">
							<div>送了<span>GTA5</span>给朋友</div>
						</div>
					</li>
					<li>
						<div class="head"><img src="" alt=""></div>
						<div class="text">
							<div>送了<span>糖豆人</span>给朋友</div>
						</div>
					</li>
					<li>
						<div class="head"><img src="" alt=""></div>
						<div class="text">
							<div>送了<span>糖豆人</span>给朋友</div>
						</div>
					</li>
					<li>
						<div class="head"><img src="" alt=""></div>
						<div class="text">
							<div>送了<span>彩虹六号</span>给朋友</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="telnum">
				<div class="frinum">
					<p>好友手机号</p>
				</div>
				<div class="inputnum">
					<input type="text" value="请输入好友的手机号" onfocus="if (value == '请输入好友的手机号'){value = ''}" onblur="if (value ==''){value='请输入好友的手机号'}">
				</div>
			</div>
			<div class="user">
				<div class="username">
					<p>您的昵称</p>
				</div>
				<div class="inputname">
					<input type="text" value="请输入您的昵称" onfocus="if (value == '请输入您的昵称'){value = ''}" onblur="if (value ==''){value='请输入您的昵称'}">
				</div>
			</div>
		</div>
</div>
</template>
<style lang="scss" scoped>
@import "../../assets/css/give/give.css"; 

    .container{
        width: 964px;
        height: 550px;
        margin: 0 auto;
        position: fixed;
        left: 25%;
        top: 20%;
        .backgroundline{
            width: 964px;
            height: 550px;
            position: absolute;
        }
        .gift{
            width: 476px;
            height: 199px;
            position: absolute;
            margin-top: 107px;
            margin-left: 35px;
        }
        .givegift{
            width: 222px;
            height: 60px;
            position: absolute;
            margin-left: 654px;
			margin-top: 434px;
        }
        .friend{
            position: absolute;
            width: 480px;
            height: 37px;
            background: #09131D;opacity: 0.5;
            margin-left: 15px;
            margin-top: 356px;
            overflow: hidden;
            .ul1{
                left: 0;
                position: absolute;
                li{
                    width: 160px;
                    height: 27px;
                    margin-top: 6px;
                    float: left;
                    margin-left: 8px;
                    .head{
                        width: 27px;
                        height: 27px;
                        background-color: yellow;
                        border-radius: 50%;
                        float: left;
                    }
                    .text{
                        div{
                            width: 127px;
                            height: 14px;
                            float: left;
                            margin-left: 6px;
                            line-height: 27px;
                            font-family: SourceHanSansCN;
                            font-size: 13px;
                            color: #4CC6FF;
                            font-weight: bold;
                        }
                        span{
                            font-family: SourceHanSansCN;
                            color: #E05843;
                            font-size: 13px;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .telnum{
            width: 310px;
            height: 60px;
            position: absolute;
            margin-left: 43px;
            margin-top: 425px;
            .frinum{
                width: 123px;
                height: 21px;
                background: linear-gradient(269deg,#4CC6FF,#1389F6);
                transform: skew(-45deg);
                p{
                    transform: skew(45deg);
                    width: 80px;
                    height: 16px;
                    font-size: 16px;
                    font-weight: bold;
                    font-family: "microsoft yahei";
                    color: #112437;
                    line-height: 21px;
                    margin-left: 16px;
                }
            }
            .inputnum{
                width: 267px;
                height: 42px;
                background: #060C12;
                border: 1px solid;
                border-image: linear-gradient(86deg,#0A85FF,#68CFFF) 10 10;
                transform: skew(-45deg);
                input{
                    border: 0px;
                    transform: skew(45deg);
                    background: #060C12;
                    margin-left: 24px;
                    margin-top: 14px;
                    color: #1FBCFF;
                    font-size: 13px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    line-height: 7px;
                    opacity: 0.5;
                    position:absolute;
                }
            }
        }
        .user{
            width: 310px;
            height: 60px;
            position: absolute;
            margin-left: 363px;
            margin-top: 425px;
            .username{
                width: 123px;
                height: 21px;
                background: linear-gradient(269deg,#4CC6FF,#1389F6);
                transform: skew(-45deg);
                p{
                     transform: skew(45deg);
                     width: 80px;
                     height: 16px;
                     font-size: 16px;
                     font-weight: bold;
                     font-family: "microsoft yahei";
                     color: #112437;
                     line-height: 21px;
                     margin-left: 23px;
                     cursor: text;
                }
            }
            .inputname{
                width: 219px;
                height: 42px;
                background: #060C12;
                border: 1px solid;
                border-image: linear-gradient(86deg,#0A85FF,#68CFFF) 10 10;
                transform: skew(-45deg);
                input{
                    border: 0px;
                    transform: skew(45deg);
                    background: #060C12;
                    margin-left: 24px;
                    margin-top: 14px;
                    color: #1FBCFF;
                    font-size: 13px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    line-height: 7px;
                    opacity: 0.5;
                    position: absolute;
                }
            }
        }     
    }
</style>
<script>

import give from '../../assets/css/give/give.css'

export default {
  name: 'give',
  props:{
      BackGroundLine:{
          type:Object,
          default:function(){
              return {}
          }
      },
      GiftLogo:{
          type:Object,
          default:function(){
              return {}
          }
      },
      GiveGift:{
          type:Object,
          default:function(){
              return {}
          }
      }
  },
  data(){
    return {
     
      }
  },
  methods:{
    
  }
}

</script>
