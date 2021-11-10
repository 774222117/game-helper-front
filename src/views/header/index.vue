<template>
<div class="headerBigBox back3" @mousedown.stop="mouseMoe">
	<div class="headerBox">
		<div class="rembox">
			<!-- 图标 -->
			<div class="logoBox fl" @mousedown.stop="''" >
				<img class="imgBlock" :src="imgTimes" alt="" v-if="logoImgIsType == 'png'" @error="imgError" >
				<object class="imgBlock" data="https://grsource.we4game.com/activity/logo.svg" v-if="logoImgIsType == 'svg'" type="image/svg+xml"></object>
				<!-- <svg-icon iconClass='headerLogo' className='svg_icon'></svg-icon> -->
			</div>
			<!-- 图标名字 -->
			<!-- <div class="logoName fl">123</div> -->
			<!-- 后退按钮 -->
			<div class="backBtn opc_hover iconPublic color_white_04 fl no_draggable" @click="backBtn" @mousedown.stop="''"><svg-icon iconClass='back' className='svg_icon'></svg-icon></div>
			<!-- 前进按钮 -->
			<div class="arrowBtn opc_hover iconPublic color_white_04 fl no_draggable" @click="arrowBtn" @mousedown.stop="''"><svg-icon iconClass='arrow' className='svg_icon'></svg-icon></div>	
			<!-- 刷新 -->
			<div class="refresh opc_hover iconPublic color_white_04 fl no_draggable" @click="refreshFun" @mousedown.stop="''"><svg-icon iconClass='refresh' className='svg_icon'></svg-icon></div>
			<!-- store 首页 -->
			<div class="storeBtn ft20 color_white_1 fl BangersRegular opc_hover1 no_draggable" :class="isMyGame==1?'isMyGameActive':''" @click="headerStoreClick" @mousedown.stop="''">商店</div>
			<!-- myGame 我的游戏 -->
			<div class="myGameBtn ft20 color_white_1 fl BangersRegular opc_hover1 no_draggable" :class="isMyGame==0?'isMyGameActive':''"  @click="headerMyGameClick" @mousedown.stop="''">我的游戏</div>
			<!-- 搜索框 -->
			<div class="searchBox fl no_draggable" :style="isUserLogin ? 'margin-left:100px;': 'margin-left:5px;'" @mousedown.stop="''">
				<input class="hraderSearch ft12 color_white_1" type="text" v-model="searchGameName" placeholder="搜索游戏" @keyup.enter="searchGame">
				<div class="searchBtn dispCenter back2 opc_hover8" @click="searchGame"><svg-icon iconClass='search' className='svg_icon_search'></svg-icon></div>
			</div>
			<!-- 登陆按钮 -->
			<div class="loginBox userShow ft14 color_white_1 fl no_draggable" v-if="isUserLogin" @mousedown.stop="''">
				<div class="loginUserBox" @click="loginBtn">
					<div class="header_user_icon opc_hover8"> 
						<!-- <svg-icon v-if="!isUserLogin" iconClass="user" className='svg_icon'></svg-icon> -->
						<div class="userLoginSuccess_bg userLoginSuccess"></div>
					</div>
					<!-- <div class="header_user_name textOver opc_hover6">{{$store.getters.getStorage.userName}}</div>
					<div class="header_user_downIcon"></div>  -->
				</div>
				<!-- 用户信息 -->
				<div class="userInfoBox">
					<div style="width:100%;height:10px;"></div>
					<!-- 三角形 -->
					<div class="triangleBox"></div>
					<!-- 用户内容信息 -->
					<div class="userInfoMainBox">
						<headerUserInfo/>
					</div>
				</div>
			</div>
			<div class="loginBox noLogin ft14 color_white_1 fl back5 no_draggable" style="width:1.3rem;" @click="loginBtn" @mousedown.stop="''" v-else>登录/注册 
				<div class="noLoginBox">
					<div class="topTriangle"></div>
					<div class="texts">
						<div class="icon"> <svg-icon iconClass='gift' className='svg_icon'></svg-icon> </div>
						<div class="iconTexts ft16 font_weight">新人注册领游戏</div>
					</div>
				</div>
			</div>
			<!-- 联系客服 -->
			<div class="contactService" @mousedown.stop="''" @click="sendContactService">
				<div class="contactServiceSvg"> <svg-icon iconClass='customerService' className='svg_icon'></svg-icon> </div>
				<div class="contactServiceText ft14 color_white_1">联系客服</div>
			</div>
			<!-- 最大化 -->
			<!-- <div class="setUpBtn iconPublic color_white_04 fl cursorAuto"></div> -->
			<div v-if="false" class="setUpBtn opc_hover iconPublic color_white_04 fl no_draggable" @click="maxBrowse" @mousedown.stop="''"><svg-icon iconClass='recovery' className='svg_icon'></svg-icon></div>
			<!-- 最小化 -->
			<div class="minimize opc_hover iconPublic color_white_04 fl no_draggable" @click="minBrowse" @mousedown.stop="''"><svg-icon iconClass='minimize' className='svg_icon'></svg-icon></div>
			<!-- 关闭 -->
			<div class="closeBtn opc_hover iconPublic color_white_04 fl no_draggable" @click="closeBrowse" @mousedown.stop="''"><svg-icon iconClass='close' className='svg_icon'></svg-icon></div>
		</div>
		<!-- 注册提示 -->
		<!-- <div class="registerNow titleLogo_bg ft12 color_white_1">
			Register now to get a <span class="ft16 color_white_1 ft_weight">3</span> hours time to play
		</div> -->
		<!-- 未认证邮箱 -->
		<!-- <div class="userIsActivation" v-if="isUesrActiate" @mousedown.stop="''">
			<div class="textUserIsActivation ft14 color_white_1">Please check your email, and follow the instructions to activate your account.</div>
			<div class="btnToMail ft12 color_white_1 bg_color_4 margin_left_16" @click="toSendMailActiate">To send mail</div>
		</div> -->
	</div>
	<sevenWy7yuAlert v-if="displaySevenWy7yuAlert" @change="displaySevenWy7yuAlertFun"/>
</div>
	
</template>

<script>

import headerUserInfo from '@/components/headerUser/headerUserInfo'
import sevenWy7yuAlert from '@/components/sevenWy7yuAlert/sevenWy7yuAlert'
import {setStore,getStore,removeStore} from '@/utils/storage.js'
import JumpTo from '@/utils/jumpTo'
import store from '@/store'
export default {
	name: 'headerBox',
	components: {
		JumpTo,
		headerUserInfo,
		sevenWy7yuAlert
	},
	store,
	inject:['reload','openRegister'],
	data(){
		return {
			//搜索框双向绑定
			searchGameName:'',
			isMyGame:1,
			// isUserLogin:  getStore({name:'loginCode',type:false}) && getStore({name:'loginCode',type:false}).loginCode.length > 0 ? true : false ,
			// isUesrActiate: !!getStore({name:'loginData',type:false}) &&  getStore({name:'loginData',type:false}).isActivated == 0? true : false ,//查看用户是否验证过邮箱没有验证过则显示 默认隐藏
			
			isUesrActiate: !!getStore({name:'loginData',type:false}) &&  getStore({name:'loginData',type:false}).isActivated == 0? true : false ,//查看用户是否验证过邮箱没有验证过则显示 默认隐藏
			isUserLogin: getStore({name:'loginCode',type:false}) && getStore({name:'loginCode',type:false}).loginCode.length > 0 ? true : false ,
			imgTimes: 'https://grsource.we4game.com/activity/logo.svg?times=' +( +new Date()),
			logoImgIsType:'png',
			displaySevenWy7yuAlert:false,//网易七鱼客服系统
		}
	},
	watch:{
		'$route':function(data){
			if(data.path == '/myGame'){
				this.isMyGame = 0
			}else{
				this.isMyGame = 1
			}
		}
	},
	methods:{
		imgError(){
			this.logoImgIsType = 'svg'
		},
		headerStoreClick(){ //首页跳转
			this.isMyGame = 1
			JumpTo(0)
		},
		headerMyGameClick(){ //我的游戏跳转
			this.isMyGame = 0
			if(!!this.$store.getters.getStorage){
				JumpTo(3)
			}else{
				if(!!this.openRegister){
					this.openRegister(true)
				}else{
					console.log('没得openRegister方法')
				}
			}
			
		},
		backBtn(){
			// alert('后退')
			this.$router.back()
			// callNative('back','a')
			// if(window.sendCef){
			// 	window.sendCef('back', '测试客户端发送消息')
			// }else{
			// 	this.$router.back()
			// }
		},
		arrowBtn(){
			// alert('前进')
			window.history.forward()
		},
		// 刷新
		refreshFun(){
			if(this.$store.getters.getIsRefresh){
				this.reload()
			}
		},
		// 搜索按钮
		searchGame(){
			this.$fetch('/game/searchStatistics',{'gameName':this.searchGameName})
				.then((response) => {
					console.log(response)
					JumpTo(1,{gameName:this.searchGameName});
				})
			
		},
		// 登陆按钮
		loginBtn(){
			//如果渠道id未空 点击登录重新获取
			if(this.$store.getters.getChannelIdFun == ''){
				if(!!window.sendCef){
					window.sendCef("get_channel_id","");
				}else{
				// 浏览器打开  设置渠道ID 
				if(window.location.hostname.indexOf('store') >= 0){
					this.$store.commit('setChannelId','BZWEB')
				};
					console.log('没有cef方法 不能获取渠道id')
				}
			}
			if( !this.$store.getters.getLoginCode ){
				if(!!this.openRegister){
					this.openRegister(true)
				}else{
					console.log('没得openRegister方法')
				}
			}
		},
		
		// 最大化
		maxBrowse(){
			callNative("set_window_max", " ");
		},
		// 最小化
		minBrowse(){
			callNative("set_window_min", " ");
		},
		// 关闭
		closeBrowse(){
			callNative("close_window",  " ");
		},
		// 发送验证邮箱
		toSendMailActiate(){
			this.$fetch("/author/activate", {'username':getStore({name:'loginData',type:false}).userName}).then(response => {
			});
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
		mouseMoe(){
			if(!!window.sendCef){
				window.sendCef("win_move" ,"")
			}else{
				console.log('没有cef方法 不能发送拖动')
			}
		},
	},
	computed: {

  	},
}
</script>
<style lang="scss" scoped>

// css 实现拖拽
.no_draggable{
  -webkit-app-region: no-drag;
}
.draggable {
  -webkit-app-region: drag;
}

// css 实现拖拽 结束
.headerBigBox{
	width: 100%;
	height: 60Px;
	position: fixed;
	top: 0;
	z-index: 999999999;
}
.headerBox{
	width: 1280px;
	height: 60Px;
	margin: 0 auto;
	.rembox{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(22,23,27,1);
		// logo
		.logoBox{
			width: 208px;
			height: 60px;
			background-size: cover;
			.imgBlock{width: 100%;height: 100%;display: block}
		}
		// logo名字
		// .logoName{
		// 	width: 80px;
		// 	height: 25px;
		// 	font-size:18Px;
		// 	margin-left: 9px;
		// }
		// 前进 后退 刷新 设置 最小化 关闭
		.backBtn{
			margin-left: 15px;
		}
		.arrowBtn{
			margin-left: 15px;
			// background: url('../../assets/images/arrow.png');
		}
		.refresh{
			margin-left: 15px;
		}
		.setUpBtn{
			margin-left: 40px;
		}
		.minimize{
			margin-left: 15px;
		}
		.closeBtn{
			margin-left: 15px;
		}
		// 联系客服
		.contactService{
			width: 80px;
			height: 20px;
			line-height: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 15px;
			opacity: 0.6;
			.contactServiceSvg{
				width: 20px;
				height: 20px;
				line-height: 20px;
			}
			.contactServiceText{}
		}
		.contactService:hover{opacity: 1;}
		// store 首页按钮
		.storeBtn{
			width: 71px;
			height: 41px;
			text-align: center;
			line-height: 41px;
			margin-left: 15px;
			opacity: 0.6;
			transition: all 0.2s ease;
		}
		// 我的游戏按钮
		.myGameBtn{
			width:142px;
			height:41px;
			text-align: center;
			line-height: 41px;
			margin-left: 25px;
			opacity: 0.6;
			transition: all 0.2s ease;
		}
		.isMyGameActive{
			font-size: 22PX !important;
			opacity: 1 !important;
		}
		// 搜索盒子
		.searchBox:hover .hraderSearch{border:1px solid rgba(255,255,255,0.3);border-right: none;}
		.searchBox{
			width:340px;
			height:40px;
			// margin-left: 113px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.hraderSearch{
				width: 300px;
				height: 100%;
				display: block;
				outline: none;
				box-sizing: border-box;
				border-radius:2px 0 0 2px;
				border:1px solid rgba(255,255,255,0.2);
				border-right: none;
				background:#0b273a;
				text-indent: 16px;
			}
			.hraderSearch:focus{
				border:1px solid rgba(86, 159, 203, 1);
				border-right: none;
			}
			.searchBtn{
				width: 40px;
				height: 100%;
				border-radius:0 2px 2px 0;
			}
		}
		// 登陆按钮
		.loginBox{
			width:40px;
			height:40px;
			text-align: center;
			line-height: 40px;
			margin-left: 15px;
			position: relative;
			.loginUserBox{
				width:100%;
				height:100%;
				display: flex;
				justify-content: space-between;
				.header_user_icon{
					width: 40px;
					height: 40px;
					.userLoginSuccess{
						width: 100%;
						height: 100%;
					}
				}
				.header_user_name{
					width: 70px;
					height: 40px;
				}
				.header_user_downIcon{
					width: 16px;
					height: 40px;
					transition: all 0.3s linear;
					position: relative;
				}
				.header_user_downIcon::before{
					content: '';
					position: absolute;
					top: 50%;
					left: 3px;
					width: 0;
					height: 0;
					border-right:5px solid transparent;
					border-left:5px solid transparent;
					border-top:5px solid rgba(255, 255, 255, 0.6);
				}
			}
			
		}
		// 没有登录
		.noLogin:hover{background-color:rgba(76, 107, 34, 1);color: rgba(255, 255, 255, 1);}
		.noLogin{
			position: relative;
			background-color:rgba(76, 107, 34, 0.8);
			color: rgba(255, 255, 255, 0.8);
			.noLoginBox{
				width:161px;
				height:51px;
				box-shadow:0px 4px 24px 0px rgba(84,125,28,0.42);
				position: absolute;
				left: -15px;
				top: 40px;
				.topTriangle{
					width: 0;
					height: 0;
					border-right:8px solid transparent;
					border-left:8px solid transparent;
					border-bottom:10px solid rgba(76,107,34,1);
					margin: 0 auto;
				 }
				.texts{
					width: 161px;
					height: 41px;
					background:rgba(76,107,34,1);
					border-radius:4px;
					display: flex;
					align-items: center;
					justify-content: center;
					.icon{
						width: 24px;
						height: 24px;
						animation: zy 2.5s .15s linear infinite;
					}
					
					.iconTexts{
						opacity: 1;
						color: rgba(255, 255, 255, 1);
						margin-left: 3px;
					}
				}
			}
		}
		.iconPublic{
			width: 24px;
			height: 24px;
			font-size: 24Px;
			text-align: center;
			line-height: 24px;
		}
	}
	.rembox>div{
		cursor: pointer;
	}
	.userShow:hover .userInfoBox{
		display: block;
	}
	.userShow:hover .header_user_downIcon{
		transform: rotateX(180deg);
    	transform-origin: 50% 50%;
	}
	// 用户信息
	.userInfoBox{
		display: none;
		width: 352px;
		height: 340px;
		position: absolute;
		top: 40px;
		left: -140px;
		z-index: 20;
		box-shadow:0px 20px 40px 0px rgba(0,0,0,0.2);
		// 三角形
		.triangleBox{
			margin: 0 0 0 150px;
			width:0;
        	height:0;
			border-right:11px solid transparent;
			border-left:11px solid transparent;
			border-bottom:12px solid rgba(3, 23, 38, 1);

		}
		// 用户信息
		.userInfoMainBox{
			width: 352px;
			height: 368px;
			// background:rgba(3, 23, 38, 1);
			background:rgba(3,23,38,1);
			box-shadow:0px 20px 40px 0px rgba(0,0,0,0.2);
			border-radius:4px;
			overflow: hidden;
		}
	}
	// 注册提示
	.registerNow{
		width: 290px;
		height: 43px;
		position: absolute;
		top: 70px;
		left: 810px;
		line-height: 53px;
		text-indent: 38px;
		z-index: 20;
	}
	// 账号是否激活
    .userIsActivation{
      width: 12.8rem;
      height: 48px;
	  background-color:rgba(42,44,52,1);
	  position: absolute;
	  top: 60px;
	  z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      // 文本
      .textUserIsActivation{
        width: auto;
        height:32px;
        line-height: 32px;
      }
      // 按钮
      .btnToMail{
        width:117px;
        height:32px;
        cursor: pointer;
        text-align: center;
        line-height: 32px;
        border-radius:2px;
      }
    }
}
.cursorAuto{cursor: auto !important;}

@keyframes zy{
	10% {transform: rotate(15deg)}
 	20% {transform: rotate(-10deg)}
	30% {transform: rotate(5deg)}
	40% {transform: rotate(-5deg)}
	50%,100% {transform: rotate(0deg)}
}
</style>
